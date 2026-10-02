// Bygger appen: legger PDF-malen inn i HTML-en.
//   index.html          – GitHub Pages / frittstående (PWA, pdf-lib fra vendor/)
//   sw.js               – service worker for offline-bruk
//   dist/artifact.html  – samme innhold uten <html>-skjelett, for Claude-artefakt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const b64 = readFileSync("src/mal.pdf").toString("base64");
const app = readFileSync("src/app.html", "utf8").replace("__MAL_PDF_B64__", b64);
const cdn = '<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>';
const lokal = '<script src="vendor/pdf-lib.min.js"></script>';

mkdirSync("dist", { recursive: true });
writeFileSync("dist/artifact.html", app.replace("<!--PDFLIB-->", cdn));

const side = `<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#2a62d6">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Treningsdagbok">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="icon" href="icons/icon.svg" type="image/svg+xml">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}</style>
</head>
<body>
${app.replace("<!--PDFLIB-->", lokal)}
<script>if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) navigator.serviceWorker.register("sw.js");</script>
</body>
</html>
`;
writeFileSync("index.html", side);

const filer = ["./", "index.html", "vendor/pdf-lib.min.js", "manifest.webmanifest", "icons/icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
const versjon = createHash("sha256").update(side).digest("hex").slice(0, 10);
writeFileSync("sw.js", `// Generert av build.mjs – ikke rediger for hånd.
const CACHE = "treningsdagbok-${versjon}";
const FILER = ${JSON.stringify(filer)};
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
`);
console.log("Bygget index.html, sw.js og dist/artifact.html (" + versjon + ")");
