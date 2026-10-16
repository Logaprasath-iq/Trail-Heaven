const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const searchIdx = content.indexOf('open-search-btn');
  const divStart = content.lastIndexOf('<div class="flex items-center', searchIdx);
  const divEnd = content.indexOf('</div>', content.indexOf('mobile-menu-toggle', searchIdx)) + 6;
  const chunk = content.slice(divStart, divEnd);
  
  const searchBtn = chunk.match(/<button class="open-search-btn[^>]*>/)?.[0];
  const themeBtn = chunk.match(/<button class="theme-toggle-btn[^>]*>/)?.[0];
  const dirBtn = chunk.match(/<button class="dir-toggle-btn[^>]*>/)?.[0];
  const wishlistA = chunk.match(/<a href="wishlist\.html"[^>]*>/)?.[0];
  const orderA = chunk.match(/<a href="order\.html"[^>]*>/)?.[0];
  const menuBtn = chunk.match(/<button id="mobile-menu-toggle"[^>]*>/)?.[0];

  console.log(f, {
    search: searchBtn,
    theme: themeBtn,
    dir: dirBtn,
    wishlist: wishlistA,
    order: orderA,
    menu: menuBtn
  });
});
