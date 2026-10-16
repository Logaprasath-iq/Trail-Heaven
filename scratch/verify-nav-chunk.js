const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Find open-search-btn to mobile-menu-toggle
  const searchIdx = content.indexOf('open-search-btn');
  if (searchIdx === -1) {
    console.log('Skipping (no search):', f);
    return;
  }
  
  // Find the container div start
  const divStart = content.lastIndexOf('<div class="flex items-center', searchIdx);
  const divEnd = content.indexOf('</div>', content.indexOf('mobile-menu-toggle', searchIdx));
  
  if (divStart !== -1 && divEnd !== -1) {
    console.log(`Matched navbar controls in ${f}`);
  } else {
    console.log(`Failed to match boundaries in ${f}`, { divStart, divEnd });
  }
});
