import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';

// Every page gets its own HTML file so a direct visit to /services/ (or a
// share link) works on any static host with no rewrite rules. Once loaded,
// the app navigates between them client-side with the curtain transition.
const pages = ['services', 'gallery', 'shop', 'about', 'contact'];

export default defineConfig(({isSsrBuild}) => ({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    // The SSR build (src/entry-server.tsx) only feeds the pre-renderer.
    copyPublicDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? {}
      : {
          input: {
            main: resolve(__dirname, 'index.html'),
            ...Object.fromEntries(pages.map((p) => [p, resolve(__dirname, `${p}/index.html`)])),
          },
        },
  },
}));
