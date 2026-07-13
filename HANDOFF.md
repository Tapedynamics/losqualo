# HANDOFF — Lo Squalo (losqualotenerife)

## Stato Sessione
- Data/ora: 15/06/2026
- Branch git: `main` — allineato a `origin/main` (push fatto)
- Ultimo commit: `12420bf` "Fix back IKA IKA context-aware + rename Tenerife Stars -> Stargazing"
- Deploy: git→Netlify (`losqualo.netlify.app`) — **build andata, fix VERIFICATI live**

## File Modificati (committati + deployati)
- `C:\Users\siusk\OneDrive\Desktop\Tape-Dynamics\_CLIENTI\losqualotenerife\escursioni.html`
- `C:\Users\siusk\OneDrive\Desktop\Tape-Dynamics\_CLIENTI\losqualotenerife\pages.js`
- `C:\Users\siusk\OneDrive\Desktop\Tape-Dynamics\_CLIENTI\losqualotenerife\surfing\ika-ika.html`
- `C:\Users\siusk\OneDrive\Desktop\Tape-Dynamics\_CLIENTI\losqualotenerife\escursioni\tenerife-stars.html`
- `C:\Users\siusk\OneDrive\Desktop\Tape-Dynamics\_CLIENTI\losqualotenerife\search.js`

Untracked NON deployati (ignorabili): `MODIFICHE-14GIU-PIANO.md` (il piano sorgente), `proposta-borsa-realestate.html`. Modificato non committato: `.claude/settings.local.json`.

## Completato
- **SYNC** verificato (`0 0` vs origin/main) prima di editare.
- **Pt 4 — Back IKA IKA context-aware** (bug certo). IKA IKA è raggiunta da Surfing>School e da Escursioni>Acqua>Surf. Fix in 3 file:
  - `escursioni.html`: nodo Surf → `surfing/ika-ika.html?from=escursioni`
  - `pages.js`: sub mobile `surf` (pageSubNodesData.escursioni.oceano) → stesso href con `?from=escursioni`
  - `surfing/ika-ika.html`: anchor back ha `id="back-link"`; script inline (prima di `whatsapp-i18n.js`) che con `?from=escursioni` riscrive l'href in `../escursioni.html?cat=oceano` (riapre la sub Acqua via handler `pages.js:377`); altrimenti resta default `../surfing.html`.
- **Pt 2a — Rename "Tenerife Stars" → "Stargazing"**: nodo/label (`escursioni.html`), sub mobile (`pages.js`), `<title>`+`<h1>`+`alt` (`tenerife-stars.html`), voce indicizzata (`search.js`). Tenuti invariati di proposito: filename `tenerife-stars.html`, link esterno `tenerifestars.com`, CTA "Tenerife Stars" (`tenerife-stars.html:123/126`) = nome proprio operatore esterno.
- **Sentinel**: PASS 5/5, zero critici/alti, nessuna regressione (verificati entrambi i percorsi back, selettori CSS/SVG coerenti).
- **Verifica post-deploy** (cache-bust) OK: title `Stargazing al Teide…`, `from=escursioni` in escursioni.html, `back-link`+`cat=oceano` in ika-ika.html, `name: 'Stargazing'` in search.js.
- **Notifica WhatsApp al boss** inviata via Jarvis (`sendToBoss`, consegnata, sid `SM051ea713…`).

## In Corso / Rimasto da Fare (dal piano `MODIFICHE-14GIU-PIANO.md`)
Codice — fattibile senza cliente:
- **Pt 7 — Sisters Hostel**: aggiungere 2° nodo al ramo Ostello + creare pagina **placeholder**. Dettaglio nel piano (righe 58-66): `alloggio.html` (line SVG + node `item-sisters`), `pages.js:106` (pageLineConfig.alloggio.ostello) + `pages.js:572` (subs), creare `alloggio/sisters-hostel.html` copia di `alloggio/banana-surf-hostel.html` con "Info in arrivo" + CTA WhatsApp. Contenuto reale pendente (vedi sotto).

Asset — serve occhio sulle foto:
- **Pt 2b — Hero Stargazing = galassia (no luna)**: scegliere foto galassia tra le 15 in `escursioni/foto/stargazing/drive-01..15`, settare hero `tenerife-stars.html:19`. Se assente, ri-scaricare cartella Drive STARGAZING `1fmDEVvf4gSO5DyFdoCNRaeEsbgSWq2zQ` con `_scrape/fetch_folder.py`.
- **Pt 1 — Paratrike**: ri-scaricare cartella Drive PARATRIKE `1Ur_wLf8lZxm2M2F8PhrvsZUmpo582GeC` (`PYTHONUTF8=1 python _scrape/fetch_folder.py "<ID>" "escursioni/foto/paratrike" 12`), sostituire gallery + scegliere hero panoramico del volo. ⚠️ Se Drive == foto attuali → è solo cache (hard-refresh, niente fix).

Verify-first sul live (probabile cache, basta hard-refresh lato cliente):
- **Pt 5a** — Agency 3 nodi: già a codice/deployato.
- **Pt 6** — Eventi nodi colorati: già a codice/deployato.
- **Pt 5b** — Contact mantiene colore da aperto: atteso ok, confermare a video.

Bloccati — dipendono da Lo Squalo:
- **Pt 3 — Quad "ragazze sul quad"**: nessuna foto esiste, niente cartella Drive Quad → deve mandare la foto. (Decisione: lasciato com'è.)
- **Pt 7 contenuto Sisters Hostel**: galleria + descrizione + link/sito + camere/contatto.
- **Pt 1 Paratrike**: confermare quali foto considera "vecchie" se Drive coincide con online.

## Decisioni Prese
- **Rename**: rinominata solo l'esperienza ("Stargazing"); MANTENUTI filename, link `tenerifestars.com` e CTA "Tenerife Stars" perché è il nome proprio dell'operatore esterno di prenotazione (non un refuso da sostituire). Keyword search.js tiene "tenerife stars" → la ricerca trova ancora la pagina.
- **Back IKA IKA**: scelto pattern `?from=escursioni` + deep-link `?cat=oceano` (già gestito da `pages.js:377`), coerente con Surf House 9c (commit `afe08e6`). Surfing>School resta default invariato.
- **Deploy**: solo i 5 file toccati; esclusi untracked (piano, proposta) e settings.local.json.
- **Notifica**: usato `sendToBoss` (coda Opzione A) e non Twilio diretto, per coerenza con l'architettura Jarvis.

## Problemi Noti
- Nessun bug/test fallito introdotto. Sentinel PASS.
- Note minori PRE-ESISTENTI (non azione): (1) su mobile `createMobilePageMap` ignora `?cat=` e usa solo `recallSub()`/sessionStorage → un deep-link diretto condiviso `escursioni.html?cat=oceano` su mobile non apre la sub Acqua; nel flusso reale (click→ritorno) funziona. (2) lo script back in ika-ika gestisce solo `from=escursioni` (unico secondo percorso).
- Durante la verifica post-deploy: curl separati possono colpire edge-node Netlify con cache diversa (un grep ha dato 0 falso); verificare sempre con tutti i pattern in UNA sola response.

## Comandi per Riprendere
```bash
cd "C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife"
git fetch origin && git status
git rev-list --left-right --count HEAD...origin/main   # atteso 0 0

# Deploy futuro (git→Netlify, NO netlify CLI):
git add <files> && git commit -m "..." && git push origin main
# Verifica post-deploy (cache-bust, tutti i pattern in 1 response):
curl -s "https://losqualo.netlify.app/<page>?cb=$(date +%s)" | grep -oE '<title>[^<]+</title>'

# Re-scaricare foto Drive (Pt 1 / Pt 2b):
PYTHONUTF8=1 python _scrape/fetch_folder.py "<FOLDER_ID>" "<destdir>" <N>

# Notifica boss via Jarvis (td-05):
ssh hetzner-turn 'docker exec -i jarvis node -e "let d=\"\";process.stdin.on(\"data\",c=>d+=c).on(\"end\",()=>{require(\"/app/src/services/outboundQueue\").sendToBoss(d.trim()).then(r=>console.log(JSON.stringify(r)))})"' <<'EOF'
<messaggio>
EOF
```
