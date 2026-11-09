/**
 * All copy, contact details, services, prices and products live here.
 * Edit this one file to update the website.
 *
 * Items marked TODO need confirming by the salon before launch.
 */

import type {Route} from './lib/router';

export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

export const brand = {
  name: 'LAVISH A',
  full: 'LAVISH A Hair & Beauty Studio',
  tagline: 'Hair & Beauty Studio',
};

/**
 * TODO: set the live web address once the domain is bought, e.g.
 * 'https://www.lavisha.co.za' (no trailing slash). It switches on canonical
 * links, social-share images and sitemap.xml, which all need a full address.
 */
export const site = {
  url: '',
};

/** Neighbourhoods near Goodwood, used in copy and for search engines. */
export const areas = ['Goodwood', 'Parow', 'Vasco', 'Thornton', 'Epping', 'Elsies River', "Cape Town's Northern Suburbs"];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  address: ['56 Voortrekker Road', 'Goodwood, Cape Town'],
  mapsQuery: '56 Voortrekker Road, Goodwood, Cape Town, South Africa',
  /** Appointments (from the Facebook page intro). */
  booking: {display: '067 647 8964', intl: '27676478964'},
  /** Product orders and training (from the shop and training flyers). */
  shop: {display: '074 768 2815', intl: '27747682815'},
  facebook: 'https://www.facebook.com/p/Lavish-A-HB-100084716334244/',
  // TODO: confirm the exact Instagram handle.
  instagram: 'https://www.instagram.com/lavish_a_hair_and_beauty/',
  /**
   * TODO: add opening hours, e.g. [['Tue – Fri', '09:00 – 18:00'], ['Sat', '08:00 – 15:00']].
   * While this is empty the site asks visitors to call or WhatsApp instead.
   */
  hours: [] as [string, string][],
};

export const whatsapp = (intl: string, text: string) =>
  `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;

export const bookLink = (service?: string) =>
  whatsapp(
    contact.booking.intl,
    service
      ? `Hi LAVISH A, I'd like to book: ${service}. When do you have a gap?`
      : `Hi LAVISH A, I'd like to book an appointment. When do you have a gap?`,
  );

export const orderLink = (product: string) =>
  whatsapp(contact.shop.intl, `Hi LAVISH A, I'd like to order: ${product}. Is it in stock?`);

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const nav: {label: string; href: Route}[] = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/services/'},
  {label: 'Gallery', href: '/gallery/'},
  {label: 'Shop', href: '/shop/'},
  {label: 'About', href: '/about/'},
  {label: 'Contact', href: '/contact/'},
];

/**
 * What search engines show for each page: the title (aim for under ~60
 * characters) and the description (aim for 140–160 characters).
 */
export const seo: Record<Route, {title: string; description: string; image: string; crumb: string}> = {
  '/': {
    title: 'Hair Salon in Goodwood, Cape Town | LAVISH A Hair & Beauty',
    description:
      'LAVISH A is a hair & beauty studio at 56 Voortrekker Road, Goodwood. Haircuts, colour, silk presses, twists, nails and pedicures. Book on WhatsApp.',
    image: 'hero-highlights.jpg',
    crumb: 'Home',
  },
  '/services/': {
    title: 'Hair, Nail & Pedicure Services in Goodwood | LAVISH A',
    description:
      'Haircuts, styling, colour, highlights, treatments, fades, twists, manicures, acrylic & gel nails and pedicures at LAVISH A, Goodwood, Cape Town.',
    image: 'silk-press-top.jpg',
    crumb: 'Services',
  },
  '/gallery/': {
    title: 'Hair Gallery: Cuts, Colour, Twists & Silk Press | LAVISH A',
    description:
      'See recent work from LAVISH A in Goodwood: sleek bobs, caramel highlights, silk presses, two-strand twists, fades and natural hair styles.',
    image: 'twists-back.jpg',
    crumb: 'Gallery',
  },
  '/shop/': {
    title: 'Shampoo Sets & Veaudry Hair Dryers | LAVISH A Shop',
    description:
      'Shop shampoo & conditioner sets (R120) in 8 flavours and Veaudry myDryer Compact and Pro professional hair dryers. Order on WhatsApp, Laybuy available.',
    image: 'dryer-pro.jpg',
    crumb: 'Shop',
  },
  '/about/': {
    title: 'About LAVISH A | Hair & Beauty Studio in Goodwood, Cape Town',
    description:
      'Meet LAVISH A, a hair & beauty studio on Voortrekker Road, Goodwood, for every hair type and texture, plus nails, pedicures and in-salon stylist training.',
    image: 'sectioning.jpg',
    crumb: 'About',
  },
  '/contact/': {
    title: 'Book an Appointment | LAVISH A, 56 Voortrekker Rd, Goodwood',
    description:
      'Book at LAVISH A Hair & Beauty: 56 Voortrekker Road, Goodwood, Cape Town. Call 067 647 8964 or send a booking request on WhatsApp.',
    image: 'salon-pedicure.jpg',
    crumb: 'Contact',
  },
};

/* ------------------------------------------------------------------ */
/* Questions (shown on the pages and given to search engines)          */
/* ------------------------------------------------------------------ */

export type QA = {q: string; a: string};

export const faq: QA[] = [
  {
    q: 'How do I book an appointment?',
    a: 'Send us a WhatsApp or call 067 647 8964. Tell us the service you want and when suits you, and we will confirm a time. You can also use the booking form on our Contact page.',
  },
  {
    q: 'Where is LAVISH A?',
    a: 'We are at 56 Voortrekker Road, Goodwood, Cape Town. Look for the gold LAVISH A sign above the window. We are easy to reach from Parow, Vasco, Thornton, Epping and Elsies River.',
  },
  {
    q: 'Do you work with natural, curly and coily hair?',
    a: 'Yes. We work with every hair type and texture: straight, wavy, curly, coily and natural. That includes silk presses, natural blow-outs, two-strand twists, comb coils, cuts and fades.',
  },
  {
    q: 'Do you do nails and pedicures too?',
    a: 'Yes. We do manicures, acrylic and gel nails, nail art, French tips, soak-offs and pedicures in our recliner chairs with foot spas, so you can do hair and nails in one visit.',
  },
  {
    q: 'How much do your services cost?',
    a: 'Prices depend on your hair length, thickness and the look you want. We confirm your price at consultation before we start, and you are welcome to ask for a quote on WhatsApp first.',
  },
  {
    q: 'Can I buy hair products from you?',
    a: 'Yes. We sell shampoo & conditioner sets in eight flavours for R120 a set, and Veaudry myDryer Compact and Pro hair dryers. Order on WhatsApp at 074 768 2815. Laybuy is available on the myDryer Pro.',
  },
  {
    q: 'Do you offer training for stylists?',
    a: 'Yes. We host hands-on in-salon training, such as Japanese Silk hair treatment techniques and scalp care sessions. Spots are limited, so WhatsApp 074 768 2815 to ask about the next date.',
  },
];

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

/** Headline lines; `i` lines are set in gold italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  hero: {
    lines: [{t: 'Where every'}, {t: 'Strand', i: true}, {t: 'gets the'}, {t: 'Lavish touch.', i: true}] as Line[],
    body: 'A hair & beauty studio on Voortrekker Road, Goodwood. Cuts, colour, silk presses, twists, nails and pedicures — done with care, finished with a little luxury.',
    image: 'hero-highlights.jpg',
    alt: 'Long, glossy straightened hair with warm caramel highlights, photographed from behind in the LAVISH A studio',
  },
  signatures: [
    {
      id: 'hair',
      name: ['Cut &', 'Colour'] as [string, string],
      items: ['Haircuts', 'Styling', 'Colour', 'Highlights', 'Treatments'],
      image: 'bob-back.jpg',
      alt: 'A sleek, glossy short bob finished at LAVISH A',
      href: '/services/#hair' as const,
    },
    {
      id: 'grooming',
      name: ['Twists &', 'Grooming'] as [string, string],
      items: ['Cuts & fades', 'Twists & coils', 'Natural hair care'],
      image: 'twists-side.jpg',
      alt: 'Defined two-strand twists on top with a clean faded side',
      href: '/services/#grooming' as const,
    },
    {
      id: 'nails',
      name: ['Nails &', 'Pedicures'] as [string, string],
      items: ['Manicures', 'Acrylic & gel', 'Nail art', 'Pedicures'],
      image: 'salon-pedicure.jpg',
      alt: 'Two grey recliner pedicure chairs with foot spas beneath the LAVISH A sign',
      href: '/services/#nails' as const,
    },
  ],
  statement: {
    lines: [{t: 'A little luxury,'}, {t: 'right here in', i: true}, {t: 'Goodwood.'}] as Line[],
    body: 'Step in off Voortrekker Road and slow down. Whether you need a sharp cut, a full colour, fresh twists or a pedicure, we take the time to get it right — and to send you out feeling lavish.',
  },
  why: [
    {title: 'Every hair type', body: 'Straight, curly, coily or natural — cuts, colour, silk presses, twists and coils, done with the right technique for your hair.'},
    {title: 'Hair & nails, one visit', body: 'Styling chairs, a nail station and pedicure recliners under one roof, so you can book everything together.'},
    {title: 'Pro treatments & tools', body: 'Japanese Silk treatments, scalp care and professional Veaudry dryers for smooth, glossy, frizz-free results.'},
    {title: 'Easy booking', body: 'No apps or accounts. Send a WhatsApp, pick a time, and we will confirm your appointment.'},
  ],
  steps: [
    {title: 'Choose', body: 'Browse our services and pick what you would like — or ask us for advice.'},
    {title: 'WhatsApp us', body: 'Message 067 647 8964 with the service and a day that suits you. We will confirm your time.'},
    {title: 'Sit back', body: 'Arrive at 56 Voortrekker Road, relax in the chair and leave feeling lavish.'},
  ],
  gallery: ['twists-side.jpg', 'bob-profile.jpg', 'hero-highlights.jpg', 'twists-top.jpg'],
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  name: string;
  desc: string;
  /** TODO: fill in prices, e.g. 'From R250'. Empty shows "Price on request". */
  price: string;
};

export type ServiceGroup = {
  id: string;
  title: [string, string];
  intro: string;
  image: string;
  alt: string;
  services: Service[];
};

export const services: ServiceGroup[] = [
  {
    id: 'hair',
    title: ['Hair', 'Cut, colour & care'],
    intro: 'Precision cuts, glossy finishes and colour that suits you — for every hair type and texture.',
    image: 'hero-highlights.jpg',
    alt: 'Straight hair with soft caramel highlights',
    services: [
      {name: 'Haircuts', desc: 'Consultation, wash, cut and finish — from trims to a whole new shape.', price: ''},
      {name: 'Hair styling', desc: 'Blow-dries, silk presses, sleek bobs and occasion styling.', price: ''},
      {name: 'Colouring', desc: 'Full colour, root touch-ups and tone refreshes.', price: ''},
      {name: 'Highlights', desc: 'Hand-placed highlights and warm ribbons of colour.', price: ''},
      {name: 'Hair treatments', desc: 'Japanese Silk treatment, scalp care and deep conditioning for frizz, dryness and breakage.', price: ''},
    ],
  },
  {
    id: 'grooming',
    title: ['Grooming', 'Cuts, twists & coils'],
    intro: 'Clean fades and defined texture. Sit back while we shape, twist and finish.',
    image: 'twists-top.jpg',
    alt: 'Neat, defined twists seen from above',
    services: [
      {name: 'Cuts & fades', desc: 'Sharp cuts, tapers and fades, finished clean.', price: ''},
      {name: 'Twists & coils', desc: 'Two-strand twists and comb coils for defined, lasting texture.', price: ''},
      {name: 'Natural hair care', desc: 'Wash, detangle, condition and blow-out for natural hair.', price: ''},
    ],
  },
  {
    id: 'nails',
    title: ['Nails', 'Manicures & nail art'],
    intro: 'Neat, strong, beautiful nails — classic or creative.',
    image: 'salon-pedicure.jpg',
    alt: 'The LAVISH A studio',
    services: [
      {name: 'Manicure', desc: 'Shape, cuticle care and polish.', price: ''},
      {name: 'Acrylic & gel nails', desc: 'Durable, glossy sets in your choice of length and shape.', price: ''},
      {name: 'Nail art & design', desc: 'From subtle accents to full statement designs.', price: ''},
      {name: 'French tips', desc: 'The timeless clean-white finish.', price: ''},
      {name: 'Soak-offs', desc: 'Gentle, safe removal of gel or acrylic.', price: ''},
    ],
  },
  {
    id: 'feet',
    title: ['Feet', 'Pedicures'],
    intro: 'Put your feet up in our recliners and let the foot spa do the rest.',
    image: 'salon-pedicure.jpg',
    alt: 'Recliner pedicure chairs with foot spas',
    services: [
      {name: 'Pedicure', desc: 'Soak, exfoliate, shape, cuticle care and polish.', price: ''},
      {name: 'French tips (toes)', desc: 'A clean, classic finish for your toes.', price: ''},
    ],
  },
];

export const priceNote =
  'Prices depend on hair length, thickness and the look you want — we confirm your price at consultation before we start.';

export const servicesExtra = {
  intro:
    'From a quick trim to a full colour, fresh twists to a full set of nails, every visit starts with a short consultation so we understand your hair, your routine and the look you are after.',
  treatments: [
    {name: 'Japanese Silk treatment', body: 'A superfood hair treatment for bulky, frizzy or unruly hair, leaving it smoother, softer and shinier.'},
    {name: 'Scalp care', body: 'Scalp care sessions to cleanse and care for the scalp — the foundation of healthy hair.'},
    {name: 'Professional tools', body: 'We finish with professional Veaudry dryers, using diffusers for curls and concentrators for sleek, smooth styles.'},
  ],
  tips: [
    'Bring a photo of the look you love — it is the quickest way to show us what you want.',
    'Tell us about any recent colour, relaxer or chemical treatments so we can plan safely.',
    'Running late or need to move your booking? WhatsApp 067 647 8964 as soon as you can.',
  ],
};

export const galleryExtra = {
  intro:
    'Real clients, real results, straight from our chairs on Voortrekker Road. Tap any photo to see it larger, and when you find a look you love, send it to us on WhatsApp to book it.',
};

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

export type Shot = {src: string; alt: string; tag: 'Hair' | 'Twists & grooming' | 'Studio'; w: number; h: number};

export const gallery: Shot[] = [
  {src: 'hero-highlights.jpg', alt: 'Long straight hair with caramel highlights', tag: 'Hair', w: 960, h: 1280},
  {src: 'twists-side.jpg', alt: 'Defined twists on top with a faded side', tag: 'Twists & grooming', w: 960, h: 1280},
  {src: 'bob-profile.jpg', alt: 'A sleek short cut with a soft fringe, seen in profile', tag: 'Hair', w: 960, h: 1280},
  {src: 'salon-pedicure.jpg', alt: 'Pedicure recliners and foot spas in the studio', tag: 'Studio', w: 960, h: 960},
  {src: 'twists-back.jpg', alt: 'Glossy twists seen from the back', tag: 'Twists & grooming', w: 960, h: 1280},
  {src: 'bob-back.jpg', alt: 'A glossy tapered bob from behind', tag: 'Hair', w: 960, h: 1280},
  {src: 'twists-top.jpg', alt: 'Twists seen from above', tag: 'Twists & grooming', w: 960, h: 1280},
  {src: 'silk-press-top.jpg', alt: 'A smooth, shiny silk press from above', tag: 'Hair', w: 960, h: 1280},
  {src: 'sectioning.jpg', alt: 'A stylist sectioning natural hair before twisting', tag: 'Twists & grooming', w: 960, h: 1280},
  {src: 'natural-blowout.jpg', alt: 'A full natural blow-out from behind', tag: 'Hair', w: 960, h: 1280},
  {src: 'twists-in-progress.jpg', alt: 'Twists being finished with a comb', tag: 'Twists & grooming', w: 960, h: 1280},
  {src: 'natural-crop.jpg', alt: 'A short, shaped natural crop', tag: 'Hair', w: 960, h: 1280},
  {src: 'shopfront.jpg', alt: 'The LAVISH A shopfront with its gold sign and services list', tag: 'Studio', w: 564, h: 527},
];

/* ------------------------------------------------------------------ */
/* Shop                                                                */
/* ------------------------------------------------------------------ */

export type Product = {
  id: string;
  name: [string, string];
  price: string;
  priceNote?: string;
  desc: string;
  features: string[];
  options?: {label: string; values: string[]};
  image: string;
  /** Crop: the point to centre on and how far to zoom into the photo. */
  imagePos: string;
  zoom: number;
  alt: string;
};

export const products: Product[] = [
  {
    id: 'sets',
    name: ['Shampoo &', 'Conditioner set'],
    price: 'R120',
    priceNote: 'per set · 2 × 250 ml',
    desc: 'Nourishing, gentle shampoo with a smoothing, hydrating conditioner — choose your scent.',
    features: ['Nourishing & gentle cleanse', 'Smooth & hydrating conditioner', '250 ml each'],
    options: {
      label: 'Flavours',
      values: ['Aloe', 'Argan', 'Rooibos', 'Avo & honey', 'Tea tree', 'Biotin', 'Milk, wheat & honey', 'Coffee & cannabis'],
    },
    image: 'shampoo-sets.jpg',
    imagePos: '36% 50%',
    zoom: 1.9,
    alt: 'LAVISH A shampoo and conditioner bottles with aloe, argan, avocado and honey',
  },
  {
    id: 'compact',
    name: ['Veaudry myDryer', 'Compact'],
    price: 'R2 300',
    priceNote: 'retail price',
    desc: 'Lightweight and compact with a 2200 W professional AC motor — salon power that travels.',
    features: ['2200 W professional AC motor', '2 speed & 3 heat settings', 'Cool-shot button', '2 nozzles + diffuser', '3 m professional cable'],
    image: 'dryer-compact.jpg',
    imagePos: '0% 50%',
    zoom: 1.6,
    alt: 'The black Veaudry myDryer Compact hair dryer',
  },
  {
    id: 'pro',
    name: ['Veaudry myDryer', 'Pro'],
    price: 'R2 999',
    priceNote: 'RSP incl. VAT · Laybuy available',
    desc: 'Engineered for professional styling: a high-speed brushless motor in a 378 g body.',
    features: [
      '75 000 RPM BLDC high-speed motor',
      '378 g lightweight design',
      '3 heat + 3 speed settings',
      'Tourmaline, ceramic & ionic technology',
      '2 concentrator nozzles + diffuser',
      'Cool shot · under 80 dB',
    ],
    image: 'dryer-pro.jpg',
    imagePos: '75% 40%',
    zoom: 1.35,
    alt: 'The Veaudry myDryer Pro with its two nozzles and diffuser',
  },
];

export const laybuy =
  'Laybuy on the myDryer Pro: pay a 50% deposit to secure your order, then settle the balance over a maximum of two months.';

export const shopNote = 'Prices include VAT and can change. Stock is limited — confirm availability on WhatsApp.';

export const shopExtra = {
  intro:
    'The products we trust in the salon, ready to take home: gentle shampoo & conditioner sets in eight flavours, and professional Veaudry dryers built for fast, smooth, frizz-free styling.',
  steps: [
    {title: 'Choose', body: 'Pick your product — and your flavour for shampoo & conditioner sets.'},
    {title: 'WhatsApp us', body: 'Tap "Order on WhatsApp" or message 074 768 2815. We confirm stock and price.'},
    {title: 'Collect & enjoy', body: 'We arrange payment and collection with you directly.'},
  ],
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  lines: [{t: 'Luxury'}, {t: "shouldn't feel", i: true}, {t: 'out of reach.'}] as Line[],
  story: [
    'LAVISH A is a hair & beauty studio at 56 Voortrekker Road in Goodwood, Cape Town. We built it around one idea: everyone deserves to leave the chair feeling lavish.',
    'Our team works with every hair type and texture — straight, curly, coily and natural — from cuts, colour and silk presses to twists and coils. Next door to the styling chairs you will find our nail and pedicure corner, with recliners, foot spas and plenty of polish.',
  ],
  values: [
    {title: 'Every texture', body: 'Straight, curly, coily or natural: we cut, colour, press and twist with the right technique for your hair.'},
    {title: 'Hands & feet', body: 'Manicures, acrylic and gel sets, nail art, French tips and pedicures, done neatly and finished properly.'},
    {title: 'Always learning', body: 'We host hands-on training in the salon, so our techniques and treatments stay current.'},
  ],
  training: {
    title: ['In-salon', 'Training'] as [string, string],
    body: 'We regularly host hands-on training for stylists in the studio: Japanese Silk hair treatment techniques, scalp care sessions and more. Learn step-by-step methods, product knowledge and how to deliver smooth, frizz-free results. Spots are limited, so ask about the next date.',
    topics: [
      'Step-by-step Japanese Silk treatment techniques',
      'How to deliver silky, smooth, frizz-free results',
      'Product knowledge and proper application',
      'Live scalp care demonstrations',
      'Tips to boost client satisfaction and income',
    ],
  },
  studio: {
    title: ['Inside', 'the studio'] as [string, string],
    body: 'A bright, welcoming space on Voortrekker Road with styling stations, a nail corner and comfortable pedicure recliners with foot spas — everything you need for hair, hands and feet in one visit.',
    points: ['Styling stations with mirrors', 'Nail station for manicures, acrylic & gel', 'Recliner pedicure chairs with foot spas', 'Salon products and dryers to take home'],
  },
};

export const contactExtra = {
  gettingHere:
    'We are on Voortrekker Road in Goodwood, Cape Town — easy to reach from Parow, Vasco, Thornton, Epping and Elsies River. Look for the gold LAVISH A sign above the window.',
};
