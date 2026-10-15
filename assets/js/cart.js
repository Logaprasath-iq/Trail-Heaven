/**
 * TrailHaven - Shopping Cart State & Calculations
 * Persists cart state in localStorage and manages badge counts & totals.
 */

const CartManager = {
  STORAGE_KEY: 'trailhaven_cart',
  COUPON_KEY: 'trailhaven_coupon',

  // Valid promo coupons
  VALID_COUPONS: {
    'TRAIL10': { discountPercent: 10, minSpend: 0, description: "10% Off Everything" },
    'ADVENTURE20': { discountPercent: 20, minSpend: 20000, description: "20% Off Orders over ₹20,000" },
    'FREESHIP': { freeShipping: true, description: "Free Express Shipping" }
  },

  init() {
    this.updateBadges();
  },

  getCart() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to parse cart:", e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('trailhaven:cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error("Failed to save cart:", e);
    }
  },

  addItem(itemId, quantity = 1, isBundle = false) {
    const cart = this.getCart();
    let productData = null;

    if (isBundle) {
      const bundle = window.TrailHavenData?.bundles?.find(b => b.id === itemId);
      if (bundle) {
        productData = {
          id: bundle.id,
          name: bundle.name,
          price: bundle.price,
          originalPrice: bundle.originalPrice,
          image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
          categoryName: "Curated Bundle",
          isBundle: true
        };
      }
    } else {
      const prod = window.TrailHavenData?.products?.find(p => p.id === itemId);
      if (prod) {
        productData = {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          originalPrice: prod.originalPrice,
          image: prod.image,
          categoryName: prod.categoryName,
          isBundle: false
        };
      }
    }

    if (!productData) {
      console.error("Item not found:", itemId);
      if (window.showToast) window.showToast("Product not found.", "error");
      return false;
    }

    const existingIndex = cart.findIndex(item => item.id === itemId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += Number(quantity);
    } else {
      cart.push({
        ...productData,
        quantity: Number(quantity)
      });
    }

    this.saveCart(cart);

    if (window.showToast) {
      window.showToast(`Added "${productData.name}" to cart!`, "success");
    }

    return true;
  },

  removeItem(itemId) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === itemId);
    cart = cart.filter(i => i.id !== itemId);
    this.saveCart(cart);

    if (item && window.showToast) {
      window.showToast(`Removed "${item.name}" from cart.`, "info");
    }
  },

  updateQuantity(itemId, quantity) {
    const cart = this.getCart();
    const target = cart.find(i => i.id === itemId);
    if (target) {
      const newQty = parseInt(quantity, 10);
      if (newQty <= 0) {
        this.removeItem(itemId);
      } else {
        target.quantity = newQty;
        this.saveCart(cart);
      }
    }
  },

  clearCart() {
    this.saveCart([]);
    this.removeCoupon();
  },

  getCoupon() {
    try {
      return JSON.parse(localStorage.getItem(this.COUPON_KEY));
    } catch (e) {
      return null;
    }
  },

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    const couponInfo = this.VALID_COUPONS[cleanCode];

    if (!couponInfo) {
      return { success: false, message: "Invalid coupon code. Try TRAIL10 or ADVENTURE20." };
    }

    const subtotal = this.getSubtotal();
    if (couponInfo.minSpend && subtotal < couponInfo.minSpend) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${couponInfo.minSpend.toLocaleString('en-IN')}.`
      };
    }

    const data = { code: cleanCode, ...couponInfo };
    localStorage.setItem(this.COUPON_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('trailhaven:cart-updated'));
    return { success: true, message: `Coupon ${cleanCode} applied!`, coupon: data };
  },

  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
    window.dispatchEvent(new CustomEvent('trailhaven:cart-updated'));
  },

  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  },

  getTotals() {
    const subtotal = this.getSubtotal();
    const coupon = this.getCoupon();
    let discount = 0;

    if (coupon && coupon.discountPercent) {
      discount = Math.round(subtotal * (coupon.discountPercent / 100));
    }

    // Shipping rules: Free if subtotal >= 2999 or coupon provides free shipping, else ₹499
    const isFreeShipping = subtotal === 0 || subtotal >= 2999 || (coupon && coupon.freeShipping);
    const shipping = isFreeShipping ? 0 : 499;

    // GST is 18% included in product prices in India
    const taxableAmount = Math.max(0, subtotal - discount);
    const total = taxableAmount + shipping;

    return {
      subtotal,
      discount,
      shipping,
      isFreeShipping,
      total,
      coupon
    };
  },

  updateBadges() {
    const count = this.getItemCount();
    const badges = document.querySelectorAll('.cart-count-badge');
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
  }
};

CartManager.init();
window.CartManager = CartManager;
