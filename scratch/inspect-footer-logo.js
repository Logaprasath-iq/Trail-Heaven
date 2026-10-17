const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const footerIdx = content.indexOf('<footer');
  if (footerIdx === -1) {
    console.log(f, 'No footer');
    return;
  }
  const logoStart = content.indexOf('aria-label="TrailHaven Home"', footerIdx);
  if (logoStart === -1) {
    console.log(f, 'No logo with aria-label in footer');
    return;
  }
  const aStart = content.lastIndexOf('<a ', logoStart);
  const logoEnd = content.indexOf('</a>', logoStart) + 4;
  console.log(`=== ${f} ===`);
  console.log(content.slice(aStart, logoEnd));
});
