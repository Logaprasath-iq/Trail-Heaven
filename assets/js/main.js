/**
 * TrailHaven - Main Application Engine
 * Handles sticky navbar, mobile drawers, active states, toast notifications,
 * lightbox viewer, and shared event delegations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initActiveNavLink();
  initBackToTop();
  initToastContainer();
  initSharedDelegations();
  initLightbox();
  initScrollProgressBar();
  initScrollReveal();
  initCardTilt();
  initCounters();
  initParallax();
});

// 1. Sticky Navbar on Scroll (Stabilized without layout shifts)
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  let ticking = false;
  let isScrolled = false;

  const updateNavbar = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hysteresis threshold to prevent vibration oscillation:
    // Activate shadow when scrolling past 40px, deactivate only when scrolling back above 15px
    if (!isScrolled && scrollY > 40) {
      isScrolled = true;
      navbar.classList.add('navbar-scrolled', 'shadow-md');
    } else if (isScrolled && scrollY < 15) {
      isScrolled = false;
      navbar.classList.remove('navbar-scrolled', 'shadow-md');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();
}

// 2. Mobile Navigation Drawer
function initMobileNav() {
  const hamburgerBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerCloseBtn = document.getElementById('mobile-drawer-close');

  if (!hamburgerBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('translate-x-full', '-translate-x-full');
    if (drawerBackdrop) drawerBackdrop.classList.remove('hidden', 'opacity-0');
    document.body.classList.add('overflow-hidden');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRtl) {
      drawer.classList.add('-translate-x-full');
    } else {
      drawer.classList.add('translate-x-full');
    }
    if (drawerBackdrop) drawerBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      if (drawerBackdrop) drawerBackdrop.classList.add('hidden');
    }, 300);
    document.body.classList.remove('overflow-hidden');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  hamburgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Mobile Home submenu toggle
  const mobileHomeToggle = document.getElementById('mobile-home-toggle');
  const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
  const mobileHomeChevron = document.getElementById('mobile-home-chevron');
  if (mobileHomeToggle && mobileHomeSubmenu) {
    mobileHomeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      mobileHomeSubmenu.classList.toggle('hidden');
      if (mobileHomeChevron) {
        mobileHomeChevron.classList.toggle('rotate-180');
      }
    });
  }

  // Close on mobile nav link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// 3. Highlight Current Active Navigation Link
function initActiveNavLink() {
  let path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === '') path = 'index.html';

  // Highlight Home Dropdown if on index.html or home2.html
  const homeDropdownBtn = document.querySelector('#home-dropdown-nav > button');
  if (homeDropdownBtn) {
    const labelSpan = homeDropdownBtn.querySelector('span');
    if (path === 'home2.html') {
      homeDropdownBtn.classList.add('active');
      if (labelSpan) labelSpan.textContent = 'Home 2';
    } else if (path === 'index.html') {
      homeDropdownBtn.classList.add('active');
      if (labelSpan) labelSpan.textContent = 'Home';
    } else {
      homeDropdownBtn.classList.remove('active');
    }
  }

  // Synchronize mobile drawer home label if on home2.html
  const mobileHomeToggle = document.getElementById('mobile-home-toggle');
  if (mobileHomeToggle && path === 'home2.html') {
    const mobileSpan = mobileHomeToggle.querySelector('span');
    if (mobileSpan) mobileSpan.innerHTML = '<i class="fa-solid fa-house text-xs text-orange"></i> Home 2';
  }

  const links = document.querySelectorAll('.nav-link:not(#home-dropdown-nav > button), .mobile-nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === './')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 4. Back to Top Button (Disabled per user request)
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (btn) btn.remove();
}

// 5. Global Toast System
function initToastContainer() {
  if (!document.getElementById('toast-container')) {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
}

window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';

  let icon = '<i class="fa-solid fa-circle-info text-sky-500"></i>';
  if (type === 'success') {
    icon = '<i class="fa-solid fa-circle-check text-emerald-500"></i>';
  } else if (type === 'error') {
    icon = '<i class="fa-solid fa-triangle-exclamation text-rose-500"></i>';
  }

  toast.innerHTML = `
    <div class="flex items-center gap-2.5">
      ${icon}
      <span class="text-xs sm:text-sm font-semibold">${message}</span>
    </div>
    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1" aria-label="Close notification">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
};

// 6. Shared Delegations (Add to cart & Wishlist clicks)
function initSharedDelegations() {
  document.addEventListener('click', (e) => {
    // Add to cart button
    const cartBtn = e.target.closest('[data-add-to-cart]');
    if (cartBtn) {
      e.preventDefault();
      const id = cartBtn.getAttribute('data-add-to-cart');
      const isBundle = cartBtn.getAttribute('data-is-bundle') === 'true';
      const qtyInput = document.getElementById('product-qty-input');
      const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
      window.CartManager?.addItem(id, qty, isBundle);
      return;
    }

    // Wishlist toggle button (Instant red color + pop animation)
    const wishBtn = e.target.closest('[data-toggle-wishlist], [data-wishlist-id], .wishlist-toggle-btn');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = wishBtn.getAttribute('data-toggle-wishlist') || wishBtn.getAttribute('data-wishlist-id');
      if (!id) return;

      const isIn = window.WishlistManager?.toggle(id);
      const icon = wishBtn.querySelector('i');
      if (icon) {
        if (isIn) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid', 'heart-active');
          icon.style.color = '#EF4444';
          icon.classList.remove('heart-pop');
          void icon.offsetWidth;
          icon.classList.add('heart-pop');
          wishBtn.classList.add('active', 'wishlist-active');
          wishBtn.classList.remove('text-gray-600', 'dark:text-gray-200');
        } else {
          icon.classList.remove('fa-solid', 'heart-active', 'heart-pop');
          icon.classList.add('fa-regular');
          icon.style.color = '';
          wishBtn.classList.remove('active', 'wishlist-active');
          wishBtn.classList.add('text-gray-600', 'dark:text-gray-200');
        }
      }
      return;
    }

    // Global Theme toggles
    const themeBtn = e.target.closest('.theme-toggle-btn');
    if (themeBtn) {
      e.preventDefault();
      themeBtn.classList.remove('theme-spin-active');
      void themeBtn.offsetWidth;
      themeBtn.classList.add('theme-spin-active');
      setTimeout(() => themeBtn.classList.remove('theme-spin-active'), 450);
      window.ThemeManager?.toggle();
      return;
    }

    // Global Direction toggles
    const dirBtn = e.target.closest('.dir-toggle-btn');
    if (dirBtn) {
      e.preventDefault();
      window.DirectionManager?.toggle();
      return;
    }
  });
}

// 7. Interactive Lightbox Viewer for Gallery
let currentLightboxIndex = 0;
let currentLightboxItems = [];

function initLightbox() {
  let lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('#lightbox-close');
  const prevBtn = lightbox.querySelector('#lightbox-prev');
  const nextBtn = lightbox.querySelector('#lightbox-next');

  if (closeBtn) closeBtn.addEventListener('click', closeLightboxModal);
  if (prevBtn) prevBtn.addEventListener('click', prevLightboxSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextLightboxSlide);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightboxModal();
    if (e.key === 'ArrowLeft') prevLightboxSlide();
    if (e.key === 'ArrowRight') nextLightboxSlide();
  });
}

window.openGalleryLightbox = function(index, items) {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  currentLightboxItems = items || window.TrailHavenData?.gallery || [];
  currentLightboxIndex = index >= 0 && index < currentLightboxItems.length ? index : 0;
  updateLightboxContent();

  lightbox.classList.add('active');
  document.body.classList.add('overflow-hidden');
};

function closeLightboxModal() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
}

function prevLightboxSlide() {
  if (currentLightboxItems.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
  updateLightboxContent();
}

function nextLightboxSlide() {
  if (currentLightboxItems.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const item = currentLightboxItems[currentLightboxIndex];
  if (!item) return;

  const imgEl = lightbox.querySelector('#lightbox-img');
  const titleEl = lightbox.querySelector('#lightbox-title');
  const descEl = lightbox.querySelector('#lightbox-desc');
  const counterEl = lightbox.querySelector('#lightbox-counter');

  if (imgEl) {
    imgEl.src = item.image;
    imgEl.alt = item.title;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = `${item.caption} • ${item.location}`;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${currentLightboxItems.length}`;
}

// 8. Real-Time Top Scroll Progress Indicator across All Pages
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

// 9. Noticeable Scroll Reveal & Micro-Animation Engine across All Pages
function initScrollReveal() {
  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // A. Hero entrance animations on every page
  const heroSection = document.querySelector('main > section:first-of-type');
  if (heroSection) {
    const heroBadge = heroSection.querySelector('.inline-flex, span.text-xs.font-bold, .badge-orange, .badge-eco');
    if (heroBadge) heroBadge.classList.add('hero-entrance-badge-floating');

    const heroTitle = heroSection.querySelector('h1');
    if (heroTitle) heroTitle.classList.add('hero-entrance-title');

    const heroDesc = heroSection.querySelector('p');
    if (heroDesc) heroDesc.classList.add('hero-entrance-desc');

    const heroActions = heroSection.querySelector('.flex.flex-col, .flex.flex-wrap, .flex.gap-3, .flex.gap-4, .flex.gap-5');
    if (heroActions) heroActions.classList.add('hero-entrance-actions');

    const heroTrust = heroSection.querySelector('.grid.grid-cols-1.sm\\:grid-cols-3, .grid-cols-3');
    if (heroTrust) heroTrust.classList.add('hero-entrance-trust');
  }

  // B. Noticeable Scroll-reveal system on content elements
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.card-theme, .gallery-card, .pricing-card').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Targets to reveal smoothly as user scrolls
  const observeElements = (elements) => {
    elements.forEach(el => {
      if (el.closest('#main-navbar') || el.closest('#mobile-nav-drawer') || el.closest('#toast-container') || el.closest('#search-modal')) {
        return;
      }
      if (el.classList.contains('reveal-on-scroll')) return;

      el.classList.add('reveal-on-scroll');

      // Add stagger class if sibling inside a grid or flex container
      const parent = el.parentElement;
      if (parent && (parent.classList.contains('grid') || parent.classList.contains('flex'))) {
        const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal-on-scroll') || c.classList.contains('card-theme'));
        const index = siblings.indexOf(el);
        if (index >= 0) {
          const staggerNum = (index % 6) + 1;
          el.classList.add(`stagger-${staggerNum}`);
        }
      }

      revealObserver.observe(el);
    });
  };

  // Find all cards, section headers, testimonials, feature blocks
  const contentTargets = document.querySelectorAll(`
    main section:not(:first-of-type) .max-w-2xl,
    main section:not(:first-of-type) .text-center:not(.card-theme),
    main section:not(:first-of-type) h2,
    .card-theme,
    .gallery-card,
    .pricing-card,
    .guide-card,
    .blog-card,
    .stats-item,
    .faq-card,
    #products-catalog-grid > div
  `);

  observeElements(contentTargets);

  // Dynamic re-observe helper
  window.reobserveScrollElements = function(container) {
    if (!container || !('IntersectionObserver' in window)) return;
    const items = container.querySelectorAll('.card-theme, .gallery-card, > div');
    observeElements(items);
  };

  // MutationObserver for products-catalog-grid so filter/search results always animate
  const catalogGrid = document.getElementById('products-catalog-grid');
  if (catalogGrid && window.MutationObserver) {
    const mutObserver = new MutationObserver(() => {
      window.reobserveScrollElements(catalogGrid);
    });
    mutObserver.observe(catalogGrid, { childList: true });
  }

  // Ambient floating and badges
  const saleBadges = document.querySelectorAll('.badge-orange, .badge-eco');
  saleBadges.forEach(b => b.classList.add('badge-pulse'));

  const brandImgs = document.querySelectorAll('img[src*="trailhaven-emblem"]');
  brandImgs.forEach(img => img.classList.add('brand-emblem-img'));
}

// 10. Interactive Card Tilt & Hover Stability Engine
function initCardTilt() {
  // Stabilized to prevent high-frequency jitter and card vibration across all pages
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.removeAttribute('data-tilt');
    card.style.transform = '';
  });
}

// 11. Rolling Number Counters on Scroll Intersection
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter], [data-target]');
  if (!counterElements.length) return;

  const animateCounter = (el) => {
    if (el.dataset.counterAnimated === 'true') return;
    el.dataset.counterAnimated = 'true';

    const target = parseFloat(el.getAttribute('data-counter') || el.getAttribute('data-target')) || 0;
    const duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = ease * target;

      if (isDecimal) {
        el.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
      } else {
        el.textContent = `${prefix}${Math.round(currentVal).toLocaleString()}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isDecimal) {
          el.textContent = `${prefix}${target.toFixed(1)}${suffix}`;
        } else {
          el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      }
    };
    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterElements.forEach(el => observer.observe(el));
  } else {
    counterElements.forEach(animateCounter);
  }
}

// 12. Subtle Hero Background Parallax
function initParallax() {
  const parallaxBgs = document.querySelectorAll('.hero-bg-parallax, [data-parallax]');
  if (!parallaxBgs.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        parallaxBgs.forEach(bg => {
          if (scrolled < 900) {
            bg.style.transform = `translate3d(0, ${(scrolled * 0.22).toFixed(1)}px, 0)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

