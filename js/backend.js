'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var OK = 200;
  var ERROR_BAD_REQUEST = 400;
  var ERROR_NOT_FOUND = 404;
  var TIMEOUT = 10000;

  var setupLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case OK:
          onLoad(xhr.response);
          break;
        case ERROR_BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case ERROR_NOT_FOUND:
          onError('Ничего не найдено');
          break;

        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;

  };

  var load = function (onLoad, onError) {
    var xhr = setupLoad(onLoad, onError);

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upLoad = function (data, onLoad, onError) {
    var xhr = setupLoad(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upLoad: upLoad
  };

})();
