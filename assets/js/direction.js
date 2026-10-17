/**
 * TrailHaven - Direction Manager (LTR / RTL Support)
 * Manages text direction, mirror layouts, and persistence in localStorage.
 */

const DirectionManager = {
  STORAGE_KEY: 'trailhaven_direction',

  init() {
    const savedDir = localStorage.getItem(this.STORAGE_KEY) || 'ltr';
    this.applyDirection(savedDir, false);
    this.updateToggleButtons(savedDir);
  },

  applyDirection(dir, persist = true) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
    
    if (persist) {
      localStorage.setItem(this.STORAGE_KEY, dir);
    }
    
    this.updateToggleButtons(dir);

    // Update mobile nav drawer off-screen translate class for RTL / LTR
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer && (drawer.classList.contains('translate-x-full') || drawer.classList.contains('-translate-x-full'))) {
      if (dir === 'rtl') {
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('-translate-x-full');
      } else {
        drawer.classList.remove('-translate-x-full');
        drawer.classList.add('translate-x-full');
      }
    }
    
    // Dispatch direction event
    window.dispatchEvent(new CustomEvent('trailhaven:direction-changed', { detail: { dir } }));
  },

  toggle() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    this.applyDirection(newDir, true);
    
    if (window.showToast) {
      window.showToast(`Switched layout to ${newDir.toUpperCase()} mode`, 'info');
    }
  },

  updateToggleButtons(dir) {
    const buttons = document.querySelectorAll('.dir-toggle-btn');
    buttons.forEach(btn => {
      let icon = btn.querySelector('.dir-arrow-icon');
      if (!icon) {
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-right-left text-[11px] dir-arrow-icon mr-1.5 transition-transform duration-200';
        btn.prepend(icon);
      }
      const textSpan = btn.querySelector('.dir-label');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'Left-to-Right' : 'Right-to-Left'} direction`);
    });
  }
};

DirectionManager.init();
window.DirectionManager = DirectionManager;
