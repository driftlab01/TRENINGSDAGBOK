// Generert av build.mjs – ikke rediger for hånd.
const CACHE = "treningsdagbok-d25c7981b8";
const FILER = ["./","index.html","vendor/pdf-lib.min.js","manifest.webmanifest","icons/icon.svg","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILER)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Nett først (så du alltid får nyeste versjon), cache hvis du er offline
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => {
    if (r.ok) { const kopi = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, kopi)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("index.html"))));
});
