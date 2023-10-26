/**
 * @description Check keyboard navigation for elements.
 * @param {page} page The page to be tested.
 * @param {Object} components The elements to be tested.
 * @returns {Array} An array of errors for elements with failed navigation.
 */

async function checkKeyboardNavigation(page, components) {
  const errors = [];

  for (const component of components) {
    const {triggerSelector, targetSelector} = component;

    // Click the trigger element to activate the component
    await page.click(triggerSelector);

    // Simulate keyboard navigation to test focus management
    await page.keyboard.press('Tab');

    // Check if the target element has focus
    const hasFocus = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element === document.activeElement;
    }, targetSelector);

    if (!hasFocus) {
      errors.push(`Keyboard navigation failed for ${triggerSelector} to ${targetSelector}`);
    }
  }

  return errors;
}

module.exports = {checkKeyboardNavigation};
