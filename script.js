// =============================
// NAVBAR — OMBRE AU SCROLL
// =============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// =============================
// MENU MOBILE
// =============================
const burger    = document.getElementById('navBurger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// =============================
// SCROLL REVEAL
// =============================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// =============================
// SECTIONS — ANIMATION ENTRÉE
// =============================
const sectionsAnim   = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('section-visible');
  });
}, { threshold: 0.12 });
sectionsAnim.forEach(section => sectionObserver.observe(section));

// =============================
// SCROLL FLUIDE (ancres)
// =============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =============================
// FEEDBACK FORMULAIRES
// =============================
document.querySelectorAll('.form-submit, .footer-newsletter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const original         = this.textContent;
    this.textContent       = '✓ Envoyé avec succès';
    this.style.background  = '#16a34a';
    this.style.color       = 'white';
    setTimeout(() => {
      this.textContent      = original;
      this.style.background = '';
      this.style.color      = '';
    }, 3000);
  });
});

// =============================
// NAV ACTIVE AU SCROLL
// =============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });