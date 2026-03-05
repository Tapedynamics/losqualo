# Lo Squalo Tenerife

> Mappa concettuale interattiva SVG per agenzia turistica Tenerife (since 2009) | HTML + CSS + Vanilla JS | Netlify | Deployato

## Tier 1 - Fonte di verita (caricare SEMPRE)
- `index.html` - Homepage con mind map SVG: Tenerife al centro, 6 categorie radiali (Eventi, Alloggio, Escursioni, Surfing, Agency, Alessandro)
- `script.js` - Logica interattiva homepage: linee SVG dinamiche, stati espansione, navigazione tastiera (ESC)
- `styles.css` - Stili homepage + palette colori (6 macro), responsive desktop/mobile

## Tier 2 - On-demand
- `eventi.html`, `alloggio.html`, `escursioni.html`, `surfing.html`, `agency.html`, `alessandro.html` - Pagine categoria livello 2 con mini mind-map e sotto-categorie
- `pages.css` - Stili specifici pagine categoria
- `pages.js` - Logica interattiva pagine categoria (nodi livello 2 e 3, popup radiale mobile)
- `PROGETTO.txt` - Documentazione completa struttura, palette, funzionalita, cronologia
- `alloggio/` - Risorse aggiuntive pagina alloggio

## Tier 3 - Ignorare
- `.git/`, `.claude/`
- `Lo Squalo Concept Map.pdf`, `PALETTE COLORI CONCEPT MAP.docx` - Documenti originali cliente
- `mappa.jpeg`, `tenerife.png` - Immagini (binari)

## Note
- Repo: https://github.com/Tapedynamics/losqualo.git
- Live: https://losqualo.netlify.app/
- Zero dipendenze esterne (vanilla JS, no framework)
- Linee SVG calcolate con `getBoundingClientRect()`, aggiornamento 50ms (desktop) / 100ms (mobile)
- Popup radiale mobile usa trigonometria (seno/coseno) per posizionamento
