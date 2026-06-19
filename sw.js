const CACHE_NAME = "lubri-expres-v1";

const archivos = [
  "./",
  "./index.html",
  "./catalogo.html",
  "./carrito.html",
  "./acerca.html",
  "./style.css",
  "./funcion.js",
  "./logo.jpeg",
  "./logoo.jpeg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(archivos))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(resp => resp || fetch(e.request))
  );
});