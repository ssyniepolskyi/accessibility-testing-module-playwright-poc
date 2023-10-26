const {test, chromium} = require('@playwright/test');
const {colorContrast} = require('../src/accessibility-checks');

test('Verify that color-contrast worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto('http://localhost:3000');

  // Call the checkColorContrast to test color contrast
  const minimumContrastRatio = 4.5;
  await colorContrast.checkColorContrast(page, minimumContrastRatio);

  await browser.close();
});
