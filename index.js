const path = require('path'),
    fs = require('fs'),
    watermark = require('./watermark');

// CONSTANTS
const {
    LOGO,
    SOURCE_DIRECTORY,
    MAXHEIGHT,
    MAXWIDTH,
    TEXTDATA,
} = require('./config');

const timeStamp = Date.now();

const sourcePath = path.join(__dirname, SOURCE_DIRECTORY),
    destinationPath = path.join(__dirname, `images/converted-${timeStamp}`);

fs.readdir(sourcePath, (error, files) => {
    if (error) throw error;
    files.map((file) => {
        file !== '.DS_Store' && file !== '.gitignore'
            ? watermark(`${sourcePath}/${file}`, LOGO, TEXTDATA).then(
                  (image) => {
                      console.log('Watermarking image', file);
                      image.scaleToFit(MAXHEIGHT, MAXWIDTH);
                      image.write(`${destinationPath}/${file}`);
                  }
              )
            : null;
    });
});
