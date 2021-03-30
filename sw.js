const CACHE_NAME = "v1_cache_calculadora_PH";
const urlsToCache = [
    "./",
    "./?umt_source=web_app_manifest",
    "./img/favicon.png",
    "./img/icon-32.png",
    "./img/icon-64.png",
    "./img/icon-128.png",
    "./img/icon-192.png",
    "./img/icon-256.png",
    "./img/icon-512.png",
    "./img/icon-1024.png",
    "./img/maskable.png",
    "//unpkg.com/vue@next",
    "//unpkg.com/vue-router@4",
    "./js/main.js",
    "./js/routes.js",
    "./js/mountApp.js",
    "./components/",
    "./components/dashboard.js",
    "./components/units.js",
    "//fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap",
    "//cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css",
    "//fonts.googleapis.com/icon?family=Material+Icons",
    "./css/style.css",
    "./manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(urlsToCache)
        .then(() => self.skipWaiting())
        .catch((err) => console.log(err))
    )
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
