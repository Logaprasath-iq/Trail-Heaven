const fs = require('fs');

console.log('========================================================');
console.log('🧪 TESTING STRICT FORM VALIDATION & RESTRICTIONS');
console.log('========================================================\n');

// Load forms.js by evaluating the FormsManager object
const formsContent = fs.readFileSync('assets/js/forms.js', 'utf8');

// Create mock environment
const mockWindow = {
  CartManager: { getCart: () => [], getTotals: () => ({}) },
  showToast: () => {}
};
const mockDocument = {
  querySelectorAll: () => [],
  getElementById: () => null,
  querySelector: () => null,
  addEventListener: () => {}
};

const fn = new Function('window', 'document', `${formsContent}; return FormsManager;`);
const FormsManager = fn(mockWindow, mockDocument);

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

// 1. NAME VALIDATION TESTS (No numbers, min 2 letters)
console.log('--- 1. NAME VALIDATION TESTS ---');
assert(!FormsManager.isValidName('56'), 'Rejects numeric name "56"');
assert(!FormsManager.isValidName('456'), 'Rejects numeric name "456"');
assert(!FormsManager.isValidName('John12'), 'Rejects alphanumeric name "John12"');
assert(!FormsManager.isValidName('A'), 'Rejects single-letter name "A" (minimum 2 letters required)');
assert(!FormsManager.isValidName(''), 'Rejects empty name');
assert(FormsManager.isValidName('Jo'), 'Accepts valid 2-letter name "Jo"');
assert(FormsManager.isValidName('Ramesh Krishnan'), 'Accepts valid name "Ramesh Krishnan"');
assert(FormsManager.isValidName("Aditi Sharma"), 'Accepts valid name "Aditi Sharma"');
assert(FormsManager.isValidName("Mary-Jane O'Connor"), 'Accepts valid hyphenated/apostrophe name');

// 2. PHONE NUMBER VALIDATION TESTS (No letters, 10 digits)
console.log('\n--- 2. PHONE NUMBER VALIDATION TESTS ---');
assert(!FormsManager.isValidPhone('cfghj'), 'Rejects alphabetic phone "cfghj"');
assert(!FormsManager.isValidPhone('bhjj'), 'Rejects alphabetic phone "bhjj"');
assert(!FormsManager.isValidPhone('98765abcde'), 'Rejects alphanumeric phone "98765abcde"');
assert(!FormsManager.isValidPhone('12345'), 'Rejects short phone "12345"');
assert(!FormsManager.isValidPhone(''), 'Rejects empty phone');
assert(FormsManager.isValidPhone('9876543210'), 'Accepts valid 10-digit phone "9876543210"');
assert(FormsManager.isValidPhone('+919876543210'), 'Accepts valid international phone "+919876543210"');
assert(FormsManager.isValidPhone('+91 98765 43210'), 'Accepts formatted phone with spaces');

// 3. CITY & STATE VALIDATION TESTS (No numbers, min 2 letters)
console.log('\n--- 3. CITY & STATE VALIDATION TESTS ---');
assert(!FormsManager.isValidPlace('544'), 'Rejects numeric city "544"');
assert(!FormsManager.isValidPlace('6534'), 'Rejects numeric state "6534"');
assert(!FormsManager.isValidPlace('A'), 'Rejects single-letter place "A"');
assert(!FormsManager.isValidPlace(''), 'Rejects empty place');
assert(FormsManager.isValidPlace('Bengaluru'), 'Accepts valid city "Bengaluru"');
assert(FormsManager.isValidPlace('Karnataka'), 'Accepts valid state "Karnataka"');
assert(FormsManager.isValidPlace('Tamil Nadu'), 'Accepts multi-word state "Tamil Nadu"');
assert(FormsManager.isValidPlace('New Delhi'), 'Accepts multi-word city "New Delhi"');

// 4. PIN CODE VALIDATION TESTS (No letters, exactly 6 digits)
console.log('\n--- 4. PIN CODE VALIDATION TESTS ---');
assert(!FormsManager.isValidPincode('hv'), 'Rejects alphabetic PIN "hv"');
assert(!FormsManager.isValidPincode('56010a'), 'Rejects alphanumeric PIN "56010a"');
assert(!FormsManager.isValidPincode('12345'), 'Rejects 5-digit PIN');
assert(!FormsManager.isValidPincode('1234567'), 'Rejects 7-digit PIN');
assert(!FormsManager.isValidPincode('012345'), 'Rejects leading zero PIN');
assert(!FormsManager.isValidPincode(''), 'Rejects empty PIN');
assert(FormsManager.isValidPincode('560103'), 'Accepts valid PIN "560103"');
assert(FormsManager.isValidPincode('600001'), 'Accepts valid PIN "600001"');

// 5. EMAIL VALIDATION TESTS
console.log('\n--- 5. EMAIL VALIDATION TESTS ---');
assert(!FormsManager.isValidEmail('logaprasath2003'), 'Rejects email without domain "logaprasath2003"');
assert(!FormsManager.isValidEmail('test@'), 'Rejects incomplete email "test@"');
assert(FormsManager.isValidEmail('logaprasath2003@gmail.com'), 'Accepts valid email');
assert(FormsManager.isValidEmail('aditi@example.com'), 'Accepts valid email "aditi@example.com"');

console.log('\n========================================================');
console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================================');

if (failed > 0) process.exit(1);
