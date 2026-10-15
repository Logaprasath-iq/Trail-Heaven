const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('=== RESPONSIVE AUDIT FOR 360px, 768px, 1024px ===\n');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    const isInsideOverflow = line.includes('overflow-x-auto') || lines.slice(Math.max(0, idx - 3), idx).join(' ').includes('overflow-x-auto');

    // Check 1: fixed widths > 320px without max-w-full and not in overflow container
    const fixedWidthMatch = line.match(/\bw-\[(\d+)px\]/);
    if (fixedWidthMatch && parseInt(fixedWidthMatch[1]) > 320 && !line.includes('max-w') && !isInsideOverflow) {
      issues.push(`Line ${lineNum}: Fixed width w-[${fixedWidthMatch[1]}px] might overflow 360px`);
    }

    // Check 2: min-w > 320px outside of overflow-x-auto
    const minWidthMatch = line.match(/\bmin-w-\[(\d+)px\]/);
    if (minWidthMatch && parseInt(minWidthMatch[1]) > 320 && !isInsideOverflow) {
      issues.push(`Line ${lineNum}: Large min-w-[${minWidthMatch[1]}px] might overflow 360px`);
    }

    // Check 3: table not wrapped in overflow-x-auto
    if (line.includes('<table') && !line.includes('overflow-x-auto')) {
      // Check surrounding lines
      const prev = lines.slice(Math.max(0, idx - 3), idx).join(' ');
      if (!prev.includes('overflow-x-auto')) {
        issues.push(`Line ${lineNum}: <table without nearby overflow-x-auto wrapper`);
      }
    }

    // Check 4: grid-cols without responsive prefix (e.g. grid-cols-3 without sm/md/lg)
    const rawGridMatch = line.match(/\bgrid-cols-([3-9]|1[0-2])\b/);
    if (rawGridMatch && !line.includes('md:grid-cols') && !line.includes('lg:grid-cols') && !line.includes('sm:grid-cols')) {
      issues.push(`Line ${lineNum}: Unprefixed grid-cols-${rawGridMatch[1]} on mobile!`);
    }
  });

  if (issues.length > 0) {
    console.log(`📁 ${file}: ${issues.length} potential issues`);
    issues.slice(0, 5).forEach(i => console.log(`   ⚠️  ${i}`));
  } else {
    console.log(`📁 ${file}: Clean structural baseline`);
  }
});
