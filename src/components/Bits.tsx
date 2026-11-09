import type {CSSProperties, ReactNode} from 'react';
import {bookLink, type Line} from '../content';
import {IconArrow, IconWhatsApp} from './Icons';
import {Link} from './Link';

/** Big condensed headline from data; italic lines take the gold (or deep gold on ivory). */
export function Headline({lines, light = false, className = ''}: {lines: Line[]; light?: boolean; className?: string}) {
  return (
    <h2 className={`display ${className}`}>
      {lines.map((l) => (
        <span key={l.t} className={`block ${l.i ? (light ? 'it text-gold-deep' : 'it gilt pr-[0.08em]') : ''}`}>
          {l.t}
        </span>
      ))}
    </h2>
  );
}

export function Eyebrow({children, light = false}: {children: ReactNode; light?: boolean}) {
  return <p className={`caps ${light ? 'text-gold-deep' : 'text-gold'}`}>{children}</p>;
}

/** Primary call to action: book on WhatsApp. */
export function BookButton({
  service,
  label = 'Book on WhatsApp',
  tone = 'ink',
}: {
  service?: string;
  label?: string;
  tone?: 'ink' | 'gold';
}) {
  const colours = tone === 'ink' ? 'bg-ink text-paper hover:bg-gold hover:text-ink' : 'bg-gold text-ink hover:bg-paper';
  return (
    <a
      href={bookLink(service)}
      target="_blank"
      rel="noreferrer"
      className={`caps inline-flex min-h-12 items-center gap-3 px-7 py-3.5 transition-colors duration-300 ${colours}`}
    >
      <IconWhatsApp /> {label}
    </a>
  );
}

/** Questions and answers as native disclosures: keyboard-friendly, and crawlable when closed. */
export function Faq({items, light = false}: {items: {q: string; a: string}[]; light?: boolean}) {
  return (
    <div className={`divide-y border-y ${light ? 'divide-ink/10 border-ink/10' : 'divide-white/12 border-white/12'}`}>
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary
            className={`flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden ${
              light ? 'hover:text-gold-deep' : 'hover:text-gold-light'
            }`}
          >
            <h3 className="display text-[clamp(22px,2vw,30px)] normal-case">{it.q}</h3>
            <span
              aria-hidden
              className={`text-[22px] leading-none transition-transform duration-500 ease-silk group-open:rotate-45 ${light ? 'text-gold-deep' : 'text-gold'}`}
            >
              +
            </span>
          </summary>
          <p className={`max-w-[720px] pb-7 text-[17px] leading-relaxed ${light ? 'text-mute' : 'text-white/75'}`}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Numbered steps (how booking / ordering works). */
export function Steps({items, light = false}: {items: {title: string; body: string}[]; light?: boolean}) {
  return (
    <ol className="grid gap-10 md:grid-cols-3 md:gap-12">
      {items.map((s, i) => (
        <li key={s.title} data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties}>
          <span className={`display block text-[64px] leading-none ${light ? 'text-gold-deep' : 'gilt'}`}>0{i + 1}</span>
          <div className={`gold-rule my-5 ${light ? '' : 'opacity-70'}`} />
          <h3 className="display text-[clamp(28px,2.4vw,38px)]">{s.title}</h3>
          <p className={`mt-3 max-w-[360px] text-[17px] leading-relaxed ${light ? 'text-mute' : 'text-white/75'}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Secondary text link with an arrow. */
export function ArrowLink({href, children, light = false}: {href: string; children: ReactNode; light?: boolean}) {
  return (
    <Link
      href={href}
      className={`caps group inline-flex min-h-11 items-center gap-3 border-b pb-1 transition-colors ${
        light ? 'border-ink/30 text-ink hover:border-gold-deep hover:text-gold-deep' : 'border-white/30 text-white hover:border-gold hover:text-gold-light'
      }`}
    >
      {children}
      <IconArrow className="transition-transform duration-300 ease-silk group-hover:translate-x-1" />
    </Link>
  );
}
