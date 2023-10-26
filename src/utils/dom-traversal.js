async function findElementsBySelector(page, selector) {
  return await page.$$(selector);
}

async function getTagName(element) {
  const tagNameHandle = await element.getProperty('tagName');
  return await tagNameHandle.jsonValue();
}

async function getComputedStyle(element) {
  const computedStyle = await element.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
    };
  });
  return computedStyle;
}

module.exports = {findElementsBySelector, getTagName, getComputedStyle};
