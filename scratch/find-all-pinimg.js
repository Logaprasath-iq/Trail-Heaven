const fs = require('fs');
const path = 'C:/Users/Lenovo/.gemini/antigravity/brain/f5d2fb17-4f59-492b-8e8f-015fd05db278/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i]) continue;
  if (lines[i].includes('pinimg.com')) {
    const item = JSON.parse(lines[i]);
    console.log(`Line ${i}: source=${item.source}, type=${item.type}, step_index=${item.step_index}`);
    if (item.content) {
      console.log('Content preview:', item.content.substring(0, 200));
    }
  }
}
