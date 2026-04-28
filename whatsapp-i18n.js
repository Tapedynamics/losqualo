// Lo Squalo — WhatsApp CTA i18n
// Rileva lingua browser e riscrive il testo precompilato nei link wa.me.
// Non tocca il numero di telefono; solo il parametro ?text=.
(function () {
    const lang = (navigator.language || 'it').slice(0, 2).toLowerCase();
    if (lang !== 'en' && lang !== 'es') return;

    const prefix = lang === 'en'
        ? 'Hello! I am interested in'
        : '¡Hola! Estoy interesad@ en';

    // Regex pattern catturano i prefissi italiani comuni nelle CTA del sito
    // ("Ciao!", "Ciao Squalo,", "Sono interessato a", "Vorrei info", "info", "cerco", "organizzo")
    const stripPatterns = [
        /^Ciao!?\s*Squalo[\s,!]*/i,
        /^Ciao[\s,!]+/i,
        /^Sono\s+interessat[oa]?\s*(a(l|lla|llo|ll'|i|gli|lle)?\s+|all'\s*)?/i,
        /^Vorrei\s+(info|sapere)\s*/i,
        /^(info|cerco|organizzo)\s*/i
    ];

    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        try {
            const url = new URL(a.href);
            const text = url.searchParams.get('text');
            if (!text) return;
            let stripped = text;
            for (const re of stripPatterns) stripped = stripped.replace(re, '');
            if (stripped === text) return;
            url.searchParams.set('text', prefix + ' ' + stripped);
            a.href = url.toString();
        } catch (e) { /* skip malformed */ }
    });
})();
