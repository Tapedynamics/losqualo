# HANDOFF — Lo Squalo Tenerife

## Stato Sessione
- Data: 2026-06-10
- Branch git: `main`
- Ultimo commit: `0f32193` — "feat(squalo): blocco 8giu pt15 — Eventi e Servizi Privati (7 nodi piatti -> WhatsApp)"
- Tutto committato e pushato su `github.com/Tapedynamics/losqualo.git`. Netlify ribuilda in automatico su push. Deploy verificati live su `https://losqualo.netlify.app/`.
- Lavoro = applicazione del PDF `_INBOX/losqualotenerife/AGGIUSTAMENTI SITO – TENERIFE EXPERIENCE - 8 giugno 2026.pdf` (15 sezioni).
- Tracciamento completo punto-per-punto in `MODIFICHE-8GIU-CHECKLIST.md` (root progetto) — È LA FONTE DI VERITÀ sullo stato, leggerla per prima.
- Goal dichiarato dall'utente: verificare che TUTTE le modifiche del PDF siano inserite. ESCLUSI dal goal: task che richiedono Google Drive (🔒) e asset esterni IG/FB (🖼️).

## File Modificati / Creati
Tutti sotto `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/`:

Creati:
- `MODIFICHE-8GIU-CHECKLIST.md` — checklist stato di tutti i punti PDF
- `alloggio/villa-ar.html`, `alloggio/villa-golf.html`, `alloggio/villa-one.html`, `alloggio/fanabe.html`, `alloggio/atico.html` — 5 nuove schede alloggio
- `alloggio/foto/villa-ar/`, `alloggio/foto/villa-golf/`, `alloggio/foto/villa-one/`, `alloggio/foto/fanabe/`, `alloggio/foto/atico/` — 13 foto JPG ciascuna (scaricate da Airbnb)
- `_scrape/airbnb-8giu.json` — output scrape Apify dei 5 listing (GITIGNORED, non versionato)
- `_scrape/gen_pages.py` — generatore schede (download foto + build HTML) (GITIGNORED)

Modificati:
- `brand.html` — descrizione "Cos'è Lo Squalo" (pt2)
- `escursioni/buggy.html` — rimossa versione Stargazing ovunque (pt12c)
- `escursioni/yacht.html` — "Le due opzioni"→"Le opzioni" + rimosso blocco Ocean Peak (pt13b, 13c)
- `alloggio/villa-golf.html` — hero swap con 7a foto galleria (feedback Daniele)
- `alloggio/villa-one.html` — rimosse ultime 2 foto galleria (feedback)
- `alloggio/fanabe.html` — hero swap con penultima galleria + rimossa firma host (feedback)
- `alloggio/atico.html` — hero swap con ultima galleria (feedback)
- `alloggio/surf-house-luxury.html`, `alloggio/surf-house-rurale.html` — bottone Full Experience → WhatsApp (pt7)
- `surfing.html` — Reserva Cama → `alloggio.html?cat=ostello` (pt9a)
- `pages.js` — handler `?cat=` deep-link categoria (pt9a); restructure eventi (lines main, mobile nodes, eventi→positions7) (pt15)
- `pages.css` — 7 posizioni eptagono nodi eventi + font centro (pt15)
- `eventi.html` — restructure completa: 7 nodi piatti → WhatsApp (pt15)
- `index.html` — nodo home "EVENTI" → "EVENTI E SERVIZI PRIVATI" (pt15a)

## Completato (deployato + verificato live)
- **pt2** Brand: testo esatto PDF
- **pt12c** Buggy: rimossa versione Stargazing (location, quick-info, tag, descrizione, "Le due formule", Astrofili, CTA)
- **pt13b** Yacht: "Le due opzioni"→"Le opzioni", testo "due opzioni"→"più opzioni"
- **pt13c** Yacht: rimosso blocco "Charter Privato – Ocean Peak" + galleria Ocean Peak
- **pt5 (5a/b/c) + pt8 (8a/b)** — 5 schede alloggio CONTENUTO fatto (Villa A&R/Golf/One, Fañabé, Ático). Hero+12 foto locali, descrizione ripulita, dotazioni curate, quick-info reali, CTA WhatsApp. NON ancora cablate nella mind-map alloggio (vedi sotto).
- **Feedback Daniele su hero/galleria**: villa-golf hero=7a foto, villa-one tolte ultime 2, fanabe hero=penultima, atico hero=ultima. Tutti swap (no foto perse/duplicate).
- **pt7** Full Experience nelle 2 schede surf-house → WhatsApp
- **pt9a** Reserva Cama → nodo Ostello generico via deep-link `alloggio.html?cat=ostello` (handler `?cat=` aggiunto in pages.js init). NB: Netlify Pretty URLs serve come `/alloggio?cat=ostello`, query preservata.
- **pt9b** (già era corretto) Reserva Habitación → `surf-house-rurale.html`
- **pt15 (15a/b/c/d)** Eventi → "Eventi e Servizi Privati", struttura piatta 7 nodi (Venue, Car Rent & Transfer, Food & Drink, Suono e Luci, Music & Show, Feste e Movida, Tips) tutti → WhatsApp, desktop+mobile.

Stato scope goal: ~16 task su ~28 (non-Drive) fatti.

## In Corso / Rimasto da Fare (tutti IN SCOPE, restructure mind-map = VISIVI)
Procedere con loop: edit → deploy → Daniele conferma a vista.

1. **Cablaggio 5 nodi alloggio** (completa pt5/pt8): le 5 schede esistono ma non hanno il nodo nella mind-map.
   - Aggiungere `<a>` sub-node in `alloggio.html`: 3 nel gruppo `data-parent="villa"` (~riga 97-110), 2 in `data-parent="appartamento"` (~riga 141-157), con classi `item-villaar`/`item-villagolf`/`item-villaone`/`item-fanabe`/`item-atico`.
   - `pages.js`: aggiungere subs in `pageSubNodesData.alloggio.villa.subs` (~riga 543) e `.appartamento.subs` (~riga 567); aggiungere lines in arrays `villa:` (~riga 73) e `appartamento:` (~riga 89); aggiungere SVG `<line>` corrispondenti in `alloggio.html`.
   - `pages.css`: posizioni `top%/left%` per i 5 nuovi `.page-alloggio .item-*` (layout radiale hand-tuned, VISIVO — vedi posizioni esistenti righe 460-620).
2. **pt9c/9d/9e** Surf House (in `surfing.html` + `pages.js`):
   - 9d: eliminare nodo Gallery (`node-gallery`, `surfing.html:79`, `pages.js:658`, line `line-surfhouse-gallery`).
   - 9e: spostare nodo Full Experience da Surf House al macro Surfing Tenerife, visibile all'apertura.
   - 9c: back-path non deve cambiare macrocategoria, deve tornare al nodo Surf House.
3. **pt11** Agency (`index.html:62` node-agency, `agency/`, `pages.js` ~662 subs + ~170 lines + ~951 mobile, `pages.css` ~882):
   - 11a: Agency deve aprire struttura a nodi (ora `index.html:62` → `agency/oferta.html` scheda).
   - 11b: eliminare nodi SMM/Graphic Design/Artist Management/Start Business.
   - 11c: nodo Portfolio → `https://t.mtrbio.com/losqualoagency`.
   - 11d: nodo Servizi e Prezzi → riusare scheda `agency/oferta.html`.
   - 11e: nodo Contact & Social → IG `instagram.com/losqualoagency`, FB `facebook.com/losqualoagency`, Email `agency.losqualotenerife@gmail.com`, TikTok `tiktok.com/@agencylosqualotenerife`, Google `share.google/EPTc7zGdCKpWTuL87`.
4. **pt13a/13f/13g/13h** Acqua (escursioni, `pages.js` escursioni oceano ~620, `escursioni/yacht.html`):
   - 13a/13f: creare nodo "Charter Privato" dentro Acqua che contiene Yacht (Yacht Privato `escursioni/yacht.html`) + Catamarano + Barco sin piloto. DECISIONE UTENTE: "13d 13f e yacht devono stare dentro acqua in un nodo chiamato Charter Privato". Catamarano/Barco ora diretti sotto Oceano (`pages.js:620-621`).
   - 13g: colori nodi azzurri allineati ad Acqua.
   - 13h: nodo Boat Party + descrizione "Ogni settimana, 3 ore di festa in alto mare con DJ set e open bar. Scopri l'offerta!" (foto Boat Party = 🔒 Drive, solo nodo+desc in scope).
5. **pt3** Alloggio: nodo Alloggio resta IT in ES/EN, tradurre per lingua. `en/index.html` + `es/index.html` linkano lo stesso `alloggio.html` IT. Esiste dict traduzioni in `pages.js:7-10`.
6. **pt1** Search box home (VISIVO): casella "Cerca un servizio" a misura bottone "Tenerife Experience", equidistante Tenerife↔Brand; dopo expand stessa distanza Brand↔nodi. CSS `styles.css:1015` `.home-search`.
7. **pt4** Finca Chimiche (VISIVO): eliminare foto doppie galleria. I 12 file `drive-01..12` hanno nomi unici → doppioni sono VISIVI, serve guardare le immagini in `alloggio/foto/finca-chimiche/`.

### FUORI GOAL (NON fare — confermato da Daniele)
- 🔒 Google Drive: pt6 (foto piscina Villa Paraiso), pt12a (galleria Jeep), pt13e (Sunshine/Champagne/Armani — già presenti come TESTO in yacht.html "I modelli", mancano solo le foto), foto Boat Party, pt14a/b/c (Stargazing/Parapendio/Paratrike).
- 🖼️ Asset esterno IG/FB: pt10 (foto profilo Alessandro — `assets/alessandro.jpg` non esiste, mostra fallback "AB"), pt12b (Hero Quad).

## Da confermare a vista (deployati, in attesa OK Daniele)
- Eventi `losqualo.netlify.app/eventi.html`: posizioni eptagono 7 nodi desktop + mobile, leggibilità centro 3-righe.
- Home `losqualo.netlify.app`: label nodo "EVENTI E SERVIZI PRIVATI" (più lunga di prima).
- 5 schede alloggio: contenuti (descrizioni/foto/dotazioni).

## Decisioni Prese
- **Scrape Airbnb via Apify** actor `tri_angle~airbnb-rooms-urls-scraper`, locale `it-IT`, currency EUR. Token in `_AZIENDA/api-reference.md`. Output → `_scrape/airbnb-8giu.json`.
- **Foto schede = scaricate LOCALI** (~13 cad. in `alloggio/foto/<slug>/`), NON hotlink CDN muscache (scelta Daniele: robustezza, sopravvive a rotazioni URL Airbnb).
- **Descrizioni schede ripulite**: `gen_pages.py` taglia ai marker Airbnb ("Lo spazio", "Numero di registrazione", firma host "– Nome"/"Philippe Samakh") e cura le dotazioni (collassa "Vista*" a una, droppa toiletries).
- **pt9a Reserva Cama → nodo Ostello generico** (non l'ostello specifico banana-surf-hostel): scelta Daniele. Implementato con deep-link `?cat=ostello` + nuovo handler URL param in pages.js (riusa il meccanismo recallSub esistente).
- **pt7 Full Experience → WhatsApp**: la pagina `surfing/full-experience.html` esiste ed è valida, ma Daniele vuole il bottone diretto a WhatsApp.
- **pt15 Eventi flat 7 nodi**: nessun livello-3, ogni nodo è `<a>` diretto a WhatsApp. Riusato `positions7` già presente in pages.js per il mobile. `pageSubNodesData.eventi.fooddrink` lasciato orfano (dead data innocuo, nessun nodo lo espande).
- **Deploy a blocchi con conferma** (scelta Daniele), non deploy unico finale. Visivi → deploy poi conferma a vista.

## Problemi Noti
- Nessun test automatico (sito statico HTML/CSS/JS vanilla).
- `pages.js` contiene dead data dopo restructure eventi: `pageSubNodesData.eventi.fooddrink` (subs orfani) e classi CSS eventi vecchie inutilizzate (showcases-node, consigliati-node, movida-node, servizi-node, nextevent-node, item-bodegas ecc.). Innocui, non rimossi per minimizzare rischio. Si possono pulire.
- `search.js` (ricerca home) può ancora indicizzare voci eventi vecchie con anchor tipo `#bodegas` che ora non esistono in eventi.html → click non scrolla (innocuo, non 404). DA VERIFICARE/pulire se si tocca la ricerca.
- Netlify **Pretty URLs** toglie `.html` dagli href in produzione (gotcha noto). I link `?cat=ostello` diventano `/alloggio?cat=ostello`, query preservata, handler funziona.
- Posizioni eptagono eventi e label home lunga NON validate visivamente (deployate, in attesa conferma Daniele). Possibile overflow/overlap su mobile da verificare.
- Warning git "LF will be replaced by CRLF" su ogni commit (Windows, innocuo).

## Comandi per Riprendere
```bash
cd "C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife"
git status
git log --oneline -8

# LEGGI PRIMA: stato punto-per-punto
cat MODIFICHE-8GIU-CHECKLIST.md

# Rigenerare schede alloggio (se servono modifiche): foto già scaricate, skip auto
cd _scrape && PYTHONUTF8=1 python gen_pages.py && cd ..

# Deploy: push -> Netlify ribuilda auto
git add <files> && git commit -m "..." && git push origin main

# Verifica post-deploy (poll build + check):
for i in $(seq 1 20); do v=$(curl -s "https://losqualo.netlify.app/eventi.html?cb=$(date +%s)" | grep -o "node-venue"); [ -n "$v" ] && echo OK && break; sleep 7; done
curl -s "https://losqualo.netlify.app/<page>?cb=$(date +%s)" | grep -oE '<title>[^<]+</title>'
```
Nessun build step / npm install: sito statico, zero dipendenze. Apify token in `_AZIENDA/api-reference.md`.
