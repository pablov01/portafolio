"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { startScroll } from "@/lib/scroll";

export default function SmoothScroll() {
    const reduced = useReducedMotion();

    useEffect(() => {
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }
        return startScroll(reduced);
    }, [reduced]);

    return null;
}
