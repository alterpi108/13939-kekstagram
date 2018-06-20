'use strict';

var PHOTO_QUANTITY = 25;
var LIKE_MIN = 15;
var LIKE_MAX = 200;
var COMMENT_MIN = 1;
var COMMENT_MAX = 2;
var ESC_KEYCODE = 27;
var DEFAULT_SIZE = 100;
var SIZE_STEP = 25;

var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTO_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var photoTemplate = document.querySelector('#picture').content;
var photoItem = document.querySelector('.pictures');

var bigPhoto = document.querySelector('.big-picture');
var bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');

var social = document.querySelector('.social');
social.querySelector('.social__comment-count').classList.add('visually-hidden');
social.querySelector('.social__loadmore').classList.add('visually-hidden');
var socialComments = social.querySelector('.social__comments');

var photoUpload = document.querySelector('#upload-file');
var photoUploadOverlay = document.querySelector('.img-upload__overlay');
var closeUpload = document.querySelector('#upload-cancel');

var photoPreview = document.querySelector('.img-upload__preview img');
var decreaseButton = document.querySelector('.resize__control--minus');
var increaseButton = document.querySelector('.resize__control--plus');
var currentSize = DEFAULT_SIZE;

var hashtags = photoItem.querySelector('.text__hashtags');
var formDescription = photoItem.querySelector('.text__description');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getUserComments = function (commentsQuantity) {
  var userComments = [];

  for (var i = 0; i < commentsQuantity; i++) {
    userComments.push(PHOTO_COMMENTS[getRandomNumber(0, PHOTO_COMMENTS.length - 1)]);
  }

  return userComments;
};

var generatePhotoList = function (quantity) {
  var photos = [];

  for (var i = 1; i <= quantity; i++) {
    var photo = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(LIKE_MIN, LIKE_MAX),
      comments: getUserComments(getRandomNumber(COMMENT_MIN, COMMENT_MAX)),
      description: PHOTO_DESCRIPTIONS[getRandomNumber(0, PHOTO_DESCRIPTIONS.length - 1)]
    };
    photos.push(photo);
  }

  return photos;
};

var allPhotos = generatePhotoList(PHOTO_QUANTITY);

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

var fillBigPhoto = function (photoData) {
  bigPhoto.querySelector('.big-picture__img img').src = photoData.url;
  bigPhoto.querySelector('.likes-count').textContent = photoData.likes;
  bigPhoto.querySelector('.social__caption').textContent = photoData.description;
};

var createPhotoComment = function (data) {
  socialComments.innerHTML = '';

  bigPhoto.querySelector('.comments-count').textContent = data.comments.length;

  var photoComment = '';

  for (i = 0; i < data.comments.length; i++) {
    photoComment += '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + getRandomNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">' + data.comments[i] + '</p></li>';
  }

  return photoComment;
};

var openUploadPopup = function () {
  var uploadScale = document.querySelector('.scale');
  var uploadDefaultEffect = document.querySelector('#effect-none');

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
  if (evt.keyCode === ESC_KEYCODE) {
    photoUpload.value = '';
    closeUploadPopup();
  }
};

var loadPicture = function (evt) {
  var effectsPreview = document.querySelectorAll('.effects__preview');

  photoPreview.src = URL.createObjectURL(evt.target.files[0]);
  for (i = 0; i < effectsPreview.length; i++) {
    effectsPreview[i].style.backgroundImage = 'url(' + URL.createObjectURL(evt.target.files[0]) + ')';
  }
};

photoUpload.addEventListener('change', function (evt) {
  loadPicture(evt);
  openUploadPopup();
});

closeUpload.addEventListener('click', closeUploadPopup);

var resizePhoto = function (photoSize) {
  var sizeValue = document.querySelector('.resize__control--value');

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

var changeImageSettings = function () {
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageScale = document.querySelector('.scale');
  var imageScalePin = imageScale.querySelector('.scale__pin');
  var imageScaleValue = imageScale.querySelector('.scale__value');
  var imageScaleLevel = imageScale.querySelector('.scale__level');
  var imageScaleLine = document.querySelector('.scale__line');
  var imageEffect = document.querySelectorAll('.effects__radio');
  var currentEffect = '';

  var setFilter = function () {
    for (i = 0; i < imageEffect.length; i++) {
      imageEffect[i].addEventListener('click', function (evt) {
        currentEffect = evt.target.value;
        imageUploadPreview.style = '';
        imageScalePin.style = 'left: 100%';
        imageScaleLevel.style = 'width: 100%';
        imageScaleValue.value = '100';

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

  var getEffectOptions = function (target) {
    var imageScaleLineX = imageScaleLine.getBoundingClientRect();

    var imageScaleLineXLeft = imageScaleLineX.left;
    var imageScalePinXLeft = target.clientX - imageScaleLineXLeft;
    var imageScalePinXRight = imageScalePinXLeft + imageScalePin.clientWidth;

    if (imageScalePinXLeft < 0) {
      imageScalePinXLeft = 0;
    }

    if (imageScalePinXRight > imageScaleLine.clientWidth) {
      imageScalePinXLeft = imageScaleLine.clientWidth;
    }

    var currentEffectValue = imageScalePinXLeft / imageScaleLine.clientWidth;

    imageScalePin.style.left = currentEffectValue * 100 + '%';
    imageScaleLevel.style.width = currentEffectValue * 100 + '%';

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
        imageUploadPreview.style.filter = 'brightness(' + currentEffectValue * 3 + ')';
        break;
    }
  };

  setFilter();
  imageScale.addEventListener('mouseup', function (evt) {
    applyFilters(getEffectOptions(evt));
  });
};

var photoLink = document.querySelectorAll('.picture__link');

var openBigPhoto = function (evt) {
  var photoNumber = evt.target.parentNode.dataset.number;

  bigPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onBigPhotoEscPress);

  fillBigPhoto(allPhotos[photoNumber]);
  socialComments.innerHTML = createPhotoComment(allPhotos[photoNumber]);
};

for (i = 0; i < photoLink.length; i++) {
  photoLink[i].addEventListener('click', openBigPhoto);
}

var closeBigPhoto = function () {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onBigPhotoEscPress);
};

bigPhotoClose.addEventListener('click', closeBigPhoto);

var onBigPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPhoto();
  }
};

changeImageSettings();

var verifyRepeatHashtag = function (repeats) {
  var inputHashtag = [];

  for (i = 0; i < repeats.length; i++) {
    if (inputHashtag[repeats[i]]) {
      return false;
    }
    inputHashtag[repeats[i]] = true;
  }

  return true;
};

var checkValidHashtag = function () {

  var hashtagQuantity = hashtags.value.trim().toLowerCase().split(' ');

  if (hashtagQuantity.length > 5) {
    hashtags.setCustomValidity('Используйте не более 5ти хеш-тегов');
  } else {
    for (i = 0; i < hashtagQuantity.length; i++) {
      if (hashtagQuantity[i].charAt(0) !== '#') {
        hashtags.setCustomValidity('Хеш-тег должен начинаться с # (решетки)');
      } else if (hashtagQuantity[i] === '#') {
        hashtags.setCustomValidity('Хеш-тег не может состоять только из # (решётки)');
      } else if (hashtagQuantity[i].includes('#', 1)) {
        hashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
      } else if (hashtagQuantity[i].length > 20) {
        hashtags.setCustomValidity('Максимальная длина хэш-тега не должна превышать 20 символов');
      } else if (!verifyRepeatHashtag(hashtagQuantity)) {
        hashtags.setCustomValidity('Хэш-теги не должны повторяться');
      } else {
        hashtags.setCustomValidity('');
      }
    }
  }
};

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

hashtags.addEventListener('input', checkValidHashtag);
hashtags.addEventListener('keydown', onFormEscPress);
formDescription.addEventListener('keydown', onFormEscPress);
