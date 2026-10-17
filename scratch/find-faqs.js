const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Check for FAQ accordion buttons or question elements
  const accordionButtons = content.match(/class="[^"]*(?:faq-toggle|faq-btn|accordion-btn|faq-trigger)[^"]*"/gi) || [];
  const faqItems = content.match(/class="[^"]*faq-item[^"]*"/gi) || [];
  const faqAnswers = content.match(/class="[^"]*faq-answer[^"]*"/gi) || [];
  const faqTitles = content.match(/<h[234][^>]*>[\s\S]*?(?:Frequently Asked Questions|FAQ|Common Questions)[\s\S]*?<\/h[234]>/gi) || [];
  
  if (accordionButtons.length || faqItems.length || faqAnswers.length || faqTitles.length) {
    console.log(`=== ${f} ===`, {
      buttons: accordionButtons.length,
      items: faqItems.length,
      answers: faqAnswers.length,
      titles: faqTitles
    });
  }
});
