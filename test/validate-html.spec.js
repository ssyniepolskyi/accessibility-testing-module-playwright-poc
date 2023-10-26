const {test, chromium} = require('@playwright/test');
const {validHtml} = require('../src/accessibility-checks');

test('Verify that valid-html worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Call the validateHTML function to test HTML validity
  const errors = await validHtml.validateHTML(page);

  if (errors.length === 0) {
    console.log('HTML markup is valid.');
  } else {
    console.error('HTML markup validation issues found:');
    for (const error of errors) {
      console.error(error);
    }
  }

  await browser.close();
});
