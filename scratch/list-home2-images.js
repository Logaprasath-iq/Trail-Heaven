const fs = require('fs');
const content = fs.readFileSync('home2.html', 'utf8');
const m = content.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/g);
if (m) {
  m.forEach(imgTag => {
    const srcMatch = imgTag.match(/src=['"]([^'"]+)['"]/);
    const altMatch = imgTag.match(/alt=['"]([^'"]+)['"]/);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : 'NO-ALT';
    console.log(`${alt} => ${src}`);
  });
}
