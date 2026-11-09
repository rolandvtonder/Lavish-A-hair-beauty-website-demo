import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {areas, contact, faq, gallery, home, media, products} from '../content';
import {useReveals} from '../hooks/useReveals';
import {ArrowLink, BookButton, Eyebrow, Faq, Headline, Steps} from '../components/Bits';
import {Hero} from '../components/Hero';
import {Link} from '../components/Link';

/**
 * The signatures: three tall panels slide in from the right one after
 * another — hair, grooming, nails — each opening its corner of the menu.
 */
function Signatures() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-labelledby="signatures-title" className="relative bg-ink">
      <h2 id="signatures-title" className="sr-only">Our signatures</h2>
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {home.signatures.map((s, i) => (
          <Link
            key={s.id}
            href={s.href}
            className={`group relative block overflow-hidden bg-ink-2 transition-transform duration-[1100ms] ease-wipe max-md:h-[78svh] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`} as CSSProperties}
          >
            <img
              src={media(s.image)}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_13_12/0.72),transparent_45%,rgb(14_13_12/0.65))]" />
            <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
              <div>
                <p className="caps text-gold-light">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{s.name[0]}</span>
                  <span className="it gilt block pr-[0.08em]">{s.name[1]}</span>
                </h3>
              </div>
              <div className={`transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                <ul className="space-y-1">
                  {s.items.map((it) => (
                    <li key={it} className="caps text-[13px] text-white/90">
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="caps mt-6 inline-flex items-center gap-3 border-b border-gold/60 pb-1 text-gold-light">
                  See services &amp; prices
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Home() {
  const ref = useReveals<HTMLDivElement>();
  const teaser = products.slice(0, 3);

  return (
    <div ref={ref}>
      <Hero {...home.hero} position="50% 30%" />
      <Signatures />

      {/* Statement */}
      <section className="bg-paper px-5 py-28 text-ink md:px-14 md:py-40">
        <div className="mx-auto grid max-w-[1680px] items-end gap-12 md:grid-cols-[1.4fr_1fr]">
          <div data-reveal>
            <Eyebrow light>The studio</Eyebrow>
            <Headline lines={home.statement.lines} light className="mt-6 text-[clamp(46px,6.2vw,112px)]" />
          </div>
          <div data-reveal style={{'--d': '0.15s'} as CSSProperties}>
            <p className="prose-body max-w-[460px] text-mute">{home.statement.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <BookButton />
              <ArrowLink href="/about/" light>
                About us
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Why LAVISH A */}
      <section aria-labelledby="why-title" className="bg-ink px-5 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <div data-reveal className="max-w-[900px]">
            <Eyebrow>Why LAVISH A</Eyebrow>
            <h2 id="why-title" className="display mt-5 text-[clamp(42px,5vw,88px)]">
              Your Goodwood <span className="it gilt pr-[0.08em]">hair & beauty</span> studio
            </h2>
          </div>
          <ul className="mt-14 grid gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
            {home.why.map((w, i) => (
              <li key={w.title} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className="bg-ink-2 p-8 md:p-10">
                <p className="caps text-gold">0{i + 1}</p>
                <h3 className="display mt-6 text-[clamp(28px,2.2vw,36px)]">{w.title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-white/75">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How booking works */}
      <section aria-labelledby="steps-title" className="bg-cream px-5 py-24 text-ink md:px-14 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-end justify-between gap-8" data-reveal>
            <div>
              <Eyebrow light>How booking works</Eyebrow>
              <h2 id="steps-title" className="display mt-5 text-[clamp(42px,5vw,88px)]">
                Three steps <span className="it text-gold-deep">to lavish.</span>
              </h2>
            </div>
            <BookButton />
          </div>
          <div className="mt-16">
            <Steps items={home.steps} light />
          </div>
        </div>
      </section>

      {/* Shop teaser */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-end justify-between gap-8" data-reveal>
            <div>
              <Eyebrow>The shop</Eyebrow>
              <h2 className="display mt-5 text-[clamp(42px,5vw,88px)]">
                Take the salon <span className="it gilt block pr-[0.08em]">home.</span>
              </h2>
            </div>
            <ArrowLink href="/shop/">Shop all products</ArrowLink>
          </div>
          <div className="mt-14 grid gap-[3px] md:grid-cols-3">
            {teaser.map((p, i) => (
              <Link
                key={p.id}
                href="/shop/"
                data-reveal
                style={{'--d': `${i * 0.1}s`} as CSSProperties}
                className="group relative block aspect-[4/5] overflow-hidden bg-ink-2"
              >
                <img
                  src={media(p.image)}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
                  style={{transformOrigin: p.imagePos, scale: String(p.zoom)}}
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(14_13_12/0.9),transparent_55%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="display text-[clamp(28px,2.4vw,40px)] text-white">
                    {p.name[0]} <span className="it gilt pr-[0.08em]">{p.name[1]}</span>
                  </h3>
                  <p className="caps mt-2 text-[13px] text-gold-light">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section aria-labelledby="work-title" className="bg-paper px-5 pt-24 pb-12 text-ink md:px-14 md:pt-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-end justify-between gap-8" data-reveal>
            <div>
              <Eyebrow light>Recent work</Eyebrow>
              <h2 id="work-title" className="display mt-5 text-[clamp(42px,5vw,88px)]">
                Fresh from <span className="it text-gold-deep">the chair.</span>
              </h2>
            </div>
            <ArrowLink href="/gallery/" light>
              See the gallery
            </ArrowLink>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {home.gallery.map((src, i) => {
              const shot = gallery.find((g) => g.src === src)!;
              return (
                <li key={src} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
                  <Link href="/gallery/" className="group block aspect-[3/4] overflow-hidden bg-cream">
                    <img
                      src={media(src)}
                      alt={shot.alt}
                      width={shot.w}
                      height={shot.h}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.05]"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
        <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div data-reveal>
            <Eyebrow light>Good to know</Eyebrow>
            <h2 id="faq-title" className="display mt-5 text-[clamp(42px,5vw,88px)]">
              Questions, <span className="it text-gold-deep block">answered.</span>
            </h2>
            <p className="prose-body mt-6 max-w-[380px] text-mute">
              Anything else? Send us a WhatsApp on {contact.booking.display} — we are happy to help.
            </p>
          </div>
          <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
            <Faq items={faq} light />
          </div>
        </div>
      </section>

      {/* Visit */}
      <section aria-labelledby="visit-title" className="gilt-bg px-5 py-20 text-ink md:px-14">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-10" data-reveal>
          <div>
            <p className="caps text-ink/75">Find us</p>
            <h2 id="visit-title" className="display mt-3 text-[clamp(36px,4vw,68px)]">
              {contact.address[0]}
              <span className="it block">{contact.address[1]}</span>
            </h2>
            <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-ink/80">
              Easy to reach from {areas.slice(1, 6).join(', ')} and the rest of Cape Town's Northern Suburbs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <BookButton />
            <a href={`tel:+${contact.booking.intl}`} className="caps inline-flex min-h-12 items-center border-b border-ink/40 pb-1 hover:border-ink">
              Call {contact.booking.display}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
