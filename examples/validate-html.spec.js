const {test, chromium} = require('@playwright/test');
const {validHtml} = require('../src/accessibility-checks');

test('Verify that valid-html worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Call the validateHTML function to test HTML validity
  await validHtml.validateHTML(page);

  await browser.close();
});
