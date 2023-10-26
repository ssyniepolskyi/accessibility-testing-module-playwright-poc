const {test, chromium} = require('@playwright/test');
const {textAlternatives} = require('../src/accessibility-checks');

test('Verify that text-alternatives worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://192.168.0.8:8080';

  // Navigate to the web page you want to test you want to test
  await page.goto(baseUrl);

  const elements = [
    {
      selector: 'img#image1',
      textAlternative: 'beautiful image 1',
    },
    {
      selector: 'img#image2',
      textAlternative: 'beautiful image 2',
    },
    {
      selector: 'img#image3',
      textAlternative: 'also beautiful image',
    },
    {
      selector: 'img#image3',
      textAlternative: 'incorrect alt text', //incorrect item
    },
  ];

  //Call the checkTextAlternatives function to test text alternatives
  const errors = await textAlternatives.checkTextAlternatives(page, elements);

  if (errors.length === 0) {
    console.log('Text alternatives are correct.');
  } else {
    console.error('Text alternative issues found:');
    for (const error of errors) {
      console.error(error);
    }
  }

  await browser.close();
});
