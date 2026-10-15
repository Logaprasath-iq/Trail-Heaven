const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const hasOldFooterLogo = c.includes('w-11 h-11 rounded-lg bg-[#222823]');
  const hasDividerInFooter = c.match(/<footer[\s\S]*?bg-\[#C6AD83\]\/70/);
  console.log(f, 'Footer has box:', hasOldFooterLogo, 'Footer has divider:', !!hasDividerInFooter);
});
