// Lo Squalo — Switcher lingua IT/EN/ES + hreflang
// Da includere SOLO nelle pagine che esistono in tutte e 3 le lingue
// (home/mini-landing + categoria alloggi). Calcola i 3 URL equivalenti dal
// path corrente (prefisso '' / '/en' / '/es') e:
//  1. inietta i <link rel="alternate" hreflang> nel <head> (it/en/es + x-default)
//  2. renderizza le pillole switcher (fixed, alto-destra) con lo stato attivo.
(function () {
    const ORIGIN = 'https://losqualo.netlify.app';
    const LANGS = ['it', 'en', 'es'];

    // path logico = path senza prefisso lingua, sempre con /index.html per la home
    let path = location.pathname;
    let cur = 'it';
    if (path.startsWith('/en/') || path === '/en') { cur = 'en'; path = path.replace(/^\/en/, ''); }
    else if (path.startsWith('/es/') || path === '/es') { cur = 'es'; path = path.replace(/^\/es/, ''); }
    if (path === '' || path === '/') path = '/index.html';
    const logical = path; // es. /alloggio/villa-paraiso.html

    const urlFor = (lang) => ORIGIN + (lang === 'it' ? '' : '/' + lang) + logical;
    const hrefFor = (lang) => (lang === 'it' ? '' : '/' + lang) + logical;

    // 1) hreflang nel <head>
    const head = document.head;
    LANGS.forEach((lang) => {
        const l = document.createElement('link');
        l.rel = 'alternate';
        l.hreflang = lang;
        l.href = urlFor(lang);
        head.appendChild(l);
    });
    const xd = document.createElement('link');
    xd.rel = 'alternate'; xd.hreflang = 'x-default'; xd.href = urlFor('it');
    head.appendChild(xd);

    // 2) switcher UI
    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('aria-label', 'Lingua');
    wrap.innerHTML = LANGS.map((lang) =>
        `<a href="${hrefFor(lang)}" class="lang-pill${lang === cur ? ' active' : ''}"${lang === cur ? ' aria-current="true"' : ''}>${lang.toUpperCase()}</a>`
    ).join('');
    document.body.appendChild(wrap);
})();
