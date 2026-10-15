const fs = require('fs');
const files = ['assets/js/data.js', 'about.html', 'buying-guides.html', 'guide-details.html', 'products.html', 'index.html', 'home2.html', 'gallery.html', 'pricing.html', 'blog.html', 'blog-details.html', 'contact.html'];

const candidates = {
  down: [
    'photo-1544816155-12df9643f363',
    'photo-1517841905240-472988babdf9',
    'photo-1578632767115-351597cf2477',
    'photo-1545205597-3d9d02c29597',
    'photo-1483921020237-2ff51e8e4b22',
    'photo-1516939884455-1445c8652f83',
    'photo-1548767797-d8c844163c4c'
  ],
  titanium: [
    'photo-1584824486509-112e4181ff6b',
    'photo-1517646287270-a5a9ca602e5c',
    'photo-1509198397868-475647b2a1e5',
    'photo-1516962215378-7fa2e137ae93',
    'photo-1563245372-f21724e3856d'
  ],
  cordura: [
    'photo-1558769132-cb1aea458c5e',
    'photo-1607344645866-009c320c5ab8',
    'photo-1523381210434-271e8be1f52b',
    'photo-1551232864-3f0890e580d9',
    'photo-1620799140408-edc6dcb6d633'
  ],
  dacPoles: [
    'photo-1506744038136-46273834b3fb',
    'photo-1510312305653-8ed496efae75',
    'photo-1504851149312-7a075b496cc7',
    'photo-1464822759023-fed622ff2c3b',
    'photo-1519985176271-adb1088fa94c'
  ]
};

for (const [category, list] of Object.entries(candidates)) {
  console.log(`\nTesting category: ${category}`);
  list.forEach(id => {
    let found = false;
    files.forEach(f => {
      if (fs.existsSync(f)) {
        const c = fs.readFileSync(f, 'utf8');
        if (c.includes(id)) {
          found = true;
        }
      }
    });
    if (!found) {
      console.log(`  [AVAILABLE] ${id}`);
    } else {
      console.log(`  [IN USE]    ${id}`);
    }
  });
}
