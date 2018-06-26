'use strict';

(function () {

  var PHOTO_QUANTITY = 25;

  var photoTemplate = document.querySelector('#picture').content;
  var photoItem = document.querySelector('.pictures');

  var allPhotos = window.data.generatePhotoList(PHOTO_QUANTITY);

  var createPhotoElement = function (photoData, photoNumber) {
    var photo = photoTemplate.cloneNode(true);

    photo.querySelector('.picture__img').src = photoData.url;
    photo.querySelector('.picture__stat--likes').textContent = photoData.likes;
    photo.querySelector('.picture__stat--comments').textContent = photoData.comments.length;
    photo.querySelector('.picture__link').dataset.number = photoNumber;

    return photo;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < allPhotos.length; i++) {
    fragment.appendChild(createPhotoElement(allPhotos[i], i));
  }

  photoItem.appendChild(fragment);

  window.gallery = {
    allPhotos: allPhotos
  };

})();
