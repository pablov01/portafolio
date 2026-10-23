"use client";

import Lenis from "lenis";

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;

export function startScroll(reducedMotion: boolean): () => void {
    if (!reducedMotion) {
        lenis = new Lenis({
            lerp: 0.09,
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });
    }

    let raf = 0;
    const loop = (time: number) => {
        lenis?.raf(time);
        subscribers.forEach((fn) => {
            try {
                fn(time);
            } catch (error) {
                // A single section must never stop the scroll loop.
                console.error(error);
            }
        });
        raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
        cancelAnimationFrame(raf);
        lenis?.destroy();
        lenis = null;
    };
}

export function onFrame(fn: Tick): () => void {
    subscribers.add(fn);
    return () => {
        subscribers.delete(fn);
    };
}

export function setScrollLocked(locked: boolean) {
    if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
        return;
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToHash(hash: string) {    const target =
        hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
    if (target === null) return;

    if (lenis) {
        lenis.scrollTo(target, { duration: 1.6 });
    } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
    } else {
        target.scrollIntoView({ behavior: "smooth" });
    }

    history.replaceState(
        null,
        "",
        hash === "#top" ? window.location.pathname : hash,
    );
}
