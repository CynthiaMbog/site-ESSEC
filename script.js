// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// === MOBILE MENU ===
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
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
    const spans = burger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// === COUNTER ANIMATION ===
function animateCounter(el, target, suffix = '') {
  const isYear = target > 1000 && !target.toString().includes('+');
  let current = isYear ? target - 50 : 0;
  const increment = isYear ? 1 : Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = isYear ? current : (current > 1000 ? current.toLocaleString() + '+' : current + suffix);
  }, isYear ? 30 : 50);
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === FORM SUBMIT FEEDBACK ===
document.querySelectorAll('.form-submit, .footer-newsletter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const original = this.textContent;
    this.textContent = '✓ Envoyé avec succès';
    this.style.background = '#16a34a';
    this.style.color = 'white';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
      this.style.color = '';
    }, 3000);
  });
});

// === ACTIVE NAV ON SCROLL ===
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
