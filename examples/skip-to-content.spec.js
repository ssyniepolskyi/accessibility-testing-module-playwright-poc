const {test, chromium} = require('@playwright/test');
const {skipToContentLinks} = require('../src/accessibility-checks');

test('Verify that skip-to-content-links worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://192.168.0.8:8080';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Define the "skip to content" links for testing
  const skipToContentLinksObject = [
    {
      selector: 'a[id="main"]',
      targetSelector: 'main',
    },
    {
      selector: 'a[id="helpfull-links"]',
      targetSelector: 'footer',
    },
    {
      selector: 'a#upcoming-events',
      targetSelector: 'upcoming-events', //incorrect item
    },
  ];

  // Call the checkSkipToContentLinks function to test "skip to content" links
  await skipToContentLinks.checkSkipToContentLinks(page, skipToContentLinksObject);

  await browser.close();
});
