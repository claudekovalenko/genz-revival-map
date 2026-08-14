/**
 * Service-worker registration.
 *
 * Registered under the Vite base path so the worker's scope covers the whole
 * app on GitHub Pages. Failures are non-fatal by design: if the browser has no
 * service-worker support, or the page is served over plain HTTP, the site still
 * works exactly as before — it just isn't installable or available offline.
 */
export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  // Service workers require HTTPS (localhost is exempt).
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;

  window.addEventListener("load", () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl, { scope: import.meta.env.BASE_URL }).catch(() => {
      /* offline support is an enhancement, never a hard requirement */
    });
  });
}
