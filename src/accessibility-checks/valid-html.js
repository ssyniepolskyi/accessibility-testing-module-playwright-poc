var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

const htmlValidator = require('html-validator');
/**
 * @description Validate HTML for page
 * @param {page} page The page to be tested.
 * @returns {Array} An array of errors found during HTML validation.
 */

async function validateHTML(page) {
  const errors = [];

  // Get the page's HTML content
  const htmlContent = await page.content();

  // Define the options for the HTML validation
  const validationOptions = {
    data: htmlContent,
    format: 'json',
  };

  try {
    // Perform HTML validation using the html-validator library
    const validationResults = await htmlValidator(validationOptions);

    if (validationResults.messages && validationResults.messages.length > 0) {
      for (const message of validationResults.messages) {
        errors.push(`Validation Error [${message.type}]: ${message.message}`);
      }
    }
  } catch (error) {
    errors.push('Error during HTML validation: ' + error.message);
  }

  if (errors.length > 0) {
    logger.error('HTML validation issues found:');
    logger.error(errors);
  } else {
    logger.info('No HTML validation issues found');
  }

  return errors;
}

module.exports = {validateHTML};
