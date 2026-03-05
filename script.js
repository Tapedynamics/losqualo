// Lo Squalo - Tenerife Experience
// Interactive Mind Map - Home Page

document.addEventListener('DOMContentLoaded', function() {
    convertLinesToPaths();
    initProgressiveMap();
    initDynamicLines();
    initMobileMenu();
});

let currentState = 'initial';

// ===== CONVERT LINE TO PATH =====
function convertLinesToPaths() {
    const svg = document.getElementById('svg-connections');
    if (!svg) return;
    svg.querySelectorAll('line').forEach(line => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.id = line.id;
        for (const cls of line.classList) {
            path.classList.add(cls);
        }
        if (line.dataset.category) path.dataset.category = line.dataset.category;
        line.parentNode.replaceChild(path, line);
    });
}

// ===== LINEE DINAMICHE SVG (curve) =====
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

let rafId = null;

function initDynamicLines() {
    updateAllLines();

    // Use ResizeObserver + rAF instead of setInterval
    const observer = new ResizeObserver(() => scheduleUpdate());
    observer.observe(document.querySelector('.mind-map') || document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    // Initial continuous updates for animations, then settle
    let frames = 0;
    function animLoop() {
        updateAllLines();
        frames++;
        if (frames < 120) requestAnimationFrame(animLoop); // 2 seconds of updates
    }
    requestAnimationFrame(animLoop);
}

function scheduleUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        updateAllLines();
        rafId = null;
    });
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

function drawCurve(pathId, fromId, toId) {
    const path = document.getElementById(pathId);
    if (!path) return;

    const from = getElementCenter(fromId);
    const to = getElementCenter(toId);
    if (!from || !to) return;

    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = dist * 0.12;

    // Perpendicular offset for gentle curve
    const nx = -dy / dist;
    const ny = dx / dist;
    const cpX = midX + nx * offset;
    const cpY = midY + ny * offset;

    path.setAttribute('d', `M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`);
}

function updateAllLines() {
    lineConnections.main.forEach(conn => {
        drawCurve(conn.line, conn.from, conn.to);
    });
}

// ===== MAPPA PROGRESSIVA =====
function initProgressiveMap() {
    const tenerife = document.getElementById('tenerife-trigger');
    const backBtn = document.getElementById('back-btn');

    tenerife.addEventListener('click', function() {
        if (currentState === 'initial') showCategories();
    });

    backBtn.addEventListener('click', goBack);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') goBack();
    });
}

function showCategories() {
    const mindMap = document.querySelector('.mind-map');
    mindMap.dataset.state = 'categories';
    currentState = 'categories';
    document.querySelectorAll('.main-line').forEach(line => line.classList.add('visible'));
    // Animate lines into position
    let frames = 0;
    function update() {
        updateAllLines();
        if (++frames < 30) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function goBack() {
    if (currentState === 'categories') {
        const mindMap = document.querySelector('.mind-map');
        mindMap.dataset.state = 'initial';
        currentState = 'initial';
        document.querySelectorAll('.main-line').forEach(line => line.classList.remove('visible'));
    }
}

// ===== MOBILE MINI-MAP =====
let mobileState = 'initial';

function initMobileMenu() {
    if (window.innerWidth <= 768) createMobileMiniMap();
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-map')) createMobileMiniMap();
        } else {
            const m = document.querySelector('.mobile-map');
            if (m) m.remove();
        }
    });
}

function createMobileMiniMap() {
    const main = document.querySelector('.mind-map');
    if (document.querySelector('.mobile-map')) return;

    const mobileMap = document.createElement('div');
    mobileMap.classList.add('mobile-map');
    mobileMap.dataset.state = 'initial';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('mobile-svg');
    svg.id = 'mobile-svg-connections';

    const categories = ['eventi', 'alloggio', 'escursioni', 'surfing', 'agency', 'alessandro'];
    categories.forEach(cat => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.classList.add('mobile-line', 'mobile-main-line');
        path.id = `mobile-line-center-${cat}`;
        svg.appendChild(path);
    });
    mobileMap.appendChild(svg);

    const center = document.createElement('div');
    center.classList.add('center-node-mobile');
    center.id = 'mobile-center';
    center.innerHTML = `
        <img src="tenerife.png" alt="Tenerife" class="tenerife-img-mobile">
        <span class="center-text-mobile">TENERIFE<br>EXPERIENCE</span>
        <span class="click-hint-mobile">Tocca per esplorare</span>
    `;
    mobileMap.appendChild(center);

    const positions = {
        eventi: { top: '22%', left: '25%' },
        alloggio: { top: '22%', left: '75%' },
        escursioni: { top: '50%', left: '12%' },
        surfing: { top: '50%', left: '88%' },
        agency: { top: '78%', left: '25%' },
        alessandro: { top: '78%', left: '75%' }
    };

    const nodes = [
        { id: 'eventi', name: 'EVENTI', cls: 'mobile-eventi', href: 'eventi.html' },
        { id: 'alloggio', name: 'ALLOGGIO', cls: 'mobile-alloggio', href: 'alloggio.html' },
        { id: 'escursioni', name: 'ESCURSIONI<br>& ATTIVITA', cls: 'mobile-escursioni', href: 'escursioni.html' },
        { id: 'surfing', name: 'SURFING<br>TENERIFE', cls: 'mobile-surfing', href: 'surfing.html' },
        { id: 'agency', name: 'AGENCY', cls: 'mobile-agency', href: 'agency.html' },
        { id: 'alessandro', name: 'ALESSANDRO', cls: 'mobile-alessandro', href: 'alessandro.html' }
    ];

    nodes.forEach(node => {
        const el = document.createElement('a');
        el.href = node.href;
        el.classList.add('mobile-node', 'mobile-node-primary', node.cls);
        el.id = `mobile-node-${node.id}`;
        el.innerHTML = `<span>${node.name}</span>`;
        el.style.top = positions[node.id].top;
        el.style.left = positions[node.id].left;
        mobileMap.appendChild(el);
    });

    const backBtn = document.createElement('button');
    backBtn.classList.add('mobile-back-btn');
    backBtn.innerHTML = '&larr; Indietro';
    mobileMap.appendChild(backBtn);

    main.parentNode.insertBefore(mobileMap, main.nextSibling);
    initMobileMapEvents(mobileMap);
    setTimeout(() => updateMobileLines(), 100);
}

function initMobileMapEvents(mobileMap) {
    const center = mobileMap.querySelector('.center-node-mobile');
    const backBtn = mobileMap.querySelector('.mobile-back-btn');

    center.addEventListener('click', function() {
        if (mobileState === 'initial') showMobileCategories(mobileMap);
    });

    backBtn.addEventListener('click', function() {
        goMobileBack(mobileMap);
    });
}

function showMobileCategories(mobileMap) {
    mobileMap.dataset.state = 'categories';
    mobileState = 'categories';
    mobileMap.querySelectorAll('.mobile-main-line').forEach(l => l.classList.add('visible'));
    // Animate lines
    let frames = 0;
    function update() {
        updateMobileLines();
        if (++frames < 20) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function goMobileBack(mobileMap) {
    if (mobileState === 'categories') {
        mobileMap.dataset.state = 'initial';
        mobileState = 'initial';
        mobileMap.querySelectorAll('.mobile-main-line').forEach(l => l.classList.remove('visible'));
    }
}

function updateMobileLines() {
    const svg = document.getElementById('mobile-svg-connections');
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();

    function getCenter(id) {
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - svgRect.left, y: r.top + r.height / 2 - svgRect.top };
    }

    const conns = [
        { path: 'mobile-line-center-eventi', from: 'mobile-center', to: 'mobile-node-eventi' },
        { path: 'mobile-line-center-alloggio', from: 'mobile-center', to: 'mobile-node-alloggio' },
        { path: 'mobile-line-center-escursioni', from: 'mobile-center', to: 'mobile-node-escursioni' },
        { path: 'mobile-line-center-surfing', from: 'mobile-center', to: 'mobile-node-surfing' },
        { path: 'mobile-line-center-agency', from: 'mobile-center', to: 'mobile-node-agency' },
        { path: 'mobile-line-center-alessandro', from: 'mobile-center', to: 'mobile-node-alessandro' }
    ];

    conns.forEach(c => {
        const p = document.getElementById(c.path);
        if (!p) return;
        const from = getCenter(c.from);
        const to = getCenter(c.to);
        if (!from || !to) return;

        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const offset = dist * 0.1;
        const nx = -dy / dist;
        const ny = dx / dist;
        p.setAttribute('d', `M ${from.x} ${from.y} Q ${midX + nx * offset} ${midY + ny * offset} ${to.x} ${to.y}`);
    });
}
