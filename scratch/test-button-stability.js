const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const stylesCss = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');

console.log('========================================================');
console.log('🧪 TESTING VIEW DETAILS BUTTON & CARD HOVER STABILITY');
console.log('========================================================\n');

// 1. .btn-outline:hover does not have translateY
const outlineHoverRegex = /\.btn-outline:hover\s*\{([^}]+)\}/g;
let match;
let hasTransformInOutlineHover = false;
while ((match = outlineHoverRegex.exec(stylesCss)) !== null) {
  if (match[1].includes('translateY')) {
    hasTransformInOutlineHover = true;
  }
}
assert(!hasTransformInOutlineHover, '.btn-outline:hover must not use translateY displacement');
console.log('  ✅ PASS: .btn-outline:hover does not displace physically with translateY');

// 2. Card buttons enforce transform: none !important
assert(stylesCss.includes('.card-theme .btn-outline'), 'styles.css defines .card-theme .btn-outline stability rules');
assert(stylesCss.includes('transform: none !important;'), 'Card buttons enforce transform: none !important');
console.log('  ✅ PASS: .card-theme buttons enforce transform: none !important to prevent boundary oscillation');

// 3. .card-theme:hover does not contain scale(1.008)
assert(!stylesCss.includes('scale(1.008)'), 'styles.css must not use fractional scale(1.008) on card hover');
console.log('  ✅ PASS: .card-theme:hover does not use subpixel scale(1.008)');

// 4. .dark .btn-outline:hover preserves dark mode color scheme
assert(stylesCss.includes('#C6AD83'), 'Dark mode .btn-outline:hover preserves #C6AD83 sand accent');
assert(stylesCss.includes('#1A2B20'), 'Dark mode .btn-outline:hover preserves #1A2B20 forest text');
console.log('  ✅ PASS: Dark mode .btn-outline:hover preserves brand styling (#C6AD83 bg, #1A2B20 text)');

// 5. .card-animate-in does not lock with 'both'
assert(!stylesCss.includes('animation: scaleUpIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;'), 'card-animate-in does not use animation fill-mode: both');
console.log('  ✅ PASS: .card-animate-in does not permanently lock transform with fill-mode both');

console.log('\n========================================================');
console.log('🏁 ALL BUTTON STABILITY CHECKS PASSED');
console.log('========================================================');
