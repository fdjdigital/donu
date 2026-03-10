/**
 * Apresentação Folder Institucional Donu
 * Navegação: keyboard, click, touch swipe
 * Desktop (>= 1024px): slide mode
 * Mobile (< 1024px): scroll mode (CSS handles it)
 */

(function () {
  var slides = document.querySelectorAll('.slide');
  var total = slides.length;
  var current = 0;
  var bar = document.querySelector('.progress-bar');
  var counter = document.querySelector('.slide-counter');
  var hint = document.querySelector('.nav-hint');
  var scrollInd = document.querySelector('.scroll-indicator');
  var isDesktop = false;

  function checkMode() {
    isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      go(current);
    }
  }

  function go(n) {
    if (!isDesktop) return;
    if (n < 0 || n >= total) return;
    slides[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    if (bar) bar.style.width = ((current + 1) / total * 100) + '%';
    if (counter) counter.textContent = (current + 1) + ' / ' + total;

    // Hide hint after first navigation
    if (current > 0 && hint) hint.classList.remove('visible');
  }

  // Initial state
  checkMode();
  window.addEventListener('resize', checkMode);

  // Show first slide on desktop
  if (isDesktop && slides.length) {
    slides[0].classList.add('active');
    if (bar) bar.style.width = (1 / total * 100) + '%';
    if (counter) counter.textContent = '1 / ' + total;
  }

  // Show hint briefly
  if (hint) {
    setTimeout(function () { hint.classList.add('visible'); }, 1500);
    setTimeout(function () { hint.classList.remove('visible'); }, 5000);
  }

  // Hide scroll indicator after first scroll
  if (scrollInd) {
    var scrolled = false;
    window.addEventListener('scroll', function () {
      if (!scrolled && window.scrollY > 100) {
        scrolled = true;
        scrollInd.classList.add('hidden');
      }
    });
  }

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!isDesktop) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ':
        e.preventDefault(); go(current + 1); break;
      case 'ArrowLeft': case 'ArrowUp':
        e.preventDefault(); go(current - 1); break;
      case 'Home':
        e.preventDefault(); go(0); break;
      case 'End':
        e.preventDefault(); go(total - 1); break;
      case 'f': case 'F':
        e.preventDefault(); toggleFullscreen(); break;
    }
  });

  // Click zones (desktop)
  document.addEventListener('click', function (e) {
    if (!isDesktop) return;
    if (e.target.closest('a, button, .btn-fullscreen')) return;
    var x = e.clientX / window.innerWidth;
    if (x > 0.5) go(current + 1);
    else go(current - 1);
  });

  // Touch swipe
  var touchX = 0;
  document.addEventListener('touchstart', function (e) {
    touchX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (!isDesktop) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) go(current + 1);
      else go(current - 1);
    }
  }, { passive: true });

  // Fullscreen
  var btnFs = document.querySelector('.btn-fullscreen');
  if (btnFs) btnFs.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleFullscreen();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {});
    } else {
      document.exitFullscreen();
    }
  }
})();
