const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const results = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const imgRegex = /<img[^>]+src=["'](https:\/\/images\.unsplash\.com\/[^"']+)["'][^>]*>/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    const fullTag = m[0];
    const src = m[1];
    const altMatch = fullTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';
    const idMatch = src.match(/photo-[a-zA-Z0-9-]+/);
    if (idMatch) {
      const id = idMatch[0];
      if (!results[id]) results[id] = { alt, files: [f], src };
      else {
        if (!results[id].files.includes(f)) results[id].files.push(f);
        if (!results[id].alt && alt) results[id].alt = alt;
      }
    }
  }
});

console.log('Found', Object.keys(results).length, 'images in HTML files:');
Object.entries(results).forEach(([id, info]) => {
  console.log(`- ${id} | alt: "${info.alt}" | in: ${info.files.join(', ')}`);
});
