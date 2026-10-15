/**
 * Test verification for the 3 user requests:
 * 1. Button CSS for "Place Demo Order" on order.html
 * 2. Removal of back-to-top arrow button while scrolling
 * 3. Removal of switch comment/toast when toggling theme
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc} -> ${err.message}`);
    failed++;
  }
}

console.log("========================================================");
console.log("🧪 TESTING 3 USER FIXES");
console.log("========================================================");

console.log("\n--- 1. THEME SWITCH TOAST REMOVAL ---");
const themeJs = fs.readFileSync(path.join(__dirname, '../assets/js/theme.js'), 'utf8');

it("ThemeManager.toggle does not contain showToast", () => {
  const toggleMatch = themeJs.match(/toggle\(\)\s*\{([^}]+)\}/);
  assert(toggleMatch, "Could not find toggle method in theme.js");
  const toggleBody = toggleMatch[1];
  assert(!toggleBody.includes('showToast'), "toggle() method still contains showToast!");
});

it("ThemeManager.toggle does not display 'Switched to' toast", () => {
  assert(!themeJs.includes('Switched to'), "theme.js still contains 'Switched to' text");
});

console.log("\n--- 2. BACK TO TOP ARROW REMOVAL ---");
const mainJs = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, '../assets/css/styles.css'), 'utf8');

it("main.js initBackToTop does not create floating button or attach scroll listener", () => {
  const backToTopMatch = mainJs.match(/function initBackToTop\(\)\s*\{([\s\S]*?)\n\}/);
  assert(backToTopMatch, "Could not find initBackToTop function in main.js");
  const body = backToTopMatch[1];
  assert(!body.includes('createElement'), "initBackToTop still creates an element");
  assert(!body.includes('addEventListener'), "initBackToTop still attaches event listener");
});

it("styles.css ensures #back-to-top is permanently hidden", () => {
  assert(stylesCss.includes('#back-to-top {'), "styles.css missing #back-to-top rule");
  assert(stylesCss.includes('display: none !important'), "styles.css does not enforce display: none !important on #back-to-top");
});

console.log("\n--- 3. PLACE DEMO ORDER BUTTON CSS & CONTRAST ---");
const orderHtml = fs.readFileSync(path.join(__dirname, '../order.html'), 'utf8');

it("order.html defines #place-order-btn with vibrant typography and elevation", () => {
  assert(orderHtml.includes('id="place-order-btn"'), "order.html missing #place-order-btn");
  assert(orderHtml.includes('btn-primary'), "order.html button missing btn-primary class");
});

it("order.html renderCart does not dim #place-order-btn with opacity-50", () => {
  assert(!orderHtml.includes("placeOrderBtn.classList.add('opacity-50'"), "order.html still dims placeOrderBtn with opacity-50");
  assert(!orderHtml.includes("placeOrderBtn.disabled = true;"), "order.html still disables placeOrderBtn with empty cart");
});

it("styles.css provides high-contrast, vivid styling for #place-order-btn", () => {
  assert(stylesCss.includes('#place-order-btn,'), "styles.css missing #place-order-btn rule");
  assert(stylesCss.includes('background-color: #D77A3C !important;'), "styles.css missing terracotta background for place-order-btn");
  assert(stylesCss.includes('color: #FFFFFF !important;'), "styles.css missing solid white color for place-order-btn");
  assert(stylesCss.includes('opacity: 1 !important;'), "styles.css missing opacity: 1 for place-order-btn");
  assert(stylesCss.includes('text-shadow:'), "styles.css missing text-shadow for crisp rendering");
});

console.log("\n--- 4. SELECT & OPTION DROPDOWN DARK MODE CSS ---");
const productsHtml = fs.readFileSync(path.join(__dirname, '../products.html'), 'utf8');

it("styles.css declares color-scheme: dark on .dark to prevent browser light gray dropdown popups", () => {
  assert(stylesCss.includes('color-scheme: dark;'), "styles.css missing color-scheme: dark;");
});

it("styles.css styles .dark select and option with dark background and crisp cream text", () => {
  assert(stylesCss.includes('.dark select option') || stylesCss.includes('html.dark select option'), "styles.css missing .dark select option rule");
  assert(stylesCss.includes('background-color: #1A201C !important;') || stylesCss.includes('background-color: #19201A !important;'), "styles.css missing dark background for options");
});

it("products.html catalog-sort-select has dark solid background and dark option styling", () => {
  assert(productsHtml.includes('dark:bg-[#1A201C]'), "products.html select missing dark:bg-[#1A201C]");
  assert(productsHtml.includes('dark:text-[#F4EFE6]'), "products.html options missing dark:text-[#F4EFE6]");
});

console.log("\n--- 5. HOME 2 NAVBAR LABEL ---");
const home2Html = fs.readFileSync(path.join(__dirname, '../home2.html'), 'utf8');

it("home2.html desktop navbar shows Home 2", () => {
  assert(home2Html.includes('<span>Home 2</span>'), "home2.html desktop navbar does not display <span>Home 2</span>");
});

it("home2.html mobile drawer shows Home 2", () => {
  assert(home2Html.includes('> Home 2</span>'), "home2.html mobile drawer does not display Home 2");
});

it("main.js initActiveNavLink synchronizes Home 2 label for home2.html", () => {
  const mainJsContent = fs.readFileSync(path.join(__dirname, '../assets/js/main.js'), 'utf8');
  assert(mainJsContent.includes("labelSpan.textContent = 'Home 2'"), "main.js missing dynamic label update for Home 2");
});

console.log("\n--- 6. DROPDOWN CLEAN HOME & HOME 2 WITHOUT ICONS ---");
const allHtmlFiles = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));

it("All 14 HTML pages have clean Home and Home 2 dropdown with no icons", () => {
  allHtmlFiles.forEach(f => {
    const c = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    const ddMatch = c.match(/<div class="relative group" id="home-dropdown-nav">([\s\S]*?)<\/nav>/);
    assert(ddMatch, `${f} missing home-dropdown-nav`);
    const dd = ddMatch[1];
    assert(!dd.includes('fa-mountain'), `${f} dropdown still contains mountain icon`);
    assert(!dd.includes('fa-campground'), `${f} dropdown still contains campground icon`);
    assert(!dd.includes('Home 1'), `${f} dropdown still contains Home 1`);
    assert(dd.includes('Home') && dd.includes('Home 2'), `${f} dropdown missing Home or Home 2`);
    assert(dd.includes('Expedition Theme'), `${f} dropdown missing Expedition Theme`);
    assert(dd.includes('Wilderness Theme'), `${f} dropdown missing Wilderness Theme`);
    assert(dd.includes('border-t border-[#E2DACB] dark:border-[#2D372F]'), `${f} dropdown missing separation line`);
  });
});

it("No HTML file contains 'Home 1' text anywhere", () => {
  allHtmlFiles.forEach(f => {
    const c = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    assert(!c.includes('Home 1'), `${f} still contains 'Home 1'`);
  });
});

console.log("\n========================================================");
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("========================================================");

if (failed > 0) process.exit(1);
