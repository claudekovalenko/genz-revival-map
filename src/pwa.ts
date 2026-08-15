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

  // Whether a worker was already driving this page before we registered.
  // On a first-ever visit `clients.claim()` fires controllerchange too, and
  // reloading there would be a pointless flash.
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloading) return;
    // A new worker took over, so the cached JS/CSS this page is running is the
    // previous deploy. Reload once to pick up the new build — without this the
    // installed app can keep showing an old version indefinitely.
    reloading = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker
      .register(swUrl, { scope: import.meta.env.BASE_URL })
      .then((reg) => {
        // Catch deploys that land while the app is open or resumed from background.
        reg.update().catch(() => {});
        setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") reg.update().catch(() => {});
        });
      })
      .catch(() => {
        /* offline support is an enhancement, never a hard requirement */
      });
  });
}
