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

  /* Hovedmenu: mobilmenu og "Emner"-panel */
  var btn = document.querySelector('.menu-btn'), mnav = document.getElementById('mainnav');
  var trig = document.querySelector('.mn-trigger'), panel = document.getElementById('mn-emner');
  var mq = window.matchMedia('(max-width:860px)');
  function setMobile(open) {
    if (!btn) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('.mb-label').textContent = open ? 'Luk' : 'Menu';
    mnav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  }
  function setPanel(open) {
    if (!trig) return;
    trig.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('open', open);
  }
  if (btn) btn.addEventListener('click', function () { setMobile(btn.getAttribute('aria-expanded') !== 'true'); });
  if (trig) trig.addEventListener('click', function (e) { e.stopPropagation(); setPanel(trig.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('click', function (e) {
    if (panel && panel.classList.contains('open') && !panel.contains(e.target)) setPanel(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (panel && panel.classList.contains('open')) { setPanel(false); trig.focus(); }
    if (mnav && mnav.classList.contains('open')) { setMobile(false); btn.focus(); }
  });
  if (mnav) mnav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setMobile(false); setPanel(false); }
  });
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function () { setMobile(false); setPanel(false); });

  /* Til toppen-knap og læse-fremskridt */
  var top = document.createElement('button');
  top.className = 'totop'; top.type = 'button'; top.setAttribute('aria-label', 'Til toppen af siden');
  top.innerHTML = '<svg class="ico" aria-hidden="true"><use href="/assets/icons.svg#i-arrow-up"/></svg>';
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(top);
  var bar = null;
  if (document.querySelector('article')) {
    bar = document.createElement('div'); bar.className = 'readbar'; bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
  }
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    top.classList.toggle('show', y > 600);
    if (bar && h > 0) bar.style.width = Math.min(100, y / h * 100) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

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
