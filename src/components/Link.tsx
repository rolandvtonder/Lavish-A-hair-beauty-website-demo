import type {AnchorHTMLAttributes} from 'react';
import {go, withBase} from '../lib/router';

/**
 * An internal link: a real <a href> (so it works without JS, opens in a new
 * tab with a modifier key and can be copied), but a plain click navigates
 * client-side behind the curtain.
 */
export function Link({href, onClick, ...rest}: AnchorHTMLAttributes<HTMLAnchorElement> & {href: string}) {
  return (
    <a
      href={withBase(href)}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        void go(href);
      }}
    />
  );
}
