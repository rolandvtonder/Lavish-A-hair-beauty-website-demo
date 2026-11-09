import {useEffect, useRef} from 'react';
import {media, type Line} from '../content';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The opening photo of every page, slowly pushing in, under the big
 * condensed headline (upright lines in ivory, italic lines in gold). As you
 * scroll on, the photo blurs, dims and shrinks back — the camera pulling
 * away — as the transition into the page.
 */
export function Hero({
  lines,
  body,
  image,
  alt,
  eyebrow,
  short = false,
  position = '50% 40%',
}: {
  lines: Line[];
  body?: string;
  image: string;
  alt: string;
  eyebrow?: string;
  short?: boolean;
  position?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const st = stage.current;
        if (!el || !st) return;
        const r = el.getBoundingClientRect();
        const h = r.height;
        const p = clamp(-r.top / h);
        st.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        st.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return (
    <section
      ref={root}
      className={`relative overflow-hidden bg-ink ${short ? 'h-[78svh] min-h-[540px]' : 'h-svh min-h-[620px]'}`}
    >
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={media(image)}
            alt={alt}
            className="hero-zoom h-full w-full object-cover"
            style={{objectPosition: position}}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_13_12/0.78),rgb(14_13_12/0.35)_55%,rgb(14_13_12/0.15))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(14_13_12/0.7),transparent)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(108px,15vh,150px)] md:px-14">
          {eyebrow && <p className="caps mb-6 text-gold-light">{eyebrow}</p>}
          <h1
            className={`display text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)] ${
              short ? 'text-[clamp(46px,6.4vw,116px)]' : 'text-[clamp(50px,7.6vw,138px)]'
            }`}
          >
            {lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? 'it gilt pr-[0.08em]' : ''} ${i === 0 ? 'pl-[1.6em]' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          {body && (
            <p className="caps mt-10 ml-[clamp(0px,19vw,330px)] max-w-[340px] text-[13px] text-white/90 max-md:ml-0">
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
