var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check keyboard trap for elements.
 * @param {page} page The page to be tested.
 * @param {Object} components The elements to be tested (component includes: {openSelector, closeSelector, trapSelector}).
 * @returns {Array} An array of errors for elements with failed keyboard trap.
 */

async function checkKeyboardTraps(page, components) {
  const errors = [];

  for (const component of components) {
    const {openSelector, closeSelector, trapSelector} = component;

    // Click the trigger element to open the component
    await page.click(openSelector);

    // Check if the trap element is in focus
    const isInTrap = await page.evaluate((selector) => {
      const trapElement = document.querySelector(selector);
      return trapElement === document.activeElement;
    }, trapSelector);

    if (!isInTrap) {
      errors.push(`Keyboard trap failed for ${openSelector}`);
    }

    // Click the close element to exit the trap
    await page.click(closeSelector);

    // Check if the trap element is no longer in focus
    const isOutOfTrap = await page.evaluate((selector) => {
      const trapElement = document.querySelector(selector);
      return trapElement !== document.activeElement;
    }, trapSelector);

    if (!isOutOfTrap) {
      errors.push(`Keyboard trap failed to exit for ${closeSelector}`);
    }
  }

  if (errors.length > 0) {
    logger.error('Keyboard trap issues found:');
    logger.error(errors);
  } else {
    logger.info('No keyboard trap issues found');
  }

  return errors;
}

module.exports = {checkKeyboardTraps};
