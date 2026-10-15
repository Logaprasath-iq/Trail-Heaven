const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const targetDesktopOld = `<div class="absolute top-full left-0 mt-1.5 w-36 bg-[#F5F1E8] dark:bg-[#1E2420] rounded-2xl shadow-xl border border-[#E2DACB] dark:border-[#2D372F] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="index.html" class="block px-3 py-2 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                Home
              </a>
              <a href="home2.html" class="block px-3 py-2 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                Home 2
              </a>
            </div>`;

const targetDesktopNew = `<div class="absolute top-full left-0 mt-1.5 w-48 bg-[#F5F1E8] dark:bg-[#1E2420] rounded-2xl shadow-xl border border-[#E2DACB] dark:border-[#2D372F] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="index.html" class="block p-2.5 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                <div>Home</div>
                <div class="text-[10px] font-normal text-gray-500">Expedition Theme</div>
              </a>
              <a href="home2.html" class="block p-2.5 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                <div>Home 2</div>
                <div class="text-[10px] font-normal text-gray-500">Wilderness Theme</div>
              </a>
            </div>`;

const targetMobileOld = `<div id="mobile-home-submenu" class="pl-4 pt-1 space-y-1">
            <a href="index.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              Home
            </a>
            <a href="home2.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              Home 2
            </a>
          </div>`;

const targetMobileNew = `<div id="mobile-home-submenu" class="pl-4 pt-1 space-y-1">
            <a href="index.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              <div class="font-semibold">Home</div>
              <div class="text-xs font-normal text-gray-500">Expedition Theme</div>
            </a>
            <a href="home2.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              <div class="font-semibold">Home 2</div>
              <div class="text-xs font-normal text-gray-500">Wilderness Theme</div>
            </a>
          </div>`;

let updated = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (content.includes(targetDesktopOld)) {
    content = content.replace(targetDesktopOld, targetDesktopNew);
    changed = true;
  }

  if (content.includes(targetMobileOld)) {
    content = content.replace(targetMobileOld, targetMobileNew);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
    updated++;
  } else {
    console.log(`NO CHANGE for ${f}`);
  }
});

console.log(`Total updated files: ${updated}`);
