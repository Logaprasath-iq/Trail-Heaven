/**
 * TrailHaven - Theme Manager (Light / Dark Mode)
 * Persists user preference in localStorage and handles smooth transitions.
 */

const ThemeManager = {
  STORAGE_KEY: 'trailhaven_theme',

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    this.applyTheme(theme, false);
    this.updateToggleButtons(theme);
  },

  applyTheme(theme, persist = true) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (persist) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
    
    this.updateToggleButtons(theme);
    this.updateBrandLogos(theme);
    
    // Dispatch theme event
    window.dispatchEvent(new CustomEvent('trailhaven:theme-changed', { detail: { theme } }));
  },

  toggle() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    this.applyTheme(newTheme, true);
  },

  updateToggleButtons(theme) {
    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      const label = btn.querySelector('.theme-label');
      
      if (isDark) {
        if (sunIcon) {
          sunIcon.classList.remove('hidden');
          sunIcon.style.display = 'inline-block';
        }
        if (moonIcon) {
          moonIcon.classList.add('hidden');
          moonIcon.style.display = 'none';
        }
        if (label) label.textContent = 'Light';
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        if (sunIcon) {
          sunIcon.classList.add('hidden');
          sunIcon.style.display = 'none';
        }
        if (moonIcon) {
          moonIcon.classList.remove('hidden');
          moonIcon.style.display = 'inline-block';
        }
        if (label) label.textContent = 'Dark';
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  },

  updateBrandLogos(theme) {
    // Optionally swap logo variations if element specifies data-light / data-dark
    const logos = document.querySelectorAll('.brand-logo-img');
    logos.forEach(logo => {
      const lightSrc = logo.getAttribute('data-src-light') || 'assets/images/trailhaven-logo.svg';
      const darkSrc = logo.getAttribute('data-src-dark') || 'assets/images/trailhaven-logo-white.svg';
      if (logo.classList.contains('use-theme-logo')) {
        logo.src = theme === 'dark' ? darkSrc : lightSrc;
      }
    });
  }
};

// Auto-initialize as early as possible
ThemeManager.init();

// Re-verify on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    ThemeManager.updateToggleButtons(currentTheme);
  });
}

window.ThemeManager = ThemeManager;
