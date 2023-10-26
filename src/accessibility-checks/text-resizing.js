var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check that font-size for elements as expected
 * @param {page} page The page to be tested.
 * @param {Object} elements The object of { selector -target text-, fontSize -expected font size- }
 * @returns {Array} An array of errors for not found elements or elements with not matching font size.
 */

async function checkTextResizing(page, elements) {
  const errors = [];

  for (const element of elements) {
    const {selector, fontSize} = element;

    const targetElement = await page.$(selector);

    if (!targetElement) {
      errors.push(`Element not found: ${selector}`);
      continue;
    }

    // Get the computed font size of the element
    const computedFontSize = await targetElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.fontSize;
    });

    // Compare the computed font size with the expected font size
    if (computedFontSize !== fontSize) {
      errors.push(`Font size does not match for ${selector}. Expected: ${fontSize}, Actual: ${computedFontSize}`);
    }
  }

  if (errors.length > 0) {
    logger.error('Text resizing issues found:');
    logger.error(errors);
  } else {
    logger.info('No text resizing issues found');
  }

  return errors;
}

module.exports = {checkTextResizing};
