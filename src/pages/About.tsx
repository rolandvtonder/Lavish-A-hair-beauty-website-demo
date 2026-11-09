import type {CSSProperties} from 'react';
import {about, contact, media, whatsapp} from '../content';
import {useReveals} from '../hooks/useReveals';
import {ArrowLink, BookButton, Eyebrow, Headline} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconWhatsApp} from '../components/Icons';

export function About() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Hero
        short
        eyebrow="05 — About"
        lines={[{t: 'The'}, {t: 'Lavish', i: true}, {t: 'Studio'}]}
        image="sectioning.jpg"
        alt="A LAVISH A stylist sectioning natural hair"
        position="50% 40%"
      />

      {/* Story */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div data-reveal className="flex flex-col items-start gap-10">
            <Headline lines={about.lines} light className="text-[clamp(46px,5.6vw,100px)]" />
            <img
              src={media('logo.jpg')}
              alt="The LAVISH A Hair & Beauty Salon logo: a woman's profile with flowing gold and silver hair inside a gold ring"
              width={280}
              height={280}
              loading="lazy"
              className="size-[clamp(180px,20vw,280px)] rounded-full shadow-[0_30px_80px_-30px_rgb(125_95_28/0.55)]"
            />
          </div>
          <div data-reveal style={{'--d': '0.12s'} as CSSProperties} className="space-y-6 md:pt-4">
            <Eyebrow light>Our story</Eyebrow>
            {about.story.map((p) => (
              <p key={p.slice(0, 24)} className="prose-body text-mute">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <BookButton />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-label="What we do" className="bg-ink px-5 py-24 md:px-14 md:py-32">
        <ul className="mx-auto grid max-w-[1680px] gap-[3px] md:grid-cols-3">
          {about.values.map((v, i) => (
            <li key={v.title} data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties} className="bg-ink-2 p-8 md:p-12">
              <p className="caps text-gold">0{i + 1}</p>
              <h2 className="display mt-6 text-[clamp(34px,3vw,52px)]">{v.title}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-white/75">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Inside the studio */}
      <section aria-labelledby="studio-title" className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
        <div className="mx-auto grid max-w-[1680px] items-center gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal className="aspect-square max-w-[640px] overflow-hidden bg-cream">
            <img
              src={media('salon-pedicure.jpg')}
              alt="Pedicure recliners and foot spas beneath the LAVISH A sign"
              width={960}
              height={960}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
            <Eyebrow light>Visit us</Eyebrow>
            <h2 id="studio-title" className="display mt-5 text-[clamp(42px,5vw,88px)]">
              {about.studio.title[0]} <span className="it block text-gold-deep">{about.studio.title[1]}</span>
            </h2>
            <p className="prose-body mt-6 max-w-[540px] text-mute">{about.studio.body}</p>
            <ul className="mt-8 space-y-3">
              {about.studio.points.map((p) => (
                <li key={p} className="flex gap-4 text-[17px] text-ink/85">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="relative overflow-hidden bg-ink">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[420px] md:min-h-[640px]">
            <img
              src={media('twists-in-progress.jpg')}
              alt="Twists being finished with a comb during a session"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-20 md:px-16" data-reveal>
            <Eyebrow>For stylists</Eyebrow>
            <h2 className="display mt-5 text-[clamp(46px,5vw,92px)]">
              {about.training.title[0]}
              <span className="it gilt block pr-[0.08em]">{about.training.title[1]}</span>
            </h2>
            <p className="prose-body mt-8 max-w-[520px] text-white/80">{about.training.body}</p>
            <p className="caps mt-8 text-gold">What you'll learn</p>
            <ul className="mt-3 space-y-2">
              {about.training.topics.map((t) => (
                <li key={t} className="flex gap-4 text-[17px] text-white/85">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={whatsapp(contact.shop.intl, "Hi LAVISH A, I'm interested in your in-salon training. When is the next session?")}
                target="_blank"
                rel="noreferrer"
                className="caps inline-flex min-h-12 items-center gap-3 bg-gold px-7 py-3.5 text-ink transition-colors duration-300 hover:bg-paper"
              >
                <IconWhatsApp /> Ask about the next date
              </a>
              <ArrowLink href="/contact/">Visit the studio</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
