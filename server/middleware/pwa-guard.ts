/**
 * Guards against stale service-worker asset requests.
 *
 * A previously-installed (production) service worker can keep requesting
 * precached files such as `/workbox-<hash>.js`. In dev those files don't
 * exist, so the request falls through to the Nuxt SSR handler and
 * vue-router logs:  "[Vue Router warn]: No match found for location with
 * path /workbox-*.js".
 *
 * We short-circuit those requests with a 404 (as an asset, not an HTML
 * page) so they never reach the Vue router. The stale SW then fails its
 * precache and updates itself on the next visit.
 */
export default defineEventHandler((event) => {
  const url = event.node.req.url || "";

  const isStaleSwAsset =
    /^\/workbox-[^/]+\.js(\?|$)/.test(url) ||
    /^\/sw\.js(\?|$)/.test(url);

  if (isStaleSwAsset) {
    setResponseStatus(event, 404);
    setResponseHeader(event, "Content-Type", "application/javascript");
    setResponseHeader(event, "Cache-Control", "no-store");
    return "";
  }
});
