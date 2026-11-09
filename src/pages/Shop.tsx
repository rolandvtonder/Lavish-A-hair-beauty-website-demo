import type {CSSProperties} from 'react';
import {contact, laybuy, media, orderLink, products, shopExtra, shopNote} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, Steps} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconWhatsApp} from '../components/Icons';

export function Shop() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Hero
        short
        eyebrow="04 — Shop"
        lines={[{t: 'Take the'}, {t: 'salon home', i: true}]}
        body={`Haircare sets and professional dryers. Order on WhatsApp: ${contact.shop.display}.`}
        image="bob-back.jpg"
        alt="A glossy tapered bob, finished at LAVISH A"
        position="50% 35%"
      />

      <section aria-label="Products" className="bg-paper px-5 py-20 text-ink md:px-14 md:py-28">
        <div className="mx-auto max-w-[1680px]">
          <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16" data-reveal>
            <h2 className="display text-[clamp(38px,4vw,68px)]">
              Salon haircare <span className="it block text-gold-deep">for home</span>
            </h2>
            <p className="prose-body max-w-[620px] self-end text-mute">{shopExtra.intro}</p>
          </div>

          <ul className="grid gap-x-8 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
            {products.map((p, i) => (
              <li key={p.id} data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties} className="flex flex-col">
                <div className="aspect-[4/5] overflow-hidden bg-cream">
                  <img
                    src={media(p.image)}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{transformOrigin: p.imagePos, scale: String(p.zoom)}}
                  />
                </div>
                <div className="mt-7 flex items-baseline justify-between gap-6">
                  <h2 className="display text-[clamp(32px,2.8vw,46px)]">
                    <span className="block">{p.name[0]}</span>
                    <span className="it block text-gold-deep">{p.name[1]}</span>
                  </h2>
                  <p className="shrink-0 text-right">
                    <span className="display block text-[clamp(32px,2.8vw,46px)]">{p.price}</span>
                    {p.priceNote && <span className="caps block text-[11px] text-mute">{p.priceNote}</span>}
                  </p>
                </div>
                <div className="gold-rule my-6" />
                <p className="text-[17px] leading-relaxed text-mute">{p.desc}</p>
                <ul className="mt-5 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[16px] text-ink/85">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                {p.options && (
                  <div className="mt-6">
                    <p className="caps text-gold-deep">{p.options.label}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {p.options.values.map((v) => (
                        <li key={v} className="border border-ink/15 px-3 py-1 text-[15px] text-ink/80">
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-auto pt-8">
                  <a
                    href={orderLink(`${p.name.join(' ')} (${p.price})`)}
                    target="_blank"
                    rel="noreferrer"
                    className="caps inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ink px-7 py-3.5 text-paper transition-colors duration-300 hover:bg-gold hover:text-ink"
                  >
                    <IconWhatsApp /> Order on WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <section aria-labelledby="order-title" className="mt-28 border-t border-ink/10 pt-16">
            <div data-reveal>
              <Eyebrow light>How to order</Eyebrow>
              <h2 id="order-title" className="display mt-5 text-[clamp(38px,4vw,68px)]">
                Ordering is <span className="it text-gold-deep">easy.</span>
              </h2>
            </div>
            <div className="mt-12">
              <Steps items={shopExtra.steps} light />
            </div>
          </section>

          <div className="mt-24 grid gap-10 border-t border-ink/10 pt-14 md:grid-cols-2" data-reveal>
            <div>
              <Eyebrow light>Laybuy</Eyebrow>
              <p className="display mt-4 text-[clamp(30px,3vw,50px)]">
                Shop now, <span className="it text-gold-deep">pay later.</span>
              </p>
            </div>
            <div className="space-y-4 text-[17px] leading-relaxed text-mute">
              <p>{laybuy}</p>
              <p>{shopNote}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
