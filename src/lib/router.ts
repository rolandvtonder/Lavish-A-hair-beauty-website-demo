import {useSyncExternalStore} from 'react';
import {nextFrame} from './math';
import {scrollToHash, scrollToY} from './scroll';

/**
 * A tiny client-side router. Every route also exists as its own HTML file
 * (see vite.config.ts), so direct visits and shared links work on any static
 * host; once the site is loaded, links swap pages in place behind the
 * curtain wipe instead of doing a full reload.
 */

export const routes = ['/', '/services/', '/gallery/', '/shop/', '/about/', '/contact/'] as const;
export type Route = (typeof routes)[number];

/**
 * Where the site lives: '/' on its own domain, or '/repo-name/' on GitHub
 * Pages. Routes stay written as '/services/' everywhere; withBase() adds the
 * prefix for real URLs and normalise() takes it off again.
 */
const BASE = import.meta.env.BASE_URL;

export const withBase = (path: string) => (path.startsWith('/') ? BASE + path.slice(1) : path);

export function normalise(pathname: string): Route {
  let p = pathname.startsWith(BASE) ? '/' + pathname.slice(BASE.length) : pathname;
  p = p.replace(/index\.html$/, '');
  if (!p.endsWith('/')) p += '/';
  return (routes as readonly string[]).includes(p) ? (p as Route) : '/';
}

const isBrowser = typeof window !== 'undefined';

let current: Route = isBrowser ? normalise(location.pathname) : '/';

/** Used only by the build-time pre-renderer. */
export function setServerRoute(route: Route) {
  current = route;
}

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, () => current, () => current);
}

/** The curtain registers itself here; without one (reduced motion) pages swap instantly. */
type Curtain = {cover: () => Promise<void>; reveal: () => Promise<void>};
let curtain: Curtain | null = null;
export function registerCurtain(c: Curtain | null) {
  curtain = c;
}

let busy = false;

/** Moves keyboard and screen-reader focus to the new page's main region. */
function focusMain() {
  const main = document.getElementById('main');
  main?.focus({preventScroll: true});
}

export async function go(href: string) {
  const url = new URL(href, location.origin);
  if (url.origin !== location.origin) {
    location.href = href;
    return;
  }
  const to = normalise(url.pathname);
  const hash = url.hash;

  if (to === current) {
    scrollToHash(hash || '#top');
    return;
  }
  if (busy) return;
  busy = true;

  if (curtain) await curtain.cover();
  current = to;
  history.pushState(null, '', withBase(to) + hash);
  emit();
  // Two frames: one for React to commit the new page, one for layout.
  await nextFrame();
  await nextFrame();
  scrollToY(0, true);
  if (hash) {
    await nextFrame();
    scrollToHash(hash, true);
  }
  focusMain();
  if (curtain) await curtain.reveal();
  busy = false;
}

if (isBrowser) {
  window.addEventListener('popstate', () => {
    current = normalise(location.pathname);
    emit();
    requestAnimationFrame(() => {
      if (location.hash) scrollToHash(location.hash, true);
      else scrollToY(0, true);
    });
  });
}
