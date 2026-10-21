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
assert(blogHtml.includes('min-h-[3.5rem] leading-relaxed'), 'blog.html enforces min-h-[3.5rem] description paragraph constraints');
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
  const navMatch = content.match(/<header id="main-navbar"[\s\S]*?<\/header>/);
  assert(navMatch, `${file} contains #main-navbar`);
  const navHtml = navMatch[0];
  assert(!navHtml.includes('class="open-search-btn w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} navbar correctly excludes search button as per feedback`);
  assert(navHtml.includes('class="theme-toggle-btn w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} theme toggle uses w-9 h-9 inline-flex uniform sizing`);
  assert(navHtml.includes('class="dir-toggle-btn h-9 px-2.5 inline-flex items-center justify-center'), `${file} dir toggle uses h-9 px-2.5 inline-flex uniform sizing`);
  assert(!navHtml.includes('href="wishlist.html" class="relative w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} navbar correctly excludes wishlist as per requirements`);
  assert(!navHtml.includes('href="order.html" class="relative w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} navbar correctly excludes cart/order as per requirements`);
  assert(navHtml.includes('id="mobile-menu-toggle" class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-lg'), `${file} mobile toggle uses w-9 h-9 inline-flex uniform sizing`);
  assert(!navHtml.includes('class="dir-toggle-btn px-2.5 py-1 rounded-lg text-xs font-bold border border-sand'), `${file} must not use old unequal py-1 dir button`);
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

// 19. BRAND SLOGAN SINGLE-LINE INTEGRITY (HEADER & FOOTER)
console.log('\n--- 19. BRAND SLOGAN SINGLE-LINE INTEGRITY ---');
const stylesCssSlogan = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
assert(stylesCssSlogan.includes('Brand Logo Slogan Single-Line Integrity'), 'styles.css includes brand slogan single-line integrity section');
assert(stylesCssSlogan.includes('white-space: nowrap !important;'), 'styles.css enforces white-space: nowrap on slogans');

expectedPages.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  assert(content.includes('text-[#F5F1E8] leading-none whitespace-nowrap'), `${file} footer slogan enforces whitespace-nowrap single-line`);
  assert(content.includes('leading-none whitespace-nowrap'), `${file} header slogan enforces whitespace-nowrap single-line`);
});

// 20. FAQ ACCORDION SEPARATION LINE
console.log('\n--- 20. FAQ ACCORDION SEPARATION LINE ---');
const stylesCssFaq = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
assert(stylesCssFaq.includes('/* FAQ Accordion Separation Line */'), 'styles.css includes FAQ Accordion Separation Line section');
assert(stylesCssFaq.includes('border-top: 1px solid #E2DACB;'), 'styles.css enforces border-top on FAQ answer');
assert(stylesCssFaq.includes('border-top-color: #2D372F;'), 'styles.css enforces dark mode border-top-color on FAQ answer');

const faqPages = ['contact.html', 'pricing.html', 'products.html'];
faqPages.forEach(file => {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const detailsBlocks = content.match(/<details[\s\S]*?<\/details>/g) || [];
  assert(detailsBlocks.length > 0, `${file} contains FAQ details blocks`);
  detailsBlocks.forEach((block, idx) => {
    assert(
      block.includes('border-t border-[#E2DACB] dark:border-[#2D372F]'),
      `${file} FAQ item #${idx + 1} contains separation line with border-t border-[#E2DACB] dark:border-[#2D372F]`
    );
  });
});

// 21. SPOTLIGHT & FEATURED CARDS EQUAL-HEIGHT ALIGNMENT
console.log('\n--- 21. SPOTLIGHT & FEATURED CARDS EQUAL-HEIGHT ALIGNMENT ---');
{
  const stylesCssEqual = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
  assert(stylesCssEqual.includes('/* Featured & Spotlight Card Equal-Height Alignment */'), 'styles.css includes Featured & Spotlight Card Equal-Height Alignment section');

  // blog.html Section 2 & 4
  const blogHtmlContent = fs.readFileSync(path.join(root, 'blog.html'), 'utf8');
  assert(blogHtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#F5F1E8]/50'), 'blog.html Section 2 featured card uses items-stretch');
  assert(blogHtmlContent.includes('lg:aspect-auto lg:h-full min-h-[260px]'), 'blog.html Section 2 image container uses lg:aspect-auto lg:h-full');
  assert(blogHtmlContent.includes('lg:col-span-6 flex flex-col justify-between py-1 space-y-4'), 'blog.html Section 2 content container uses flex-col justify-between');
  assert(blogHtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#F5F1E8]/40'), 'blog.html Section 4 card uses items-stretch');
  assert(blogHtmlContent.includes('lg:col-span-5') && blogHtmlContent.includes('lg:aspect-auto lg:h-full'), 'blog.html Section 4 image container uses lg:col-span-5 and lg:aspect-auto lg:h-full');
  assert(blogHtmlContent.includes('lg:absolute lg:inset-0'), 'blog.html Section 4 image uses lg:absolute lg:inset-0 for exact height alignment to content');
  assert(blogHtmlContent.includes('lg:col-span-7 flex flex-col justify-between py-1 space-y-4'), 'blog.html Section 4 content uses lg:col-span-7 flex-col justify-between');
  assert(blogHtmlContent.includes('Technical Expedition Specs') && blogHtmlContent.includes('Geodesic 4-Season'), 'blog.html Section 4 includes technical specs pills');
  assert(blogHtmlContent.includes('Mantalai Lake glacial moraine crossing'), 'blog.html Section 4 includes route challenges checklist for perfect height alignment');

  // buying-guides.html Section 5
  const buyingGuidesHtmlContent = fs.readFileSync(path.join(root, 'buying-guides.html'), 'utf8');
  assert(buyingGuidesHtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'), 'buying-guides.html Section 5 card uses items-stretch');
  assert(buyingGuidesHtmlContent.includes('lg:aspect-auto lg:h-full min-h-[260px]'), 'buying-guides.html Section 5 image container uses lg:aspect-auto lg:h-full');
  assert(buyingGuidesHtmlContent.includes('Waterproofing') && buyingGuidesHtmlContent.includes('Vibram Megagrip'), 'buying-guides.html Section 5 includes rich checklist highlights');

  // products.html Section 5
  const productsHtmlContent = fs.readFileSync(path.join(root, 'products.html'), 'utf8');
  assert(productsHtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch'), 'products.html Section 5 banner uses items-stretch');
  assert(productsHtmlContent.includes('lg:aspect-auto lg:h-full min-h-[260px]'), 'products.html Section 5 image container uses lg:aspect-auto lg:h-full');
  assert(productsHtmlContent.includes('Trail Weight') && productsHtmlContent.includes('Hydrostatic'), 'products.html Section 5 includes rich technical specs pills');

  // home2.html Section 1, 4 & 5
  const home2HtmlContent = fs.readFileSync(path.join(root, 'home2.html'), 'utf8');
  assert(home2HtmlContent.includes('<span class="block">Engineered For</span>') && home2HtmlContent.includes('<span class="block">The <span class="text-orange">Untamed.</span></span>') && home2HtmlContent.includes('<span class="block">Built To Endure.</span>'), 'home2.html Hero heading formatted into 3 balanced blocks eliminating orphan words');
  assert(home2HtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch'), 'home2.html Hero grid uses items-stretch');
  assert(home2HtmlContent.includes('lg:absolute lg:inset-0 rounded-3xl overflow-hidden shadow-2xl border-4'), 'home2.html Hero image uses lg:absolute lg:inset-0 for equal-height alignment');
  assert(home2HtmlContent.includes('left-1/2 -translate-x-1/2') && home2HtmlContent.includes('Most Popular'), 'home2.html Section 4 Most Popular badge is centered');
  assert(home2HtmlContent.includes('Our definitive expedition kit for 3-7 day rugged backcountry traverses.'), 'home2.html Section 4 Adventure Explorer description calibrated to 2 lines');
  assert(home2HtmlContent.includes('grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch'), 'home2.html Section 5 card uses items-stretch');
  assert(home2HtmlContent.includes('lg:aspect-auto lg:h-full min-h-[320px]'), 'home2.html Section 5 image container uses lg:aspect-auto lg:h-full');
  assert(home2HtmlContent.includes('<span class="block">Crafted in Chennai.</span>') && home2HtmlContent.includes('<span class="block">Built to Safeguard Wilderness.</span>'), 'home2.html Section 5 heading formatted in 2 balanced lines');

  // about.html Section 2, 4D, 4E
  const aboutHtmlContent = fs.readFileSync(path.join(root, 'about.html'), 'utf8');
  assert(aboutHtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch'), 'about.html Section 2 card uses items-stretch');
  assert(aboutHtmlContent.includes('lg:absolute lg:inset-0') && aboutHtmlContent.includes('TrailHaven expedition shelter in monsoon conditions'), 'about.html Section 2 uses a single image with lg:absolute lg:inset-0 for exact equal-height alignment');
  assert(aboutHtmlContent.includes('grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16'), 'about.html Section 4D card uses items-stretch');
  assert(aboutHtmlContent.includes('TrailHaven Stress Testing Laboratory') && aboutHtmlContent.includes('lg:absolute lg:inset-0'), 'about.html Section 4D image uses lg:absolute lg:inset-0 for exact equal-height alignment to content');
  assert(aboutHtmlContent.includes('Safety Multiplier') && aboutHtmlContent.includes('Stress Simulation') && aboutHtmlContent.includes('Moisture Seepage'), 'about.html Section 4D includes laboratory diagnostics specs pills');
  assert(aboutHtmlContent.includes('Our Mission') && aboutHtmlContent.includes('Bulletproof Gear') && aboutHtmlContent.includes('Wilderness Access'), 'about.html Section 3 Our Mission card formatted as 4-point list');
  assert(aboutHtmlContent.includes('Our Vision') && aboutHtmlContent.includes('Global Epicenter') && aboutHtmlContent.includes('Trail Stewardship'), 'about.html Section 3 Our Vision card formatted as 4-point list');
  assert(aboutHtmlContent.includes('Core Values') && aboutHtmlContent.includes('Integrity') && aboutHtmlContent.includes('Zero planned obsolescence with lifetime repair guarantees'), 'about.html Section 3 Core Values card calibrated for equal height');
  assert(aboutHtmlContent.includes('min-h-[2.75rem] flex items-start'), 'about.html Section 3 uses min-h-[2.75rem] for lockstep horizontal alignment across Mission, Vision & Core Values');

  // blog.html Section 2 rich content
  assert(blogHtmlContent.includes('Peak Altitude') && blogHtmlContent.includes('1,894m'), 'blog.html Section 2 includes route altitude metric');
  assert(blogHtmlContent.includes('Permit requirements and daily foot-traffic caps'), 'blog.html Section 2 includes key takeaways preview');
}

// SUITE 22: CARD DESCRIPTION 3-LINE UNIFORMITY & HEIGHT ALIGNMENT
console.log('\n--- SUITE 22: CARD DESCRIPTION 3-LINE UNIFORMITY & HEIGHT ALIGNMENT ---');
{
  const blogHtmlContent = fs.readFileSync(path.join(root, 'blog.html'), 'utf8');
  const buyingGuidesHtmlContent = fs.readFileSync(path.join(root, 'buying-guides.html'), 'utf8');
  const home2HtmlContent = fs.readFileSync(path.join(root, 'home2.html'), 'utf8');
  const indexHtmlContent = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const wishlistHtmlContent = fs.readFileSync(path.join(root, 'wishlist.html'), 'utf8');

  // blog.html Section 3 articles: all 9 must have min-h-[3.5rem] leading-relaxed line-clamp-3
  const blogSec3Matches = [...blogHtmlContent.matchAll(/<p[^>]*class="([^"]*line-clamp-3 min-h-\[3\.5rem\] leading-relaxed[^"]*)"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(blogSec3Matches.length === 9, `blog.html has 9 uniform 3-line articles in Section 3 (found ${blogSec3Matches.length})`);
  blogSec3Matches.forEach((m, idx) => {
    const textLen = m[2].trim().length;
    assert(textLen >= 130 && textLen <= 170, `blog.html article ${idx + 1} description length calibrated for 3 lines (len=${textLen})`);
  });

  // blog.html Section 4 Camping tips: 3 cards with min-h-[3.75rem] leading-relaxed
  assert(blogHtmlContent.includes('Monsoon Pack Liners') && blogHtmlContent.includes('min-h-[3.75rem] leading-relaxed'), 'blog.html Camping Tips has min-h-[3.75rem] on pack liners');
  assert(blogHtmlContent.includes('Winter Water Bottle Trick') && blogHtmlContent.includes('min-h-[3.75rem] leading-relaxed'), 'blog.html Camping Tips has min-h-[3.75rem] on water bottle');
  assert(blogHtmlContent.includes('LNT Campfire Rules') && blogHtmlContent.includes('delicate meadows completely pristine for local wildlife'), 'blog.html Camping Tips card 3 calibrated for 3 lines');

  // blog.html Section 5 Destinations: 2 cards with min-h-[3.75rem]
  assert(blogHtmlContent.includes('Kudremukh & The Shola Grasslands') && blogHtmlContent.includes('min-h-[3.75rem]'), 'blog.html Kudremukh has min-h-[3.75rem]');
  assert(blogHtmlContent.includes('Spiti Valley & Chandratal Lake') && blogHtmlContent.includes('Pristine dark skies offer jaw-dropping astrophotography opportunities on frozen shores'), 'blog.html Spiti card calibrated for 3 lines');

  // buying-guides.html Section 4: 6 cards with min-h-[3.5rem] leading-relaxed line-clamp-3
  const bgSec4Matches = [...buyingGuidesHtmlContent.matchAll(/<p[^>]*class="([^"]*line-clamp-3 min-h-\[3\.5rem\] leading-relaxed[^"]*)"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(bgSec4Matches.length === 6, `buying-guides.html has 6 uniform 3-line cards in Section 4 (found ${bgSec4Matches.length})`);
  bgSec4Matches.forEach((m, idx) => {
    const textLen = m[2].trim().length;
    assert(textLen >= 135 && textLen <= 160, `buying-guides.html card ${idx + 1} description length calibrated for 3 lines (len=${textLen})`);
  });

  // home2.html Section 6: 3 dispatches with min-h-[3.5rem] leading-relaxed line-clamp-3
  const home2Matches = [...home2HtmlContent.matchAll(/<p[^>]*class="([^"]*line-clamp-3 min-h-\[3\.5rem\] leading-relaxed[^"]*)"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(home2Matches.length === 3, `home2.html has 3 uniform 3-line cards in Section 6 (found ${home2Matches.length})`);
  home2Matches.forEach((m, idx) => {
    const textLen = m[2].trim().length;
    assert(textLen >= 130 && textLen <= 165, `home2.html card ${idx + 1} description length calibrated for 3 lines (len=${textLen})`);
  });

  // index.html Section 8: 3 cards with min-h-[3.5rem] leading-relaxed line-clamp-3
  const indexSec8Matches = [...indexHtmlContent.matchAll(/<p[^>]*class="([^"]*line-clamp-3 min-h-\[3\.5rem\] leading-relaxed[^"]*)"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(indexSec8Matches.length === 3, `index.html has 3 uniform 3-line cards in Section 8 (found ${indexSec8Matches.length})`);
  indexSec8Matches.forEach((m, idx) => {
    const textLen = m[2].trim().length;
    assert(textLen >= 130 && textLen <= 160, `index.html card ${idx + 1} description length calibrated for 3 lines (len=${textLen})`);
  });

  // index.html Section 5: 4 uniform 4-line value proposition cards
  const indexSec5Matches = [...indexHtmlContent.matchAll(/<p[^>]*class="[^"]*min-h-\[4\.75rem\] line-clamp-4[^"]*"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(indexSec5Matches.length === 4, `index.html has 4 uniform 4-line cards in Section 5 (found ${indexSec5Matches.length})`);
  assert(indexHtmlContent.includes('min-h-[3.25rem] flex items-center leading-snug'), 'index.html Section 5 uses min-h-[3.25rem] for lockstep title alignment');
  indexSec5Matches.forEach((m, idx) => {
    const textLen = m[1].trim().length;
    assert(textLen >= 125 && textLen <= 145, `index.html Section 5 card ${idx + 1} text calibrated for 4 lines (len=${textLen})`);
  });

  // index.html Section 5B: 4 uniform 3-line terrain cards
  const indexSec5BMatches = [...indexHtmlContent.matchAll(/<p[^>]*class="[^"]*min-h-\[64px\] line-clamp-3[^"]*"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(indexSec5BMatches.length === 4, `index.html has 4 uniform 3-line terrain cards in Section 5B (found ${indexSec5BMatches.length})`);
  assert(indexHtmlContent.includes('Emphasis on compact packability and titanium camp cooking.'), 'index.html Section 5B Card 3 calibrated to eliminate orphan 4th line');

  // wishlist.html Section 4: 3 feature cards with min-h-[3.5rem]
  assert(wishlistHtmlContent.includes('Seasonal Stock Alerts') && wishlistHtmlContent.includes('min-h-[3.5rem]'), 'wishlist.html card 1 has min-h-[3.5rem]');
  assert(wishlistHtmlContent.includes('Free Torso Sizing Review') && wishlistHtmlContent.includes('min-h-[3.5rem]'), 'wishlist.html card 2 has min-h-[3.5rem]');
  assert(wishlistHtmlContent.includes('1-Click Fast Checkout') && wishlistHtmlContent.includes('min-h-[3.5rem]'), 'wishlist.html card 3 has min-h-[3.5rem]');

  // Elimination of stray 3rd-line letter slivers on clamped card titles
  const stylesCssContent = fs.readFileSync(path.join(root, 'assets', 'css', 'styles.css'), 'utf8');
  assert(stylesCssContent.includes('.card-theme h3.line-clamp-2') && stylesCssContent.includes('max-height: 3.1rem !important'), 'styles.css caps clamped card titles at max-height: 3.1rem to eliminate 3rd-line slivers');
  assert(stylesCssContent.includes('min-height: 0 !important;'), 'styles.css overrides min-height on clamped card titles to prevent overflow gap');
  assert(blogHtmlContent.includes('Dark Sky Sanctuaries: Best Campgrounds for Astronomy in India'), 'blog.html Article 5 title fits in 2 lines with zero stray letter slivers');
  assert(blogHtmlContent.includes('Leave No Trace Water Filtration: Backcountry River Protocols'), 'blog.html Article 8 title fits in 2 lines with zero stray letter slivers');
  assert(blogHtmlContent.includes('Geodesic vs. Tunnel Tents: Surviving 90 km/h Himalayan Winds'), 'blog.html Article 9 title fits in 2 lines with zero stray letter slivers');
  assert(home2HtmlContent.includes('Dark Sky Sanctuaries: Best Campgrounds for Astronomy in India'), 'home2.html Article 3 title fits in 2 lines with zero stray letter slivers');

  // about.html Section 4B: 4 uniform 4-line timeline cards with min-h-[4.75rem] line-clamp-4
  const aboutHtmlContent2 = fs.readFileSync(path.join(root, 'about.html'), 'utf8');
  const timelineSectionMatch = aboutHtmlContent2.match(/<!-- SECTION 4B: EXPEDITION MILESTONES & TIMELINE -->([\s\S]*?)<!-- SECTION 4C:/);
  const aboutTimelineMatches = timelineSectionMatch ? [...timelineSectionMatch[1].matchAll(/<p[^>]*class="([^"]*min-h-\[4\.75rem\] line-clamp-4[^"]*)"[^>]*>([\s\S]*?)<\/p>/g)] : [];
  assert(aboutTimelineMatches.length === 4, `about.html has 4 uniform 4-line timeline cards in Section 4B (found ${aboutTimelineMatches.length})`);
  aboutTimelineMatches.forEach((m, idx) => {
    const textLen = m[2].trim().length;
    assert(textLen >= 145 && textLen <= 160, `about.html timeline card ${idx + 1} description length calibrated for 4 lines (len=${textLen})`);
  });

  // about.html Section 4C: Materials cards inside alignment, equal height & uniform 4-line descriptions
  const materialsSectionMatch = aboutHtmlContent2.match(/<!-- SECTION 4C: MATERIALS TRANSPARENCY & SOURCING -->([\s\S]*?)<!-- SECTION 4D:/);
  const aboutMaterialsMatches = materialsSectionMatch ? [...materialsSectionMatch[1].matchAll(/<p[^>]*class="([^"]*min-h-\[4\.75rem\] line-clamp-4[^"]*)"[^>]*>([\s\S]*?)<\/p>/g)] : [];
  assert(aboutMaterialsMatches.length === 4, `about.html has 4 uniform 4-line materials cards in Section 4C (found ${aboutMaterialsMatches.length})`);
  assert(materialsSectionMatch && materialsSectionMatch[1].includes('items-stretch'), 'about.html Section 4C grid uses items-stretch');
  assert(materialsSectionMatch && materialsSectionMatch[1].includes('pt-4 mt-4 border-t border-[#E2DACB] dark:border-[#2D372F]'), 'about.html Section 4C uses balanced pt-4 mt-4 border-t footers');
  aboutMaterialsMatches.forEach((m, idx) => {
    const textLen = m[2].trim().length;
    assert(textLen >= 140 && textLen <= 160, `about.html materials card ${idx + 1} description length calibrated for 4 lines (len=${textLen})`);
  });

  // about.html Section 6: 4 uniform 2-line stat cards with min-h-[2.5rem]
  const statsMatches = [...aboutHtmlContent2.matchAll(/<p[^>]*class="[^"]*min-h-\[2\.5rem\][^"]*"[^>]*>([\s\S]*?)<\/p>/g)];
  assert(statsMatches.length === 4, `about.html has 4 uniform 2-line stat cards in Section 6 (found ${statsMatches.length})`);
  statsMatches.forEach((m, idx) => {
    const text = m[1].replace(/&amp;/g, '&').trim();
    assert(text.length >= 45 && text.length <= 65, `about.html stat card ${idx + 1} text calibrated for 2 lines (len=${text.length})`);
  });

  assert(stylesCssContent.includes('.card-theme p.line-clamp-4'), 'styles.css includes .card-theme p.line-clamp-4');
}

console.log('\n--- SUITE 23: GALLERY FILTER BUTTONS CONTRAST & HOVER INTEGRITY ---');
{
  const stylesCssContent = fs.readFileSync(path.join(root, 'assets', 'css', 'styles.css'), 'utf8');
  assert(stylesCssContent.includes('Gallery Category Filter Buttons & Filter Pills Contrast & Hover Fix'), 'styles.css includes gallery category filter buttons fix header');
  assert(stylesCssContent.includes('.gallery-filter-btn:not(.active):hover') && stylesCssContent.includes('color: #263C2D !important'), 'styles.css enforces dark forest text on inactive gallery filter hover in light mode');
  assert(stylesCssContent.includes('.gallery-filter-btn.active:hover') && stylesCssContent.includes('color: #FFFFFF !important'), 'styles.css enforces white text on active gallery filter hover in light mode');
  assert(stylesCssContent.includes('.gallery-filter-btn.active:hover') && stylesCssContent.includes('background-color: #1F3124 !important'), 'styles.css prevents background from turning light cream on active gallery filter hover');
  assert(stylesCssContent.includes('.dark .gallery-filter-btn.active') && stylesCssContent.includes('background-color: #C6AD83 !important'), 'styles.css enforces sand background on active gallery filter in dark mode');
  assert(stylesCssContent.includes('.search-filter-pill.active:hover') && stylesCssContent.includes('background-color: #1F3124 !important'), 'styles.css protects search filter pill active hover contrast');

  const galleryHtml = fs.readFileSync(path.join(root, 'gallery.html'), 'utf8');
  assert(!galleryHtml.includes('gallery-filter-btn px-4 py-2 rounded-xl bg-[#F5F1E8] dark:bg-black/30 text-forest dark:text-cream hover:bg-sand/20'), 'gallery.html eliminates conflicting hover:bg-sand/20 from filter buttons');
  assert(galleryHtml.includes('data-cat="all"') && galleryHtml.includes('data-cat="mountain"') && galleryHtml.includes('data-cat="forest"') && galleryHtml.includes('data-cat="equipment"') && galleryHtml.includes('data-cat="cooking"'), 'gallery.html contains all 5 category filter buttons');
  assert(galleryHtml.includes("filterBtns.forEach(b => b.classList.remove('active'))") && galleryHtml.includes("btn.classList.add('active')"), 'gallery.html script toggles active state cleanly');
}

console.log('\n--- SUITE 24: GUIDE NAVIGATION PILLS (HEADER BOX) & SCROLLSPY ---');
{
  const stylesCssContent = fs.readFileSync(path.join(root, 'assets', 'css', 'styles.css'), 'utf8');
  assert(stylesCssContent.includes('Buying Guide Category Navigation Pills ("Header Box") & ScrollSpy'), 'styles.css includes guide navigation pills header');
  assert(stylesCssContent.includes('.guide-nav-pill.active') && stylesCssContent.includes('background-color: #263C2D !important'), 'styles.css enforces deep forest active header box in light mode');
  assert(stylesCssContent.includes('.guide-nav-pill.active') && stylesCssContent.includes('color: #FFFFFF !important'), 'styles.css enforces crisp white text inside active header box');
  assert(stylesCssContent.includes('.guide-nav-pill:not(.active):hover') && stylesCssContent.includes('color: #263C2D !important'), 'styles.css enforces dark text on inactive guide pill hover');
  assert(stylesCssContent.includes('.dark .guide-nav-pill.active') && stylesCssContent.includes('background-color: #C6AD83 !important'), 'styles.css enforces sand active header box in dark mode');
  assert(stylesCssContent.includes('scroll-margin-top: 155px'), 'styles.css enforces 155px scroll margin top for guide sections');

  const bgHtml = fs.readFileSync(path.join(root, 'buying-guides.html'), 'utf8');
  assert(bgHtml.includes('data-guide-target="beginner-guides"') && bgHtml.includes('data-guide-target="selection-guides"') && bgHtml.includes('data-guide-target="safety-guides"'), 'buying-guides.html contains all 3 guide navigation pills with data-guide-target attributes');
  assert(bgHtml.includes('id="selection-guides"') && bgHtml.includes('scroll-mt-[155px]'), 'buying-guides.html shelter & gear selection section includes scroll-mt-[155px]');
  assert(bgHtml.includes('Interactive Guide Category Navigation & ScrollSpy'), 'buying-guides.html includes interactive category navigation script');
  assert(bgHtml.includes('setActivePill(targetId)'), 'buying-guides.html script updates active header box on pill click');
  assert(bgHtml.includes('window.addEventListener(\'scroll\', onScroll'), 'buying-guides.html script activates ScrollSpy to track active section dynamically');
}

// 25. HAMBURGER DRAWER SCROLLING, BRAND NAME CONTRAST & 360PX MOBILE HEADER
{
  console.log('\n--- SUITE 25: HAMBURGER DRAWER SCROLLING, BRAND NAME & 360PX HEADER ---');
  const stylesCssContent = fs.readFileSync(path.join(root, 'assets', 'css', 'styles.css'), 'utf8');

  assert(stylesCssContent.includes('/* Mobile Navigation Drawer Scrolling & Responsiveness */'), 'styles.css includes dedicated mobile drawer scrolling section');
  assert(stylesCssContent.includes('#mobile-nav-drawer') && stylesCssContent.includes('overflow-y: auto !important;'), 'styles.css enforces overflow-y: auto on #mobile-nav-drawer');
  assert(stylesCssContent.includes('max-height: 100vh !important;') || stylesCssContent.includes('max-height: 100dvh !important;'), 'styles.css sets max-height on #mobile-nav-drawer');
  assert(stylesCssContent.includes('#main-navbar .theme-toggle-btn') && stylesCssContent.includes('display: none !important;'), 'styles.css hides theme toggle on mobile <= 480px / 360px in navbar');
  assert(stylesCssContent.includes('#main-navbar .dir-toggle-btn') && stylesCssContent.includes('display: none !important;'), 'styles.css hides RTL toggle on mobile <= 480px / 360px in navbar');
  assert(stylesCssContent.includes('/* 768px Tablet Brand Name Typography */'), 'styles.css includes 768px tablet brand name typography optimization');

  expectedPages.forEach(file => {
    const pageHtml = fs.readFileSync(path.join(root, file), 'utf8');
    assert(pageHtml.includes('id="mobile-nav-drawer"') && pageHtml.includes('overflow-y-auto'), `${file} mobile drawer includes overflow-y-auto class`);
    assert(!pageHtml.includes('src="assets/images/trailhaven-logo.svg"'), `${file} replaces hardcoded dark SVG logo with theme-adaptive typography in drawer`);
    assert(pageHtml.includes('alt="TrailHaven Compass Logo"'), `${file} mobile drawer includes crisp emblem logo`);
    assert(pageHtml.includes('TRAIL</span><span class="text-lg font-black text-[#D77A3C]">HAVEN</span>'), `${file} mobile drawer includes theme-adaptive TRAILHAVEN brand heading`);
    assert(pageHtml.includes('GEAR TODAY. GREATER TOMORROWS.'), `${file} mobile drawer includes slogan text`);
    assert(pageHtml.includes('class="theme-toggle-btn h-9 px-3 inline-flex items-center justify-center'), `${file} mobile drawer includes dedicated theme toggle button`);
    assert(pageHtml.includes('class="dir-toggle-btn h-9 px-3 inline-flex items-center justify-center'), `${file} mobile drawer includes dedicated direction toggle button`);
    assert(pageHtml.includes('class="open-search-btn w-full h-9 px-3 flex items-center justify-between'), `${file} mobile drawer includes quick search trigger button`);
  });

  const searchJs = fs.readFileSync(path.join(root, 'assets', 'js', 'search.js'), 'utf8');
  assert(searchJs.includes('z-[60]'), 'search.js elevates modal to z-[60] to cleanly sit above mobile drawer');
  assert(searchJs.includes('drawerCloseBtn.click()'), 'search.js closes mobile drawer when search modal opens');

  const dirJs = fs.readFileSync(path.join(root, 'assets', 'js', 'direction.js'), 'utf8');
  assert(dirJs.includes('-translate-x-full') && dirJs.includes('translate-x-full'), 'direction.js aligns drawer translate classes with RTL / LTR text direction');
}

// 26. QA REVIEW FEEDBACK FIXES (ITEMS 2, 3, 4, 6, 7, 8, 9)
{
  console.log('\n--- SUITE 26: QA REVIEW FEEDBACK FIXES ---');
  const stylesCssContent = fs.readFileSync(path.join(root, 'assets', 'css', 'styles.css'), 'utf8');

  // Item 9: 360px sticky navbar
  assert(stylesCssContent.includes('overflow-x: clip !important;'), 'styles.css enforces overflow-x: clip to preserve position: sticky on mobile');
  assert(stylesCssContent.includes('position: sticky !important;'), 'styles.css enforces position: sticky on #main-navbar');

  // Item 8: Brand Logo RTL protection
  assert(stylesCssContent.includes('direction: ltr !important;'), 'styles.css protects brand logo direction: ltr in RTL view');
  assert(stylesCssContent.includes('unicode-bidi: isolate !important;'), 'styles.css isolates brand logo bidi in RTL view');

  // Item 6: Home dropdown dark contrast
  assert(stylesCssContent.includes('.dark #home-dropdown-nav .absolute') && stylesCssContent.includes('background-color: #1A221C !important;'), 'styles.css optimizes Home dropdown container in dark mode');
  assert(stylesCssContent.includes('.dark #home-dropdown-nav a div:first-child') && stylesCssContent.includes('color: #FFFFFF !important;'), 'styles.css enforces pure white Home title in dark mode');
  assert(stylesCssContent.includes('.dark #home-dropdown-nav a div:last-child') && stylesCssContent.includes('color: #D4C3A3 !important;'), 'styles.css enforces warm sand description in dark mode');

  // Item 3: Outdoor-relevant SVG emblem
  assert(fs.existsSync(path.join(root, 'assets', 'images', 'trailhaven-emblem.svg')), 'assets/images/trailhaven-emblem.svg exists on disk');
  const emblemSvg = fs.readFileSync(path.join(root, 'assets', 'images', 'trailhaven-emblem.svg'), 'utf8');
  assert(emblemSvg.includes('<polygon') && emblemSvg.includes('Tent') || emblemSvg.includes('Mountain'), 'trailhaven-emblem.svg contains mountain peaks and outdoor elements');

  // Item 7: Home 1 Seasonal Outdoor Collection alignment
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert(indexHtml.includes('min-h-[3.5rem] flex items-center leading-snug">Monsoon Cloudburst Defense</h3>'), 'index.html Card 1 title uses min-h-[3.5rem]');
  assert(indexHtml.includes('min-h-[3.5rem] flex items-center leading-snug">Sub-Zero Alpine Winter</h3>'), 'index.html Card 2 title uses min-h-[3.5rem]');
  assert(indexHtml.includes('min-h-[3.5rem] flex items-center leading-snug">Ultralight Summer Treks</h3>'), 'index.html Card 3 title uses min-h-[3.5rem]');
  assert(indexHtml.includes('min-h-[3.5rem] flex items-center leading-snug">Desert & Stargazing Camps</h3>'), 'index.html Card 4 title uses min-h-[3.5rem]');
  assert(indexHtml.includes('min-h-[3rem] flex items-start leading-relaxed'), 'index.html seasonal cards enforce min-h-[3rem] descriptions');

  // Item 4: Buying Guides Section 5B card alignment
  const bgHtml = fs.readFileSync(path.join(root, 'buying-guides.html'), 'utf8');
  assert(bgHtml.includes('grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'), 'buying-guides.html Section 5B grid uses items-stretch');
  assert(bgHtml.includes('min-h-[3rem]'), 'buying-guides.html Section 5B cards enforce min-h-[3rem] on headers');
  assert(bgHtml.includes('h-9') && bgHtml.includes('h-11'), 'buying-guides.html Section 5B tables use uniform header and row heights');
  assert(bgHtml.includes('min-h-[2.5rem] flex items-center'), 'buying-guides.html Section 5B cards enforce min-h-[2.5rem] on footers');

  // Shop Gear Button in Navbar & Mobile Drawer
  assert(stylesCssContent.includes('.shop-gear-nav-btn') && stylesCssContent.includes('background-color: #D77A3C'), 'styles.css defines .shop-gear-nav-btn with #D77A3C');

  // Per-page navbar assertions (Items 2, 3, 8 + Shop Gear CTA)
  expectedPages.forEach(file => {
    const pageHtml = fs.readFileSync(path.join(root, file), 'utf8');
    const navMatch = pageHtml.match(/<header id="main-navbar"[\s\S]*?<\/header>/);
    assert(navMatch, `${file} contains #main-navbar`);
    const navHtml = navMatch[0];
    assert(!navHtml.includes('open-search-btn'), `${file} #main-navbar excludes search button as per feedback`);
    assert(navHtml.includes('src="assets/images/trailhaven-emblem.svg"'), `${file} #main-navbar uses trailhaven-emblem.svg`);
    assert(navHtml.includes('dir="ltr"') && navHtml.includes('brand-logo-container'), `${file} #main-navbar protects brand logo with dir="ltr"`);
    assert(navHtml.includes('shop-gear-nav-btn') && navHtml.includes('href="products.html"') && navHtml.includes('Shop Gear'), `${file} #main-navbar includes Shop Gear button redirecting to products.html`);

    const drawerMatch = pageHtml.match(/<div id="mobile-nav-drawer"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
    if (drawerMatch) {
      assert(drawerMatch[0].includes('Shop Gear') && drawerMatch[0].includes('href="products.html"'), `${file} mobile drawer includes Shop Gear button`);
      assert(!drawerMatch[0].includes('href="wishlist.html"'), `${file} mobile drawer excludes wishlist as requested`);
      assert(!drawerMatch[0].includes('href="order.html"'), `${file} mobile drawer excludes cart/orders as requested`);
    }
  });

  // --- SUITE 26: HERO SECTION BACKGROUND IMAGE CLARITY & CONTRAST INTEGRITY ---
  console.log('\n--- SUITE 26: HERO SECTION BACKGROUND IMAGE CLARITY & CONTRAST INTEGRITY ---');
  assert(stylesCssContent.includes('HERO SECTIONS: IMAGE CLARITY, CONTRAST & WCAG AAA TEXT LEGIBILITY'), 'styles.css includes Hero clarity and contrast section');
  assert(stylesCssContent.includes('.hero-scrim-overlay'), 'styles.css defines .hero-scrim-overlay class');
  assert(stylesCssContent.includes('filter: contrast(1.08) brightness(0.96) saturate(1.08)'), 'styles.css includes image clarity filter boosting contrast and saturation');
  assert(stylesCssContent.includes('text-shadow: 0 2px 4px rgba(0, 0, 0, 0.95)'), 'styles.css enforces razor-sharp text-shadow on hero h1 headings');
  assert(stylesCssContent.includes('.hero-desc-backlayer') && stylesCssContent.includes('backdrop-filter: blur(10px)'), 'styles.css defines .hero-desc-backlayer with frosted glass effect');

  const heroImagePages = [
    'index.html', 'about.html', 'products.html', 'buying-guides.html',
    'gallery.html', 'pricing.html', 'blog.html', 'contact.html'
  ];

  heroImagePages.forEach(file => {
    const pageHtml = fs.readFileSync(path.join(root, file), 'utf8');
    assert(pageHtml.includes('hero-scrim-overlay'), `${file} hero section has calibrated .hero-scrim-overlay`);
    assert(pageHtml.includes('hero-desc-backlayer'), `${file} hero description paragraph has .hero-desc-backlayer`);
    assert(!pageHtml.includes('rgba(22, 38, 27, 0.85)'), `${file} does not use muddy 85% dark overlay`);
    assert(!pageHtml.includes('from-[#1A2B20]/95'), `${file} does not use heavy 95% black overlay`);
  });
}

console.log('\n====================================================');
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) process.exit(1);




