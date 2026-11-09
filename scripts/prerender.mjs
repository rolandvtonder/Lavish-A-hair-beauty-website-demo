/**
 * After `vite build` (the browser site) and `vite build --ssr` (the renderer),
 * this writes every page's real HTML and <head> tags into dist/, then adds
 * robots.txt and, once site.url is set in src/content.ts, sitemap.xml.
 */
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const {render, routes, site} = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

for (const route of routes) {
  const file = path.join(dist, route.slice(1), 'index.html');
  const template = fs.readFileSync(file, 'utf8');
  const {html, head} = render(route);
  if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
    throw new Error(`${file} is missing the <!--app-head--> or empty #root placeholder`);
  }
  const out = template.replace('<!--app-head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  fs.writeFileSync(file, out);
  console.log(`  pre-rendered ${route}`);
}

const base = (site.url || '').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

if (base) {
  const urls = routes
    .map((r) => `  <url>\n    <loc>${base}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r === '/' ? '1.0' : '0.8'}</priority>\n  </url>`)
    .join('\n');
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  console.log('  wrote sitemap.xml');
} else {
  console.warn('  ! site.url is empty in src/content.ts: skipped sitemap.xml, canonical links and share images');
}

fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`);
console.log('  wrote robots.txt');

fs.rmSync(ssrDir, {recursive: true, force: true});
