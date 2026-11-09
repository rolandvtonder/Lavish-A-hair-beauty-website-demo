import Lenis from 'lenis';

/**
 * One rAF loop for the whole site. Lenis advances first, then every
 * scroll-driven component reads its own rect and writes styles directly —
 * nothing here goes through React state, so scrolling never re-renders.
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;

/** Room left above an anchored section for the fixed logo and menu button. */
const ANCHOR_OFFSET = -96;

export function startScroll(reducedMotion: boolean): () => void {
  if (!reducedMotion) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9});
  }

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time));
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

/** Smooth-scrolls (or jumps) to an in-page hash like `#nails`, or to the top for `#top`. */
export function scrollToHash(hash: string, immediate = false) {
  const target = hash === '#top' || !hash ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, {duration: 1.4, immediate, offset: typeof target === 'number' ? 0 : ANCHOR_OFFSET});
  } else if (typeof target === 'number') {
    window.scrollTo({top: target});
  } else {
    window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY + ANCHOR_OFFSET});
  }
  history.replaceState(null, '', hash === '#top' || !hash ? location.pathname : hash);
}

/** Jumps (or glides) to an absolute scroll position. */
export function scrollToY(y: number, immediate = true) {
  if (lenis) lenis.scrollTo(y, {immediate, force: true, duration: immediate ? 0 : 1.4});
  else window.scrollTo({top: y, behavior: immediate ? 'instant' : 'smooth'});
}

/** Freezes page scrolling while an overlay (the gallery lightbox) is open. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
