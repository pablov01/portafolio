"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";
import { CONTACT } from "@/data/site";
import { useReveals } from "@/hooks/useReveals";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: CONTACT.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
});

function useLocalClock() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        const tick = () => setNow(new Date());
        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, []);

    if (!now) return { hours: "--", minutes: "--", seconds: "--" };

    const parts = timeFormat.formatToParts(now);
    const part = (type: "hour" | "minute" | "second") =>
        parts.find((item) => item.type === type)?.value ?? "--";

    return {
        hours: part("hour"),
        minutes: part("minute"),
        seconds: part("second"),
    };
}

export function ContactSection() {
    const ref = useReveals<HTMLElement>();
    const clock = useLocalClock();
    const units: [string, string][] = [
        ["Hrs", clock.hours],
        ["Min", clock.minutes],
        ["Sec", clock.seconds],
    ];

    return (
        <section
            ref={ref}
            id="contact"
            aria-labelledby="contact-title"
            className="relative overflow-hidden bg-void px-4 pb-28 sm:px-6 md:px-[6vw] md:pb-40"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[62vw] left-1/2 size-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(111,182,255,0.35),rgba(111,182,255,0.05)_55%,transparent_70%)]"
            />

            <div className="relative grid gap-12 border-t border-white/10 pt-20 md:grid-cols-2 md:gap-16 md:pt-28">
                <div data-reveal>
                    <p className="font-mono text-label text-earth uppercase">
                        {CONTACT.eyebrow}
                    </p>
                    <h2
                        id="contact-title"
                        className="mt-4 font-display text-display text-white"
                    >
                        {CONTACT.heading}
                    </h2>
                    <p className="mt-5 max-w-[28rem] text-body text-regolith/70">
                        {CONTACT.body}
                    </p>

                    <p className="mt-8 flex items-center gap-2.5 font-mono text-label text-regolith/60 uppercase">
                        <span className="inline-block size-2 animate-pulse rounded-full bg-earth motion-reduce:animate-none" />
                        {CONTACT.availability}
                    </p>

                    <div className="mt-10">
                        <p className="font-mono text-label text-regolith/50 uppercase">
                            {CONTACT.timezoneLabel}
                        </p>
                        <div
                            className="mt-3 flex gap-2 md:gap-3"
                            role="timer"
                            aria-label={`Local time in ${PROFILE.location}: ${clock.hours}:${clock.minutes}:${clock.seconds}`}
                        >
                            {units.map(([label, value]) => (
                                <div
                                    key={label}
                                    className="brackets min-w-[4.25rem] px-3 py-3 text-center text-white/25 md:min-w-[5.5rem]"
                                >
                                    <span className="block font-display text-[1.5rem] text-white tabular-nums md:text-[2.25rem]">
                                        {value}
                                    </span>
                                    <span className="mt-1 block font-mono text-[0.625rem] tracking-[0.14em] text-regolith/60 uppercase">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-3" data-reveal>
                    {CONTACT.channels.map((channel) => (
                        <a
                            key={channel.label}
                            href={channel.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 rounded-[4px] bg-white/[0.04] px-4 py-4 ring-1 ring-white/15 transition-colors hover:bg-white/[0.07] hover:ring-earth/60 md:px-5 md:py-5"
                        >
                            <span className="min-w-0">
                                <span className="block font-mono text-label text-regolith/60 uppercase">
                                    {channel.label}
                                </span>
                                <span className="mt-1.5 block truncate text-body text-white">
                                    {channel.value}
                                </span>
                                <span className="mt-1 block text-[0.8125rem] text-regolith/45">
                                    {channel.note}
                                </span>
                            </span>
                            <span
                                aria-hidden="true"
                                className="shrink-0 font-mono text-lg text-earth transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            >
                                ↗
                            </span>
                        </a>
                    ))}

                    <div className="rounded-[4px] bg-white/[0.04] px-4 py-4 ring-1 ring-white/15 md:px-5 md:py-5">
                        <div className="flex items-start justify-between gap-4">
                            <span className="min-w-0">
                                <span className="block font-mono text-label text-regolith/60 uppercase">
                                    {CONTACT.resume.label}
                                </span>
                                <span className="mt-1 block text-[0.8125rem] text-regolith/45">
                                    {CONTACT.resume.note}
                                </span>
                            </span>
                            <span
                                aria-hidden="true"
                                className="shrink-0 font-mono text-lg text-earth"
                            >
                                ↓
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {CONTACT.resume.versions.map((version) => (
                                <a
                                    key={version.code}
                                    href={version.href}
                                    download={version.download}
                                    aria-label={`Download the ${version.language} résumé as PDF`}
                                    className="group flex items-center justify-between gap-2 rounded-[3px] px-3 py-2.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase ring-1 ring-white/15 transition-colors hover:bg-white hover:text-void"
                                >
                                    <span>{version.language}</span>
                                    <span className="flex items-center gap-1.5 text-earth transition-colors group-hover:text-void">
                                        {version.code}
                                        <span aria-hidden="true">↓</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <p className="pt-4 font-mono text-[0.625rem] leading-relaxed tracking-[0.14em] text-regolith/40 uppercase">
                        {PROFILE.location} · Remote friendly · Replies within a
                        day
                    </p>
                </div>
            </div>
        </section>
    );
}
