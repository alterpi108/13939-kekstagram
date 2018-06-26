'use strict';

(function () {

  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');

  var social = document.querySelector('.social');
  social.querySelector('.social__comment-count').classList.add('visually-hidden');
  social.querySelector('.social__loadmore').classList.add('visually-hidden');
  var socialComments = social.querySelector('.social__comments');

  var photoLink = document.querySelectorAll('.picture__link');

  var fillBigPhoto = function (photoData) {
    bigPhoto.querySelector('.big-picture__img img').src = photoData.url;
    bigPhoto.querySelector('.likes-count').textContent = photoData.likes;
    bigPhoto.querySelector('.social__caption').textContent = photoData.description;
  };

  var createPhotoComment = function (data) {
    socialComments.innerHTML = '';

    bigPhoto.querySelector('.comments-count').textContent = data.comments.length;

    var photoComment = '';

    for (var i = 0; i < data.comments.length; i++) {
      photoComment += '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + data.comments[i] + '</p></li>';
    }

    return photoComment;
  };

  var openBigPhoto = function (evt) {
    var photoNumber = evt.target.parentNode.dataset.number;

    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigPhotoEscPress);

    fillBigPhoto(window.gallery.allPhotos[photoNumber]);
    socialComments.innerHTML = createPhotoComment(window.gallery.allPhotos[photoNumber]);
  };

  for (var i = 0; i < photoLink.length; i++) {
    photoLink[i].addEventListener('click', openBigPhoto);
  }

  var closeBigPhoto = function () {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  var onBigPhotoEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeBigPhoto);
  };

  bigPhotoClose.addEventListener('click', closeBigPhoto);

})();
