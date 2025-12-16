// Lo Squalo - Tenerife Experience
// Interactive Mind Map - 6 Categorie + Mobile Radial Popup

document.addEventListener('DOMContentLoaded', function() {
    initProgressiveMap();
    initDynamicLines();
    initMobileMenu();
});

// Stato corrente
let currentState = 'initial';
let expandedCategory = null;

// ===== LINEE DINAMICHE SVG =====
const lineConnections = {
    // Linee principali: Tenerife -> 6 Categorie
    main: [
        { line: 'line-tenerife-eventi', from: 'tenerife-trigger', to: 'node-eventi' },
        { line: 'line-tenerife-alloggio', from: 'tenerife-trigger', to: 'node-alloggio' },
        { line: 'line-tenerife-escursioni', from: 'tenerife-trigger', to: 'node-escursioni' },
        { line: 'line-tenerife-surfing', from: 'tenerife-trigger', to: 'node-surfing' },
        { line: 'line-tenerife-agency', from: 'tenerife-trigger', to: 'node-agency' },
        { line: 'line-tenerife-alessandro', from: 'tenerife-trigger', to: 'node-alessandro' }
    ],
    // Sotto-linee EVENTI
    eventi: [
        { line: 'line-eventi-showcases', from: 'node-eventi', to: 'node-showcases' },
        { line: 'line-eventi-consigliati', from: 'node-eventi', to: 'node-consigliati' },
        { line: 'line-eventi-movida', from: 'node-eventi', to: 'node-movida' },
        { line: 'line-eventi-servizi', from: 'node-eventi', to: 'node-servizi' }
    ],
    // Sotto-linee ALLOGGIO
    alloggio: [
        { line: 'line-alloggio-ostello', from: 'node-alloggio', to: 'node-ostello' },
        { line: 'line-alloggio-villa', from: 'node-alloggio', to: 'node-villa' },
        { line: 'line-alloggio-surfhouse', from: 'node-alloggio', to: 'node-surfhouse-alloggio' },
        { line: 'line-alloggio-rurale', from: 'node-alloggio', to: 'node-rurale' },
        { line: 'line-alloggio-apartamento', from: 'node-alloggio', to: 'node-apartamento' }
    ],
    // Sotto-linee ESCURSIONI
    escursioni: [
        { line: 'line-escursioni-teide', from: 'node-escursioni', to: 'node-teide' },
        { line: 'line-escursioni-oceano', from: 'node-escursioni', to: 'node-oceano' },
        { line: 'line-escursioni-sky', from: 'node-escursioni', to: 'node-sky' },
        { line: 'line-escursioni-sport', from: 'node-escursioni', to: 'node-sport' },
        { line: 'line-escursioni-private', from: 'node-escursioni', to: 'node-private-escursioni' },
        { line: 'line-escursioni-fooddrink', from: 'node-escursioni', to: 'node-fooddrink-escursioni' }
    ],
    // Sotto-linee SURFING
    surfing: [
        { line: 'line-surfing-surfbar', from: 'node-surfing', to: 'node-surfbar' },
        { line: 'line-surfing-surfhouse', from: 'node-surfing', to: 'node-surfhouse' },
        { line: 'line-surfing-elmedano', from: 'node-surfing', to: 'node-elmedano' },
        { line: 'line-surfing-spots', from: 'node-surfing', to: 'node-surfspots' },
        { line: 'line-surfing-callemexico', from: 'node-surfing', to: 'node-callemexico' },
        { line: 'line-surfing-school', from: 'node-surfing', to: 'node-school' }
    ],
    // Sotto-linee AGENCY
    agency: [
        { line: 'line-agency-smm', from: 'node-agency', to: 'node-smm' },
        { line: 'line-agency-grafic', from: 'node-agency', to: 'node-grafic' },
        { line: 'line-agency-artists', from: 'node-agency', to: 'node-artists-agency' },
        { line: 'line-agency-start', from: 'node-agency', to: 'node-start' }
    ],
    // Sotto-linee ALESSANDRO
    alessandro: [
        { line: 'line-alessandro-chisono', from: 'node-alessandro', to: 'node-chisono' },
        { line: 'line-alessandro-perche', from: 'node-alessandro', to: 'node-perche' },
        { line: 'line-alessandro-esperienza', from: 'node-alessandro', to: 'node-esperienza' },
        { line: 'line-alessandro-ruolo', from: 'node-alessandro', to: 'node-ruolo' },
        { line: 'line-alessandro-highlights', from: 'node-alessandro', to: 'node-highlights' }
    ]
};

function initDynamicLines() {
    updateAllLines();
    window.addEventListener('resize', debounce(updateAllLines, 100));
    setInterval(updateAllLines, 50);
}

function getElementCenter(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const svg = document.getElementById('svg-connections');
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

function updateAllLines() {
    // Linee principali
    lineConnections.main.forEach(conn => {
        drawLine(conn.line, conn.from, conn.to);
    });

    // Linee per ogni categoria
    Object.keys(lineConnections).forEach(category => {
        if (category !== 'main') {
            lineConnections[category].forEach(conn => {
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

// ===== MAPPA PROGRESSIVA =====
function initProgressiveMap() {
    const mindMap = document.querySelector('.mind-map');
    const tenerife = document.getElementById('tenerife-trigger');
    const backBtn = document.getElementById('back-btn');
    const primaryNodes = document.querySelectorAll('.node-primary');

    // Click su Tenerife → mostra categorie
    tenerife.addEventListener('click', function() {
        if (currentState === 'initial') {
            showCategories();
        }
    });

    // Click sulle categorie → mostra sottocategorie
    primaryNodes.forEach(node => {
        node.addEventListener('click', function() {
            const category = this.dataset.category;

            if (currentState === 'categories') {
                showSubcategories(category);
                this.classList.add('expanded');
            } else if (currentState === 'subcategories') {
                if (expandedCategory !== category) {
                    hideCurrentSubcategories();
                    document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));

                    setTimeout(() => {
                        showSubcategories(category);
                        this.classList.add('expanded');
                    }, 250);
                }
            }
        });
    });

    // Pulsante indietro
    backBtn.addEventListener('click', function() {
        goBack();
    });

    // Tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goBack();
        }
    });
}

function showCategories() {
    const mindMap = document.querySelector('.mind-map');
    mindMap.dataset.state = 'categories';
    currentState = 'categories';

    // Mostra le linee principali
    document.querySelectorAll('.main-line').forEach(line => {
        line.classList.add('visible');
    });
}

function showSubcategories(category) {
    const mindMap = document.querySelector('.mind-map');
    mindMap.dataset.state = 'subcategories';
    currentState = 'subcategories';
    expandedCategory = category;

    const subNodes = document.querySelector(`.sub-nodes[data-parent="${category}"]`);
    if (subNodes) subNodes.classList.add('visible');

    // Mostra le linee della categoria
    document.querySelectorAll(`.sub-line[data-category="${category}"]`).forEach(line => {
        line.classList.add('visible');
    });
}

function hideCurrentSubcategories() {
    if (expandedCategory) {
        const subNodes = document.querySelector(`.sub-nodes[data-parent="${expandedCategory}"]`);
        if (subNodes) subNodes.classList.remove('visible');

        // Nascondi le linee della categoria
        document.querySelectorAll(`.sub-line[data-category="${expandedCategory}"]`).forEach(line => {
            line.classList.remove('visible');
        });
    }
}

function goBack() {
    const mindMap = document.querySelector('.mind-map');

    if (currentState === 'subcategories') {
        hideCurrentSubcategories();
        document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));
        mindMap.dataset.state = 'categories';
        currentState = 'categories';
        expandedCategory = null;
    } else if (currentState === 'categories') {
        mindMap.dataset.state = 'initial';
        currentState = 'initial';

        // Nascondi le linee principali
        document.querySelectorAll('.main-line').forEach(line => {
            line.classList.remove('visible');
        });
    }
}

// ===== MOBILE MINI-MAP WITH RADIAL POPUP =====
let mobileState = 'initial';

// Dati sotto-categorie per radial popup - 6 categorie
const categorySubNodes = {
    eventi: {
        name: 'EVENTI',
        class: 'radial-eventi',
        subs: [
            { id: 'showcases', name: 'Showcases', class: 'radial-showcases', href: 'eventi.html#showcases' },
            { id: 'consigliati', name: 'Consigliati', class: 'radial-consigliati', href: 'eventi.html#consigliati' },
            { id: 'movida', name: 'Movida &<br>Nightlife', class: 'radial-movida', href: 'eventi.html#movida' },
            { id: 'servizi', name: 'Privati<br>Servizi', class: 'radial-servizi', href: 'eventi.html#servizi' }
        ]
    },
    alloggio: {
        name: 'ALLOGGIO',
        class: 'radial-alloggio',
        subs: [
            { id: 'ostello', name: 'Ostello', class: 'radial-ostello', href: 'alloggio.html#ostello' },
            { id: 'villa', name: 'Villa<br>Finca', class: 'radial-villa', href: 'alloggio.html#villa' },
            { id: 'surfhouse', name: 'Surf<br>House', class: 'radial-surfhouse-alloggio', href: 'alloggio.html#surfhouse' },
            { id: 'rurale', name: 'Rurale<br>Glamping', class: 'radial-rurale', href: 'alloggio.html#rurale' },
            { id: 'apartamento', name: 'Apartamento', class: 'radial-apartamento', href: 'alloggio.html#apartamento' }
        ]
    },
    escursioni: {
        name: 'ESCURSIONI<br>& ATTIVITÀ',
        class: 'radial-escursioni',
        subs: [
            { id: 'teide', name: 'Teide', class: 'radial-teide', href: 'escursioni.html#teide' },
            { id: 'oceano', name: 'Oceano', class: 'radial-oceano', href: 'escursioni.html#oceano' },
            { id: 'sky', name: 'Sky', class: 'radial-sky', href: 'escursioni.html#sky' },
            { id: 'sport', name: 'Sport', class: 'radial-sport', href: 'escursioni.html#sport' },
            { id: 'private', name: 'Private', class: 'radial-private-escursioni', href: 'escursioni.html#private' },
            { id: 'fooddrink', name: 'Food &<br>Drink', class: 'radial-fooddrink', href: 'escursioni.html#fooddrink' }
        ]
    },
    surfing: {
        name: 'SURFING<br>TENERIFE',
        class: 'radial-surfing',
        subs: [
            { id: 'surfbar', name: 'Surfbar<br>Franchise', class: 'radial-surfbar', href: 'surfing.html#surfbar' },
            { id: 'surfhouse', name: 'Surf<br>House', class: 'radial-surfhouse', href: 'surfing.html#surfhouse' },
            { id: 'elmedano', name: 'El Médano<br>Surf/Kite', class: 'radial-elmedano', href: 'surfing.html#elmedano' },
            { id: 'spots', name: 'Surf<br>Spots', class: 'radial-surfspots', href: 'surfing.html#spots' },
            { id: 'callemexico', name: 'Calle<br>México', class: 'radial-callemexico', href: 'surfing.html#callemexico' },
            { id: 'school', name: 'School', class: 'radial-school', href: 'surfing.html#school' }
        ]
    },
    agency: {
        name: 'AGENCY',
        class: 'radial-agency',
        subs: [
            { id: 'smm', name: 'SMM &<br>Marketing', class: 'radial-smm', href: 'agency.html#smm' },
            { id: 'grafic', name: 'Grafic<br>Design', class: 'radial-grafic', href: 'agency.html#grafic' },
            { id: 'artists', name: 'Artists<br>Management', class: 'radial-artists-agency', href: 'agency.html#artists' },
            { id: 'start', name: 'Start<br>Business', class: 'radial-start', href: 'agency.html#start' }
        ]
    },
    alessandro: {
        name: 'ALESSANDRO',
        class: 'radial-alessandro',
        subs: [
            { id: 'chisono', name: 'Chi Sono', class: 'radial-chisono', href: 'alessandro.html#chisono' },
            { id: 'perche', name: 'Perché<br>Tenerife', class: 'radial-perche', href: 'alessandro.html#perche' },
            { id: 'esperienza', name: 'La Mia<br>Esperienza', class: 'radial-esperienza', href: 'alessandro.html#esperienza' },
            { id: 'ruolo', name: 'Il Mio<br>Ruolo Oggi', class: 'radial-ruolo', href: 'alessandro.html#ruolo' },
            { id: 'highlights', name: 'Highlights', class: 'radial-highlights', href: 'alessandro.html#highlights' }
        ]
    }
};

function initMobileMenu() {
    if (window.innerWidth <= 768) {
        createMobileMiniMap();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-map')) {
                createMobileMiniMap();
            }
        } else {
            const mobileMap = document.querySelector('.mobile-map');
            if (mobileMap) mobileMap.remove();
            const overlay = document.querySelector('.radial-overlay');
            if (overlay) overlay.remove();
        }
    });
}

function createMobileMiniMap() {
    const main = document.querySelector('.mind-map');

    if (document.querySelector('.mobile-map')) return;

    const mobileMap = document.createElement('div');
    mobileMap.classList.add('mobile-map');
    mobileMap.dataset.state = 'initial';

    // SVG per le linee
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('mobile-svg');
    svg.id = 'mobile-svg-connections';

    // Linee principali - 6 categorie
    const categories = ['eventi', 'alloggio', 'escursioni', 'surfing', 'agency', 'alessandro'];
    categories.forEach(cat => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('mobile-line', 'mobile-main-line');
        line.id = `mobile-line-center-${cat}`;
        svg.appendChild(line);
    });

    mobileMap.appendChild(svg);

    // Centro - Tenerife
    const center = document.createElement('div');
    center.classList.add('center-node-mobile');
    center.id = 'mobile-center';
    center.innerHTML = `
        <img src="tenerife.png" alt="Tenerife" class="tenerife-img-mobile">
        <span class="center-text-mobile">TENERIFE<br>EXPERIENCE</span>
        <span class="click-hint-mobile">Tocca per esplorare</span>
    `;
    mobileMap.appendChild(center);

    // Posizioni 6 nodi in esagono attorno al centro
    const primaryPositions = {
        eventi: { top: '22%', left: '25%' },      // Alto sinistra
        alloggio: { top: '22%', left: '75%' },    // Alto destra
        escursioni: { top: '50%', left: '12%' },  // Centro sinistra
        surfing: { top: '50%', left: '88%' },     // Centro destra
        agency: { top: '78%', left: '25%' },      // Basso sinistra
        alessandro: { top: '78%', left: '75%' }   // Basso destra
    };

    const primaryNodes = [
        { id: 'eventi', name: 'EVENTI', class: 'mobile-eventi' },
        { id: 'alloggio', name: 'ALLOGGIO', class: 'mobile-alloggio' },
        { id: 'escursioni', name: 'ESCURSIONI<br>& ATTIVITÀ', class: 'mobile-escursioni' },
        { id: 'surfing', name: 'SURFING<br>TENERIFE', class: 'mobile-surfing' },
        { id: 'agency', name: 'AGENCY', class: 'mobile-agency' },
        { id: 'alessandro', name: 'ALESSANDRO', class: 'mobile-alessandro' }
    ];

    primaryNodes.forEach(node => {
        const el = document.createElement('div');
        el.classList.add('mobile-node', 'mobile-node-primary', node.class);
        el.id = `mobile-node-${node.id}`;
        el.dataset.category = node.id;
        el.innerHTML = `<span>${node.name}</span>`;
        el.style.top = primaryPositions[node.id].top;
        el.style.left = primaryPositions[node.id].left;
        mobileMap.appendChild(el);
    });

    // Pulsante indietro
    const backBtn = document.createElement('button');
    backBtn.classList.add('mobile-back-btn');
    backBtn.innerHTML = '← Indietro';
    mobileMap.appendChild(backBtn);

    main.parentNode.insertBefore(mobileMap, main.nextSibling);

    // Crea overlay radiale
    createRadialOverlay();

    // Event listeners
    initMobileMapEvents(mobileMap);

    // Aggiorna linee
    setTimeout(() => updateMobileLines(), 100);
    setInterval(updateMobileLines, 100);
}

function createRadialOverlay() {
    if (document.querySelector('.radial-overlay')) return;

    const overlay = document.createElement('div');
    overlay.classList.add('radial-overlay');
    overlay.id = 'radial-overlay';

    const popup = document.createElement('div');
    popup.classList.add('radial-popup');
    popup.id = 'radial-popup';

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Chiudi cliccando fuori
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeRadialPopup();
        }
    });
}

function openRadialPopup(category) {
    const overlay = document.getElementById('radial-overlay');
    const popup = document.getElementById('radial-popup');
    const data = categorySubNodes[category];

    if (!data) return;

    // Pulisci popup
    popup.innerHTML = '';

    // Centro con nome categoria
    const center = document.createElement('div');
    center.classList.add('radial-center', data.class);
    center.innerHTML = `<span>${data.name}</span>`;
    popup.appendChild(center);

    // Calcola posizioni radiali
    const numSubs = data.subs.length;
    const radius = 115; // distanza dal centro
    const startAngle = -90; // parte dall'alto

    data.subs.forEach((sub, index) => {
        const angle = startAngle + (360 / numSubs) * index;
        const radian = angle * (Math.PI / 180);
        const x = 50 + (radius / 320 * 100) * Math.cos(radian);
        const y = 50 + (radius / 320 * 100) * Math.sin(radian);

        const node = document.createElement('a');
        node.href = sub.href;
        node.classList.add('radial-node', sub.class);
        node.innerHTML = `<span>${sub.name}</span>`;
        node.style.top = `${y}%`;
        node.style.left = `${x}%`;
        popup.appendChild(node);
    });

    // Pulsante chiudi
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('radial-close');
    closeBtn.textContent = '✕ Chiudi';
    closeBtn.addEventListener('click', closeRadialPopup);
    popup.appendChild(closeBtn);

    // Mostra
    overlay.classList.add('visible');
}

function closeRadialPopup() {
    const overlay = document.getElementById('radial-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
    }
}

function initMobileMapEvents(mobileMap) {
    const center = mobileMap.querySelector('.center-node-mobile');
    const primaryNodes = mobileMap.querySelectorAll('.mobile-node-primary');
    const backBtn = mobileMap.querySelector('.mobile-back-btn');

    // Tap su Tenerife
    center.addEventListener('click', function() {
        if (mobileState === 'initial') {
            showMobileCategories(mobileMap);
        }
    });

    // Tap su categorie → apri radial popup
    primaryNodes.forEach(node => {
        node.addEventListener('click', function() {
            const category = this.dataset.category;
            if (mobileState === 'categories') {
                openRadialPopup(category);
            }
        });
    });

    // Pulsante indietro
    backBtn.addEventListener('click', function() {
        goMobileBack(mobileMap);
    });
}

function showMobileCategories(mobileMap) {
    mobileMap.dataset.state = 'categories';
    mobileState = 'categories';

    // Mostra linee principali
    mobileMap.querySelectorAll('.mobile-main-line').forEach(line => {
        line.classList.add('visible');
    });
}

function goMobileBack(mobileMap) {
    if (mobileState === 'categories') {
        mobileMap.dataset.state = 'initial';
        mobileState = 'initial';

        mobileMap.querySelectorAll('.mobile-main-line').forEach(line => {
            line.classList.remove('visible');
        });
    }
}

function updateMobileLines() {
    const svg = document.getElementById('mobile-svg-connections');
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();

    function getMobileCenter(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - svgRect.left,
            y: rect.top + rect.height / 2 - svgRect.top
        };
    }

    // Linee principali - 6 categorie
    const mainConnections = [
        { line: 'mobile-line-center-eventi', from: 'mobile-center', to: 'mobile-node-eventi' },
        { line: 'mobile-line-center-alloggio', from: 'mobile-center', to: 'mobile-node-alloggio' },
        { line: 'mobile-line-center-escursioni', from: 'mobile-center', to: 'mobile-node-escursioni' },
        { line: 'mobile-line-center-surfing', from: 'mobile-center', to: 'mobile-node-surfing' },
        { line: 'mobile-line-center-agency', from: 'mobile-center', to: 'mobile-node-agency' },
        { line: 'mobile-line-center-alessandro', from: 'mobile-center', to: 'mobile-node-alessandro' }
    ];

    mainConnections.forEach(conn => {
        const line = document.getElementById(conn.line);
        if (!line) return;
        const from = getMobileCenter(conn.from);
        const to = getMobileCenter(conn.to);
        if (from && to) {
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
        }
    });
}
