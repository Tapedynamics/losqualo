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

// ===== MOBILE MINI-MAP =====
let mobileState = 'initial';
let mobileExpandedCategory = null;

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
        }
    });
}

function createMobileMiniMap() {
    const container = document.querySelector('.container');
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

    // Linee sub-categorie
    const subLines = {
        party: ['daytime', 'nightlife', 'hmc', 'terraceo', 'elbarco', 'finca'],
        food: ['aperitivo', 'brunch', 'ristorante'],
        staying: ['staying-villa', 'hotel', 'apartment'],
        excursion: ['action', 'chill'],
        events: ['private', 'artists', 'venue', 'boat', 'villa-private']
    };

    Object.keys(subLines).forEach(cat => {
        subLines[cat].forEach(sub => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.classList.add('mobile-line', 'mobile-sub-line');
            line.dataset.category = cat;
            line.id = `mobile-line-${cat}-${sub}`;
            svg.appendChild(line);
        });
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

    // Nodi primari - posizioni relative al centro
    const primaryPositions = {
        party: { top: '25%', left: '18%' },
        food: { top: '18%', left: '55%' },
        staying: { top: '40%', left: '82%' },
        excursion: { top: '75%', left: '70%' },
        events: { top: '75%', left: '25%' }
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
        el.style.transform = 'translate(-50%, -50%) scale(0.3)';
        mobileMap.appendChild(el);
    });

    // Sub-nodi per categoria
    const subNodeData = {
        party: {
            positions: [
                { id: 'daytime', name: 'Daytime<br>& Sunset', top: '12%', left: '8%', type: 'secondary', href: 'party.html#daytime' },
                { id: 'nightlife', name: 'Nightlife', top: '38%', left: '5%', type: 'secondary', href: 'party.html#nightlife' },
                { id: 'hmc', name: 'H.m.c.', top: '55%', left: '8%', type: 'secondary', href: 'party.html#hmc' },
                { id: 'terraceo', name: 'Terraceo', top: '5%', left: '22%', type: 'tertiary', href: 'party.html#terraceo' },
                { id: 'elbarco', name: 'El Barco', top: '8%', left: '35%', type: 'tertiary', href: 'party.html#elbarco' },
                { id: 'finca', name: 'Finca', top: '18%', left: '30%', type: 'tertiary', href: 'party.html#finca' }
            ]
        },
        food: {
            positions: [
                { id: 'aperitivo', name: 'Aperitivo', top: '5%', left: '42%', type: 'secondary', href: 'food-drink.html#aperitivo' },
                { id: 'brunch', name: 'Brunch', top: '5%', left: '58%', type: 'secondary', href: 'food-drink.html#brunch' },
                { id: 'ristorante', name: 'Ristorante', top: '12%', left: '72%', type: 'secondary', href: 'food-drink.html#ristorante' }
            ]
        },
        staying: {
            positions: [
                { id: 'staying-villa', name: 'Villa', top: '22%', left: '90%', type: 'secondary', href: 'staying.html#villa' },
                { id: 'hotel', name: 'Hotel', top: '38%', left: '95%', type: 'secondary', href: 'staying.html#hotel' },
                { id: 'apartment', name: 'Apartment', top: '55%', left: '92%', type: 'secondary', href: 'staying.html#apartment' }
            ]
        },
        excursion: {
            positions: [
                { id: 'action', name: 'Action', top: '88%', left: '60%', type: 'secondary', href: 'excursion.html#action' },
                { id: 'chill', name: 'Chill', top: '88%', left: '80%', type: 'secondary', href: 'excursion.html#chill' }
            ]
        },
        events: {
            positions: [
                { id: 'private', name: 'Private', top: '62%', left: '12%', type: 'secondary', href: 'events.html#private' },
                { id: 'artists', name: 'Artists<br>booking', top: '88%', left: '12%', type: 'secondary', href: 'events.html#artists' },
                { id: 'venue', name: 'Venue<br>& More', top: '88%', left: '38%', type: 'secondary', href: 'events.html#venue' },
                { id: 'boat', name: 'Boat', top: '55%', left: '5%', type: 'tertiary', href: 'events.html#boat' },
                { id: 'villa-private', name: 'Villa', top: '72%', left: '5%', type: 'tertiary', href: 'events.html#villa-private' }
            ]
        }
    };

    Object.keys(subNodeData).forEach(cat => {
        const subContainer = document.createElement('div');
        subContainer.classList.add('mobile-sub-nodes');
        subContainer.dataset.parent = cat;

        subNodeData[cat].positions.forEach(sub => {
            const el = document.createElement('a');
            el.href = sub.href;
            el.classList.add('mobile-node', `mobile-node-${sub.type}`, `mobile-${sub.id}`);
            el.id = `mobile-node-${sub.id}`;
            el.innerHTML = `<span>${sub.name}</span>`;
            el.style.top = sub.top;
            el.style.left = sub.left;
            el.style.transform = 'translate(-50%, -50%) scale(0.3)';
            subContainer.appendChild(el);
        });

        mobileMap.appendChild(subContainer);
    });

    // Pulsante indietro
    const backBtn = document.createElement('button');
    backBtn.classList.add('mobile-back-btn');
    backBtn.innerHTML = '← Indietro';
    mobileMap.appendChild(backBtn);

    main.parentNode.insertBefore(mobileMap, main.nextSibling);

    // Event listeners
    initMobileMapEvents(mobileMap);

    // Aggiorna linee
    setTimeout(() => updateMobileLines(), 100);
    setInterval(updateMobileLines, 100);
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

    // Tap su categorie
    primaryNodes.forEach(node => {
        node.addEventListener('click', function() {
            const category = this.dataset.category;

            if (mobileState === 'categories') {
                showMobileSubcategories(mobileMap, category);
                this.classList.add('expanded');
            } else if (mobileState === 'subcategories') {
                if (mobileExpandedCategory !== category) {
                    hideMobileCurrentSubcategories(mobileMap);
                    mobileMap.querySelectorAll('.mobile-node-primary').forEach(n => n.classList.remove('expanded'));

                    setTimeout(() => {
                        showMobileSubcategories(mobileMap, category);
                        this.classList.add('expanded');
                    }, 200);
                }
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

function showMobileSubcategories(mobileMap, category) {
    mobileMap.dataset.state = 'subcategories';
    mobileState = 'subcategories';
    mobileExpandedCategory = category;

    const subNodes = mobileMap.querySelector(`.mobile-sub-nodes[data-parent="${category}"]`);
    if (subNodes) subNodes.classList.add('visible');

    // Mostra linee della categoria
    mobileMap.querySelectorAll(`.mobile-sub-line[data-category="${category}"]`).forEach(line => {
        line.classList.add('visible');
    });
}

function hideMobileCurrentSubcategories(mobileMap) {
    if (mobileExpandedCategory) {
        const subNodes = mobileMap.querySelector(`.mobile-sub-nodes[data-parent="${mobileExpandedCategory}"]`);
        if (subNodes) subNodes.classList.remove('visible');

        mobileMap.querySelectorAll(`.mobile-sub-line[data-category="${mobileExpandedCategory}"]`).forEach(line => {
            line.classList.remove('visible');
        });
    }
}

function goMobileBack(mobileMap) {
    if (mobileState === 'subcategories') {
        hideMobileCurrentSubcategories(mobileMap);
        mobileMap.querySelectorAll('.mobile-node-primary').forEach(n => n.classList.remove('expanded'));
        mobileMap.dataset.state = 'categories';
        mobileState = 'categories';
        mobileExpandedCategory = null;
    } else if (mobileState === 'categories') {
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

    // Linee sub-categorie
    const subConnections = {
        party: [
            { line: 'mobile-line-party-daytime', from: 'mobile-node-party', to: 'mobile-node-daytime' },
            { line: 'mobile-line-party-nightlife', from: 'mobile-node-party', to: 'mobile-node-nightlife' },
            { line: 'mobile-line-party-hmc', from: 'mobile-node-party', to: 'mobile-node-hmc' },
            { line: 'mobile-line-party-terraceo', from: 'mobile-node-daytime', to: 'mobile-node-terraceo' },
            { line: 'mobile-line-party-elbarco', from: 'mobile-node-daytime', to: 'mobile-node-elbarco' },
            { line: 'mobile-line-party-finca', from: 'mobile-node-daytime', to: 'mobile-node-finca' }
        ],
        food: [
            { line: 'mobile-line-food-aperitivo', from: 'mobile-node-food', to: 'mobile-node-aperitivo' },
            { line: 'mobile-line-food-brunch', from: 'mobile-node-food', to: 'mobile-node-brunch' },
            { line: 'mobile-line-food-ristorante', from: 'mobile-node-food', to: 'mobile-node-ristorante' }
        ],
        staying: [
            { line: 'mobile-line-staying-staying-villa', from: 'mobile-node-staying', to: 'mobile-node-staying-villa' },
            { line: 'mobile-line-staying-hotel', from: 'mobile-node-staying', to: 'mobile-node-hotel' },
            { line: 'mobile-line-staying-apartment', from: 'mobile-node-staying', to: 'mobile-node-apartment' }
        ],
        excursion: [
            { line: 'mobile-line-excursion-action', from: 'mobile-node-excursion', to: 'mobile-node-action' },
            { line: 'mobile-line-excursion-chill', from: 'mobile-node-excursion', to: 'mobile-node-chill' }
        ],
        events: [
            { line: 'mobile-line-events-private', from: 'mobile-node-events', to: 'mobile-node-private' },
            { line: 'mobile-line-events-artists', from: 'mobile-node-events', to: 'mobile-node-artists' },
            { line: 'mobile-line-events-venue', from: 'mobile-node-events', to: 'mobile-node-venue' },
            { line: 'mobile-line-events-boat', from: 'mobile-node-private', to: 'mobile-node-boat' },
            { line: 'mobile-line-events-villa-private', from: 'mobile-node-private', to: 'mobile-node-villa-private' }
        ]
    };

    Object.keys(subConnections).forEach(cat => {
        subConnections[cat].forEach(conn => {
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
    });
}
