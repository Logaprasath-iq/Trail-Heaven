const fs = require('fs');

const page = process.argv[2] || 'index.html';
const content = fs.readFileSync(page, 'utf8');

const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
let m;
console.log(`=== IMAGES IN ${page} ===`);
while ((m = imgRegex.exec(content)) !== null) {
  const src = m[1];
  const altMatch = m[0].match(/alt=["']([^"']*)["']/);
  const alt = altMatch ? altMatch[1] : '';
  console.log(`Alt: "${alt}" | Src: ${src}`);
}
