// Menu toggle mobile
const toggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav-menu');

toggle?.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Scroll effect para navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
