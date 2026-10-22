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

    // path logico = path senza prefisso lingua; la home e' sempre / (URL canonica, /index.html fa 301)
    let path = location.pathname;
    let cur = 'it';
    if (path.startsWith('/en/') || path === '/en') { cur = 'en'; path = path.replace(/^\/en/, ''); }
    else if (path.startsWith('/es/') || path === '/es') { cur = 'es'; path = path.replace(/^\/es/, ''); }
    if (path === '' || path === '/index.html') path = '/';
    const logical = path; // es. /alloggio/villa-paraiso.html

    // Mantiene provenienza, categoria e ancoraggio nel cambio lingua.
    const suffix = location.search + location.hash;
    const hrefFor = (lang) => (lang === 'it' ? '' : '/' + lang) + logical + suffix;

    const LABEL = { it: 'Lingua', en: 'Language', es: 'Idioma' };

    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('aria-label', LABEL[cur] || LABEL.it);
    LANGS.forEach((lang) => {
        const link = document.createElement('a');
        link.setAttribute('href', hrefFor(lang));
        link.className = `lang-pill${lang === cur ? ' active' : ''}`;
        if (lang === cur) link.setAttribute('aria-current', 'true');
        link.textContent = lang.toUpperCase();
        wrap.appendChild(link);
    });
    document.body.appendChild(wrap);
})();
