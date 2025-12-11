// Lo Squalo - Tenerife Experience
// Interactive 3D Mind Map

document.addEventListener('DOMContentLoaded', function() {
    initProgressiveMap();
    initParallax3D();
    initMobileMenu();
});

// Stato corrente
let currentState = 'initial';
let expandedCategory = null;

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
}

function showSubcategories(category) {
    const mindMap = document.querySelector('.mind-map');
    mindMap.dataset.state = 'subcategories';
    currentState = 'subcategories';
    expandedCategory = category;

    const subNodes = document.querySelector(`.sub-nodes[data-parent="${category}"]`);
    if (subNodes) subNodes.classList.add('visible');

    const subLines = document.querySelector(`.sub-lines[data-category="${category}"]`);
    if (subLines) subLines.classList.add('visible');
}

function hideCurrentSubcategories() {
    if (expandedCategory) {
        const subNodes = document.querySelector(`.sub-nodes[data-parent="${expandedCategory}"]`);
        if (subNodes) subNodes.classList.remove('visible');

        const subLines = document.querySelector(`.sub-lines[data-category="${expandedCategory}"]`);
        if (subLines) subLines.classList.remove('visible');
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
    }
}

// ===== PARALLAX 3D =====
function initParallax3D() {
    const scene = document.querySelector('.scene-3d');
    const floatingElements = document.querySelectorAll('.floating-3d');

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth <= 768) return;

        // Normalizza la posizione del mouse (-1 a 1)
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animazione fluida con requestAnimationFrame
    function animate() {
        // Lerp per movimento fluido
        targetX += (mouseX - targetX) * 0.08;
        targetY += (mouseY - targetY) * 0.08;

        // Applica rotazione alla scena 3D
        if (scene) {
            const rotateX = targetY * 8; // Inclinazione verticale
            const rotateY = targetX * 12; // Inclinazione orizzontale

            scene.style.transform = `
                rotateX(${-rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        }

        // Parallax individuale sugli elementi basato sulla profondità
        floatingElements.forEach(el => {
            const depth = parseInt(el.dataset.depth) || 1;
            const intensity = depth * 5;

            const moveX = targetX * intensity;
            const moveY = targetY * intensity;
            const moveZ = Math.abs(targetX + targetY) * depth * 3;

            // Aggiungi movimento parallax senza sovrascrivere le animazioni
            el.style.setProperty('--parallax-x', `${moveX}px`);
            el.style.setProperty('--parallax-y', `${moveY}px`);
            el.style.setProperty('--parallax-z', `${moveZ}px`);
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Aggiungi stili per il parallax
    const parallaxStyles = document.createElement('style');
    parallaxStyles.textContent = `
        .floating-3d {
            transform:
                translateX(var(--parallax-x, 0))
                translateY(var(--parallax-y, 0))
                translateZ(var(--parallax-z, 0));
        }
    `;
    document.head.appendChild(parallaxStyles);
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu')) {
                createMobileMenu();
            }
        } else {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) mobileMenu.remove();
        }
    });
}

function createMobileMenu() {
    const container = document.querySelector('.container');
    const main = document.querySelector('.mind-map');

    if (document.querySelector('.mobile-menu')) return;

    const mobileMenu = document.createElement('nav');
    mobileMenu.classList.add('mobile-menu');

    // Logo Tenerife mobile
    const mobileLogo = document.createElement('div');
    mobileLogo.classList.add('mobile-logo');
    mobileLogo.innerHTML = `
        <img src="tenerife.png" alt="Tenerife" class="mobile-tenerife-img">
        <span class="mobile-title">TENERIFE EXPERIENCE</span>
    `;
    mobileMenu.appendChild(mobileLogo);

    const categories = [
        {
            name: 'PARTY',
            color: '#c9a227',
            subcategories: [
                { name: 'Daytime & Sunset', href: 'party.html#daytime' },
                { name: 'Nightlife', href: 'party.html#nightlife' },
                { name: 'H.m.c.', href: 'party.html#hmc' },
                { name: 'Terraceo', href: 'party.html#terraceo' },
                { name: 'El Barco', href: 'party.html#elbarco' },
                { name: 'Finca', href: 'party.html#finca' }
            ]
        },
        {
            name: 'FOOD & DRINK',
            color: '#8a9a7c',
            subcategories: [
                { name: 'Aperitivo', href: 'food-drink.html#aperitivo' },
                { name: 'Brunch', href: 'food-drink.html#brunch' },
                { name: 'Ristorante', href: 'food-drink.html#ristorante' }
            ]
        },
        {
            name: 'STAYING',
            color: '#e8b8c8',
            subcategories: [
                { name: 'Villa', href: 'staying.html#villa' },
                { name: 'Hotel', href: 'staying.html#hotel' },
                { name: 'Apartment', href: 'staying.html#apartment' }
            ]
        },
        {
            name: 'EXCURSIÓN',
            color: '#c8b8a0',
            subcategories: [
                { name: 'Action', href: 'excursion.html#action' },
                { name: 'Chill', href: 'excursion.html#chill' }
            ]
        },
        {
            name: 'EVENTS SERVICES',
            color: '#a8c0d8',
            subcategories: [
                { name: 'Private', href: 'events.html#private' },
                { name: 'Artists booking', href: 'events.html#artists' },
                { name: 'Venue & More', href: 'events.html#venue' },
                { name: 'Boat', href: 'events.html#boat' },
                { name: 'Villa', href: 'events.html#villa-private' }
            ]
        }
    ];

    categories.forEach(cat => {
        const item = document.createElement('div');
        item.classList.add('mobile-item');

        const header = document.createElement('div');
        header.classList.add('mobile-header');
        header.style.background = `linear-gradient(145deg, ${cat.color}, ${adjustColor(cat.color, -20)})`;
        header.innerHTML = `
            <span class="mobile-text">${cat.name}</span>
            <span class="mobile-arrow">+</span>
        `;

        const subMenu = document.createElement('div');
        subMenu.classList.add('mobile-submenu');
        cat.subcategories.forEach(sub => {
            const subLink = document.createElement('a');
            subLink.href = sub.href;
            subLink.textContent = sub.name;
            subMenu.appendChild(subLink);
        });

        header.addEventListener('click', function() {
            document.querySelectorAll('.mobile-item.expanded').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('expanded');
                    openItem.querySelector('.mobile-arrow').textContent = '+';
                }
            });

            item.classList.toggle('expanded');
            this.querySelector('.mobile-arrow').textContent = item.classList.contains('expanded') ? '−' : '+';
        });

        item.appendChild(header);
        item.appendChild(subMenu);
        mobileMenu.appendChild(item);
    });

    main.parentNode.insertBefore(mobileMenu, main.nextSibling);
    addMobileStyles();
}

// Funzione per scurire/schiarire colori
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function addMobileStyles() {
    if (document.querySelector('#mobile-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'mobile-styles';
    styles.textContent = `
        .mobile-menu {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 20px;
        }

        .mobile-logo {
            text-align: center;
            margin-bottom: 25px;
        }

        .mobile-tenerife-img {
            width: 100px;
            height: auto;
            filter: brightness(0) saturate(100%) invert(35%) sepia(15%) saturate(600%) hue-rotate(140deg);
            margin-bottom: 10px;
        }

        .mobile-title {
            display: block;
            font-size: 1rem;
            font-weight: 600;
            color: #4a7c7e;
            letter-spacing: 2px;
        }

        .mobile-item {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 22px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            color: #1a1a1a;
            transition: all 0.2s ease;
        }

        .mobile-arrow {
            font-size: 1.3rem;
            font-weight: 300;
            transition: transform 0.3s ease;
        }

        .mobile-submenu {
            max-height: 0;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.95);
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-item.expanded .mobile-submenu {
            max-height: 500px;
        }

        .mobile-submenu a {
            display: block;
            padding: 15px 25px;
            text-decoration: none;
            color: #4a4a4a;
            font-size: 0.9rem;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            transition: all 0.2s ease;
        }

        .mobile-submenu a:hover {
            background: rgba(74, 124, 126, 0.1);
            padding-left: 32px;
            color: #4a7c7e;
        }

        @media (min-width: 769px) {
            .mobile-menu {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(styles);
}
