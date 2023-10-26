async function findElementsWithAriaAttributes(page) {
  return await page.$$('*'); // Select all elements on the page
}

async function getAriaRoleAttributes(element) {
  const attributes = await element.evaluate((el) => {
    const ariaAttributes = {};
    for (const attribute of el.attributes) {
      if (attribute.name.startsWith('role')) {
        ariaAttributes[attribute.name] = attribute.value;
      }
    }
    return ariaAttributes;
  });

  return attributes;
}

module.exports = {findElementsWithAriaAttributes, getAriaRoleAttributes};
