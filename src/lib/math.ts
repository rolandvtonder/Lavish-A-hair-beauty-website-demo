export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

export const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
