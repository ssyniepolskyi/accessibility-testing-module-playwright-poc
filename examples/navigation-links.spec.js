const {test, chromium} = require('@playwright/test');
const {navigationLinks} = require('../src/accessibility-checks');

test('Verify that navigation-links worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://192.168.0.8:8080';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Define the navigation links for testing
  const navigationLinksObject = [
    {
      selector: 'a[id="list-of-topics"]',
      expectedHref: `${baseUrl}/#list-of-topics`,
    },
    {
      selector: 'a[id="key-features"]',
      expectedHref: `${baseUrl}/#key-features`,
    },
    {
      selector: 'a[id="main"]',
      expectedHref: `#main`, //incorrect href
    },
  ];

  // Call the checkNavigationLinks function to test navigation links
  await navigationLinks.checkNavigationLinks(page, navigationLinksObject);

  await browser.close();
});
