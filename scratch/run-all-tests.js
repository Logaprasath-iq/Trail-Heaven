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


// 9. BUTTON & CARD HOVER STABILITY
console.log('\n--- 9. BUTTON & CARD HOVER STABILITY ---');
const outlineHoverRegex = /\.btn-outline:hover\s*\{([^}]+)\}/g;
let matchOutline;
let hasTransformInOutlineHover = false;
while ((matchOutline = outlineHoverRegex.exec(stylesCssFix)) !== null) {
  if (matchOutline[1].includes('translateY')) {
    hasTransformInOutlineHover = true;
  }
}
assert(!hasTransformInOutlineHover, '.btn-outline:hover must not use translateY displacement');
assert(stylesCssFix.includes('.card-theme .btn-outline'), 'styles.css defines .card-theme .btn-outline stability rules');
assert(stylesCssFix.includes('transform: none !important;'), 'Card buttons enforce transform: none !important');
assert(!stylesCssFix.includes('scale(1.008)'), 'styles.css must not use fractional scale(1.008) on card hover');
assert(stylesCssFix.includes('#C6AD83') && stylesCssFix.includes('#1A2B20'), 'Dark mode .btn-outline:hover preserves brand styling');
assert(!stylesCssFix.includes('animation: scaleUpIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;'), 'card-animate-in does not lock with both');

// 10. PRODUCT DETAILS FREQUENTLY PAIRED TOGETHER INTEGRITY
console.log('\n--- 10. PRODUCT DETAILS FREQUENTLY PAIRED TOGETHER ---');
const prodDetailsHtml = fs.readFileSync(path.join(root, 'product-details.html'), 'utf8');
assert(prodDetailsHtml.includes('defaultPairings = {'), 'product-details.html includes curated defaultPairings mapping');

data.products.forEach((p, idx) => {
  const paired = p.pairedWith || [];
  assert(paired.length === 2, `Product ${idx + 1} (${p.name}) has exactly 2 pairedWith IDs in data.js`);
  assert(!paired.includes(p.id), `Product ${idx + 1} (${p.name}) must not be paired with itself`);
  paired.forEach(pid => {
    assert(data.products.some(x => x.id === pid), `Paired ID ${pid} for product ${p.name} must exist in data.products`);
  });
});

// 11. PRODUCT DETAILS 4 VERIFIED REVIEWS ALIGNMENT
console.log('\n--- 11. PRODUCT DETAILS 4 VERIFIED REVIEWS ALIGNMENT ---');
assert(prodDetailsHtml.includes('Karan Malhotra'), 'Reviews contain Karan Malhotra');
assert(prodDetailsHtml.includes('Priya Natesan'), 'Reviews contain Priya Natesan');
assert(prodDetailsHtml.includes('Vikram Sen'), 'Reviews contain Vikram Sen');
assert(prodDetailsHtml.includes('Sneha Kulkarni'), 'Reviews contain Sneha Kulkarni');

// 12. BLOG & GUIDE IMAGE SYNCHRONIZATION (OUTSIDE CARDS VS INSIDE DETAILS)
console.log('\n--- 12. OUTSIDE VS INSIDE IMAGE SYNCHRONIZATION ---');
const blogHtml = fs.readFileSync(path.join(root, 'blog.html'), 'utf8');
const buyingGuidesHtml = fs.readFileSync(path.join(root, 'buying-guides.html'), 'utf8');

data.blogs.forEach(blog => {
  // Check if blog.html includes this blog's image
  assert(blogHtml.includes(blog.image), `blog.html contains matching outside image for blog "${blog.title}"`);
});

data.guides.forEach(guide => {
  // Check if buying-guides.html includes this guide's image
  assert(buyingGuidesHtml.includes(guide.image), `buying-guides.html contains matching outside image for guide "${guide.title}"`);
});

// 13. BLOG CARD WORD ALIGNMENT & CONSISTENT ROW HEIGHTS
console.log('\n--- 13. BLOG CARD WORD & CONTENT ALIGNMENT ---');
assert(blogHtml.includes('min-h-[3.5rem] line-clamp-2'), 'blog.html enforces min-h-[3.5rem] title constraints for row alignment');
assert(blogHtml.includes('min-h-[3rem] leading-normal'), 'blog.html enforces min-h-[3rem] description paragraph constraints');
assert(!blogHtml.includes('min-h-[2.5rem]'), 'blog.html must not use broken min-h-[2.5rem] that slices text in half');
assert(!blogHtml.includes('flex items-center line-clamp-2'), 'blog.html must not combine flex items-center with line-clamp');
assert(blogHtml.includes('p-6 flex-1 flex flex-col justify-between'), 'blog.html flex-1 flex-col distributes card body height evenly');
assert(blogHtml.includes('pt-4 mt-4 border-t border-[#E2DACB] dark:border-[#2D372F]'), 'blog.html anchors Read More button at unified row baseline with border');

// 14. CARD VIBRATION & DATA-TILT ELIMINATION
console.log('\n--- 14. CARD VIBRATION & TILT STABILITY ---');
let totalTiltAttrs = 0;
expectedPages.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const count = (content.match(/data-tilt/g) || []).length;
  totalTiltAttrs += count;
});
assert(totalTiltAttrs === 0, `All 14 pages have 0 data-tilt attributes (found: ${totalTiltAttrs})`);
assert(stylesCssFix.includes('transform: translateZ(0);'), 'styles.css applies transform: translateZ(0) to .card-theme for GPU layer stability');

// 15. ZERO BOUNDARY-DISPLACEMENT HOVER VIBRATION (ALL OVER WEBSITE)
console.log('\n--- 15. ZERO BOUNDARY-DISPLACEMENT HOVER VIBRATION ---');
const freshStylesCss = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
assert(!freshStylesCss.includes('translateY(-4px)'), '.card-theme:hover must not use translateY(-4px)');
assert(!freshStylesCss.includes('translateY(-5px)'), '.card-theme:hover must not use translateY(-5px)');
assert(!freshStylesCss.includes('.btn-primary:hover {\n  background-color: #BF652A;\n  transform: translateY(-2px);'), '.btn-primary:hover must not use translateY(-2px)');
assert(!freshStylesCss.includes('.btn-secondary:hover {\n  background-color: #1A2B20;\n  transform: translateY(-2px);'), '.btn-secondary:hover must not use translateY(-2px)');
assert(!freshStylesCss.includes('.cat-pill:hover {\n  transform: translateY(-2px);'), '.cat-pill:hover must not use translateY(-2px)');

let totalAnchorTranslateClasses = 0;
expectedPages.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const matches = content.match(/<a[^>]+group-hover:translate-x[^>]*>/g) || [];
  totalAnchorTranslateClasses += matches.length;
});
assert(totalAnchorTranslateClasses === 0, `All anchor tags must not displace their own hitboxes with group-hover:translate-x (found: ${totalAnchorTranslateClasses})`);

// 16. TELEMETRY & STAT COUNTERS INTEGRITY (NON-ZERO INITIALIZATION)
console.log('\n--- 16. TELEMETRY & STAT COUNTERS INTEGRITY ---');
const freshBlogHtml = fs.readFileSync(path.join(root, 'blog.html'), 'utf8');
const freshIndexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(freshBlogHtml.includes('5,319m'), 'blog.html stats display 5,319m');
assert(freshBlogHtml.includes('110 km'), 'blog.html stats display 110 km');
assert(freshBlogHtml.includes('11 Days'), 'blog.html stats display 11 Days');
assert(freshBlogHtml.includes('-15°C'), 'blog.html stats display -15°C');
assert(freshIndexHtml.includes('85 km/h'), 'index.html displays 85 km/h');
assert(freshIndexHtml.includes('-25°C'), 'index.html displays -25°C');
assert(freshIndexHtml.includes('28,000 mm'), 'index.html displays 28,000 mm');
assert(freshIndexHtml.includes('100,000+'), 'index.html displays 100,000+');
assert(mainJs.includes('[data-counter], [data-target]'), 'main.js initCounters supports both data-counter and data-target');

// 17. NAVBAR CONTROLS UNIFORM HEIGHT & ALIGNMENT
console.log('\n--- 17. NAVBAR CONTROLS UNIFORM HEIGHT & ALIGNMENT ---');
const updatedStylesCss = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
assert(updatedStylesCss.includes('height: 2.25rem !important;'), 'styles.css defines uniform 2.25rem (36px) height for navbar controls');
assert(updatedStylesCss.includes('NAVBAR UTILITY CONTROLS - UNIFORM 36PX HEIGHT'), 'styles.css has dedicated uniform navbar utility controls section');
assert(updatedStylesCss.includes('@media (min-width: 1024px) {\n  #main-navbar #mobile-menu-toggle,\n  #mobile-menu-toggle {\n    display: none !important;'), 'styles.css strictly hides hamburger menu in desktop display mode (>= 1024px)');

expectedPages.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  assert(content.includes('class="open-search-btn w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} search button uses w-9 h-9 inline-flex uniform sizing`);
  assert(content.includes('class="theme-toggle-btn w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} theme toggle uses w-9 h-9 inline-flex uniform sizing`);
  assert(content.includes('class="dir-toggle-btn h-9 px-2.5 inline-flex items-center justify-center'), `${file} dir toggle uses h-9 px-2.5 inline-flex uniform sizing`);
  assert(content.includes('href="wishlist.html" class="relative w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} wishlist link uses w-9 h-9 inline-flex uniform sizing`);
  assert(content.includes('href="order.html" class="relative w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} order link uses w-9 h-9 inline-flex uniform sizing`);
  assert(content.includes('id="mobile-menu-toggle" class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} mobile toggle uses w-9 h-9 inline-flex uniform sizing`);
  assert(!content.includes('class="dir-toggle-btn px-2.5 py-1 rounded-lg text-xs font-bold border border-sand'), `${file} must not use old unequal py-1 dir button`);
});

// 18. HOME 2 INSIDE CARD ALIGNMENT
console.log('\n--- 18. HOME 2 INSIDE CARD ALIGNMENT ---');
const freshHome2 = fs.readFileSync(path.join(root, 'home2.html'), 'utf8');

// Guided Expeditions Cards
assert(freshHome2.includes('h3 class="text-xl font-bold text-white mb-2 min-h-[3.5rem] leading-snug">Kudremukh Mist Ridge Traverse</h3>'), 'home2.html Kudremukh card title enforces min-h-[3.5rem]');
assert(freshHome2.includes('h3 class="text-xl font-bold text-white mb-2 min-h-[3.5rem] leading-snug">Kedarkantha Summit Bivouac</h3>'), 'home2.html Kedarkantha card title enforces min-h-[3.5rem]');
assert(freshHome2.includes('h3 class="text-xl font-bold text-white mb-2 min-h-[3.5rem] leading-snug">Nilgiris Field Maintenance Clinic</h3>'), 'home2.html Nilgiris card title enforces min-h-[3.5rem]');
assert(freshHome2.includes('p class="text-xs text-gray-300 leading-relaxed mb-4 min-h-[3.75rem]"'), 'home2.html expedition cards enforce min-h-[3.75rem] description');
assert(freshHome2.includes('class="mt-auto flex items-center gap-2 text-xs text-sand pt-3 border-t border-sand/20"'), 'home2.html expedition location row uses mt-auto for bottom baseline alignment');

// Featured Products Cards
assert(freshHome2.includes('min-h-[3.25rem] leading-snug flex items-center">\n                  <a href="product-details.html?id=wear-storm-shell">'), 'home2.html product jacket title uses min-h-[3.25rem]');
assert(freshHome2.includes('min-h-[3.25rem] leading-snug flex items-center">\n                  <a href="product-details.html?id=gear-carbon-poles">'), 'home2.html product poles title uses min-h-[3.25rem]');
assert(freshHome2.includes('min-h-[3.25rem] leading-snug flex items-center">\n                  <a href="product-details.html?id=filter-pureflow-4l">'), 'home2.html product filter title uses min-h-[3.25rem]');

// Gear Bundles Cards
assert(freshHome2.includes('Add Starter Bundle') && freshHome2.includes('Weatherproof Dry-Sack Pack</li>\n                <li class="flex items-center gap-2"><i class="fa-solid fa-check text-orange"></i> Free Express Shipping Pan-India'), 'home2.html Starter bundle has 5 items matching other bundles');

console.log('\n====================================================');
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) process.exit(1);




