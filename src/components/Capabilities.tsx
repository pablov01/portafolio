"use client";

import type { MouseEvent } from "react";
import { CAPABILITIES, SKILLS } from "@/data/site";
import { useReveals } from "@/hooks/useReveals";
import { scrollToHash } from "@/lib/scroll";

const goToWork = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToHash("#work");
};

export function Capabilities() {
    const ref = useReveals<HTMLElement>();

    return (
        <section
            ref={ref}
            id="capabilities"
            aria-labelledby="capabilities-title"
            className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-40"
        >
            <div
                className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
                data-reveal
            >
                <div>
                    <p className="font-mono text-label text-earth uppercase">
                        {CAPABILITIES.eyebrow}
                    </p>
                    <h2
                        id="capabilities-title"
                        className="mt-4 font-display text-display text-white"
                    >
                        {CAPABILITIES.heading}
                    </h2>
                </div>
                <p className="font-mono text-label text-regolith/50 uppercase">
                    {CAPABILITIES.note}
                </p>
            </div>

            <ol className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
                {CAPABILITIES.items.map((item, index) => (
                    <li
                        key={item.name}
                        data-reveal
                        style={{ transitionDelay: `${index * 110}ms` }}
                        className={`group relative flex flex-col overflow-hidden rounded-[8px] p-6 ring-1 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 md:p-8 ${
                            item.featured
                                ? "bg-void-2 ring-earth/60 hover:shadow-[0_30px_80px_-30px_rgb(111_182_255/0.45)]"
                                : "bg-void-2/60 ring-white/10 hover:ring-white/25"
                        }`}
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 200 200"
                            className="absolute -top-10 -right-10 size-48 text-white/10 transition-transform duration-[1.2s] group-hover:rotate-45"
                        >
                            {Array.from(
                                { length: Math.max(2, Math.ceil(item.count / 4)) },
                                (_, ring) => (
                                    <ellipse
                                        key={ring}
                                        cx="100"
                                        cy="100"
                                        rx={40 + ring * 18}
                                        ry={18 + ring * 8}
                                        fill="none"
                                        stroke="currentColor"
                                        transform={`rotate(${-20 + ring * 14} 100 100)`}
                                    />
                                ),
                            )}
                            <circle
                                cx="100"
                                cy="100"
                                r="9"
                                fill="currentColor"
                            />
                        </svg>

                        {item.featured && (
                            <span className="self-start rounded-[3px] bg-earth px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-void uppercase">
                                Primary focus
                            </span>
                        )}

                        <h3
                            className={`font-display text-[1.25rem] tracking-[0.14em] text-white uppercase ${
                                item.featured ? "mt-5" : ""
                            }`}
                        >
                            {item.name}
                        </h3>

                        <p className="mt-6 flex items-baseline gap-2">
                            <span className="font-display text-[3.5rem] leading-none text-white">
                                {item.count}
                            </span>
                            <span className="font-mono text-label text-regolith/60 uppercase">
                                {item.unit}
                            </span>
                        </p>

                        <ul className="mt-8 space-y-2.5 border-t border-white/10 pt-6">
                            {item.lines.map((line) => (
                                <li
                                    key={line}
                                    className="flex gap-3 text-[0.9375rem] text-regolith/80"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-2 size-1 shrink-0 rounded-full bg-earth"
                                    />
                                    {line}
                                </li>
                            ))}
                        </ul>

                        <a
                            href="#work"
                            onClick={goToWork}
                            className={`mt-10 rounded-[4px] px-5 py-3.5 text-center font-mono text-label uppercase transition-colors ${
                                item.featured
                                    ? "bg-earth text-void hover:bg-white"
                                    : "text-white ring-1 ring-white/25 hover:bg-white hover:text-void"
                            }`}
                        >
                            {item.cta}
                        </a>
                    </li>
                ))}
            </ol>

            <div className="mt-16 border-t border-white/10 md:mt-24">
                {SKILLS.map((group, index) => (
                    <div
                        key={group.name}
                        data-reveal
                        className="grid gap-3 border-b border-white/10 py-6 md:grid-cols-[12rem_1fr_7rem] md:items-baseline md:gap-8"
                    >
                        <p className="font-mono text-label text-earth uppercase">
                            0{index + 1} · {group.name}
                        </p>
                        <p className="text-[0.9375rem] leading-relaxed text-regolith/75">
                            {group.technologies}
                        </p>
                        <p className="font-mono text-label text-regolith/45 uppercase md:text-right">
                            {group.level}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
