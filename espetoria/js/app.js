document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== LIGHTBOX ========== */
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || triggers.length === 0) return;

  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');
  let current = 0;

  const items = triggers.map(el => ({
    src: el.dataset.src || el.querySelector('img')?.src,
    caption: el.dataset.caption || el.querySelector('img')?.alt || ''
  }));

  function open(index) {
    current = index;
    const item = items[current];
    imgEl.src = item.src;
    imgEl.alt = item.caption;
    captionEl.textContent = item.caption;
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightbox.hidden = true;
      imgEl.src = '';
    }, 300);
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    open(current);
  }

  function next() {
    current = (current + 1) % items.length;
    open(current);
  }

  triggers.forEach((el, i) => {
    el.addEventListener('click', () => open(i));
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  btnClose?.addEventListener('click', close);
  btnPrev?.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  btnNext?.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
});
