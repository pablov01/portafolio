"use client";

import { useEffect, useRef, useState } from "react";
import { PATH } from "@/data/site";
import { clamp, easeOutCubic, pinProgress, range } from "@/lib/math";
import { onFrame } from "@/lib/scroll";

const SECTION_VH = 380;
const WINDOW = [0.06, 0.92] as const;
const YEARS = Math.max(1, new Date().getFullYear() - PATH.startYear);

const EARTH = { cx: 230, cy: 320, r: 92 };
const MOON = { cx: 985, cy: 300, r: 46 };

const LEGS = [
    `M${EARTH.cx} ${EARTH.cy - 128} a128 128 0 1 1 -0.1 0 a128 128 0 0 1 106 57`,
    `M${EARTH.cx + 106} ${EARTH.cy - 71} C 520 40, 820 70, ${MOON.cx - 20} ${MOON.cy - 84}`,
    `M${MOON.cx - 20} ${MOON.cy - 84} a86 86 0 1 1 -0.1 0.2 a86 86 0 0 1 20 1`,
    `M${MOON.cx} ${MOON.cy - 86} Q ${MOON.cx + 40} ${MOON.cy - 70} ${MOON.cx + 30} ${MOON.cy - 36}`,
];

const LAYER = { cx: 0.657, cy: 0.498, d: 0.401 };

export function Trajectory() {
    const rootRef = useRef<HTMLElement>(null);
    const legRefs = useRef<SVGPathElement[]>([]);
    const capsuleRef = useRef<SVGGElement>(null);
    const yearsRef = useRef<HTMLSpanElement>(null);
    const [leg, setLeg] = useState(0);

    useEffect(() => {
        let lastP = -1;
        let current = 0;
        return onFrame(() => {
            const root = rootRef.current;
            if (!root) return;

            const { p, rect, vh } = pinProgress(root);
            if (rect.bottom < 0 || rect.top > vh) return;
            if (Math.abs(p - lastP) < 0.00005) return;
            lastP = p;

            const u = range(p, ...WINDOW) * LEGS.length;
            const s = clamp(Math.floor(u), 0, LEGS.length - 1);
            if (s !== current) {
                current = s;
                setLeg(s);
            }

            legRefs.current.forEach((path, index) => {
                const k = easeOutCubic(clamp(u - index));
                path.style.strokeDashoffset = String(1 - k);
                if (index === s && capsuleRef.current) {
                    const point = path.getPointAtLength(
                        path.getTotalLength() * k,
                    );
                    capsuleRef.current.setAttribute(
                        "transform",
                        `translate(${point.x} ${point.y})`,
                    );
                }
            });

            if (yearsRef.current) {
                yearsRef.current.textContent = String(
                    Math.round(easeOutCubic(clamp(u / LEGS.length)) * YEARS),
                );
            }
        });
    }, []);

    const currentLeg = PATH.legs[leg] ?? PATH.legs[0];
    const earthW = (EARTH.r * 2) / LAYER.d;
    const earthH = earthW * (1520 / 2688);

    return (
        <section
            ref={rootRef}
            id="path"
            aria-labelledby="path-title"
            className="relative bg-void"
            style={{ height: `${SECTION_VH}svh` }}
        >
            <div className="sticky top-0 flex h-screen-s flex-col overflow-hidden px-4 pt-20 pb-8 sm:px-6 md:px-[6vw] md:pt-24">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="font-mono text-label text-earth uppercase">
                            {PATH.eyebrow}
                        </p>
                        <h2
                            id="path-title"
                            className="mt-3 max-w-[20ch] font-display text-display text-white"
                        >
                            {PATH.heading}
                        </h2>
                    </div>
                    <p className="font-mono text-label text-regolith/60 uppercase">
                        Years shipping{" "}
                        <span ref={yearsRef} className="text-white tabular-nums">
                            0
                        </span>
                    </p>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center">
                    <svg
                        viewBox="0 0 1200 600"
                        className="h-auto max-h-full w-full"
                        role="img"
                        aria-label="A path from 2021 to now, drawn in four legs."
                    >
                        <defs>
                            <clipPath id="earth-clip">
                                <circle
                                    cx={EARTH.cx}
                                    cy={EARTH.cy}
                                    r={EARTH.r}
                                />
                            </clipPath>
                            <radialGradient
                                id="moon-shade"
                                cx="35%"
                                cy="35%"
                                r="75%"
                            >
                                <stop offset="0" stopColor="#e4e6ea" />
                                <stop offset="0.7" stopColor="#8b909b" />
                                <stop offset="1" stopColor="#2a2e36" />
                            </radialGradient>
                            <radialGradient id="earth-glow">
                                <stop
                                    offset="0.8"
                                    stopColor="#6fb6ff"
                                    stopOpacity="0.35"
                                />
                                <stop
                                    offset="1"
                                    stopColor="#6fb6ff"
                                    stopOpacity="0"
                                />
                            </radialGradient>
                        </defs>

                        <g fill="#fff">
                            {Array.from({ length: 70 }, (_, index) => (
                                <circle
                                    key={index}
                                    cx={(index * 173) % 1200}
                                    cy={(index * 97) % 600}
                                    r={index % 7 === 0 ? 1.4 : 0.7}
                                    opacity={
                                        0.15 + ((index * 37) % 50) / 100
                                    }
                                />
                            ))}
                        </g>

                        <circle
                            cx={EARTH.cx}
                            cy={EARTH.cy}
                            r={EARTH.r * 1.18}
                            fill="url(#earth-glow)"
                        />
                        <image
                            href="/layers/m/earth.webp"
                            x={EARTH.cx - LAYER.cx * earthW}
                            y={EARTH.cy - LAYER.cy * earthH}
                            width={earthW}
                            height={earthH}
                            clipPath="url(#earth-clip)"
                            preserveAspectRatio="none"
                        />
                        <circle
                            cx={MOON.cx}
                            cy={MOON.cy}
                            r={MOON.r}
                            fill="url(#moon-shade)"
                        />
                        <g fill="#5d626c" opacity="0.6">
                            <circle
                                cx={MOON.cx - 14}
                                cy={MOON.cy - 10}
                                r="7"
                            />
                            <circle
                                cx={MOON.cx + 12}
                                cy={MOON.cy + 14}
                                r="5"
                            />
                            <circle
                                cx={MOON.cx + 18}
                                cy={MOON.cy - 18}
                                r="3.5"
                            />
                        </g>

                        {LEGS.map((d, index) => (
                            <path
                                key={`g${index}`}
                                d={d}
                                fill="none"
                                stroke="#fff"
                                strokeOpacity="0.08"
                                strokeWidth="1.5"
                                strokeDasharray="3 6"
                            />
                        ))}
                        {LEGS.map((d, index) => (
                            <path
                                key={index}
                                ref={(el) => {
                                    if (el) legRefs.current[index] = el;
                                }}
                                d={d}
                                pathLength={1}
                                fill="none"
                                stroke={index === 1 ? "#6fb6ff" : "#f2e6c9"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                                strokeDashoffset="1"
                            />
                        ))}

                        <g
                            ref={capsuleRef}
                            transform={`translate(${EARTH.cx} ${EARTH.cy - 128})`}
                        >
                            <circle r="11" fill="#6fb6ff" opacity="0.25" />
                            <circle r="4.5" fill="#fff" />
                        </g>

                        <g
                            fontFamily="IBM Plex Mono, monospace"
                            fontSize="13"
                            letterSpacing="2"
                            fill="#8b909b"
                        >
                            <text
                                x={EARTH.cx}
                                y={EARTH.cy + EARTH.r + 58}
                                textAnchor="middle"
                            >
                                {PATH.startYear}
                            </text>
                            <text
                                x={MOON.cx}
                                y={MOON.cy + MOON.r + 70}
                                textAnchor="middle"
                            >
                                NOW
                            </text>
                        </g>
                    </svg>
                </div>

                <div className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
                    <p className="font-mono text-label text-earth uppercase">
                        {currentLeg.day} · Leg {leg + 1}/{PATH.legs.length}
                    </p>
                    <div
                        key={leg}
                        className="animate-[leg-in_0.6s_cubic-bezier(0.2,0.7,0.1,1)]"
                        aria-live="polite"
                    >
                        <h3 className="font-display text-[1.125rem] tracking-[0.08em] text-white uppercase md:text-[1.375rem]">
                            {currentLeg.title}
                        </h3>
                        <p className="mt-1.5 max-w-[40rem] text-body text-regolith/70">
                            {currentLeg.body}
                        </p>
                    </div>
                    <div className="flex gap-1.5" aria-hidden="true">
                        {PATH.legs.map((_, index) => (
                            <span
                                key={index}
                                className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                                    index <= leg ? "bg-earth" : "bg-white/15"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
