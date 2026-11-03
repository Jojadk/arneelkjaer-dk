/*
  Trafikmåling med Google Analytics 4
  -----------------------------------
  Indsæt dit Måle-ID fra Google Analytics herunder (ser ud som G-XXXXXXXXXX).
  Så måles alle sider automatisk: hvor mange besøg, hvilke sider, og hvor
  trafikken kommer fra (Google-søgning, sociale medier, links, direkte osv.).

  Samtykke: måling og annoncecookies er som standard slået FRA, indtil den
  besøgende giver samtykke via Googles samtykkebesked (slås til i AdSense under
  "Privatliv og beskeder"). Uden samtykke sendes kun anonyme, cookiefri signaler.
*/
var GA_MEASUREMENT_ID = '';

window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});

(function () {
  if (!/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  // Mål klik på udgående links og e-mail, så du kan se, hvad besøgende gør
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) {
      gtag('event', 'kontakt_klik', { link_text: a.textContent.trim().slice(0, 60) });
    } else if (a.hostname && a.hostname !== location.hostname) {
      gtag('event', 'udgaaende_link', { link_url: a.href });
    }
  });
})();
