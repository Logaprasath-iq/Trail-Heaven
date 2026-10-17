const fs = require('fs');
const files = ['index.html', 'home2.html', 'products.html', 'blog.html', 'buying-guides.html', 'about.html', 'pricing.html', 'contact.html', 'gallery.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/<h3[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/h3>/gi)];
  matches.forEach((m, idx) => {
    const cls = m[1];
    const raw = m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (cls.includes('line-clamp') || cls.includes('min-h-')) {
      console.log(`${f} [h3 #${idx+1} len=${raw.length}]: "${raw}"`);
      console.log(`   classes: ${cls}`);
    }
  });
});
