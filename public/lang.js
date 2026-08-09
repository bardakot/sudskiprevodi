(function () {
  // ---- Language toggle ----
  // MK is the default everywhere. Which other languages a page offers is
  // read off the page itself: every [data-set-lang] button declares one.
  // The English pages offer EN; the Turkish page also offers TR, the
  // Serbian page also offers SR. A stored preference that a page does not
  // offer is left in storage untouched and simply not applied there.
  function pageLangs() {
    var langs = { mk: true };
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var l = btn.getAttribute('data-set-lang');
      if (l) langs[l] = true;
    });
    return langs;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }

  function setLang(lang) {
    if (!pageLangs()[lang]) lang = 'mk';
    applyLang(lang);
    try { localStorage.setItem('spm-lang', lang); } catch (e) {}
  }

  // Apply any stored preference (also handled inline in <head> to avoid flicker).
  try {
    var stored = localStorage.getItem('spm-lang');
    if (stored && stored !== 'mk' && pageLangs()[stored]) applyLang(stored);
  } catch (e) {}

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-set-lang]');
    if (!btn) return;
    setLang(btn.getAttribute('data-set-lang'));
  });

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });
})();
