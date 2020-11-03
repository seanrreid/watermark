const path = require("path"),
  fs = require("fs"),
  watermark = require("./watermark");

const timeStamp = Date.now();

const sourcePath = path.join(__dirname, "images/source"),
  destinationPath = path.join(__dirname, `images/converted-${timeStamp}`);

// CONSTANTS
const LOGO = "./images/static/watermark_slc.png";
const LOGO_MARGIN_PERCENTAGE = 3;
const MAXHEIGHT = 960;
const MAXWIDTH = 960;

const TEXTDATA = {
  text: "© Smells Like Cheese", //the text to be rendered on the image
};

fs.readdir(sourcePath, (error, files) => {
  if (error) throw error;
  files.map((file) => {
    file !== ".DS_Store" && file !== ".gitignore"
      ? watermark(`${sourcePath}/${file}`, LOGO_MARGIN_PERCENTAGE, LOGO, TEXTDATA).then(
          (image) => {
            console.log("Watermarking image", file);
            image.scaleToFit(MAXHEIGHT, MAXWIDTH);
            image.write(`${destinationPath}/${file}`);
          }
        )
      : null;
  });
});
