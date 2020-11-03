const Jimp = require("jimp");

const watermark = async (
  ORIGINAL_IMAGE,
  WATERMARK_MARGIN,
  WATERMARK,
  TEXTDATA
) => {
  try {
    const [image, logo, font] = await Promise.all([
      Jimp.read(ORIGINAL_IMAGE),
      Jimp.read(WATERMARK),
      Jimp.loadFont(Jimp.FONT_SANS_128_WHITE),
    ]);
    logo.resize(image.bitmap.width / 5, Jimp.AUTO);

    const xMargin = (image.bitmap.width * WATERMARK_MARGIN) / 100;
    const yMargin = (image.bitmap.width * WATERMARK_MARGIN) / 100;

    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;

    const textWidth = Jimp.measureText(font, TEXTDATA.text);
    const textHeight = Jimp.measureTextHeight(font, TEXTDATA.text, 100);
    const textPlacementX = (image.bitmap.width - textWidth) / 2;
    const textPlacementY = image.bitmap.height - (textHeight + 10);

    image.print(
      font,
      textPlacementX,
      textPlacementY,
      {
        text: TEXTDATA.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      textWidth
    );
    return image.composite(logo, X, Y, [
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 0.8,
        opacityDest: 1,
      },
    ]);
  } catch (error) {
    console.error("ERROR:", error);
  }
};

module.exports = watermark;
