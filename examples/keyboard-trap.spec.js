const {test, chromium} = require('@playwright/test');
const {keyboardTraps} = require('../src/accessibility-checks');

test('Verify that keyboard-trap worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://192.168.0.8:8080';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Define the components for testing keyboard traps
  const components = [
    {
      openSelector: 'button[data-target="modal-card"]',
      closeSelector: 'button[aria-label="close"]',
      trapSelector: 'div[id="modal-card"]',
    },
    {
      openSelector: 'button[data-target="modal-card"]',
      closeSelector: 'button[aria-label="close"]',
      trapSelector: 'div[id="modal-card"]',
    },
  ];

  // Call the checkKeyboardTraps function to test keyboard traps
  await keyboardTraps.checkKeyboardTraps(page, components);

  await browser.close();
});
