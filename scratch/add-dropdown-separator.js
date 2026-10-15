const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const desktopTargetOld = `              <a href="index.html" class="block p-2.5 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                <div>Home</div>
                <div class="text-[10px] font-normal text-gray-500">Expedition Theme</div>
              </a>
              <a href="home2.html" class="block p-2.5 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                <div>Home 2</div>
                <div class="text-[10px] font-normal text-gray-500">Wilderness Theme</div>
              </a>`;

const desktopTargetNew = `              <a href="index.html" class="block p-2.5 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                <div>Home</div>
                <div class="text-[10px] font-normal text-gray-500">Expedition Theme</div>
              </a>
              <div class="my-1 border-t border-[#E2DACB] dark:border-[#2D372F]"></div>
              <a href="home2.html" class="block p-2.5 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                <div>Home 2</div>
                <div class="text-[10px] font-normal text-gray-500">Wilderness Theme</div>
              </a>`;

const mobileTargetOld = `            <a href="index.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              <div class="font-semibold">Home</div>
              <div class="text-xs font-normal text-gray-500">Expedition Theme</div>
            </a>
            <a href="home2.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              <div class="font-semibold">Home 2</div>
              <div class="text-xs font-normal text-gray-500">Wilderness Theme</div>
            </a>`;

const mobileTargetNew = `            <a href="index.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              <div class="font-semibold">Home</div>
              <div class="text-xs font-normal text-gray-500">Expedition Theme</div>
            </a>
            <div class="my-1 border-t border-[#E2DACB]/60 dark:border-[#2D372F]/60"></div>
            <a href="home2.html" class="mobile-nav-link block py-1.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:text-orange">
              <div class="font-semibold">Home 2</div>
              <div class="text-xs font-normal text-gray-500">Wilderness Theme</div>
            </a>`;

let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (content.includes(desktopTargetOld)) {
    content = content.replace(desktopTargetOld, desktopTargetNew);
    changed = true;
  }

  if (content.includes(mobileTargetOld)) {
    content = content.replace(mobileTargetOld, mobileTargetNew);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Added separation line in ${f}`);
    count++;
  } else {
    console.log(`No match in ${f}`);
  }
});

console.log(`Total files updated: ${count}`);
