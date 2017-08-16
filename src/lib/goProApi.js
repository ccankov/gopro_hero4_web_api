var GoPro = require('goproh4');

var cam = new GoPro.Camera();

function takePhoto() {
  // Set camera mode
  cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single)

  // Set photo resolution
  .then(function () {
    return cam.set(
      GoPro.Settings.PHOTO_RESOLUTION,
      GoPro.Settings.PhotoResolution.R7MPMedium
    );
  })

  // Take picture
  .then(function () {
    return cam.start();
  })

  // Done
  .then(function () {
    console.log('[picture taken]');
  });
}

function getLastPhoto() {
  cam.listMedia().then(function (result) {

    var lastDirectory = result.media[result.media.length - 1];
    var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];

    cam.getMedia(lastDirectory.d, lastFile.n, lastFile.n).then(
      function(filename) {
        console.log(filename, '[saved]');
      }
    );
  });
}

module.exports = {
  takePhoto: takePhoto,
  getLastPhoto: getLastPhoto
};
