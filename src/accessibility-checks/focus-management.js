/**
 * @description Check elements focus management.
 * @param {page} page The page to be tested.
 * @param {Object} components The trigger selector and expected active selector.
 * @returns {Array} An array of errors for elements with not properly managed focus.
 */

async function checkFocusManagement(page, components) {
  const errors = [];

  for (const {triggerSelector, expectedActiveSelector} of components) {
    await page.click(triggerSelector);

    // Check if the expectedActiveSelector has focus
    const hasFocus = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element === document.activeElement;
    }, expectedActiveSelector);

    if (!hasFocus) {
      errors.push(`Focus not properly managed for element triggered by ${triggerSelector}`);
    }
  }

  return errors;
}

module.exports = {checkFocusManagement};
