# Checklist — AGGIUSTAMENTI SITO 8 giugno 2026

> Fonte: `_INBOX/losqualotenerife/AGGIUSTAMENTI SITO – TENERIFE EXPERIENCE - 8 giugno 2026.pdf`
> Goal: verificare che TUTTE le modifiche del documento siano inserite.
> Scope escluso dal goal: task che richiedono Google Drive (🔒) e asset esterni IG/FB (🖼️).
> Stato verifica codice: 2026-06-10. Deploy: push GitHub → Netlify (`losqualo.netlify.app`).

## Legenda
- ✅ fatto · ❌ da fare · ⚠️ parziale/da confermare · 👁️ check visivo necessario
- 🔒 richiede Google Drive (fuori goal) · 🖼️ richiede asset esterno IG/FB (fuori goal)

---

## 1. GENERALE / HOME — Cerca un servizio
- [ ] 1a — 👁️❌ Ridurre casella "Cerca un servizio" alla dimensione del bottone "Tenerife Experience" · `styles.css:1015` (.home-search esiste, da tarare)
- [ ] 1b — 👁️❌ Posizionarla equidistante tra bottone Tenerife Experience e bottone Brand
- [ ] 1c — 👁️❌ Dopo "Tocca per esplorare": stessa distanza tra bottone Brand e nodi macrocategorie

## 2. BRAND — Descrizione "Cos'è Lo Squalo"
- [x] 2a — ✅ FATTO (10 giu) Sostituito con testo esatto PDF. `brand.html:115`.

## 3. ALLOGGIO — Traduzioni
- [ ] 3a — ❌ Il nodo Alloggio resta IT in ES/EN. Tradurre il nodo in base alla lingua. (`en/es/index.html` traducono la landing ma puntano allo stesso `alloggio.html` IT)

## 4. RURALE / GLAMPING — Finca Chimiche
- [ ] 4a — 👁️ Eliminare foto doppie galleria. `finca-chimiche.html` ha `drive-01..12` (nomi unici) → doppioni VISIVI, serve occhio sulle immagini.

## 5. VILLA — aggiungere 3 strutture
- DATI SCRAPATI (Apify, 10 giu) → `_scrape/airbnb-8giu.json`. Schede generate via `_scrape/gen_pages.py` (13 foto locali cad. in `alloggio/foto/<slug>/`).
- [x] 5a — ✅ FATTO (11 giu) `alloggio/villa-ar.html` (16 pax · 8 cam · ★4.77) CABLATA nel nodo Villa (desktop+mobile). Posizioni validate a vista.
- [x] 5b — ✅ FATTO (11 giu) `alloggio/villa-golf.html` (7 pax · 4 cam · ★4.64) CABLATA nel nodo Villa.
- [x] 5c — ✅ FATTO (11 giu) `alloggio/villa-one.html` (6 pax · 4 cam · ★4.71) CABLATA nel nodo Villa.

## 6. VILLA PARAISO
- [x] 6a — ✅ FATTO (10 giu, Drive ON) 8 foto piscina aggiunte in cima alla gallery. `alloggio/foto/villa-paraiso-pool/`.

## 7. FULL EXPERIENCE
- [x] 7a — ✅ FATTO (10 giu) Bottoni "Full Experience" in `surf-house-luxury.html` e `surf-house-rurale.html` → ora WhatsApp.

## 8. APPARTAMENTO — aggiungere (dati scrapati → `_scrape/airbnb-8giu.json`)
- [x] 8a — ✅ FATTO (11 giu) `alloggio/fanabe.html` (4 pax · 3 cam · ★4.76) CABLATA nel nodo Appartamento (desktop+mobile).
- [x] 8b — ✅ FATTO (11 giu) `alloggio/atico.html` (8 pax · 4 cam · ★4.6) CABLATA nel nodo Appartamento.

## 9. SURF HOUSE (dentro SURFING TENERIFE)
- [x] 9a — ✅ FATTO (10 giu) Reserva Cama → nodo Ostello generico. Aggiunto handler `?cat=` in `pages.js` (deep-link categoria); link `surfing.html` + `pages.js` → `alloggio.html?cat=ostello`.
- [x] 9b — ✅ Reserva habitación → Surf House Rural. `pages.js:657` → `surf-house-rurale.html`.
- [ ] 9c — ❌ Percorso indietro: non cambiare macrocategoria, tornare al nodo Surf House dentro Surfing Tenerife.
- [ ] 9d — ❌ Eliminare nodo Gallery. Ancora presente `surfing.html:79`, `pages.js:658`.
- [ ] 9e — ❌ Spostare Full Experience da Surf House a Surfing Tenerife, visibile all'apertura macro. Ora `pages.js:655` sotto Surf House.

## 10. ALESSANDRO
- [ ] 10a — 🖼️❌ Foto profilo (da IG/FB). `assets/alessandro.jpg` NON esiste → mostra fallback "AB". FUORI GOAL (asset esterno).

## 11. AGENCY → ✅ FATTO (11 giu) restructure completo
- [x] 11a — ✅ Agency (home) apre `agency.html` (mappa a nodi), non più `agency/oferta.html`. `index.html`.
- [x] 11b — ✅ Eliminati i 4 nodi SMM/Graphic Design/Artist Management/Start Business (HTML+pages.js+pages.css).
- [x] 11c — ✅ Nodo Portfolio → `https://t.mtrbio.com/losqualoagency` (leaf, _blank).
- [x] 11d — ✅ Nodo Servizi e Prezzi → riusa `agency/oferta.html` (leaf).
- [x] 11e — ✅ Nodo Contact & Social (espandibile) → 5 sub: Instagram/Facebook/TikTok/Google/Email (+mailto). Validato a vista (fan attorno al nodo, nessuna sovrapposizione).
- Nuova struttura: 3 nodi primari (positions3 mobile). Vecchia CSS/dati agency rimossa pulita (no orfani).

## 12. ESCURSIONI E ATTIVITÀ
- [x] 12a — ✅ FATTO (10 giu, Drive ON) Jeep: hero + 14 foto Drive. ⚠️ Hero=drive-01, conferma a vista la "bella foto".
- [ ] 12b — 🖼️ Quad: cambiare Hero 1 con foto dove si vedono i quad. Serve foto adatta.
- [x] 12c — ✅ FATTO (10 giu) Buggy: rimossa versione Stargazing ovunque (location, quick-info, tag, descrizione, "Le due formule", Astrofili, CTA). `escursioni/buggy.html`.

## 13. ACQUA — Charter Privato
- [x] 13a — ✅ FATTO (10 giu) Nodo "Charter Privato" in Acqua → pagina hub `charter-privato.html`. ⚠️ posizioni nodi da confermare a vista.
- [x] 13b — ✅ FATTO (10 giu) Yacht: "Le due opzioni"→"Le opzioni" + testo "due opzioni"→"più opzioni". `escursioni/yacht.html`.
- [x] 13c — ✅ FATTO (10 giu) Rimosso blocco "Charter Privato – Ocean Peak" + galleria Ocean Peak. `escursioni/yacht.html`.
- [x] 13d — ✅ FATTO (10 giu) Yacht "I modelli" in formato opt-photo come Fun/Luxury (foto + prezzi).
- [x] 13e — ✅ FATTO (Drive ON) Foto modelli (Sunshine/Champagne/Armani/Salita) da OCEAN PEAK + prezzi dal doc Drive. ⚠️ mapping foto Armani/Salita da confermare (PDF aveva ID Armani errato).
- [x] 13f — ✅ FATTO Charter Privato contiene Yacht + Catamarano + Barco (pagina hub `charter-privato.html`). Rimossi i 3 nodi singoli da Acqua.
- [x] 13g — ✅ FATTO Colori nodi Charter/Boat Party azzurri (`pages.css`).
- [x] 13h — ✅ FATTO Nodo Boat Party → `boat-party.html` con descrizione PDF + 8 foto Drive.

## 14. ARIA
- [x] 14a — ✅ FATTO (10 giu, Drive ON) Stargazing: hero + galleria 15 foto in `tenerife-stars.html` (nodo Aria Stargazing → Tenerife Stars).
- [x] 14b — ✅ FATTO Parapendio: hero + 12 foto Drive. ⚠️ Hero=drive-01, conferma a vista.
- [x] 14c — ✅ FATTO Paratrike: hero + 12 foto Drive. ⚠️ Hero=drive-01, conferma a vista.

## 15. EVENTI  → ⚠️ VISIVO, deployato 10 giu, da confermare a vista
- [x] 15a — ✅ Nodo rinominato "Eventi e Servizi Privati" (home `index.html` + centro `eventi.html`).
- [x] 15b — ✅ Struttura piatta 7 nodi: Venue, Car Rent & Transfer, Food & Drink, Suono e Luci, Music & Show, Feste e Movida, Tips. (`eventi.html` + `pages.js` main/mobile, `pages.css` eptagono)
- [x] 15c — ✅ Rimossa vecchia struttura Eventi (Food&Drink espandibile + Servizi + Next Event + sub-nodi).
- [x] 15d — ✅ Tutti i 7 nodi → WhatsApp (desktop + mobile).
- ⚠️ DA CONFERMARE A VISTA: posizioni eptagono desktop + mobile, leggibilità centro 3-righe, label home lunga.

---

## Riepilogo avanzamento — aggiornato 10 giu (Drive ON)

### ✅ FATTI E LIVE su losqualo.netlify.app
- **2** Brand desc · **6** Villa Paraiso foto piscina · **7** Full Experience→WA
- **9a** Reserva Cama→Ostello · **9b** Reserva Habitación (già ok)
- **12a** Jeep gallery+hero · **12c** Buggy no-Stargazing
- **13a/b/c/d/e/f/g/h** TUTTO Acqua: Charter Privato (hub Yacht+Catamarano+Barco), Boat Party, yacht "Le opzioni" + no Ocean Peak + modelli con foto/prezzi, colori azzurri
- **14a/b/c** Stargazing+Parapendio+Paratrike gallery+hero
- **15a/b/c/d** Eventi e Servizi Privati (7 nodi piatti → WhatsApp)

### ✅ CABLAGGIO 5 NODI ALLOGGIO — FATTO E LIVE (11 giu)
- **5a/b/c** Villa A&R/Golf/One + **8a/b** Fañabé/Ático cablati in mappa (commit `b2c41fd`). Posizioni validate via screenshot headless deterministico. 5 schede target verificate 200.
- ⚠️ Pre-esistente (non introdotto): nodo `loscristianos` (Appartamento, 88%/45%) cade dietro il bottone HOME quando la categoria è espansa — da nudge in un eventuale pass visivo.

### ❌ RIMASTI DA FARE (in scope) — tutti restructure mind-map o visivi
- **1a/b/c** 👁️ Search box home: misura+posizione (`styles.css:1015`)
- **3a** Traduzione nodo Alloggio per lingua ES/EN (`en/es/index.html`, dict `pages.js:7-10`)
- **4a** 👁️ Finca Chimiche: doppioni foto (visivi, `alloggio/foto/finca-chimiche/`)
- **9c** Back-path Surf House non cambi macrocategoria
- **9d** Eliminare nodo Gallery (`surfing.html:79`, `pages.js`)
- **9e** Spostare Full Experience da Surf House al macro Surfing Tenerife
- **12b** 🖼️ Quad: hero con foto coi quad (nessuna cartella Drive dedicata — serve foto)

### FUORI GOAL (confermato)
- **10** Foto profilo Alessandro (IG/FB) — `assets/alessandro.jpg` non esiste, fallback "AB"

### ⚠️ Da confermare A VISTA (deployati, posizioni/hero alla cieca)
- Eventi (15) eptagono · Acqua (13) nodi Charter/BoatParty · hero=drive-01 di Jeep/Parapendio/Paratrike (12a,14b,14c) · mapping foto Armani/Salita yacht (13e)

**Bottom line** (agg. 11 giu): ~37/38 task FATTI e live. Cablaggio 5 alloggio + Agency (pt11) CHIUSI. Restano: **9c/d/e** Surf House (restructure mind-map) + 3 visivi (1, 4, 12b) + 1 i18n (3). Tutto il pesante Drive è CHIUSO.
