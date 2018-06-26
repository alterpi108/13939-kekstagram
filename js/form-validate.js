'use strict';

(function () {

  var imgForm = document.querySelector('.img-upload__form');
  var hashtags = imgForm.querySelector('.text__hashtags');
  var formDescription = imgForm.querySelector('.text__description');

  var verifyRepeatHashtag = function (repeats) {
    var inputHashtag = [];

    for (var i = 0; i < repeats.length; i++) {
      if (inputHashtag[repeats[i]]) {
        return false;
      }
      inputHashtag[repeats[i]] = true;
    }

    return true;
  };

  var checkValidHashtag = function () {
    var inputHashtags = hashtags.value.trim().toLowerCase().split(' ');

    hashtags.setCustomValidity('');

    if (hashtags.value === '') {
      return;
    }

    if (inputHashtags.length > 5) {
      hashtags.setCustomValidity('Используйте не более 5ти хеш-тегов');
    } else if (!verifyRepeatHashtag(inputHashtags)) {
      hashtags.setCustomValidity('Хэш-теги не должны повторяться');
    } else {
      for (var i = 0; i < inputHashtags.length; i++) {
        if (inputHashtags[i].charAt(0) !== '#') {
          hashtags.setCustomValidity('Хеш-тег должен начинаться с # (решетки)');
        } else if (inputHashtags[i] === '#') {
          hashtags.setCustomValidity('Хеш-тег не может состоять только из # (решётки)');
        } else if (inputHashtags[i].includes('#', 1)) {
          hashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
        } else if (inputHashtags[i].length > 20) {
          hashtags.setCustomValidity('Максимальная длина хэш-тега не должна превышать 20 символов');
        }
      }
    }
  };

  var onFormEscPress = function (evt) {
    window.utils.isEscFormEvent(evt);
  };

  hashtags.addEventListener('change', checkValidHashtag);
  hashtags.addEventListener('keydown', onFormEscPress);
  formDescription.addEventListener('keydown', onFormEscPress);

})();
