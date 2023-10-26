var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'error';

/**
 * @description Check that alt text for images is exist.
 * @param {page} page - The page to be tested.
 * @returns {Array} - An array of errors for images without alt text .
 */

const {findImagesWithMissingAlt} = require('../utils/image-helper');

async function checkAltText(page) {
  const errors = [];

  const imagesWithMissingAlt = await findImagesWithMissingAlt(page);

  for (const image of imagesWithMissingAlt) {
    const src = image.src;

    errors.push(`Image with missing alt text found: ${src}`);
  }

  if (errors.length > 0) {
    logger.error('Image alt text issues found:');
    logger.error(errors);
  } else {
    logger.info('No image alt text issues found');
  }

  return errors;
}

module.exports = {checkAltText};
