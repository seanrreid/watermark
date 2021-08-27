# Watermark

## Node based script to bulk watermark images

### `config.js`

* Run `cp config.dist.js config.js`
* The `config.js` _will_ be ignored (check `.gitignore`)
* Edit the following entries accordingly:
  * `SOURCE_DIRECTORY`  // Directory where you'll keep the original images
  * `LOGO`              // The logo you want to use for the watermark
  * `MAXHEIGHT` // The max-height of the overlay
  * `MAXWIDTH`  // The max-width of the overlay
  * `TEXTDATA`  // the text to be rendered on the image (will be on the bottom center of the image)

### Building watermarked images

* Put the original images into the `SOURCE` directory you defined above.
* Put the logo to be used as a watermark into the `images/static` directory.
* Generated images will be put into a timestamped folder, ie. `images/converted-xxxxxxxxxxxxx`.

#### Inspired by [this tutorial](https://dev.to/muhajirdev/how-to-watermark-an-image-with-node-js-4n64)
