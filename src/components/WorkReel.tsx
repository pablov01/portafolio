"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/data/profile";
import { WORK_INTRO } from "@/data/site";
import { clamp, pinProgress, range } from "@/lib/math";
import { onFrame } from "@/lib/scroll";

const SECTION_VH = 340;

export type WorkItem = {
    repo: string;
    title: string;
    description: string;
    technologies: readonly string[];
    image: string;
    category?: string;
    url?: string | null;
    obs?: string | null;
    stars?: number;
};

export function WorkReel({ projects }: { projects: WorkItem[] }) {
    const rootRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLOListElement>(null);
    const cardRefs = useRef<HTMLLIElement[]>([]);
    const mediaRefs = useRef<HTMLDivElement[]>([]);
    const barRef = useRef<HTMLSpanElement>(null);
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let lastP = -1;
        return onFrame(() => {
            const root = rootRef.current;
            const track = trackRef.current;
            if (!root || !track) return;

            const { p, rect, vh } = pinProgress(root);
            if (rect.bottom < 0 || rect.top > vh) return;
            if (Math.abs(p - lastP) < 0.00005) return;
            lastP = p;

            const vw = window.innerWidth;
            const k = range(p, 0.04, 0.96);
            const travel = Math.max(
                0,
                track.offsetLeft + track.scrollWidth - vw * 0.94,
            );
            track.style.transform = `translate3d(${-k * travel}px, 0, 0)`;

            let nearest = 0;
            let best = Infinity;
            cardRefs.current.forEach((card, index) => {
                const rectCard = card.getBoundingClientRect();
                const off =
                    (rectCard.left + rectCard.width / 2 - vw * 0.55) / vw;
                const a = clamp(Math.abs(off) * 1.6);
                card.style.opacity = String(1 - a * 0.55);
                card.style.transform = `scale(${1 - a * 0.07})`;
                const media = mediaRefs.current[index];
                if (media) {
                    media.style.transform = `translate3d(${off * -60}px, 0, 0) scale(1.15)`;
                }
                if (Math.abs(off) < best) {
                    best = Math.abs(off);
                    nearest = index;
                }
            });

            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${k})`;
            }
            if (countRef.current) {
                countRef.current.textContent = `0${nearest + 1}`;
            }
        });
    }, []);

    return (
        <section
            ref={rootRef}
            id="work"
            aria-labelledby="work-title"
            className="relative bg-void"
            style={{ height: `${SECTION_VH}svh` }}
        >
            <div className="sticky top-0 flex h-screen-s flex-col justify-center overflow-hidden pt-16 md:flex-row md:items-center md:justify-start md:pt-0">
                <div className="relative z-10 shrink-0 px-4 sm:px-6 md:w-[32vw] md:pr-10 md:pl-[6vw]">
                    <p className="font-mono text-label text-earth uppercase">
                        {WORK_INTRO.eyebrow}
                    </p>
                    <h2
                        id="work-title"
                        className="mt-4 font-display text-display text-white"
                    >
                        {WORK_INTRO.heading}
                    </h2>
                    <p className="mt-5 max-w-[26rem] text-body text-regolith/70 max-md:hidden">
                        {WORK_INTRO.body}
                    </p>
                    <p className="mt-3 max-w-[26rem] text-[0.8125rem] leading-relaxed text-regolith/45 max-md:hidden">
                        {WORK_INTRO.note}
                    </p>

                    <div
                        className="mt-8 flex items-center gap-4 font-mono text-label text-regolith/60 uppercase max-md:hidden"
                        aria-hidden="true"
                    >
                        <span>
                            <span ref={countRef} className="text-white">
                                01
                            </span>{" "}
                            / 0{projects.length}
                        </span>
                        <span className="relative h-px w-32 bg-white/15">
                            <span
                                ref={barRef}
                                className="absolute inset-0 origin-left bg-earth"
                                style={{ transform: "scaleX(0)" }}
                            />
                        </span>
                    </div>

                    <a
                        href={PROFILE.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 font-mono text-label text-white/70 uppercase transition-colors hover:text-white max-md:hidden"
                    >
                        All repositories
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <ol
                    ref={trackRef}
                    className="mt-8 flex gap-5 pl-4 will-change-transform sm:pl-6 md:mt-0 md:gap-7 md:pl-0"
                >
                    {projects.map((project, index) => (
                        <li
                            key={project.repo}
                            ref={(el) => {
                                if (el) cardRefs.current[index] = el;
                            }}
                            className="w-[72vw] shrink-0 origin-bottom sm:w-[44vw] md:w-[clamp(16rem,24vw,23rem)]"
                        >
                            <figure>
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] bg-void-2">
                                    <div
                                        ref={(el) => {
                                            if (el)
                                                mediaRefs.current[index] = el;
                                        }}
                                        className="absolute inset-0 will-change-transform"
                                    >
                                        <Image
                                            src={project.image}
                                            alt=""
                                            fill
                                            sizes="(min-width: 768px) 24vw, 72vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-void/70 via-transparent to-transparent" />
                                    </div>

                                    <span className="absolute top-3 left-3 rounded-[3px] bg-void/70 px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-white uppercase backdrop-blur">
                                        {project.category ?? "Project"}
                                    </span>
                                    {typeof project.stars === "number" &&
                                        project.stars > 0 && (
                                        <span className="absolute top-3 right-3 rounded-[3px] bg-void/70 px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-white/80 uppercase backdrop-blur">
                                            ★ {project.stars}
                                        </span>
                                    )}
                                </div>

                                <figcaption className="mt-4 flex gap-4">
                                    <span className="font-mono text-label text-earth">
                                        0{index + 1}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block font-display text-[0.9375rem] tracking-[0.08em] text-white uppercase">
                                            {project.title}
                                        </span>
                                        <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-regolith/65">
                                            {project.description}
                                        </span>
                                        <span className="mt-3 block font-mono text-[0.625rem] leading-relaxed tracking-[0.1em] text-regolith/45 uppercase">
                                            {project.technologies.join(" · ")}
                                        </span>
                                        {project.obs && (
                                            <span className="mt-2 block font-mono text-[0.625rem] tracking-[0.08em] text-sunlit/70 uppercase">
                                                {project.obs}
                                            </span>
                                        )}
                                        {project.url ? (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 inline-flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.14em] text-earth uppercase transition-colors hover:text-white"
                                            >
                                                View repository
                                                <span aria-hidden="true">
                                                    ↗
                                                </span>
                                            </a>
                                        ) : (
                                            <span className="mt-3 block font-mono text-[0.625rem] tracking-[0.14em] text-regolith/40 uppercase">
                                                Private repository
                                            </span>
                                        )}
                                    </span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
