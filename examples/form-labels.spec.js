const {test, chromium} = require('@playwright/test');
const {formLabels} = require('../src/accessibility-checks');

test('Verify that form-labels worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto(baseUrl);

  // Call the checkFormLabels function to test form labels accessibility
  await formLabels.checkFormLabels(page);

  await browser.close();
});
