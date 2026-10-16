const fs = require('fs');

['index.html', 'blog.html', 'products.html', 'about.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const start = content.indexOf('open-search-btn');
  if (start !== -1) {
    const chunk = content.slice(start - 40, start + 1200);
    const end = chunk.indexOf('</header>');
    console.log(`\n=== ${f} ===\n` + chunk.slice(0, end));
  }
});
