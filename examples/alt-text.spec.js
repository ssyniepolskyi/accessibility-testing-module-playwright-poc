const {test, chromium} = require('@playwright/test');
const {altText} = require('../src/accessibility-checks');

test('Verify that alt-text worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto(baseUrl);

  // Call the checkAltText to test alt text attribute for all images on the page
  await test.step('Accessibility Check', async() => {
    await altText.checkAltText(page);
  })

  await browser.close();
});
