import {useCallback, useEffect, useState} from 'react';
import {brand, bookLink, media, seo} from './content';
import {useReducedMotion} from './hooks/useReducedMotion';
import {useRoute, type Route} from './lib/router';
import {scrollToHash, startScroll} from './lib/scroll';
import {Curtain} from './components/Curtain';
import {Footer} from './components/Footer';
import {IconWhatsApp} from './components/Icons';
import {Link} from './components/Link';
import {Menu} from './components/Menu';
import {About} from './pages/About';
import {Contact} from './pages/Contact';
import {Gallery} from './pages/Gallery';
import {Home} from './pages/Home';
import {Services} from './pages/Services';
import {Shop} from './pages/Shop';

const pages: Record<Route, () => React.JSX.Element> = {
  '/': Home,
  '/services/': Services,
  '/gallery/': Gallery,
  '/shop/': Shop,
  '/about/': About,
  '/contact/': Contact,
};

export default function App() {
  const reduced = useReducedMotion();
  const route = useRoute();
  const [open, setOpen] = useState(false);
  useEffect(() => startScroll(reduced), [reduced]);

  // Keep the title and description right as pages swap client-side.
  useEffect(() => {
    document.title = seo[route].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo[route].description);
  }, [route]);

  // A shared link like /services/#nails: land on the section once laid out.
  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => scrollToHash(location.hash, true), 350);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    document.getElementById('menu-toggle')?.focus({preventScroll: true});
  }, []);

  const Page = pages[route];

  return (
    <>
      <a
        href="#main"
        className="caps fixed top-3 left-3 z-[70] -translate-y-20 bg-gold px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <Link href="/" aria-label={`${brand.full} — home`} className="fixed top-5 left-5 z-[55] md:top-7 md:left-14">
        <img src={media('logo.jpg')} alt="" width={44} height={44} className="size-11 rounded-full shadow-[0_4px_20px_rgb(0_0_0/0.35)]" />
      </Link>
      {/* The wordmark sits on its own layer so its difference blend reads over photos and ivory alike. */}
      <Link
        href="/"
        tabIndex={-1}
        aria-hidden
        className="display fixed top-[34px] left-[78px] z-[55] text-[20px] tracking-[0.22em] text-white mix-blend-difference max-sm:hidden md:top-[42px] md:left-[124px]"
      >
        {brand.name}
      </Link>

      <button
        id="menu-toggle"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-11 cursor-pointer items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-paper' : 'bg-ink/55 text-paper hover:bg-ink/75'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[16px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={bookLink()}
        target="_blank"
        rel="noreferrer"
        className={`caps fixed right-5 bottom-5 z-[55] flex min-h-12 items-center gap-3 px-7 py-3.5 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] transition-colors duration-500 md:right-8 md:bottom-7 ${
          open ? 'gilt-bg text-ink' : 'bg-paper text-ink hover:bg-gold'
        }`}
      >
        <IconWhatsApp /> Book <em className="normal-case">now</em>
      </a>

      <main id="main" tabIndex={-1}>
        <Page key={route} />
      </main>
      <Footer />

      <Menu open={open} route={route} onClose={close} />
      <Curtain enabled={!reduced} />
      <div className="grain" aria-hidden />
    </>
  );
}
