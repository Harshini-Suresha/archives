(function () {
  'use strict';
  var S = window.SITE;
  if (!S) return;
  var W = S.W, G = S.G, C = S.C, P = S.projects, TAGS = S.tags;
  var $ = function (s) { return document.querySelector(s); };
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var LBL = {};
  TAGS.forEach(function (t) { LBL[t[0]] = t[1]; });

  function esc(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function btn(u, l) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + l + '</a>'; }
  function labels(p) { return p.t.map(function (x) { return LBL[x]; }).join(' · '); }

  /* ---------- render ---------- */
  function card(p) {
    var b = '';
    if (p.app) b += btn(p.app, 'App');
    b += btn(G + p.gh, 'GitHub');
    if (p.co) b += btn(C + p.co, 'Colab');
    if (p.dl) b += btn(p.dl, 'Docking lab');
    if (p.dk) b += btn(p.dk, 'Data');
    if (p.pp) b += btn(p.pp, 'Paper');
    var shot = p.shot
      ? '<img class="shot" src="' + esc(p.shot) + '" alt="Screenshot of the ' + esc(p.n) + ' project website" loading="lazy" decoding="async" width="1400" height="787">'
      : '';
    var el = document.createElement('article');
    el.className = 'proj' + (p.pin ? ' pin' : '');
    el.dataset.s = (p.n + ' ' + p.d + ' ' + p.t.map(function (x) { return LBL[x]; }).join(' ')).toLowerCase();
    el.dataset.t = p.t.concat(p.app ? ['live'] : []).join(' ');
    el.dataset.n = p.n;
    el.dataset.i = P.indexOf(p);
    el.innerHTML = shot +
      '<a class="pname" href="' + esc(W + p.w) + '" target="_blank" rel="noopener"><span>' + esc(p.n) + '</span><span class="go" aria-hidden="true">→</span></a>' +
      '<p>' + esc(p.d) + '</p><div class="tgs">' + esc(labels(p)) + '</div><div class="btns">' + b + '</div>';
    return el;
  }
  var pinned = $('#pinned'), projects = $('#projects'), papers = $('#papers');
  P.forEach(function (p) { (p.pin ? pinned : (p.k === 'r' ? papers : projects)).appendChild(card(p)); });

  /* ---------- stats ---------- */
  function n(fn) { return P.filter(fn).length; }
  $('#stats').innerHTML =
    '<span class="stat"><b>' + n(function (p) { return p.k === 'p'; }) + '</b>projects</span>' +
    '<span class="stat"><b>' + n(function (p) { return p.k === 'r'; }) + '</b>paper replications</span>' +
    '<span class="stat"><b>' + n(function (p) { return p.app; }) + '</b>live apps</span>';

  /* ---------- filters ---------- */
  var state = { q: '', tag: 'all' }, mode = 'orig', wantRecent = false, listView = false;
  var fwrap = $('#filters'), q = $('#q'), sb = $('#sort'), rb = $('#recent'), vb = $('#view'), skin = $('.c-sky');
  function cnt(k) { return n(function (p) { return k === 'all' || p.t.indexOf(k) > -1 || (k === 'live' && !!p.app); }); }
  TAGS.forEach(function (t) {
    var f = document.createElement('button');
    f.type = 'button'; f.className = 'f'; f.textContent = t[1] + ' ' + cnt(t[0]); f.dataset.tag = t[0];
    f.setAttribute('aria-pressed', 'false');
    f.onclick = function () { setTag(t[0]); apply(); };
    fwrap.appendChild(f);
  });
  function setTag(t) {
    state.tag = LBL[t] ? t : 'all';
    [].forEach.call(fwrap.children, function (c) { c.setAttribute('aria-pressed', c.dataset.tag === state.tag ? 'true' : 'false'); });
  }
  function vis(list) {
    var c = 0;
    [].forEach.call(list.children, function (el) {
      var ok = (state.tag === 'all' || el.dataset.t.split(' ').indexOf(state.tag) > -1) && (!state.q || el.dataset.s.indexOf(state.q) > -1);
      el.hidden = !ok; if (ok) c++;
    });
    return c;
  }
  function sync() {
    try {
      var u = new URLSearchParams();
      if (state.tag !== 'all') u.set('tag', state.tag);
      if (state.q) u.set('q', state.q);
      if (mode !== 'orig') u.set('sort', mode);
      if (listView) u.set('view', 'list');
      var s = u.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
    } catch (e) {}
  }
  function apply() {
    var a = vis(pinned), b = vis(projects), c = vis(papers);
    $('#pwrap').hidden = !a;
    $('#hp').hidden = projects.hidden = !b;
    $('#hr').hidden = papers.hidden = !c;
    $('#none').hidden = (a + b + c) > 0;
    $('#count').textContent = (a + b + c) + ' of ' + P.length + ' shown';
    sync();
  }
  q.addEventListener('input', function () { state.q = q.value.trim().toLowerCase(); apply(); });

  /* ---------- sort & view ---------- */
  function setMode(m) {
    mode = m;
    sb.setAttribute('aria-pressed', m === 'az'); sb.textContent = m === 'az' ? 'sorted A–Z' : 'sort A–Z';
    rb.setAttribute('aria-pressed', m === 'recent'); rb.textContent = m === 'recent' ? 'sorted by recent' : 'recently updated';
    [pinned, projects, papers].forEach(function (l) {
      var a = [].slice.call(l.children);
      a.sort(function (x, y) {
        if (m === 'az') return x.dataset.n.localeCompare(y.dataset.n);
        if (m === 'recent') return (+y.dataset.u || 0) - (+x.dataset.u || 0) || x.dataset.i - y.dataset.i;
        return x.dataset.i - y.dataset.i;
      });
      a.forEach(function (e) { l.appendChild(e); });
    });
  }
  function setView(on) {
    listView = on; skin.classList.toggle('lv', on); vb.setAttribute('aria-pressed', on); vb.textContent = on ? 'grid view' : 'list view';
  }
  sb.onclick = function () { setMode(mode === 'az' ? 'orig' : 'az'); sync(); };
  rb.onclick = function () { setMode(mode === 'recent' ? 'orig' : 'recent'); sync(); };
  vb.onclick = function () { setView(!listView); sync(); };

  /* ---------- load state from the URL (?tag=bio&q=mmp&sort=az&view=list) ---------- */
  try {
    var up = new URLSearchParams(location.search);
    if (up.get('tag')) setTag(up.get('tag')); else setTag('all');
    if (up.get('q')) { state.q = up.get('q').toLowerCase(); q.value = up.get('q'); }
    var sm = up.get('sort'); if (sm === 'az') setMode('az'); else if (sm === 'recent') wantRecent = true;
    if (up.get('view') === 'list') setView(true);
  } catch (e) { setTag('all'); }
  apply();

  /* ---------- live "updated X ago" from GitHub (one API call, cached for an hour) ---------- */
  function ago(iso) {
    var d = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
    if (d < 1) return 'today';
    if (d < 30) return d + 'd ago';
    if (d < 365) return Math.floor(d / 30) + 'mo ago';
    return Math.floor(d / 365) + 'y ago';
  }
  function useMeta(map) {
    var got = 0;
    [].forEach.call(document.querySelectorAll('.proj'), function (el) {
      var m = map[P[el.dataset.i].gh.toLowerCase()];
      if (!m || !m.p) return;
      got++; el.dataset.u = new Date(m.p).getTime();
      el.querySelector('.tgs').textContent += ' · updated ' + ago(m.p);
    });
    if (got) { rb.hidden = false; if (wantRecent) { setMode('recent'); sync(); } }
  }
  (function loadMeta() {
    var KEY = 'repoMeta', cached = null;
    try { cached = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    if (cached && cached.d && Date.now() - cached.t < 36e5) { useMeta(cached.d); return; }
    if (!window.fetch) return;
    fetch('https://api.github.com/users/Harshini-Suresha/repos?per_page=100&sort=pushed')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (list) {
        var d = {};
        list.forEach(function (r) { d[r.name.toLowerCase()] = { p: r.pushed_at }; });
        try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
        useMeta(d);
      }).catch(function () {});
  })();

  /* ---------- surprise me ---------- */
  $('#surprise').onclick = function () {
    state.q = ''; q.value = ''; setTag('all'); apply();
    var all = document.querySelectorAll('.proj'), el = all[Math.floor(Math.random() * all.length)];
    if (el.scrollIntoView) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    setTimeout(function () { el.classList.remove('flash'); }, 1900);
  };

  /* ---------- keyboard: / search, Esc clear ---------- */
  document.addEventListener('keydown', function (e) {
    var t = e.target && e.target.tagName;
    if (e.key === '/' && t !== 'INPUT' && t !== 'TEXTAREA') { e.preventDefault(); q.focus(); q.select(); }
    else if (e.key === 'Escape' && (q.value || state.q)) { q.value = ''; state.q = ''; apply(); q.blur(); }
  });

  /* ---------- back to top ---------- */
  var tb = $('#top');
  window.addEventListener('scroll', function () { tb.hidden = window.scrollY < 600; }, { passive: true });
  tb.onclick = function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); };

  /* ---------- copy email ---------- */
  var cb = $('#copy'), E = 'harshinisuresha7@gmail.com';
  cb.onclick = function () {
    function done() { cb.textContent = 'copied ✓'; setTimeout(function () { cb.textContent = 'copy email'; }, 1800); }
    function fallback() {
      try {
        var t = document.createElement('textarea'); t.value = E; t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); done();
      } catch (e) { cb.textContent = E; }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(E).then(done, fallback); else fallback();
    } catch (e) { fallback(); }
  };

  /* ---------- theme (day / night melon) ---------- */
  var root = document.documentElement, th = $('#theme'), meta = $('meta[name="theme-color"]');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    th.textContent = t === 'dark' ? 'day mode' : 'night mode';
    th.setAttribute('aria-pressed', t === 'dark');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#2a1118' : '#f4525f');
    if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);
  th.onclick = function () { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true); };

  /* ---------- seed pop ---------- */
  if (!reduce) {
    document.addEventListener('pointerdown', function (e) {
      for (var i = 0; i < 7; i++) {
        var s = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 28 + Math.random() * 34;
        s.className = 'seed';
        s.style.setProperty('--x', e.clientX + 'px'); s.style.setProperty('--y', e.clientY + 'px');
        s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px');
        s.style.setProperty('--r', (Math.random() * 360) + 'deg');
        document.body.appendChild(s);
        setTimeout(function (el) { el.remove(); }, 800, s);
      }
    });
  }
})();
