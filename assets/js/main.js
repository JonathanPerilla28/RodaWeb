/* =============================================
   RODA — Láminas y Aglomerados
   main.js
   ============================================= */

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---- Mobile menu toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__menu a');

  function setActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---- Back to top button ---- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Intersection Observer — fade-in animations ---- */
  const fadeEls = document.querySelectorAll(
    '.producto-card, .servicio-item, .porque__item, .nosotros__grid, .galeria__item, .contacto__info-item'
  );
  fadeEls.forEach(function (el, i) {
    el.classList.add('fade-in');
    if (i % 5 === 1) el.classList.add('fade-in-delay-1');
    if (i % 5 === 2) el.classList.add('fade-in-delay-2');
    if (i % 5 === 3) el.classList.add('fade-in-delay-3');
    if (i % 5 === 4) el.classList.add('fade-in-delay-4');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(function (el) { observer.observe(el); });

  /* ---- Contact form → WhatsApp redirect ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      const nombre   = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const email    = document.getElementById('email').value.trim();
      const mensaje  = document.getElementById('mensaje').value.trim();

      let text = `Hola RODA, mi nombre es *${nombre}*.\n`;
      text += `📞 Teléfono: ${telefono}\n`;
      if (email) text += `📧 Email: ${email}\n`;
      text += `\n💬 ${mensaje}`;

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/573117994476?text=${encoded}`, '_blank', 'noopener');
    });
  }

  function validateForm() {
    let valid = true;

    const nombre   = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const email    = document.getElementById('email');
    const mensaje  = document.getElementById('mensaje');

    clearErrors();

    if (!nombre.value.trim()) {
      showError('nombreError', 'Por favor ingresa tu nombre.');
      nombre.classList.add('error');
      valid = false;
    }

    if (!telefono.value.trim()) {
      showError('telefonoError', 'Por favor ingresa tu teléfono.');
      telefono.classList.add('error');
      valid = false;
    } else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(telefono.value.trim())) {
      showError('telefonoError', 'Ingresa un número de teléfono válido.');
      telefono.classList.add('error');
      valid = false;
    }

    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError('emailError', 'Ingresa un correo electrónico válido.');
      email.classList.add('error');
      valid = false;
    }

    if (!mensaje.value.trim()) {
      showError('mensajeError', 'Por favor escribe tu mensaje.');
      mensaje.classList.add('error');
      valid = false;
    }

    return valid;
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function clearErrors() {
    ['nombreError', 'telefonoError', 'emailError', 'mensajeError'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    ['nombre', 'telefono', 'email', 'mensaje'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('error');
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
