const {findFormElements, getFormElementLabels} = require('../utils/form-helpers');
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check that label is accessible for elements.
 * @param {page} page The page to be tested.
 * @returns {Array} An array of errors for elements with  inaccessible label.
 */

async function checkFormLabels(page) {
  const errors = [];

  const formElements = await findFormElements(page);

  for (const formElement of formElements) {
    const labels = await getFormElementLabels(page, formElement);

    if (labels.length === 0) {
      errors.push(`Form element ${formElement} is missing a label.`);
    } else {
      for (const label of labels) {
        const isLabelAccessible = await label.isIntersectingViewport();
        if (!isLabelAccessible) {
          errors.push(`Label "${label.textContent()}" for form element ${formElement} is not accessible.`);
        }
      }
    }
  }

  if (errors.length > 0) {
    logger.error('Label accessibility issues found:');
    logger.error(errors);
  } else {
    logger.info('No label accessibility issues found');
  }

  return errors;
}

module.exports = {checkFormLabels};
