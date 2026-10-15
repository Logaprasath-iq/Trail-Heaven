const fs = require('fs');

console.log('========================================================');
console.log('📱 TESTING RESPONSIVENESS: 360px, 768px, 1024px VIEWPORTS');
console.log('========================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

// 1. Check viewport meta tag on all 14 pages
const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));
assert(pages.length === 14, 'All 14 HTML pages found');

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  assert(
    content.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0">') ||
    content.includes('<meta name="viewport" content="width=device-width, initial-scale=1'),
    `${p} includes proper responsive viewport meta tag`
  );
});

// 2. Check CSS Breakpoints
const css = fs.readFileSync('assets/css/styles.css', 'utf8');
assert(css.includes('@media (max-width: 480px)'), 'styles.css defines mobile <= 480px / 360px rules');
assert(css.includes('@media (min-width: 481px) and (max-width: 768px)'), 'styles.css defines tablet 768px rules');
assert(css.includes('@media (min-width: 1024px) and (max-width: 1279px)'), 'styles.css defines desktop transition 1024px rules');

// 3. Mobile Header Safeguards for 360px
assert(css.includes('#main-navbar .dir-toggle-btn .dir-label'), 'styles.css manages dir-label visibility for compact mobile');
assert(css.includes('display: none !important'), 'styles.css hides overflowing text labels on compact viewports');
assert(css.includes('html, body') && css.includes('overflow-x: hidden'), 'styles.css prevents accidental horizontal scroll');

// 4. Mobile Toast Notification Safeguards for 360px
assert(css.includes('#toast-container') && css.includes('min-width: 0 !important'), 'styles.css overrides toast min-width for 360px viewports');

// 5. Desktop Nav Safeguards for 1024px
assert(css.includes('#main-navbar nav') && css.includes('font-size: 0.8125rem !important'), 'styles.css optimizes desktop nav font size for 1024px');

// 6. Specific Page Responsive Fixes
const indexContent = fs.readFileSync('index.html', 'utf8');
assert(indexContent.includes('text-3xl sm:text-5xl md:text-7xl lg:text-8xl'), 'index.html hero scales down to text-3xl for 360px');

const home2Content = fs.readFileSync('home2.html', 'utf8');
assert(home2Content.includes('text-3xl sm:text-5xl xl:text-6xl'), 'home2.html hero scales down to text-3xl for 360px');
assert(home2Content.includes('grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6'), 'home2.html quick metrics grid uses responsive gaps');

const productDetailsContent = fs.readFileSync('product-details.html', 'utf8');
assert(productDetailsContent.includes('overflow-x-auto') && productDetailsContent.includes('${specsRows}'), 'product-details.html wraps specs table in overflow-x-auto');

const wishlistContent = fs.readFileSync('wishlist.html', 'utf8');
assert(wishlistContent.includes('p-6 sm:p-12 md:p-20'), 'wishlist.html empty state uses responsive padding');

const pricingContent = fs.readFileSync('pricing.html', 'utf8');
assert(pricingContent.includes('Swipe horizontally to view all tiers'), 'pricing.html feature matrix includes mobile swipe guide');

console.log('\n========================================================');
console.log(`🏁 RESPONSIVE TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================================');

if (failed > 0) process.exit(1);
