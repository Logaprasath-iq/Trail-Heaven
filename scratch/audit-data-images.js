const data = require('../assets/js/data.js');

console.log('Auditing TrailHavenData objects...');
console.log('Categories count:', data.categories.length);
console.log('Products count:', data.products.length);
console.log('Bundles count:', data.bundles.length);
console.log('Guides count:', data.guides.length);
console.log('Blogs count:', data.blogs.length);
console.log('Gallery count:', data.gallery.length);

const catImages = data.categories.map(c => c.image);
const prodImages = data.products.map(p => p.image);
const bundleImages = data.bundles.map(b => b.image);
const guideImages = data.guides.map(g => g.image);
const blogImages = data.blogs.map(b => b.image);
const galleryImages = data.gallery.map(g => g.image);

function findDupes(arr, label) {
  const counts = {};
  arr.forEach(url => counts[url] = (counts[url] || 0) + 1);
  const dupes = Object.entries(counts).filter(([_, c]) => c > 1);
  if (dupes.length) {
    console.log(`❌ ${label} has duplicates within itself:`, dupes);
  } else {
    console.log(`✅ ${label} has 0 duplicates within itself (${arr.length} items)`);
  }
}

findDupes(catImages, 'Categories');
findDupes(prodImages, 'Products');
findDupes(bundleImages, 'Bundles');
findDupes(guideImages, 'Guides');
findDupes(blogImages, 'Blogs');
findDupes(galleryImages, 'Gallery');
