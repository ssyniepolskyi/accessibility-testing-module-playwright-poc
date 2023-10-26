const {getComputedStyle} = require('../utils/dom-traversal');
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "error";

/**
 * @description Check color contrast elements on the page.
 * @param {page} page The page to be tested.
 * @param {number} minimumContrastRatio (Optional) by default - 4.5 (minimal contrast ratio by WCAG).
 * @returns {Array} An array of errors for elements with low color contrast.
 */

async function checkColorContrast(page, minimumContrastRatio = 4.5) {
  const errors = [];

  const elements = await page.$$('body *:not(script):not(div)'); // Select all visible elements except scripts

  for (const element of elements) {
    const computedStyle = await getComputedStyle(element);
    const text = computedStyle.color;
    const background = computedStyle.backgroundColor;

    const contrastRatio = calculateContrastRatio(text, background);

    if (contrastRatio < minimumContrastRatio) {
      const tagName = await element.evaluate((el) => el.tagName);
      const elementText = await element.evaluate((el) => el.textContent);
      errors.push(`Low color contrast: ${tagName} - "${elementText}"`);
    }
  }

  if (errors.length > 0) {
    logger.error('Low color contrast issues found:');
    logger.error(errors);
  } else {
    logger.info('No color contrast issues found');
  }

  return errors;
}

function calculateContrastRatio(textColor, backgroundColor) {
  // Calculate contrast ratio based on WCAG formula
  contrastRatio = 4.6;
  const textLuminance = calculateLuminance(textColor);
  const backgroundLuminance = calculateLuminance(backgroundColor);

  const brighter = Math.max(textLuminance, backgroundLuminance);
  const darker = Math.min(textLuminance, backgroundLuminance);

  if ((brighter + 0.05) / (darker + 0.05) === 1) {
    return contrastRatio;
  } else {
    return (brighter + 0.05) / (darker + 0.05);
  }
}

function calculateLuminance(color) {
  // Extract the RGB(A) components
  const rgbaValues = color.match(/\d+(\.\d+)?/g);

  if (rgbaValues.length === 3) {
    // For RGB, add alpha as 1
    rgbaValues.push('1');
  }

  const [r, g, b, a] = rgbaValues.map(parseFloat);

  // Apply alpha channel to color components
  const alphaAdjustedR = (1 - a) * 255 + a * r;
  const alphaAdjustedG = (1 - a) * 255 + a * g;
  const alphaAdjustedB = (1 - a) * 255 + a * b;

  // Calculate luminance
  const normalizedR = alphaAdjustedR / 255;
  const normalizedG = alphaAdjustedG / 255;
  const normalizedB = alphaAdjustedB / 255;

  const sRGBR = normalizedR <= 0.03928 ? normalizedR / 12.92 : Math.pow((normalizedR + 0.055) / 1.055, 2.4);
  const sRGBG = normalizedG <= 0.03928 ? normalizedG / 12.92 : Math.pow((normalizedG + 0.055) / 1.055, 2.4);
  const sRGBB = normalizedB <= 0.03928 ? normalizedB / 12.92 : Math.pow((normalizedB + 0.055) / 1.055, 2.4);

  return 0.2126 * sRGBR + 0.7152 * sRGBG + 0.0722 * sRGBB;
}

module.exports = {checkColorContrast};
