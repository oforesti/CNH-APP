const CACHE_NAME = "cdt-cache-v1";
const ARQUIVOS = [
  "/",
  "/index.html",
  "/favicon.png",
  "/botao1.jpg",
  "/botao2.jpg",
  "/botao3.jpg",
  "/botao4.jpg",
  "/manifest.json"
];

// Instala e faz cache dos arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

// Ativa e limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Responde requisições do cache (offline first)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resposta) => {
      return resposta || fetch(event.request);
    })
  );
});