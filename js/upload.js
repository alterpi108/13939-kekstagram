'use strict';

(function () {

  var photoPreview = document.querySelector('.img-upload__preview img');

  var uploadScale = document.querySelector('.scale');
  var uploadDefaultEffect = document.querySelector('#effect-none');

  var photoUpload = document.querySelector('#upload-file');
  var photoUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeUpload = document.querySelector('#upload-cancel');

  var loadPicture = function (evt) {
    var effectsPreview = document.querySelectorAll('.effects__preview');

    photoPreview.src = URL.createObjectURL(evt.target.files[0]);
    for (var i = 0; i < effectsPreview.length; i++) {
      effectsPreview[i].style.backgroundImage = 'url(' + URL.createObjectURL(evt.target.files[0]) + ')';
    }
  };

  var openUploadPopup = function () {
    uploadScale.classList.add('hidden');
    uploadDefaultEffect.checked = 'true';

    photoUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadPopupEscPress);
  };

  var closeUploadPopup = function () {
    photoUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', uploadPopupEscPress);
  };

  var uploadPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeUploadPopup);
  };

  photoUpload.addEventListener('change', function (evt) {
    loadPicture(evt);
    openUploadPopup();
  });

  closeUpload.addEventListener('click', closeUploadPopup);

})();
