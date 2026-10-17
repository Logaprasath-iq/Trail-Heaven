const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Header slogan replacement
  const oldHeaderSpan = '<span class="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-black dark:text-white transition-colors duration-200 leading-none">';
  const newHeaderSpan = '<span class="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-black dark:text-white transition-colors duration-200 leading-none whitespace-nowrap">';
  
  if (content.includes(oldHeaderSpan)) {
    content = content.replace(oldHeaderSpan, newHeaderSpan);
    changed = true;
  }

  // Footer slogan replacement
  const oldFooterSpan = '<span class="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#F5F1E8] leading-none">';
  const newFooterSpan = '<span class="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#F5F1E8] leading-none whitespace-nowrap">';

  if (content.includes(oldFooterSpan)) {
    content = content.replace(oldFooterSpan, newFooterSpan);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated slogan in ${f}`);
  } else {
    console.log(`No change in ${f}`);
  }
});
