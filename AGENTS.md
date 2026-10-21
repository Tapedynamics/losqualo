# Guida per l'IA — sito Lo Squalo Tenerife

Leggi questo file PRIMA di modificare qualsiasi pagina. Vale per Codex, ChatGPT, Claude o qualunque altro strumento.

## Com'è fatto il sito

- Sito statico: solo HTML, CSS e JavaScript, nessun framework, nessun comando di build.
- Pubblicato da Netlify direttamente dalla cartella principale del repository: ogni `git push` sul ramo `main` va online in un minuto.
- Dominio: `https://losqualotenerife.com`.
- **Ogni file nella cartella è pubblico.** Non mettere qui documenti privati, preventivi, password o dati di fornitori.

## Regola numero uno: le tre lingue

Il sito esiste in tre copie con gli stessi nomi di file:

| Lingua | Cartella | Esempio |
|---|---|---|
| Italiano | principale (`/`) | `escursioni/balene.html` |
| Inglese | `en/` | `en/escursioni/balene.html` |
| Spagnolo | `es/` | `es/escursioni/balene.html` |

- **Ogni modifica va fatta in tutte e tre le lingue**, tradotta. Se cambi un prezzo, un testo o una foto in italiano, cambialo anche in `en/` e `es/`.
- Nomi dei file identici nelle tre lingue (lo switcher di lingua `lang-switch.js` scambia solo il prefisso `/en/` o `/es/`).
- Uniche eccezioni: `brand.html` e le pagine interne, che esistono solo in italiano.

## Mappa del sito

```
index.html            home: mappa a nodi (Tenerife al centro) + ricerca
├─ eventi.html        categoria → schede in eventi/
├─ alloggio.html      categoria → schede in alloggio/   (ville, appartamenti, ostelli, coliving, surf house)
├─ escursioni.html    categoria → schede in escursioni/ (mare, terra, aria; es. balene.html, quad.html)
├─ surfing.html       categoria → schede in surfing/    (ika-ika.html, spots.html, ...)
└─ alessandro.html    chi siamo
```

Tre livelli: **home** (5 nodi principali) → **pagina di categoria** (sottocategorie, e sotto ognuna le schede) → **scheda** (una villa, un'escursione).

File condivisi:

| File | Cosa fa |
|---|---|
| `styles.css` + `script.js` | home e mappa a nodi |
| `pages.css` + `pages.js` | pagine di categoria (mini mappa, popup su mobile) |
| `alloggio/detail.css` | stile delle schede alloggio, escursioni ed eventi |
| `surfing/detail.css` | stile delle schede surf |
| `search.js` | indice della ricerca in home, una riga per servizio |
| `lang-switch.js`, `track.js`, `price-note.js` | lingua, conteggio clic WhatsApp, nota prezzi |
| `assets/` | logo, foto di Alessandro, avatar WhatsApp |
| `<sezione>/foto/<nome-scheda>/` | foto di ogni scheda (`01.jpg`, `02.jpg`, ...), condivise dalle tre lingue |

## Com'è fatta una scheda

Copia sempre una scheda esistente della stessa sezione. Dall'alto in basso:

1. `<head>`: titolo, description, canonical + 4 hreflang, Google Analytics, CSS, i tre script comuni.
2. `.detail-hero`: foto grande con nome e località.
3. `.quick-info`: 3-4 dati rapidi (durata, persone, zona...).
4. `.price-block`: prezzo (`.price-amount`) con asterisco, disponibilità, e sotto `<p class="price-note" data-price-note></p>`.
5. `.detail-section` / `.features-grid`: descrizione e cosa è incluso.
6. `.gallery-section`: galleria (`.gallery-item`).
7. `.cta-section`: bottone WhatsApp (`.cta-button`) con messaggio precompilato.
8. `.detail-footer` e `.back-link`: ritorno alla categoria.

Percorsi: nelle pagine italiane i link sono relativi (`../styles.css`, `foto/balene/01.jpg`); nelle pagine `en/` ed `es/` sono assoluti dalla radice (`/styles.css`, `/escursioni/foto/balene/01.jpg`). Le foto non si duplicano per lingua.

Per una voce del menu senza pagina il collegamento è `href="#"`: diventa una scheda vera solo quando esistono i tre file.

## Quando aggiungi o togli una pagina

Una pagina nuova (per esempio `escursioni/nuova.html`) richiede tutti questi passi:

1. I tre file: `escursioni/nuova.html`, `en/escursioni/nuova.html`, `es/escursioni/nuova.html`. Parti da una pagina esistente dello stesso tipo e copiane la struttura.
2. Nel `<head>` di ciascuno: `<link rel="canonical">` verso la propria URL e i quattro `hreflang` (it, en, es, x-default), con URL assolute `https://losqualotenerife.com/...`.
3. `sitemap.xml`: un blocco `<url>` con le stesse quattro `hreflang`.
4. La mappa a nodi: il collegamento nella pagina di categoria (`eventi.html`, `alloggio.html`, `escursioni.html`, `surfing.html`), dentro il gruppo `<div class="sub-nodes" data-parent="...">`, nelle tre lingue.
5. La ricerca della home: una voce in `search.js` (nome, categoria, parole chiave in IT+EN+ES).

Per **togliere** una pagina: cancella i tre file, toglila da `sitemap.xml`, dalla mappa e da `search.js`, e aggiungi in `_redirects` un reindirizzamento 301 verso la pagina più vicina (nelle tre lingue), così chi arriva da Google o da un vecchio link non trova un errore.

## Cose da non rompere

- **Script comuni**: ogni pagina pubblica include `lang-switch.js`, `track.js` (conta i clic su WhatsApp in Google Analytics) e, dove ci sono prezzi, `price-note.js`. Non toglierli.
- **Google Analytics**: il codice `G-BBHX7ZZLEH` nel `<head>` di ogni pagina. Una pagina nuova deve averlo.
- **WhatsApp**: i bottoni usano `https://wa.me/34616794190?text=...` con un messaggio precompilato che dice da quale pagina arriva la richiesta. Se cambi numero, cambialo su tutto il sito in una volta.
- **Prezzi**: ogni importo pubblicato (prezzo, deposito, supplemento) va con l'asterisco e, sotto il blocco prezzi, `<p class="price-note" data-price-note></p>`: il testo della nota lo inserisce `price-note.js` nella lingua giusta. Per cambiare la nota si modifica solo `price-note.js`.
- **Font**: sono serviti dal sito stesso (`/fonts/`), non da Google Fonts, per il GDPR. Non aggiungere link a `fonts.googleapis.com`.
- **`_redirects`**: contiene i reindirizzamenti di Netlify. Non cancellare quelli esistenti: servono a non perdere le visite dai vecchi link.
- **Mappa a nodi** (home e pagine di categoria): le linee e le posizioni sono calcolate da `script.js` e `pages.js`. Per aggiungere un nodo copia un nodo esistente dello stesso livello; non cambiare le classi.

## Contenuti

- Foto a 1024×576, ritaglio centrato, in formato `.webp` o `.jpg` leggero.
- Mai foto prese da Booking.
- Mai nomi, telefoni, email o siti dei fornitori: il contatto è sempre e solo Lo Squalo.

## Prima di pubblicare, controlla

- La pagina modificata si apre nelle tre lingue e il cambio lingua porta alla stessa pagina.
- Il bottone WhatsApp apre la chat col messaggio giusto.
- Nessun link interno porta a una pagina che non esiste.
