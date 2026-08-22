/**
 * Cleans up stale service workers left in visitors' browsers by the old
 * Lisfoom PWA. Those workers keep requesting deleted files (e.g.
 * /components/Footer.vue) and can even serve the old cached site.
 *
 * - /sw.js         → serve a self-destroying worker (200). Browsers check
 *                    the registered SW URL for updates on navigation; this
 *                    replaces the stale worker, unregisters it, and reloads
 *                    the page so the new site shows.
 * - /workbox-*.js  → 404 as a JS asset so precache fails fast and the
 *                    request never reaches the Vue router.
 */
const SELF_DESTROYING_SW = `
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister()
      .then(() => (self.caches ? self.caches.keys() : Promise.resolve([])))
      .then((keys) => Promise.all(keys.map((key) => self.caches.delete(key))))
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      }),
  );
});
`;

export default defineEventHandler((event) => {
  const url = event.node.req.url || "";

  if (/^\/sw\.js(\?|$)/.test(url)) {
    setResponseHeader(event, "Content-Type", "application/javascript");
    setResponseHeader(event, "Cache-Control", "no-store");
    return SELF_DESTROYING_SW;
  }

  if (/^\/workbox-[^/]+\.js(\?|$)/.test(url)) {
    setResponseStatus(event, 404);
    setResponseHeader(event, "Content-Type", "application/javascript");
    setResponseHeader(event, "Cache-Control", "no-store");
    return "";
  }
});
