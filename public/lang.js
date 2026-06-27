(function () {
  // ---- Language toggle (MK default, EN optional) ----
  function setLang(lang) {
    if (lang !== 'en') lang = 'mk';
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    try { localStorage.setItem('spm-lang', lang); } catch (e) {}
  }

  // Apply any stored preference (also handled inline in <head> to avoid flicker).
  try {
    var stored = localStorage.getItem('spm-lang');
    if (stored === 'en') setLang('en');
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
