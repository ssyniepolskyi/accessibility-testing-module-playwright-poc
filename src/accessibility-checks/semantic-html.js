const {findElementsBySelector, getTagName} = require('../utils/dom-traversal');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'error';

/**
 * @description Check semantic usage of HTML tags
 * @param {page} page The page to be tested.
 * @returns {Array} An array of errors for elements with missing semantic or incorrect usage.
 */

async function checkSemanticHTML(page) {
  const errors = [];

  // Check semantic usage of headings
  const headingSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  for (const selector of headingSelectors) {
    const headings = await findElementsBySelector(page, selector);
    for (const heading of headings) {
      if (!heading) {
        errors.push(`Missing semantic ${selector} element.`);
      } else {
        const tagName = await getTagName(heading);
        if (tagName.toLowerCase() !== selector) {
          errors.push(`Incorrect usage of ${selector}. Found ${tagName} element.`);
        }
      }
    }
  }

  // Check semantic usage of lists
  const listSelectors = ['ul', 'ol', 'li'];
  for (const selector of listSelectors) {
    const lists = await findElementsBySelector(page, selector);
    for (const list of lists) {
      if (!list) {
        errors.push(`Missing semantic ${selector} element.`);
      }
    }
  }

  if (errors.length > 0) {
    logger.error('Semantic issues found:');
    logger.error(errors);
  } else {
    logger.info('No semantic issues found');
  }

  return errors;
}

module.exports = {checkSemanticHTML};
