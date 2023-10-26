var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check skip to content links.
 * @param {page} page The page to be tested.
 * @param {Object} links The object of { selector -link-, targetSelector -expected content- }.
 * @returns {Array} An array of errors for elements with incorrect href attribute or not found content link.
 */

async function checkSkipToContentLinks(page, links) {
  const errors = [];

  for (const link of links) {
    const {selector, targetSelector} = link;

    const linkElement = await page.$(selector);

    if (!linkElement) {
      errors.push(`Skip to content link not found: ${selector}`);
      continue;
    }

    const href = await linkElement.evaluate((el) => el.getAttribute('href'));

    if (href !== `#${targetSelector}`) {
      errors.push(`Skip to content link has an incorrect href attribute: ${selector}`);
    }

    // Simulate clicking the link to test if it scrolls to the target
    await linkElement.click();

    const targetElement = await page.$(targetSelector);

    if (!targetElement) {
      errors.push(`Skip to content target not found: ${targetSelector}`);
    }
  }

  if (errors.length > 0) {
    logger.error('Skip to content links issues found:');
    logger.error(errors);
  } else {
    logger.info('No skip to content links issues found');
  }
  return errors;
}

module.exports = {checkSkipToContentLinks};
