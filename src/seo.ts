/**
 * Everything search engines and social sites read in each page's <head>:
 * title, description, share tags and schema.org structured data (so Google
 * can show the salon's address, phone, services and FAQs in results).
 * Pre-rendered into every page at build time by scripts/prerender.mjs.
 */

import {areas, brand, contact, faq, media, products, seo, services, site} from './content';
import {withBase, type Route} from './lib/router';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Absolute URL for a path that already includes the base (media() does), or null until site.url is set. */
const abs = (path: string) => (site.url ? site.url.replace(/\/$/, '') + path : null);
/** Absolute URL for a route. */
const absRoute = (route: Route) => abs(withBase(route));

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;

const priceNumber = (p: string) => Number(p.replace(/[^\d.]/g, ''));

function business() {
  const url = absRoute('/');
  const logo = abs(media('logo.jpg'));
  return {
    '@context': 'https://schema.org',
    '@type': ['HairSalon', 'NailSalon'],
    ...(url ? {'@id': `${url}#business`, url} : {}),
    ...(logo ? {logo, image: [logo, abs(media('hero-highlights.jpg')), abs(media('shopfront.jpg'))]} : {}),
    name: brand.full,
    alternateName: ['LAVISH A', 'Lavish A HB', 'Lavish A Hair & Beauty'],
    description: seo['/'].description,
    telephone: `+${contact.booking.intl}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '56 Voortrekker Road',
      addressLocality: 'Goodwood',
      addressRegion: 'Western Cape',
      postalCode: '7460',
      addressCountry: 'ZA',
    },
    hasMap: mapsUrl,
    areaServed: areas.map((name) => ({'@type': 'Place', name})),
    currenciesAccepted: 'ZAR',
    sameAs: [contact.facebook, contact.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hair & beauty services',
      itemListElement: services.map((g) => ({
        '@type': 'OfferCatalog',
        name: g.title[0],
        itemListElement: g.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {'@type': 'Service', name: s.name, description: s.desc},
        })),
      })),
    },
  };
}

function faqPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}})),
  };
}

function productList() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand.name} shop`,
    itemListElement: products.map((p, i) => {
      const image = abs(media(p.image));
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: p.name.join(' '),
          description: p.desc,
          ...(image ? {image} : {}),
          ...(p.id === 'sets' ? {} : {brand: {'@type': 'Brand', name: 'Veaudry'}}),
          offers: {
            '@type': 'Offer',
            price: priceNumber(p.price),
            priceCurrency: 'ZAR',
            seller: {'@type': 'Organization', name: brand.full},
          },
        },
      };
    }),
  };
}

function breadcrumbs(route: Route) {
  const home = absRoute('/');
  const here = absRoute(route);
  if (!home || !here) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: home},
      {'@type': 'ListItem', position: 2, name: seo[route].crumb, item: here},
    ],
  };
}

export function structuredData(route: Route): object[] {
  const out: (object | null)[] = [business()];
  if (route === '/') out.push(faqPage());
  if (route === '/shop/') out.push(productList());
  if (route !== '/') out.push(breadcrumbs(route));
  return out.filter((x): x is object => x !== null);
}

/** The <head> tags for one page, as an HTML string. */
export function headTags(route: Route): string {
  const s = seo[route];
  const canonical = absRoute(route);
  const image = abs(media(s.image));
  const hero = media(s.image);

  const tags = [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    canonical && `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(brand.full)}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(s.title)}" />`,
    `<meta property="og:description" content="${esc(s.description)}" />`,
    canonical && `<meta property="og:url" content="${esc(canonical)}" />`,
    image && `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.title)}" />`,
    `<meta name="twitter:description" content="${esc(s.description)}" />`,
    image && `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="geo.region" content="ZA-WC" />`,
    `<meta name="geo.placename" content="Goodwood, Cape Town" />`,
    `<link rel="preload" as="image" href="${esc(hero)}" fetchpriority="high" />`,
    ...structuredData(route).map(
      (d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}
