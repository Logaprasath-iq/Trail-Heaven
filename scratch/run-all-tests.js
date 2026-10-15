const fs = require('fs');
const path = require('path');

const root = process.cwd();
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('====================================================');
console.log('🧪 RUNNING TRAILHAVEN FULL QUALITY & INTEGRITY SUITE');
console.log('====================================================\n');

// 1. DATA INTEGRITY
console.log('--- 1. DATA.JS INTEGRITY ---');
const data = require(path.join(root, 'assets/js/data.js'));
assert(data.categories.length === 10, `Categories count is 10 (actual: ${data.categories.length})`);
assert(data.products.length === 16, `Products count is 16 (actual: ${data.products.length})`);
assert(data.bundles.length === 4, `Bundles count is 4 (actual: ${data.bundles.length})`);
assert(data.guides.length === 9, `Guides count is 9 (actual: ${data.guides.length})`);
assert(data.blogs.length === 10, `Blogs count is 10 (actual: ${data.blogs.length})`);
assert(data.gallery.length === 16, `Gallery count is 16 (actual: ${data.gallery.length})`);

// 2. HTML FILES EXISTENCE & STRUCTURE
console.log('\n--- 2. HTML FILES STRUCTURE ---');
const expectedPages = [
  'index.html', 'home2.html', 'about.html', 'products.html', 'product-details.html',
  'buying-guides.html', 'guide-details.html', 'gallery.html', 'pricing.html',
  'blog.html', 'blog-details.html', 'contact.html', 'order.html', 'wishlist.html'
];
assert(expectedPages.length === 14, '14 expected pages configured');

expectedPages.forEach(file => {
  const filePath = path.join(root, file);
  assert(fs.existsSync(filePath), `${file} exists on disk`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    assert(content.includes('<!DOCTYPE html>'), `${file} has <!DOCTYPE html>`);
    assert(content.includes('assets/css/styles.css'), `${file} links to styles.css`);
    assert(content.includes('assets/js/main.js'), `${file} links to main.js`);
  }
});

// 3. IMAGE UNIQUENESS ACROSS PAGES
console.log('\n--- 3. PER-PAGE IMAGE UNIQUENESS ---');
expectedPages.forEach(file => {
  const filePath = path.join(root, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /https:\/\/images\.unsplash\.com\/([^?\"']+)/g;
    let m;
    const urls = [];
    while ((m = regex.exec(content)) !== null) {
      urls.push(m[1]);
    }
    const counts = {};
    urls.forEach(id => counts[id] = (counts[id] || 0) + 1);
    const dupes = Object.entries(counts).filter(([_, c]) => c > 1);
    assert(dupes.length === 0, `${file}: 0 duplicate Unsplash images (found ${urls.length} images)`);
  }
});

// 4. ANIMATION SCRIPTS & HOOKS
console.log('\n--- 4. ANIMATION ENGINE & INTERACTION HOOKS ---');
const mainJs = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');

assert(mainJs.includes('initCardTilt'), 'main.js defines initCardTilt 3D perspective rotation');
assert(mainJs.includes('initCounters'), 'main.js defines initCounters rolling intersection observer');
assert(mainJs.includes('initParallax'), 'main.js defines initParallax subtle scroll parallax');
assert(mainJs.includes('initScrollProgressBar'), 'main.js defines real-time top scroll progress bar');
assert(mainJs.includes('initScrollReveal'), 'main.js defines scroll reveal observer');

assert(stylesCss.includes('#scroll-progress-bar'), 'styles.css defines #scroll-progress-bar styling');
assert(stylesCss.includes('preserve-3d'), 'styles.css defines preserve-3d card tilt styling');
assert(stylesCss.includes('.stat-counter-number'), 'styles.css defines .stat-counter-number font variant');
assert(stylesCss.includes('.timeline-dot'), 'styles.css defines .timeline-dot pulsing animation');

// 5. INTERNAL LINK VALIDITY
console.log('\n--- 5. INTERNAL PAGE LINKS VALIDITY ---');
let brokenLinks = 0;
expectedPages.forEach(file => {
  const filePath = path.join(root, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hrefRegex = /href="([^"#?]+(?:\.html))"/g;
    let hm;
    while ((hm = hrefRegex.exec(content)) !== null) {
      const target = hm[1];
      if (!fs.existsSync(path.join(root, target))) {
        console.error(`Broken link in ${file}: target ${target} not found!`);
        brokenLinks++;
      }
    }
  }
});
assert(brokenLinks === 0, `All internal .html links point to valid files (broken: ${brokenLinks})`);

// 6. BRAND FOOTER & SOCIAL ICONS ACCURACY
console.log('\n--- 6. FOOTER SOCIAL ICONS STYLING ---');
['index.html', 'home2.html', 'about.html', 'buying-guides.html', 'gallery.html', 'blog.html', 'pricing.html'].forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  assert(content.includes('#25D366'), `${file} footer includes WhatsApp brand color #25D366`);
  assert(content.includes('#1877F2'), `${file} footer includes Facebook brand color #1877F2`);
  assert(content.includes('#E4405F'), `${file} footer includes Instagram brand color #E4405F`);
});

// 7. USER FIXES: BUTTON CSS, BACK-TO-TOP ARROW REMOVED, THEME TOAST REMOVED
console.log('\n--- 7. USER FIXES (BUTTON CSS, ARROW SCROLL, SWITCH TOAST) ---');
const themeJs = fs.readFileSync(path.join(root, 'assets/js/theme.js'), 'utf8');
assert(!themeJs.includes('Switched to'), 'theme.js does not contain "Switched to" toast notification');

const mainJsFix = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');
assert(!mainJsFix.includes("btn.id = 'back-to-top'"), 'main.js does not create back-to-top floating button');

const stylesCssFix = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
assert(stylesCssFix.includes('display: none !important'), 'styles.css hides #back-to-top with display: none !important');
assert(stylesCssFix.includes('#place-order-btn,'), 'styles.css includes high-contrast, prominent #place-order-btn styling');

const orderHtml = fs.readFileSync(path.join(root, 'order.html'), 'utf8');
assert(!orderHtml.includes("placeOrderBtn.classList.add('opacity-50'"), 'order.html does not dim placeOrderBtn with opacity-50');

// 8. PRODUCT DETAILS 3-THUMBNAIL GALLERY INTEGRITY
console.log('\n--- 8. PRODUCT DETAILS 3-THUMBNAIL GALLERIES ---');
data.products.forEach((p, idx) => {
  const g = p.gallery || [];
  assert(g.length === 3, `Product ${idx + 1} (${p.name}) has exactly 3 gallery images`);
  assert(p.image === g[0], `Product ${idx + 1} primary image matches gallery[0]`);
  assert(new Set(g).size === 3, `Product ${idx + 1} gallery has 3 unique images`);
});


console.log('\n====================================================');
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) process.exit(1);

