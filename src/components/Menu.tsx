import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {brand, contact, nav, whatsapp} from '../content';
import {go, withBase, type Route} from '../lib/router';
import {IconFacebook, IconInstagram, IconWhatsApp} from './Icons';

/**
 * The menu: three slabs wipe in from the right one after another
 * (ink, gold, ivory); the ivory one stays and holds the pages. Hovering a
 * page name ripples it like silk — an SVG turbulence + displacement filter
 * whose strength and phase are animated per frame.
 */
export function Menu({open, route, onClose}: {open: boolean; route: Route; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 8).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the paper slab has arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 420);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → gold → ivory, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('gilt-bg')} style={delay(1)} />
      <nav
        id="site-menu"
        className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-28 pb-28 text-ink')}
        style={delay(2)}
        aria-label="Main menu"
      >
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => {
            const here = item.href === route;
            return (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={withBase(item.href)}
                  aria-current={here ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    onClose();
                    void go(item.href);
                  }}
                  className={`display relative inline-block py-1 text-[clamp(36px,3.4vw,54px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  } ${here ? 'italic text-gold-deep' : ''}`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {item.label}
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-mute">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>

        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div className="gold-rule mb-6" />
          <p className="caps text-mute">{brand.full}</p>
          <p className="mt-1 text-[16px] leading-snug text-ink/80">{contact.address.join(', ')}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={whatsapp(contact.booking.intl, 'Hi LAVISH A!')}
              target="_blank"
              rel="noreferrer"
              className="caps flex min-h-11 items-center gap-2 text-ink/85 hover:text-gold-deep"
            >
              <IconWhatsApp /> WhatsApp
            </a>
            <a href={contact.facebook} target="_blank" rel="noreferrer" className="caps flex min-h-11 items-center gap-2 text-ink/85 hover:text-gold-deep">
              <IconFacebook /> Facebook
            </a>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="caps flex min-h-11 items-center gap-2 text-ink/85 hover:text-gold-deep">
              <IconInstagram /> Instagram
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
