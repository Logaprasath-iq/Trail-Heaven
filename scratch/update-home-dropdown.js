const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldDesktopDropdownRegex = /<div class="absolute top-full left-0 mt-1\.5 w-52 bg-\[#F5F1E8\] dark:bg-\[#1E2420\] rounded-2xl shadow-xl border border-\[#E2DACB\] dark:border-\[#2D372F\] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">[\s\S]*?<\/div>\s*<\/div>/;

const newDesktopDropdown = `<div class="absolute top-full left-0 mt-1.5 w-36 bg-[#F5F1E8] dark:bg-[#1E2420] rounded-2xl shadow-xl border border-[#E2DACB] dark:border-[#2D372F] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="index.html" class="block px-3 py-2 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                Home
              </a>
              <a href="home2.html" class="block px-3 py-2 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                Home 2
              </a>
            </div>
          </div>`;

const oldMobileDropdownRegex = /<div id="mobile-home-submenu" class="pl-4 pt-1 space-y-1">[\s\S]*?<\/div>/;

const newMobileDropdown = `<div id="mobile-home-submenu" class="pl-4 pt-1 space-y-1">
            <a href="index.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              Home
            </a>
            <a href="home2.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              Home 2
            </a>
          </div>`;

let updatedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (oldDesktopDropdownRegex.test(content)) {
    content = content.replace(oldDesktopDropdownRegex, newDesktopDropdown);
    changed = true;
  }

  if (oldMobileDropdownRegex.test(content)) {
    content = content.replace(oldMobileDropdownRegex, newMobileDropdown);
    changed = true;
  }

  // Also replace footer Home 1 (Expedition) with Home (Expedition)
  if (content.includes('Home 1 (Expedition)')) {
    content = content.replace(/Home 1 \(Expedition\)/g, 'Home (Expedition)');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
    updatedCount++;
  }
});

console.log(`Total updated files: ${updatedCount}`);
