const CACHE_NAME = "mirai-minds-v2";
const CORE_ASSETS = [
  "/",
  "/learn",
  "/start-here",
  "/how-to-use",
  "/daily-mission",
  "/privacy",
  "/manifest.webmanifest",
  "/icon.svg",
  "/assets/kid-learning-bg.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Never cache Next.js dev/build assets. Their URLs change constantly and stale
  // service-worker cache is the common cause of broken CSS and /_next 404s.
  if (url.pathname.startsWith("/_next/")) return;
  if (url.pathname.includes("webpack") || url.pathname.includes("hot-update")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => undefined);
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  );
});
