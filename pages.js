// Lo Squalo - Pagine Categoria (Livello 2)
// Mini Mind Map per ogni categoria

document.addEventListener('DOMContentLoaded', function() {
    initPageMap();
    initPageLines();
    initMobilePageMenu();

    // Mostra linee principali all'avvio (pagine partono con categories)
    document.querySelectorAll('.main-line').forEach(line => {
        line.classList.add('visible');
    });
});

// Stato corrente
let pageState = 'categories';  // Pagine partono con categorie visibili
let expandedSubcategory = null;

// ===== CONFIGURAZIONE LINEE PER PAGINA =====
const pageLineConfig = {
    eventi: {
        main: [
            { line: 'line-center-showcases', from: 'category-trigger', to: 'node-showcases' },
            { line: 'line-center-consigliati', from: 'category-trigger', to: 'node-consigliati' },
            { line: 'line-center-movida', from: 'category-trigger', to: 'node-movida' },
            { line: 'line-center-servizi', from: 'category-trigger', to: 'node-servizi' }
        ],
        showcases: [
            { line: 'line-showcases-boatparty', from: 'node-showcases', to: 'node-boatparty' },
            { line: 'line-showcases-terraceo', from: 'node-showcases', to: 'node-terraceo' },
            { line: 'line-showcases-hmc', from: 'node-showcases', to: 'node-hmc' },
            { line: 'line-showcases-exotica', from: 'node-showcases', to: 'node-exotica' },
            { line: 'line-showcases-brunch', from: 'node-showcases', to: 'node-brunch' }
        ],
        consigliati: [
            { line: 'line-consigliati-festival', from: 'node-consigliati', to: 'node-festival' },
            { line: 'line-consigliati-folklore', from: 'node-consigliati', to: 'node-folklore' }
        ],
        movida: [
            { line: 'line-movida-club', from: 'node-movida', to: 'node-club' },
            { line: 'line-movida-poolparty', from: 'node-movida', to: 'node-poolparty' },
            { line: 'line-movida-beachclub', from: 'node-movida', to: 'node-beachclub' },
            { line: 'line-movida-rooftop', from: 'node-movida', to: 'node-rooftop' },
            { line: 'line-movida-vip', from: 'node-movida', to: 'node-vip' }
        ],
        servizi: [
            { line: 'line-servizi-graphic', from: 'node-servizi', to: 'node-graphic' },
            { line: 'line-servizi-photo', from: 'node-servizi', to: 'node-photo' },
            { line: 'line-servizi-venue', from: 'node-servizi', to: 'node-venue' },
            { line: 'line-servizi-decoration', from: 'node-servizi', to: 'node-decoration' },
            { line: 'line-servizi-shows', from: 'node-servizi', to: 'node-shows' },
            { line: 'line-servizi-sound', from: 'node-servizi', to: 'node-sound' },
            { line: 'line-servizi-catering', from: 'node-servizi', to: 'node-catering' }
        ]
    },
    alloggio: {
        main: [
            { line: 'line-center-appartamento', from: 'category-trigger', to: 'node-appartamento' },
            { line: 'line-center-ostello', from: 'category-trigger', to: 'node-ostello' },
            { line: 'line-center-rurale', from: 'category-trigger', to: 'node-rurale' },
            { line: 'line-center-surfhouse', from: 'category-trigger', to: 'node-surfhouse' },
            { line: 'line-center-villa', from: 'category-trigger', to: 'node-villa' }
        ],
        appartamento: [
            { line: 'line-appartamento-alcala', from: 'node-appartamento', to: 'node-alcala' },
            { line: 'line-appartamento-lasamericas', from: 'node-appartamento', to: 'node-lasamericas' },
            { line: 'line-appartamento-loscristianos', from: 'node-appartamento', to: 'node-loscristianos' }
        ],
        ostello: [
            { line: 'line-ostello-gotademar', from: 'node-ostello', to: 'node-gotademar' }
        ],
        rurale: [
            { line: 'line-rurale-cueva', from: 'node-rurale', to: 'node-cueva' },
            { line: 'line-rurale-dome', from: 'node-rurale', to: 'node-dome' },
            { line: 'line-rurale-hotelrural', from: 'node-rurale', to: 'node-hotelrural' }
        ],
        surfhouse: [
            { line: 'line-surfhouse-main', from: 'node-surfhouse', to: 'node-surfhouse-main' }
        ],
        villa: [
            { line: 'line-villa-beachhouse', from: 'node-villa', to: 'node-beachhouse' },
            { line: 'line-villa-atogo', from: 'node-villa', to: 'node-atogo' },
            { line: 'line-villa-taucho', from: 'node-villa', to: 'node-taucho' },
            { line: 'line-villa-fortaleza', from: 'node-villa', to: 'node-fortaleza' },
            { line: 'line-villa-playaparaiso', from: 'node-villa', to: 'node-playaparaiso' }
        ]
    },
    escursioni: {
        main: [
            { line: 'line-center-teide', from: 'category-trigger', to: 'node-teide' },
            { line: 'line-center-oceano', from: 'category-trigger', to: 'node-oceano' },
            { line: 'line-center-sky', from: 'category-trigger', to: 'node-sky' },
            { line: 'line-center-sport', from: 'category-trigger', to: 'node-sport' },
            { line: 'line-center-private', from: 'category-trigger', to: 'node-private' },
            { line: 'line-center-fooddrink', from: 'category-trigger', to: 'node-fooddrink' }
        ],
        teide: [
            { line: 'line-teide-jeep', from: 'node-teide', to: 'node-jeep' },
            { line: 'line-teide-stargazing', from: 'node-teide', to: 'node-stargazing' },
            { line: 'line-teide-quad', from: 'node-teide', to: 'node-quad' },
            { line: 'line-teide-bike', from: 'node-teide', to: 'node-bike' },
            { line: 'line-teide-buggy', from: 'node-teide', to: 'node-buggy' }
        ],
        oceano: [
            { line: 'line-oceano-jetcar', from: 'node-oceano', to: 'node-jetcar' },
            { line: 'line-oceano-jetsky', from: 'node-oceano', to: 'node-jetsky' },
            { line: 'line-oceano-cetacei', from: 'node-oceano', to: 'node-cetacei' }
        ],
        sky: [
            { line: 'line-sky-parapente', from: 'node-sky', to: 'node-parapente' },
            { line: 'line-sky-paratrike', from: 'node-sky', to: 'node-paratrike' }
        ],
        sport: [
            { line: 'line-sport-kite', from: 'node-sport', to: 'node-kite' },
            { line: 'line-sport-wind', from: 'node-sport', to: 'node-wind' },
            { line: 'line-sport-surf', from: 'node-sport', to: 'node-surf' },
            { line: 'line-sport-fishing', from: 'node-sport', to: 'node-fishing' },
            { line: 'line-sport-diving', from: 'node-sport', to: 'node-diving' }
        ],
        private: [
            { line: 'line-private-catamarano', from: 'node-private', to: 'node-catamarano' },
            { line: 'line-private-barco', from: 'node-private', to: 'node-barco' },
            { line: 'line-private-yacht', from: 'node-private', to: 'node-yacht' }
        ],
        fooddrink: [
            { line: 'line-fooddrink-bodegas', from: 'node-fooddrink', to: 'node-bodegas' },
            { line: 'line-fooddrink-guacinches', from: 'node-fooddrink', to: 'node-guacinches' }
        ]
    },
    surfing: {
        main: [
            { line: 'line-center-surfbar', from: 'category-trigger', to: 'node-surfbar' },
            { line: 'line-center-surfhouse', from: 'category-trigger', to: 'node-surfhouse' },
            { line: 'line-center-elmedano', from: 'category-trigger', to: 'node-elmedano' },
            { line: 'line-center-spots', from: 'category-trigger', to: 'node-spots' },
            { line: 'line-center-callemexico', from: 'category-trigger', to: 'node-callemexico' },
            { line: 'line-center-school', from: 'category-trigger', to: 'node-school' }
        ],
        surfhouse: [
            { line: 'line-surfhouse-b2b', from: 'node-surfhouse', to: 'node-b2b' },
            { line: 'line-surfhouse-surfcamp', from: 'node-surfhouse', to: 'node-surfcamp' },
            { line: 'line-surfhouse-reservacama', from: 'node-surfhouse', to: 'node-reservacama' },
            { line: 'line-surfhouse-reservahab', from: 'node-surfhouse', to: 'node-reservahab' },
            { line: 'line-surfhouse-gallery', from: 'node-surfhouse', to: 'node-gallery' }
        ],
        elmedano: [
            { line: 'line-elmedano-rentshop', from: 'node-elmedano', to: 'node-elmedano-rentshop' },
            { line: 'line-elmedano-school', from: 'node-elmedano', to: 'node-elmedano-school' },
            { line: 'line-elmedano-fooddrink', from: 'node-elmedano', to: 'node-elmedano-fooddrink' }
        ],
        callemexico: [
            { line: 'line-callemexico-rentshop', from: 'node-callemexico', to: 'node-callemexico-rentshop' },
            { line: 'line-callemexico-fooddrink', from: 'node-callemexico', to: 'node-callemexico-fooddrink' },
            { line: 'line-callemexico-artevents', from: 'node-callemexico', to: 'node-callemexico-artevents' }
        ],
        school: [
            { line: 'line-school-kontraola', from: 'node-school', to: 'node-kontraola' },
            { line: 'line-school-k16', from: 'node-school', to: 'node-k16' },
            { line: 'line-school-ikaika', from: 'node-school', to: 'node-ikaika' },
            { line: 'line-school-franz', from: 'node-school', to: 'node-franz' },
            { line: 'line-school-vils', from: 'node-school', to: 'node-vils' }
        ]
    },
    agency: {
        main: [
            { line: 'line-center-smm', from: 'category-trigger', to: 'node-smm' },
            { line: 'line-center-grafic', from: 'category-trigger', to: 'node-grafic' },
            { line: 'line-center-artists', from: 'category-trigger', to: 'node-artists' },
            { line: 'line-center-start', from: 'category-trigger', to: 'node-start' }
        ],
        smm: [
            { line: 'line-smm-marketing', from: 'node-smm', to: 'node-marketing' },
            { line: 'line-smm-consulenza', from: 'node-smm', to: 'node-smm-consulenza' },
            { line: 'line-smm-gestione', from: 'node-smm', to: 'node-gestione' },
            { line: 'line-smm-ads', from: 'node-smm', to: 'node-ads' },
            { line: 'line-smm-web', from: 'node-smm', to: 'node-web' }
        ],
        grafic: [
            { line: 'line-grafic-flyer', from: 'node-grafic', to: 'node-flyer' },
            { line: 'line-grafic-fotovideo', from: 'node-grafic', to: 'node-fotovideo' },
            { line: 'line-grafic-logo', from: 'node-grafic', to: 'node-logo' },
            { line: 'line-grafic-kitmarca', from: 'node-grafic', to: 'node-kitmarca' }
        ],
        artists: [
            { line: 'line-artists-livemusic', from: 'node-artists', to: 'node-livemusic' },
            { line: 'line-artists-djs', from: 'node-artists', to: 'node-djs' },
            { line: 'line-artists-shows', from: 'node-artists', to: 'node-agency-shows' },
            { line: 'line-artists-setrecording', from: 'node-artists', to: 'node-setrecording' },
            { line: 'line-artists-djschool', from: 'node-artists', to: 'node-djschool' }
        ],
        start: [
            { line: 'line-start-consulenza', from: 'node-start', to: 'node-start-consulenza' },
            { line: 'line-start-affiancamento', from: 'node-start', to: 'node-affiancamento' },
            { line: 'line-start-modelli', from: 'node-start', to: 'node-modelli' },
            { line: 'line-start-tavolacalda', from: 'node-start', to: 'node-tavolacalda' }
        ]
    },
    alessandro: {
        main: [
            { line: 'line-center-chisono', from: 'category-trigger', to: 'node-chisono' },
            { line: 'line-center-perche', from: 'category-trigger', to: 'node-perche' },
            { line: 'line-center-esperienza', from: 'category-trigger', to: 'node-esperienza' },
            { line: 'line-center-ruolo', from: 'category-trigger', to: 'node-ruolo' },
            { line: 'line-center-highlights', from: 'category-trigger', to: 'node-highlights' }
        ]
    }
};

// Rileva la pagina corrente dal body class
function getCurrentPage() {
    const body = document.body;
    if (body.classList.contains('page-eventi')) return 'eventi';
    if (body.classList.contains('page-alloggio')) return 'alloggio';
    if (body.classList.contains('page-escursioni')) return 'escursioni';
    if (body.classList.contains('page-surfing')) return 'surfing';
    if (body.classList.contains('page-agency')) return 'agency';
    if (body.classList.contains('page-alessandro')) return 'alessandro';
    return null;
}

// ===== LINEE DINAMICHE =====
function initPageLines() {
    updatePageLines();
    window.addEventListener('resize', debounce(updatePageLines, 100));
    setInterval(updatePageLines, 50);
}

function getElementCenter(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const svg = document.getElementById('svg-connections');
    if (!svg) return null;
    const svgRect = svg.getBoundingClientRect();

    return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top
    };
}

function drawLine(lineId, fromId, toId) {
    const line = document.getElementById(lineId);
    if (!line) return;

    const from = getElementCenter(fromId);
    const to = getElementCenter(toId);

    if (from && to) {
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
    }
}

function updatePageLines() {
    const currentPage = getCurrentPage();
    if (!currentPage || !pageLineConfig[currentPage]) return;

    const config = pageLineConfig[currentPage];

    // Linee principali
    if (config.main) {
        config.main.forEach(conn => {
            drawLine(conn.line, conn.from, conn.to);
        });
    }

    // Linee sotto-categorie
    Object.keys(config).forEach(category => {
        if (category !== 'main') {
            config[category].forEach(conn => {
                drawLine(conn.line, conn.from, conn.to);
            });
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== NAVIGAZIONE PAGE MAP =====
function initPageMap() {
    const pageMap = document.querySelector('.page-map');
    if (!pageMap) return;

    const categoryTrigger = document.getElementById('category-trigger');
    const backBtn = document.getElementById('back-btn');
    const primaryNodes = document.querySelectorAll('.node-primary');

    // Click sul centro → mostra sotto-categorie
    categoryTrigger.addEventListener('click', function() {
        if (pageState === 'initial') {
            showPageCategories();
        }
    });

    // Click sulle sotto-categorie → mostra elementi livello 3
    primaryNodes.forEach(node => {
        node.addEventListener('click', function() {
            const category = this.dataset.category;

            if (pageState === 'categories') {
                showPageSubcategories(category);
                this.classList.add('expanded');
            } else if (pageState === 'subcategories') {
                if (expandedSubcategory !== category) {
                    hideCurrentPageSubcategories();
                    document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));

                    setTimeout(() => {
                        showPageSubcategories(category);
                        this.classList.add('expanded');
                    }, 250);
                }
            }
        });
    });

    // Pulsante indietro
    backBtn.addEventListener('click', function() {
        goPageBack();
    });

    // Tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goPageBack();
        }
    });
}

function showPageCategories() {
    const pageMap = document.querySelector('.page-map');
    pageMap.dataset.state = 'categories';
    pageState = 'categories';

    // Mostra le linee principali
    document.querySelectorAll('.main-line').forEach(line => {
        line.classList.add('visible');
    });
}

function showPageSubcategories(category) {
    const pageMap = document.querySelector('.page-map');
    pageMap.dataset.state = 'subcategories';
    pageState = 'subcategories';
    expandedSubcategory = category;

    const subNodes = document.querySelector(`.sub-nodes[data-parent="${category}"]`);
    if (subNodes) subNodes.classList.add('visible');

    // Mostra le linee della categoria
    document.querySelectorAll(`.sub-line[data-category="${category}"]`).forEach(line => {
        line.classList.add('visible');
    });
}

function hideCurrentPageSubcategories() {
    if (expandedSubcategory) {
        const subNodes = document.querySelector(`.sub-nodes[data-parent="${expandedSubcategory}"]`);
        if (subNodes) subNodes.classList.remove('visible');

        // Nascondi le linee della categoria
        document.querySelectorAll(`.sub-line[data-category="${expandedSubcategory}"]`).forEach(line => {
            line.classList.remove('visible');
        });
    }
}

function goPageBack() {
    const pageMap = document.querySelector('.page-map');

    if (pageState === 'subcategories') {
        hideCurrentPageSubcategories();
        document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));
        pageMap.dataset.state = 'categories';
        pageState = 'categories';
        expandedSubcategory = null;
    } else if (pageState === 'categories') {
        // Torna alla home
        window.location.href = 'index.html';
    }
}

// ===== MOBILE PAGE MENU =====
let mobilePageState = 'categories';  // Mobile parte con categorie visibili

// Dati per popup radiale mobile per pagina
const pageSubNodesData = {
    eventi: {
        showcases: {
            name: 'Showcases',
            class: 'radial-showcases',
            subs: [
                { id: 'boatparty', name: 'Boat Party', href: '#boatparty' },
                { id: 'terraceo', name: 'Terraceo', href: '#terraceo' },
                { id: 'hmc', name: 'H.M.C', href: '#hmc' },
                { id: 'exotica', name: 'Exotica', href: '#exotica' },
                { id: 'brunch', name: "Let's Brunch", href: '#brunch' }
            ]
        },
        consigliati: {
            name: 'Consigliati',
            class: 'radial-consigliati',
            subs: [
                { id: 'festival', name: 'Festival', href: '#festival' },
                { id: 'folklore', name: 'Folklore', href: '#folklore' }
            ]
        },
        movida: {
            name: 'Movida &<br>Nightlife',
            class: 'radial-movida',
            subs: [
                { id: 'club', name: 'Club', href: '#club' },
                { id: 'poolparty', name: 'Pool Party', href: '#poolparty' },
                { id: 'beachclub', name: 'Beach Club', href: '#beachclub' },
                { id: 'rooftop', name: 'Rooftop', href: '#rooftop' },
                { id: 'vip', name: 'VIP Service', href: '#vip' }
            ]
        },
        servizi: {
            name: 'Privati<br>Servizi',
            class: 'radial-servizi',
            subs: [
                { id: 'graphic', name: 'Graphic Design', href: '#graphic' },
                { id: 'photo', name: 'Photo Video', href: '#photo' },
                { id: 'venue', name: 'Venue', href: '#venue' },
                { id: 'decoration', name: 'Decoration', href: '#decoration' },
                { id: 'shows', name: 'Shows', href: '#shows' },
                { id: 'sound', name: 'Sound & Lights', href: '#sound' },
                { id: 'catering', name: 'Catering', href: '#catering' }
            ]
        }
    },
    alloggio: {
        appartamento: {
            name: 'Appartamento',
            class: 'radial-appartamento',
            subs: [
                { id: 'alcala', name: 'Alcalá', href: 'alloggio/alcala.html' },
                { id: 'lasamericas', name: 'Studio Las Américas', href: 'alloggio/studio-las-americas.html' },
                { id: 'loscristianos', name: 'Studio Los Cristianos', href: 'alloggio/studio-los-cristianos.html' }
            ]
        },
        ostello: {
            name: 'Ostello',
            class: 'radial-ostello',
            subs: [
                { id: 'gotademar', name: 'Gota de Mar', href: 'alloggio/gota-de-mar.html' }
            ]
        },
        rurale: {
            name: 'Rurale<br>Glamping',
            class: 'radial-rurale',
            subs: [
                { id: 'cueva', name: 'Cueva San Miguel', href: 'alloggio/cueva-san-miguel.html' },
                { id: 'dome', name: 'Dome Experience', href: 'alloggio/dome-ifonche.html' },
                { id: 'hotelrural', name: 'Hotel Rural', href: 'alloggio/hotel-rural-arona.html' }
            ]
        },
        surfhouse: {
            name: 'Surf House',
            class: 'radial-surfhouse',
            subs: [
                { id: 'surfhouse-main', name: 'Surf House', href: 'alloggio/surf-house.html' }
            ]
        },
        villa: {
            name: 'Villa Finca',
            class: 'radial-villa',
            subs: [
                { id: 'beachhouse', name: 'Beach House', href: 'alloggio/beach-house.html' },
                { id: 'atogo', name: 'Casa Atogo', href: 'alloggio/casa-rural-atogo.html' },
                { id: 'taucho', name: 'Casa Dolores', href: 'alloggio/casa-rural-taucho.html' },
                { id: 'fortaleza', name: 'Finca La Fortaleza', href: 'alloggio/finca-la-fortaleza.html' },
                { id: 'playaparaiso', name: 'Villa Playa Paraíso', href: 'alloggio/villa-playa-paraiso.html' }
            ]
        }
    },
    escursioni: {
        teide: {
            name: 'Teide',
            class: 'radial-teide',
            subs: [
                { id: 'jeep', name: 'Jeep', href: '#jeep' },
                { id: 'stargazing', name: 'Star Gazing', href: '#stargazing' },
                { id: 'quad', name: 'Quad', href: '#quad' },
                { id: 'bike', name: 'Bike', href: '#bike' },
                { id: 'buggy', name: 'Buggy', href: '#buggy' }
            ]
        },
        oceano: {
            name: 'Oceano',
            class: 'radial-oceano',
            subs: [
                { id: 'jetcar', name: 'Jet Car', href: '#jetcar' },
                { id: 'jetsky', name: 'Jet Sky', href: '#jetsky' },
                { id: 'cetacei', name: 'Cetacei', href: '#cetacei' }
            ]
        },
        sky: {
            name: 'Sky',
            class: 'radial-sky',
            subs: [
                { id: 'parapente', name: 'Parapente', href: '#parapente' },
                { id: 'paratrike', name: 'Paratrike', href: '#paratrike' }
            ]
        },
        sport: {
            name: 'Sport',
            class: 'radial-sport',
            subs: [
                { id: 'kite', name: 'Kite', href: '#kite' },
                { id: 'wind', name: 'Wind', href: '#wind' },
                { id: 'surf', name: 'Surf', href: '#surf' },
                { id: 'fishing', name: 'Fishing', href: '#fishing' },
                { id: 'diving', name: 'Diving', href: '#diving' }
            ]
        },
        private: {
            name: 'Private',
            class: 'radial-private',
            subs: [
                { id: 'catamarano', name: 'Catamarano', href: '#catamarano' },
                { id: 'barco', name: 'Barco sin Licencia', href: '#barco' },
                { id: 'yacht', name: 'Yacht', href: '#yacht' }
            ]
        },
        fooddrink: {
            name: 'Food & Drink',
            class: 'radial-fooddrink',
            subs: [
                { id: 'bodegas', name: 'Bodegas', href: '#bodegas' },
                { id: 'guacinches', name: 'Guacinches', href: '#guacinches' }
            ]
        }
    },
    surfing: {
        surfbar: {
            name: 'Surfbar<br>Franchise',
            class: 'radial-surfbar',
            subs: []
        },
        surfhouse: {
            name: 'Surf House',
            class: 'radial-surfhouse',
            subs: [
                { id: 'b2b', name: 'B2B', href: '#b2b' },
                { id: 'surfcamp', name: 'Surf Camp', href: '#surfcamp' },
                { id: 'reservacama', name: 'Reserva Cama', href: '#reservacama' },
                { id: 'reservahab', name: 'Reserva Habitacion', href: '#reservahab' },
                { id: 'gallery', name: 'Gallery', href: '#gallery' }
            ]
        },
        elmedano: {
            name: 'El Medano<br>Surf/Kite',
            class: 'radial-elmedano',
            subs: [
                { id: 'elmedano-rentshop', name: 'Rent Shop', href: '#elmedano-rentshop' },
                { id: 'elmedano-school', name: 'School', href: '#elmedano-school' },
                { id: 'elmedano-fooddrink', name: 'Food & Drink', href: '#elmedano-fooddrink' }
            ]
        },
        spots: {
            name: 'Surf Spots',
            class: 'radial-spots',
            subs: []
        },
        callemexico: {
            name: 'Calle Mexico',
            class: 'radial-callemexico',
            subs: [
                { id: 'callemexico-rentshop', name: 'Rent Shop', href: '#callemexico-rentshop' },
                { id: 'callemexico-fooddrink', name: 'Food & Drink', href: '#callemexico-fooddrink' },
                { id: 'callemexico-artevents', name: 'Art & Events', href: '#callemexico-artevents' }
            ]
        },
        school: {
            name: 'School',
            class: 'radial-school',
            subs: [
                { id: 'kontraola', name: 'Kontraola', href: '#kontraola' },
                { id: 'k16', name: 'K16', href: '#k16' },
                { id: 'ikaika', name: 'Ika Ika', href: '#ikaika' },
                { id: 'franz', name: 'Franz', href: '#franz' },
                { id: 'vils', name: "Vil's", href: '#vils' }
            ]
        }
    },
    agency: {
        smm: {
            name: 'SMM &<br>Marketing',
            class: 'radial-smm',
            subs: [
                { id: 'marketing', name: 'Marketing', href: '#marketing' },
                { id: 'smm-consulenza', name: 'Consulenza', href: '#smm-consulenza' },
                { id: 'gestione', name: 'Gestione', href: '#gestione' },
                { id: 'ads', name: 'Ads', href: '#ads' },
                { id: 'web', name: 'Web', href: '#web' }
            ]
        },
        grafic: {
            name: 'Grafic Design',
            class: 'radial-grafic',
            subs: [
                { id: 'flyer', name: 'Flyer Menu', href: '#flyer' },
                { id: 'fotovideo', name: 'Foto Video', href: '#fotovideo' },
                { id: 'logo', name: 'Logo', href: '#logo' },
                { id: 'kitmarca', name: 'Kit Marca', href: '#kitmarca' }
            ]
        },
        artists: {
            name: 'Artists<br>Management',
            class: 'radial-artists',
            subs: [
                { id: 'livemusic', name: 'Live Music', href: '#livemusic' },
                { id: 'djs', name: 'DJs', href: '#djs' },
                { id: 'agency-shows', name: 'Shows', href: '#agency-shows' },
                { id: 'setrecording', name: 'Set Recording', href: '#setrecording' },
                { id: 'djschool', name: 'DJ School', href: '#djschool' }
            ]
        },
        start: {
            name: 'Start Business',
            class: 'radial-start',
            subs: [
                { id: 'start-consulenza', name: 'Consulenza', href: '#start-consulenza' },
                { id: 'affiancamento', name: 'Affiancamento', href: '#affiancamento' },
                { id: 'modelli', name: 'Modelli', href: '#modelli' },
                { id: 'tavolacalda', name: 'Tavola Calda', href: '#tavolacalda' }
            ]
        }
    }
};

function initMobilePageMenu() {
    if (window.innerWidth <= 768) {
        createMobilePageMap();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-page-map')) {
                createMobilePageMap();
            }
            // Aggiorna linee mobile su resize
            const mobileMap = document.querySelector('.mobile-page-map');
            if (mobileMap) {
                setTimeout(() => updateMobileLines(mobileMap), 100);
            }
        } else {
            const mobileMap = document.querySelector('.mobile-page-map');
            if (mobileMap) mobileMap.remove();
        }
    });

    // Aggiorna linee mobile periodicamente
    setInterval(() => {
        const mobileMap = document.querySelector('.mobile-page-map');
        if (mobileMap && window.innerWidth <= 768) {
            updateMobileLines(mobileMap);
        }
    }, 100);
}

function createMobilePageMap() {
    const main = document.querySelector('.page-map');
    if (!main) return;

    const currentPage = getCurrentPage();
    if (!currentPage) return;

    if (document.querySelector('.mobile-page-map')) return;

    const mobileMap = document.createElement('div');
    mobileMap.classList.add('mobile-page-map');
    mobileMap.dataset.state = 'categories';  // Parte con categorie visibili

    // Determina colore e nome della categoria
    const categoryInfo = {
        eventi: { name: 'EVENTI', class: 'eventi-bg' },
        alloggio: { name: 'ALLOGGIO', class: 'alloggio-bg' },
        escursioni: { name: 'ESCURSIONI<br>& ATTIVITÀ', class: 'escursioni-bg' },
        surfing: { name: 'SURFING<br>TENERIFE', class: 'surfing-bg' },
        agency: { name: 'AGENCY', class: 'agency-bg' },
        alessandro: { name: 'ALESSANDRO', class: 'alessandro-bg' }
    };

    const info = categoryInfo[currentPage];

    // Centro - Categoria (senza hint perché categorie già visibili)
    const center = document.createElement('div');
    center.classList.add('category-center-mobile');
    center.id = 'mobile-category-center';
    center.innerHTML = `
        <div class="category-icon-mobile ${info.class}">
            <span>${info.name}</span>
        </div>
    `;
    mobileMap.appendChild(center);

    // Nodi sotto-categorie per questa pagina
    const subcatPositions = getSubcategoryPositions(currentPage);
    const subcatNodes = getSubcategoryNodes(currentPage);

    subcatNodes.forEach((node, index) => {
        const el = document.createElement('div');
        el.classList.add('mobile-node', 'mobile-node-primary', node.class);
        el.id = `mobile-node-${node.id}`;
        el.dataset.category = node.id;
        el.innerHTML = `<span>${node.name}</span>`;
        el.style.top = subcatPositions[index].top;
        el.style.left = subcatPositions[index].left;
        mobileMap.appendChild(el);
    });

    // Pulsante indietro
    const backBtn = document.createElement('button');
    backBtn.classList.add('mobile-back-btn');
    backBtn.innerHTML = '← Indietro';
    mobileMap.appendChild(backBtn);

    main.parentNode.insertBefore(mobileMap, main.nextSibling);

    // Crea SVG per le linee mobile
    createMobileSVGLines(mobileMap, subcatNodes.length);

    // Crea overlay radiale
    createPageRadialOverlay();

    // Event listeners
    initMobilePageEvents(mobileMap, currentPage);

    // Aggiorna linee dopo rendering
    setTimeout(() => updateMobileLines(mobileMap), 100);
}

function createMobileSVGLines(mobileMap, nodeCount) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('mobile-connections');
    svg.id = 'mobile-svg-connections';

    for (let i = 0; i < nodeCount; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('mobile-line');
        line.id = `mobile-line-${i}`;
        svg.appendChild(line);
    }

    // Inserisci SVG all'inizio del mobile map
    mobileMap.insertBefore(svg, mobileMap.firstChild);
}

function updateMobileLines(mobileMap) {
    const svg = mobileMap.querySelector('.mobile-connections');
    if (!svg) return;

    const center = mobileMap.querySelector('.category-center-mobile');
    const nodes = mobileMap.querySelectorAll('.mobile-node-primary');

    if (!center) return;

    const svgRect = svg.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2 - svgRect.left;
    const centerY = centerRect.top + centerRect.height / 2 - svgRect.top;

    nodes.forEach((node, index) => {
        const line = svg.querySelector(`#mobile-line-${index}`);
        if (!line) return;

        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left + nodeRect.width / 2 - svgRect.left;
        const nodeY = nodeRect.top + nodeRect.height / 2 - svgRect.top;

        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', nodeX);
        line.setAttribute('y2', nodeY);
    });
}

function getSubcategoryPositions(page) {
    // Posizioni per 4-6 nodi attorno al centro
    const positions4 = [
        { top: '22%', left: '25%' },
        { top: '22%', left: '75%' },
        { top: '78%', left: '25%' },
        { top: '78%', left: '75%' }
    ];

    const positions5 = [
        { top: '18%', left: '50%' },
        { top: '45%', left: '15%' },
        { top: '45%', left: '85%' },
        { top: '78%', left: '28%' },
        { top: '78%', left: '72%' }
    ];

    const positions6 = [
        { top: '22%', left: '25%' },
        { top: '22%', left: '75%' },
        { top: '50%', left: '12%' },
        { top: '50%', left: '88%' },
        { top: '78%', left: '25%' },
        { top: '78%', left: '75%' }
    ];

    switch (page) {
        case 'eventi':
        case 'agency':
            return positions4;
        case 'alloggio':
        case 'alessandro':
            return positions5;
        case 'escursioni':
        case 'surfing':
            return positions6;
        default:
            return positions4;
    }
}

function getSubcategoryNodes(page) {
    const nodes = {
        eventi: [
            { id: 'showcases', name: 'Showcases', class: 'mobile-showcases' },
            { id: 'consigliati', name: 'Consigliati', class: 'mobile-consigliati' },
            { id: 'movida', name: 'Movida &<br>Nightlife', class: 'mobile-movida' },
            { id: 'servizi', name: 'Privati<br>Servizi', class: 'mobile-servizi' }
        ],
        alloggio: [
            { id: 'appartamento', name: 'Appartamento', class: 'mobile-apartamento' },
            { id: 'ostello', name: 'Ostello', class: 'mobile-ostello' },
            { id: 'rurale', name: 'Rurale<br>Glamping', class: 'mobile-rurale' },
            { id: 'surfhouse', name: 'Surf House', class: 'mobile-surfhouse-alloggio' },
            { id: 'villa', name: 'Villa Finca', class: 'mobile-villa' }
        ],
        escursioni: [
            { id: 'teide', name: 'Teide', class: 'mobile-teide' },
            { id: 'oceano', name: 'Oceano', class: 'mobile-oceano' },
            { id: 'sky', name: 'Sky', class: 'mobile-sky' },
            { id: 'sport', name: 'Sport', class: 'mobile-sport' },
            { id: 'private', name: 'Private', class: 'mobile-private' },
            { id: 'fooddrink', name: 'Food & Drink', class: 'mobile-fooddrink' }
        ],
        surfing: [
            { id: 'surfbar', name: 'Surfbar<br>Franchise', class: 'mobile-surfbar' },
            { id: 'surfhouse', name: 'Surf House', class: 'mobile-surfhouse' },
            { id: 'elmedano', name: 'El Médano', class: 'mobile-elmedano' },
            { id: 'spots', name: 'Surf Spots', class: 'mobile-spots' },
            { id: 'callemexico', name: 'Calle México', class: 'mobile-callemexico' },
            { id: 'school', name: 'School', class: 'mobile-school' }
        ],
        agency: [
            { id: 'smm', name: 'SMM &<br>Marketing', class: 'mobile-smm' },
            { id: 'grafic', name: 'Grafic<br>Design', class: 'mobile-grafic' },
            { id: 'artists', name: 'Artists<br>Management', class: 'mobile-artists' },
            { id: 'start', name: 'Start<br>Business', class: 'mobile-start' }
        ],
        alessandro: [
            { id: 'chisono', name: 'Chi Sono', class: 'mobile-chisono' },
            { id: 'perche', name: 'Perché<br>Tenerife', class: 'mobile-perche' },
            { id: 'esperienza', name: 'La Mia<br>Esperienza', class: 'mobile-esperienza' },
            { id: 'ruolo', name: 'Il Mio<br>Ruolo', class: 'mobile-ruolo' },
            { id: 'highlights', name: 'Highlights', class: 'mobile-highlights' }
        ]
    };

    return nodes[page] || [];
}

function createPageRadialOverlay() {
    if (document.querySelector('.radial-overlay')) return;

    const overlay = document.createElement('div');
    overlay.classList.add('radial-overlay');
    overlay.id = 'radial-overlay';

    const popup = document.createElement('div');
    popup.classList.add('radial-popup');
    popup.id = 'radial-popup';

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePageRadialPopup();
        }
    });
}

function openPageRadialPopup(page, category) {
    const overlay = document.getElementById('radial-overlay');
    const popup = document.getElementById('radial-popup');

    if (!pageSubNodesData[page] || !pageSubNodesData[page][category]) {
        // Se non ci sono dati, mostra un messaggio semplice
        popup.innerHTML = `<div class="radial-center"><span>Coming<br>Soon</span></div>`;
        overlay.classList.add('visible');
        return;
    }

    const data = pageSubNodesData[page][category];

    popup.innerHTML = '';

    const center = document.createElement('div');
    center.classList.add('radial-center', data.class);
    center.innerHTML = `<span>${data.name}</span>`;
    popup.appendChild(center);

    const numSubs = data.subs.length;
    const radius = 115;
    const startAngle = -90;

    data.subs.forEach((sub, index) => {
        const angle = startAngle + (360 / numSubs) * index;
        const radian = angle * (Math.PI / 180);
        const x = 50 + (radius / 320 * 100) * Math.cos(radian);
        const y = 50 + (radius / 320 * 100) * Math.sin(radian);

        const node = document.createElement('a');
        node.href = sub.href;
        node.classList.add('radial-node');
        node.innerHTML = `<span>${sub.name}</span>`;
        node.style.top = `${y}%`;
        node.style.left = `${x}%`;
        popup.appendChild(node);
    });

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('radial-close');
    closeBtn.textContent = '✕ Chiudi';
    closeBtn.addEventListener('click', closePageRadialPopup);
    popup.appendChild(closeBtn);

    overlay.classList.add('visible');
}

function closePageRadialPopup() {
    const overlay = document.getElementById('radial-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
    }
}

function initMobilePageEvents(mobileMap, currentPage) {
    const center = mobileMap.querySelector('.category-center-mobile');
    const primaryNodes = mobileMap.querySelectorAll('.mobile-node-primary');
    const backBtn = mobileMap.querySelector('.mobile-back-btn');

    center.addEventListener('click', function() {
        if (mobilePageState === 'initial') {
            showMobilePageCategories(mobileMap);
        }
    });

    primaryNodes.forEach(node => {
        node.addEventListener('click', function() {
            const category = this.dataset.category;
            if (mobilePageState === 'categories') {
                openPageRadialPopup(currentPage, category);
            }
        });
    });

    backBtn.addEventListener('click', function() {
        goMobilePageBack(mobileMap);
    });
}

function showMobilePageCategories(mobileMap) {
    mobileMap.dataset.state = 'categories';
    mobilePageState = 'categories';
}

function goMobilePageBack(mobileMap) {
    if (mobilePageState === 'categories') {
        // Torna alla home
        window.location.href = 'index.html';
    }
}
