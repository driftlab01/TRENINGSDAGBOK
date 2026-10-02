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

## Lagring

- **Som Claude-artefakt:** data lagres på kontoen din og synkroniseres mellom iPhone og PC.
- **Som frittstående side (`index.html`):** data lagres kun i nettleseren på den enheten.
  Ta jevnlig sikkerhetskopi (JSON) under «Uka».

## Utvikling

Kildekoden er `src/app.html`. Bygg etter endringer:

```sh
node build.mjs
```

Dette legger PDF-malen inn i `index.html` (frittstående) og `dist/artifact.html` (artefakt).
