const fs = require('fs');
const path = require('path');
const TrailHavenData = require('../assets/js/data.js');

console.log('========================================================');
console.log('🧪 TESTING PRODUCT DETAILS 3-THUMBNAIL GALLERY FIX');
console.log('========================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// 1. Check all 16 products in TrailHavenData.products
assert(TrailHavenData.products.length === 16, 'Exactly 16 products exist in TrailHavenData');

TrailHavenData.products.forEach((product, idx) => {
  const gallery = product.gallery || [];
  assert(gallery.length === 3, `Product ${idx + 1} (${product.name}) has exactly 3 gallery images`);
  assert(product.image === gallery[0], `Product ${idx + 1} primary image matches gallery[0]`);
  assert(new Set(gallery).size === 3, `Product ${idx + 1} gallery has 3 unique images (no self-duplicates)`);
});

// 2. Simulate product-details.html rendering logic
TrailHavenData.products.forEach(product => {
  const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.image];
  const renderedThumbs = galleryImages.map((imgUrl, idx) => `
    <button class="gallery-thumb-btn w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${idx === 0 ? 'border-orange shadow-md' : 'border-transparent opacity-75 hover:opacity-100'}" data-thumb-src="${imgUrl}">
      <img src="${imgUrl}" alt="${product.name} thumb ${idx + 1}" class="w-full h-full object-cover">
    </button>
  `).join('');

  const thumbButtonCount = (renderedThumbs.match(/gallery-thumb-btn/g) || []).length;
  assert(thumbButtonCount === 3, `Rendered gallery markup for "${product.name}" produces exactly 3 thumbnail buttons`);
});

console.log(`\n========================================================`);
console.log(`🏁 TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================================`);

if (failCount > 0) process.exit(1);
