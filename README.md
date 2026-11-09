# LAVISH A — Hair & Beauty Studio website

Website for LAVISH A Hair & Beauty Studio, 56 Voortrekker Road, Goodwood, Cape Town.

**Live demo:** https://rolandvtonder.github.io/Lavish-A-hair-beauty-website-demo/

Built with Vite, React, Tailwind CSS and Lenis. Every page is pre-rendered to
plain HTML at build time for search engines.

## Editing content

All text, services, prices, products, opening hours and SEO titles live in
[`src/content.ts`](src/content.ts). Photos are in `public/media/`.

## Commands

```bash
npm install          # once
npm run dev          # local preview at http://localhost:5173
npm run build        # production build for a site on its own domain → dist/
bash scripts/deploy-pages.sh   # build and publish the GitHub Pages demo
```

Before going live on a real domain, set `site.url` in `src/content.ts` to switch
on canonical links, share images and `sitemap.xml`.
