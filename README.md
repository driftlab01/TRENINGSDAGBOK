# Treningsdagbok

Web-app for ukeskjemaet «Treningsdagbok». Fungerer på iPhone og PC, og eksporterer
til originalskjemaet (`src/mal.pdf`) ferdig utfylt.

## Arbeidsflyt

| Når | Fane | Hva |
|---|---|---|
| Før uka | **Planlegg** | Ukens fokus + plan/hensikt per dag (inntil 2 økter). Forrige ukes «justering» vises øverst. |
| Samme dag, før økt | **Dag** | Trapp og søvn (grønn/gul/rød). Appen viser anbefaling: dårligste farge styrer, rød søvn alene = gul. |
| Etter økt | **Dag** | Gjennomført, km, varighet, RPE, avvik, kommentar, dagsfølelse, plager. |
| Etter uka | **Uka** | Sum, «Hvordan føltes uka?», «Justering neste uke», PDF og sikkerhetskopi. |

Km og varighet summeres fortløpende (linja nederst). Varighet kan skrives som
`45`, `1:15`, `1t15`, `1,5t` eller `75 min`.

## Bruk på iPhone og PC (GitHub Pages)

Appen ligger på **https://driftlab01.github.io/TRENINGSDAGBOK/** når Pages er slått på:
Settings → Pages → Source: «Deploy from a branch» → velg grenen og `/ (root)` → Save.

- **iPhone:** åpne adressen i Safari → Del → «Legg til på Hjem-skjerm». Bruk alltid ikonet,
  ikke Safari-fanen: på iPhone har hjemskjerm-appen sin egen lagring, atskilt fra Safari.
- **PC:** åpne adressen i nettleseren (Chrome/Edge kan også installere den som app).
- Appen virker uten nett etter første besøk.
- «Del / skriv ut PDF» åpner delingsmenyen på iPhone (Skriv ut, Arkiver i Filer) og en ny fane på PC.

## Lagring

- **Som Claude-artefakt:** data lagres på kontoen din og synkroniseres mellom iPhone og PC.
- **Via GitHub Pages:** data lagres kun i nettleseren på den enheten – iPhone og PC deler
  *ikke* data. Ta jevnlig sikkerhetskopi (JSON) under «Uka»; den kan gjenopprettes på en annen enhet.
  Koden i repoet er offentlig, men treningsdataene dine forlater aldri enheten.

## Utvikling

Kildekoden er `src/app.html`. Bygg etter endringer:

```sh
node build.mjs
```

Dette legger PDF-malen inn i `index.html`, genererer `sw.js` (offline-cache, ny versjon ved hver bygging)
og `dist/artifact.html` (Claude-artefakt). `vendor/pdf-lib.min.js` er pdf-lib 1.17.1 (MIT).
