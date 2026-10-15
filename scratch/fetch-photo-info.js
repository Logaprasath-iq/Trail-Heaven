async function fetchPhotoUrl(pageUrl) {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });
    console.log(pageUrl, 'Status:', res.status);
    if (res.status !== 200) return null;
    const text = await res.text();
    const matches = text.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    if (matches && matches.length) {
      const unique = [...new Set(matches)];
      console.log('Found image:', unique[0]);
      return unique[0];
    }
  } catch (e) {
    console.error('Error fetching', pageUrl, e.message);
  }
  return null;
}

const pages = [
  'https://unsplash.com/photos/cast-iron-pan-cooking-steak-over-a-glowing-campfire-0xw02zgRQeA',
  'https://unsplash.com/photos/two-person-sitting-on-camping-chairs-while-watching-mountain-5c5X0b1t2uI',
  'https://unsplash.com/photos/man-sitting-on-black-camping-chair-beside-green-dome-tent-g30p61x542Y',
  'https://unsplash.com/photos/red-and-black-camping-chair-on-river-during-daytime-xW1XQ0bZ9lY'
];

async function run() {
  for (const p of pages) {
    await fetchPhotoUrl(p);
  }
}
run();
