const {test, chromium} = require('@playwright/test');
const {altText} = require('../src/accessibility-checks');

test('Verify that alt-text worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto(baseUrl);

  // Call the checkAltText to test alt text attribute for all images on the page
  const errors = await altText.checkAltText(page);

  if (errors.length > 0) {
    console.log('Accessibility issues found:');
    console.log(errors);
  } else {
    console.log('No accessibility issues found.');
  }

  await browser.close();
});
