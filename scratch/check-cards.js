const fs = require('fs');
const files = ['index.html', 'home2.html', 'products.html', 'blog.html', 'buying-guides.html', 'about.html', 'pricing.html', 'contact.html'];
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/<p[^>]*class="([^"]*line-clamp[^"]*)"[^>]*>([\s\S]*?)<\/p>/gi)];
  if (matches.length) {
    console.log(f + ': ' + matches.length + ' line-clamp paragraphs');
    matches.forEach((m, i) => console.log('  [' + i + '] ' + m[1] + ' --> ' + m[2].trim().substring(0, 60) + '... (' + m[2].trim().length + ' chars)'));
  }
});
