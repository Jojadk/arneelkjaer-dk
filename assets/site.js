/* Fælles funktioner for alle sider */
(function () {
  /* E-mail samles først i browseren, så spam-robotter ikke kan læse den i kildekoden */
  var u = ['forvirring', 'smudsigere4x'].join('-'), d = ['icloud', 'com'].join('.'),
      m = u + String.fromCharCode(64) + d;
  document.querySelectorAll('a.js-mail').forEach(function (a) {
    var s = a.getAttribute('data-subject');
    a.href = 'mai' + 'lto:' + m + (s ? '?subject=' + encodeURIComponent(s) : '');
    if (a.hasAttribute('data-show')) a.textContent = m;
  });

  /* Aktiver AdSense-pladser */
  document.querySelectorAll('ins.adsbygoogle').forEach(function () {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  });

  /* Marker aktivt afsnit i indholdsfortegnelsen */
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {};
  links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && map[en.target.id]) {
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        map[en.target.id].setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
})();
