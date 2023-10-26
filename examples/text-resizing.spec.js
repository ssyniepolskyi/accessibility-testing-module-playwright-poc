const {test, chromium} = require('@playwright/test');
const {textResizing} = require('../src/accessibility-checks');

test('Verify that text-resizing worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://192.168.0.8:8080';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  // Define the elements and the expected font size for testing
  const elements = [
    {
      selector: 'h2[id="about-us-info"]',
      fontSize: '40px',
    },
    {
      selector: 'h2[id="l-upcoming-events"]',
      fontSize: '40px',
    },
    {
      selector: 'h1[id="topics"]',
      fontSize: '34px', //incorrect item
    },
  ];

  // Call the checkTextResizing function to test text resizing
  await textResizing.checkTextResizing(page, elements);

  await browser.close();
});
