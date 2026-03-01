(function () {
  'use strict';

  var slides = document.querySelectorAll('.slide');
  var total = slides.length;
  var current = 0;
  var bar = document.getElementById('progressBar');
  var counter = document.getElementById('slideCounter');
  var hint = document.getElementById('navHint');

  function updateCounter() {
    counter.textContent = (current + 1) + ' / ' + total;
    var s = slides[current];
    var isLight = s.classList.contains('bg-white') || s.classList.contains('bg-light');
    counter.classList.toggle('dark', isLight);
  }

  function goTo(n) {
    if (n < 0 || n >= total) return;
    slides[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    bar.style.width = ((current + 1) / total * 100) + '%';
    updateCounter();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); goTo(0); break;
      case 'End': e.preventDefault(); goTo(total - 1); break;
      case 'f': case 'F':
        e.preventDefault();
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
        break;
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    if (e.clientX > window.innerWidth / 2) next(); else prev();
  });

  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  var touchStartX = 0;
  document.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', function (e) {
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) { if (delta < 0) next(); else prev(); }
  });

  updateCounter();

  if (hint) {
    setTimeout(function () { hint.classList.add('show'); }, 1000);
    setTimeout(function () { hint.classList.remove('show'); }, 5000);
  }
})();
