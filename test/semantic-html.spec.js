const {test, chromium} = require('@playwright/test');
const {semanticHTML} = require('../src/accessibility-checks');

test('Verify that semantic-html worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the web page you want to test you want to test
  await page.goto('http://localhost:3000/');

  // Call the checkPageTitles function to check semantic HTML check
  const errors = await semanticHTML.checkSemanticHTML(page);

  if (errors.length > 0) {
    console.log('Semantic-html accessibility issues found:');
    console.log(errors);
  } else {
    console.log('No semantic-html accessibility issues found.');
  }

  await browser.close();
});
