/* ========================================
   MOOHWAJAM - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initHeader();
  initHamburger();
  initScrollAnimations();
  initSmoothScroll();
  initLanguageToggle();
});

/* ========================================
   LENIS SMOOTH SCROLL
   ======================================== */
let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Connect GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

/* ========================================
   HEADER - Blur on Scroll
   ======================================== */
function initHeader() {
  const header = document.getElementById('header');

  if (!header) return;

  // Add scrolled class when scrolling past threshold
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check
  handleScroll();
}

/* ========================================
   HAMBURGER MENU
   ======================================== */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ========================================
   GSAP SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero title animation on load
  const heroTimeline = gsap.timeline({ delay: 0.3 });

  heroTimeline
    .from('.hero-title .title-line', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .from('.hero-sides', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-bottom', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3');

  // Spirit section
  gsap.from('.spirit-title span', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.spirit',
      start: 'top 70%'
    }
  });

  gsap.from('.spirit-desc, .spirit .btn-dark', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.spirit',
      start: 'top 60%'
    }
  });

  gsap.from('.spirit-image img', {
    scale: 1.2,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.spirit-image',
      start: 'top 80%'
    }
  });

  // Menu section
  gsap.from('.menu-title', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.menu-section',
      start: 'top 70%'
    }
  });

  gsap.from('.menu-item', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.menu-list',
      start: 'top 80%'
    }
  });

  // Catering section
  gsap.from('.catering-title', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.catering',
      start: 'top 70%'
    }
  });

  gsap.from('.catering-img', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.catering-images',
      start: 'top 80%'
    }
  });

  // Drinks section
  gsap.from('.drinks-title span', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.drinks',
      start: 'top 70%'
    }
  });

  gsap.from('.drink-item', {
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.drinks-list',
      start: 'top 80%'
    }
  });

  // Gift card section
  gsap.from('.giftcard-title', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.giftcard',
      start: 'top 70%'
    }
  });

  gsap.from('.card', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.giftcard-content',
      start: 'top 80%'
    }
  });

  // Heritage section - parallax
  gsap.to('.heritage-bg img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.heritage',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.from('.heritage-title span', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.heritage',
      start: 'top 60%'
    }
  });

  // Testimonials section
  gsap.from('.testimonials-title span', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonials',
      start: 'top 70%'
    }
  });

  // Footer logo
  gsap.from('.footer-logo-text', {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer-logo',
      start: 'top 90%'
    }
  });
}

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.2
      });
    });
  });
}

/* ========================================
   UTILITIES
   ======================================== */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/* ========================================
   WINDOW RESIZE HANDLER
   ======================================== */
window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
}, 250));

/* ========================================
   LANGUAGE TOGGLE
   ======================================== */
let currentLang = 'ko';

function initLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  const langKo = langToggle.querySelector('.lang-ko');
  const langEn = langToggle.querySelector('.lang-en');

  langToggle.addEventListener('click', () => {
    // Toggle language
    currentLang = currentLang === 'ko' ? 'en' : 'ko';

    // Update toggle button UI
    if (currentLang === 'ko') {
      langKo.classList.add('active');
      langEn.classList.remove('active');
      langToggle.classList.remove('en-active');
      document.body.classList.add('lang-ko');
      document.body.classList.remove('lang-en');
    } else {
      langKo.classList.remove('active');
      langEn.classList.add('active');
      langToggle.classList.add('en-active');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ko');
    }

    // Update hero section text
    updateHeroText();
  });

  // Set initial language class
  document.body.classList.add('lang-ko');
}

function updateHeroText() {
  // Get all elements with data-ko and data-en attributes
  const elements = document.querySelectorAll('[data-ko][data-en]');

  elements.forEach(el => {
    const text = currentLang === 'ko' ? el.dataset.ko : el.dataset.en;
    // For links/buttons, update text content; for others, use innerHTML
    if (el.tagName === 'A' || el.tagName === 'BUTTON') {
      el.textContent = text;
    } else {
      el.innerHTML = text;
    }
  });
}

/* ========================================
   CONSOLE GREETING
   ======================================== */
console.log(
  '%c무화잠 MOOHWAJAM',
  'font-size: 24px; font-weight: bold; color: #c9a227;'
);
console.log(
  '%c기억에 남는 맛의 여정',
  'font-size: 14px; color: #666;'
);
