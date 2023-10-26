const {test, chromium} = require('@playwright/test');
const {errorHandling} = require('../src/accessibility-checks');

let inputSelector = '[id="email"]';
let submitFormSelector = '[automation-id="login-btn"]';
let incorrectData = 'automation@em.com';
let errorSelector = '[class="toast"]';

test('Verify that error-handling worked correctly', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000/';

  // Navigate to the web page you want to test
  await page.goto(baseUrl);

  // Call the checkErrorHandling function to test handling of errors
  const errors = await errorHandling.checkErrorHandling(page, inputSelector, submitFormSelector, incorrectData, errorSelector);

  if (errors.length > 0) {
    console.log('Error-handling issues found:');
    console.log(errors);
  } else {
    console.log('No error-handling issues found.');
  }

  await browser.close();
});
