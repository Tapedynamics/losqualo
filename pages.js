// Lo Squalo - Pagine Categoria (Livello 2)
// Mini Mind Map per ogni categoria

document.addEventListener('DOMContentLoaded', function() {
    convertLinesToPaths();
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

// ===== MEMORIA NAVIGAZIONE (back da prodotto torna alla sub) =====
function getMacroKey() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return 'losqualo_lastSub_' + path.replace('.html', '');
}
function rememberSub(category) {
    try { sessionStorage.setItem(getMacroKey(), category); } catch (e) {}
}
function recallSub() {
    try { return sessionStorage.getItem(getMacroKey()); } catch (e) { return null; }
}
function clearSub() {
    try { sessionStorage.removeItem(getMacroKey()); } catch (e) {}
}

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

// ===== CONFIGURAZIONE LINEE PER PAGINA =====
const pageLineConfig = {
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
            { line: 'line-appartamento-loscristianos', from: 'node-appartamento', to: 'node-loscristianos' },
            { line: 'line-appartamento-penthouse', from: 'node-appartamento', to: 'node-penthouse' }
        ],
        ostello: [
            { line: 'line-ostello-gotademar', from: 'node-ostello', to: 'node-gotademar' }
        ],
        rurale: [
            { line: 'line-rurale-cueva', from: 'node-rurale', to: 'node-cueva' },
            { line: 'line-rurale-dome', from: 'node-rurale', to: 'node-dome' },
            { line: 'line-rurale-hotelrural', from: 'node-rurale', to: 'node-hotelrural' },
            { line: 'line-rurale-chimiche', from: 'node-rurale', to: 'node-chimiche' }
        ],
        surfhouse: [
            { line: 'line-surfhouse-luxury', from: 'node-surfhouse', to: 'node-surfhouse-luxury' },
            { line: 'line-surfhouse-rurale', from: 'node-surfhouse', to: 'node-surfhouse-rurale' }
        ],
        villa: [
            { line: 'line-villa-beachhouse', from: 'node-villa', to: 'node-beachhouse' },
            { line: 'line-villa-atogo', from: 'node-villa', to: 'node-atogo' },
            { line: 'line-villa-taucho', from: 'node-villa', to: 'node-taucho' },
            { line: 'line-villa-fortaleza', from: 'node-villa', to: 'node-fortaleza' },
            { line: 'line-villa-playaparaiso', from: 'node-villa', to: 'node-playaparaiso' },
            { line: 'line-villa-ciguaña', from: 'node-villa', to: 'node-ciguaña' },
            { line: 'line-villa-duque', from: 'node-villa', to: 'node-duque' },
            { line: 'line-villa-fincaplayaparaiso', from: 'node-villa', to: 'node-fincaplayaparaiso' }
        ]
    },
    escursioni: {
        main: [
            { line: 'line-center-teide', from: 'category-trigger', to: 'node-teide' },
            { line: 'line-center-oceano', from: 'category-trigger', to: 'node-oceano' },
            { line: 'line-center-sky', from: 'category-trigger', to: 'node-sky' },
            { line: 'line-center-fooddrink', from: 'category-trigger', to: 'node-fooddrink' }
        ],
        teide: [
            { line: 'line-teide-jeep', from: 'node-teide', to: 'node-jeep' },
            { line: 'line-teide-stargazing', from: 'node-teide', to: 'node-stargazing' },
            { line: 'line-teide-quad', from: 'node-teide', to: 'node-quad' },
            { line: 'line-teide-buggy', from: 'node-teide', to: 'node-buggy' }
        ],
        oceano: [
            { line: 'line-oceano-jetcar', from: 'node-oceano', to: 'node-jetcar' },
            { line: 'line-oceano-jetsky', from: 'node-oceano', to: 'node-jetsky' },
            { line: 'line-oceano-cetacei', from: 'node-oceano', to: 'node-cetacei' },
            { line: 'line-oceano-kayak', from: 'node-oceano', to: 'node-kayak' },
            { line: 'line-oceano-surf', from: 'node-oceano', to: 'node-surf' },
            { line: 'line-oceano-diving', from: 'node-oceano', to: 'node-diving' },
            { line: 'line-oceano-kite', from: 'node-oceano', to: 'node-kite' },
            { line: 'line-oceano-wind', from: 'node-oceano', to: 'node-wind' },
            { line: 'line-oceano-fishing', from: 'node-oceano', to: 'node-fishing' },
            { line: 'line-oceano-yacht', from: 'node-oceano', to: 'node-yacht' },
            { line: 'line-oceano-barco', from: 'node-oceano', to: 'node-barco' },
            { line: 'line-oceano-catamarano', from: 'node-oceano', to: 'node-catamarano' }
        ],
        sky: [
            { line: 'line-sky-parapente', from: 'node-sky', to: 'node-parapente' },
            { line: 'line-sky-paratrike', from: 'node-sky', to: 'node-paratrike' }
        ],
        fooddrink: [
            { line: 'line-fooddrink-bodegas', from: 'node-fooddrink', to: 'node-bodegas' },
            { line: 'line-fooddrink-guacinches', from: 'node-fooddrink', to: 'node-guacinches' },
            { line: 'line-fooddrink-cocktailbar', from: 'node-fooddrink', to: 'node-cocktailbar' },
            { line: 'line-fooddrink-cucinatipica', from: 'node-fooddrink', to: 'node-cucinatipica' },
            { line: 'line-fooddrink-italiana', from: 'node-fooddrink', to: 'node-italiana' },
            { line: 'line-fooddrink-mediterranea', from: 'node-fooddrink', to: 'node-mediterranea' },
            { line: 'line-fooddrink-surfbar', from: 'node-fooddrink', to: 'node-surfbar-food' }
        ]
    },
    surfing: {
        main: [
            { line: 'line-center-surfbar', from: 'category-trigger', to: 'node-surfbar' },
            { line: 'line-center-surfhouse', from: 'category-trigger', to: 'node-surfhouse' },
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
    }
};

function getCurrentPage() {
    const body = document.body;
    if (body.classList.contains('page-alloggio')) return 'alloggio';
    if (body.classList.contains('page-escursioni')) return 'escursioni';
    if (body.classList.contains('page-surfing')) return 'surfing';
    if (body.classList.contains('page-agency')) return 'agency';
    return null;
}

// ===== LINEE DINAMICHE (curve) =====
let rafId = null;

function initPageLines() {
    updatePageLines();

    const observer = new ResizeObserver(() => scheduleUpdate());
    observer.observe(document.querySelector('.page-map') || document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('load', scheduleUpdate);
    window.addEventListener('resize', scheduleUpdate);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => scheduleUpdate());
    }

    // Initial continuous updates for animations, then settle
    let frames = 0;
    function animLoop() {
        updatePageLines();
        frames++;
        if (frames < 180) requestAnimationFrame(animLoop);
    }
    requestAnimationFrame(animLoop);
}

function scheduleUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
        updatePageLines();
        rafId = null;
    });
}

// Per il centro categoria usa l'icona, non il bounding box (che include click-hint sotto)
function getVisualEl(el) {
    if (!el) return null;
    if (el.id === 'category-trigger') return el.querySelector('.category-icon') || el;
    return el;
}

function getElementCenter(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return null;
    const vis = getVisualEl(el);
    const rect = vis.getBoundingClientRect();
    const svg = document.getElementById('svg-connections');
    if (!svg) return null;
    const svgRect = svg.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top,
        radius: Math.min(rect.width, rect.height) / 2
    };
}

function drawCurve(pathId, fromId, toId) {
    const path = document.getElementById(pathId);
    if (!path) return;

    const from = getElementCenter(fromId);
    const to = getElementCenter(toId);
    if (!from || !to) return;

    // Termina sul BORDO del cerchio (non passa sopra ai nodi)
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;
    const startX = from.x + ux * from.radius;
    const startY = from.y + uy * from.radius;
    const endX = to.x - ux * to.radius;
    const endY = to.y - uy * to.radius;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const newDx = endX - startX;
    const newDy = endY - startY;
    const newDist = Math.sqrt(newDx * newDx + newDy * newDy) || 1;
    const offset = newDist * 0.12;

    const nx = -newDy / newDist;
    const ny = newDx / newDist;
    const cpX = midX + nx * offset;
    const cpY = midY + ny * offset;

    const r = (n) => Math.round(n * 100) / 100;
    path.setAttribute('d', `M ${r(startX)} ${r(startY)} Q ${r(cpX)} ${r(cpY)} ${r(endX)} ${r(endY)}`);
}

function syncSvgViewBox() {
    const svg = document.getElementById('svg-connections');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('preserveAspectRatio', 'none');
}

function updatePageLines() {
    syncSvgViewBox();
    const currentPage = getCurrentPage();
    if (!currentPage || !pageLineConfig[currentPage]) return;

    const config = pageLineConfig[currentPage];

    // Linee principali
    if (config.main) {
        config.main.forEach(conn => {
            drawCurve(conn.line, conn.from, conn.to);
        });
    }

    // Linee sotto-categorie
    Object.keys(config).forEach(category => {
        if (category !== 'main') {
            config[category].forEach(conn => {
                drawCurve(conn.line, conn.from, conn.to);
            });
        }
    });
}

// ===== NAVIGAZIONE PAGE MAP =====
function initPageMap() {
    const pageMap = document.querySelector('.page-map');
    if (!pageMap) return;

    const categoryTrigger = document.getElementById('category-trigger');
    const backBtn = document.getElementById('back-btn');
    if (!categoryTrigger || !backBtn) return;
    const primaryNodes = document.querySelectorAll('.node-primary');

    // Click sul centro
    categoryTrigger.addEventListener('click', function() {
        if (pageState === 'initial') {
            showPageCategories();
        }
    });

    // Click sulle sotto-categorie
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

    backBtn.addEventListener('click', function() {
        goPageBack();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goPageBack();
        }
    });

    // Memorizza sub di provenienza quando si clicca su un prodotto (livello 3)
    document.querySelectorAll('.node-secondary').forEach(link => {
        link.addEventListener('click', function() {
            const parent = this.closest('.sub-nodes');
            if (parent && parent.dataset.parent) {
                rememberSub(parent.dataset.parent);
            }
        });
    });

    // Al caricamento: se c'e' una sub memorizzata, espandila automaticamente
    const lastSub = recallSub();
    if (lastSub) {
        const targetNode = document.querySelector(`.node-primary[data-category="${lastSub}"]`);
        if (targetNode) {
            // Salta direttamente a subcategories senza transition intermedia
            setTimeout(() => {
                showPageSubcategories(lastSub);
                targetNode.classList.add('expanded');
            }, 50);
        }
    }
}

function showPageCategories() {
    const pageMap = document.querySelector('.page-map');
    pageMap.dataset.state = 'categories';
    pageState = 'categories';

    document.querySelectorAll('.main-line').forEach(line => {
        line.classList.add('visible');
    });

    // Animate lines into position
    let frames = 0;
    function update() {
        updatePageLines();
        if (++frames < 30) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function showPageSubcategories(category) {
    const pageMap = document.querySelector('.page-map');
    pageMap.dataset.state = 'subcategories';
    pageState = 'subcategories';
    expandedSubcategory = category;

    pageMap.classList.add('sub-centered');
    document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('active-center'));
    const activeNode = document.querySelector(`.node-primary[data-category="${category}"]`);
    if (activeNode) activeNode.classList.add('active-center');

    const subNodes = document.querySelector(`.sub-nodes[data-parent="${category}"]`);
    if (subNodes) {
        subNodes.classList.add('visible');
        positionProductsRadially(subNodes);
    }

    document.querySelectorAll(`.sub-line[data-category="${category}"]`).forEach(line => {
        line.classList.add('visible');
    });

    // Staggered sub-node delays go up to ~1.3s — keep redrawing until everything settles
    let frames = 0;
    function update() {
        updatePageLines();
        if (++frames < 120) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);

    const animated = [activeNode, ...(subNodes ? subNodes.querySelectorAll('.node-secondary') : [])];
    animated.forEach(el => {
        if (!el) return;
        const handler = (e) => {
            if (e.propertyName === 'top' || e.propertyName === 'left' || e.propertyName === 'transform') {
                scheduleUpdate();
            }
        };
        el.addEventListener('transitionend', handler);
        // Prevent listener leak if user never re-triggers a transition
        setTimeout(() => el.removeEventListener('transitionend', handler), 2000);
    });
    setTimeout(updatePageLines, 1400);
}

function hideCurrentPageSubcategories() {
    if (expandedSubcategory) {
        const subNodes = document.querySelector(`.sub-nodes[data-parent="${expandedSubcategory}"]`);
        if (subNodes) {
            subNodes.classList.remove('visible');
            resetProductsRadial(subNodes);
        }

        document.querySelectorAll(`.sub-line[data-category="${expandedSubcategory}"]`).forEach(line => {
            line.classList.remove('visible');
        });
    }
    const pageMap = document.querySelector('.page-map');
    if (pageMap) pageMap.classList.remove('sub-centered');
    document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('active-center'));
}

function positionProductsRadially(subNodes) {
    const children = subNodes.querySelectorAll('.node-secondary');
    const N = children.length;
    if (!N) return;
    const radius = N <= 4 ? 28 : 32; // %
    children.forEach((el, i) => {
        const angle = (2 * Math.PI * i / N) - Math.PI / 2;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        el.style.setProperty('top', y + '%', 'important');
        el.style.setProperty('left', x + '%', 'important');
        el.style.setProperty('right', 'auto', 'important');
        el.style.setProperty('bottom', 'auto', 'important');
        el.style.setProperty('transform', 'translate(-50%, -50%) scale(1)', 'important');
    });
}

function resetProductsRadial(subNodes) {
    const children = subNodes.querySelectorAll('.node-secondary');
    children.forEach(el => {
        el.style.removeProperty('top');
        el.style.removeProperty('left');
        el.style.removeProperty('right');
        el.style.removeProperty('bottom');
        el.style.removeProperty('transform');
    });
}

function goPageBack() {
    const pageMap = document.querySelector('.page-map');

    if (pageState === 'subcategories') {
        hideCurrentPageSubcategories();
        document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));
        pageMap.dataset.state = 'categories';
        pageState = 'categories';
        expandedSubcategory = null;
        clearSub();
    } else if (pageState === 'categories') {
        clearSub();
        window.location.href = 'index.html?explore=1';
    }
}

// ===== MOBILE PAGE MENU =====
let mobilePageState = 'categories';

// Dati per popup radiale mobile per pagina
const pageSubNodesData = {
    alloggio: {
        appartamento: {
            name: 'Appartamento',
            class: 'radial-appartamento',
            subs: [
                { id: 'alcala', name: 'Alcala', href: 'alloggio/alcala.html' },
                { id: 'lasamericas', name: 'Studio Las Americas', href: 'alloggio/studio-las-americas.html' },
                { id: 'loscristianos', name: 'Studio Los Cristianos', href: 'alloggio/studio-los-cristianos.html' },
                { id: 'penthouse', name: 'Penthouse Los Cristianos', href: 'alloggio/penthouse-los-cristianos.html' }
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
                { id: 'hotelrural', name: 'Hotel Rural', href: 'alloggio/hotel-rural-arona.html' },
                { id: 'chimiche', name: 'Finca Chimiche', href: 'alloggio/finca-chimiche.html' }
            ]
        },
        surfhouse: {
            name: 'Surf House',
            class: 'radial-surfhouse',
            subs: [
                { id: 'surfhouse-luxury', name: 'Surf House Luxury', href: 'alloggio/surf-house-luxury.html' },
                { id: 'surfhouse-rurale', name: 'Surf House Rurale', href: 'alloggio/surf-house-rurale.html' }
            ]
        },
        villa: {
            name: 'Villa y<br>Casa Rural',
            class: 'radial-villa',
            subs: [
                { id: 'beachhouse', name: 'Beach House', href: 'alloggio/beach-house.html' },
                { id: 'atogo', name: 'Casa Rural Atogo', href: 'alloggio/casa-rural-atogo.html' },
                { id: 'taucho', name: 'Casa Rural Taucho', href: 'alloggio/casa-rural-taucho.html' },
                { id: 'fortaleza', name: 'Finca La Fortaleza', href: 'alloggio/finca-la-fortaleza.html' },
                { id: 'playaparaiso', name: 'Villa Playa Paraiso', href: 'alloggio/villa-playa-paraiso.html' },
                { id: 'ciguaña', name: 'Finca Ciguaña', href: 'alloggio/finca-ciguaña.html' },
                { id: 'duque', name: 'Villa Duque', href: 'alloggio/villa-duque.html' },
                { id: 'fincaplayaparaiso', name: 'Finca Playa Paraíso', href: 'alloggio/finca-playa-paraiso.html' }
            ]
        }
    },
    escursioni: {
        teide: {
            name: 'Terra',
            class: 'radial-teide',
            subs: [
                { id: 'jeep', name: 'Jeep Experience', href: 'escursioni/jeep-experience.html' },
                { id: 'quad', name: 'Quad', href: 'escursioni/quad.html' },
                { id: 'buggy', name: 'Buggy', href: 'escursioni/buggy.html' },
                { id: 'stargazing', name: 'Stargazing', href: '#', disabled: true }
            ]
        },
        oceano: {
            name: 'Oceano',
            class: 'radial-oceano',
            subs: [
                { id: 'jetcar', name: 'Jet Car', href: '#jetcar' },
                { id: 'jetsky', name: 'Jet Sky', href: '#jetsky' },
                { id: 'cetacei', name: 'Balene', href: '#cetacei' },
                { id: 'kayak', name: 'Kayak', href: '#kayak' },
                { id: 'surf', name: 'Surf', href: 'surfing/ika-ika.html' },
                { id: 'diving', name: 'Diving', href: '#diving' },
                { id: 'kite', name: 'Kite', href: '#kite' },
                { id: 'wind', name: 'Wind', href: '#wind' },
                { id: 'fishing', name: 'Fishing', href: '#fishing' },
                { id: 'yacht', name: 'Yacht Privato', href: 'escursioni/yacht.html' },
                { id: 'barco', name: 'Barco sin Pilota', href: 'escursioni/barco-sin-pilota.html' },
                { id: 'catamarano', name: 'Catamarano', href: 'escursioni/catamarano.html' }
            ]
        },
        sky: {
            name: 'Aria',
            class: 'radial-sky',
            subs: [
                { id: 'parapente', name: 'Parapendio', href: 'escursioni/parapendio.html' },
                { id: 'paratrike', name: 'Paratrike', href: 'escursioni/paratrike.html' }
            ]
        },
        fooddrink: {
            name: 'Food & Drink',
            class: 'radial-fooddrink',
            subs: [
                { id: 'bodegas', name: 'Bodegas', href: '#bodegas' },
                { id: 'guacinches', name: 'Guacinches', href: '#guacinches' },
                { id: 'cocktailbar', name: 'Cocktail Bar', href: '#cocktailbar' },
                { id: 'cucinatipica', name: 'Cucina Tipica', href: '#cucinatipica' },
                { id: 'italiana', name: 'Italiana', href: '#italiana' },
                { id: 'mediterranea', name: 'Mediterranea', href: '#mediterranea' },
                { id: 'surfbar-food', name: 'Surf Bar', href: '#surfbar-food' }
            ]
        }
    },
    surfing: {
        surfhouse: {
            name: 'Surf House',
            class: 'radial-surfhouse',
            subs: [
                { id: 'b2b', name: 'B2B', href: 'surfing/surf-house-b2b.html' },
                { id: 'surfcamp', name: 'Surf Camp', href: 'surfing/surf-camp.html' },
                { id: 'reservacama', name: 'Reserva Cama', href: 'alloggio/gota-de-mar.html' },
                { id: 'reservahab', name: 'Reserva Habitacion', href: 'alloggio/surf-house-rurale.html' },
                { id: 'gallery', name: 'Gallery', href: '#gallery' }
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
            const mobileMap = document.querySelector('.mobile-page-map');
            if (mobileMap) {
                setTimeout(() => updateMobileLines(mobileMap), 100);
            }
        } else {
            const mobileMap = document.querySelector('.mobile-page-map');
            if (mobileMap) mobileMap.remove();
        }
    });
}

function createMobilePageMap() {
    const main = document.querySelector('.page-map');
    if (!main) return;

    const currentPage = getCurrentPage();
    if (!currentPage) return;

    if (document.querySelector('.mobile-page-map')) return;

    const mobileMap = document.createElement('div');
    mobileMap.classList.add('mobile-page-map');
    mobileMap.dataset.state = 'categories';

    const categoryInfo = {
        alloggio: { name: 'ALLOGGIO', class: 'alloggio-bg' },
        escursioni: { name: 'ESCURSIONI<br>& ATTIVITA', class: 'escursioni-bg' },
        surfing: { name: 'SURFING<br>TENERIFE', class: 'surfing-bg' },
        agency: { name: 'AGENCY', class: 'agency-bg' }
    };

    const info = categoryInfo[currentPage];

    const center = document.createElement('div');
    center.classList.add('category-center-mobile');
    center.id = 'mobile-category-center';
    center.innerHTML = `
        <div class="category-icon-mobile ${info.class}">
            <span>${info.name}</span>
        </div>
    `;
    mobileMap.appendChild(center);

    const subcatPositions = getSubcategoryPositions(currentPage);
    const subcatNodes = getSubcategoryNodes(currentPage);

    subcatNodes.forEach((node, index) => {
        const el = document.createElement(node.href ? 'a' : 'div');
        if (node.href) {
            el.href = node.href;
            if (/^https?:/.test(node.href)) { el.target = '_blank'; el.rel = 'noopener'; }
        }
        el.classList.add('mobile-node', 'mobile-node-primary', node.class);
        if (node.disabled) el.classList.add('disabled-node');
        el.id = `mobile-node-${node.id}`;
        el.dataset.category = node.id;
        el.innerHTML = `<span>${node.name}</span>`;
        el.style.top = subcatPositions[index].top;
        el.style.left = subcatPositions[index].left;
        mobileMap.appendChild(el);
    });

    const backBtn = document.createElement('button');
    backBtn.classList.add('mobile-back-btn');
    backBtn.innerHTML = '&larr; Indietro';
    mobileMap.appendChild(backBtn);

    main.parentNode.insertBefore(mobileMap, main.nextSibling);

    // Create SVG with path elements (not line)
    createMobileSVGLines(mobileMap, subcatNodes.length);
    createPageRadialOverlay();
    initMobilePageEvents(mobileMap, currentPage);

    setTimeout(() => updateMobileLines(mobileMap), 100);

    // Animate mobile lines on load
    let frames = 0;
    function animLoop() {
        updateMobileLines(mobileMap);
        frames++;
        if (frames < 60) requestAnimationFrame(animLoop);
    }
    requestAnimationFrame(animLoop);

    // Se torniamo da una pagina prodotto, riapri il popup della sub di provenienza
    const lastSubMobile = recallSub();
    if (lastSubMobile) {
        setTimeout(() => openPageRadialPopup(currentPage, lastSubMobile), 300);
    }
}

function createMobileSVGLines(mobileMap, nodeCount) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('mobile-connections');
    svg.id = 'mobile-svg-connections';

    for (let i = 0; i < nodeCount; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.classList.add('mobile-line');
        path.id = `mobile-line-${i}`;
        svg.appendChild(path);
    }

    mobileMap.insertBefore(svg, mobileMap.firstChild);
}

function updateMobileLines(mobileMap) {
    const svg = mobileMap.querySelector('.mobile-connections');
    if (!svg) return;

    const center = mobileMap.querySelector('.category-center-mobile');
    const nodes = mobileMap.querySelectorAll('.mobile-node-primary');

    if (!center) return;

    const svgRect = svg.getBoundingClientRect();
    // Usa l'icona della categoria, non il bounding box completo
    const centerVis = center.querySelector('.category-icon-mobile') || center;
    const centerRect = centerVis.getBoundingClientRect();
    const centerX = centerRect.left + centerRect.width / 2 - svgRect.left;
    const centerY = centerRect.top + centerRect.height / 2 - svgRect.top;
    const centerRadius = Math.min(centerRect.width, centerRect.height) / 2;

    nodes.forEach((node, index) => {
        const path = svg.querySelector(`#mobile-line-${index}`);
        if (!path) return;

        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left + nodeRect.width / 2 - svgRect.left;
        const nodeY = nodeRect.top + nodeRect.height / 2 - svgRect.top;
        const nodeRadius = Math.min(nodeRect.width, nodeRect.height) / 2;

        const dx = nodeX - centerX;
        const dy = nodeY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const sx = centerX + ux * centerRadius;
        const sy = centerY + uy * centerRadius;
        const ex = nodeX - ux * nodeRadius;
        const ey = nodeY - uy * nodeRadius;

        const midX = (sx + ex) / 2;
        const midY = (sy + ey) / 2;
        const newDist = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2) || 1;
        const offset = newDist * 0.1;
        const nx = -(ey - sy) / newDist;
        const ny = (ex - sx) / newDist;
        path.setAttribute('d', `M ${sx} ${sy} Q ${midX + nx * offset} ${midY + ny * offset} ${ex} ${ey}`);
    });
}

function getSubcategoryPositions(page) {
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
        case 'agency':
            return positions4;
        case 'alloggio':
        case 'escursioni':
        case 'surfing':
            return positions6;
        default:
            return positions4;
    }
}

function getSubcategoryNodes(page) {
    const nodes = {
        alloggio: [
            { id: 'appartamento', name: 'Appartamento', class: 'mobile-appartamento' },
            { id: 'ostello', name: 'Ostello', class: 'mobile-ostello', href: 'alloggio/gota-de-mar.html' },
            { id: 'rurale', name: 'Rurale<br>Glamping', class: 'mobile-rurale' },
            { id: 'surfhouse', name: 'Surf House', class: 'mobile-surfhouse-alloggio' },
            { id: 'villa', name: 'Villa y<br>Casa Rural', class: 'mobile-villa' }
        ],
        escursioni: [
            { id: 'teide', name: 'Terra', class: 'mobile-teide' },
            { id: 'oceano', name: 'Oceano', class: 'mobile-oceano' },
            { id: 'sky', name: 'Aria', class: 'mobile-sky' },
            { id: 'fooddrink', name: 'Food & Drink', class: 'mobile-fooddrink' }
        ],
        surfing: [
            { id: 'surfbar', name: 'Surfbar<br>Franchise', class: 'mobile-surfbar', href: 'surfing/surf-bar-franchise.html' },
            { id: 'surfhouse', name: 'Surf House', class: 'mobile-surfhouse' },
            { id: 'spots', name: 'Surf Spots', class: 'mobile-spots', href: 'surfing/spots.html' },
            { id: 'callemexico', name: 'Calle Mexico', class: 'mobile-callemexico', href: 'https://t.mtrbio.com/callemexicotenerife' },
            { id: 'school', name: 'School', class: 'mobile-school', href: 'surfing/ika-ika.html' }
        ],
        agency: [
            { id: 'smm', name: 'SMM &<br>Marketing', class: 'mobile-smm' },
            { id: 'grafic', name: 'Grafic<br>Design', class: 'mobile-grafic' },
            { id: 'artists', name: 'Artists<br>Management', class: 'mobile-artists' },
            { id: 'start', name: 'Start<br>Business', class: 'mobile-start' }
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
        node.href = sub.disabled ? '#' : sub.href;
        node.classList.add('radial-node');
        if (sub.disabled) node.classList.add('disabled-node');
        node.innerHTML = `<span>${sub.name}</span>`;
        node.style.top = `${y}%`;
        node.style.left = `${x}%`;
        if (!sub.disabled) {
            node.addEventListener('click', function() {
                rememberSub(category);
            });
        }
        popup.appendChild(node);
    });

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('radial-close');
    closeBtn.innerHTML = '&larr; Indietro';
    closeBtn.addEventListener('click', closePageRadialPopup);
    popup.appendChild(closeBtn);

    overlay.classList.add('visible');
}

function closePageRadialPopup() {
    const overlay = document.getElementById('radial-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
    }
    clearSub();
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
        node.addEventListener('click', function(e) {
            // Se ha un href reale (link diretto), lascia che il browser navighi
            if (this.tagName === 'A' && this.getAttribute('href')) return;
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
        window.location.href = 'index.html?explore=1';
    }
}
