const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const searchIdx = content.indexOf('open-search-btn');
  const divStart = content.lastIndexOf('<div class="flex items-center', searchIdx);
  const divEnd = content.indexOf('</div>', content.indexOf('mobile-menu-toggle', searchIdx)) + 6;
  console.log(`\n--- ${f} ---`);
  const lines = content.slice(divStart, divEnd).trim().split('\n');
  lines.forEach(l => console.log('  ' + l.trim()));
});

