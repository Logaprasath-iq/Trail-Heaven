/**
 * TrailHaven - Wishlist State Management
 * Persists wishlist item IDs in localStorage and synchronizes badges and heart states.
 */

const WishlistManager = {
  STORAGE_KEY: 'trailhaven_wishlist',

  init() {
    this.updateBadges();
    this.syncHeartIcons();
  },

  getWishlist() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse wishlist:", e);
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      this.updateBadges();
      this.syncHeartIcons();
      window.dispatchEvent(new CustomEvent('trailhaven:wishlist-updated', { detail: { list } }));
    } catch (e) {
      console.error("Failed to save wishlist:", e);
    }
  },

  has(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  },

  toggle(productId) {
    let list = this.getWishlist();
    const product = window.TrailHavenData?.products?.find(p => p.id === productId);
    const prodName = product ? product.name : "Product";

    if (list.includes(productId)) {
      list = list.filter(id => id !== productId);
      this.saveWishlist(list);
      if (window.showToast) {
        window.showToast(`Removed "${prodName}" from wishlist.`, "info");
      }
      return false; // Not in wishlist anymore
    } else {
      list.push(productId);
      this.saveWishlist(list);
      if (window.showToast) {
        window.showToast(`Saved "${prodName}" to wishlist!`, "success");
      }
      return true; // Added to wishlist
    }
  },

  remove(productId) {
    let list = this.getWishlist();
    list = list.filter(id => id !== productId);
    this.saveWishlist(list);
  },

  getCount() {
    return this.getWishlist().length;
  },

  updateBadges() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(b => {
      b.textContent = count;
      if (count > 0) {
        b.classList.remove('hidden');
        b.classList.remove('badge-pop');
        void b.offsetWidth;
        b.classList.add('badge-pop');
      } else {
        b.classList.add('hidden');
      }
    });
  },

  syncHeartIcons() {
    const list = this.getWishlist();
    const buttons = document.querySelectorAll('[data-toggle-wishlist], [data-wishlist-id], .wishlist-toggle-btn');
    buttons.forEach(btn => {
      const id = btn.getAttribute('data-toggle-wishlist') || btn.getAttribute('data-wishlist-id');
      if (!id) return;

      const icon = btn.querySelector('i');
      const isWish = list.includes(id);

      if (isWish) {
        btn.classList.add('active', 'wishlist-active');
        btn.classList.remove('text-gray-600', 'dark:text-gray-200');
        if (icon) {
          icon.classList.remove('fa-regular');
          icon.classList.add('fa-solid', 'heart-active');
          icon.style.color = '#EF4444';
        }
      } else {
        btn.classList.remove('active', 'wishlist-active');
        btn.classList.add('text-gray-600', 'dark:text-gray-200');
        if (icon) {
          icon.classList.remove('fa-solid', 'heart-active', 'heart-pop');
          icon.classList.add('fa-regular');
          icon.style.color = '';
        }
      }
    });
  }
};

WishlistManager.init();
document.addEventListener('DOMContentLoaded', () => {
  WishlistManager.syncHeartIcons();
});
window.WishlistManager = WishlistManager;

