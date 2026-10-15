const fs = require('fs');
const data = require('../assets/js/data.js');

console.log('=== BUYING GUIDES ===');
data.guides.forEach(g => {
  console.log(`- ${g.id} | ${g.title} | ${g.image}`);
});

console.log('\n=== BLOG ARTICLES ===');
data.blogs.forEach(b => {
  console.log(`- ${b.id} | ${b.title} | ${b.image}`);
});

console.log('\n=== GALLERY ===');
data.gallery.forEach(g => {
  console.log(`- ${g.id} | ${g.title} | ${g.image}`);
});
