export const clamp = (v: number, min = 0, max = 1) =>
    Math.max(min, Math.min(max, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const range = (v: number, a: number, b: number) =>
    clamp((v - a) / (b - a));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function pinProgress(el: HTMLElement): {
    p: number;
    rect: DOMRect;
    vh: number;
} {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const span = Math.max(1, rect.height - vh);
    return { p: clamp(-rect.top / span), rect, vh };
}
