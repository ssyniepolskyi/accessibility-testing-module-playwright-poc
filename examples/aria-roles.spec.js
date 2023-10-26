const {test, chromium} = require('@playwright/test');
const {ariaRoles} = require('../src/accessibility-checks');

test('Verify that aria-roles worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto(baseUrl);

  // Call the checkAriaRoles to test ARIA roles and attributes
  await ariaRoles.checkAriaRoles(page);

  await browser.close();
});
