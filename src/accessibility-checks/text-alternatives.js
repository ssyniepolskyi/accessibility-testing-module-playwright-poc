var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check alt text for elements
 * @param {page} page The page to be tested.
 * @param {Object} elements The object of { selector -for which we check alt text-, textAlternative -expected alt text- }
 * @returns {Array} An array of errors for not found elements or elements with not matching alternative text.
 */

async function checkTextAlternatives(page, elements) {
  const errors = [];

  for (const element of elements) {
    const {selector, textAlternative} = element;

    const targetElement = await page.$(selector);

    if (!targetElement) {
      errors.push(`Element not found: ${selector}`);
      continue;
    }

    const altText = await targetElement.evaluate((el) => el.alt);

    if (altText !== textAlternative) {
      errors.push(`Text alternative does not match for ${selector}. Expected: ${textAlternative}, Actual: ${altText}`);
    }
  }

  if (errors.length > 0) {
    logger.error('Text alternative issues found:');
    logger.error(errors);
  } else {
    logger.info('No text alternative issues found');
  }

  return errors;
}

module.exports = {checkTextAlternatives};
