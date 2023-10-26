async function submitFormWithIncorrectData(page, inputSelector, submitFormSelector, incorrectData) {
  await page.fill(inputSelector, incorrectData);
  await page.click(submitFormSelector);
}

module.exports = {submitFormWithIncorrectData};
