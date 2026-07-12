const CACHE_NAME = "rif-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
];

// Install - cache the app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - serve from cache when offline
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("supabase.co")) return;
  if (event.request.url.includes("anthropic.com")) return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("/");
      });
    })
  );
});