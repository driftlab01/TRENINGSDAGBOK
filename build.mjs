// Bygger appen: legger PDF-malen inn i HTML-en.
//   index.html          – frittstående side (GitHub Pages, åpne lokalt)
//   dist/artifact.html  – samme innhold uten <html>-skjelett, for Claude-artefakt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const b64 = readFileSync("src/mal.pdf").toString("base64");
const app = readFileSync("src/app.html", "utf8").replace("__MAL_PDF_B64__", b64);

mkdirSync("dist", { recursive: true });
writeFileSync("dist/artifact.html", app);
writeFileSync("index.html", `<!doctype html>
<html lang="nb">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Treningsdagbok">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}</style>
</head>
<body>
${app}
</body>
</html>
`);
console.log("Bygget index.html og dist/artifact.html");
