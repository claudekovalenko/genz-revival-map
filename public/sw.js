/*
 * Service worker for the Gen Z Revival Map.
 *
 * Strategy is deliberately runtime-driven rather than build-time precached:
 * Vite emits content-hashed asset filenames that change every deploy, so a
 * hard-coded precache list would go stale and break offline mode. Instead:
 *
 *   - navigations      -> network first, fall back to the cached app shell
 *   - same-origin GETs -> stale-while-revalidate (instant load, refresh behind)
 *   - anything else    -> straight to the network
 *
 * Net effect: the app opens instantly and works fully offline after the first
 * visit, while a new deploy is picked up on the next load rather than pinned.
 */

// Bump on deploy to drop the previous cache wholesale.
const VERSION = "v2";
const CACHE = `revival-map-${VERSION}`;
const BASE = "/genz-revival-map/";
const SHELL = BASE;

// Enough to boot the app offline; hashed JS/CSS get cached on first use.
const PRECACHE = [
  BASE,
  BASE + "manifest.webmanifest",
  BASE + "icon-192.png",
  BASE + "icon-512.png",
  BASE + "apple-touch-icon.png",
  BASE + "favicon.svg",
];

/**
 * Cache the hashed JS/CSS the app actually boots from.
 *
 * These filenames change every build, so they can't be hard-coded. On the very
 * first visit the worker also isn't controlling the page yet, so those requests
 * never pass through the fetch handler and would otherwise never be cached —
 * leaving a cached shell with no code to run. Fixed by reading the shell HTML
 * at install time and caching whatever assets it references.
 */
async function warmAssets(cache) {
  try {
    const res = await fetch(SHELL, { cache: "reload" });
    if (!res.ok) return;
    const html = await res.clone().text();
    await cache.put(SHELL, res);

    const urls = new Set();
    const re = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      const u = m[1];
      if (u.startsWith(BASE) && /\.(js|mjs|css|svg|png|webmanifest|woff2?)$/i.test(u)) urls.add(u);
    }
    await Promise.all(
      [...urls].map((u) => cache.add(new Request(u, { cache: "reload" })).catch(() => {}))
    );
  } catch {
    /* first load may be offline; the fetch handler will fill the cache later */
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Individually, so one 404 can't fail the whole install.
      await Promise.all(
        PRECACHE.map((url) => cache.add(new Request(url, { cache: "reload" })).catch(() => {}))
      );
      await warmAssets(cache);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function cacheable(request, response) {
  return (
    response &&
    response.ok &&
    response.status === 200 &&
    response.type === "basic" &&
    request.method === "GET" &&
    !request.headers.has("range")
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page loads: prefer the network so a new deploy shows up, but never fail
  // offline — fall back to the cached shell (HashRouter handles the route).
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          if (cacheable(request, fresh)) {
            const cache = await caches.open(CACHE);
            cache.put(SHELL, fresh.clone());
          }
          return fresh;
        } catch {
          const cache = await caches.open(CACHE);
          return (
            (await cache.match(SHELL)) ||
            (await cache.match(request)) ||
            new Response("Offline — open this page once while connected to cache it.", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            })
          );
        }
      })()
    );
    return;
  }

  // Assets: serve cached copy immediately, refresh it in the background.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(request);

      const network = fetch(request)
        .then((response) => {
          if (cacheable(request, response)) cache.put(request, response.clone());
          return response;
        })
        .catch(() => undefined);

      return hit || (await network) || Response.error();
    })()
  );
});

// Lets the page ask an updated worker to take over immediately.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
