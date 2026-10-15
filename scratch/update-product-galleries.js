const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../assets/js/data.js');
let code = fs.readFileSync(dataFile, 'utf8');

const plannedGalleries = {
  'sleeping-bag-boreal': [
    'https://i.pinimg.com/736x/cd/af/06/cdaf065f4019224c4cf526838a753e74.jpg',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80'
  ],
  'tent-cascade-2p': [
    'https://i.pinimg.com/1200x/ed/c1/b8/edc1b81109e012b4447b9623811b3a55.jpg',
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
  ],
  'tent-havenwood-6p': [
    'https://i.pinimg.com/1200x/4f/29/51/4f2951071873c863a29f3191e44729e7.jpg',
    'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800&q=80'
  ],
  'pack-ridgeline-38': [
    'https://i.pinimg.com/736x/c1/e4/e3/c1e4e38e49b397e209ab747b1cb39463.jpg',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
  ],
  'sleep-pad-thermalrest': [
    'https://i.pinimg.com/1200x/99/e7/11/99e7118dc98905d9c8b91a7303fee472.jpg',
    'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534187886935-1e1236e856c3?auto=format&fit=crop&w=800&q=80'
  ],
  'light-beacon-1200': [
    'https://i.pinimg.com/1200x/b2/af/ef/b2afef673d1394ffef1712a1446f1230.jpg',
    'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=80'
  ],
  'light-headlamp-neo': [
    'https://i.pinimg.com/736x/9c/36/36/9c3636f65c3726d3e33c3e1774f0b707.jpg',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80'
  ],
  'cook-titanium-nomad': [
    'https://i.pinimg.com/1200x/54/db/d1/54dbd1697ce4776a3d56e1bb7293c64d.jpg',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=800&q=80'
  ],
  'cook-castiron-skillet': [
    'https://i.pinimg.com/736x/c9/81/ec/c981ec631cb2aca0e971bcc947d8aa5e.jpg',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  ],
  'gear-carbon-poles': [
    'https://i.pinimg.com/1200x/1a/dd/c3/1addc3b685ebeb339d3c9830425981d1.jpg',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80'
  ],
  'wear-storm-shell': [
    'https://i.pinimg.com/736x/db/ed/52/dbed52acb758f0b1ac4688fd2cb5474b.jpg',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
  ],
  'filter-pureflow-4l': [
    'https://i.pinimg.com/736x/61/6b/07/616b07f4fb1148b3cd2fbb7164ded7b8.jpg',
    'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80'
  ],
  'furniture-chair-aero': [
    'https://i.pinimg.com/1200x/52/cb/d5/52cbd5ffd211a34f7f0ca4e05ad4674f.jpg',
    'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  ],
  'nav-sighting-compass': [
    'https://i.pinimg.com/736x/7a/37/7e/7a377e26b6dcccd270226e9ba73d0619.jpg',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=800&q=80'
  ]
};

for (const [id, imgs] of Object.entries(plannedGalleries)) {
  const formattedGallery = 'gallery: [\n        "' + imgs.join('",\n        "') + '"\n      ]';
  const regex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?gallery:\\s*\\[)[\\s\\S]*?(\\])', 'm');
  
  if (regex.test(code)) {
    code = code.replace(regex, '$1\n        "' + imgs.join('",\n        "') + '"\n      $2');
    console.log(`Updated gallery for ${id}`);
  } else {
    console.error(`Could NOT match gallery for ${id}`);
  }
}

fs.writeFileSync(dataFile, code, 'utf8');
console.log('Successfully updated assets/js/data.js!');
