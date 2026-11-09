import {useEffect, useState, type CSSProperties, type FormEvent} from 'react';
import {contact, contactExtra, faq, media, services, whatsapp} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Eyebrow, Faq} from '../components/Bits';
import {Hero} from '../components/Hero';
import {IconClock, IconFacebook, IconInstagram, IconPhone, IconPin, IconWhatsApp} from '../components/Icons';

const allServices = services.flatMap((g) => g.services.map((s) => `${g.title[0]} — ${s.name}`));

const field =
  'mt-2 block min-h-12 w-full border border-ink/20 bg-white px-4 py-3 text-[17px] text-ink outline-none transition-colors focus:border-gold-deep focus-visible:outline-2 focus-visible:outline-gold';

/**
 * Booking form with no server: it writes the request into a WhatsApp
 * message to the salon, so nothing is stored and nothing needs hosting.
 */
function BookingForm() {
  const [errors, setErrors] = useState<{name?: string; service?: string}>({});
  // Set after mount so the pre-rendered page never carries a stale date.
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const service = String(data.get('service') ?? '');
    const date = String(data.get('date') ?? '');
    const time = String(data.get('time') ?? '');
    const notes = String(data.get('notes') ?? '').trim();

    const next: typeof errors = {};
    if (!name) next.name = 'Please tell us your name so we know who is booking.';
    if (!service) next.service = 'Please choose a service — or pick "Not sure yet".';
    setErrors(next);
    if (next.name || next.service) {
      document.getElementById(next.name ? 'f-name' : 'f-service')?.focus();
      return;
    }

    const lines = [
      `Hi LAVISH A, I'd like to book an appointment.`,
      `Name: ${name}`,
      `Service: ${service}`,
      date && `Preferred date: ${new Date(`${date}T12:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long'})}`,
      time && `Preferred time: ${time}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean);
    window.open(whatsapp(contact.booking.intl, lines.join('\n')), '_blank', 'noopener');
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6" aria-describedby="form-help">
      <p id="form-help" className="text-[16px] leading-relaxed text-mute">
        Fill this in and we'll open WhatsApp with your request ready to send. Fields marked <span aria-hidden>*</span>
        <span className="sr-only">required</span> are required.
      </p>

      <div>
        <label htmlFor="f-name" className="caps text-ink">
          Your name <span aria-hidden className="text-gold-deep">*</span>
        </label>
        <input
          id="f-name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'e-name' : undefined}
          className={field}
        />
        {errors.name && (
          <p id="e-name" role="alert" className="mt-2 text-[15px] text-[#9b2c1f]">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="f-service" className="caps text-ink">
          Service <span aria-hidden className="text-gold-deep">*</span>
        </label>
        <select
          id="f-service"
          name="service"
          required
          defaultValue=""
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? 'e-service' : undefined}
          className={field}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {allServices.map((s) => (
            <option key={s}>{s}</option>
          ))}
          <option>Not sure yet — I'd like advice</option>
        </select>
        {errors.service && (
          <p id="e-service" role="alert" className="mt-2 text-[15px] text-[#9b2c1f]">
            {errors.service}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="f-date" className="caps text-ink">
            Preferred date
          </label>
          <input id="f-date" name="date" type="date" min={today} className={field} />
        </div>
        <div>
          <label htmlFor="f-time" className="caps text-ink">
            Preferred time
          </label>
          <select id="f-time" name="time" defaultValue="" className={field}>
            <option value="">Any time</option>
            <option>Morning</option>
            <option>Midday</option>
            <option>Afternoon</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="f-notes" className="caps text-ink">
          Anything we should know?
        </label>
        <textarea id="f-notes" name="notes" rows={4} className={`${field} resize-y`} placeholder="Hair length, the look you want, nail shape…" />
      </div>

      <button
        type="submit"
        className="caps inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 bg-ink px-7 py-3.5 text-paper transition-colors duration-300 hover:bg-gold hover:text-ink sm:w-auto"
      >
        <IconWhatsApp /> Send on WhatsApp
      </button>
    </form>
  );
}

export function Contact() {
  const ref = useReveals<HTMLDivElement>();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <div ref={ref}>
      <Hero
        short
        eyebrow="06 — Contact & book"
        lines={[{t: 'Come in,'}, {t: 'sit back.', i: true}]}
        body={`${contact.address.join(', ')}.`}
        image="salon-pedicure.jpg"
        alt="The LAVISH A studio with its pedicure recliners and red script sign"
        position="50% 50%"
      />

      <section className="bg-paper px-5 py-20 text-ink md:px-14 md:py-28">
        <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Details */}
          <div data-reveal>
            <Eyebrow light>Visit &amp; talk to us</Eyebrow>
            <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              <li className="flex gap-5 py-6">
                <IconPin className="mt-1 shrink-0 text-gold-deep" width={22} height={22} />
                <div>
                  <p className="caps text-mute">Address</p>
                  <p className="display mt-1 text-[clamp(26px,2.2vw,34px)]">
                    {contact.address[0]}
                    <span className="block">{contact.address[1]}</span>
                  </p>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="caps mt-3 inline-flex min-h-11 items-center border-b border-ink/30 text-gold-deep hover:border-gold-deep">
                    Get directions
                  </a>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <IconPhone className="mt-1 shrink-0 text-gold-deep" width={22} height={22} />
                <div>
                  <p className="caps text-mute">Appointments</p>
                  <a href={`tel:+${contact.booking.intl}`} className="display mt-1 block text-[clamp(26px,2.2vw,34px)] hover:text-gold-deep">
                    {contact.booking.display}
                  </a>
                  <p className="caps mt-4 text-mute">Shop orders &amp; training</p>
                  <a href={`tel:+${contact.shop.intl}`} className="display mt-1 block text-[clamp(26px,2.2vw,34px)] hover:text-gold-deep">
                    {contact.shop.display}
                  </a>
                </div>
              </li>
              <li className="flex gap-5 py-6">
                <IconClock className="mt-1 shrink-0 text-gold-deep" width={22} height={22} />
                <div className="w-full">
                  <p className="caps text-mute">Opening hours</p>
                  {contact.hours.length ? (
                    <dl className="mt-2 space-y-1 text-[17px]">
                      {contact.hours.map(([d, h]) => (
                        <div key={d} className="flex justify-between gap-6 border-b border-dashed border-ink/10 pb-1">
                          <dt>{d}</dt>
                          <dd className="tabular-nums">{h}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-1 text-[17px] leading-relaxed text-ink/85">
                      Call or WhatsApp {contact.booking.display} for today's hours and the next open slot.
                    </p>
                  )}
                </div>
              </li>
              <li className="flex flex-wrap gap-x-8 gap-y-2 py-6">
                <a href={contact.facebook} target="_blank" rel="noreferrer" className="caps flex min-h-11 items-center gap-2 hover:text-gold-deep">
                  <IconFacebook /> Facebook
                </a>
                <a href={contact.instagram} target="_blank" rel="noreferrer" className="caps flex min-h-11 items-center gap-2 hover:text-gold-deep">
                  <IconInstagram /> Instagram
                </a>
              </li>
            </ul>

            <figure className="mt-10 flex items-center gap-5">
              <img
                src={media('shopfront.jpg')}
                alt="The LAVISH A shopfront with its gold sign"
                width={160}
                height={150}
                loading="lazy"
                className="w-40 shrink-0 object-cover"
              />
              <figcaption className="text-[16px] leading-relaxed text-mute">{contactExtra.gettingHere}</figcaption>
            </figure>
          </div>

          {/* Booking */}
          <div id="book" data-reveal style={{'--d': '0.12s'} as CSSProperties} className="bg-cream/60 p-6 md:p-12">
            <Eyebrow light>Book an appointment</Eyebrow>
            <h2 className="display mt-4 mb-8 text-[clamp(38px,3.6vw,60px)]">
              Request a <span className="it text-gold-deep">booking</span>
            </h2>
            <BookingForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-faq-title" className="bg-paper px-5 pb-24 text-ink md:px-14 md:pb-32">
        <div className="mx-auto grid max-w-[1680px] gap-12 border-t border-ink/10 pt-20 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div data-reveal>
            <Eyebrow light>Before you book</Eyebrow>
            <h2 id="contact-faq-title" className="display mt-5 text-[clamp(38px,4vw,68px)]">
              Common <span className="it block text-gold-deep">questions</span>
            </h2>
          </div>
          <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
            <Faq items={faq} light />
          </div>
        </div>
      </section>

      <section aria-label="Map" className="bg-ink">
        <iframe
          title={`Map showing LAVISH A at ${contact.address.join(', ')}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[60svh] min-h-[380px] w-full border-0 grayscale-[0.6] contrast-[1.05]"
        />
      </section>
    </div>
  );
}
