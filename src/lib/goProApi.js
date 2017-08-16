import GoPro from 'goproh4';

var cam = new GoPro.Camera();

// Take a new photo
function takePhoto() {
  return new Promise((resolve, reject) => {
    // Set camera mode
    cam.mode(GoPro.Settings.Modes.Photo, GoPro.Settings.Submodes.Photo.Single)

    // Set photo resolution
    .then(function () {
      return cam.set(
        GoPro.Settings.PHOTO_RESOLUTION,
        GoPro.Settings.PhotoResolution.R12MPWide
      );
    })

    // Take picture
    .then(function () {
      return cam.start();
    })

    // Done
    .then(() => resolve())

    // Catch errors
    .catch(error => reject(error));
  });
}

// Get the file for the most recently taken photo
function getLastPhoto() {
  return new Promise((resolve, reject) => {
    cam.listMedia().then(function (result) {

      var lastDirectory = result.media[result.media.length - 1];
      var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];

      cam.getMedia(lastDirectory.d, lastFile.n, lastFile.n).then((filename) => {
        resolve(filename);
      }).catch(error => {
        reject(error);
      });
    }).catch(error => {
      reject(error);
    });
  });
}

// Wipe all media from the camera storage
function deleteAllMedia() {
  return new Promise((resolve, reject) => {
    cam.deleteAll().then(function () {
      resolve();
    }).catch(error => reject(error));
  });
}

export default {
  takePhoto,
  getLastPhoto,
  deleteAllMedia
};
