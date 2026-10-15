const fs = require('fs');
const path = 'C:/Users/Lenovo/.gemini/antigravity/brain/f5d2fb17-4f59-492b-8e8f-015fd05db278/.system_generated/logs/transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 2174; i <= 2268; i++) {
  if (!lines[i]) continue;
  const item = JSON.parse(lines[i]);
  if (item.tool_calls) {
    item.tool_calls.forEach(tc => {
      if (tc.name === 'replace_file_content' || tc.name === 'write_to_file') {
        const content = tc.args.ReplacementContent || tc.args.CodeContent || '';
        const pinMatches = content.match(/https:\/\/i\.pinimg\.com[^\s\"']+/g);
        if (pinMatches) {
          console.log(`Step ${i} (${tc.name}):`, pinMatches);
        }
      }
    });
  }
}
