# HANDOFF — Lo Squalo Tenerife

## Stato Sessione
- Data: 2026-05-27, ~13:30
- Branch git: `main`
- Ultimo commit: `a8a3af5` — "feat: review Squalo 27mag — Cactus Coliving + Penthouse rename + Tenerife Stars + galleria"
- **Committato E pushato** su `github.com/Tapedynamics/losqualo.git`. Netlify ha ribuildato: deploy live verificato su `https://losqualo.netlify.app/`.

## File Modificati / Creati
Tutti in `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/`:

Modificati:
- `alloggio.html` — nodo Cactus aggiunto, label Penthouse pulito, link → `penthouse.html`
- `escursioni.html` — nodo Stargazing riabilitato e linkato a Tenerife Stars
- `pages.js` — coliving subs (+cactus), penthouse name/href, stargazing name/href
- `pages.css` — `.item-cactus` posizione/colore
- `alloggio/villa-paraiso.html` — galleria spostata sotto la sezione caratteristiche
- `alloggio/finca-la-fortaleza.html` — galleria spostata sotto la sezione caratteristiche

Creati:
- `alloggio/cactus-coliving.html` — scheda Cactus Coliving (scrape cactuscoliving.com)
- `escursioni/tenerife-stars.html` — scheda Tenerife Stars con dettagli PDF

Rinominati:
- `alloggio/penthouse-los-cristianos.html` → `alloggio/penthouse.html` (rename con `git mv`, H1/title/alt/WA aggiornati, hero copertina = drive-05.jpg = 5ª foto galleria come da PDF)

Non committato (escluso volutamente): `.claude/settings.local.json`.

## Completato — PDF 27 mag `AGGIORNAMENTI SITO TENERIFE EXPERIENCE.pdf`
Applicate le sezioni che non richiedono Google Drive:

- **Sez.3 Coliving / Coworking** — aggiunta scheda Cactus Coliving distinta da Blue Paradise (foto/community/yoga/3 sedi: Valle San Lorenzo + Adeje + La Gomera; prezzi 686-1058€/mese, sconti 28+ e 60+ giorni). Nodo SVG + line + sub-node nel mind-map alloggio.
- **Sez.4-5 Banana Surf Hostel** — già LIVE dal 21 mag (commit `0b83d42`).
- **Sez.6 Galleria sotto tab caratteristiche** — verificate 17 schede target (Villa/Casa Rurale + Rurale/Glamping + Appartamento). 14 erano già con gallery in posizione corretta (tra DC1 e DC2 o subito dopo l'unico DC); spostata in `villa-paraiso.html` e `finca-la-fortaleza.html` dove era buried al fondo. Solo riordino DOM, niente foto nuove.
- **Sez.9 Penthouse Los Cristianos → Penthouse** — file rinominato, H1/title/alt/WhatsApp aggiornati, hero = 5ª foto galleria come da PDF, link in alloggio.html + pages.js aggiornati.
- **Sez.10+11 Tenerife Stars** — scheda nuova con i dettagli PDF (Roques de García 45-60 min + menu base panino pollo/yogurt/frutta/dolce/acqua/succo + varianti vegetariano/vegano/bambini + bagno-caffetteria fino 19:30 + no alcolici Parco). Sito ufficiale `tenerifestars.com`. Nodo stargazing in `escursioni.html` riabilitato (rimosso `disabled-node`, convertito da `<div>` ad `<a>`, label "Star<br>Gazing" → "Tenerife<br>Stars"). `pages.js` sub voce aggiornata.

Verifica live post-deploy (curl) OK:
- `https://losqualo.netlify.app/alloggio/cactus-coliving.html` → 200
- `https://losqualo.netlify.app/alloggio/penthouse.html` → 200 (title/H1 = "Penthouse")
- `https://losqualo.netlify.app/alloggio/penthouse-los-cristianos.html` → 404 (corretto)
- `https://losqualo.netlify.app/escursioni/tenerife-stars.html` → 200 (title/H1 = "Tenerife Stars")
- `https://losqualo.netlify.app/alloggio.html` → contiene `node-cactus` + `node-penthouse`
- `https://losqualo.netlify.app/escursioni.html` → `node-stargazing` linkato a tenerife-stars

## In Corso / Rimasto da Fare
**Sezioni PDF 27 mag che richiedono Google Drive — NON applicate**:

- **Sez.7 Foto e servizi extra** — aggiungere foto disponibili e integrare servizi mancanti. Da scaricare foto dalle 3 cartelle Drive citate nel PDF 20 mag.
- **Sez.8 Costa Adeje** — valorizzare foto piscina (copertina = piscina). Foto da Drive. La scheda costa-adeje.html attualmente NON ha gallery-section.
- **Sez.6 Foto galleria** — la posizione DOM è ora corretta su tutte le 17 schede, ma la richiesta del cliente di gallerie "più ricche" su Villa/Rurale/Appartamento richiede foto extra dal Drive.

Decisioni aperte (eredità sessioni precedenti, non risposte da Daniele):
1. `alloggio/gota-de-mar.html` — file orfano (nessun link lo punta), NON eliminato per regola anti-distruttivi. Decidere se cancellarlo.
2. Foto Drive (Sez.7/8): scaricare via gdrive MCP o le carica Daniele a mano?

## Decisioni Prese
- **Rename Penthouse via `git mv`** — preserva history, evita duplicazione. File precedente non esiste più (404 confermato).
- **`foto/penthouse-los-cristianos/` lasciato come nome cartella** — non rinominato (cartella interna, user non la vede), per non rompere 9 reference.
- **Hero Penthouse** — `drive-05.jpg` come hero (PDF: "copertina = 5ª foto galleria"). Galleria mantiene drive-01..08 nello stesso ordine.
- **Cactus posizionato a top:48% left:6%** in mappa alloggio (sotto Blue Paradise top:22% left:6%, vicino al nodo coliving al centro top:34% left:16%).
- **Tenerife Stars sotto categoria "Terra" (Teide)**, non "Sky" (aria con parapente/paratrike). Il PDF dice "Escursioni e Attività > Sky / Stelle / Stargazing" ma nel sito esistente il nodo stargazing era già sotto Teide come disabled — riabilitato dove era.
- **Galleria spostata SOLO in villa-paraiso e finca-la-fortaleza** — analisi struttura: 14 schede su 17 avevano già la gallery nella posizione corretta (subito dopo le sezioni descrittive). Costa Adeje non ha gallery → niente da spostare.

## Problemi Noti
- `alloggio/gota-de-mar.html` orfano (vedi decisione aperta #1) + cartella `foto/penthouse-los-cristianos/` mantenuta col vecchio nome (non visibile all'utente, scelta intenzionale).
- Costa Adeje (`alloggio/costa-adeje.html`) non ha gallery-section. Quando arriveranno le foto da Drive (Sez.8) andrà aggiunta.
- Tag balance verificato su tutti i file modificati (div/section paired). QA visiva via Playwright/HTTP server non eseguita (server locale negato dall'auto mode); verifica fatta via curl post-deploy.
- Nessun test automatico nel progetto (sito statico).

## Comandi per Riprendere
```bash
cd "C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife"
git status
git log --oneline -5

# QA visiva locale (Playwright è in node_modules root del workspace):
python -m http.server 8899 --bind 127.0.0.1   # server statico
# poi screenshot via script Playwright puntando a http://127.0.0.1:8899/

# Deploy: il repo è collegato a Netlify via GitHub.
# git push origin main  → Netlify ribuilda in automatico.
# Verifica post-deploy:
curl -s "https://losqualo.netlify.app/?cb=$(date +%s)" | grep -oE '<title>[^<]+</title>'
```
Nessun build step / npm install: sito statico HTML+CSS+JS vanilla, zero dipendenze.
