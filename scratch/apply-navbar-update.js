const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const searchIdx = content.indexOf('open-search-btn');
  if (searchIdx === -1) {
    console.log(`Skipping ${f} (no search btn)`);
    return;
  }
  
  const divStart = content.lastIndexOf('<div class="flex items-center', searchIdx);
  const mobileToggleIdx = content.indexOf('mobile-menu-toggle', searchIdx);
  const divEnd = content.indexOf('</div>', mobileToggleIdx) + 6;
  
  if (divStart === -1 || mobileToggleIdx === -1) {
    console.error(`Could not locate boundaries in ${f}`);
    return;
  }

  const isWishlistPage = (f === 'wishlist.html');
  const isOrderPage = (f === 'order.html');

  const wishlistClass = `relative w-9 h-9 inline-flex items-center justify-center rounded-lg hover:bg-[#E8DECF]/50 dark:hover:bg-[#2D372F]/50 transition${isWishlistPage ? ' text-orange' : ''}`;
  const wishlistIcon = isWishlistPage 
    ? 'fa-solid fa-heart text-rose-500 text-base' 
    : 'fa-regular fa-heart text-forest dark:text-sand text-base';

  const orderClass = `relative w-9 h-9 inline-flex items-center justify-center rounded-lg hover:bg-[#E8DECF]/50 dark:hover:bg-[#2D372F]/50 transition${isOrderPage ? ' text-orange' : ''}`;

  const newMarkup = 
`        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Search Button -->
          <button class="open-search-btn w-9 h-9 inline-flex items-center justify-center rounded-lg hover:bg-[#E8DECF]/50 dark:hover:bg-[#2D372F]/50 transition" aria-label="Search TrailHaven">
            <i class="fa-solid fa-magnifying-glass text-forest dark:text-sand text-base"></i>
          </button>

          <!-- Theme Toggle Button -->
          <button class="theme-toggle-btn w-9 h-9 inline-flex items-center justify-center rounded-lg hover:bg-[#E8DECF]/50 dark:hover:bg-[#2D372F]/50 transition" aria-label="Switch theme mode">
            <i class="fa-solid fa-sun text-amber-400 text-base theme-icon-sun hidden"></i>
            <i class="fa-solid fa-moon text-forest dark:text-sand text-base theme-icon-moon"></i>
          </button>

          <!-- Direction (RTL / LTR) Toggle -->
          <button class="dir-toggle-btn h-9 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-sand hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold transition" aria-label="Toggle text direction">
            <i class="fa-solid fa-right-left text-[11px] dir-arrow-icon text-forest dark:text-sand"></i>
            <span class="dir-label text-forest dark:text-sand leading-none">RTL</span>
          </button>

          <!-- Wishlist Icon -->
          <a href="wishlist.html" class="${wishlistClass}" aria-label="Wishlist">
            <i class="${wishlistIcon}"></i>
            <span class="wishlist-count-badge hidden absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </a>

          <!-- Cart / Order Icon -->
          <a href="order.html" class="${orderClass}" aria-label="Cart and Order">
            <i class="fa-solid fa-cart-shopping text-forest dark:text-sand text-base"></i>
            <span class="cart-count-badge hidden absolute -top-1 -right-1 bg-orange text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </a>

          <!-- Mobile Hamburger Menu Button -->
          <button id="mobile-menu-toggle" class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-lg hover:bg-[#E8DECF]/50 dark:hover:bg-[#2D372F]/50 transition" aria-label="Toggle Mobile Menu" aria-expanded="false">
            <i class="fa-solid fa-bars text-xl text-forest dark:text-cream"></i>
          </button>
        </div>`;

  const updatedContent = content.slice(0, divStart) + newMarkup + content.slice(divEnd);
  fs.writeFileSync(f, updatedContent, 'utf8');
  console.log(`Updated ${f}`);
});
