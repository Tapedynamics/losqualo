// Lo Squalo - Tenerife Experience
// Interactive Mind Map - Progressive Expansion

document.addEventListener('DOMContentLoaded', function() {
    initProgressiveMap();
    initMobileMenu();
});

// Stato corrente della mappa
let currentState = 'initial';
let expandedCategory = null;

// Inizializza la mappa progressiva
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
                // Se clicco su un'altra categoria, cambia
                if (expandedCategory !== category) {
                    hideCurrentSubcategories();
                    document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));

                    setTimeout(() => {
                        showSubcategories(category);
                        this.classList.add('expanded');
                    }, 200);
                }
            }
        });
    });

    // Pulsante indietro
    backBtn.addEventListener('click', function() {
        goBack();
    });

    // Tasto ESC per tornare indietro
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goBack();
        }
    });
}

// Mostra le 5 categorie principali
function showCategories() {
    const mindMap = document.querySelector('.mind-map');
    mindMap.dataset.state = 'categories';
    currentState = 'categories';
}

// Mostra le sottocategorie di una categoria
function showSubcategories(category) {
    const mindMap = document.querySelector('.mind-map');
    mindMap.dataset.state = 'subcategories';
    currentState = 'subcategories';
    expandedCategory = category;

    // Mostra le sotto-bolle
    const subNodes = document.querySelector(`.sub-nodes[data-parent="${category}"]`);
    if (subNodes) {
        subNodes.classList.add('visible');
    }

    // Mostra le linee di connessione
    const subLines = document.querySelector(`.sub-lines[data-category="${category}"]`);
    if (subLines) {
        subLines.classList.add('visible');
    }
}

// Nascondi sottocategorie correnti
function hideCurrentSubcategories() {
    if (expandedCategory) {
        const subNodes = document.querySelector(`.sub-nodes[data-parent="${expandedCategory}"]`);
        if (subNodes) {
            subNodes.classList.remove('visible');
        }

        const subLines = document.querySelector(`.sub-lines[data-category="${expandedCategory}"]`);
        if (subLines) {
            subLines.classList.remove('visible');
        }
    }
}

// Torna indietro
function goBack() {
    const mindMap = document.querySelector('.mind-map');

    if (currentState === 'subcategories') {
        // Torna alle categorie
        hideCurrentSubcategories();
        document.querySelectorAll('.node-primary').forEach(n => n.classList.remove('expanded'));
        mindMap.dataset.state = 'categories';
        currentState = 'categories';
        expandedCategory = null;
    } else if (currentState === 'categories') {
        // Torna allo stato iniziale
        mindMap.dataset.state = 'initial';
        currentState = 'initial';
    }
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
            if (mobileMenu) {
                mobileMenu.remove();
            }
        }
    });
}

function createMobileMenu() {
    const container = document.querySelector('.container');
    const main = document.querySelector('.mind-map');

    if (document.querySelector('.mobile-menu')) return;

    const mobileMenu = document.createElement('nav');
    mobileMenu.classList.add('mobile-menu');

    // Logo Tenerife per mobile
    const mobileLogo = document.createElement('div');
    mobileLogo.classList.add('mobile-logo');
    mobileLogo.innerHTML = `
        <div class="mobile-tenerife">
            <span>TENERIFE<br>EXPERIENCE</span>
        </div>
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
        header.style.backgroundColor = cat.color;
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
            // Chiudi altri item aperti
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
            margin-bottom: 20px;
        }

        .mobile-tenerife {
            display: inline-block;
            padding: 25px 35px;
            background-color: #4a7c7e;
            clip-path: polygon(50% 0%, 85% 10%, 100% 40%, 95% 70%, 100% 100%, 50% 90%, 0% 100%, 5% 70%, 0% 40%, 15% 10%);
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            text-align: center;
            line-height: 1.3;
        }

        .mobile-item {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            color: #1a1a1a;
            transition: all 0.2s ease;
        }

        .mobile-arrow {
            font-size: 1.2rem;
            font-weight: 300;
            transition: transform 0.3s ease;
        }

        .mobile-submenu {
            max-height: 0;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.95);
            transition: max-height 0.35s ease;
        }

        .mobile-item.expanded .mobile-submenu {
            max-height: 400px;
        }

        .mobile-submenu a {
            display: block;
            padding: 14px 25px;
            text-decoration: none;
            color: #4a4a4a;
            font-size: 0.9rem;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.2s ease;
        }

        .mobile-submenu a:hover {
            background: rgba(74, 124, 126, 0.1);
            padding-left: 30px;
        }

        @media (min-width: 769px) {
            .mobile-menu {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(styles);
}
