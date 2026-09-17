// Nota obbligatoria sui prezzi (Documento 03, punto 2): un testo solo per lingua,
// modificabile in un punto solo. Le pagine espongono <p class="price-note" data-price-note></p>
// e questo script lo riempie in base a <html lang="...">.
(function () {
  var NOTE = {
    it: '* I prezzi indicati sono aggiornati alla data di pubblicazione e possono variare in base alla stagione, alla disponibilità e alle condizioni applicate dai fornitori, per cause non dipendenti da noi. Il prezzo definitivo viene sempre confermato prima della prenotazione.',
    en: '* Prices shown are current at the time of publication and may vary depending on season, availability and supplier conditions, for reasons outside our control. The final price is always confirmed before booking.',
    es: '* Los precios indicados están actualizados en la fecha de publicación y pueden variar según la temporada, la disponibilidad y las condiciones aplicadas por los proveedores, por causas ajenas a nosotros. El precio definitivo se confirma siempre antes de la reserva.'
  };
  var lang = (document.documentElement.lang || 'it').slice(0, 2).toLowerCase();
  var text = NOTE[lang] || NOTE.it;
  var nodes = document.querySelectorAll('[data-price-note]');
  for (var i = 0; i < nodes.length; i++) nodes[i].textContent = text;
})();
