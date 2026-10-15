/**
 * TrailHaven - Forms & Validation Manager
 * Handles Contact Form, Checkout Demo, Newsletter Subscription, and Coupon input.
 */

const FormsManager = {
  init() {
    this.bindNewsletterForms();
    this.bindContactForm();
    this.bindCheckoutForm();
    this.setupFieldRestrictions();
  },

  // Keystroke restrictions: block numbers in name/city/state, block alphabets in phone/pincode
  setupFieldRestrictions() {
    // 1. Name fields: do NOT accept numbers
    ['#contact-name', '#checkout-name'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.addEventListener('input', () => {
          if (/\d/.test(el.value)) {
            el.value = el.value.replace(/\d/g, '');
          }
        });
      }
    });

    // 2. City & State fields: do NOT accept numbers
    ['#checkout-city', '#checkout-state'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.addEventListener('input', () => {
          if (/\d/.test(el.value)) {
            el.value = el.value.replace(/\d/g, '');
          }
        });
      }
    });

    // 3. Phone / Mobile Number fields: do NOT accept alphabets
    ['#contact-phone', '#checkout-phone'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.addEventListener('input', () => {
          if (/[a-zA-Z]/.test(el.value)) {
            el.value = el.value.replace(/[a-zA-Z]/g, '');
          }
        });
      }
    });

    // 4. PIN Code: only numeric digits, max 6 digits, do NOT accept alphabets
    const pinEl = document.querySelector('#checkout-pincode');
    if (pinEl) {
      pinEl.addEventListener('input', () => {
        pinEl.value = pinEl.value.replace(/\D/g, '').slice(0, 6);
      });
    }
  },

  // Real-time live error removal when user starts typing or selects
  setupLiveValidation(form) {
    if (!form) return;
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      const clearError = () => {
        field.classList.remove('border-red-500');
        const err = field.parentElement?.querySelector('.input-error-msg');
        if (err) err.remove();
      };
      field.addEventListener('input', clearError);
      field.addEventListener('change', clearError);
    });
  },

  // Newsletter validation & handling
  bindNewsletterForms() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input ? input.value.trim() : '';

        if (!this.isValidEmail(email)) {
          if (window.showToast) {
            window.showToast("Please enter a valid email address.", "error");
          }
          if (input) input.focus();
          return;
        }

        if (input) input.value = '';
        if (window.showToast) {
          window.showToast("Thank you for joining TrailHaven Trail Dispatches!", "success");
        }
      });
    });
  },

  // Contact Form
  bindContactForm() {
    const form = document.getElementById('contact-enquiry-form');
    if (!form) return;

    this.setupLiveValidation(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = form.querySelector('#contact-name');
      const emailInput = form.querySelector('#contact-email');
      const phoneInput = form.querySelector('#contact-phone');
      const subjectInput = form.querySelector('#contact-subject');
      const messageInput = form.querySelector('#contact-message');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      // Reset error indicators
      form.querySelectorAll('.input-error-msg').forEach(el => el.remove());
      form.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));

      let hasError = false;

      // 1. Name validation (no numbers, minimum 2 letters)
      if (!name) {
        this.showInputError(nameInput, "Full Name is required");
        hasError = true;
      } else if (/\d/.test(name)) {
        this.showInputError(nameInput, "Name cannot contain numbers");
        hasError = true;
      } else if ((name.match(/[a-zA-Z]/g) || []).length < 2) {
        this.showInputError(nameInput, "Name must contain at least 2 letters");
        hasError = true;
      } else if (!this.isValidName(name)) {
        this.showInputError(nameInput, "Please enter a valid name (letters only)");
        hasError = true;
      }

      // 2. Email validation
      if (!email || !this.isValidEmail(email)) {
        this.showInputError(emailInput, "Please enter a valid email address (e.g. name@example.com)");
        hasError = true;
      }

      // 3. Phone validation (no letters, valid 10 digits)
      const cleanPhone = phone.replace(/\D/g, '');
      if (!phone) {
        this.showInputError(phoneInput, "Phone number is required");
        hasError = true;
      } else if (/[a-zA-Z]/.test(phone)) {
        this.showInputError(phoneInput, "Phone number cannot contain letters");
        hasError = true;
      } else if (cleanPhone.length < 10) {
        this.showInputError(phoneInput, "Please enter a valid 10-digit mobile number");
        hasError = true;
      }

      // 4. Subject validation
      if (!subject) {
        this.showInputError(subjectInput, "Subject is required");
        hasError = true;
      }

      // 5. Message validation (min 15 characters)
      if (!message || message.length < 15) {
        this.showInputError(messageInput, "Message must be at least 15 characters");
        hasError = true;
      }

      if (hasError) return;

      // Show success modal
      this.showContactSuccessModal({
        name,
        email,
        phone,
        subject,
        message
      });

      form.reset();
    });
  },

  showInputError(inputEl, msg) {
    if (!inputEl) return;
    inputEl.classList.add('border-red-500');
    const existing = inputEl.parentElement?.querySelector('.input-error-msg');
    if (existing) existing.remove();

    const errorEl = document.createElement('p');
    errorEl.className = 'input-error-msg text-xs text-red-500 mt-1 font-medium';
    errorEl.textContent = msg;
    inputEl.parentElement?.appendChild(errorEl);
  },

  showContactSuccessModal(data) {
    let modal = document.getElementById('contact-success-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'contact-success-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-[var(--color-cream-card)] text-[var(--color-text-main)] w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-[var(--color-border)] relative">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 class="text-2xl font-black text-center mb-2 font-display">Message Received, ${data.name}!</h3>
        <p class="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
          Thank you for reaching out to TrailHaven Gear Advisors in Chennai. Our technical team usually responds within 4 business hours.
        </p>

        <div class="bg-gray-50 dark:bg-black/20 p-4 rounded-xl text-xs space-y-2 mb-6 border border-[var(--color-border)]">
          <div class="flex justify-between"><span class="text-gray-500">Subject:</span> <strong class="text-right">${data.subject}</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Confirmation Sent To:</span> <strong>${data.email}</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Contact Number:</span> <strong>${data.phone}</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Location Base:</span> <strong>Chennai, Tamil Nadu, India</strong></div>
        </div>

        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900 text-[11px] text-amber-800 dark:text-amber-300 mb-6 flex items-start gap-2">
          <i class="fa-solid fa-circle-info mt-0.5"></i>
          <span><strong>Prototype Demonstration Notice:</strong> This is a frontend demonstration. In a production environment, this enquiry triggers an authenticated transactional email API (SendGrid / AWS SES) to dispatch dispatches to our customer service desk.</span>
        </div>

        <button onclick="document.getElementById('contact-success-modal').classList.add('hidden')" class="w-full btn-primary justify-center">
          Close & Continue Exploring
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
  },

  // Checkout Form Validation & Demo Confirmation
  bindCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    this.setupLiveValidation(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const cart = window.CartManager?.getCart() || [];
      if (cart.length === 0) {
        if (window.showToast) window.showToast("Your cart is empty! Add products before checking out.", "error");
        return;
      }

      const nameInput = form.querySelector('#checkout-name');
      const emailInput = form.querySelector('#checkout-email');
      const phoneInput = form.querySelector('#checkout-phone');
      const addressInput = form.querySelector('#checkout-address');
      const cityInput = form.querySelector('#checkout-city');
      const stateInput = form.querySelector('#checkout-state');
      const pincodeInput = form.querySelector('#checkout-pincode');

      // Read fields
      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || '';
      const address = addressInput?.value.trim() || '';
      const city = cityInput?.value.trim() || '';
      const state = stateInput?.value.trim() || '';
      const pincode = pincodeInput?.value.trim() || '';
      const paymentMethod = form.querySelector('input[name="payment_method"]:checked')?.value || 'UPI';
      const orderNotes = form.querySelector('#checkout-notes')?.value.trim() || 'None';

      // Reset error indicators
      form.querySelectorAll('.input-error-msg').forEach(el => el.remove());
      form.querySelectorAll('.border-red-500').forEach(el => el.classList.remove('border-red-500'));

      let hasError = false;

      // 1. Name validation (no numbers, minimum 2 letters)
      if (!name) {
        this.showInputError(nameInput, "Full Name is required");
        hasError = true;
      } else if (/\d/.test(name)) {
        this.showInputError(nameInput, "Name cannot contain numbers");
        hasError = true;
      } else if ((name.match(/[a-zA-Z]/g) || []).length < 2) {
        this.showInputError(nameInput, "Name must contain at least 2 letters");
        hasError = true;
      } else if (!this.isValidName(name)) {
        this.showInputError(nameInput, "Please enter a valid name (letters only)");
        hasError = true;
      }

      // 2. Email validation
      if (!email || !this.isValidEmail(email)) {
        this.showInputError(emailInput, "Valid Email is required (e.g. name@example.com)");
        hasError = true;
      }

      // 3. Phone / Mobile validation (no letters, 10 digits required)
      const cleanPhone = phone.replace(/\D/g, '');
      if (!phone) {
        this.showInputError(phoneInput, "Mobile number is required");
        hasError = true;
      } else if (/[a-zA-Z]/.test(phone)) {
        this.showInputError(phoneInput, "Mobile number cannot contain letters");
        hasError = true;
      } else if (cleanPhone.length < 10) {
        this.showInputError(phoneInput, "Please enter a valid 10-digit mobile number");
        hasError = true;
      }

      // 4. Street Address validation (min 5 characters)
      if (!address || address.length < 5) {
        this.showInputError(addressInput, "Street address is required (minimum 5 characters)");
        hasError = true;
      }

      // 5. City validation (no numbers, min 2 letters)
      if (!city) {
        this.showInputError(cityInput, "City is required");
        hasError = true;
      } else if (/\d/.test(city)) {
        this.showInputError(cityInput, "City cannot contain numbers");
        hasError = true;
      } else if ((city.match(/[a-zA-Z]/g) || []).length < 2) {
        this.showInputError(cityInput, "City must contain at least 2 letters");
        hasError = true;
      } else if (!this.isValidPlace(city)) {
        this.showInputError(cityInput, "Please enter a valid city name (letters only)");
        hasError = true;
      }

      // 6. State validation (no numbers, min 2 letters)
      if (!state) {
        this.showInputError(stateInput, "State is required");
        hasError = true;
      } else if (/\d/.test(state)) {
        this.showInputError(stateInput, "State cannot contain numbers");
        hasError = true;
      } else if ((state.match(/[a-zA-Z]/g) || []).length < 2) {
        this.showInputError(stateInput, "State must contain at least 2 letters");
        hasError = true;
      } else if (!this.isValidPlace(state)) {
        this.showInputError(stateInput, "Please enter a valid state name (letters only)");
        hasError = true;
      }

      // 7. PIN Code validation (no letters, exactly 6 digits)
      if (!pincode) {
        this.showInputError(pincodeInput, "PIN Code is required");
        hasError = true;
      } else if (/[a-zA-Z]/.test(pincode)) {
        this.showInputError(pincodeInput, "PIN code cannot contain letters");
        hasError = true;
      } else if (pincode.length !== 6 || !this.isValidPincode(pincode)) {
        this.showInputError(pincodeInput, "Valid 6-digit PIN code required");
        hasError = true;
      }

      if (hasError) {
        if (window.showToast) window.showToast("Please correct the highlighted fields.", "error");
        return;
      }

      const totals = window.CartManager?.getTotals() || {};
      const orderId = 'TH-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);

      // Render demo order confirmation
      this.showOrderConfirmationModal({
        orderId,
        customer: { name, email, phone, address, city, state, pincode, orderNotes },
        paymentMethod,
        items: [...cart],
        totals
      });

      // Clear cart
      window.CartManager?.clearCart();
    });
  },

  showOrderConfirmationModal(order) {
    let modal = document.getElementById('order-confirmation-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'order-confirmation-modal';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto';
      document.body.appendChild(modal);
    }

    const itemsHtml = order.items.map(item => `
      <div class="flex items-center justify-between py-2 border-b border-[var(--color-border)] text-xs sm:text-sm">
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded object-cover border border-[var(--color-border)]">
          <div>
            <div class="font-bold truncate max-w-[200px] sm:max-w-[260px]">${item.name}</div>
            <div class="text-gray-500">Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div class="font-bold">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
      </div>
    `).join('');

    modal.innerHTML = `
      <div class="bg-[var(--color-cream-card)] text-[var(--color-text-main)] w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-[var(--color-border)] my-8">
        <div class="text-center mb-6">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#D77A3C]">Order Confirmed</span>
          <h2 class="text-2xl sm:text-3xl font-black font-display mt-1">Adventure Awaits!</h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-1">Order ID: <strong class="text-[var(--color-text-main)] font-mono">${order.orderId}</strong></p>
        </div>

        <div class="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-[var(--color-border)] mb-4 text-xs sm:text-sm space-y-1.5">
          <div class="flex justify-between"><span class="text-gray-500">Recipient:</span> <strong>${order.customer.name}</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Email:</span> <strong>${order.customer.email}</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Shipping To:</span> <strong class="text-right">${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Payment Simulation:</span> <strong>${order.paymentMethod} (Demo Paid)</strong></div>
          <div class="flex justify-between"><span class="text-gray-500">Dispatched From:</span> <strong>Chennai Fulfillment Hub, Tamil Nadu</strong></div>
        </div>

        <div class="border border-[var(--color-border)] rounded-xl p-4 mb-4">
          <h4 class="font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">Itemized Summary</h4>
          <div class="max-h-48 overflow-y-auto divide-y divide-[var(--color-border)]">
            ${itemsHtml}
          </div>
          <div class="pt-3 mt-2 border-t border-[var(--color-border)] space-y-1 text-xs">
            <div class="flex justify-between text-gray-500"><span>Subtotal:</span> <span>₹${order.totals.subtotal?.toLocaleString('en-IN')}</span></div>
            ${order.totals.discount > 0 ? `<div class="flex justify-between text-emerald-600 font-bold"><span>Discount:</span> <span>-₹${order.totals.discount?.toLocaleString('en-IN')}</span></div>` : ''}
            <div class="flex justify-between text-gray-500"><span>Shipping:</span> <span>${order.totals.shipping === 0 ? 'FREE' : '₹' + order.totals.shipping}</span></div>
            <div class="flex justify-between text-base font-black pt-2 border-t border-[var(--color-border)]">
              <span>Total Paid:</span>
              <span class="text-[#D77A3C]">₹${order.totals.total?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- Demonstration Notice Banner -->
        <div class="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 mb-6 flex items-start gap-2.5">
          <i class="fa-solid fa-triangle-exclamation mt-0.5 text-base text-amber-500"></i>
          <div>
            <strong>Interactive Prototype Demo:</strong> This is a simulation for testing. No real monetary transactions or financial data were processed. Real e-commerce operations require a secure backend API with PCI-DSS compliant payment gateways (e.g. Razorpay, Stripe).
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <a href="products.html" class="flex-1 btn-secondary justify-center text-center">
            Continue Shopping
          </a>
          <button onclick="window.print()" class="btn-outline justify-center">
            <i class="fa-solid fa-print"></i> Print Receipt
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  },

  // Validation Helpers
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    if (/\d/.test(trimmed)) return false; // No numbers allowed
    const letters = (trimmed.match(/[a-zA-Z]/g) || []).length;
    if (letters < 2) return false; // Minimum 2 letters required
    return /^[a-zA-Z\s.'-]+$/.test(trimmed);
  },

  isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const trimmed = phone.trim();
    if (/[a-zA-Z]/.test(trimmed)) return false; // No letters allowed
    const digits = trimmed.replace(/\D/g, '');
    return digits.length === 10 || (digits.length > 10 && digits.length <= 12);
  },

  isValidPlace(place) {
    if (!place || typeof place !== 'string') return false;
    const trimmed = place.trim();
    if (/\d/.test(trimmed)) return false; // No numbers allowed
    const letters = (trimmed.match(/[a-zA-Z]/g) || []).length;
    if (letters < 2) return false; // Minimum 2 letters required
    return /^[a-zA-Z\s.'-]+$/.test(trimmed);
  },

  isValidPincode(pincode) {
    if (!pincode || typeof pincode !== 'string') return false;
    const trimmed = pincode.trim();
    if (/[a-zA-Z]/.test(trimmed)) return false; // No letters allowed
    return /^[1-9][0-9]{5}$/.test(trimmed); // Exactly 6 digits
  }
};

document.addEventListener('DOMContentLoaded', () => {
  FormsManager.init();
});
window.FormsManager = FormsManager;
