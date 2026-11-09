import {useEffect, useState} from 'react';
import {brand, contact, media, nav, whatsapp} from '../content';
import {useFitText} from '../hooks/useFitText';
import {IconFacebook, IconInstagram, IconPhone, IconPin, IconWhatsApp} from './Icons';
import {Link} from './Link';

export function Footer() {
  const word = useFitText<HTMLSpanElement>();
  // Starts from the build year so pre-rendered HTML and the first client render match.
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-20 pb-28 text-white md:px-14 md:pb-12">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex items-start gap-5">
            <img src={media('logo.jpg')} alt="LAVISH A Hair & Beauty Salon logo" width={88} height={88} loading="lazy" className="size-22 shrink-0 rounded-full" />
            <p className="prose-body max-w-[300px] text-white/75">
              Hair, nails and a little luxury on Voortrekker Road, Goodwood.
            </p>
          </div>

          <div>
            <p className="caps text-gold">Visit</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex gap-3 text-[17px] leading-snug text-white/85 hover:text-gold-light"
            >
              <IconPin className="mt-0.5 shrink-0 text-gold" />
              <span>
                {contact.address[0]}
                <br />
                {contact.address[1]}
              </span>
            </a>
          </div>

          <div>
            <p className="caps text-gold">Talk to us</p>
            <ul className="mt-3 space-y-2 text-[17px] text-white/85">
              <li>
                <a href={`tel:+${contact.booking.intl}`} className="flex min-h-8 items-center gap-3 hover:text-gold-light">
                  <IconPhone className="text-gold" /> {contact.booking.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsapp(contact.booking.intl, 'Hi LAVISH A!')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-8 items-center gap-3 hover:text-gold-light"
                >
                  <IconWhatsApp className="text-gold" /> WhatsApp us
                </a>
              </li>
              <li>
                <a href={contact.facebook} target="_blank" rel="noreferrer" className="flex min-h-8 items-center gap-3 hover:text-gold-light">
                  <IconFacebook className="text-gold" /> Facebook
                </a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noreferrer" className="flex min-h-8 items-center gap-3 hover:text-gold-light">
                  <IconInstagram className="text-gold" /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="caps text-gold">Explore</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[17px] text-white/85">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-8 items-center hover:text-gold-light">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20" aria-hidden>
          <span ref={word} className="display gilt inline-block whitespace-nowrap leading-[0.8]">
            {brand.name}
          </span>
        </div>

        <div className="gold-rule mt-8" />
        <p className="caps mt-6 text-white/55">
          © {year} {brand.full} · Goodwood, Cape Town
        </p>
      </div>
    </footer>
  );
}
