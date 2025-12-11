// Lo Squalo - Tenerife Experience
// Interactive Mind Map with Dynamic SVG Lines

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
    // Linee principali: Tenerife -> Categorie
    main: [
        { line: 'line-tenerife-party', from: 'tenerife-trigger', to: 'node-party' },
        { line: 'line-tenerife-food', from: 'tenerife-trigger', to: 'node-food' },
        { line: 'line-tenerife-staying', from: 'tenerife-trigger', to: 'node-staying' },
        { line: 'line-tenerife-excursion', from: 'tenerife-trigger', to: 'node-excursion' },
        { line: 'line-tenerife-events', from: 'tenerife-trigger', to: 'node-events' }
    ],
    // Sotto-linee per categoria
    party: [
        { line: 'line-party-daytime', from: 'node-party', to: 'node-daytime' },
        { line: 'line-party-nightlife', from: 'node-party', to: 'node-nightlife' },
        { line: 'line-party-hmc', from: 'node-party', to: 'node-hmc' },
        { line: 'line-daytime-terraceo', from: 'node-daytime', to: 'node-terraceo' },
        { line: 'line-daytime-elbarco', from: 'node-daytime', to: 'node-elbarco' },
        { line: 'line-daytime-finca', from: 'node-daytime', to: 'node-finca' }
    ],
    food: [
        { line: 'line-food-aperitivo', from: 'node-food', to: 'node-aperitivo' },
        { line: 'line-food-brunch', from: 'node-food', to: 'node-brunch' },
        { line: 'line-food-ristorante', from: 'node-food', to: 'node-ristorante' }
    ],
    staying: [
        { line: 'line-staying-villa', from: 'node-staying', to: 'node-staying-villa' },
        { line: 'line-staying-hotel', from: 'node-staying', to: 'node-hotel' },
        { line: 'line-staying-apartment', from: 'node-staying', to: 'node-apartment' }
    ],
    excursion: [
        { line: 'line-excursion-action', from: 'node-excursion', to: 'node-action' },
        { line: 'line-excursion-chill', from: 'node-excursion', to: 'node-chill' }
    ],
    events: [
        { line: 'line-events-private', from: 'node-events', to: 'node-private' },
        { line: 'line-events-artists', from: 'node-events', to: 'node-artists' },
        { line: 'line-events-venue', from: 'node-events', to: 'node-venue' },
        { line: 'line-private-boat', from: 'node-private', to: 'node-boat' },
        { line: 'line-private-villaprivate', from: 'node-private', to: 'node-villa-private' }
    ]
};

function initDynamicLines() {
    // Disegna le linee iniziali
    updateAllLines();

    // Aggiorna le linee al resize
    window.addEventListener('resize', debounce(updateAllLines, 100));

    // Aggiorna periodicamente per gestire animazioni
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

// Dati sotto-categorie per radial popup
const categorySubNodes = {
    party: {
        name: 'PARTY',
        class: 'radial-party',
        subs: [
            { id: 'daytime', name: 'Daytime<br>& Sunset', class: 'radial-daytime', href: 'party.html#daytime' },
            { id: 'nightlife', name: 'Nightlife', class: 'radial-nightlife', href: 'party.html#nightlife' },
            { id: 'hmc', name: 'H.m.c.', class: 'radial-hmc', href: 'party.html#hmc' },
            { id: 'terraceo', name: 'Terraceo', class: 'radial-terraceo', href: 'party.html#terraceo' },
            { id: 'elbarco', name: 'El Barco', class: 'radial-elbarco', href: 'party.html#elbarco' },
            { id: 'finca', name: 'Finca', class: 'radial-finca', href: 'party.html#finca' }
        ]
    },
    food: {
        name: 'FOOD &<br>DRINK',
        class: 'radial-food',
        subs: [
            { id: 'aperitivo', name: 'Aperitivo', class: 'radial-aperitivo', href: 'food-drink.html#aperitivo' },
            { id: 'brunch', name: 'Brunch', class: 'radial-brunch', href: 'food-drink.html#brunch' },
            { id: 'ristorante', name: 'Ristorante', class: 'radial-ristorante', href: 'food-drink.html#ristorante' }
        ]
    },
    staying: {
        name: 'STAYING',
        class: 'radial-staying',
        subs: [
            { id: 'villa', name: 'Villa', class: 'radial-staying-villa', href: 'staying.html#villa' },
            { id: 'hotel', name: 'Hotel', class: 'radial-hotel', href: 'staying.html#hotel' },
            { id: 'apartment', name: 'Apartment', class: 'radial-apartment', href: 'staying.html#apartment' }
        ]
    },
    excursion: {
        name: 'EXCURSIÓN',
        class: 'radial-excursion',
        subs: [
            { id: 'action', name: 'Action', class: 'radial-action', href: 'excursion.html#action' },
            { id: 'chill', name: 'Chill', class: 'radial-chill', href: 'excursion.html#chill' }
        ]
    },
    events: {
        name: 'Events<br>Services',
        class: 'radial-events',
        subs: [
            { id: 'private', name: 'Private', class: 'radial-private', href: 'events.html#private' },
            { id: 'artists', name: 'Artists<br>booking', class: 'radial-artists', href: 'events.html#artists' },
            { id: 'venue', name: 'Venue<br>& More', class: 'radial-venue', href: 'events.html#venue' },
            { id: 'boat', name: 'Boat', class: 'radial-boat', href: 'events.html#boat' },
            { id: 'villa-private', name: 'Villa', class: 'radial-villa-private', href: 'events.html#villa-private' }
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

    // Linee principali
    const mainLines = ['party', 'food', 'staying', 'excursion', 'events'];
    mainLines.forEach(cat => {
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

    // Nodi primari - posizioni
    const primaryPositions = {
        party: { top: '28%', left: '20%' },
        food: { top: '20%', left: '55%' },
        staying: { top: '45%', left: '82%' },
        excursion: { top: '75%', left: '70%' },
        events: { top: '75%', left: '28%' }
    };

    const primaryNodes = [
        { id: 'party', name: 'PARTY', class: 'mobile-party' },
        { id: 'food', name: 'FOOD &<br>DRINK', class: 'mobile-food' },
        { id: 'staying', name: 'STAYING', class: 'mobile-staying' },
        { id: 'excursion', name: 'EXCURSIÓN', class: 'mobile-excursion' },
        { id: 'events', name: 'Events<br>Services', class: 'mobile-events' }
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

    // Crea overlay radiale (una volta sola)
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

    // Linee principali
    const mainConnections = [
        { line: 'mobile-line-center-party', from: 'mobile-center', to: 'mobile-node-party' },
        { line: 'mobile-line-center-food', from: 'mobile-center', to: 'mobile-node-food' },
        { line: 'mobile-line-center-staying', from: 'mobile-center', to: 'mobile-node-staying' },
        { line: 'mobile-line-center-excursion', from: 'mobile-center', to: 'mobile-node-excursion' },
        { line: 'mobile-line-center-events', from: 'mobile-center', to: 'mobile-node-events' }
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
