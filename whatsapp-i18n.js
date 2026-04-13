// Lo Squalo — WhatsApp CTA i18n
// Rileva lingua browser e riscrive il testo precompilato nei link wa.me.
// Non tocca il numero di telefono; solo il parametro ?text=.
(function () {
    const lang = (navigator.language || 'it').slice(0, 2).toLowerCase();
    // Il sito è scritto in IT: default invariato, niente da riscrivere
    if (lang !== 'en' && lang !== 'es') return;

    const prefix = lang === 'en'
        ? 'Hello! I am interested in'
        : '¡Hola! Estoy interesad@ en';

    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        try {
            const url = new URL(a.href);
            const text = url.searchParams.get('text');
            if (!text) return;
            const replaced = text.replace(/^Ciao!\s*Sono\s+interessat[oa]?/i, prefix);
            if (replaced === text) return;
            url.searchParams.set('text', replaced);
            a.href = url.toString();
        } catch (e) { /* skip malformed */ }
    });
})();
