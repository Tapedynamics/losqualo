// Lo Squalo — Ricerca servizi in home
// Indice statico dei servizi con pagina reale (i placeholder "#…" sono esclusi
// finche' non hanno una pagina). Autocomplete accent-insensitive + tastiera.
(function () {
    const SERVICES = [
        // Categorie principali
        { name: 'Alloggio', cat: 'Categoria', href: 'alloggio.html', kw: 'casa villa appartamento ostello coliving stanza dormire soggiorno' },
        { name: 'Escursioni & Attività', cat: 'Categoria', href: 'escursioni.html', kw: 'tour attivita avventura terra aria acqua' },
        { name: 'Eventi', cat: 'Categoria', href: 'eventi.html', kw: 'feste party food drink servizi privati' },
        { name: 'Surfing Tenerife', cat: 'Categoria', href: 'surfing.html', kw: 'surf onde scuola spot' },
        { name: 'Agency', cat: 'Categoria', href: 'agency/oferta.html', kw: 'b2b marketing grafica artisti business' },
        { name: 'Alessandro', cat: 'Info', href: 'alessandro.html', kw: 'fondatore chi siamo about' },
        { name: 'Brand / Reti Sociali', cat: 'Brand', href: 'brand.html', kw: 'social instagram facebook tiktok youtube whatsapp link' },

        // Alloggio — Villa
        { name: 'La Fortaleza', cat: 'Alloggio', href: 'alloggio/finca-la-fortaleza.html', kw: 'villa finca lusso' },
        { name: 'Villa Paraiso', cat: 'Alloggio', href: 'alloggio/villa-paraiso.html', kw: 'villa piscina playa paraiso' },
        { name: 'Villa Duque', cat: 'Alloggio', href: 'alloggio/villa-duque.html', kw: 'villa palestra' },
        { name: 'Beach House', cat: 'Alloggio', href: 'alloggio/beach-house.html', kw: 'villa mare spiaggia' },
        // Alloggio — Rurale
        { name: 'Finca Ciguaña', cat: 'Alloggio', href: 'alloggio/finca-ciguaña.html', kw: 'rurale finca campagna' },
        { name: 'Finca Paraiso', cat: 'Alloggio', href: 'alloggio/finca-paraiso.html', kw: 'rurale finca' },
        { name: 'Casa Atogo', cat: 'Alloggio', href: 'alloggio/casa-atogo.html', kw: 'rurale ritiri surf camp' },
        { name: 'Casa Taucho', cat: 'Alloggio', href: 'alloggio/casa-taucho.html', kw: 'rurale casa' },
        { name: 'Cueva San Miguel', cat: 'Alloggio', href: 'alloggio/cueva-san-miguel.html', kw: 'rurale grotta glamping' },
        { name: 'Dome Experience', cat: 'Alloggio', href: 'alloggio/dome-ifonche.html', kw: 'glamping dome ifonche cupola' },
        { name: 'Hotel Rural', cat: 'Alloggio', href: 'alloggio/hotel-rural-arona.html', kw: 'rurale hotel arona' },
        { name: 'Finca Chimiche', cat: 'Alloggio', href: 'alloggio/finca-chimiche.html', kw: 'rurale finca' },
        // Alloggio — Appartamento
        { name: 'Costa Adeje', cat: 'Alloggio', href: 'alloggio/costa-adeje.html', kw: 'appartamento piscina adeje' },
        { name: 'Alcalá', cat: 'Alloggio', href: 'alloggio/alcala.html', kw: 'appartamento alcala' },
        { name: 'Studio Las Américas', cat: 'Alloggio', href: 'alloggio/studio-las-americas.html', kw: 'appartamento studio playa las americas' },
        { name: 'Studio Los Cristianos', cat: 'Alloggio', href: 'alloggio/studio-los-cristianos.html', kw: 'appartamento studio los cristianos' },
        { name: 'Penthouse', cat: 'Alloggio', href: 'alloggio/penthouse.html', kw: 'appartamento attico los cristianos' },
        // Alloggio — Surf House
        { name: 'Surf House Luxury', cat: 'Alloggio', href: 'alloggio/surf-house-luxury.html', kw: 'surf house lusso' },
        { name: 'Surf House Rurale', cat: 'Alloggio', href: 'alloggio/surf-house-rurale.html', kw: 'surf house rurale' },
        // Alloggio — Ostello
        { name: 'Banana Surf Hostel', cat: 'Alloggio', href: 'alloggio/banana-surf-hostel.html', kw: 'ostello hostel surf los cristianos letti castello' },
        // Alloggio — Coliving
        { name: 'Blue Paradise', cat: 'Alloggio', href: 'alloggio/coliving-coworking.html', kw: 'coliving coworking nomadi digitali santa cruz' },
        { name: 'Cactus Coliving', cat: 'Alloggio', href: 'alloggio/cactus-coliving.html', kw: 'coliving coworking nomadi digitali gomera' },

        // Escursioni
        { name: 'Jeep Experience', cat: 'Escursioni', href: 'escursioni/jeep-experience.html', kw: 'terra teide jeep tour 4x4' },
        { name: 'Quad', cat: 'Escursioni', href: 'escursioni/quad.html', kw: 'terra quad off road' },
        { name: 'Buggy', cat: 'Escursioni', href: 'escursioni/buggy.html', kw: 'terra buggy off road' },
        { name: 'Yacht Privato', cat: 'Escursioni', href: 'escursioni/yacht.html', kw: 'acqua mare barca yacht' },
        { name: 'Barco sin Pilota', cat: 'Escursioni', href: 'escursioni/barco-sin-pilota.html', kw: 'acqua mare barca senza licenza' },
        { name: 'Catamarano', cat: 'Escursioni', href: 'escursioni/catamarano.html', kw: 'acqua mare catamarano' },
        { name: 'Parapendio', cat: 'Escursioni', href: 'escursioni/parapendio.html', kw: 'aria volo parapendio paragliding' },
        { name: 'Paratrike', cat: 'Escursioni', href: 'escursioni/paratrike.html', kw: 'aria volo paratrike' },
        { name: 'Stargazing', cat: 'Escursioni', href: 'escursioni/tenerife-stars.html', kw: 'aria stelle stargazing tenerife stars teide notte astronomia' },

        // Surfing
        { name: 'Surf Bar Franchise', cat: 'Surfing', href: 'surfing/surf-bar-franchise.html', kw: 'surf bar franchise' },
        { name: 'Surf Spots', cat: 'Surfing', href: 'surfing/spots.html', kw: 'surf spot onde' },
        { name: 'Surf School', cat: 'Surfing', href: 'surfing/ika-ika.html', kw: 'surf scuola lezioni ika ika' },
        { name: 'Surf House B2B', cat: 'Surfing', href: 'surfing/surf-house-b2b.html', kw: 'surf house b2b' },
        { name: 'Full Experience', cat: 'Surfing', href: 'surfing/full-experience.html', kw: 'surf camp full experience' },

        // Eventi
        { name: 'Servizi Privati', cat: 'Eventi', href: 'https://wa.me/34616794190?text=Ciao%2C%20vorrei%20info%20sui%20servizi%20privati%20per%20il%20mio%20evento', kw: 'eventi feste compleanno catering party privati', ext: true }
    ];

    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const input = document.getElementById('service-search');
    const list = document.getElementById('search-results');
    if (!input || !list) return;

    // pre-normalizza per la ricerca
    SERVICES.forEach(s => { s._hay = norm(s.name + ' ' + (s.kw || '') + ' ' + s.cat); });

    let matches = [];
    let active = -1;

    function go(svc) {
        if (!svc) return;
        if (svc.ext) { window.open(svc.href, '_blank', 'noopener'); }
        else { window.location.href = svc.href; }
    }

    function render() {
        if (!matches.length) {
            list.innerHTML = input.value.trim()
                ? '<li class="home-search-empty">Nessun servizio trovato</li>'
                : '';
            list.classList.toggle('visible', !!input.value.trim());
            return;
        }
        list.innerHTML = matches.map((s, i) =>
            `<li class="home-search-result${i === active ? ' active' : ''}" role="option" data-i="${i}">
                <span class="hs-name">${s.name}</span><span class="hs-cat">${s.cat}</span>
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
