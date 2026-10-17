const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /<span class="([^"]*)"[^>]*>\s*GEAR TODAY\. GREATER TOMORROWS\.\s*<\/span>/g;
  let match;
  const classes = [];
  while ((match = regex.exec(content)) !== null) {
    classes.push(match[1]);
  }
  console.log(f, classes);
});
