'use strict';

(function () {

  var DEFAULT_SIZE = 100;
  var SIZE_STEP = 25;

  var photoPreview = document.querySelector('.img-upload__preview img');

  var decreaseButton = document.querySelector('.resize__control--minus');
  var increaseButton = document.querySelector('.resize__control--plus');
  var sizeValue = document.querySelector('.resize__control--value');
  var currentSize = DEFAULT_SIZE;

  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageScale = document.querySelector('.scale');
  var imageScalePin = imageScale.querySelector('.scale__pin');
  var imageScaleLevel = imageScale.querySelector('.scale__level');
  var imageScaleLine = document.querySelector('.scale__line');
  var imageEffect = document.querySelectorAll('.effects__radio');
  var currentEffect = '';

  var resizePhoto = function (photoSize) {
    sizeValue.value = photoSize + '%';
    photoPreview.style.transform = 'scale(' + photoSize / 100 + ')';
  };

  var decreasePhoto = function () {
    if (currentSize > 25) {
      currentSize -= SIZE_STEP;
    }
    resizePhoto(currentSize);
  };

  var increasePhoto = function () {
    if (currentSize < 100) {
      currentSize += SIZE_STEP;
    }
    resizePhoto(currentSize);
  };

  decreaseButton.addEventListener('click', decreasePhoto);
  increaseButton.addEventListener('click', increasePhoto);

  var setFilter = function () {
    for (var i = 0; i < imageEffect.length; i++) {
      imageEffect[i].addEventListener('click', function (evt) {
        currentEffect = evt.target.value;
        imageUploadPreview.style = '';
        imageScalePin.style = 'left: 100%';
        imageScaleLevel.style = 'width: 100%';

        imageUploadPreview.className = 'img-upload__preview';

        if (evt.target.value !== 'none') {
          imageScale.classList.remove('hidden');
          imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
        } else {
          imageScale.classList.add('hidden');
        }
      });
    }
  };

  var changeFilterSettings = function () {
    var getEffectOptions = function (target) {
      var imageScaleLineX = imageScaleLine.getBoundingClientRect();

      var imageScaleLinePositionX = imageScaleLineX.left;
      var imageScalePinX = target.clientX - imageScaleLinePositionX;

      if (imageScalePinX < 0) {
        imageScalePinX = 0;
      } else if (imageScalePinX > imageScaleLine.offsetWidth) {
        imageScalePinX = imageScaleLine.offsetWidth;
      }

      var currentEffectValue = imageScalePinX / imageScaleLine.offsetWidth;

      imageScalePin.style.left = Math.floor(currentEffectValue * 100) + '%';
      imageScaleLevel.style.width = Math.floor(currentEffectValue * 100) + '%';

      return currentEffectValue;
    };

    var applyFilters = function (currentEffectValue) {
      switch (currentEffect) {
        case 'chrome':
          imageUploadPreview.style.filter = 'grayscale(' + currentEffectValue + ')';
          break;
        case 'sepia':
          imageUploadPreview.style.filter = 'sepia(' + currentEffectValue + ')';
          break;
        case 'marvin':
          imageUploadPreview.style.filter = 'invert(' + currentEffectValue * 100 + '%' + ')';
          break;
        case 'phobos':
          imageUploadPreview.style.filter = 'blur(' + currentEffectValue * 3 + 'px' + ')';
          break;
        case 'heat':
          imageUploadPreview.style.filter = 'brightness(' + (1 + currentEffectValue * 2) + ')';
          break;
      }
    };

    var onMouseMove = function (evt) {
      evt.preventDefault();
      applyFilters(getEffectOptions(evt));
    };

    var onMouseUp = function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    imageScalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    imageScale.addEventListener('mouseup', function (evt) {
      applyFilters(getEffectOptions(evt));
    });
  };

  setFilter();
  changeFilterSettings();

})();
