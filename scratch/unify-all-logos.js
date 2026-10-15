const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const unifiedHeaderLogo = `<a href="index.html" class="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group" aria-label="TrailHaven Home">
          <div class="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-white dark:bg-[#222823] border border-[#E2DACB] dark:border-[#333C34] flex items-center justify-center p-1 shadow-sm flex-shrink-0 group-hover:border-[#D77A3C] transition-colors">
            <img src="assets/images/trailhaven-emblem.png" alt="TrailHaven Compass Logo" class="h-9 sm:h-10 w-9 sm:w-10 object-contain rounded-lg group-hover:scale-105 transition-transform flex-shrink-0">
          </div>
          <div class="flex flex-col justify-center select-none">
            <div class="flex items-baseline tracking-tight font-black leading-none font-display">
              <span class="text-xl sm:text-2xl font-black text-black dark:text-white transition-colors duration-200">TRAIL</span><span class="text-xl sm:text-2xl font-black text-[#D77A3C]">HAVEN</span>
            </div>
            <div class="flex items-center gap-1.5 my-0.5">
              <span class="h-[2px] w-5 sm:w-6 bg-[#D77A3C] rounded-full"></span>
              <span class="h-1.5 w-1.5 rounded-full bg-[#C6AD83]"></span>
              <span class="h-[1.5px] w-12 sm:w-16 bg-[#C6AD83]/70 rounded-full"></span>
            </div>
            <span class="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-black dark:text-white transition-colors duration-200 leading-none">
              GEAR TODAY. GREATER TOMORROWS.
            </span>
          </div>
        </a>`;

const unifiedFooterLogo = `<a href="index.html" class="inline-flex items-center gap-2.5 sm:gap-3 mb-4 group" aria-label="TrailHaven Home">
            <div class="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-[#222823] border border-[#333C34] flex items-center justify-center p-1 shadow-sm flex-shrink-0 group-hover:border-[#D77A3C] transition-colors">
              <img src="assets/images/trailhaven-emblem.png" alt="TrailHaven Compass Logo" class="h-9 sm:h-10 w-9 sm:w-10 object-contain rounded-lg group-hover:scale-105 transition-transform flex-shrink-0">
            </div>
            <div class="flex flex-col justify-center select-none">
              <div class="flex items-baseline tracking-tight font-black leading-none font-display">
                <span class="text-xl sm:text-2xl font-black text-white">TRAIL</span><span class="text-xl sm:text-2xl font-black text-[#D77A3C]">HAVEN</span>
              </div>
              <div class="flex items-center gap-1.5 my-0.5">
                <span class="h-[2px] w-5 sm:w-6 bg-[#D77A3C] rounded-full"></span>
                <span class="h-1.5 w-1.5 rounded-full bg-[#C6AD83]"></span>
                <span class="h-[1.5px] w-12 sm:w-16 bg-[#C6AD83]/70 rounded-full"></span>
              </div>
              <span class="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#F5F1E8] leading-none">
                GEAR TODAY. GREATER TOMORROWS.
              </span>
            </div>
          </a>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Replace header logo (match the `<a href="index.html" class="flex items-center gap-[^"]*" aria-label="TrailHaven Home">...</a>` in header)
  // To avoid replacing footer logo, only search in <header>...</header>
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/);
  if (headerMatch) {
    const oldHeader = headerMatch[0];
    const newHeader = oldHeader.replace(
      /<a href="index\.html" class="flex items-center gap-[^"]*" aria-label="TrailHaven Home">[\s\S]*?<\/a>/,
      unifiedHeaderLogo
    );
    if (newHeader !== oldHeader) {
      content = content.replace(oldHeader, newHeader);
      changed = true;
    }
  }

  // Replace footer logo (match `<a href="index.html" class="inline-flex items-center gap-[^"]*" aria-label="TrailHaven Home">...</a>` in footer)
  const footerMatch = content.match(/<footer[\s\S]*?<\/footer>/);
  if (footerMatch) {
    const oldFooter = footerMatch[0];
    const newFooter = oldFooter.replace(
      /<a href="index\.html" class="inline-flex items-center gap-[^"]*" aria-label="TrailHaven Home">[\s\S]*?<\/a>/,
      unifiedFooterLogo
    );
    if (newFooter !== oldFooter) {
      content = content.replace(oldFooter, newFooter);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
  } else {
    console.log(`No change needed for ${f}`);
  }
});
