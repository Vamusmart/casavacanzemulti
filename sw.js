const CACHE_NAME = "static-cache-v1";
const ASSETS_TO_CACHE = [
    "/main.js",
    "/css/style.css",
    "/images/banner-carrers-1440.webp",
    "/images/banner-we-are-1440.webp",
    "/images/slide-hello-1440.webp",
    "/images/banner-we-do-1440.webp",
    "/images/shop_intimo.webp",
    "/images/card-simplicity.webp",
    "/images/card-play-harder.webp",
    "/images/card-innovation.webp",
    "/images/logo-intimo-white.webp"
];

// Installazione: cache degli asset
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Attivazione: pulizia cache vecchie
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch: Cache First Strategy
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
            );
        })
    );
});
