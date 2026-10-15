const fs = require('fs');
const files = ['assets/js/data.js', 'buying-guides.html', 'guide-details.html', 'products.html', 'index.html', 'home2.html', 'about.html', 'gallery.html', 'pricing.html', 'blog.html', 'blog-details.html', 'contact.html'];
const candidates = [
  'photo-1470246973918-29a93221c455',
  'photo-1510312305653-8ed496efae75',
  'photo-1508873696983-2df5293cb325'
];
candidates.forEach(cand => {
  let found = false;
  files.forEach(f => {
    if (fs.existsSync(f)) {
      const c = fs.readFileSync(f, 'utf8');
      if (c.includes(cand)) {
        console.log(`Candidate ${cand} found in ${f}`);
        found = true;
      }
    }
  });
  if (!found) {
    console.log(`Candidate ${cand} is 100% UNIQUE & UNUSED!`);
  }
});
