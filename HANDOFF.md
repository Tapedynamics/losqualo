# HANDOFF — Lo Squalo Tenerife (review 22 apr applicata)

## Stato
- Data: 2026-04-28
- Branch: `main` (NON committato — solo modifiche locali)
- Live: `https://losqualo.netlify.app/` (versione precedente — push pending)

## Cosa è stato applicato

Review integrale dello Squalo (Google Doc del 22 apr) applicata in 12 fasi.

### F1 — Quick wins UI globali ✓
- Copyright `2024` → `dal 2009` su tutti i 38 file HTML
- "X Chiudi" → "← Indietro" globale (`pages.js`)
- Linee SVG curve home + livello 2 ora terminano sul **bordo del cerchio** (non passano sopra ai nodi). Logica in `script.js` + `pages.js` con `getElementCenter` esteso per radius
- Back-nav: dalle pagine livello 2 il "Home" → `index.html?explore=1` apre la mappa **già esplosa**

### F2 — Eliminazioni e rinomine ✓
- Alloggio: `Villa/Finca` → `Villa y Casa Rural`
- Alloggio: rimosso Villa Torviscas + Villa Costa Adeje (nodi + linee SVG + mobile data)
- Alloggio: `Casa Rural Taucio` → `Casa Rural Taucho`
- Alloggio: `La Correa del Almendro` → `Hotel Rural Arona` (in `hotel-rural-arona.html`)
- Surfing: rimosso El Médano (categoria intera + mobile data)
- Surfing: school → solo Ika Ika (rimosso Kontraola, K16, Franz, Vil's)
- Escursioni: rimossa categoria Sport (vuotata, Diving/Surf spostati in Oceano, kite/wind/fishing pure)
- Escursioni: rimosso Sottomarino in Oceano
- Escursioni: rimossi Bike, Hiking, Trekking in Terra (Stargazing rimasto)

### F3 — Link diretti / cortocircuiti ✓
- `Calle Mexico` click → `https://t.mtrbio.com/callemexicotenerife` (link diretto)
- `School` click → diretto Ika Ika
- `Surf Bar Franchise` click → diretto presentazione (no doppio nodo)
- `Surf` in Oceano → `surfing/ika-ika.html` (stesso percorso di Surf School)
- Mobile: aggiunto supporto `href` diretto sui primary nodes (`createMobilePageMap` ora crea `<a>` se `node.href` presente, `initMobilePageEvents` skippa il popup radial in quel caso)

### F4 — Home restyling ✓
- "Tenerife Experience": font ingrandito 1.25rem, weight 700, letter-spacing 4px (uniforme con logo Lo Squalo)
- "Tocca per esplorare" reso **bottone vero** (background blu Squalo, padding, animazione pulse)
- Silhouette Tenerife: `mix-blend-mode: multiply` per fondere eventuale sfondo bianco con il bg pagina
- Linee SVG: già al bordo cerchio (F1)
- Nuovo bottone **Brand** floating in basso a destra (homepage e in `index.html`) → `brand.html`
- Eventi pagina semplificata: 2 card (Servizi Privati + Next Event), nota su altre cat in fase di ridefinizione

### F5 — Scheda Alessandro ✓
- `alessandro.html` riscritta come scheda statica (no più mind-map sub-categorie)
- Bio integrale Squalo + foto profilo (placeholder "AB" con fallback a `assets/alessandro.jpg`)
- Icone social IG `@alessandrobiagini_losqualo` + FB + bottone WhatsApp `34616794190`

### F6 — Surf House + B2B + Camp + Spots ✓
- **NUOVA** `surfing/spots.html` — 6 surf spot Tenerife sud con tip Lo Squalo (riferimento palmbeach-tenerife.netlify.app/spots)
- **NUOVA** `surfing/surf-house-b2b.html` — scheda B2B per organizzatori ritiri/surf camp/gruppi (delegare logistica/location/coordinamento)
- **NUOVA** `surfing/surf-camp.html` — pacchetto Lo Squalo (alloggio + lezioni Ika Ika), 3 stay options
- **RISCRITTA** `alloggio/surf-house-luxury.html` come **hub 3 ville** (Finca La Fortaleza, Villa Playa Paraíso, Villa Duque) cliccabili che portano alle schede individuali

### F7 — Ostello + Penthouse + Appartamento contrasto ✓
- Ostello (Gota de Mar): nodo cliccabile (era `disabled-node`), nuova classe `.unavailable-node` (semi-trasparente con badge "i"), banner giallo in `gota-de-mar.html` "non disponibile, lascia messaggio per ricerca fuori network"
- Appartamento nodo: contrasto fixato (background più saturo `#d4869b → #ad6376`, color white, font-weight 700, text-shadow)
- Penthouse Los Cristianos: 8 foto reali da Drive caricate, hero + gallery aggiornati

### F8 — Materiale Drive ✓
Foto scaricate da Google Drive e ottimizzate:
- **Penthouse**: 8 foto in `alloggio/foto/penthouse-los-cristianos/drive-01..08.jpg`
- **Buggy**: 9 foto nuove in `escursioni/foto/buggy/drive-01..09.jpg`
- **Yacht** (Privato): 4 fun + 4 luxury in `escursioni/foto/yacht/`
- **Catamarano**: 6 foto in `escursioni/foto/catamarano/drive-01..06.jpg`
- **Barco sin Pilota**: 2 webp in `escursioni/foto/barco-sin-pilota/`
- **Teide Jeep**: cartella Drive contiene shortcut (non scaricabili) → uso le 8 foto preesistenti
- **Ottimizzazione globale**: 74 file >2MB compressi (max 1920px, quality 78) — risparmiati ~422MB. Risolve "foto Casa Rural Atogo lenta"

### F9 — Buggy contenuti ✓
- Hero foto sostituito (drive-02.jpg)
- Galleria con 9 foto Drive
- Aggiunto `Off-road`, `Stargazing`, `Sunset` come tag/sezioni
- 3 formule (Sunset / Off-Road / Stargazing) con descrizioni
- Riferimento `active-tenerife.com` aggiunto

### F10 — Categoria "Privato" in Oceano ✓
- Squalo voleva "Privato dentro Oceano". Implementato come: macro Privato eliminata, i 3 nodi (Yacht, Barco, Catamarano) spostati come item dentro la categoria Oceano (insieme alle altre voci)
- **NUOVE PAGINE**:
  - `escursioni/yacht.html` (con 2 opzioni: Fun Yacht + Luxury Yacht, foto Drive)
  - `escursioni/barco-sin-pilota.html` (senza patente)
  - `escursioni/catamarano.html` (4 itinerari)
- Linkate dalla mind-map Oceano in `escursioni.html`

### F11 — Polish ✓
- Colore `--alloggio-rurale` cambiato da `#CFA9A1` (marroncino) a `#DCB0BA` (rosa uniforme)
- Colori Surfing uniformati: `surfbar`/`callemexico`/`elmedano` ora tutti `#5FA6C6` (era diversi)
- 74 foto >2MB ottimizzate (parte F8)

### F12 — Eventi/Food&Drink ✓
- Eventi: 2 card (Servizi Privati + Next Event) + nota su ridefinizione
- Food&Drink: nessuna modifica, in standby come da brief

## File creati / modificati

### Nuovi file
- `surfing/spots.html`
- `surfing/surf-house-b2b.html`
- `surfing/surf-camp.html`
- `escursioni/yacht.html`
- `escursioni/barco-sin-pilota.html`
- `escursioni/catamarano.html`
- `brand.html`
- `REVIEW_22apr.md` (referenza istruzioni cliente)

### Riscritte completamente
- `alessandro.html` (mind-map → scheda statica)
- `eventi.html` (4 sub-cat → 2 card)
- `alloggio/surf-house-luxury.html` (single villa → hub 3 ville)

### Modificati significativamente
- `index.html` (CTA bottone, brand button, ?explore=1)
- `alloggio.html` (rimossi 2 nodi, rinomina villa, ostello cliccabile)
- `escursioni.html` (rimossa cat Sport + Privato, migrazione nodi a Oceano, aggiunti yacht/barco/catamarano)
- `surfing.html` (rimosso El Médano, school+callemexico+surfbar diretti)
- `script.js` (drawCurve bordo cerchio, ?explore=1 gestito)
- `pages.js` (drawCurve bordo cerchio, riconfigurazione completa per surfing/escursioni, supporto href su primary nodes mobile)
- `styles.css` (Tenerife font, click-hint button, brand button, .unavailable-node, colori uniformati)
- `pages.css` (appartamento contrasto)

## Foto scaricate (~31 nuove, totale ~10MB)
Vedi F8.

## Da fare (NON applicato in questa sessione)

- **Push su GitHub** — modifiche solo locali, da committare
- **Asset Alessandro foto profilo** — il fallback "AB" funziona, ma serve `assets/alessandro.jpg` reale (estrarre da IG/FB)
- **Quad foto homepage**: Squalo dice "non quella con le ragazze sedute per terra, ma quella con il gruppo SUI quad" — verificare quale è e sostituire (non identificata in questa sessione)
- **Parapendio gallery**: foto in volo specifiche (Drive non listato in questa sessione)
- **Paratrike gallery**: foto con mare/panorama
- **Surf in Oceano**: confermare che il flusso "click Surf in Oceano → Ika Ika" sia coerente con cosa Squalo voleva
- **Agency**: Squalo ha detto "click Agency apre `t-sml.mtrbio.com/.../losqualoagency`" — soluzione adottata: lasciato click home → agency.html (con tutta la mind-map agency interna). Il link mtrbio non è ancora cablato. Da rivedere con lui (potremmo aggiungere un nodo "Smartlink" prominente in agency.html, o sostituire del tutto il click home — decisione su entrambe le opzioni rimandata)
- **Logo grafico header** — Squalo dice "il tuo logo nel colore attuale". Lasciato testo "LO SQUALO" in colore `var(--blu-squalo)`. Per upgrade serve un asset svg/png logo

## Comandi per riprendere
```bash
cd "C:/Users/siusk/OneDrive/Desktop/Tape-Dynamics/_CLIENTI/losqualotenerife"
git status
git diff --stat
# Per push:
# git add -A && git commit -m "feat: review 22apr Squalo applicata" && git push
```
