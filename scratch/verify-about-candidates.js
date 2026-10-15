const fs = require('fs');
const files = ['assets/js/data.js', 'about.html', 'buying-guides.html', 'guide-details.html', 'products.html', 'index.html', 'home2.html', 'gallery.html', 'pricing.html', 'blog.html', 'blog-details.html', 'contact.html', 'order.html', 'wishlist.html'];

const candidates = [
  'photo-1483921020237-2ff51e8e4b22', // Down
  'photo-1584824486509-112e4181ff6b', // Titanium
  'photo-1607344645866-009c320c5ab8', // Cordura
  'photo-1504851149312-7a075b496cc7', // DAC Poles
  'photo-1581092160607-ee22621dd758', // Stress lab
  'photo-1521737604893-d14cc237f11d'  // Chennai atelier / collaboration
];

candidates.forEach(id => {
  let found = false;
  files.forEach(f => {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes(id)) {
        found = true;
        console.log(`[IN USE] ${id} in ${f}`);
      }
    }
  });
  if (!found) {
    console.log(`[100% UNIQUE] ${id}`);
  }
});
