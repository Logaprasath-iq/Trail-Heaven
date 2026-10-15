const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hMatch = c.match(/<header[^>]*class="([^"]*)"/);
  const fMatch = c.match(/<footer[^>]*class="([^"]*)"/);
  console.log(f);
  console.log('  Header class:', hMatch ? hMatch[1] : 'NONE');
  console.log('  Footer class:', fMatch ? fMatch[1] : 'NONE');
});
