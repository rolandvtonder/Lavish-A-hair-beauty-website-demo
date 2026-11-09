import type {CSSProperties} from 'react';
import {bookLink, faq, media, priceNote, services, servicesExtra} from '../content';
import {useReveals} from '../hooks/useReveals';
import {BookButton, Eyebrow, Faq} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconWhatsApp} from '../components/Icons';
import {Link} from '../components/Link';

export function Services() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Hero
        short
        eyebrow="02 — Services & prices"
        lines={[{t: 'Services'}, {t: '& prices', i: true}]}
        body="Hair, grooming, nails and feet. Tap any service to book it on WhatsApp."
        image="silk-press-top.jpg"
        alt="A smooth, shiny silk press seen from above"
        position="50% 35%"
      />

      <div className="bg-paper px-5 pt-20 text-ink md:px-14 md:pt-28">
        <div className="mx-auto grid max-w-[1680px] gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16" data-reveal>
          <h2 className="display text-[clamp(38px,4vw,68px)]">
            Hair, nails & feet <span className="it block text-gold-deep">in Goodwood</span>
          </h2>
          <p className="prose-body max-w-[640px] self-end text-mute">{servicesExtra.intro}</p>
        </div>
      </div>

      {/* Category jump links */}
      <nav aria-label="Service categories" className="border-b border-ink/10 bg-paper pt-10">
        <ul className="mx-auto flex max-w-[1680px] flex-wrap gap-x-2 px-2 py-3 md:gap-x-6 md:px-11">
          {services.map((g) => (
            <li key={g.id}>
              <Link
                href={`/services/#${g.id}`}
                className="caps inline-flex min-h-11 items-center whitespace-nowrap px-3 text-ink/75 hover:text-gold-deep"
              >
                {g.title[0]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-paper text-ink">
        {services.map((g, gi) => (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-title`}
            className="mx-auto grid max-w-[1680px] gap-10 border-b border-ink/10 px-5 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:px-14 md:py-28"
          >
            <div className="md:sticky md:top-28 md:self-start" data-reveal>
              <p className="caps text-gold-deep">0{gi + 1}</p>
              <h2 id={`${g.id}-title`} className="display mt-3 text-[clamp(52px,6vw,104px)]">
                {g.title[0]}
              </h2>
              <p className="display it mt-2 text-[clamp(24px,2.2vw,36px)] text-gold-deep">{g.title[1]}</p>
              <p className="prose-body mt-6 max-w-[420px] text-mute">{g.intro}</p>
              <div className="mt-8 hidden aspect-[4/3] max-w-[460px] overflow-hidden md:block">
                <img src={media(g.image)} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </div>

            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {g.services.map((s, i) => (
                <li key={s.name} data-reveal style={{'--d': `${i * 0.05}s`} as CSSProperties}>
                  <a
                    href={bookLink(s.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-7 transition-colors hover:bg-cream/50 md:px-4"
                  >
                    <span className="display text-[clamp(28px,2.6vw,42px)] transition-colors group-hover:text-gold-deep">{s.name}</span>
                    <span className="caps text-right text-[13px] text-ink">{s.price || 'Price on request'}</span>
                    <span className="max-w-[520px] text-[17px] leading-relaxed text-mute">{s.desc}</span>
                    <span className="caps inline-flex items-center gap-2 justify-self-end text-gold-deep">
                      <IconWhatsApp /> Book
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Treatments & tools */}
        <section aria-labelledby="care-title" className="bg-ink px-5 py-24 text-white md:px-14 md:py-32">
          <div className="mx-auto max-w-[1680px]">
            <div data-reveal>
              <Eyebrow>Treatments & tools</Eyebrow>
              <h2 id="care-title" className="display mt-5 text-[clamp(42px,5vw,88px)]">
                Care that <span className="it gilt pr-[0.08em]">shows.</span>
              </h2>
            </div>
            <ul className="mt-14 grid gap-[3px] md:grid-cols-3">
              {servicesExtra.treatments.map((t, i) => (
                <li key={t.name} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className="bg-ink-2 p-8 md:p-10">
                  <h3 className="display text-[clamp(28px,2.4vw,38px)]">{t.name}</h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-white/75">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Before your visit + questions */}
        <section aria-labelledby="visit-tips-title" className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:grid-cols-[1fr_1.6fr] md:gap-20 md:px-14 md:py-32">
          <div data-reveal>
            <Eyebrow light>Before your visit</Eyebrow>
            <h2 id="visit-tips-title" className="display mt-5 text-[clamp(38px,4vw,68px)]">
              A few <span className="it text-gold-deep">tips</span>
            </h2>
            <ul className="mt-8 space-y-5">
              {servicesExtra.tips.map((t) => (
                <li key={t} className="flex gap-4 text-[17px] leading-relaxed text-mute">
                  <span aria-hidden className="mt-[0.65em] size-1.5 shrink-0 rotate-45 bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
            <Faq items={faq.slice(0, 5)} light />
          </div>
        </section>

        <div className="mx-auto max-w-[1680px] border-t border-ink/10 px-5 py-20 md:px-14 md:py-28" data-reveal>
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow light>Good to know</Eyebrow>
              <p className="display mt-5 text-[clamp(32px,3.4vw,56px)]">
                Not sure what you need? <span className="it text-gold-deep">Ask us.</span>
              </p>
              <p className="prose-body mt-6 max-w-[560px] text-mute">{priceNote}</p>
            </div>
            <div className="md:justify-self-end">
              <BookButton label="Ask on WhatsApp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
