'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEscFormEvent = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    isEscEvent: isEscEvent,
    isEscFormEvent: isEscFormEvent
  };

})();
