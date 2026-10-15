const fs = require('fs');
const path = require('path');

const candidates = {
  // Tent candidates
  'tent_pitch_1571687949921': 'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=800&q=80',
  'tent_wind_1445307806225': 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=800&q=80',
  
  // Pack candidates
  'pack_expedition_1546938576': 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
  'pack_ultralight_1581605405': 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
  'pack_thru_1501555088': 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
  
  // Water stream candidate
  'water_stream_1432405972': 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
  
  // Maps / Navigation
  'nav_topo_maps_1478860409': 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800&q=80',
  
  // Jacket Matterhorn
  'jacket_snow_1491555103': 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80',
  
  // Stoves
  'stove_burner_1522041350': 'https://images.unsplash.com/photo-1522041350204-22285237eeca?auto=format&fit=crop&w=800&q=80',
  'stove_kettle_1780394045': 'https://images.unsplash.com/photo-1780394045328-ca3af6a19f8e?auto=format&fit=crop&w=800&q=80',
  
  // Cast iron
  'skillet_pit_1637739699': 'https://images.unsplash.com/photo-1637739699971-7d4d5194e75c?auto=format&fit=crop&w=800&q=80',
  'skillet_cook_1692313532': 'https://images.unsplash.com/photo-1692313532975-513a383c48f7?auto=format&fit=crop&w=800&q=80',
  
  // Chairs
  'chair_wild_1751570071': 'https://images.unsplash.com/photo-1751570071178-11a7ab50bcdd?auto=format&fit=crop&w=800&q=80',
  'chair_fire_1701835068': 'https://images.unsplash.com/photo-1701835068926-171d92ceca97?auto=format&fit=crop&w=800&q=80'
};

async function downloadCandidates() {
  const dir = path.join(__dirname, 'candidates');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const [name, url] of Object.entries(candidates)) {
    const dest = path.join(dir, `${name}.jpg`);
    try {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`Saved ${name}.jpg (${buf.byteLength} bytes)`);
    } catch(e) {
      console.error(`Failed ${name}:`, e.message);
    }
  }
}

downloadCandidates();
