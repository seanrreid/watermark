const Jimp = require('jimp');

const watermark = async (ORIGINAL_IMAGE, WATERMARK, TEXTDATA) => {
    try {
        const [image, logo, font] = await Promise.all([
            Jimp.read(ORIGINAL_IMAGE),
            Jimp.read(WATERMARK),
            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE),
        ]);

        logo.resize(image.bitmap.width * 0.85, Jimp.AUTO);
        logo.opacity(0.6);

        const X = (image.bitmap.width - logo.bitmap.width) / 2;
        const Y = (image.bitmap.height - logo.bitmap.width) / 2;

        let textWidth = Jimp.measureText(font, TEXTDATA.text);

        textWidth =
            textWidth >= image.bitmap.width
                ? image.bitmap.width * 0.9
                : textWidth;

        // const textHeight = Jimp.measureTextHeight(font, TEXTDATA.text, 100);
        const textPlacementX = (image.bitmap.width - textWidth) / 2;
        const textPlacementY = image.bitmap.height * 0.8;

        image.print(
            font,
            textPlacementX,
            textPlacementY,
            {
                text: TEXTDATA.text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
            },
            textWidth
        );
        return image.composite(logo, X, Y, [
            {
                mode: Jimp.BLEND_OVERLAY,
                opacitySource: 0.9,
                opacityDest: 1,
            },
        ]);
    } catch (error) {
        console.error('ERROR:', error);
    }
};

module.exports = watermark;
