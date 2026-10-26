// Overclock — page behaviour: logo mark, page switching, service accordion, mobile menu.
(function () {
  'use strict';

  // ---------- Logo mark: two spinning rings of rays around a circle ----------
  var NS = 'http://www.w3.org/2000/svg';
  function rays(n, r1, r2, off) {
    var g = document.createElementNS(NS, 'g');
    for (var i = 0; i < n; i++) {
      var a = (i + off) / n * Math.PI * 2, s = Math.sin(a), c = Math.cos(a);
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', (50 + r1 * s).toFixed(2)); l.setAttribute('y1', (50 - r1 * c).toFixed(2));
      l.setAttribute('x2', (50 + r2 * s).toFixed(2)); l.setAttribute('y2', (50 - r2 * c).toFixed(2));
      g.appendChild(l);
    }
    return g;
  }
  document.querySelectorAll('.mark').forEach(function (el) {
    var size = el.getAttribute('data-size') || 30;
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', size); svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', el.getAttribute('data-color') || '#047A6F');
    svg.setAttribute('stroke-width', '3.6'); svg.setAttribute('stroke-linecap', 'round');
    var inner = rays(40, 21, 35, 0); inner.setAttribute('class', 'r1');
    var outer = rays(40, 40, 47, 0.5); outer.setAttribute('class', 'r2');
    var dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', 50); dot.setAttribute('cy', 50); dot.setAttribute('r', 11); dot.setAttribute('stroke-width', '2.7');
    svg.appendChild(inner); svg.appendChild(outer); svg.appendChild(dot);
    el.appendChild(svg);
  });

  // ---------- Service accordion (one open at a time) ----------
  var rows = Array.prototype.slice.call(document.querySelectorAll('.svc-row'));
  function openService(index) {
    rows.forEach(function (row, i) {
      var open = i === index;
      row.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.getElementById(row.getAttribute('aria-controls')).hidden = !open;
    });
  }
  rows.forEach(function (row, i) {
    row.addEventListener('click', function () {
      openService(row.getAttribute('aria-expanded') === 'true' ? -1 : i);
    });
  });

  // ---------- Pages ----------
  // Each section lists the pages it appears on (data-pages for desktop,
  // data-pages-mobile for phones). The footer/contact block is always shown.
  var PAGES = ['home', 'about', 'services', 'team', 'work', 'contact'];
  var TITLES = {
    home: 'Overclock — Growth & Experience Advisory',
    about: 'About — Overclock', services: 'Services — Overclock', team: 'Team — Overclock',
    work: 'Work — Overclock', contact: 'Contact — Overclock'
  };
  var desktop = window.matchMedia('(min-width: 900px)');
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');

  function currentPage() {
    var h = location.hash.replace('#', '');
    return PAGES.indexOf(h) >= 0 ? h : 'home';
  }
  function render() {
    var page = currentPage();
    document.body.setAttribute('data-page', page);
    var attr = desktop.matches ? 'data-pages' : 'data-pages-mobile';
    document.querySelectorAll('[data-pages]').forEach(function (sec) {
      sec.hidden = (sec.getAttribute(attr) || '').split(' ').indexOf(page) < 0;
    });
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var on = a.getAttribute('data-nav') === page;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = TITLES[page];
  }
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }

  // Orbit labels in the hero open their service on the Services page.
  document.querySelectorAll('[data-open]').forEach(function (a) {
    a.addEventListener('click', function () { openService(Number(a.getAttribute('data-open'))); });
  });
  menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });

  window.addEventListener('hashchange', function () {
    setMenu(false);
    render();
    window.scrollTo(0, 0);
  });
  desktop.addEventListener('change', render);

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  render();
  if (location.hash) window.scrollTo(0, 0);
})();
