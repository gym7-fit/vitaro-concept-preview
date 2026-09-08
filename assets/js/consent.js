/* ---------- TWO-CLICK MAP CONSENT ----------
   Google Maps embeds load third-party resources (and can set cookies)
   before the visitor has agreed to anything. To stay clean under the
   GDPR/DSGVO we never load the iframe automatically — only after an
   explicit click on the placeholder, and we remember that choice for
   next time via localStorage.
*/
function loadMap(containerId){
  var el = document.getElementById(containerId);
  if(!el) return;
  var src = el.getAttribute('data-map-src');
  var title = el.getAttribute('data-map-title') || 'Google Maps';
  if(!src) return;
  el.innerHTML =
    '<iframe src="' + src + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + title + '"></iframe>';
  try{ localStorage.setItem('vitaro-maps-consent', '1'); }catch(e){}
}

document.addEventListener('DOMContentLoaded', function(){
  var consented = false;
  try{ consented = localStorage.getItem('vitaro-maps-consent') === '1'; }catch(e){}
  if(!consented) return;
  document.querySelectorAll('[data-map-src]').forEach(function(el){
    loadMap(el.id);
  });
});

/* ---------- SITE-WIDE CONSENT NOTICE ----------
   Small, honest banner (not a heavy cookie wall) explaining that
   third-party content (Google Maps) only loads on click. Shown once
   until dismissed.
*/
(function(){
  function initBanner(){
    var banner = document.getElementById('consentBanner');
    if(!banner) return;
    var dismissed = false;
    try{ dismissed = localStorage.getItem('vitaro-consent-notice') === '1'; }catch(e){}
    if(dismissed) return;

    // Reserve space at the bottom of the page for the fixed banner so it
    // never covers footer links/buttons on mobile. Re-measured on resize
    // and language switch, since the banner's height changes with them.
    function syncSpacing(){
      if(banner.classList.contains('visible')){
        document.body.style.paddingBottom = banner.offsetHeight + 'px';
      }
    }
    if(window.ResizeObserver){
      new ResizeObserver(syncSpacing).observe(banner);
    } else {
      window.addEventListener('resize', syncSpacing);
    }

    setTimeout(function(){
      banner.classList.add('visible');
      syncSpacing();
    }, 600);

    var closeBtn = document.getElementById('consentDismiss');
    if(closeBtn){
      closeBtn.addEventListener('click', function(){
        banner.classList.remove('visible');
        document.body.style.paddingBottom = '';
        try{ localStorage.setItem('vitaro-consent-notice', '1'); }catch(e){}
      });
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();
