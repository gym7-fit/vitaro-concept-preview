/* ========================================================================
   VITARO INTERNAL PLANNER — economics calculator + 2D room planner.
   Not part of the public site build: no consent banner, no nav, no
   3-language i18n system (this internal tool only needs DE/EN).
   Self-contained; only depends on style.css for tokens/fonts.
   ======================================================================== */

/* ---------- ACCESS GATE (obscurity only, see gate-note in the HTML) ---------- */
(function(){
  var CODE = 'vitaro2026';
  var gate = document.getElementById('gate');
  var app = document.getElementById('app');
  var input = document.getElementById('gateInput');
  var btn = document.getElementById('gateBtn');

  function tryUnlock(){
    if(input.value === CODE){
      try{ sessionStorage.setItem('vitaro-planer-unlocked', '1'); }catch(e){}
      gate.hidden = true;
      app.hidden = false;
    } else {
      input.value = '';
      input.placeholder = 'Falscher Code / Wrong code';
      input.focus();
    }
  }
  try{
    if(sessionStorage.getItem('vitaro-planer-unlocked') === '1'){
      gate.hidden = true;
      app.hidden = false;
    }
  }catch(e){}
  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', function(e){ if(e.key === 'Enter') tryUnlock(); });
})();

/* ---------- THEME (self-contained copy of main.js's pattern) ---------- */
function applyTheme(theme){ document.documentElement.setAttribute('data-theme', theme); }
function toggleTheme(){
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  var next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try{ localStorage.setItem('vitaro-theme', next); }catch(e){}
}

/* ========================================================================
   DE/EN STRINGS — this internal tool only needs the two languages the
   owner actually presents in on calls.
   ======================================================================== */
var PLANER_STRINGS = {
  de: {
    "gate.hint": "Interner Bereich — bitte Zugangscode eingeben.",
    "gate.btn": "Freischalten",
    "gate.note": "Hinweis: Dies ist kein echter Schutz, sondern nur ein Klick-Hindernis gegen versehentliches Aufrufen. Der Link selbst ist nirgends verlinkt.",
    "header.eyebrow": "Interner Planer — nicht öffentlich",
    "tab.econ": "Wirtschaftlichkeit",
    "tab.room": "Raumplanung",
    "econ.h2.house": "Angaben zum Haus",
    "econ.label.zimmer": "Zimmer gesamt",
    "econ.label.auslastung": "Auslastung (%)",
    "econ.label.gaeste": "Ø Gäste pro belegtem Zimmer",
    "econ.label.aufenthalt": "Ø Aufenthaltsdauer (Nächte)",
    "econ.h2.usage": "Nutzung des Studios",
    "econ.label.buchungsquote": "Buchungsquote (%)",
    "econ.label.sessions": "Ø Sessions je buchendem Gast",
    "econ.label.preis": "Ø Preis je Session/Paket-Einheit (€)",
    "econ.h2.model": "Partnerschaftsmodell",
    "econ.model.lease": "Full-Service-Leasing",
    "econ.model.rev": "Umsatzbeteiligung",
    "econ.model.hybrid": "Hybridmodell",
    "econ.label.gebuehr": "Monatliche Grundgebühr (€)",
    "econ.label.anteil": "Umsatzanteil Hotel (%)",
    "econ.note.inputs": "Alle Werte sind Annahmen zur Veranschaulichung der Methode und werden im echten Gespräch gemeinsam mit dem Hotel kalibriert. Nichts hier ist ein verbindliches Angebot.",
    "econ.h2.result": "Ergebnis (indikativ)",
    "econ.result.gaesteTag.label": "Gäste im Haus pro Tag",
    "econ.result.gaesteTag.formula": "Zimmer × Auslastung × Ø Gäste/Zimmer",
    "econ.result.ankuenfte.label": "Gästeankünfte pro Monat",
    "econ.result.ankuenfte.formula": "Gäste im Haus × 30 ÷ Aufenthaltsdauer",
    "econ.result.buchend.label": "Buchende Gäste pro Monat",
    "econ.result.buchend.formula": "Ankünfte × Buchungsquote",
    "econ.result.sessions.label": "Sessions pro Monat",
    "econ.result.sessions.formula": "Buchende Gäste × Ø Sessions",
    "econ.result.umsatz.label": "Studioumsatz pro Monat",
    "econ.result.umsatz.formula": "Sessions × Ø Preis",
    "econ.btn.pdf": "PDF herunterladen",
    "econ.btn.print": "Zusammenfassung drucken",
    "econ.btn.excel": "Excel-Vorlage laden (Backup)",
    "room.btn.pdf": "Raumplan als PDF herunterladen",
    "internal.toggle": "Interne Kostenaufstellung",
    "internal.h2": "Ihre Kosten (nur intern)",
    "internal.label.trainer": "Trainergehalt (€/Monat)",
    "internal.label.geraete": "Geräte-Abschreibung (€/Monat)",
    "internal.label.sonstige": "Sonstige Fixkosten (€/Monat)",
    "internal.note": "Trainergehalt, Geräte-Abschreibung und sonstige Fixkosten (Versicherung, Reisen, Verwaltung). Diese Ansicht erscheint nie im PDF oder Ausdruck. Ohne Steuern: Einkommen-/Körperschaftsteuer, Gewerbesteuer und Umsatzsteuer hängen von Rechtsform und Steuersitz ab und sind hier nicht eingerechnet.",
    "internal.result.gross.label": "Ihre Einnahmen (vor Kosten)",
    "internal.result.costs.label": "Ihre Kosten gesamt",
    "internal.result.net.label": "Ergebnis vor Steuern",
    "pdf.footer": "Vitaro Gym Solutions — Fuerteventura, Kanarische Inseln. Alle Werte sind Annahmen; die verbindliche Zahl steht im schriftlichen Angebot nach der Standortanalyse.",
    "pdf.room.title": "Raumplanung (Entwurf)",
    "pdf.room.roomLabel": "Raum",
    "pdf.room.usableLabel": "Nutzbar",
    "pdf.room.usedLabel": "Belegt durch Geräte",
    "pdf.room.equipListTitle": "Geräteliste",
    "pdf.room.footer": "Vitaro Gym Solutions — dieser Grundriss ist ein Arbeitsentwurf zur Veranschaulichung, keine Ausführungsplanung.",
    "print.title": "Machbarkeitscheck — indikative Wirtschaftlichkeit",
    "print.sub": "Erstellt gemeinsam im Gespräch. Alle Zahlen sind Annahmen und werden nach der Standortanalyse im schriftlichen Angebot verbindlich festgelegt.",
    "room.h2.room": "Raum",
    "room.label.width": "Breite (m)",
    "room.label.depth": "Tiefe (m)",
    "room.h2.niche": "Nische / Aussparung (optional)",
    "room.niche.enable": "Nische aktivieren",
    "room.label.posX": "Position X (m)",
    "room.label.posY": "Position Y (m)",
    "room.note.niche": "Die Nische wird als Aussparung (z. B. Säule, Vorbau) von der nutzbaren Fläche abgezogen.",
    "room.h2.catalog": "Geräte-Katalog",
    "room.note.catalog": "Ziehen Sie ein Gerät in den Grundriss. Maße sind typische Richtwerte, keine Herstellerangaben.",
    "room.btn.rotate": "Ausgewähltes Gerät drehen (R)",
    "room.btn.delete": "Ausgewähltes Gerät entfernen (Entf)",
    "room.btn.clear": "Grundriss leeren",
    "room.btn.save": "Layout speichern (dieser Browser)",
    "room.btn.load": "Gespeichertes Layout laden",
    "room.btn.exportPng": "Als Bild exportieren (PNG)",
    "room.note.canvas": "Raster: 10 cm. Klicken zum Auswählen, ziehen zum Verschieben, R zum Drehen, Entf zum Entfernen.",
    "room.niche.tag": "Aussparung",
    "room.areaInfo": "Raum: {total} m² · nutzbar: {usable} m² · belegt durch Geräte: {used} m² ({pct} %)",
    "room.confirmClear": "Gesamten Grundriss leeren?",
    "room.alertSaved": "Layout gespeichert (in diesem Browser).",
    "room.alertSaveFail": "Speichern fehlgeschlagen: ",
    "room.alertNoLayout": "Kein gespeichertes Layout gefunden.",
    "room.alertLoadFail": "Laden fehlgeschlagen: ",
    "hotel.label.lease": "Kosten für das Hotel (fest)",
    "hotel.label.rev": "Ertrag für das Hotel (Umsatzanteil)",
    "hotel.label.hybrid": "Netto für das Hotel (Anteil − Grundgebühr)",
    "hotel.note.lease": "Full-Service-Leasing: feste Kosten, kein Umsatzanteil für das Hotel. Der Studioumsatz verbleibt vollständig bei VITARO zur Deckung von Personal, Geräten und Betrieb. Der Nutzen für das Hotel liegt in der Amenity selbst (Gästeerlebnis, Bewertungen, Differenzierung), nicht in einer direkten Erlösbeteiligung.",
    "hotel.note.rev": "Umsatzbeteiligung: keine Vorabkosten, das Hotel erhält {pct} % des Studioumsatzes. Der Rest deckt Personal, Geräte und laufenden Betrieb bei VITARO.",
    "hotel.note.hybrid": "Hybridmodell: reduzierte Grundgebühr von {fee} pro Monat plus {pct} % Umsatzanteil ({share}). Das Netto kann je nach Auslastung und Buchungsquote positiv oder negativ ausfallen — genau das macht dieses Modell im Gespräch sichtbar.",
    "print.row.zimmer": "Zimmer gesamt",
    "print.row.auslastung": "Auslastung",
    "print.row.gaeste": "Ø Gäste pro belegtem Zimmer",
    "print.row.aufenthalt": "Ø Aufenthaltsdauer",
    "print.row.aufenthaltUnit": "Nächte",
    "print.row.buchungsquote": "Buchungsquote",
    "print.row.sessions": "Ø Sessions je buchendem Gast",
    "print.row.preis": "Ø Preis je Einheit",
    "print.row.model": "Partnerschaftsmodell",
    "print.row.gebuehr": "Monatliche Grundgebühr",
    "print.row.anteil": "Umsatzanteil Hotel",
    "print.model.lease": "Full-Service-Leasing",
    "print.model.rev": "Umsatzbeteiligung",
    "print.model.hybrid": "Hybridmodell",
    "equip.treadmill": "Laufband",
    "equip.elliptical": "Crosstrainer",
    "equip.bike": "Fahrrad-Ergometer",
    "equip.functional": "Multipresse / Kraftstation",
    "equip.bench": "Hantelbank",
    "equip.rack": "Langhantel-Rack",
    "equip.dumbbells": "Kurzhantel-Ablage",
    "equip.cable": "Kabelzug",
    "equip.mat": "Matten-/Stretchbereich",
    "equip.desk": "Empfang / Check-in"
  },
  en: {
    "gate.hint": "Internal area — please enter the access code.",
    "gate.btn": "Unlock",
    "gate.note": "Note: this is not real protection, just a click-barrier against stumbling onto the page by accident. The link itself is not linked anywhere.",
    "header.eyebrow": "Internal Planner — not public",
    "tab.econ": "Economics",
    "tab.room": "Room Layout",
    "econ.h2.house": "Property details",
    "econ.label.zimmer": "Total rooms",
    "econ.label.auslastung": "Occupancy (%)",
    "econ.label.gaeste": "Avg. guests per occupied room",
    "econ.label.aufenthalt": "Avg. length of stay (nights)",
    "econ.h2.usage": "Studio usage",
    "econ.label.buchungsquote": "Booking rate (%)",
    "econ.label.sessions": "Avg. sessions per booking guest",
    "econ.label.preis": "Avg. price per session/package unit (€)",
    "econ.h2.model": "Partnership model",
    "econ.model.lease": "Full-Service Lease",
    "econ.model.rev": "Revenue Share",
    "econ.model.hybrid": "Hybrid",
    "econ.label.gebuehr": "Monthly base fee (€)",
    "econ.label.anteil": "Hotel revenue share (%)",
    "econ.note.inputs": "All values are assumptions to illustrate the method and are calibrated together with the hotel in the real conversation. Nothing here is a binding offer.",
    "econ.h2.result": "Result (indicative)",
    "econ.result.gaesteTag.label": "Guests in-house per day",
    "econ.result.gaesteTag.formula": "Rooms × occupancy × avg. guests/room",
    "econ.result.ankuenfte.label": "Guest arrivals per month",
    "econ.result.ankuenfte.formula": "Guests in-house × 30 ÷ length of stay",
    "econ.result.buchend.label": "Booking guests per month",
    "econ.result.buchend.formula": "Arrivals × booking rate",
    "econ.result.sessions.label": "Sessions per month",
    "econ.result.sessions.formula": "Booking guests × avg. sessions",
    "econ.result.umsatz.label": "Studio revenue per month",
    "econ.result.umsatz.formula": "Sessions × avg. price",
    "econ.btn.pdf": "Download PDF",
    "econ.btn.print": "Print summary",
    "econ.btn.excel": "Download Excel template (backup)",
    "room.btn.pdf": "Download floor plan as PDF",
    "internal.toggle": "Internal cost breakdown",
    "internal.h2": "Your costs (internal only)",
    "internal.label.trainer": "Trainer salary (€/month)",
    "internal.label.geraete": "Equipment depreciation (€/month)",
    "internal.label.sonstige": "Other fixed costs (€/month)",
    "internal.note": "Trainer salary, equipment depreciation and other fixed costs (insurance, travel, admin). This view never appears in the PDF or printout. Excludes tax: income/corporate tax, trade tax and VAT depend on your legal structure and tax residency and are not included here.",
    "internal.result.gross.label": "Your earnings (before costs)",
    "internal.result.costs.label": "Your total costs",
    "internal.result.net.label": "Result before tax",
    "pdf.footer": "Vitaro Gym Solutions — Fuerteventura, Canary Islands. All values are assumptions; the binding figure is set in the written proposal after the site assessment.",
    "pdf.room.title": "Room layout (draft)",
    "pdf.room.roomLabel": "Room",
    "pdf.room.usableLabel": "Usable",
    "pdf.room.usedLabel": "Used by equipment",
    "pdf.room.equipListTitle": "Equipment list",
    "pdf.room.footer": "Vitaro Gym Solutions — this floor plan is a working draft for illustration, not construction documentation.",
    "print.title": "Feasibility check — indicative economics",
    "print.sub": "Prepared together during the call. All figures are assumptions and become binding only in the written proposal after the site assessment.",
    "room.h2.room": "Room",
    "room.label.width": "Width (m)",
    "room.label.depth": "Depth (m)",
    "room.h2.niche": "Niche / obstacle (optional)",
    "room.niche.enable": "Enable niche",
    "room.label.posX": "Position X (m)",
    "room.label.posY": "Position Y (m)",
    "room.note.niche": "The niche is subtracted from the usable area as an obstacle (e.g. a column or bay).",
    "room.h2.catalog": "Equipment catalogue",
    "room.note.catalog": "Drag a piece of equipment onto the floor plan. Sizes are typical planning figures, not manufacturer specs.",
    "room.btn.rotate": "Rotate selected item (R)",
    "room.btn.delete": "Remove selected item (Del)",
    "room.btn.clear": "Clear floor plan",
    "room.btn.save": "Save layout (this browser)",
    "room.btn.load": "Load saved layout",
    "room.btn.exportPng": "Export as image (PNG)",
    "room.note.canvas": "Grid: 10 cm. Click to select, drag to move, R to rotate, Del to remove.",
    "room.niche.tag": "Obstacle",
    "room.areaInfo": "Room: {total} m² · usable: {usable} m² · used by equipment: {used} m² ({pct} %)",
    "room.confirmClear": "Clear the entire floor plan?",
    "room.alertSaved": "Layout saved (in this browser).",
    "room.alertSaveFail": "Save failed: ",
    "room.alertNoLayout": "No saved layout found.",
    "room.alertLoadFail": "Load failed: ",
    "hotel.label.lease": "Cost to the hotel (fixed)",
    "hotel.label.rev": "Hotel earnings (revenue share)",
    "hotel.label.hybrid": "Net for the hotel (share − base fee)",
    "hotel.note.lease": "Full-Service Lease: fixed cost, no revenue share for the hotel. Studio revenue stays entirely with VITARO to cover staff, equipment and operations. The hotel's benefit is the amenity itself (guest experience, reviews, differentiation), not a direct revenue cut.",
    "hotel.note.rev": "Revenue Share: no upfront cost, the hotel receives {pct}% of studio revenue. The remainder covers staff, equipment and ongoing operations at VITARO.",
    "hotel.note.hybrid": "Hybrid: a reduced base fee of {fee} per month plus {pct}% revenue share ({share}). The net can be positive or negative depending on occupancy and booking rate — which is exactly what this model makes visible in the conversation.",
    "print.row.zimmer": "Total rooms",
    "print.row.auslastung": "Occupancy",
    "print.row.gaeste": "Avg. guests per occupied room",
    "print.row.aufenthalt": "Avg. length of stay",
    "print.row.aufenthaltUnit": "nights",
    "print.row.buchungsquote": "Booking rate",
    "print.row.sessions": "Avg. sessions per booking guest",
    "print.row.preis": "Avg. price per unit",
    "print.row.model": "Partnership model",
    "print.row.gebuehr": "Monthly base fee",
    "print.row.anteil": "Hotel revenue share",
    "print.model.lease": "Full-Service Lease",
    "print.model.rev": "Revenue Share",
    "print.model.hybrid": "Hybrid",
    "equip.treadmill": "Treadmill",
    "equip.elliptical": "Elliptical",
    "equip.bike": "Exercise Bike",
    "equip.functional": "Functional Trainer",
    "equip.bench": "Weight Bench",
    "equip.rack": "Barbell Rack",
    "equip.dumbbells": "Dumbbell Rack",
    "equip.cable": "Cable Machine",
    "equip.mat": "Mat / Stretch Area",
    "equip.desk": "Reception Desk"
  }
};
var planerLang = 'de';
function pt(key, vars){
  var s = (PLANER_STRINGS[planerLang] && PLANER_STRINGS[planerLang][key]) || key;
  if(vars){
    Object.keys(vars).forEach(function(k){ s = s.replace('{'+k+'}', vars[k]); });
  }
  return s;
}
function applyPlanerLang(lang){
  planerLang = lang;
  document.querySelectorAll('[data-t]').forEach(function(el){
    var val = pt(el.dataset.t);
    el.textContent = val;
  });
  document.getElementById('planerLangSelect').value = lang;
  try{ localStorage.setItem('vitaro-planer-lang', lang); }catch(e){}
  if(window.PlanerEcon) window.PlanerEcon.recalc();
  if(window.RoomPlanner) window.RoomPlanner.rebuildPaletteAndDraw();
}
(function(){
  var sel = document.getElementById('planerLangSelect');
  var stored = 'de';
  try{ stored = localStorage.getItem('vitaro-planer-lang') || 'de'; }catch(e){}
  sel.addEventListener('change', function(){ applyPlanerLang(sel.value); });
  applyPlanerLang(stored);
})();

/* ---------- TABS ---------- */
(function(){
  var tabs = document.querySelectorAll('.planer-tab');
  var panels = { econ: document.getElementById('panel-econ'), room: document.getElementById('panel-room') };
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      Object.keys(panels).forEach(function(key){ panels[key].hidden = (key !== tab.dataset.tab); });
      if(tab.dataset.tab === 'room'){ RoomPlanner.resizeAndDraw(); }
    });
  });
})();

/* ========================================================================
   ECONOMICS CALCULATOR
   Method mirrors the site's published logic (partnerschaft.html #economics):
     1. Gaeste im Haus/Tag   = Zimmer x Auslastung x Gaeste/Zimmer
     2. Ankuenfte/Monat      = (Gaeste im Haus/Tag x 30) / Aufenthaltsdauer
     3. Buchende Gaeste/Monat = Ankuenfte/Monat x Buchungsquote
     4. Sessions/Monat       = Buchende Gaeste x Sessions/buchendem Gast
     5. Studioumsatz/Monat   = Sessions x Preis/Einheit
   Then split by the chosen partnership model. Every number stays labelled
   "indikativ"/"indicative" - this tool is for shaping a live conversation,
   not for quoting a binding figure.
   ======================================================================== */
window.PlanerEcon = (function(){
  var $ = function(id){ return document.getElementById(id); };
  var euro = function(n){ return n.toLocaleString(planerLang==='de'?'de-DE':'en-IE', {maximumFractionDigits:0}) + ' €'; };
  var num = function(n, d){ return n.toLocaleString(planerLang==='de'?'de-DE':'en-IE', {maximumFractionDigits: d===undefined?1:d}); };

  var fields = ['inZimmer','inAuslastung','inGaeste','inAufenthalt','inBuchungsquote','inSessions','inPreis','inGebuehr','inAnteil','inTrainer','inGeraete','inSonstige'];
  fields.forEach(function(id){ $(id).addEventListener('input', calc); });
  document.querySelectorAll('input[name="model"]').forEach(function(r){ r.addEventListener('change', onModelChange); });

  var internalToggle = $('internalToggle');
  internalToggle.addEventListener('change', function(){
    $('internalPanel').hidden = !internalToggle.checked;
  });

  function onModelChange(){
    var model = document.querySelector('input[name="model"]:checked').value;
    $('rowGebuehr').hidden = (model === 'rev');
    $('rowAnteil').hidden = (model === 'lease');
    calc();
  }

  function calc(){
    var zimmer = parseFloat($('inZimmer').value) || 0;
    var auslastung = (parseFloat($('inAuslastung').value) || 0) / 100;
    var gaeste = parseFloat($('inGaeste').value) || 0;
    var aufenthalt = parseFloat($('inAufenthalt').value) || 1;
    var buchungsquote = (parseFloat($('inBuchungsquote').value) || 0) / 100;
    var sessions = parseFloat($('inSessions').value) || 0;
    var preis = parseFloat($('inPreis').value) || 0;
    var gebuehr = parseFloat($('inGebuehr').value) || 0;
    var anteilPct = (parseFloat($('inAnteil').value) || 0) / 100;
    var model = document.querySelector('input[name="model"]:checked').value;

    var gaesteTag = zimmer * auslastung * gaeste;
    var ankuenfte = (gaesteTag * 30) / aufenthalt;
    var buchend = ankuenfte * buchungsquote;
    var sessionsMonat = buchend * sessions;
    var umsatz = sessionsMonat * preis;

    $('outGaesteTag').textContent = num(gaesteTag, 0);
    $('outAnkuenfte').textContent = num(ankuenfte, 0);
    $('outBuchend').textContent = num(buchend, 0);
    $('outSessions').textContent = num(sessionsMonat, 0);
    $('outUmsatz').textContent = euro(umsatz);

    var hotelLabel, hotelWert, hotelNote;
    if(model === 'lease'){
      hotelLabel = pt('hotel.label.lease');
      hotelWert = euro(gebuehr);
      hotelNote = pt('hotel.note.lease');
    } else if(model === 'rev'){
      var hotelAnteil = umsatz * anteilPct;
      hotelLabel = pt('hotel.label.rev');
      hotelWert = euro(hotelAnteil);
      hotelNote = pt('hotel.note.rev', {pct: num(anteilPct*100,0)});
    } else {
      var hybridAnteil = umsatz * anteilPct;
      var netto = hybridAnteil - gebuehr;
      hotelLabel = pt('hotel.label.hybrid');
      hotelWert = (netto>=0?'+':'') + euro(netto);
      hotelNote = pt('hotel.note.hybrid', {fee: euro(gebuehr), pct: num(anteilPct*100,0), share: euro(hybridAnteil)});
    }
    $('outHotelLabel').textContent = hotelLabel;
    $('outHotelWert').textContent = hotelWert;
    $('outHotelNote').textContent = hotelNote;

    /* private view only - never read by the print/PDF builders below */
    var vitaroGross;
    if(model === 'lease'){ vitaroGross = umsatz + gebuehr; }
    else if(model === 'rev'){ vitaroGross = umsatz * (1 - anteilPct); }
    else { vitaroGross = umsatz * (1 - anteilPct) + gebuehr; }
    var trainer = parseFloat($('inTrainer').value) || 0;
    var geraete = parseFloat($('inGeraete').value) || 0;
    var sonstige = parseFloat($('inSonstige').value) || 0;
    var vitaroCosts = trainer + geraete + sonstige;
    var vitaroNet = vitaroGross - vitaroCosts;
    $('outVitaroGross').textContent = euro(vitaroGross);
    $('outVitaroCosts').textContent = '−' + euro(vitaroCosts);
    $('outVitaroNet').textContent = (vitaroNet>=0?'+':'') + euro(vitaroNet);

    buildPrintSummary({
      zimmer: zimmer, auslastung: auslastung*100, gaeste: gaeste, aufenthalt: aufenthalt,
      buchungsquote: buchungsquote*100, sessions: sessions, preis: preis, model: model,
      gebuehr: gebuehr, anteilPct: anteilPct*100,
      gaesteTag: gaesteTag, ankuenfte: ankuenfte, buchend: buchend, sessionsMonat: sessionsMonat,
      umsatz: umsatz, hotelLabel: hotelLabel, hotelWert: hotelWert
    });
  }

  function row(label, value){
    return '<tr><td>' + label + '</td><td>' + value + '</td></tr>';
  }

  function buildPrintSummary(d){
    document.querySelector('.print-date').textContent = new Date().toLocaleDateString(planerLang==='de'?'de-DE':'en-GB', {year:'numeric', month:'long', day:'numeric'});
    var modelNames = {lease: pt('print.model.lease'), rev: pt('print.model.rev'), hybrid: pt('print.model.hybrid')};
    var inputHtml =
      row(pt('print.row.zimmer'), num(d.zimmer,0)) +
      row(pt('print.row.auslastung'), num(d.auslastung,0) + ' %') +
      row(pt('print.row.gaeste'), num(d.gaeste,1)) +
      row(pt('print.row.aufenthalt'), num(d.aufenthalt,0) + ' ' + pt('print.row.aufenthaltUnit')) +
      row(pt('print.row.buchungsquote'), num(d.buchungsquote,1) + ' %') +
      row(pt('print.row.sessions'), num(d.sessions,1)) +
      row(pt('print.row.preis'), euro(d.preis)) +
      row(pt('print.row.model'), modelNames[d.model]);
    if(d.model !== 'rev') inputHtml += row(pt('print.row.gebuehr'), euro(d.gebuehr));
    if(d.model !== 'lease') inputHtml += row(pt('print.row.anteil'), num(d.anteilPct,0) + ' %');
    $('printInputTable').innerHTML = inputHtml;

    var resultHtml =
      row(pt('econ.result.gaesteTag.label'), num(d.gaesteTag,0)) +
      row(pt('econ.result.ankuenfte.label'), num(d.ankuenfte,0)) +
      row(pt('econ.result.buchend.label'), num(d.buchend,0)) +
      row(pt('econ.result.sessions.label'), num(d.sessionsMonat,0)) +
      row(pt('econ.result.umsatz.label'), euro(d.umsatz)) +
      row(d.hotelLabel, d.hotelWert);
    $('printResultTable').innerHTML = resultHtml;
    lastCalc = d;
  }

  var lastCalc = null;

  /* ---- branded PDF download (jsPDF), no print dialog needed ---- */
  var INK_RGB = [27,23,18], ACCENT_RGB = [166,138,115], ACCENT2_RGB = [92,74,58], DIM_RGB = [110,99,87];
  function letterSpace(s){ return s.split('').join(String.fromCharCode(8202)+String.fromCharCode(8202)); }

  function downloadPdf(){
    if(!lastCalc) calc();
    var d = lastCalc;
    var jsPDFCtor = window.jspdf && window.jspdf.jsPDF;
    if(!jsPDFCtor){ alert('PDF library did not load (offline?). Use "Print summary" instead.'); return; }
    var doc = new jsPDFCtor({unit:'mm', format:'a4'});
    var pageW = doc.internal.pageSize.getWidth();
    var margin = 20;
    var y = 20;

    doc.setFont('times','bold'); doc.setFontSize(11); doc.setTextColor.apply(doc, ACCENT_RGB);
    doc.text(letterSpace('VITARO'), margin, y);
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor.apply(doc, DIM_RGB);
    doc.text(new Date().toLocaleDateString(planerLang==='de'?'de-DE':'en-GB', {year:'numeric', month:'long', day:'numeric'}), pageW-margin, y, {align:'right'});
    y += 4;
    doc.setDrawColor.apply(doc, ACCENT_RGB); doc.setLineWidth(0.3);
    doc.line(margin, y, pageW-margin, y);
    y += 10;

    doc.setFont('times','bold'); doc.setFontSize(18); doc.setTextColor.apply(doc, INK_RGB);
    var title = doc.splitTextToSize(pt('print.title'), pageW-margin*2);
    doc.text(title, margin, y); y += title.length*7 + 2;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc, DIM_RGB);
    var sub = doc.splitTextToSize(pt('print.sub'), pageW-margin*2);
    doc.text(sub, margin, y); y += sub.length*5 + 8;

    var modelNames = {lease: pt('print.model.lease'), rev: pt('print.model.rev'), hybrid: pt('print.model.hybrid')};
    var inputRows = [
      [pt('print.row.zimmer'), num(d.zimmer,0)],
      [pt('print.row.auslastung'), num(d.auslastung,0) + ' %'],
      [pt('print.row.gaeste'), num(d.gaeste,1)],
      [pt('print.row.aufenthalt'), num(d.aufenthalt,0) + ' ' + pt('print.row.aufenthaltUnit')],
      [pt('print.row.buchungsquote'), num(d.buchungsquote,1) + ' %'],
      [pt('print.row.sessions'), num(d.sessions,1)],
      [pt('print.row.preis'), euro(d.preis)],
      [pt('print.row.model'), modelNames[d.model]]
    ];
    if(d.model !== 'rev') inputRows.push([pt('print.row.gebuehr'), euro(d.gebuehr)]);
    if(d.model !== 'lease') inputRows.push([pt('print.row.anteil'), num(d.anteilPct,0) + ' %']);

    var resultRows = [
      [pt('econ.result.gaesteTag.label'), num(d.gaesteTag,0)],
      [pt('econ.result.ankuenfte.label'), num(d.ankuenfte,0)],
      [pt('econ.result.buchend.label'), num(d.buchend,0)],
      [pt('econ.result.sessions.label'), num(d.sessionsMonat,0)],
      [pt('econ.result.umsatz.label'), euro(d.umsatz)]
    ];

    function table(rows, startY){
      var yy = startY;
      doc.setFontSize(10);
      rows.forEach(function(r){
        doc.setTextColor.apply(doc, DIM_RGB); doc.setFont('helvetica','normal');
        doc.text(r[0], margin, yy);
        doc.setTextColor.apply(doc, INK_RGB); doc.setFont('helvetica','bold');
        doc.text(String(r[1]), pageW-margin, yy, {align:'right'});
        doc.setDrawColor(217,207,191); doc.setLineWidth(0.15);
        doc.line(margin, yy+2, pageW-margin, yy+2);
        yy += 8;
      });
      return yy;
    }
    y = table(inputRows, y) + 6;
    y = table(resultRows, y) + 8;

    doc.setDrawColor.apply(doc, ACCENT_RGB); doc.setLineWidth(0.4);
    doc.line(margin, y, pageW-margin, y);
    y += 10;
    doc.setFont('times','bold'); doc.setFontSize(13); doc.setTextColor.apply(doc, ACCENT2_RGB);
    var hlLines = doc.splitTextToSize(d.hotelLabel, pageW-margin*2-60);
    doc.text(hlLines, margin, y);
    doc.setFontSize(20);
    doc.text(String(d.hotelWert), pageW-margin, y, {align:'right'});
    y += Math.max(hlLines.length*6, 9) + 4;
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor.apply(doc, DIM_RGB);
    var noteLines = doc.splitTextToSize(document.getElementById('outHotelNote').textContent, pageW-margin*2);
    doc.text(noteLines, margin, y);
    y += noteLines.length*4.2 + 10;

    doc.setFontSize(8);
    var footLines = doc.splitTextToSize(pt('pdf.footer'), pageW-margin*2);
    doc.text(footLines, margin, 287);

    doc.save('vitaro-machbarkeitscheck-' + new Date().toISOString().slice(0,10) + '.pdf');
  }

  onModelChange();
  document.getElementById('downloadEconPdfBtn').addEventListener('click', downloadPdf);
  return { recalc: calc };
})();

/* ========================================================================
   ROOM PLANNER — top-down 2D layout, meters as the source of truth,
   rendered to a scaled canvas with simplified but recognisable top-down
   equipment icons. Footprints are indicative planning sizes, not
   manufacturer specifications.
   ======================================================================== */
var RoomPlanner = (function(){
  var EQUIPMENT = [
    {type:'treadmill', key:'equip.treadmill', w:2.00, d:0.90},
    {type:'elliptical', key:'equip.elliptical', w:1.80, d:0.70},
    {type:'bike', key:'equip.bike', w:1.20, d:0.60},
    {type:'functional', key:'equip.functional', w:1.50, d:1.50},
    {type:'bench', key:'equip.bench', w:1.30, d:0.60},
    {type:'rack', key:'equip.rack', w:1.40, d:1.40},
    {type:'dumbbells', key:'equip.dumbbells', w:1.50, d:0.60},
    {type:'cable', key:'equip.cable', w:1.20, d:1.50},
    {type:'mat', key:'equip.mat', w:2.00, d:1.50},
    {type:'desk', key:'equip.desk', w:1.20, d:0.60}
  ];

  var canvas = document.getElementById('roomCanvas');
  var ctx = canvas.getContext('2d');
  var GRID = 0.1; // meters
  var scale = 80; // px per meter, recomputed to fit
  var PAD = 40; // px

  var placed = []; // {id, type, w, d, x, y, rot}
  var nextId = 1;
  var selectedId = null;
  var dragging = null; // {id, offsetXm, offsetYm}

  function equipLabel(type){
    var def = EQUIPMENT.filter(function(e){ return e.type === type; })[0];
    return def ? pt(def.key) : type;
  }

  function roomDims(){
    return {
      w: parseFloat(document.getElementById('roomWidth').value) || 8,
      d: parseFloat(document.getElementById('roomDepth').value) || 6
    };
  }
  function nicheInfo(){
    var enabled = document.getElementById('nicheEnabled').checked;
    return {
      enabled: enabled,
      x: parseFloat(document.getElementById('nicheX').value) || 0,
      y: parseFloat(document.getElementById('nicheY').value) || 0,
      w: parseFloat(document.getElementById('nicheW').value) || 0,
      h: parseFloat(document.getElementById('nicheH').value) || 0
    };
  }

  function snap(v){ return Math.round(v / GRID) * GRID; }

  function fitScale(){
    var room = roomDims();
    var wrap = canvas.parentElement;
    var availW = Math.max(wrap.clientWidth - 4, 300);
    var availH = 700;
    scale = Math.max(20, Math.min((availW - PAD*2) / room.w, (availH - PAD*2) / room.d));
    canvas.width = room.w * scale + PAD*2;
    canvas.height = room.d * scale + PAD*2;
  }

  function toPx(m){ return m * scale; }

  /* ---- per-type top-down icon drawing, in local px space (0,0)-(w,d) ---- */
  var ACCENT = '#a68a73';
  var ACCENT_DARK = '#5c4a3a';
  var INK = '#1b1712';

  function drawTreadmill(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2, 2, w-4, h-4);
    // belt
    var beltInset = h*0.18;
    c.fillStyle = 'rgba(27,21,14,0.15)';
    c.fillRect(w*0.12, beltInset, w*0.76, h - beltInset*2);
    c.strokeStyle = INK; c.lineWidth = 1;
    for(var i=1;i<6;i++){
      var yy = beltInset + (h-beltInset*2)*(i/6);
      c.beginPath(); c.moveTo(w*0.14, yy); c.lineTo(w*0.86, yy); c.stroke();
    }
    // console
    c.fillStyle = ACCENT_DARK;
    c.fillRect(w*0.86, h*0.15, w*0.10, h*0.7);
    // side rails
    c.strokeStyle = ACCENT_DARK; c.lineWidth = 2;
    c.beginPath(); c.moveTo(w*0.15,4); c.lineTo(w*0.82,4); c.stroke();
    c.beginPath(); c.moveTo(w*0.15,h-4); c.lineTo(w*0.82,h-4); c.stroke();
  }
  function drawElliptical(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.strokeStyle = ACCENT_DARK; c.lineWidth = 1.5;
    // two foot pedals as ellipses front-to-back
    [0.32, 0.68].forEach(function(fx){
      c.beginPath();
      c.ellipse(w*fx, h/2, w*0.13, h*0.32, 0, 0, Math.PI*2);
      c.stroke();
    });
    c.beginPath(); c.moveTo(w*0.5-2, 6); c.lineTo(w*0.5-2, h-6); c.stroke();
  }
  function drawBike(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.strokeStyle = ACCENT_DARK; c.lineWidth = 1.5;
    // frame diagonal
    c.beginPath(); c.moveTo(w*0.15, h*0.8); c.lineTo(w*0.75, h*0.2); c.stroke();
    // seat circle (top-down = small circle) and wheel-ish base circle
    c.beginPath(); c.arc(w*0.78, h*0.22, Math.min(w,h)*0.12, 0, Math.PI*2); c.stroke();
    c.beginPath(); c.arc(w*0.18, h*0.78, Math.min(w,h)*0.16, 0, Math.PI*2); c.stroke();
  }
  function drawFunctional(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.strokeStyle = ACCENT_DARK; c.lineWidth = 2;
    // two uprights (towers) at left/right, seen from above as squares
    var t = Math.min(w,h)*0.16;
    c.strokeRect(4,4,t,t);
    c.strokeRect(w-4-t,4,t,t);
    c.strokeRect(4,h-4-t,t,t);
    c.strokeRect(w-4-t,h-4-t,t,t);
    // cross braces
    c.beginPath(); c.moveTo(4+t/2,4+t/2); c.lineTo(w-4-t/2,h-4-t/2); c.stroke();
    c.beginPath(); c.moveTo(w-4-t/2,4+t/2); c.lineTo(4+t/2,h-4-t/2); c.stroke();
  }
  function drawBench(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.fillStyle = 'rgba(166,138,115,0.4)';
    c.fillRect(w*0.1, h*0.25, w*0.8, h*0.5);
    c.strokeStyle = ACCENT_DARK; c.lineWidth = 1;
    c.strokeRect(w*0.1, h*0.25, w*0.8, h*0.5);
    // leg marks (small squares at corners)
    [[0.08,0.08],[0.88,0.08],[0.08,0.84],[0.88,0.84]].forEach(function(p){
      c.fillStyle = INK;
      c.fillRect(w*p[0], h*p[1], w*0.05, h*0.08);
    });
  }
  function drawRack(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.fillStyle = ACCENT_DARK;
    var s = Math.min(w,h)*0.14;
    [[0.08,0.08],[0.92,0.08],[0.08,0.92],[0.92,0.92]].forEach(function(p){
      c.beginPath(); c.arc(w*p[0], h*p[1], s/2, 0, Math.PI*2); c.fill();
    });
    c.strokeStyle = ACCENT; c.lineWidth = 1;
    c.strokeRect(w*0.2, h*0.2, w*0.6, h*0.6);
  }
  function drawDumbbells(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.fillStyle = ACCENT_DARK;
    var cols = 5, rows = 2;
    for(var r=0;r<rows;r++){
      for(var cIdx=0;cIdx<cols;cIdx++){
        var cx = w*(0.12 + cIdx*(0.76/(cols-1)));
        var cy = h*(0.3 + r*0.4);
        c.beginPath();
        c.ellipse(cx, cy, w*0.045, h*0.12, 0, 0, Math.PI*2);
        c.fill();
      }
    }
  }
  function drawCable(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.fillStyle = ACCENT_DARK;
    c.fillRect(w*0.42, 4, w*0.16, h-8);
    c.strokeStyle = ACCENT; c.lineWidth = 1;
    c.beginPath(); c.moveTo(w*0.5, h*0.15); c.lineTo(w*0.15, h*0.75); c.stroke();
    c.beginPath(); c.moveTo(w*0.5, h*0.15); c.lineTo(w*0.85, h*0.75); c.stroke();
  }
  function drawMat(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.strokeRect(2,2,w-4,h-4);
    c.strokeStyle = 'rgba(27,21,14,0.18)'; c.lineWidth = 1;
    var step = Math.min(w,h)/5;
    for(var x=step;x<w;x+=step){ c.beginPath(); c.moveTo(x,2); c.lineTo(x,h-2); c.stroke(); }
    for(var y=step;y<h;y+=step){ c.beginPath(); c.moveTo(2,y); c.lineTo(w-2,y); c.stroke(); }
  }
  function drawDesk(c, w, h){
    c.strokeStyle = INK; c.lineWidth = 1.5;
    c.fillStyle = 'rgba(166,138,115,0.35)';
    c.beginPath();
    c.moveTo(2,2); c.lineTo(w-2,2); c.lineTo(w-2,h*0.6); c.lineTo(w*0.6,h-2); c.lineTo(2,h-2); c.closePath();
    c.fill(); c.stroke();
  }
  var ICON_DRAW = {
    treadmill: drawTreadmill, elliptical: drawElliptical, bike: drawBike,
    functional: drawFunctional, bench: drawBench, rack: drawRack,
    dumbbells: drawDumbbells, cable: drawCable, mat: drawMat, desk: drawDesk
  };

  function draw(){
    var room = roomDims();
    var niche = nicheInfo();
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();
    ctx.translate(PAD, PAD);

    // room floor
    ctx.fillStyle = '#fffdf8';
    ctx.fillRect(0, 0, toPx(room.w), toPx(room.d));

    // grid (every 0.5m)
    ctx.strokeStyle = 'rgba(27,21,14,0.08)';
    ctx.lineWidth = 1;
    for(var gx=0; gx<=room.w+0.001; gx+=0.5){
      ctx.beginPath(); ctx.moveTo(toPx(gx),0); ctx.lineTo(toPx(gx), toPx(room.d)); ctx.stroke();
    }
    for(var gy=0; gy<=room.d+0.001; gy+=0.5){
      ctx.beginPath(); ctx.moveTo(0, toPx(gy)); ctx.lineTo(toPx(room.w), toPx(gy)); ctx.stroke();
    }

    // room outline
    ctx.strokeStyle = '#1b1712';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, toPx(room.w), toPx(room.d));

    // niche / obstacle (hatched)
    if(niche.enabled && niche.w > 0 && niche.h > 0){
      ctx.save();
      ctx.fillStyle = 'rgba(179,38,30,0.12)';
      ctx.fillRect(toPx(niche.x), toPx(niche.y), toPx(niche.w), toPx(niche.h));
      ctx.strokeStyle = '#b3261e';
      ctx.setLineDash([5,4]);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(toPx(niche.x), toPx(niche.y), toPx(niche.w), toPx(niche.h));
      ctx.setLineDash([]);
      ctx.fillStyle = '#b3261e';
      ctx.font = '11px Arial';
      ctx.fillText(pt('room.niche.tag'), toPx(niche.x)+4, toPx(niche.y)+14);
      ctx.restore();
    }

    // equipment
    placed.forEach(function(item){
      var w = item.rot ? item.d : item.w;
      var d = item.rot ? item.w : item.d;
      var x = toPx(item.x), y = toPx(item.y), pw = toPx(w), pd = toPx(d);
      ctx.save();
      ctx.translate(x, y);
      var drawFn = ICON_DRAW[item.type];
      if(drawFn){ drawFn(ctx, pw, pd); } else {
        ctx.fillStyle = 'rgba(166,138,115,0.35)'; ctx.fillRect(0,0,pw,pd);
        ctx.strokeStyle = ACCENT_DARK; ctx.strokeRect(0,0,pw,pd);
      }
      if(item.id === selectedId){
        ctx.strokeStyle = '#b3261e'; ctx.lineWidth = 2; ctx.setLineDash([4,3]);
        ctx.strokeRect(-2,-2,pw+4,pd+4);
        ctx.setLineDash([]);
      }
      ctx.restore();

      ctx.fillStyle = '#1b1712';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      wrapText(equipLabel(item.type), x + pw/2, y + pd + 3, Math.max(pw, 70));
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    });

    ctx.restore();

    // area info
    var totalArea = room.w * room.d;
    var nicheArea = niche.enabled ? niche.w * niche.h : 0;
    var usable = totalArea - nicheArea;
    var used = placed.reduce(function(sum, it){ return sum + it.w*it.d; }, 0);
    document.getElementById('roomAreaInfo').textContent = pt('room.areaInfo', {
      total: totalArea.toFixed(1), usable: usable.toFixed(1), used: used.toFixed(1),
      pct: usable>0 ? Math.round(used/usable*100) : 0
    });
  }

  function wrapText(text, cx, cy, maxWidth){
    var words = text.split(' ');
    var lines = [];
    var line = '';
    words.forEach(function(w){
      var test = line ? line + ' ' + w : w;
      if(ctx.measureText(test).width > maxWidth && line){
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    if(line) lines.push(line);
    var lineHeight = 11;
    lines.forEach(function(l, i){ ctx.fillText(l, cx, cy + i*lineHeight); });
  }

  function hitTest(xm, ym){
    for(var i=placed.length-1; i>=0; i--){
      var it = placed[i];
      var w = it.rot ? it.d : it.w;
      var d = it.rot ? it.w : it.d;
      if(xm >= it.x && xm <= it.x+w && ym >= it.y && ym <= it.y+d) return it;
    }
    return null;
  }

  function canvasToRoom(evt){
    var rect = canvas.getBoundingClientRect();
    var px = (evt.clientX - rect.left) - PAD;
    var py = (evt.clientY - rect.top) - PAD;
    return { x: px/scale, y: py/scale };
  }

  function buildPalette(){
    var pal = document.getElementById('equipmentPalette');
    pal.innerHTML = '';
    EQUIPMENT.forEach(function(eq){
      var el = document.createElement('div');
      el.className = 'equip-item';
      el.draggable = true;
      el.innerHTML = '<span class="equip-swatch"></span><span>' + pt(eq.key) + '</span><span style="opacity:.6">' + eq.w.toFixed(2) + '×' + eq.d.toFixed(2) + ' m</span>';
      el.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text/plain', eq.type);
      });
      pal.appendChild(el);
    });
  }

  function addEquipment(type, xm, ym){
    var def = EQUIPMENT.filter(function(e){ return e.type === type; })[0];
    if(!def) return;
    var item = { id: nextId++, type: def.type, w: def.w, d: def.d, x: snap(xm), y: snap(ym), rot: false };
    placed.push(item);
    selectedId = item.id;
    draw();
  }

  function initEvents(){
    canvas.addEventListener('dragover', function(e){ e.preventDefault(); });
    canvas.addEventListener('drop', function(e){
      e.preventDefault();
      var type = e.dataTransfer.getData('text/plain');
      var pos = canvasToRoom(e);
      addEquipment(type, pos.x, pos.y);
    });
    canvas.addEventListener('mousedown', function(e){
      var pos = canvasToRoom(e);
      var hit = hitTest(pos.x, pos.y);
      selectedId = hit ? hit.id : null;
      if(hit){ dragging = { id: hit.id, offX: pos.x - hit.x, offY: pos.y - hit.y }; }
      draw();
    });
    window.addEventListener('mousemove', function(e){
      if(!dragging) return;
      var pos = canvasToRoom(e);
      var it = placed.filter(function(p){ return p.id === dragging.id; })[0];
      if(!it) return;
      it.x = snap(pos.x - dragging.offX);
      it.y = snap(pos.y - dragging.offY);
      draw();
    });
    window.addEventListener('mouseup', function(){ dragging = null; });

    window.addEventListener('keydown', function(e){
      if(selectedId === null) return;
      if(e.key === 'r' || e.key === 'R'){ rotateSelected(); }
      if(e.key === 'Delete' || e.key === 'Backspace'){
        if(document.activeElement && document.activeElement.tagName === 'INPUT') return;
        deleteSelected();
      }
    });

    document.getElementById('rotateBtn').addEventListener('click', rotateSelected);
    document.getElementById('deleteBtn').addEventListener('click', deleteSelected);
    document.getElementById('clearBtn').addEventListener('click', function(){
      if(confirm(pt('room.confirmClear'))){ placed = []; selectedId = null; draw(); }
    });

    ['roomWidth','roomDepth','nicheEnabled','nicheX','nicheY','nicheW','nicheH'].forEach(function(id){
      document.getElementById(id).addEventListener('input', resizeAndDraw);
      document.getElementById(id).addEventListener('change', resizeAndDraw);
    });

    document.getElementById('saveLayoutBtn').addEventListener('click', function(){
      var data = { room: roomDims(), niche: nicheInfo(), placed: placed };
      try{
        localStorage.setItem('vitaro-planer-layout', JSON.stringify(data));
        alert(pt('room.alertSaved'));
      }catch(e){ alert(pt('room.alertSaveFail') + e.message); }
    });
    document.getElementById('loadLayoutBtn').addEventListener('click', function(){
      try{
        var raw = localStorage.getItem('vitaro-planer-layout');
        if(!raw){ alert(pt('room.alertNoLayout')); return; }
        var data = JSON.parse(raw);
        document.getElementById('roomWidth').value = data.room.w;
        document.getElementById('roomDepth').value = data.room.d;
        document.getElementById('nicheEnabled').checked = data.niche.enabled;
        document.getElementById('nicheX').value = data.niche.x;
        document.getElementById('nicheY').value = data.niche.y;
        document.getElementById('nicheW').value = data.niche.w;
        document.getElementById('nicheH').value = data.niche.h;
        placed = data.placed || [];
        nextId = placed.reduce(function(max,p){ return Math.max(max, p.id+1); }, 1);
        resizeAndDraw();
      }catch(e){ alert(pt('room.alertLoadFail') + e.message); }
    });
    document.getElementById('exportPngBtn').addEventListener('click', function(){
      var link = document.createElement('a');
      link.download = 'vitaro-raumplan.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  function rotateSelected(){
    var it = placed.filter(function(p){ return p.id === selectedId; })[0];
    if(it){ it.rot = !it.rot; draw(); }
  }
  function deleteSelected(){
    placed = placed.filter(function(p){ return p.id !== selectedId; });
    selectedId = null;
    draw();
  }
  function resizeAndDraw(){ fitScale(); draw(); }
  function rebuildPaletteAndDraw(){ buildPalette(); draw(); }

  /* ---- branded PDF export of the finished floor plan ---- */
  var INK_RGB2 = [27,23,18], ACCENT_RGB2 = [166,138,115], ACCENT2_RGB2 = [92,74,58], DIM_RGB2 = [110,99,87];
  function letterSpace2(s){ return s.split('').join(String.fromCharCode(8202)+String.fromCharCode(8202)); }

  function downloadRoomPdf(){
    var jsPDFCtor = window.jspdf && window.jspdf.jsPDF;
    if(!jsPDFCtor){ alert('PDF library did not load (offline?).'); return; }
    // don't bake the on-screen selection highlight into the exported plan
    var savedSelection = selectedId;
    selectedId = null;
    draw();
    var room = roomDims();
    var niche = nicheInfo();
    var totalArea = room.w * room.d;
    var nicheArea = niche.enabled ? niche.w * niche.h : 0;
    var usable = totalArea - nicheArea;
    var used = placed.reduce(function(sum, it){ return sum + it.w*it.d; }, 0);

    var doc = new jsPDFCtor({unit:'mm', format:'a4'});
    var pageW = doc.internal.pageSize.getWidth();
    var margin = 16;
    var y = 18;

    doc.setFont('times','bold'); doc.setFontSize(11); doc.setTextColor.apply(doc, ACCENT_RGB2);
    doc.text(letterSpace2('VITARO'), margin, y);
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor.apply(doc, DIM_RGB2);
    doc.text(new Date().toLocaleDateString(planerLang==='de'?'de-DE':'en-GB', {year:'numeric', month:'long', day:'numeric'}), pageW-margin, y, {align:'right'});
    y += 4;
    doc.setDrawColor.apply(doc, ACCENT_RGB2); doc.setLineWidth(0.3);
    doc.line(margin, y, pageW-margin, y);
    y += 9;

    doc.setFont('times','bold'); doc.setFontSize(16); doc.setTextColor.apply(doc, INK_RGB2);
    doc.text(pt('pdf.room.title'), margin, y);
    y += 8;

    // stat line
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc, DIM_RGB2);
    var statLine = pt('pdf.room.roomLabel')+': '+totalArea.toFixed(1)+' m²   ·   '+pt('pdf.room.usableLabel')+': '+usable.toFixed(1)+' m²   ·   '+pt('pdf.room.usedLabel')+': '+used.toFixed(1)+' m² ('+(usable>0?Math.round(used/usable*100):0)+' %)';
    doc.text(statLine, margin, y);
    y += 8;

    // embed the canvas snapshot, scaled to fit the page width
    var imgData = canvas.toDataURL('image/png');
    var imgW = pageW - margin*2;
    var imgH = imgW * (canvas.height / canvas.width);
    var maxImgH = 150;
    if(imgH > maxImgH){ imgH = maxImgH; imgW = imgH * (canvas.width/canvas.height); }
    var imgX = margin + ((pageW-margin*2) - imgW)/2;
    doc.setDrawColor.apply(doc, ACCENT_RGB2); doc.setLineWidth(0.2);
    doc.rect(imgX-1, y-1, imgW+2, imgH+2);
    doc.addImage(imgData, 'PNG', imgX, y, imgW, imgH);
    y += imgH + 10;

    // equipment list
    if(placed.length){
      doc.setFont('times','bold'); doc.setFontSize(12); doc.setTextColor.apply(doc, ACCENT2_RGB2);
      doc.text(pt('pdf.room.equipListTitle'), margin, y);
      y += 6;
      doc.setFontSize(9);
      var counts = {};
      placed.forEach(function(it){ counts[it.type] = (counts[it.type]||0)+1; });
      Object.keys(counts).forEach(function(type){
        var def = EQUIPMENT.filter(function(e){ return e.type===type; })[0];
        var label = def ? pt(def.key) : type;
        doc.setTextColor.apply(doc, DIM_RGB2); doc.setFont('helvetica','normal');
        doc.text('• ' + label + ' × ' + counts[type] + '  (' + def.w.toFixed(2) + '×' + def.d.toFixed(2) + ' m)', margin, y);
        y += 5.5;
      });
      y += 6;
    }

    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor.apply(doc, DIM_RGB2);
    var footLines = doc.splitTextToSize(pt('pdf.room.footer'), pageW-margin*2);
    doc.text(footLines, margin, 287);

    doc.save('vitaro-raumplan-' + new Date().toISOString().slice(0,10) + '.pdf');

    selectedId = savedSelection;
    draw();
  }

  buildPalette();
  initEvents();
  fitScale();
  document.getElementById('downloadRoomPdfBtn').addEventListener('click', downloadRoomPdf);

  return { resizeAndDraw: resizeAndDraw, draw: draw, rebuildPaletteAndDraw: rebuildPaletteAndDraw };
})();
