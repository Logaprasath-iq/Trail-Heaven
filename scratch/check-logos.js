const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const headerLogoRegex = /<a href="index\.html" class="flex items-center gap-[^"]*" aria-label="TrailHaven Home">([\s\S]*?)<\/a>/;
const footerLogoRegex = /<a href="index\.html" class="inline-flex items-center gap-[^"]*" aria-label="TrailHaven Home">([\s\S]*?)<\/a>/;

const hMatch = content.match(headerLogoRegex);
const fMatch = content.match(footerLogoRegex);

console.log('=== HEADER LOGO IN index.html ===');
console.log(hMatch ? hMatch[0] : 'Not found');

console.log('\n=== FOOTER LOGO IN index.html ===');
console.log(fMatch ? fMatch[0] : 'Not found');
