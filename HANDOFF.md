# HANDOFF — Lo Squalo Tenerife

## Stato Sessione
- Data: 2026-06-10 (sessione lunga, Drive attivato a metà)
- Branch git: `main`
- Ultimo commit: `f52f28d` (drive-setup.html). Tutto committato e pushato su `github.com/Tapedynamics/losqualo.git`.
- Deploy: push → Netlify ribuilda auto. Tutto verificato live su `https://losqualo.netlify.app/`.
- Lavoro = applicazione PDF `_INBOX/losqualotenerife/AGGIUSTAMENTI SITO – TENERIFE EXPERIENCE - 8 giugno 2026.pdf` (15 sezioni).

## ⭐ FONTE DI VERITÀ DEI PUNTI PDF (NON PERDERE)
**`MODIFICHE-8GIU-CHECKLIST.md`** (root progetto) = stato punto-per-punto di TUTTE le modifiche del PDF.
LEGGERLA PER PRIMA. Ogni punto del PDF è atomizzato e marcato ✅/⚠️/❌ con file e righe.
Il riepilogo in fondo alla checklist elenca esattamente cosa è fatto e cosa resta.

## Completato e LIVE in questa sessione
Vedi checklist per dettaglio. In sintesi (✅ deployati e verificati):
- pt2 Brand desc · pt7 Full Experience→WA · pt9a Reserva Cama→Ostello (deep-link `?cat=`)
- pt12c Buggy no-Stargazing · pt13b/c Yacht "Le opzioni" + no Ocean Peak
- pt15 Eventi → "Eventi e Servizi Privati" (7 nodi piatti → WhatsApp, eptagono)
- **5 schede alloggio** (pt5/8): Villa A&R/Golf/One + Fañabé/Ático (scrape Airbnb Apify, foto locali)
- **Drive ON** (seconda metà sessione):
  - pt6 Villa Paraiso +8 foto piscina
  - pt12a Jeep hero+14 foto · pt14a/b/c Stargazing(tenerife-stars)+Parapendio+Paratrike
  - pt13a/d/e/f/g/h Acqua: nodo Charter Privato (hub `charter-privato.html` = Yacht+Catamarano+Barco),
    nodo Boat Party (`boat-party.html`+8 foto), yacht "I modelli" con foto OCEAN PEAK + prezzi, colori azzurri
- `drive-setup.html` — pagina standalone istruzioni per Alessandro (condividere cartelle Drive con `siusky.dc@gmail.com`)

## In Corso / Rimasto da Fare (vedi checklist per righe esatte)
Tutti restructure mind-map (posizioni nodi hand-tuned = VISIVO) o puri visivi:
1. **Cablaggio 5 nodi alloggio** (completa pt5/8): le 5 schede esistono ma non hanno il nodo nella mappa.
   - `alloggio.html`: +3 `<a>` in `data-parent="villa"` (~riga 97), +2 in `data-parent="appartamento"` (~riga 141), classi `item-villaar/villagolf/villaone/fanabe/atico`.
   - `pages.js`: subs in `pageSubNodesData.alloggio.villa.subs` (~543) e `.appartamento.subs` (~567); lines in arrays `villa:` (~73) e `appartamento:` (~89); +SVG `<line>` in `alloggio.html`.
   - `pages.css`: posizioni `top%/left%` per i 5 `.page-alloggio .item-*` (vedi 460-620, layout radiale).
2. **pt9c/d/e** Surf House (`surfing.html` + `pages.js`):
   - 9d: eliminare nodo Gallery (`node-gallery` `surfing.html:79`, `pages.js` subs+line `line-surfhouse-gallery`).
   - 9e: spostare nodo Full Experience da Surf House al macro Surfing Tenerife, visibile all'apertura.
   - 9c: back-path non deve cambiare macrocategoria, tornare al nodo Surf House.
3. **pt11** Agency (`index.html:62`, `agency/oferta.html`, `pages.js` ~662 subs/~170 lines/~951 mobile, `pages.css` ~882):
   - 11a Agency apre struttura a nodi (ora apre scheda `agency/oferta.html`).
   - 11b eliminare nodi SMM/Graphic Design/Artist Management/Start Business.
   - 11c nodo Portfolio → `https://t.mtrbio.com/losqualoagency`.
   - 11d nodo Servizi e Prezzi → riusare scheda `agency/oferta.html`.
   - 11e nodo Contact & Social → IG `instagram.com/losqualoagency`, FB `facebook.com/losqualoagency`, Email `agency.losqualotenerife@gmail.com`, TikTok `tiktok.com/@agencylosqualotenerife`, Google `share.google/EPTc7zGdCKpWTuL87`.
4. **pt3** Traduzione nodo Alloggio per lingua ES/EN (`en/index.html`+`es/index.html` linkano stesso `alloggio.html` IT; dict in `pages.js:7-10`).
5. **pt1** 👁️ Search box home: misura = bottone "Tenerife Experience", equidistante (`styles.css:1015` `.home-search`).
6. **pt4** 👁️ Finca Chimiche doppioni foto (visivi, guardare `alloggio/foto/finca-chimiche/drive-01..12`).
7. **pt12b** 🖼️ Quad hero con foto coi quad (nessuna cartella Drive dedicata — serve foto).

### FUORI GOAL
- pt10 foto profilo Alessandro (IG/FB) — `assets/alessandro.jpg` non esiste, fallback "AB".

### Da confermare A VISTA (deployati alla cieca, posizioni/hero)
Eventi (15) eptagono · Acqua (13) nodi Charter/BoatParty · hero=drive-01 di Jeep/Parapendio/Paratrike · mapping foto yacht Armani/Salita (13e) · le 5 schede alloggio (contenuti).

## PIPELINE DRIVE (riutilizzabile — script in `_scrape/`)
Le cartelle Drive link-shared NON sono enumerabili via MCP `search_files` (parentId torna vuoto).
SOLUZIONE trovata e funzionante:
- **Enumerare**: `https://drive.google.com/embeddedfolderview?id=<FOLDER_ID>#list` → HTML semplice con
  `id="entry-<FILE_ID>"` e `flip-entry-title">NOME`. Script: `_scrape/scrape_folder.py <folderId>`.
- **Scaricare singolo file**: `curl -sL "https://drive.google.com/uc?export=download&id=<FILE_ID>"` (funziona anche per file solo-link).
- **Pipeline completa** (scrape+download+resize 1600px/q82 come drive-NN): `_scrape/fetch_folder.py <folderId> <outdir> <count>`.
- **Download ID specifici** (manifest JSON): `_scrape/dl_drive.py <manifest.json>`.
- **Ricostruire gallery+hero pagina**: `_scrape/set_gallery.py <html> <foto_subdir> <count> "<AltLabel>" [hero_idx]`.
- MCP Drive (`read_file_content`) usato per leggere il doc yacht (testo, OK in context). NON usare download_file_content per immagini (base64 in context = inutile).

Folder IDs già usati (dal PDF): Parapendio `1ApKfrnx5mZE9bzq8W44krZS-yS-XFfdt`, Paratrike `1Ur_wLf8lZxm2M2F8PhrvsZUmpo582GeC`, Jeep `1cmYLxvsHA5UyA9KWWBPREQ3gY86HB84B`, Villa Paraiso piscina `1NRT2t_-ZNP-yEY5BoVRcIfIA-MHHFAan`, Stargazing `1fmDEVvf4gSO5DyFdoCNRaeEsbgSWq2zQ`, Boat Party `1IEVncrx91vKK5bbyABpJNXztFmfNI8Cw`, OCEAN PEAK `17VqOJgt4tvFfvIN3E1AAw1YHflFjIcqc`, doc yacht `18PbRgRq5K7uabQjmdZD8PkRnk3QqXXUkdkcBAGDND0w`.

## File principali creati questa sessione
- `MODIFICHE-8GIU-CHECKLIST.md` (FONTE DI VERITÀ punti PDF)
- `drive-setup.html` (istruzioni Alessandro, noindex)
- `alloggio/{villa-ar,villa-golf,villa-one,fanabe,atico}.html` + `alloggio/foto/<slug>/` (13 foto cad)
- `alloggio/foto/villa-paraiso-pool/` (8 foto)
- `escursioni/charter-privato.html`, `escursioni/boat-party.html` + `escursioni/foto/boat-party/`
- `escursioni/foto/{parapendio,paratrike,jeep,stargazing}/drive-NN.jpg` + `escursioni/foto/yacht/model-*.jpg`
- `_scrape/*.py` (pipeline Drive + Airbnb) — cartella GITIGNORED

## Decisioni Prese
- Deploy a blocchi con conferma (scelta Daniele). Visivi → deploy poi conferma a vista.
- Foto schede alloggio = scaricate LOCALI (no hotlink CDN). Scrape Airbnb via Apify actor `tri_angle~airbnb-rooms-urls-scraper` (locale `it-IT`). Token in `_AZIENDA/api-reference.md`.
- pt9a Reserva Cama → nodo Ostello GENERICO (scelta Daniele) via deep-link `?cat=ostello` (nuovo handler URL param in `pages.js` init).
- pt13: Yacht+Catamarano+Barco dentro UN nodo "Charter Privato" (scelta Daniele) — implementato come pagina hub (mind-map è a 3 livelli, niente 4° livello).
- Feedback hero/galleria 5 schede (Daniele): villa-golf hero=7a foto, villa-one -2 foto, fanabe hero=penultima, atico hero=ultima (tutti swap, niente foto perse).

## Problemi Noti
- Nessun test automatico (sito statico vanilla).
- Dead data residuo in `pages.js`/`pages.css` dopo restructure eventi+acqua (sub orfani `pageSubNodesData.eventi.fooddrink`, classi CSS vecchie `item-yacht/barco/catamarano`, `showcases-node` ecc.). Innocui, non rimossi per minimizzare rischio.
- `search.js` può indicizzare voci eventi/acqua vecchie con anchor non più esistenti (innocuo, no 404).
- Netlify Pretty URLs toglie `.html` (gotcha): `?cat=ostello` → `/alloggio?cat=ostello`, query preservata.
- Posizioni nodi nuovi (Eventi eptagono, Acqua Charter/BoatParty) e hero=drive-01 NON validati a vista.
- Warning git "LF will be replaced by CRLF" su Windows (innocuo).

## Comandi per Riprendere
```bash
cd "C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife"
cat MODIFICHE-8GIU-CHECKLIST.md   # <-- LEGGERE PRIMA: stato punti PDF
git status && git log --oneline -10

# Scaricare foto da una cartella Drive (esempio):
PYTHONUTF8=1 python _scrape/fetch_folder.py "<FOLDER_ID>" "escursioni/foto/<nome>" 12

# Deploy: push -> Netlify auto. Verifica build:
git add <files> && git commit -m "..." && git push origin main
for i in $(seq 1 18); do v=$(curl -s -o /dev/null -w "%{http_code}" "https://losqualo.netlify.app/<page>?cb=$(date +%s)"); [ "$v" = 200 ] && echo OK && break; sleep 7; done
```
Sito statico, zero dipendenze/build. Apify token + altre key in `_AZIENDA/api-reference.md`.
