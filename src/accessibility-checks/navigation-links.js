/**
 * @description Check navigation links.
 * @param {page} page The page to be tested.
 * @param {Object} navigationLinks The links to be tested (object includes: { selector, expectedHref }).
 * @returns {Array} An array of errors for elements with incorrect href.
 */

async function checkNavigationLinks(page, navigationLinks) {
  const errors = [];

  for (const link of navigationLinks) {
    const {selector, expectedHref} = link;

    const href = await page.$eval(selector, (el) => el.href);

    if (href !== expectedHref) {
      errors.push(`Navigation link ${selector} has incorrect href. Expected: ${expectedHref}, Actual: ${href}`);
    }
  }

  return errors;
}

module.exports = {checkNavigationLinks};
