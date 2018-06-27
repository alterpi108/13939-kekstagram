'use strict';

(function () {

  var PHOTO_QUANTITY = 25;

  var photoTemplate = document.querySelector('#picture').content;
  var photoItem = document.querySelector('.pictures');

  var createPhotoElement = function (photoData, photoNumber) {
    var photo = photoTemplate.cloneNode(true);

    photo.querySelector('.picture__img').src = photoData.url;
    photo.querySelector('.picture__stat--likes').textContent = photoData.likes;
    photo.querySelector('.picture__stat--comments').textContent = photoData.comments.length;
    photo.querySelector('.picture__link').dataset.number = photoNumber;

    return photo;
  };

  var renderAllPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_QUANTITY; i++) {
      fragment.appendChild(createPhotoElement(photos[i], i));
    }

    photoItem.appendChild(fragment);
  };

  window.backend.load(renderAllPhotos, window.renderError);

})();
