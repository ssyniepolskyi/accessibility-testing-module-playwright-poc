async function findFormElements(page) {
  const formElements = await page.$$('form input, form select, form textarea');

  return formElements;
}

async function getFormElementLabels(page, formElement) {
  const labels = await page.$$(`label[for=${formElement.id}]`);

  return labels;
}

module.exports = {findFormElements, getFormElementLabels};
