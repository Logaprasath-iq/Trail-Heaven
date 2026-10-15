const fs = require('fs');
const path = 'C:/Users/Lenovo/.gemini/antigravity/brain/f5d2fb17-4f59-492b-8e8f-015fd05db278/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('pinimg.com')) {
    console.log(`First occurrence at line ${i}`);
    const obj = JSON.parse(lines[i]);
    console.log(JSON.stringify(obj, null, 2).substring(0, 1000));
    break;
  }
}
