const fs = require('fs');
const files = ['blog.html', 'buying-guides.html', 'products.html', 'home2.html', 'about.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const sections = content.split('<section');
  sections.forEach((sec, sIdx) => {
    if (sec.includes('items-stretch') && (sec.includes('<img') || sec.includes('aspect-'))) {
      console.log(`\n=== ${f} (Section ${sIdx}) ===`);
      const imgMatch = sec.match(/<div[^>]*class="([^"]*rounded[^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"/);
      if (imgMatch) {
        console.log('Image Container Classes:', imgMatch[1]);
        console.log('Image Source:', imgMatch[2]);
      }
      const gridMatch = sec.match(/<div[^>]*class="([^"]*grid[^"]*items-stretch[^"]*)"/);
      if (gridMatch) {
        console.log('Grid Classes:', gridMatch[1]);
      }
    }
  });
});
