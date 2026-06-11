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
- [~] 5a — ⚠️ SCHEDA FATTA `alloggio/villa-ar.html` (16 pax · 8 cam · ★4.77). MANCA: cablaggio nodo mind-map (visivo).
- [~] 5b — ⚠️ SCHEDA FATTA `alloggio/villa-golf.html` (7 pax · 4 cam · ★4.64). MANCA: cablaggio nodo.
- [~] 5c — ⚠️ SCHEDA FATTA `alloggio/villa-one.html` (6 pax · 4 cam · ★4.71). MANCA: cablaggio nodo.

## 6. VILLA PARAISO
- [x] 6a — ✅ FATTO (10 giu, Drive ON) 8 foto piscina aggiunte in cima alla gallery. `alloggio/foto/villa-paraiso-pool/`.

## 7. FULL EXPERIENCE
- [x] 7a — ✅ FATTO (10 giu) Bottoni "Full Experience" in `surf-house-luxury.html` e `surf-house-rurale.html` → ora WhatsApp.

## 8. APPARTAMENTO — aggiungere (dati scrapati → `_scrape/airbnb-8giu.json`)
- [~] 8a — ⚠️ SCHEDA FATTA `alloggio/fanabe.html` (4 pax · 3 cam · ★4.76). MANCA: cablaggio nodo mind-map.
- [~] 8b — ⚠️ SCHEDA FATTA `alloggio/atico.html` (8 pax · 4 cam · ★4.6). MANCA: cablaggio nodo.

## 9. SURF HOUSE (dentro SURFING TENERIFE)
- [x] 9a — ✅ FATTO (10 giu) Reserva Cama → nodo Ostello generico. Aggiunto handler `?cat=` in `pages.js` (deep-link categoria); link `surfing.html` + `pages.js` → `alloggio.html?cat=ostello`.
- [x] 9b — ✅ Reserva habitación → Surf House Rural. `pages.js:657` → `surf-house-rurale.html`.
- [ ] 9c — ❌ Percorso indietro: non cambiare macrocategoria, tornare al nodo Surf House dentro Surfing Tenerife.
- [ ] 9d — ❌ Eliminare nodo Gallery. Ancora presente `surfing.html:79`, `pages.js:658`.
- [ ] 9e — ❌ Spostare Full Experience da Surf House a Surfing Tenerife, visibile all'apertura macro. Ora `pages.js:655` sotto Surf House.

## 10. ALESSANDRO
- [ ] 10a — 🖼️❌ Foto profilo (da IG/FB). `assets/alessandro.jpg` NON esiste → mostra fallback "AB". FUORI GOAL (asset esterno).

## 11. AGENCY
- [ ] 11a — ❌ Agency deve aprire struttura a nodi, non scheda. Ora `index.html:62` → `agency/oferta.html`.
- [ ] 11b — ❌ Eliminare nodi: SMM & Marketing, Graphic Design, Artist Management, Start Business. Presenti `pages.js:662-696`.
- [ ] 11c — ❌ Nuovo nodo Portfolio → `https://t.mtrbio.com/losqualoagency`
- [ ] 11d — ❌ Nuovo nodo Servizi e Prezzi (= scheda `oferta.html` attuale)
- [ ] 11e — ❌ Nuovo nodo Contact & Social:
  - IG `instagram.com/losqualoagency` · FB `facebook.com/losqualoagency`
  - Email `agency.losqualotenerife@gmail.com` · TikTok `tiktok.com/@agencylosqualotenerife`
  - Google `share.google/EPTc7zGdCKpWTuL87`

## 12. ESCURSIONI E ATTIVITÀ
- [x] 12a — ✅ FATTO (10 giu, Drive ON) Jeep: hero + 14 foto Drive. ⚠️ Hero=drive-01, conferma a vista la "bella foto".
- [ ] 12b — 🖼️ Quad: cambiare Hero 1 con foto dove si vedono i quad. Serve foto adatta.
- [x] 12c — ✅ FATTO (10 giu) Buggy: rimossa versione Stargazing ovunque (location, quick-info, tag, descrizione, "Le due formule", Astrofili, CTA). `escursioni/buggy.html`.

## 13. ACQUA — Charter Privato
- [ ] 13a — ❌ Creare categoria "Charter Privato" dentro Acqua.
- [x] 13b — ✅ FATTO (10 giu) Yacht: "Le due opzioni"→"Le opzioni" + testo "due opzioni"→"più opzioni". `escursioni/yacht.html`.
- [x] 13c — ✅ FATTO (10 giu) Rimosso blocco "Charter Privato – Ocean Peak" + galleria Ocean Peak. `escursioni/yacht.html`.
- [ ] 13d — ⚠️ Sistemare prodotti Yacht come Luxury/Fun. Struttura ok, ma nuovi prodotti = Drive (13e).
- [ ] 13e — 🔒 Prodotti Yacht (Sunshine Yacht, Champagne, Armani) foto+desc da Drive doc. FUORI GOAL.
- [ ] 13f — ⚠️ Charter Privato interno: Catamarano + Barco sin piloto. Esistono (`pages.js:620-621`) ma non raggruppati.
- [ ] 13g — ❌ Colori nodi azzurri (allineati ad Acqua).
- [ ] 13h — ❌(nodo+desc) / 🔒(foto) Nodo Boat Party + descrizione:
  - *"Ogni settimana, 3 ore di festa in alto mare con DJ set e open bar. Scopri l'offerta!"*
  - Foto: cartella Drive (fuori goal).

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

## Riepilogo avanzamento

**Totale task PDF: 38** (atomizzati)

| Categoria | Conteggio |
|-----------|-----------|
| ✅ Fatto | 1 (9b) |
| ⚠️ Parziale | 3 (9a, 13d, 13f) |
| ❌ Da fare (in scope) | 22 |
| 👁️ Check visivo (in scope) | 4 (1a,1b,1c,4a) |
| 🔒 Drive (FUORI GOAL) | 7 (6, 12a, 13e, 13h-foto, 14a, 14b, 14c) |
| 🖼️ Asset esterno (FUORI GOAL) | 2 (10, 12b) |

**Conclusione**: il blocco 8 giugno è sostanzialmente NON lavorato. Solo Reserva habitación (9b) era già corretto.

**Scope del goal (escludendo 🔒 e 🖼️): ~28 task** → 1 fatto, 2 parziali, 25 da completare.
