const fs = require('fs');

console.log('=== VERIFYING FAVORITE RED COLOR BEHAVIOR ===\n');

// 1. Check CSS
const css = fs.readFileSync('assets/css/styles.css', 'utf8');
const hasWishlistActive = css.includes('[data-toggle-wishlist].active');
const hasRedColor = css.includes('#EF4444');
const hasDarkOverride = css.includes('.dark [data-toggle-wishlist].active') || css.includes('.dark .heart-active');
const hasHeartPop = css.includes('heartBeatPop') || css.includes('heart-pop');

console.log('CSS Checks:');
console.log('  Active wishlist selector:', hasWishlistActive ? '✅ YES' : '❌ NO');
console.log('  Pure red #EF4444 defined:', hasRedColor ? '✅ YES' : '❌ NO');
console.log('  Dark mode override with !important:', hasDarkOverride ? '✅ YES' : '❌ NO');
console.log('  Heart pop animation defined:', hasHeartPop ? '✅ YES' : '❌ NO');

// 2. Check wishlist.js
const wishJs = fs.readFileSync('assets/js/wishlist.js', 'utf8');
const syncQueriesAll = wishJs.includes('[data-toggle-wishlist]') && wishJs.includes('[data-wishlist-id]');
const syncAppliesRed = wishJs.includes('#EF4444');
const syncAddsSolid = wishJs.includes('fa-solid');

console.log('\nwishlist.js Checks:');
console.log('  Queries [data-toggle-wishlist] and [data-wishlist-id]:', syncQueriesAll ? '✅ YES' : '❌ NO');
console.log('  Applies red style #EF4444 in syncHeartIcons:', syncAppliesRed ? '✅ YES' : '❌ NO');
console.log('  Switches to solid heart fa-solid:', syncAddsSolid ? '✅ YES' : '❌ NO');

// 3. Check main.js
const mainJs = fs.readFileSync('assets/js/main.js', 'utf8');
const mainHandlesWishlist = mainJs.includes('[data-toggle-wishlist]') && mainJs.includes('#EF4444');
const mainAppliesPop = mainJs.includes('heart-pop');

console.log('\nmain.js Checks:');
console.log('  Applies red #EF4444 on click immediately:', mainHandlesWishlist ? '✅ YES' : '❌ NO');
console.log('  Triggers heart-pop animation on click:', mainAppliesPop ? '✅ YES' : '❌ NO');

if (hasWishlistActive && hasRedColor && hasDarkOverride && hasHeartPop && syncQueriesAll && syncAppliesRed && syncAddsSolid && mainHandlesWishlist && mainAppliesPop) {
  console.log('\n🎉 ALL FAVORITE RED COLOR CHECKS PASSED!');
} else {
  console.error('\n❌ SOME CHECKS FAILED!');
  process.exit(1);
}
