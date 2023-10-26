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

  return errors;
}

module.exports = {checkSkipToContentLinks};
