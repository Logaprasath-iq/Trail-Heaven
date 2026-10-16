const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/<header[\s\S]*?<\/header>/);
  if (m) {
    const hasSearch = m[0].includes('open-search-btn');
    const hasTheme = m[0].includes('theme-toggle-btn');
    const hasDir = m[0].includes('dir-toggle-btn');
    const hasWishlist = m[0].includes('wishlist.html');
    const hasCart = m[0].includes('order.html');
    console.log(f, { hasSearch, hasTheme, hasDir, hasWishlist, hasCart });
  }
});
