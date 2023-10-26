async function findImagesWithMissingAlt(page) {
  return await page.$$eval('img:not([alt])', (images) =>
    images.map((img) => ({
      src: img.getAttribute('src'),
    }))
  );
}

module.exports = {findImagesWithMissingAlt};
