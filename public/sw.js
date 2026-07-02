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
  // Only cache GET requests
  if (event.request.method !== "GET") return;
  
  // Skip Supabase API calls - they need fresh data
  if (event.request.url.includes("supabase.co")) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch from network
      return response || fetch(event.request).then(fetchResponse => {
        // Cache successful responses
        return caches.open(CACHE_NAME).then(cache => {
          if (fetchResponse.status === 200) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      }).catch(() => {
        // If both fail and it's a page request, show cached home
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      });
    })
  );
});