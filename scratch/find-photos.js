async function checkPhoto(id) {
  try {
    const res = await fetch(`https://unsplash.com/photos/${id}/download?force=true`, {
      redirect: 'manual',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log(id, 'Download redirect status:', res.status, 'Location:', res.headers.get('location'));
    const loc = res.headers.get('location');
    if (loc) {
      const u = new URL(loc);
      return `${u.origin}${u.pathname}?auto=format&fit=crop&w=800&q=80`;
    }
  } catch (e) {
    console.error(id, e.message);
  }
}

async function run() {
  const ids = ['pq8sKcj9KMk', '1k8oapvlyfI', 'NuKM3cAAXSs', 'HW3-TXyfMlY'];
  for (const id of ids) {
    const img = await checkPhoto(id);
    console.log(id, '=>', img);
  }
}
run();
