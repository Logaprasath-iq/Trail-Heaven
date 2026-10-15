const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('=== COMPREHENSIVE VIEWPORT & RESPONSIVE SCAN ===\n');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  const problems = [];

  lines.forEach((l, idx) => {
    const lineNum = idx + 1;

    // Check 1: fixed px widths > 320px
    const wMatch = l.match(/\b(w|min-w)-\[(\d+)px\]/);
    if (wMatch && parseInt(wMatch[2]) > 320 && !l.includes('max-w-full') && !l.includes('overflow-x-auto') && !l.includes('overflow-hidden')) {
      problems.push(`L${lineNum}: ${wMatch[0]} might exceed 360px viewport`);
    }

    // Check 2: inline style width > 320px
    const styleMatch = l.match(/width:\s*(\d+)px/);
    if (styleMatch && parseInt(styleMatch[1]) > 320 && !l.includes('max-width') && !l.includes('overflow')) {
      problems.push(`L${lineNum}: inline style width: ${styleMatch[1]}px`);
    }

    // Check 3: table without overflow-x-auto nearby
    if (l.includes('<table') && !l.includes('overflow-x-auto')) {
      const prev = lines.slice(Math.max(0, idx - 4), idx).join(' ');
      if (!prev.includes('overflow-x-auto')) {
        problems.push(`L${lineNum}: <table without nearby overflow-x-auto wrapper`);
      }
    }

    // Check 4: raw unprefixed grid-cols >= 3
    const gridMatch = l.match(/\bgrid-cols-([3-9]|1[0-2])\b/);
    if (gridMatch && !l.includes('sm:grid-cols') && !l.includes('md:grid-cols') && !l.includes('lg:grid-cols')) {
      problems.push(`L${lineNum}: unprefixed ${gridMatch[0]} on mobile`);
    }

    // Check 5: large paddings (e.g. px-12, px-16, p-12, p-16) without responsive prefixes
    const padMatch = l.match(/\b(p[xy]?)-(1[0-9]|2[0-4])\b/);
    if (padMatch && !l.includes('sm:' + padMatch[0]) && !l.includes('md:' + padMatch[0]) && !l.includes('lg:' + padMatch[0])) {
      // Check if it's already prefixed
      const rawPad = padMatch[0];
      const padIdx = l.indexOf(rawPad);
      const prefix = l.slice(Math.max(0, padIdx - 4), padIdx);
      if (!prefix.includes(':')) {
        problems.push(`L${lineNum}: large mobile padding ${rawPad}`);
      }
    }
  });

  if (problems.length > 0) {
    console.log(`📁 ${f}: ${problems.length} items`);
    problems.forEach(p => console.log(`   ⚠️  ${p}`));
  } else {
    console.log(`📁 ${f}: Clean`);
  }
});
