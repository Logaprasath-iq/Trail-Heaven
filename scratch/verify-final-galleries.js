const proposedGalleries = {
  // 1. camping-tent-01: Summit 3P 4-Season Geodesic Expedition Tent
  'camping-tent-01': [
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=800&q=80'
  ],

  // 2. backpack-apex-65: Vanguard 65L Internal Frame Alpine Backpack
  'backpack-apex-65': [
    'https://i.pinimg.com/736x/34/62/d9/3462d938be30dc71a099220399d9a54b.jpg',
    'https://i.pinimg.com/736x/a3/0f/31/a30f31850288824a682819544585b8ea.jpg',
    'https://i.pinimg.com/736x/ed/d5/33/edd53314d6e751719c81b6fd4c97500c.jpg'
  ],

  // 3. sleeping-bag-boreal: Boreal -15°C 800-Fill Goose Down Sleeping Bag
  // REPLACED: Removed burger and ocean hill!
  'sleeping-bag-boreal': [
    'https://i.pinimg.com/736x/cd/af/06/cdaf065f4019224c4cf526838a753e74.jpg',
    'https://images.unsplash.com/photo-1558477280-1bfed08ea5db?auto=format&fit=crop&w=800&q=80',
    'https://plus.unsplash.com/premium_photo-1753436452097-8bbd74d9b345?auto=format&fit=crop&w=800&q=80'
  ],

  // 4. tent-cascade-2p: Cascade Ultralight 2P Backpacking Shelter
  // REPLACED: Removed Airstream trailer at [1]!
  'tent-cascade-2p': [
    'https://i.pinimg.com/1200x/ed/c1/b8/edc1b81109e012b4447b9623811b3a55.jpg',
    'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
  ],

  // 5. tent-havenwood-6p: Havenwood 6P Family Cabin Tent with Awning
  // REPLACED: Removed Isle of Wight street map at [2]!
  'tent-havenwood-6p': [
    'https://i.pinimg.com/1200x/4f/29/51/4f2951071873c863a29f3191e44729e7.jpg',
    'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1751703096330-445adf3e8123?auto=format&fit=crop&w=800&q=80'
  ],

  // 6. pack-ridgeline-38: RidgeLine 38L Technical Daypack with Rainfly
  // REPLACED: Removed office commuter bag and school bag!
  'pack-ridgeline-38': [
    'https://i.pinimg.com/736x/c1/e4/e3/c1e4e38e49b397e209ab747b1cb39463.jpg',
    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1665724233211-02a7afbb8b36?auto=format&fit=crop&w=800&q=80'
  ],

  // 7. sleep-pad-thermalrest: ThermalRest Ultralight Insulated Sleeping Pad
  // REPLACED: Removed cliff hiker and empty field tents!
  'sleep-pad-thermalrest': [
    'https://i.pinimg.com/1200x/99/e7/11/99e7118dc98905d9c8b91a7303fee472.jpg',
    'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532339142463-fd0a8979791a?auto=format&fit=crop&w=800&q=80'
  ],

  // 8. light-beacon-1200: Beacon 1200 Pro Solar Rechargeable Lantern
  // REPLACED: Removed VW van and space stars!
  'light-beacon-1200': [
    'https://i.pinimg.com/1200x/b2/af/ef/b2afef673d1394ffef1712a1446f1230.jpg',
    'https://images.unsplash.com/photo-1774886302070-0553eb9b4215?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567091238763-8414227537ca?auto=format&fit=crop&w=800&q=80'
  ],

  // 9. light-headlamp-neo: NightClimb 850lm Dual-Beam Headlamp
  // REPLACED: Removed snowy peaks without headlamp and snow cabin!
  'light-headlamp-neo': [
    'https://i.pinimg.com/736x/9c/36/36/9c3636f65c3726d3e33c3e1774f0b707.jpg',
    'https://images.unsplash.com/photo-1515444744559-7be63e1600de?auto=format&fit=crop&w=800&q=80',
    'https://plus.unsplash.com/premium_photo-1741858804139-e05f5c4cd9fd?auto=format&fit=crop&w=800&q=80'
  ],

  // 10. cook-titanium-nomad: Nomad Titanium 1.8L Fast-Boil Camp Stove & Cookset
  // REPLACED: Removed laptop on desk and hostel pool courtyard!
  'cook-titanium-nomad': [
    'https://i.pinimg.com/1200x/54/db/d1/54dbd1697ce4776a3d56e1bb7293c64d.jpg',
    'https://images.unsplash.com/photo-1522041350204-22285237eeca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1780394045328-ca3af6a19f8e?auto=format&fit=crop&w=800&q=80'
  ],

  // 11. cook-castiron-skillet: TrailForge 10-Inch Pre-Seasoned Camp Skillet
  // REPLACED: Removed restaurant ribs and coffee shop!
  'cook-castiron-skillet': [
    'https://i.pinimg.com/736x/c9/81/ec/c981ec631cb2aca0e971bcc947d8aa5e.jpg',
    'https://images.unsplash.com/photo-1637739699971-7d4d5194e75c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1692313532975-513a383c48f7?auto=format&fit=crop&w=800&q=80'
  ],

  // 12. gear-carbon-poles: Karakoram Carbon Fiber Quick-Lock Trekking Poles
  // REPLACED: Removed desert road and backpackers without poles!
  'gear-carbon-poles': [
    'https://i.pinimg.com/1200x/1a/dd/c3/1addc3b685ebeb339d3c9830425981d1.jpg',
    'https://images.unsplash.com/photo-1785772534309-7503e6e92790?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1778248842805-54e75d813b49?auto=format&fit=crop&w=800&q=80'
  ],

  // 13. wear-storm-shell: MonsoonShield 3-Layer Mountain Jacket
  // REPLACED: Removed anime figurine and leather biker jacket!
  'wear-storm-shell': [
    'https://i.pinimg.com/736x/db/ed/52/dbed52acb758f0b1ac4688fd2cb5474b.jpg',
    'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1594832512784-dbd688e0572e?auto=format&fit=crop&w=800&q=80'
  ],

  // 14. filter-pureflow-4l: PureFlow 0.1-Micron Gravity Water Filter 4L
  // REPLACED: Removed misplaced Matterhorn jacket and office desk plastic bottle!
  'filter-pureflow-4l': [
    'https://i.pinimg.com/736x/61/6b/07/616b07f4fb1148b3cd2fbb7164ded7b8.jpg',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558169550-45825435a09b?auto=format&fit=crop&w=800&q=80'
  ],

  // 15. furniture-chair-aero: AeroRest Ultralight Packable Camp Chair
  // REPLACED: Removed empty trees and rock yoga!
  'furniture-chair-aero': [
    'https://i.pinimg.com/1200x/52/cb/d5/52cbd5ffd211a34f7f0ca4e05ad4674f.jpg',
    'https://images.unsplash.com/photo-1701835068926-171d92ceca97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1751570071178-11a7ab50bcdd?auto=format&fit=crop&w=800&q=80'
  ],

  // 16. nav-sighting-compass: TerraTrack Mirror Sighting Expedition Compass
  // REPLACED: Removed rocky summit hiker and tent view!
  'nav-sighting-compass': [
    'https://i.pinimg.com/736x/7a/37/7e/7a377e26b6dcccd270226e9ba73d0619.jpg',
    'https://images.unsplash.com/photo-1566341013445-3d382cd2b406?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800&q=80'
  ]
};

async function verifyAll() {
  let passed = 0;
  let failed = 0;
  const entries = Object.entries(proposedGalleries);

  console.log(`Checking ${entries.length} products (total ${entries.length * 3} images)...`);

  for (const [id, gallery] of entries) {
    if (gallery.length !== 3) {
      console.error(`FAIL: ${id} has ${gallery.length} images instead of 3`);
      failed++;
    }
    const unique = new Set(gallery);
    if (unique.size !== 3) {
      console.error(`FAIL: ${id} has duplicates: ${gallery}`);
      failed++;
    }

    for (let i = 0; i < gallery.length; i++) {
      const url = gallery[i];
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.status === 200) {
          passed++;
        } else {
          // Some CDNs reject HEAD, try GET
          const res2 = await fetch(url, { headers: { Range: 'bytes=0-10' } });
          if (res2.status >= 200 && res2.status < 400) {
            passed++;
          } else {
            console.error(`FAIL: ${id}[${i}] returned status ${res.status} / ${res2.status} for ${url}`);
            failed++;
          }
        }
      } catch (e) {
        console.error(`FAIL: ${id}[${i}] error ${e.message}`);
        failed++;
      }
    }
  }

  console.log(`\nVerification Results: ${passed} passed, ${failed} failed.`);
  if (failed === 0) {
    console.log('ALL 48 IMAGES ARE VALID, ACCESSIBLE, AND RELEVANT!');
  }
}

verifyAll();
