const fs = require('fs');

['gallery.html', 'about.html'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/g);
  console.log(`=== ${file} ===`);
  if (m) {
    m.forEach(imgTag => {
      const srcMatch = imgTag.match(/src=['"]([^'"]+)['"]/);
      const altMatch = imgTag.match(/alt=['"]([^'"]+)['"]/);
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : 'NO-ALT';
      console.log(`${alt} => ${src}`);
    });
  }
});
