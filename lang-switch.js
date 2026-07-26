// Lo Squalo — Switcher lingua IT/EN/ES
// Il sito pubblico e' specchiato in 3 lingue: IT nella root, EN sotto /en/, ES
// sotto /es/, con gli STESSI nomi di file. Lo switcher si limita quindi a
// scambiare il prefisso di lingua del path corrente, restando sulla stessa
// pagina. Da includere in ogni pagina pubblica (NON in brand.html e nelle
// pagine interne, che esistono solo in italiano).
//
// NB: canonical e hreflang NON si iniettano piu' da qui — sono statici nel <head>
// di ogni pagina (piu' affidabili per i motori di ricerca) e allineati al dominio
// reale losqualotenerife.com. Vedi anche sitemap.xml.
(function () {
    const LANGS = ['it', 'en', 'es'];

    // path logico = path senza prefisso lingua, sempre con /index.html per la home
    let path = location.pathname;
    let cur = 'it';
    if (path.startsWith('/en/') || path === '/en') { cur = 'en'; path = path.replace(/^\/en/, ''); }
    else if (path.startsWith('/es/') || path === '/es') { cur = 'es'; path = path.replace(/^\/es/, ''); }
    if (path === '' || path === '/') path = '/index.html';
    const logical = path; // es. /alloggio/villa-paraiso.html

    const hrefFor = (lang) => (lang === 'it' ? '' : '/' + lang) + logical;

    const LABEL = { it: 'Lingua', en: 'Language', es: 'Idioma' };

    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('aria-label', LABEL[cur] || LABEL.it);
    wrap.innerHTML = LANGS.map((lang) =>
        `<a href="${hrefFor(lang)}" class="lang-pill${lang === cur ? ' active' : ''}"${lang === cur ? ' aria-current="true"' : ''}>${lang.toUpperCase()}</a>`
    ).join('');
    document.body.appendChild(wrap);
})();
