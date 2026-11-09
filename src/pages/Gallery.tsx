import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties} from 'react';
import {contact, gallery, galleryExtra, media, type Shot} from '../content';
import {useReveals} from '../hooks/useReveals';
import {lockScroll} from '../lib/scroll';
import {BookButton} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconChevron, IconClose, IconFacebook} from '../components/Icons';

const filters = ['All', 'Hair', 'Twists & grooming', 'Studio'] as const;
type Filter = (typeof filters)[number];

function Lightbox({shots, index, onClose, onStep}: {shots: Shot[]; index: number; onClose: () => void; onStep: (d: number) => void}) {
  const close = useRef<HTMLButtonElement>(null);
  const shot = shots[index];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    close.current?.focus();
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
      prev?.focus({preventScroll: true});
    };
  }, [onClose, onStep]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${shots.length}`} className="fixed inset-0 z-[57] flex items-center justify-center bg-ink/95 p-4 md:p-14">
      <button type="button" aria-label="Close photo" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-zoom-out" />
      <figure className="relative flex max-h-full flex-col items-center">
        <img src={media(shot.src)} alt={shot.alt} className="max-h-[calc(100svh-150px)] w-auto max-w-full object-contain shadow-2xl" />
        <figcaption className="caps mt-4 text-center text-white/75">
          {shot.alt} · {index + 1} / {shots.length}
        </figcaption>
      </figure>
      <button
        ref={close}
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute top-5 right-5 flex size-12 items-center justify-center bg-white/10 text-white hover:bg-gold hover:text-ink md:top-7 md:right-8"
      >
        <IconClose />
      </button>
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Previous photo"
        className="absolute bottom-5 left-5 flex size-12 items-center justify-center bg-white/10 text-white hover:bg-gold hover:text-ink md:top-1/2 md:bottom-auto md:-translate-y-1/2"
      >
        <IconChevron dir="left" />
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Next photo"
        className="absolute right-5 bottom-5 flex size-12 items-center justify-center bg-white/10 text-white hover:bg-gold hover:text-ink md:top-1/2 md:bottom-auto md:-translate-y-1/2"
      >
        <IconChevron />
      </button>
    </div>
  );
}

export function Gallery() {
  const ref = useReveals<HTMLDivElement>();
  const [filter, setFilter] = useState<Filter>('All');
  const [open, setOpen] = useState<number | null>(null);

  const shots = useMemo(() => (filter === 'All' ? gallery : gallery.filter((g) => g.tag === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)), [shots.length]);

  return (
    <div ref={ref}>
      <Hero
        short
        eyebrow="03 — Gallery"
        lines={[{t: 'Fresh from'}, {t: 'the chair', i: true}]}
        body="Cuts, twists, silk presses, colour and the studio itself."
        image="twists-back.jpg"
        alt="Glossy twists seen from the back, in the LAVISH A studio"
        position="50% 45%"
      />

      <section aria-label="Photos" className="bg-ink px-3 pt-10 pb-24 md:px-14 md:pt-14">
        <div className="mx-auto max-w-[1680px]">
          <div className="mb-12 grid gap-6 px-2 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-0" data-reveal>
            <h2 className="display text-[clamp(36px,3.6vw,60px)]">
              Cuts, colour, twists <span className="it gilt block pr-[0.08em]">& silk presses</span>
            </h2>
            <div>
              <p className="prose-body max-w-[600px] text-white/80">{galleryExtra.intro}</p>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="caps mt-6 inline-flex min-h-11 items-center gap-2 border-b border-white/30 text-white hover:border-gold hover:text-gold-light"
              >
                <IconFacebook /> More on our Facebook page
              </a>
            </div>
          </div>

          <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2 px-2 md:px-0">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`caps min-h-11 border px-5 transition-colors ${
                  filter === f ? 'border-gold bg-gold text-ink' : 'border-white/25 text-white/80 hover:border-gold hover:text-gold-light'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {shots.length} photos
          </p>

          <ul key={filter} className="mt-10 columns-2 gap-2 md:columns-3 md:gap-3 xl:columns-4">
            {shots.map((s, i) => (
              <li key={s.src} className="mb-2 break-inside-avoid md:mb-3" data-reveal style={{'--d': `${(i % 4) * 0.06}s`} as CSSProperties}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-ink-2"
                  aria-label={`Open photo: ${s.alt}`}
                >
                  <img
                    src={media(s.src)}
                    alt=""
                    width={s.w}
                    height={s.h}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                  />
                  <span className="caps absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(14_13_12/0.85),transparent)] p-4 pt-10 text-left text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {s.tag}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-8 border-t border-white/15 pt-10 px-2 md:px-0">
            <p className="display text-[clamp(30px,3vw,48px)]">
              Love a look? <span className="it gilt pr-[0.08em]">Book it.</span>
            </p>
            <BookButton tone="gold" />
          </div>
        </div>
      </section>

      {open !== null && <Lightbox shots={shots} index={open} onClose={close} onStep={step} />}
    </div>
  );
}
