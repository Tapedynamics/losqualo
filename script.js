// Lo Squalo - Tenerife Experience
// Interactive Mind Map - Home Page (solo livello 1)

document.addEventListener('DOMContentLoaded', function() {
    initProgressiveMap();
    initDynamicLines();
    initMobileMenu();
});

// Stato corrente
let currentState = 'initial';

// ===== LINEE DINAMICHE SVG =====
const lineConnections = {
    main: [
        { line: 'line-tenerife-eventi', from: 'tenerife-trigger', to: 'node-eventi' },
        { line: 'line-tenerife-alloggio', from: 'tenerife-trigger', to: 'node-alloggio' },
        { line: 'line-tenerife-escursioni', from: 'tenerife-trigger', to: 'node-escursioni' },
        { line: 'line-tenerife-surfing', from: 'tenerife-trigger', to: 'node-surfing' },
        { line: 'line-tenerife-agency', from: 'tenerife-trigger', to: 'node-agency' },
        { line: 'line-tenerife-alessandro', from: 'tenerife-trigger', to: 'node-alessandro' }
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

function updateAllLines() {
    lineConnections.main.forEach(conn => {
        drawLine(conn.line, conn.from, conn.to);
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

    // Click su Tenerife -> mostra categorie
    tenerife.addEventListener('click', function() {
        if (currentState === 'initial') {
            showCategories();
        }
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

function goBack() {
    const mindMap = document.querySelector('.mind-map');

    if (currentState === 'categories') {
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
        eventi: { top: '22%', left: '25%' },
        alloggio: { top: '22%', left: '75%' },
        escursioni: { top: '50%', left: '12%' },
        surfing: { top: '50%', left: '88%' },
        agency: { top: '78%', left: '25%' },
        alessandro: { top: '78%', left: '75%' }
    };

    const primaryNodes = [
        { id: 'eventi', name: 'EVENTI', class: 'mobile-eventi', href: 'eventi.html' },
        { id: 'alloggio', name: 'ALLOGGIO', class: 'mobile-alloggio', href: 'alloggio.html' },
        { id: 'escursioni', name: 'ESCURSIONI<br>& ATTIVITÀ', class: 'mobile-escursioni', href: 'escursioni.html' },
        { id: 'surfing', name: 'SURFING<br>TENERIFE', class: 'mobile-surfing', href: 'surfing.html' },
        { id: 'agency', name: 'AGENCY', class: 'mobile-agency', href: 'agency.html' },
        { id: 'alessandro', name: 'ALESSANDRO', class: 'mobile-alessandro', href: 'alessandro.html' }
    ];

    primaryNodes.forEach(node => {
        const el = document.createElement('a');
        el.href = node.href;
        el.classList.add('mobile-node', 'mobile-node-primary', node.class);
        el.id = `mobile-node-${node.id}`;
        el.innerHTML = `<span>${node.name}</span>`;
        el.style.top = primaryPositions[node.id].top;
        el.style.left = primaryPositions[node.id].left;
        mobileMap.appendChild(el);
    });

    // Pulsante indietro
    const backBtn = document.createElement('button');
    backBtn.classList.add('mobile-back-btn');
    backBtn.innerHTML = '&larr; Indietro';
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
    const backBtn = mobileMap.querySelector('.mobile-back-btn');

    // Tap su Tenerife
    center.addEventListener('click', function() {
        if (mobileState === 'initial') {
            showMobileCategories(mobileMap);
        }
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
