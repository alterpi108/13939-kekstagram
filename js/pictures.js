'use strict';

var PHOTO_QUANTITY = 25;
var LIKE_MIN = 15;
var LIKE_MAX = 200;
var COMMENT_MIN = 1;
var COMMENT_MAX = 2;

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

var social = document.querySelector('.social');
social.querySelector('.social__comment-count').classList.add('visually-hidden');
social.querySelector('.social__loadmore').classList.add('visually-hidden');
var socialComments = social.querySelector('.social__comments');

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

var createPhotoElement = function (photoData) {
  var photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = photoData.url;
  photo.querySelector('.picture__stat--likes').textContent = photoData.likes;
  photo.querySelector('.picture__stat--comments').textContent = photoData.comments.length;

  return photo;
};

var renderPhotosList = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoElement(photos[i]));
  }
  photoItem.appendChild(fragment);
};

var fillBigPhoto = function (photoData) {
  var bigPhoto = document.querySelector('.big-picture');
  bigPhoto.classList.remove('hidden');

  bigPhoto.querySelector('.big-picture__img img').src = photoData.url;
  bigPhoto.querySelector('.likes-count').textContent = photoData.likes;
  bigPhoto.querySelector('.comments-count').textContent = photoData.comments.length;
  bigPhoto.querySelector('.social__caption').textContent = photoData.description;

  socialComments.innerHTML = '';

  for (var i = 0; i < photoData.comments.length; i++) {
    var photoComment = document.createElement('li');
    photoComment.classList.add('social__comment', 'social__comment--text');
    socialComments.appendChild(photoComment);

    var photoCommentAvatar = document.createElement('img');
    photoCommentAvatar.classList.add('social__picture');
    photoCommentAvatar.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    photoCommentAvatar.alt = 'Аватар комментатора фотографии';
    photoCommentAvatar.width = 35;
    photoCommentAvatar.height = 35;
    photoComment.appendChild(photoCommentAvatar);

    var photoCommentText = document.createElement('p');
    photoCommentText.classList.add('social__text');
    photoCommentText.textContent = photoData.comments[i];
    photoComment.appendChild(photoCommentText);
  }
};

var allPhotos = generatePhotoList(PHOTO_QUANTITY);
renderPhotosList(allPhotos);
fillBigPhoto(allPhotos[0]);
