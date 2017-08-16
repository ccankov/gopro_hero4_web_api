var GoPro = require('goproh4');

var cam = new GoPro.Camera();

function setPhotoMode() {
  cam.ready(function() {
    var promises = [];

    var modePromise = cam.mode(
      GoPro.Settings.Modes.Photo,
      GoPro.Settings.Submodes.Photo.Single
    );
    var settingPromise = cam.set(
      GoPro.Settings.PHOTO_RESOLUTION,
      GoPro.Settings.PhotoResolution.R7MPMedium
    );

    Promise.all(promises).then(() => console.log("Configuration complete"));
  });
}

function takePhoto() {
  cam.start().then(() => console.log('Photo taken'));
  return;
}

function getLastPhoto() {
  cam.listMedia().then(function (result) {

    var lastDirectory = result.media[result.media.length - 1];
    var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];

    cam.getMedia(lastDirectory.d, lastFile.n, lastFile.n).then((filename) => {
        console.log(filename, '[saved]');
    });
  });
}
