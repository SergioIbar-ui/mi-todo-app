const CACHE_NAME = "mi-app-cache-v1";
const urlsToCache = [
  "/mi-todo-app/",
  "/mi-todo-app/index.html",
  "/mi-todo-app/style.css",
  "/mi-todo-app/script.js",
  "/mi-todo-app/manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});