/* ---------- SITE CONFIG (the single place to switch things live) ----------
   BOOKING_URL         Cal.com / Calendly link. Empty = every [data-booking-link]
                       keeps its fallback href (the contact form) and the
                       kontakt page hides its booking button.
   FORMSPREE_ENDPOINT  https://formspree.io/f/<id>. Empty = the form shows a
                       "not live yet" notice instead of silently posting.
   CONTACT_EMAIL       Real mailbox. Empty = email button stays hidden and the
                       pending note on kontakt.html stays visible. ---------- */
var BOOKING_URL = '';
var FORMSPREE_ENDPOINT = '';
var CONTACT_EMAIL = '';

(function(){
  var links = document.querySelectorAll('[data-booking-link]');
  for(var i = 0; i < links.length; i++){
    if(BOOKING_URL){
      links[i].setAttribute('href', BOOKING_URL);
      links[i].setAttribute('target', '_blank');
      links[i].setAttribute('rel', 'noopener');
    }
  }
  var bookingBtn = document.getElementById('bookingBtn');
  if(bookingBtn && !BOOKING_URL){ bookingBtn.hidden = true; }

  var mail = document.querySelector('[data-contact-email]');
  var pending = document.getElementById('contactEmailPending');
  if(mail && CONTACT_EMAIL){
    mail.setAttribute('href', 'mailto:' + CONTACT_EMAIL);
    mail.textContent = CONTACT_EMAIL;
    mail.hidden = false;
    if(pending){ pending.hidden = true; }
  }
})();

/* ---------- HERO SLIDESHOW (crossfade through .hero-bg-slide layers,
   5s per image, paused for prefers-reduced-motion). Runs on both mobile
   and desktop - style.css swaps in landscape-cropped images per
   breakpoint, same 6 slide elements either way. ---------- */
(function(){
  var slides = document.querySelectorAll('.hero-bg-slide');
  if(slides.length < 2) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var current = 0;
  setInterval(function(){
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
})();

/* ---------- HEADER SCROLL STATE (transparent-over-hero on load, solid once
   scrolled — only visually active on the homepage, see style.css) ---------- */
(function(){
  var header = document.querySelector('header');
  if(!header) return;
  var syncScrolled = function(){
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  syncScrolled();
  window.addEventListener('scroll', syncScrolled, { passive: true });
})();

/* ---------- THEME ---------- */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
}
function toggleTheme(){
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  var next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('vitaro-theme', next);
  localStorage.setItem('vitaro-theme-manual', '1');
}
if(window.matchMedia){
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
    if(!localStorage.getItem('vitaro-theme-manual')){
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* ---------- MOBILE MENU ---------- */
var MOBILE_NAV_BREAKPOINT = 1220; // keep in sync with style.css nav breakpoint (max-width:1220px / min-width:1221px)
function toggleMobileMenu(){
  var panel = document.getElementById('navPanel');
  if(!panel) return;
  if(panel.classList.contains('open')){ closeMobileMenu(); }
  else{ openMobileMenu(); }
}
function openMobileMenu(){
  var panel = document.getElementById('navPanel');
  var btn = document.getElementById('menuToggle');
  var backdrop = document.getElementById('navBackdrop');
  if(!panel || !btn) return;
  panel.classList.add('open');
  btn.classList.add('active');
  btn.setAttribute('aria-expanded', 'true');
  if(backdrop) backdrop.classList.add('open');
  document.body.classList.add('nav-open');
}
function closeMobileMenu(){
  var panel = document.getElementById('navPanel');
  var btn = document.getElementById('menuToggle');
  var backdrop = document.getElementById('navBackdrop');
  if(!panel || !btn) return;
  panel.classList.remove('open');
  btn.classList.remove('active');
  btn.setAttribute('aria-expanded', 'false');
  if(backdrop) backdrop.classList.remove('open');
  document.body.classList.remove('nav-open');
}
document.querySelectorAll('.nav-links a').forEach(function(a){
  a.addEventListener('click', closeMobileMenu);
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeMobileMenu();
});
window.addEventListener('resize', function(){
  if(window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMobileMenu();
});

/* ---------- FAQ (only one open at a time, optional nicety) ---------- */
document.querySelectorAll('.faq-list').forEach(function(list){
  list.addEventListener('toggle', function(e){
    if(e.target.tagName !== 'DETAILS' || !e.target.open) return;
    list.querySelectorAll('details[open]').forEach(function(d){
      if(d !== e.target) d.removeAttribute('open');
    });
  }, true);
});

/* ---------- CONTACT FORM: Formspree via fetch (JSON), reusing #formSuccess.
   Native HTML5 validation runs first (no novalidate). AJAX keeps the visitor
   on the page and works on any host path (GitHub Pages subpath included),
   and Formspree's redirect feature is paid-tier only. ---------- */
(function(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  var langField = document.getElementById('formPageLang');
  var errorEl = document.getElementById('formError');
  var submitBtn = document.getElementById('formSubmit');
  var wrap = document.getElementById('contactFormWrap');
  var success = document.getElementById('formSuccess');

  var t = function(key){
    if(typeof translations === 'undefined') return '';
    var lang = document.documentElement.lang || 'en';
    var dict = translations[lang] || translations.en || {};
    return dict[key] || '';
  };
  var showError = function(key){
    if(!errorEl) return;
    var msg = t(key);
    if(msg){ errorEl.textContent = msg; }
    errorEl.hidden = false;
  };

  if(FORMSPREE_ENDPOINT){ form.setAttribute('action', FORMSPREE_ENDPOINT); }

  form.addEventListener('submit', function(e){
    var consent = form.querySelector('#formConsent');
    if(consent && !consent.checked){
      e.preventDefault();
      consent.focus();
      return;
    }
    if(!form.checkValidity()){ return; }
    e.preventDefault();
    if(errorEl){ errorEl.hidden = true; }
    if(!FORMSPREE_ENDPOINT){ showError('kt.form.inactive'); return; }
    if(langField){ langField.value = document.documentElement.lang || 'en'; }
    if(submitBtn){ submitBtn.disabled = true; }

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(res){
      if(!res.ok){ throw new Error('HTTP ' + res.status); }
      return res.json().catch(function(){ return {}; });
    }).then(function(){
      if(wrap){ wrap.style.display = 'none'; }
      if(success){
        success.style.display = 'block';
        var h = success.querySelector('h2');
        if(h){ h.focus(); }
      }
      try{ history.replaceState(null, '', location.pathname + '?submitted=true'); }catch(err){}
    }).catch(function(){
      showError('kt.form.error');
      if(submitBtn){ submitBtn.disabled = false; }
    });
  });
})();