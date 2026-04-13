# HANDOFF — Lo Squalo Tenerife

## Stato Sessione
- **Data**: 2026-04-13
- **Branch**: `main` (up to date con origin)
- **Live**: https://losqualo.netlify.app/ (auto-deploy Netlify da push)
- **Repo**: https://github.com/Tapedynamics/losqualo.git

## File Modificati (sessione)
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio.html`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/escursioni.html`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/styles.css`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/pages.css`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/pages.js`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/script.js`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio/detail.css`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/surfing/detail.css`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio/villa-duque.html` (NEW)
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio/finca-playa-paraiso.html` (RENAMED da `finca-wedding-retreat.html`)
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio/finca-chimiche.html`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio/finca-ciguaña.html`
- `C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife/alloggio/casa-rural-taucho.html`

Untracked (non committati, solo locali — asset da ordinare):
- `SURF BAR FRANCHISE WEB/` (foto/video forniti cliente)
- `SURF SCHOOL/` (foto/video forniti cliente)

## Completato

### Fase 1 — UX
- Bullet sovrapposti fixati in card detail (alloggio + surfing)
- Back-nav da prodotto ripristina sub di provenienza via sessionStorage (`losqualo_lastSub_<macro>`)
- Sub selezionata al centro con prodotti radiali (JS + CSS state `sub-centered`)
- Back-btn spostato top-left (era bottom-center, copriva prodotti)
- Colori Surf House + Appartamento riallineati al rosa madre (sia nodi che prodotti item-*)
- Zoom 100% SVG: `viewBox` dinamico + `preserveAspectRatio="none"` + rAF esteso + round subpixel + fonts.ready trigger
- Linee SVG nascoste in stato sub-centered (scelta concordata con cliente — layout radiale autoesplicativo)

### Fase 2 — Struttura
- Classe CSS `.disabled-node` globale (opacity 0.35, grayscale, pointer-events:none)
- Alloggio inibiti: Ostello, Villa Torviscas, Villa Costa Adeje
- Escursioni inibiti in Terra: Stargazing, Bike, Hiking, Trekking
- Rename Alloggio: Casa Atogo → Casa Rural Atogo, Casa Dolores → Casa Rural Taucio
- Rename Escursioni: Teide → Terra, Sky → Aria, Jeep → Jeep Experience
- Categoria Finca Wedding rimossa + Wedding Retreat rinominato Finca Playa Paraíso spostato in Villa/Finca
- Villa Duque aggiunta in Villa/Finca (scheda popolata)
- Finca Sigüeña: location aggiornata Atogo (era Guía de Isora)

### Fase 3 — Contenuti (parziale)
Schede completate con descrizioni vere dal Drive:
- Villa Duque
- Finca Chimiche (escapada romantica/jacuzzi/eventi)
- Finca Cigüaña (4 case indipendenti: Herradura/Orchilla/Palmeras/Refugio)

Schede già OK al momento del review (verificato, no action):
- Hotel Rural Arona (La Correa del Almendro + Wine Experience + Bubble Andromeda/Leo)
- Cueva San Miguel (120 m² + servizi extra)

### Simplify (code review)
- `transitionend` handler usa `scheduleUpdate()` (rAF-batched) invece di `updatePageLines()` diretto
- Rimossi commenti WHAT sopra funzioni auto-esplicative
- Whitespace cleanup

## In Corso / Rimasto da Fare

### Fase 3 — Contenuti restanti (TASK #9 IN PROGRESS)
**Schede da popolare con contenuti Drive:**
- Surf House Luxury: landing con 3 prodotti (Finca La Fortaleza + Villa Playa Paraíso + Villa Duque)
- Surf House Rurale: contenuti = Casa Rural Atogo
- 5 schede prodotto Escursioni da CREARE (oggi sono solo `#hash` link):
  - Buggy, Quad, Jeep Experience (dentro Terra)
  - Parapendio, Paratrike (dentro Aria)
  - Drive ha foto+video+descrizioni in `MACROCATEGORIE/ESCURSIONI E ATTIVITÀ/TERRA/` e `/ARIA/`
- Rifinitura testi già pronti: Finca La Fortaleza (aggiungere servizi extra), Villa Playa Paraíso (replica sezione servizi su tutti Villa/Finca), Cueva (arricchire descrizione), Wine Experience (selezione)

### Fase foto/cover (SEPARATA)
- Gallerie attuali: 6 foto fisse hardcoded — vanno portate a ≥10 foto per ~10 schede
- Cover da sostituire: Beach House, Finca Sigüeña, Villa Playa Paraíso, Finca La Fortaleza, Casa Rural Taucio, Penthouse, Alcalá, Studio Las Américas, Studio Los Cristianos
- Richiede download massivo da Drive + commit foto nel repo (cartelle `alloggio/foto/<prodotto>/`)

### Task #7 rimandato
- WhatsApp precompilato lingua-aware: sito oggi IT-only, ha senso solo con multilingua. Rimandato fino a i18n.

## Decisioni Prese

1. **Linee SVG nascoste in sub-centered state**: scelta proposta dal cliente (vocale WhatsApp 13:43) — la disposizione radiale dei nodi è autoesplicativa e risolveva problemi persistenti di sync delle linee dopo il riposizionamento dinamico.
2. **Inibizioni = grigio non cliccabile** (conferma user): nodi restano visibili per segnalare "esiste ma non attivo", non nascosti.
3. **Sub al centro con layout radiale calcolato in JS**: posizioni trigonometriche dinamiche (raggio 28-32% in base al count), non CSS fisso. Permette di aggiungere/rimuovere prodotti senza toccare il layout.
4. **Back nav memorizzata in sessionStorage per-macro**: key pattern `losqualo_lastSub_<pageName>`, clear al back-to-index. Persistenza tab-scoped, non cross-tab.
5. **Villa Playa Paraíso (villa) e Finca Playa Paraíso (finca ex-wedding) coesistono**: due strutture distinte, stessa località. Mantenute separate.
6. **Villa Duque creata copiando villa-ciguaña.html come template + edit**: più veloce che from-scratch, poi contenuti sovrascritti.

## Problemi Noti

- 5 nodi Escursioni Terra/Aria hanno href `#hash` fake (Buggy, Quad, Jeep Experience, Parapendio, Paratrike) — cliccando non porta a nessuna scheda. Fase 3 pending.
- Surf House Luxury scheda attuale è generica, non contiene ancora le 3 sub-villas richieste (Fortaleza/Playa Paraíso/Duque).
- Surf House Rurale non è ancora allineata a Casa Rural Atogo.
- `SURF BAR FRANCHISE WEB/` e `SURF SCHOOL/` untracked nel working tree — da decidere se committare o aggiungere a `.gitignore`.
- CRLF warnings git: normali su Windows, non richiedono azione.
- Nodi inibiti (`<div>` invece di `<a>`): l'attributo `data-category` è stato tenuto dove presente, ma alcuni `node-secondary` disabled non hanno href — il selettore `.node-primary[data-category="..."]` in `showPageSubcategories` funziona solo su node-primary attivi, non è impattato.

## Comandi per Riprendere

```bash
# Pull latest (sync-before-edit)
cd /c/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife
git pull

# Test locale
# (sito statico, basta aprire index.html nel browser oppure)
python -m http.server 8000
# poi http://localhost:8000

# Deploy
git add <files>
git commit -m "..."
git push
# Netlify auto-builda da push su main
```

## Reference Drive (per Fase 3 residua)

Root: https://drive.google.com/drive/folders/1hnp1C3WfA7lK5DcU6xPInmuJiFCgmitH

Mappa rilevante:
- `MACROCATEGORIE/ALLOGGIO/SURF HOUSE/` → doc `SURF HOUSE – TENERIFE SUD` (già letto)
- `MACROCATEGORIE/ALLOGGIO/VILLA - FINCA/VILLA PLAYA DEL DUQUE/` → `DESCR. VILLA DUQUE` (letto, applicato)
- `MACROCATEGORIE/ESCURSIONI E ATTIVITÀ/TERRA/` → sottocartelle BUGGY, QUAD, JEEP experience (foto+video+descrizioni)
- `MACROCATEGORIE/ESCURSIONI E ATTIVITÀ/ARIA/` → PARAPENDIO, PARATRIKE

## Task Ledger (memoria TaskList al handoff)
- #1-#6, #8: completed
- #7: pending (rimandato a i18n)
- #9: in_progress (Fase 3 parziale — vedi "Rimasto da Fare")
