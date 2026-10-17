const fs = require('fs');
const files = ['about.html', 'buying-guides.html', 'blog.html', 'products.html', 'home2.html', 'index.html'];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/border-t border-[#0-9a-fA-F/]+[^"']+/g);
  if (matches) {
    console.log(file, [...new Set(matches)].slice(0, 5));
  }
}
