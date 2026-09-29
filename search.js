// Lo Squalo — Ricerca servizi in home
// Indice statico dei servizi con pagina reale (i placeholder "#…" sono esclusi
// finche' non hanno una pagina). Autocomplete accent-insensitive + tastiera.
//
// Multilingua: questo file e' condiviso dalle 3 home (/, /en/, /es/).
//  - `name`/`cat` mostrati all'utente vengono tradotti (campo `i18n` dove il nome
//    cambia; i nomi propri — "Villa Paraiso", "Ika Ika" — restano invariati).
//  - `kw` e' un unico campo multilingua: contiene i termini IT+EN+ES insieme.
//    Non e' mai mostrato, serve solo al match, quindi un campo solo basta per tutte.
//  - gli href sono relativi: dentro /en/ e /es/ risolvono nella stessa lingua.
//    Unica eccezione `/brand.html`, che esiste solo in italiano.
(function () {
    const LANG = (document.documentElement.lang || 'it').slice(0, 2).toLowerCase();

    const CAT = {
        Categoria: { en: 'Category', es: 'Categoría' },
        Alloggio: { en: 'Accommodation', es: 'Alojamiento' },
        Escursioni: { en: 'Excursions', es: 'Excursiones' },
        Surfing: { en: 'Surfing', es: 'Surfing' },
        Eventi: { en: 'Events', es: 'Eventos' },
        Info: { en: 'Info', es: 'Info' },
        Brand: { en: 'Brand', es: 'Brand' }
    };

    const EMPTY = {
        it: 'Nessun servizio trovato',
        en: 'No service found',
        es: 'Ningún servicio encontrado'
    };

    // Link WhatsApp "servizi privati": testo precompilato per lingua
    const WA_EVENTI = {
        it: 'https://wa.me/34613594910?text=Ciao%2C%20vorrei%20info%20sui%20servizi%20privati%20per%20il%20mio%20evento',
        en: 'https://wa.me/34613594910?text=Hello!%20I%27d%20like%20info%20about%20private%20services%20for%20my%20event',
        es: 'https://wa.me/34613594910?text=%C2%A1Hola!%20Quisiera%20info%20sobre%20los%20servicios%20privados%20para%20mi%20evento'
    };

    const SERVICES = [
        // Categorie principali
        { name: 'Alloggio', i18n: { en: 'Accommodation', es: 'Alojamiento' }, cat: 'Categoria', href: 'alloggio.html', kw: 'casa villa appartamento ostello coliving stanza dormire soggiorno accommodation apartment hostel room stay alojamiento apartamento habitacion dormir estancia' },
        { name: 'Escursioni & Attività', i18n: { en: 'Excursions & Activities', es: 'Excursiones y Actividades' }, cat: 'Categoria', href: 'escursioni.html', kw: 'tour attivita avventura terra aria acqua excursions activities adventure land air water excursiones actividades aventura tierra aire agua' },
        { name: 'Eventi', i18n: { en: 'Events', es: 'Eventos' }, cat: 'Categoria', href: 'eventi.html', kw: 'feste party food drink servizi privati events private services parties eventos fiestas servicios privados' },
        { name: 'Surfing Tenerife', cat: 'Categoria', href: 'surfing.html', kw: 'surf onde scuola spot waves school olas escuela' },
        { name: 'Agency', cat: 'Categoria', href: 'agency/oferta.html', kw: 'b2b marketing grafica artisti business graphics artists artistas' },
        { name: 'Alessandro', cat: 'Info', href: 'alessandro.html', kw: 'fondatore chi siamo about founder who we are fundador quienes somos' },
        { name: 'Brand / Reti Sociali', i18n: { en: 'Brand / Social Networks', es: 'Brand / Redes Sociales' }, cat: 'Brand', href: '/brand.html', kw: 'social instagram facebook tiktok youtube whatsapp link reti sociali social networks redes sociales' },

        // Alloggio — Villa
        { name: 'La Fortaleza', cat: 'Alloggio', href: 'alloggio/finca-la-fortaleza.html', kw: 'villa finca lusso luxury lujo' },
        { name: 'Beach House', cat: 'Alloggio', href: 'alloggio/beach-house.html', kw: 'villa mare spiaggia sea beach mar playa' },
        { name: 'Villa Costa Adeje', cat: 'Alloggio', href: 'alloggio/villa-costa-adeje.html', kw: 'villa lusso costa adeje luxury lujo' },
        { name: 'Villa Lady Luxury', cat: 'Alloggio', href: 'alloggio/villa-lady-luxury.html', kw: 'villa lusso costa adeje luxury lujo piscina pool 6 persone' },
        { name: 'Villa Torviscas', cat: 'Alloggio', href: 'alloggio/villa-torviscas.html', kw: 'villa torviscas alto residenziale residential residencial' },
        // Alloggio — Rurale
        { name: 'Finca Ciguaña', cat: 'Alloggio', href: 'alloggio/finca-ciguaña.html', kw: 'rurale finca campagna rural countryside campo' },
        { name: 'Finca Paraiso', cat: 'Alloggio', href: 'alloggio/finca-paraiso.html', kw: 'rurale finca rural' },
        { name: 'Casa Atogo', cat: 'Alloggio', href: 'alloggio/casa-atogo.html', kw: 'rurale ritiri surf camp rural retreats retiros' },
        { name: 'Casa Taucho', cat: 'Alloggio', href: 'alloggio/casa-taucho.html', kw: 'rurale casa rural house' },
        { name: 'Cueva San Miguel', cat: 'Alloggio', href: 'alloggio/cueva-san-miguel.html', kw: 'rurale grotta glamping rural cave cueva' },
        { name: 'Dome Experience', cat: 'Alloggio', href: 'alloggio/dome-ifonche.html', kw: 'glamping dome ifonche cupola domo' },
        { name: 'Hotel Rural', cat: 'Alloggio', href: 'alloggio/hotel-rural-arona.html', kw: 'rurale hotel arona rural' },
        // Alloggio — Appartamento
        { name: 'Costa Adeje', cat: 'Alloggio', href: 'alloggio/costa-adeje.html', kw: 'appartamento piscina adeje apartment pool apartamento' },
        { name: 'Alcalá', cat: 'Alloggio', href: 'alloggio/alcala.html', kw: 'appartamento alcala apartment apartamento' },
        { name: 'Studio Las Américas', cat: 'Alloggio', href: 'alloggio/studio-las-americas.html', kw: 'appartamento studio playa las americas apartment apartamento' },
        { name: 'Studio Los Cristianos', cat: 'Alloggio', href: 'alloggio/studio-los-cristianos.html', kw: 'appartamento studio los cristianos apartment apartamento' },
        { name: 'Penthouse', cat: 'Alloggio', href: 'alloggio/penthouse.html', kw: 'appartamento attico los cristianos apartment atico apartamento' },
        // Alloggio — Surf House
        { name: 'Surf House Luxury', cat: 'Alloggio', href: 'alloggio/surf-house-luxury.html', kw: 'surf house lusso luxury lujo' },
        { name: 'Surf House Rurale', i18n: { en: 'Surf House Rural', es: 'Surf House Rural' }, cat: 'Alloggio', href: 'alloggio/surf-house-rurale.html', kw: 'surf house rurale rural' },
        { name: 'Surf House', cat: 'Alloggio', href: 'alloggio/surf-house.html', kw: 'surf house kite wind camp el medano piscina pool gruppi grupos' },
        // Alloggio — Ostello
        { name: 'Banana Surf Hostel', cat: 'Alloggio', href: 'alloggio/banana-surf-hostel.html', kw: 'ostello hostel surf los cristianos letti castello bunk beds literas albergue' },
        { name: 'Sisters Hostel', cat: 'Alloggio', href: 'alloggio/sisters-hostel.html', kw: 'ostello hostel women only donne adeje aqualand siam park giardino garden jardin mujeres albergue' },
        // Alloggio — Coliving
        { name: 'Blue Paradise', cat: 'Alloggio', href: 'alloggio/coliving-coworking.html', kw: 'coliving coworking nomadi digitali santa cruz digital nomads nomadas digitales' },
        { name: 'Cactus Coliving', cat: 'Alloggio', href: 'alloggio/cactus-coliving.html', kw: 'coliving coworking nomadi digitali gomera digital nomads nomadas digitales' },

        // Escursioni
        { name: 'Jeep Experience', cat: 'Escursioni', href: 'escursioni/jeep-experience.html', kw: 'terra teide jeep tour 4x4 land tierra' },
        { name: 'Quad', cat: 'Escursioni', href: 'escursioni/quad.html', kw: 'terra quad off road land tierra' },
        { name: 'Momentos Sal Negra', cat: 'Escursioni', href: 'escursioni/momentos-sal-negra.html', kw: 'cena romantica coppia vintage sal negra dinner romantic cena romantica pareja paella' },
        { name: 'Buggy', cat: 'Escursioni', href: 'escursioni/buggy.html', kw: 'terra buggy off road land tierra' },
        { name: 'Yacht Privato', i18n: { en: 'Private Yacht', es: 'Yate Privado' }, cat: 'Escursioni', href: 'escursioni/yacht.html', kw: 'acqua mare barca yacht water sea boat agua mar barco yate' },
        { name: 'Barco sin Pilota', i18n: { en: 'Boat without Skipper', es: 'Barco sin Piloto' }, cat: 'Escursioni', href: 'escursioni/barco-sin-pilota.html', kw: 'acqua mare barca senza licenza patron water sea boat no licence agua mar barco sin licencia' },
        { name: 'Catamarano', i18n: { en: 'Catamaran', es: 'Catamarán' }, cat: 'Escursioni', href: 'escursioni/catamarano.html', kw: 'acqua mare catamarano water sea catamaran agua mar catamaran' },
        { name: 'Balene e Delfini', i18n: { en: 'Whales & Dolphins', es: 'Ballenas y Delfines' }, cat: 'Escursioni', href: 'escursioni/balene.html', kw: 'acqua mare whale watching balene delfini cetacei avvistamento whales dolphins ballenas delfines avistamiento' },
        { name: 'Parapendio', i18n: { en: 'Paragliding', es: 'Parapente' }, cat: 'Escursioni', href: 'escursioni/parapendio.html', kw: 'aria volo parapendio paragliding air flight aire vuelo parapente' },
        { name: 'Paratrike', cat: 'Escursioni', href: 'escursioni/paratrike.html', kw: 'aria volo paratrike air flight aire vuelo' },
        { name: 'Stargazing', cat: 'Escursioni', href: 'escursioni/tenerife-stars.html', kw: 'aria stelle stargazing tenerife stars teide notte astronomia night astronomy estrellas noche astronomia' },

        // Surfing
        { name: 'Surf Bar Franchise', cat: 'Surfing', href: 'surfing/surf-bar-franchise.html', kw: 'surf bar franchise franquicia' },
        { name: 'Surf Spots', cat: 'Surfing', href: 'surfing/spots.html', kw: 'surf spot onde waves olas' },
        { name: 'Surf School', cat: 'Surfing', href: 'surfing/ika-ika.html', kw: 'surf scuola lezioni ika ika school lessons escuela clases' },
        { name: 'Surf House B2B', cat: 'Surfing', href: 'surfing/surf-house-b2b.html', kw: 'surf house b2b' },
        { name: 'Full Experience', cat: 'Surfing', href: 'surfing/full-experience.html', kw: 'surf camp full experience' },

        // Eventi
        { name: 'Servizi Privati', i18n: { en: 'Private Services', es: 'Servicios Privados' }, cat: 'Eventi', href: WA_EVENTI[LANG] || WA_EVENTI.it, kw: 'eventi feste compleanno catering party privati events birthday private eventos fiestas cumpleanos privados', ext: true }
    ];

    const label = (s) => (LANG !== 'it' && s.i18n && s.i18n[LANG]) ? s.i18n[LANG] : s.name;
    const catLabel = (s) => (LANG !== 'it' && CAT[s.cat] && CAT[s.cat][LANG]) ? CAT[s.cat][LANG] : s.cat;

    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const input = document.getElementById('service-search');
    const list = document.getElementById('search-results');
    if (!input || !list) return;

    // pre-normalizza per la ricerca: nome nella lingua corrente + nome originale + kw multilingua
    SERVICES.forEach(s => {
        s._name = label(s);
        s._cat = catLabel(s);
        s._hay = norm([s._name, s.name, s.kw || '', s._cat, s.cat].join(' '));
    });

    let matches = [];
    let active = -1;

    function go(svc) {
        if (!svc) return;
        if (svc.ext) {
            if (window.lsqTrackWa && /wa\.me/.test(svc.href)) window.lsqTrackWa(svc.href, 'home_search');
            window.open(svc.href, '_blank', 'noopener');
        }
        else { window.location.href = svc.href; }
    }

    function render() {
        if (!matches.length) {
            list.innerHTML = input.value.trim()
                ? `<li class="home-search-empty">${EMPTY[LANG] || EMPTY.it}</li>`
                : '';
            list.classList.toggle('visible', !!input.value.trim());
            return;
        }
        list.innerHTML = matches.map((s, i) =>
            `<li class="home-search-result${i === active ? ' active' : ''}" role="option" data-i="${i}">
                <span class="hs-name">${s._name}</span><span class="hs-cat">${s._cat}</span>
            </li>`
        ).join('');
        list.classList.add('visible');
    }

    function search(q) {
        const nq = norm(q.trim());
        if (!nq) { matches = []; active = -1; render(); return; }
        matches = SERVICES.filter(s => s._hay.includes(nq)).slice(0, 8);
        active = matches.length ? 0 : -1;
        render();
    }

    input.addEventListener('input', () => search(input.value));

    input.addEventListener('keydown', (e) => {
        if (!matches.length) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % matches.length; render(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + matches.length) % matches.length; render(); }
        else if (e.key === 'Enter') { e.preventDefault(); go(matches[active] || matches[0]); }
        else if (e.key === 'Escape') { input.value = ''; matches = []; render(); input.blur(); }
    });

    list.addEventListener('click', (e) => {
        const li = e.target.closest('.home-search-result');
        if (li) go(matches[parseInt(li.dataset.i, 10)]);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.home-search')) { list.classList.remove('visible'); }
    });
})();
