"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp, easeOutCubic, lerp, pinProgress, range } from "@/lib/math";
import { onFrame } from "@/lib/scroll";

const STAGE_VH = 400;

type LayerName = "sky" | "earth" | "moonscape" | "frame" | "astronaut" | "ground";
const ORDER: LayerName[] = [
    "sky",
    "earth",
    "moonscape",
    "frame",
    "astronaut",
    "ground",
];

type Mote = { x: number; y: number; r: number; s: number; a: number };

export function Earthrise() {
    const rootRef = useRef<HTMLElement>(null);
    const layerRefs = useRef<Partial<Record<LayerName, HTMLDivElement>>>({});
    const veilRef = useRef<HTMLDivElement>(null);
    const dustRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const hudRef = useRef<HTMLDivElement>(null);
    const clockRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLSpanElement>(null);
    const reduced = useReducedMotion();
    const reducedRef = useRef(reduced);

    useEffect(() => {
        reducedRef.current = reduced;
    }, [reduced]);

    useEffect(() => {
        const canvas = dustRef.current;
        if (!canvas) return;
        const sync = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(canvas.clientWidth * dpr);
            canvas.height = Math.round(canvas.clientHeight * dpr);
        };
        sync();
        const ro = new ResizeObserver(sync);
        ro.observe(canvas);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const canvas = dustRef.current;
        const root = rootRef.current;
        if (!canvas || !root) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let seed = 11;
        const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
        const motes: Mote[] = Array.from({ length: 140 }, () => ({
            x: rand(),
            y: rand(),
            r: 0.4 + rand() * 1.6,
            s: 0.3 + rand(),
            a: 0.2 + rand() * 0.6,
        }));

        const clock = new Intl.DateTimeFormat("en-GB", {
            timeZone: HERO.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });

        let lastP = -1;
        let lastTime = 0;

        const set = (name: LayerName, y: number, scale = 1, opacity = 1) => {
            const el = layerRefs.current[name];
            if (!el) return;
            el.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale})`;
            el.style.opacity = String(opacity);
        };

        return onFrame((time) => {
            const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
            lastTime = time;

            const { p, rect } = pinProgress(root);
            if (rect.bottom < 0) return;

            const veil = 1 - range(p, 0, 0.18);
            if (veil > 0.001) {
                const w = canvas.clientWidth;
                const h = canvas.clientHeight;
                const dpr = canvas.width / Math.max(1, w);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, w, h);
                ctx.fillStyle = "#dfe6f2";
                for (const m of motes) {
                    if (!reducedRef.current) {
                        m.x += 0.006 * m.s * dt;
                        m.y -= 0.004 * m.s * dt;
                        if (m.x > 1) m.x -= 1;
                        if (m.y < 0) m.y += 1;
                    }
                    ctx.globalAlpha = m.a * veil;
                    ctx.beginPath();
                    ctx.arc(
                        m.x * w,
                        (m.y - p * 0.6) * h,
                        m.r * (1 + p * 4),
                        0,
                        Math.PI * 2,
                    );
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
            }

            if (Math.abs(p - lastP) < 0.00005) return;
            lastP = p;

            const exit = range(p, 0.7, 1);
            const settle = easeOutCubic(range(p, 0, 0.5));

            if (veilRef.current) {
                veilRef.current.style.opacity = String(veil);
                veilRef.current.style.transform = `translate3d(0, ${-range(p, 0, 0.18) * 24}vh, 0) scale(${1 + range(p, 0, 0.18) * 0.25})`;
            }
            canvas.style.opacity = String(veil);

            set("sky", lerp(0, -6, p), lerp(1.14, 1, settle));
            const rise = easeOutCubic(range(p, 0.04, 0.5));
            set("earth", lerp(34, 0, rise) - exit * 12, lerp(0.92, 1, rise));
            set("moonscape", lerp(9, 0, settle) - exit * 26);
            const rim = easeOutCubic(range(p, 0.28, 0.58));
            set("frame", -exit * 44, lerp(1.6, 1, rim), rim);
            const up = easeOutCubic(range(p, 0.36, 0.62));
            set("astronaut", lerp(28, 0, up) - exit * 58, 1, clamp(up * 2));
            const ground = easeOutCubic(range(p, 0.34, 0.6));
            set("ground", lerp(36, 0, ground) - exit * 78);

            const tOut = range(p, 0.42, 0.55);
            if (titleRef.current) {
                const title = titleRef.current;
                title.style.opacity = String(1 - tOut);
                title.style.transform = `translate3d(0, ${-p * 6}vh, 0)`;
            }

            if (hudRef.current) {
                hudRef.current.style.opacity = String(
                    range(p, 0.02, 0.1) * (1 - range(p, 0.62, 0.72)),
                );
            }
            if (clockRef.current) {
                clockRef.current.textContent = clock.format(new Date());
            }
            if (scrollRef.current) {
                scrollRef.current.style.opacity = String(1 - range(p, 0, 0.1));
            }
        });
    }, []);

    const layer = (name: LayerName) => (
        <div
            key={name}
            ref={(el) => {
                if (el) layerRefs.current[name] = el;
            }}
            className="absolute inset-0 will-change-transform"
        >
            <picture>
                <source
                    media="(max-width: 767px)"
                    srcSet={`/layers/m/${name}.webp`}
                />
                <img
                    src={`/layers/d/${name}.webp`}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    fetchPriority={name === "sky" ? "high" : "auto"}
                    className="absolute inset-0 size-full object-cover object-[58%_50%] md:object-center"
                />
            </picture>
            {name === "ground" && (
                <div className="absolute inset-x-0 top-full h-[110vh] bg-void" />
            )}
        </div>
    );

    return (
        <section
            id="top"
            ref={rootRef}
            aria-label={`${HERO.title} — ${HERO.kicker}`}
            className="relative"
            style={{ height: `${STAGE_VH}svh` }}
        >
            <div className="sticky top-0 h-screen-s overflow-hidden bg-void">
                {ORDER.slice(0, 3).map((name) => layer(name))}

                {ORDER.slice(3).map((name) => layer(name))}

                <div
                    ref={veilRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(60% 50% at 30% 40%, rgba(170,184,210,0.55), transparent 70%), radial-gradient(50% 60% at 75% 60%, rgba(120,140,180,0.5), transparent 70%), radial-gradient(80% 80% at 50% 50%, rgba(20,26,40,0.85), rgba(5,7,12,0.95))",
                    }}
                >
                    <div className="absolute inset-x-0 top-[64%] -translate-y-1/2 px-6 text-center">
                        <p
                            className="font-display text-[0.8125rem] tracking-[0.5em] text-white/90 uppercase"
                            style={{ marginRight: "-0.5em" }}
                        >
                            Scroll to explore
                        </p>
                        <span
                            aria-hidden="true"
                            className="mt-6 inline-block animate-bounce text-regolith/70 motion-reduce:animate-none"
                        >
                            ↓
                        </span>
                    </div>
                </div>

                <canvas
                    ref={dustRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 size-full"
                />

                <div
                    ref={titleRef}
                    className="pointer-events-none absolute inset-x-0 top-[22%] text-center md:top-[24%]"
                    style={{ opacity: 1 }}
                >
                    <h1
                        className="font-display text-hero text-white [text-shadow:0_4px_40px_rgb(0_0_0/0.5)]"
                        style={{ marginRight: "-0.24em" }}
                    >
                        {HERO.title}
                    </h1>
                    <p className="mt-4 font-mono text-label text-regolith/80 uppercase">
                        {HERO.kicker}
                    </p>
                </div>

                <div
                    ref={hudRef}
                    className="pointer-events-none absolute inset-4 font-mono text-[0.625rem] tracking-[0.14em] text-regolith/75 uppercase sm:inset-6 md:text-label"
                    style={{ opacity: 0 }}
                >
                    <div className="brackets absolute inset-0 text-regolith/40" />
                    <div className="absolute top-16 left-3 space-y-1 md:top-20 md:left-4">
                        <p ref={clockRef}>00:00:00</p>
                        <p className="text-regolith/50">
                            Local time · {HERO.timezoneLabel}
                        </p>
                    </div>
                    <div className="absolute top-16 right-3 space-y-1 text-right md:top-20 md:right-4">
                        <p className="flex items-center justify-end gap-2">
                            <span className="inline-block size-1.5 rounded-full bg-earth" />
                            <span className="text-earth">{HERO.status}</span>
                        </p>
                        <p className="text-regolith/50">{HERO.site}</p>
                    </div>
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                        {HERO.coords}
                    </div>
                    <div className="absolute right-3 bottom-3 flex items-center gap-2 md:right-4 md:bottom-4">
                        Scroll{" "}
                        <span
                            ref={scrollRef}
                            aria-hidden="true"
                            className="inline-block animate-bounce motion-reduce:animate-none"
                        >
                            ↓
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
