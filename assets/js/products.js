/**
 * TrailHaven - Products Catalog Controller
 * Powers products.html filtering, sorting, search, URL param deep-linking, and rendering.
 */

const ProductsPageController = {
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  maxPrice: 35000,
  inStockOnly: false,

  init() {
    this.parseUrlParams();
    this.renderCategoryPills();
    this.attachFilterEvents();
    this.filterAndRender();
  },

  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) {
      this.activeCategory = cat;
    }
    const q = params.get('q');
    if (q) {
      this.searchQuery = q;
      const searchInput = document.getElementById('catalog-search-input');
      if (searchInput) searchInput.value = q;
    }
  },

  renderCategoryPills() {
    const container = document.getElementById('category-filter-pills');
    if (!container) return;

    const categories = [
      { id: 'all', name: 'All Gear' },
      ...(window.TrailHavenData?.categories || [])
    ];

    container.innerHTML = categories.map(c => `
      <button class="cat-pill px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
        this.activeCategory === c.id 
          ? 'bg-forest text-white border-forest shadow-md dark:bg-sand dark:text-forest' 
          : 'bg-white dark:bg-[#202621] text-forest dark:text-cream border-[#E2DACB] dark:border-[#2D372F] hover:border-orange'
      }" data-cat-id="${c.id}">
        ${c.name}
      </button>
    `).join('');

    container.querySelectorAll('.cat-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.getAttribute('data-cat-id');
        this.renderCategoryPills();
        this.filterAndRender();
      });
    });
  },

  attachFilterEvents() {
    // Search input
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.filterAndRender();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.filterAndRender();
      });
    }

    // Price range slider
    const priceSlider = document.getElementById('catalog-price-slider');
    const priceDisplay = document.getElementById('catalog-price-display');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.maxPrice = Number(e.target.value);
        if (priceDisplay) priceDisplay.textContent = `₹${this.maxPrice.toLocaleString('en-IN')}`;
        this.filterAndRender();
      });
    }

    // In Stock checkbox
    const inStockCheck = document.getElementById('catalog-instock-check');
    if (inStockCheck) {
      inStockCheck.addEventListener('change', (e) => {
        this.inStockOnly = e.target.checked;
        this.filterAndRender();
      });
    }

    // Reset filters button
    const resetBtn = document.getElementById('catalog-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'featured';
        this.maxPrice = 35000;
        this.inStockOnly = false;

        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'featured';
        if (priceSlider) priceSlider.value = 35000;
        if (priceDisplay) priceDisplay.textContent = '₹35,000';
        if (inStockCheck) inStockCheck.checked = false;

        this.renderCategoryPills();
        this.filterAndRender();
      });
    }
  },

  filterAndRender() {
    const grid = document.getElementById('products-catalog-grid');
    const countEl = document.getElementById('catalog-results-count');
    if (!grid) return;

    let items = [...(window.TrailHavenData?.products || [])];

    // Filter by category
    if (this.activeCategory !== 'all') {
      items = items.filter(p => p.category === this.activeCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      const q = this.searchQuery;
      items = items.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    // Filter by price
    items = items.filter(p => p.price <= this.maxPrice);

    // Filter by stock
    if (this.inStockOnly) {
      items = items.filter(p => p.inStock);
    }

    // Sorting
    if (this.sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (countEl) {
      countEl.textContent = `Showing ${items.length} of ${window.TrailHavenData?.products?.length || 0} gear items`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <i class="fa-solid fa-mountain-sun text-4xl text-[#C6AD83] mb-3"></i>
          <h3 class="text-xl font-bold font-display text-forest dark:text-cream">No gear matching your criteria</h3>
          <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Try adjusting the price slider, clearing the search box, or selecting "All Gear".</p>
          <button id="empty-state-reset" class="btn-primary mt-6 text-xs">Reset All Filters</button>
        </div>
      `;
      const emptyReset = grid.querySelector('#empty-state-reset');
      if (emptyReset) {
        emptyReset.addEventListener('click', () => {
          document.getElementById('catalog-reset-filters')?.click();
        });
      }
      return;
    }

    const wishlist = window.WishlistManager?.getWishlist() || [];

    grid.innerHTML = items.map((p, idx) => {
      const isWish = wishlist.includes(p.id);
      const delay = Math.min(idx * 40, 300);
      return `
        <div class="card-theme card-animate-in flex flex-col justify-between overflow-hidden group" style="animation-delay: ${delay}ms;">
          <div class="relative img-zoom-container h-60 bg-gray-100 dark:bg-gray-800">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
            ${p.discountPercent ? `<span class="absolute top-3 left-3 badge-orange badge-pulse">${p.discountPercent}% OFF</span>` : ''}
            ${p.badge && !p.discountPercent ? `<span class="absolute top-3 left-3 badge-eco">${p.badge}</span>` : ''}
            
            <button data-toggle-wishlist="${p.id}" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center ${isWish ? 'active wishlist-active !text-red-500' : 'text-gray-600 dark:text-gray-200'} hover:text-red-500 transition shadow" aria-label="Toggle Wishlist">
              <i class="${isWish ? 'fa-solid heart-active' : 'fa-regular'} fa-heart" ${isWish ? 'style="color: #EF4444;"' : ''}></i>
            </button>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>${p.categoryName}</span>
                <span class="flex items-center gap-1 text-amber-500 font-bold">
                  <i class="fa-solid fa-star text-xs"></i> ${p.rating} (${p.reviewsCount})
                </span>
              </div>
              <h3 class="font-bold text-base text-forest dark:text-cream group-hover:text-orange transition-colors">
                <a href="product-details.html?id=${p.id}">${p.name}</a>
              </h3>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                ${p.shortDesc}
              </p>
            </div>

            <div class="pt-4 mt-4 border-t border-[#E2DACB] dark:border-[#2D372F]">
              <div class="flex items-baseline gap-2 mb-4">
                <span class="text-xl font-black text-forest dark:text-cream">₹${p.price.toLocaleString('en-IN')}</span>
                ${p.originalPrice ? `<span class="text-xs text-gray-400 line-through">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
              </div>
              <div class="grid grid-cols-2 gap-2">
                <a href="product-details.html?id=${p.id}" class="btn-outline text-xs py-2 px-3 justify-center text-center">
                  View Details
                </a>
                <button data-add-to-cart="${p.id}" class="btn-primary text-xs py-2 px-3 justify-center">
                  <i class="fa-solid fa-cart-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    window.reobserveScrollElements?.(grid);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ProductsPageController.init();
});
window.ProductsPageController = ProductsPageController;
