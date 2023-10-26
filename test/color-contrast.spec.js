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
  const contrastErrors = await colorContrast.checkColorContrast(page, minimumContrastRatio);

  if (contrastErrors.length === 0) {
    console.log('Color contrast is compliant.');
  } else {
    console.log('Color contrast issues found:');
    console.log(contrastErrors);
  }

  await browser.close();
});
