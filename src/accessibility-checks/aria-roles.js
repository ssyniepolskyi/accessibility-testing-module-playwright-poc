const {findElementsWithAriaAttributes, getAriaRoleAttributes} = require('../utils/aria-helper');
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

const semanticAriaRoles = {
  button: ['button', 'a', 'div'], //for example <a role='button'> text </a> - is correct & <label role='button'>text</a> - is incorrect
  link: ['a'],
  heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  list: ['ul', 'ol'],
  listitem: ['li'],
  menu: ['ul', 'ol'],
  menuitem: ['li'],
  tab: ['div'],
  tabpanel: ['div'],
  dialog: ['dialog', 'div'],
  form: ['form'],
  textbox: ['input', 'textarea'],
  checkbox: ['input'],
  radio: ['input'],
  navigation: ['nav'],
  search: ['input'],
  img: ['img'],
  main: ['main'],
  banner: ['header'],
  complementary: ['aside'],
  region: ['section'],
  status: ['div'],
  alert: ['div'],
  tooltip: ['div'],
  group: ['div'],
  application: ['div'],
};

/**
 * @description Check that ARIA role is semantic for elements.
 * @param {page} page - The page to be tested.
 * @returns {Array} - An array of errors for elements with non-semantic ARIA role .
 */

async function checkAriaRoles(page) {
  const errors = [];

  const elementsWithAriaAttributes = await findElementsWithAriaAttributes(page);

  for (const element of elementsWithAriaAttributes) {
    const tagName = await element.evaluate((el) => el.tagName);
    const ariaAttributes = await getAriaRoleAttributes(element);

    for (const [attribute, value] of Object.entries(ariaAttributes)) {
      // Check if the ARIA role is not semantic
      if (!isSemanticAriaRole(attribute, tagName)) {
        errors.push(`Non-semantic ARIA role found: ${attribute}="${value}" on ${tagName}`);
      }
    }
  }

  if (errors.length > 0) {
    logger.error('ARIA semantic issues found:');
    logger.error(errors);
  } else {
    logger.info('No ARIA semantic issues found');
  }

  return errors;
}

function isSemanticAriaRole(role, tagName) {
  if (semanticAriaRoles[role] && semanticAriaRoles[role].includes(tagName.toUpperCase())) {
    return true;
  }
  return false;
}

module.exports = {checkAriaRoles};
