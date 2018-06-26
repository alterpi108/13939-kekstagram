'use strict';

(function () {

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

  var getUserComments = function (commentsQuantity) {
    var userComments = [];

    for (var i = 0; i < commentsQuantity; i++) {
      userComments.push(PHOTO_COMMENTS[window.utils.getRandomNumber(0, PHOTO_COMMENTS.length - 1)]);
    }

    return userComments;
  };

  var generatePhotoList = function (quantity) {
    var photos = [];

    for (var i = 1; i <= quantity; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        likes: window.utils.getRandomNumber(LIKE_MIN, LIKE_MAX),
        comments: getUserComments(window.utils.getRandomNumber(COMMENT_MIN, COMMENT_MAX)),
        description: PHOTO_DESCRIPTIONS[window.utils.getRandomNumber(0, PHOTO_DESCRIPTIONS.length - 1)]
      };
      photos.push(photo);
    }

    return photos;
  };

  window.data = {
    generatePhotoList: generatePhotoList
  };

})();
