var GoPro = require('goproh4');

var cam = new GoPro.Camera();

function setPhotoMode() {
  cam.ready(function() {
    cam.mode(
      GoPro.Settings.Modes.Photo,
      GoPro.Settings.Submodes.Photo.Single
    ).then(function() {
      return cam.set(
        GoPro.Settings.PHOTO_RESOLUTION,
        GoPro.Settings.PhotoResolution.R7MPMedium
      );
    }).then(function() {
      console.log("Configuration complete");
    });
  });
}

function takePhoto() {
  cam.start().then(function() {
    console.log('Photo taken');
  });
  return;
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
  setPhotoMode: setPhotoMode,
  takePhoto: takePhoto,
  getLastPhoto: getLastPhoto
};
