const {submitFormWithIncorrectData} = require('../utils/form-submission');

/**
 * @description Check error-handling.
 * @param {page} page The page to be tested.
 * @param {string} inputSelector Input selector to be tested.
 * @param {string} submitFormSelector Submit form selector to be tested.
 * @param {string} incorrectData Incorrect data to check error message.
 * @param {string} errorSelector Error message selector to be checked.
 * @returns {Array} An array of errors for no-show error message .
 */

async function checkErrorHandling(page, inputSelector, submitFormSelector, incorrectData, errorSelector) {
  const errors = [];

  // Submit the form with incorrect data
  await submitFormWithIncorrectData(page, inputSelector, submitFormSelector, incorrectData);

  await new Promise((r) => setTimeout(r, 500));
  // Check if an error message is displayed
  const errorMessageElement = await page.$(errorSelector);

  if (!errorMessageElement) {
    errors.push(`Error message not displayed for input: ${inputSelector}`);
  }

  return errors;
}

module.exports = {checkErrorHandling};
