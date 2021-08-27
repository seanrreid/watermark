const Jimp = require('jimp');

const watermark = async (ORIGINAL_IMAGE, WATERMARK, TEXTDATA) => {
    try {
        const [image, logo, font] = await Promise.all([
            Jimp.read(ORIGINAL_IMAGE),
            Jimp.read(WATERMARK),
            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE),
        ]);

        logo.resize(image.bitmap.width / 2, Jimp.AUTO);

        const X = (image.bitmap.width - logo.bitmap.width) / 2;
        const Y = (image.bitmap.height - logo.bitmap.width) / 2;

        const textWidth = Jimp.measureText(font, TEXTDATA.text);
        const textHeight = Jimp.measureTextHeight(font, TEXTDATA.text, 100);
        const textPlacementX = (image.bitmap.width - textWidth) / 2;
        const textPlacementY = image.bitmap.height - textHeight;

        image.print(
            font,
            textPlacementX,
            textPlacementY,
            {
                text: TEXTDATA.text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_CENTER,
            },
            textWidth
        );
        return image.composite(logo, X, Y, [
            {
                mode: Jimp.BLEND_OVERLAY,
                opacitySource: 1,
                opacityDest: 1,
            },
        ]);
    } catch (error) {
        console.error('ERROR:', error);
    }
};

module.exports = watermark;
