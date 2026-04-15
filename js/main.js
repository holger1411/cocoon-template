/* ===== Core Template — main.js ===== */
/* Handles: mobile navigation, scroll animations, carousel keyboard nav, hero ring glow */

(function () {
  'use strict';

  // Mark JS as available (enables animation hiding via CSS)
  document.documentElement.classList.add('js');

  // ===== Hero Ring Overlap Glow =====

  (function () {
    var glow = document.getElementById('overlap-glow');
    if (!glow) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Ring 1: cx=110, r=95, clockwise 20s
    // Ring 2: cx=260, r=95, counter-clockwise 28s
    var speed1 = 2 * Math.PI / 20;
    var speed2 = -2 * Math.PI / 28;
    var overlapCenter = 185;
    var range = 30;

    function tick(ts) {
      var t = ts / 1000;
      var knob1x = 110 + 95 * Math.sin(speed1 * t);
      var knob2x = 260 + 95 * Math.sin(speed2 * t);

      var s1 = Math.max(0, 1 - Math.abs(knob1x - overlapCenter) / range);
      var s2 = Math.max(0, 1 - Math.abs(knob2x - overlapCenter) / range);

      // Brightest when both knobs overlap, subtle when just one
      var brightness = s1 * s2;
      glow.setAttribute('opacity', brightness * 0.12);

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  })();

  // ===== Gradient Scroll Animation =====
  // Expands containers from 6xl (1152px) to 100vw as they scroll toward viewport top

  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var containers = [
      document.getElementById('hero-gradient-wrap'),
      document.getElementById('faq-gradient-wrap'),
      document.getElementById('pricing-gradient-wrap')
    ].filter(Boolean);

    if (!containers.length) return;

    var targetMaxWidth = 1152; // 6xl

    function update() {
      var scrollY = window.scrollY || window.pageYOffset;
      var vw = window.innerWidth;

      containers.forEach(function (wrap) {
        var box = wrap.querySelector('div');
        // Distance from page top to element top
        var elTop = wrap.offsetTop;
        // Start animation when element enters viewport from below
        var startScroll = Math.max(0, elTop - window.innerHeight);
        // End animation when element top reaches viewport top
        var endScroll = elTop;
        var range = endScroll - startScroll;

        if (range <= 0) return;

        var progress = Math.min(1, Math.max(0, (scrollY - startScroll) / range));

        // Interpolate max-width: targetMaxWidth → 100vw
        var currentWidth = targetMaxWidth + (vw - targetMaxWidth) * progress;
        wrap.style.maxWidth = currentWidth + 'px';

        // Interpolate border-radius: 16px → 0
        var radius = (1 - progress) * 16;
        box.style.borderRadius = radius + 'px';
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  // ===== Background Image Fade on Scroll =====

  (function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var boxes = document.querySelectorAll('[data-fade-bg]');
    if (!boxes.length) return;

    function update() {
      var vh = window.innerHeight;

      boxes.forEach(function (box) {
        var rect = box.getBoundingClientRect();
        var bg = box.querySelector('[style*="opacity"]');
        if (!bg) return;

        // Progress: 0 when top of box enters viewport bottom, 1 when bottom of box reaches viewport bottom
        var start = rect.top;
        var end = rect.bottom;
        var progress = Math.min(1, Math.max(0, (vh - start) / (end - start)));

        // Opacity: 0.05 → 1
        bg.style.opacity = 0.05 + progress * 0.95;
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  })();

  // ===== Navbar Shrink on Scroll =====

  (function () {
    var nav = document.getElementById('main-nav');
    var header = document.getElementById('main-header');
    if (!nav || !header) return;

    var scrolled = false;

    function check() {
      var isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        if (scrolled) {
          nav.classList.remove('pt-12', 'pb-0');
          nav.classList.add('py-4');
          header.style.borderBottomColor = 'var(--color-border)';
        } else {
          nav.classList.remove('py-4');
          nav.classList.add('pt-12', 'pb-0');
          header.style.borderBottomColor = 'transparent';
        }
      }
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
  })();

  // ===== Mobile Navigation =====

  document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('hidden', isOpen);
      mobileMenu.setAttribute('aria-hidden', String(isOpen));

      // Focus trap: when opening, focus first link
      if (!isOpen) {
        var firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close menu when clicking an anchor link
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close menu on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuButton.focus();
      }
    });
  });

  // ===== Scroll Animations =====

  document.addEventListener('DOMContentLoaded', function () {
    var animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length || !('IntersectionObserver' in window)) {
      // No animation support or no elements: make everything visible
      animatedElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    try {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } catch (e) {
      // Fallback: show everything immediately
      animatedElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  });

  // ===== Carousel Keyboard Navigation =====

  document.addEventListener('DOMContentLoaded', function () {
    var carousels = document.querySelectorAll('.carousel');

    carousels.forEach(function (carousel) {
      carousel.addEventListener('keydown', function (e) {
        var scrollAmount = 320; // roughly one card width
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      });
    });
  });

  // Contact Card — static shadow only (set in HTML inline style)

  // ===== Dialog Open / Close / Scroll Lock =====
  document.querySelectorAll('[data-open-dialog]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-open-dialog');
      var dialog = document.getElementById(id);
      if (dialog) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-close-dialog]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  document.querySelectorAll('dialog').forEach(function (dialog) {
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () {
      document.body.style.overflow = '';
    });
  });
})();
