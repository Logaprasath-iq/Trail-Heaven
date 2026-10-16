const fs = require('fs');
const files = ['about.html', 'gallery.html', 'home2.html', 'index.html', 'pricing.html'];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const countBefore = (content.match(/ data-tilt\b/g) || []).length;
  content = content.replace(/ data-tilt\b/g, '');
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Removed ${countBefore} data-tilt from ${file}`);
});
