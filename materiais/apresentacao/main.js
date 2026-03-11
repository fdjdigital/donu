(function () {
    var slides = document.querySelectorAll('.slide');
    var total = slides.length;
    var current = 0;
    var isDesktop = false;

    var bar = document.querySelector('.progress-fill');
    var counter = document.querySelector('.counter');
    var hint = document.querySelector('.nav-hint');
    var fsBtn = document.querySelector('.fullscreen-btn');
    var scrollIndicator = document.querySelector('.scroll-indicator');

    function checkMode() {
        isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
            go(current);
        }
    }

    function go(n) {
        if (n < 0 || n >= total) return;
        slides[current].classList.remove('active');
        current = n;
        slides[current].classList.add('active');
        if (bar) bar.style.width = ((current + 1) / total * 100) + '%';
        if (counter) counter.textContent = (current + 1) + ' / ' + total;
    }

    function next() { if (isDesktop) go(current + 1); }
    function prev() { if (isDesktop) go(current - 1); }

    // Keyboard
    document.addEventListener('keydown', function (e) {
        if (!isDesktop) return;
        switch (e.key) {
            case 'ArrowRight': case 'ArrowDown': case ' ':
                e.preventDefault(); next(); break;
            case 'ArrowLeft': case 'ArrowUp':
                e.preventDefault(); prev(); break;
            case 'Home': e.preventDefault(); go(0); break;
            case 'End': e.preventDefault(); go(total - 1); break;
            case 'f': case 'F': toggleFullscreen(); break;
        }
    });

    // Click zones
    document.addEventListener('click', function (e) {
        if (!isDesktop) return;
        if (e.target.closest('a, button, .fullscreen-btn')) return;
        var x = e.clientX / window.innerWidth;
        if (x > 0.4) next(); else prev();
    });

    // Touch swipe
    var touchStartX = 0;
    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        if (!isDesktop) return;
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next(); else prev();
        }
    }, { passive: true });

    // Fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(function () {});
        } else {
            document.exitFullscreen();
        }
    }

    if (fsBtn) {
        fsBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleFullscreen();
        });
    }

    // Scroll indicator hide on mobile
    if (scrollIndicator) {
        var scrollHidden = false;
        window.addEventListener('scroll', function () {
            if (!scrollHidden && window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s';
                scrollHidden = true;
            }
        }, { passive: true });
    }

    // Nav hint fade
    if (hint) {
        setTimeout(function () { hint.style.opacity = '1'; }, 1500);
        setTimeout(function () { hint.style.opacity = '0'; }, 6000);
    }

    // Init
    checkMode();
    window.addEventListener('resize', checkMode);
})();
