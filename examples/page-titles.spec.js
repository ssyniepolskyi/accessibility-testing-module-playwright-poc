const {test, chromium} = require('@playwright/test');
const {pageTitles} = require('../src/accessibility-checks');

test('Verify that page-titles worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://192.168.0.8:8080';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Define the page titles for testing
  const titles = [
    {
      expectedTitle: 'Web Accessibility 2019 Q1 BY',
      selector: 'a[id="list-of-topics"]', // Optional selector to target a specific page
    },
    {
      expectedTitle: 'Web Accessibility 2019 Q1 BY',
      selector: 'a[id="key-features"]',
    },
    {
      expectedTitle: 'Main Page',
      selector: 'a[id="main"]', //Incorrect item
    },
  ];

  // Call the checkPageTitles function to test page titles
  await pageTitles.checkPageTitles(page, titles);

  await browser.close();
});
