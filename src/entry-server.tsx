import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {site} from './content';
import {routes, setServerRoute, type Route} from './lib/router';
import {headTags} from './seo';

/**
 * Build-time renderer: scripts/prerender.mjs calls this for every route so
 * each page ships as real HTML (readable by search engines and fast to
 * show), which the browser then hydrates.
 */
export function render(route: Route) {
  setServerRoute(route);
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  return {html, head: headTags(route)};
}

export {routes, site};
