const {test, chromium} = require('@playwright/test');
const {focusManagement} = require('../src/accessibility-checks');

const components = [
  {
    triggerSelector: '[id="email"]',
    expectedActiveSelector: '[id="email"]',
  },
  {
    triggerSelector: '[id="password"]',
    expectedActiveSelector: '[id="password"]',
  },
];

test('Verify that focus-management worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto(baseUrl);

  // Call the checkFocusManagement function to test focus management
  await focusManagement.checkFocusManagement(page, components);

  await browser.close();
});
