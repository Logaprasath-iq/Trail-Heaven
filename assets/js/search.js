/**
 * TrailHaven - Universal Search Manager
 * Searches across Products, Buying Guides, and Blog Articles with instant UI preview.
 */

const SearchManager = {
  modalEl: null,
  inputEl: null,
  resultsEl: null,
  clearBtn: null,
  closeBtn: null,

  init() {
    this.createSearchModal();
    this.attachEventListeners();
  },

  createSearchModal() {
    let existing = document.getElementById('search-modal');
    if (existing) {
      this.modalEl = existing;
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'fixed inset-0 z-[60] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Search TrailHaven');

    modal.innerHTML = `
      <div class="bg-[var(--color-cream-card)] text-[var(--color-text-main)] w-full max-w-2xl rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden flex flex-col max-h-[80vh] animate-in">
        <!-- Search Header -->
        <div class="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
          <i class="fa-solid fa-magnifying-glass text-[#D77A3C] text-lg pl-2"></i>
          <input type="text" id="global-search-input" 
            placeholder="Search tents, backpacks, sleeping bags, guides, articles..." 
            class="flex-1 bg-transparent border-0 text-base sm:text-lg focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 text-[var(--color-text-main)]"
            autocomplete="off">
          <button id="search-clear-btn" class="hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2" aria-label="Clear query">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button id="search-close-btn" class="text-sm font-semibold px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition" aria-label="Close search">
            Esc
          </button>
        </div>

        <!-- Filter Tags -->
        <div class="px-4 py-2.5 bg-gray-50/50 dark:bg-black/20 border-b border-[var(--color-border)] flex items-center gap-2 overflow-x-auto text-xs">
          <span class="text-gray-500 font-medium whitespace-nowrap">Filter:</span>
          <button class="search-filter-pill active px-2.5 py-1 rounded-full font-medium transition bg-[#263C2D] text-white" data-filter="all">All</button>
          <button class="search-filter-pill px-2.5 py-1 rounded-full font-medium transition bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" data-filter="products">Products</button>
          <button class="search-filter-pill px-2.5 py-1 rounded-full font-medium transition bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" data-filter="guides">Guides</button>
          <button class="search-filter-pill px-2.5 py-1 rounded-full font-medium transition bg-gray-200 dark:bg-gray-700 hover:bg-gray-300" data-filter="blogs">Articles</button>
        </div>

        <!-- Search Results Container -->
        <div id="search-results-box" class="p-4 overflow-y-auto flex-1 divide-y divide-[var(--color-border)]">
          <div class="py-12 text-center text-gray-500">
            <i class="fa-solid fa-compass text-4xl mb-3 text-[#C6AD83]"></i>
            <p class="text-base font-medium">Type any keyword to search TrailHaven gear & field guides</p>
            <p class="text-xs text-gray-400 mt-1">Try: "tent", "down", "backpack", "monsoon", "titanium"</p>
          </div>
        </div>

        <!-- Search Footer -->
        <div class="px-4 py-3 bg-gray-50 dark:bg-black/30 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-gray-500">
          <span>Search spans <strong class="text-[#D77A3C]">Catalog, Guides & Blog</strong></span>
          <span class="hidden sm:inline">Press <kbd class="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono">ESC</kbd> to close</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
    this.inputEl = modal.querySelector('#global-search-input');
    this.resultsEl = modal.querySelector('#search-results-box');
    this.clearBtn = modal.querySelector('#search-clear-btn');
    this.closeBtn = modal.querySelector('#search-close-btn');
  },

  attachEventListeners() {
    // Open on search triggers
    document.querySelectorAll('.open-search-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close on overlay backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Clear input button
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        this.inputEl.value = '';
        this.clearBtn.classList.add('hidden');
        this.performSearch('');
        this.inputEl.focus();
      });
    }

    // Input changes
    if (this.inputEl) {
      this.inputEl.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query) {
          this.clearBtn.classList.remove('hidden');
        } else {
          this.clearBtn.classList.add('hidden');
        }
        this.performSearch(query);
      });
    }

    // Keyboard shortcut ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.classList.contains('active')) {
        this.close();
      }
      // Ctrl+K or Cmd+K shortcut
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.open();
      }
    });

    // Filter pills
    this.modalEl.querySelectorAll('.search-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.modalEl.querySelectorAll('.search-filter-pill').forEach(p => {
          p.classList.remove('active', 'bg-[#263C2D]', 'text-white');
          p.classList.add('bg-gray-200', 'dark:bg-gray-700');
        });
        pill.classList.add('active', 'bg-[#263C2D]', 'text-white');
        pill.classList.remove('bg-gray-200', 'dark:bg-gray-700');
        this.performSearch(this.inputEl.value.trim());
      });
    });
  },

  open() {
    const drawerCloseBtn = document.getElementById('mobile-drawer-close');
    if (drawerCloseBtn) {
      drawerCloseBtn.click();
    }
    this.modalEl.classList.add('active');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      if (this.inputEl) {
        this.inputEl.focus();
        this.inputEl.select();
      }
    }, 50);
  },

  close() {
    this.modalEl.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  },

  getActiveFilter() {
    const active = this.modalEl.querySelector('.search-filter-pill.active');
    return active ? active.getAttribute('data-filter') : 'all';
  },

  performSearch(query) {
    if (!query) {
      this.resultsEl.innerHTML = `
        <div class="py-12 text-center text-gray-500">
          <i class="fa-solid fa-compass text-4xl mb-3 text-[#C6AD83]"></i>
          <p class="text-base font-medium">Type any keyword to search TrailHaven gear & field guides</p>
          <p class="text-xs text-gray-400 mt-1">Try: "tent", "down", "backpack", "monsoon", "titanium"</p>
        </div>
      `;
      return;
    }

    const q = query.toLowerCase();
    const filter = this.getActiveFilter();
    const results = [];

    // Search Products
    if (filter === 'all' || filter === 'products') {
      const prods = window.TrailHavenData?.products || [];
      prods.forEach(p => {
        if (
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Product',
            title: p.name,
            subtitle: `₹${p.price.toLocaleString('en-IN')} • ${p.categoryName}`,
            badge: 'Product',
            badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
            image: p.image,
            link: `product-details.html?id=${p.id}`
          });
        }
      });
    }

    // Search Guides
    if (filter === 'all' || filter === 'guides') {
      const guides = window.TrailHavenData?.guides || [];
      guides.forEach(g => {
        if (
          g.title.toLowerCase().includes(q) ||
          g.excerpt.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Guide',
            title: g.title,
            subtitle: `${g.category} • ${g.readTime}`,
            badge: 'Buying Guide',
            badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
            image: g.image,
            link: `guide-details.html?id=${g.id}`
          });
        }
      });
    }

    // Search Blog Articles
    if (filter === 'all' || filter === 'blogs') {
      const blogs = window.TrailHavenData?.blogs || [];
      blogs.forEach(b => {
        if (
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'Article',
            title: b.title,
            subtitle: `${b.category} • ${b.readTime}`,
            badge: 'Field Story',
            badgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
            image: b.image,
            link: `blog-details.html?id=${b.id}`
          });
        }
      });
    }

    if (results.length === 0) {
      this.resultsEl.innerHTML = `
        <div class="py-12 text-center text-gray-500">
          <i class="fa-regular fa-face-frown text-4xl mb-3 text-[#D77A3C]"></i>
          <p class="text-base font-semibold">No results found for "${query}"</p>
          <p class="text-xs text-gray-400 mt-1">Check spelling or try broader search terms.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Found ${results.length} result${results.length > 1 ? 's' : ''}
      </div>
    `;

    results.forEach(item => {
      html += `
        <a href="${item.link}" class="flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition group">
          <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-[var(--color-border)]">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeClass}">${item.badge}</span>
            </div>
            <h4 class="font-bold text-sm sm:text-base group-hover:text-[#D77A3C] transition truncate">${item.title}</h4>
            <p class="text-xs text-gray-500 truncate">${item.subtitle}</p>
          </div>
          <i class="fa-solid fa-arrow-right text-gray-400 group-hover:text-[#D77A3C] group-hover:translate-x-1 transition flex-shrink-0 text-sm"></i>
        </a>
      `;
    });

    this.resultsEl.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SearchManager.init();
});
window.SearchManager = SearchManager;
