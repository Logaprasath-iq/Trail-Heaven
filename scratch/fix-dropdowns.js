const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Match from <div class="absolute top-full left-0 mt-1.5 until </button>\s*</div> ... wait, let's look at the container:
  // <div class="relative group" id="home-dropdown-nav">
  //   <button ...>...</button>
  //   ... everything inside until </div> that closes #home-dropdown-nav (right before <a href="about.html")
  
  const regex = /(<div class="relative group" id="home-dropdown-nav">\s*<button[\s\S]*?<\/button>)[\s\S]*?(?=\s*<a href="about\.html")/g;

  content = content.replace(regex, (match, p1) => {
    return `${p1}
            <div class="absolute top-full left-0 mt-1.5 w-36 bg-[#F5F1E8] dark:bg-[#1E2420] rounded-2xl shadow-xl border border-[#E2DACB] dark:border-[#2D372F] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="index.html" class="block px-3 py-2 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                Home
              </a>
              <a href="home2.html" class="block px-3 py-2 rounded-xl hover:bg-sand/20 dark:hover:bg-sand/10 text-xs font-bold text-forest dark:text-cream hover:text-orange transition">
                Home 2
              </a>
            </div>
          </div>`;
  });

  fs.writeFileSync(f, content, 'utf8');
  console.log(`Cleaned up ${f}`);
});
