const fs = require('fs');
const transcriptPath = 'C:/Users/Lenovo/.gemini/antigravity/brain/f5d2fb17-4f59-492b-8e8f-015fd05db278/.system_generated/logs/transcript.jsonl';

if (fs.existsSync(transcriptPath)) {
  const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.includes('add related images') || l.includes('pinimg.com')) {
      console.log(`Line ${i}: ${l.substring(0, 150)}`);
    }
  });
} else {
  console.log('Transcript file not found');
}
