const {test, chromium} = require('@playwright/test');
const {keyboardNavigation} = require('../src/accessibility-checks');

test('Verify that keyboard-navigation worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl); // Replace with your target URL

  // Define the components for testing keyboard navigation
  const components = [
    {
      triggerSelector: '[id="email"]',
      targetSelector: '[id="password"]',
    },
    {
      triggerSelector: '[id="password"]',
      targetSelector: '[automation-id="login-btn"]',
    },
    {
      triggerSelector: '[automation-id="login-btn"]',
      targetSelector: '[automation-id="register-btn"]',
    },
  ];

  // Call the checkKeyboardNavigation function to test keyboard navigation
  const errors = await keyboardNavigation.checkKeyboardNavigation(page, components);

  if (errors.length === 0) {
    console.log('Keyboard navigation is working correctly.');
  } else {
    console.error('Keyboard navigation issues found:');
    for (const error of errors) {
      console.error(error);
    }
  }

  await browser.close();
});
