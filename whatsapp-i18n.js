// Lo Squalo — WhatsApp CTA i18n
// Rileva lingua browser e riscrive il testo precompilato nei link wa.me.
// Non tocca il numero di telefono; solo il parametro ?text=.
(function () {
    const lang = (navigator.language || 'it').slice(0, 2).toLowerCase();
    const locale = lang === 'es' ? 'es' : lang === 'en' ? 'en' : 'it';
    if (locale === 'it') return; // default del sito: niente da fare

    const prefixes = {
        it: 'Ciao! Sono interessato',
        en: 'Hello! I am interested in',
        es: '¡Hola! Estoy interesad@ en'
    };

    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        try {
            const url = new URL(a.href);
            const text = url.searchParams.get('text');
            if (!text) return;
            // Sostituisci il prefisso italiano se presente, mantenendo il resto
            const decoded = decodeURIComponent(text);
            const replaced = decoded.replace(/^Ciao!\s*Sono\s+interessat[oa]?/i, prefixes[locale]);
            if (replaced === decoded) return;
            url.searchParams.set('text', replaced);
            a.href = url.toString();
        } catch (e) { /* skip malformed */ }
    });
})();
