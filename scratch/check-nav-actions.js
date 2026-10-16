const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/<!-- Utility Icons & Controls -->([\s\S]*?)<\/header>/);
  if (m) {
    console.log(`\n=== ${f} ===`);
    const lines = m[1].split('\n').filter(l => l.includes('<button') || l.includes('<a') || l.includes('open-search') || l.includes('theme-toggle') || l.includes('dir-toggle'));
    lines.forEach(l => console.log('  ', l.trim()));
  } else {
    console.log(`No utility controls match in ${f}`);
  }
});
