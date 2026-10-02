// Lo Squalo — tracciamento click WhatsApp (GA4 G-BBHX7ZZLEH)
// Richiesta Alessandro 29/09/2026: whatsapp_click deve dire DA DOVE parte la richiesta.
// Parametri (quando disponibili): pagina, servizio, lingua, posizione del CTA, numero di
// destinazione (chatbot 910 / operativo 190), sorgente/mezzo/campagna/GCLID.
// Incluso in ogni pagina pubblica accanto a lang-switch.js. La conversione Google Ads resta
// solo dove e' gia' configurata (Momentos Sal Negra), inline nella pagina.
//
// Attribuzione: l'ultimo arrivo NON diretto (UTM / gclid / referrer esterno) resta salvato
// 90 giorni in localStorage, cosi' il click WhatsApp alla terza pagina visitata porta ancora
// la campagna d'ingresso. Una visita diretta successiva non la cancella.
(function () {
    var KEY = 'lsq_attr';
    var TTL = 90 * 24 * 60 * 60 * 1000;
    var SEARCH = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|yandex|baidu)\./;

    function load() {
        try {
            var a = JSON.parse(localStorage.getItem(KEY) || 'null');
            return a && Date.now() - a.ts < TTL ? a : null;
        } catch (e) { return null; }
    }
    function save(a) {
        a.ts = Date.now();
        try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
    }

    // --- cattura attribuzione all'arrivo ---
    var q = new URLSearchParams(location.search);
    var gclid = q.get('gclid') || q.get('gbraid') || q.get('wbraid');
    if (q.get('utm_source') || q.get('utm_medium') || q.get('utm_campaign') || gclid) {
        save({
            source: q.get('utm_source') || (gclid ? 'google' : ''),
            medium: q.get('utm_medium') || (gclid ? 'cpc' : ''),
            campaign: q.get('utm_campaign') || '',
            gclid: gclid || ''
        });
    } else if (document.referrer) {
        var host = '';
        try { host = new URL(document.referrer).hostname.replace(/^www\./, ''); } catch (e) {}
        var own = location.hostname.replace(/^www\./, '');
        if (host && host !== own && !/netlify\.app$/.test(host)) {
            save({ source: host, medium: SEARCH.test(host) ? 'organic' : 'referral', campaign: '', gclid: '' });
        }
    }

    // --- contesto della pagina ---
    var path = location.pathname;
    var lang = /^\/en(\/|$)/.test(path) ? 'en' : /^\/es(\/|$)/.test(path) ? 'es' : 'it';
    // servizio = path logico senza lingua ed estensione: "escursioni/balene", "home"
    var service = path.replace(/^\/(en|es)(?=\/|$)/, '').replace(/\.html$/, '').replace(/^\/+|\/+$/g, '')
        .replace(/(^|\/)index$/, '') || 'home';
    var page = service.split('/').pop().replace(/-/g, '_');

    function destination(href) {
        var m = href.match(/(?:wa\.me\/|phone=)(\d+)/);
        if (!m) return '';
        var tail = m[1].slice(-3);
        return tail === '910' ? 'chatbot_910' : tail === '190' ? 'operativo_190' : 'altro_' + tail;
    }

    function position(link) {
        if (link.getAttribute('data-cta')) return link.getAttribute('data-cta');
        if (link.classList.contains('wa-fab')) return 'floating_button';
        if (link.closest('[class*="sticky"]')) return 'sticky_bar';
        if (link.classList.contains('node') || link.classList.contains('mobile-node')) return 'mindmap_node';
        if (link.closest('header, [class*="hero"]')) return 'hero';
        if (link.closest('footer')) return 'footer';
        if (link.getAttribute('data-i18n')) return link.getAttribute('data-i18n');
        return link.classList[0] || 'inline_link';
    }

    function linkService(link) {
        if (link.getAttribute('data-service')) return link.getAttribute('data-service');
        if ((link.classList.contains('node') || link.classList.contains('mobile-node')) && link.id) return service + '/' + link.id.replace(/^(mobile-)?node-/, '');
        return service;
    }

    // Anche per WhatsApp aperto da JS senza <a> (ricerca in home: search.js)
    window.lsqTrackWa = function (href, ctaPosition, svc, index) {
        if (typeof gtag !== 'function') return;
        var a = load() || { source: '(direct)', medium: '(none)', campaign: '', gclid: '' };
        var params = {
            page: page,
            page_path: path,
            service: svc || service,
            language: lang,
            cta_position: ctaPosition,
            cta_index: index || 0,
            wa_destination: destination(href),
            lead_source: a.source,
            lead_medium: a.medium,
            transport_type: 'beacon'
        };
        if (a.campaign) params.lead_campaign = a.campaign;
        if (a.gclid) params.lead_gclid = a.gclid;
        gtag('event', 'whatsapp_click', params);
    };

    document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
        if (!link) return;
        var all = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
        window.lsqTrackWa(link.href, position(link), linkService(link), Array.prototype.indexOf.call(all, link) + 1);
    });

    // Link in uscita verso un sistema di prenotazione del partner (richiesta Alessandro 01/10/2026,
    // Bencomo -> MangoBeds): stesso contesto di whatsapp_click, piu' il partner di destinazione.
    document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[data-booking-partner]');
        if (!link || typeof gtag !== 'function') return;
        var a = load() || { source: '(direct)', medium: '(none)', campaign: '', gclid: '' };
        var params = {
            page: page,
            page_path: path,
            service: service,
            language: lang,
            cta_position: position(link),
            booking_partner: link.getAttribute('data-booking-partner'),
            lead_source: a.source,
            lead_medium: a.medium,
            transport_type: 'beacon'
        };
        if (a.campaign) params.lead_campaign = a.campaign;
        if (a.gclid) params.lead_gclid = a.gclid;
        gtag('event', 'booking_click', params);
    });
})();
