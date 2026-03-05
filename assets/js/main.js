// ===== GSAP SCROLL ANIMATIONS =====
function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        initRevealFallback();
        return;
    }

    document.body.classList.remove('no-gsap');
    gsap.registerPlugin(ScrollTrigger);

    // Kill previous ScrollTriggers to avoid duplication
    ScrollTrigger.getAll().forEach(t => t.kill());

    // --- HERO ENTRANCE ---
    const heroTitle = document.querySelector('.hero h1, .about-hero h1');
    const heroSub = document.querySelector('.hero .hero-subtitle, .about-hero p');
    const heroCTAs = document.querySelectorAll('.hero .hero-badge, .hero .hero-cta a');
    const heroMockup = document.querySelector('.hero-mockup');

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroTitle) {
        heroTl.fromTo(heroTitle,
            { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
            { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2 }
        );
    }
    if (heroSub) {
        heroTl.fromTo(heroSub,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 }, '-=0.6'
        );
    }
    if (heroCTAs.length) {
        heroTl.fromTo(heroCTAs,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 }, '-=0.4'
        );
    }
    if (heroMockup) {
        heroTl.fromTo(heroMockup,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.8'
        );
    }

    // --- REVEAL: fade up ---
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            }
        );
    });

    // --- REVEAL LEFT ---
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -80 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    });

    // --- REVEAL RIGHT ---
    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: 80 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    });

    // --- REVEAL SCALE ---
    gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    });

    // --- PAIN CARDS ---
    const painCards = document.querySelectorAll('.pain-card');
    if (painCards.length) {
        gsap.fromTo(painCards,
            { opacity: 0, y: 60, rotateX: 10 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: painCards[0], start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- STEPS ---
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length) {
        gsap.fromTo(stepCards,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: 'power2.out',
              scrollTrigger: { trigger: stepCards[0], start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- FEATURE CARDS ---
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length) {
        gsap.fromTo(featureCards,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: featureCards[0], start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- COMPARISON TABLE ---
    const compTable = document.querySelector('.comparison-table');
    if (compTable) {
        gsap.fromTo(compTable,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: compTable, start: 'top 80%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- JULIUS SECTION ---
    const juliusImg = document.querySelector('.julius-image-wrapper');
    const juliusContent = document.querySelector('.julius-content');
    if (juliusImg && juliusContent) {
        const juliusTl = gsap.timeline({
            scrollTrigger: { trigger: juliusImg, start: 'top 80%', toggleActions: 'play none none none' }
        });
        juliusTl.fromTo(juliusImg,
            { opacity: 0, x: -100, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
        juliusTl.fromTo(juliusContent.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.7'
        );
    }

    // --- PRICING CARDS ---
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (pricingCards.length) {
        gsap.fromTo(pricingCards,
            { opacity: 0, y: 80, rotateX: 8 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
              scrollTrigger: { trigger: pricingCards[0], start: 'top 80%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- TESTIMONIALS ---
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length) {
        gsap.fromTo(testimonials,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
              scrollTrigger: { trigger: testimonials[0], start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        gsap.fromTo(faqItems,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
              scrollTrigger: { trigger: faqItems[0], start: 'top 85%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- CTA FINAL ---
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        gsap.fromTo(ctaSection.querySelectorAll('h2, p, .cta-buttons a'),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
              scrollTrigger: { trigger: ctaSection, start: 'top 80%', toggleActions: 'play none none none' }
            }
        );
    }

    // --- FEATURE DETAIL ROWS (Funcionalidades page) ---
    gsap.utils.toArray('.feature-detail-row').forEach(row => {
        const img = row.querySelector('.feature-detail-image');
        const content = row.querySelector('.feature-detail-content');
        const isReverse = row.classList.contains('reverse');

        const rowTl = gsap.timeline({
            scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none none' }
        });

        if (img) {
            rowTl.fromTo(img,
                { opacity: 0, x: isReverse ? 80 : -80, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
            );
        }
        if (content) {
            rowTl.fromTo(content,
                { opacity: 0, x: isReverse ? -40 : 40 },
                { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6'
            );
        }
    });

    // --- PARALLAX ---
    gsap.utils.toArray('.section, .section-full').forEach(section => {
        const bg = section.querySelector('.dot-pattern');
        if (bg) {
            gsap.to(bg, {
                y: 80,
                ease: 'none',
                scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
        }
    });

    // --- FOOTER ---
    const footer = document.querySelector('.site-footer');
    if (footer) {
        gsap.fromTo(footer.querySelectorAll('.footer-brand, .footer-col'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none none' }
            }
        );
    }

    ScrollTrigger.refresh();
}

// Fallback if GSAP doesn't load
function initRevealFallback() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => { if (!el.classList.contains('visible')) observer.observe(el); });
}

// ===== FAQ ACCORDION =====
function toggleFaq(el) {
    const item = el.parentElement;
    const wasOpen = item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseFloat(entry.target.dataset.count);
                const prefix = entry.target.dataset.prefix || '';
                const suffix = entry.target.dataset.suffix || '';
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;
                    entry.target.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ===== HEADER SCROLL BEHAVIOR =====
function initHeaderScroll() {
    const header = document.getElementById('home-header');
    const logo = document.getElementById('home-logo');
    if (!header || !logo) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.classList.remove('dark-mode');
            header.style.background = 'rgba(255,255,255,0.92)';
            logo.src = '/images/logos/logo-colorida.png';
            header.querySelectorAll('.nav-menu a:not(.btn)').forEach(a => {
                a.style.color = '';
            });
        } else {
            header.classList.remove('scrolled');
            header.classList.add('dark-mode');
            header.style.background = '';
            logo.src = '/images/logos/logo-branca.png';
        }
    });
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        p.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(p);
    }
}

// ===== SPOTLIGHT EFFECT ON HERO =====
function initSpotlight() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
        position: absolute;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        transition: transform 0.3s ease-out;
        transform: translate(-50%, -50%);
    `;
    hero.appendChild(spotlight);

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.left = x + 'px';
        spotlight.style.top = y + 'px';
    });
}

// ===== JULIUS MOUSE TRACKING =====
function initJuliusMouseTrack() {
    const trackElements = document.querySelectorAll('.julius-track-eyes');
    if (!trackElements.length) return;

    document.addEventListener('mousemove', (e) => {
        trackElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / window.innerWidth;
            const deltaY = (e.clientY - centerY) / window.innerHeight;
            const moveX = deltaX * 6;
            const moveY = deltaY * 4;
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }, { passive: true });
}

// ===== PAGE LOADER =====
function hideLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
    }
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        btn.classList.toggle('visible', scrollPercent > 0.15);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== COOKIE BANNER =====
function initCookieBanner() {
    if (localStorage.getItem('donu_cookies_accepted')) return;
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    setTimeout(() => banner.classList.add('visible'), 2000);
}
function acceptCookies() {
    localStorage.setItem('donu_cookies_accepted', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) { banner.classList.remove('visible'); banner.classList.add('hidden'); }
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburgers = document.querySelectorAll('.hamburger');
    if (!menu) return;
    menu.classList.toggle('open');
    hamburgers.forEach(h => h.classList.toggle('active'));
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}
function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburgers = document.querySelectorAll('.hamburger');
    if (menu) menu.classList.remove('open');
    hamburgers.forEach(h => h.classList.remove('active'));
    document.body.style.overflow = '';
}

// ===== LANDING PAGE FORMS (WhatsApp) =====
function submitFormParceiros(e) {
    e.preventDefault();
    var f = e.target;
    var msg = encodeURIComponent(
        'Olá! Vim da página de parceiros e quero agendar uma visita.\n\n' +
        'Nome: ' + f.nome.value + '\n' +
        'Cargo: ' + f.cargo.value + '\n' +
        'Associação: ' + f.associacao.value + '\n' +
        'Telefone: ' + f.telefone.value + '\n' +
        'E-mail: ' + f.email.value
    );
    window.open('https://wa.me/5531999767916?text=' + msg, '_blank');
}

function submitForm(e) {
    e.preventDefault();
    var f = e.target;
    var horario = f.horario.options[f.horario.selectedIndex].text;
    var msg = encodeURIComponent(
        'Olá! Vim da página de empresas e quero agendar uma apresentação do Donu.\n\n' +
        'Nome: ' + f.nome.value + '\n' +
        'Empresa: ' + f.empresa.value + '\n' +
        'Telefone: ' + f.telefone.value + '\n' +
        'Melhor horário: ' + horario
    );
    window.open('https://wa.me/5531999767916?text=' + msg, '_blank');
}

function handleContactForm(e) {
    e.preventDefault();
    var f = e.target;
    var assunto = f.assunto.options[f.assunto.selectedIndex].text;
    var msg = encodeURIComponent(
        'Olá! Vim da página de contato do Donu.\n\n' +
        'Nome: ' + f.nome.value + '\n' +
        (f.empresa.value ? 'Empresa: ' + f.empresa.value + '\n' : '') +
        (f.telefone.value ? 'Telefone: ' + f.telefone.value + '\n' : '') +
        'Assunto: ' + assunto + '\n' +
        (f.mensagem.value ? 'Mensagem: ' + f.mensagem.value : '')
    );
    window.open('https://wa.me/5531999767916?text=' + msg, '_blank');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initGSAP();
    animateCounters();
    initHeaderScroll();
    createParticles();
    initSpotlight();
    initJuliusMouseTrack();
    initBackToTop();
    initCookieBanner();
});

window.addEventListener('load', () => {
    hideLoader();
});
