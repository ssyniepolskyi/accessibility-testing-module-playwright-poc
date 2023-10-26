var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check page title after navigation.
 * @param {page} page The page to be tested.
 * @param {Array} titles Expected titles.
 * @returns {Array} An array of errors for pages with not matching title.
 */

async function checkPageTitles(page, titles) {
  const errors = [];

  for (const title of titles) {
    const {expectedTitle, selector} = title;

    const pageTitle = await page.title();

    if (pageTitle !== expectedTitle) {
      errors.push(`Page title does not match for ${selector}. Expected: ${expectedTitle}, Actual: ${pageTitle}`);
    }
  }

  if (errors.length > 0) {
    logger.error('Page titles issues found:');
    logger.error(errors);
  } else {
    logger.info('No page titles issues found');
  }

  return errors;
}

module.exports = {checkPageTitles};
