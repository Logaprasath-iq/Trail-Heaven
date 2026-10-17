const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match card grids by looking for sections with grid and p tags
  const sections = content.split('<section');
  sections.forEach((sec, sIdx) => {
    if (sec.includes('grid-cols-') && !sec.includes('stats-item')) {
      const pMatches = sec.match(/<p[^>]*class="[^"]*(?:text-xs|text-sm|text-gray)[^"]*"[^>]*>([\s\S]*?)<\/p>/g) || [];
      if (pMatches.length >= 2 && pMatches.length <= 12) {
        console.log(`\n--- ${file} (Section ${sIdx}) ---`);
        pMatches.forEach((p, pIdx) => {
          const txt = p.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          if (txt.length > 20 && txt.length < 350) {
            console.log(`  Card ${pIdx+1} [len=${txt.length}]: ${txt}`);
          }
        });
      }
    }
  });
});
