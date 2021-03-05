import {getRandomInt} from './util.js';

// генерирование временных данных

const PHOTO_COUNT = 25;
const photos = [];

const NAMES = [
  'Иван',
  'Мария',
  'Виктор',
  'Юлия',
  'Роман',
  'Оксана',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Описание первого фото',
  'Описание второго фото',
  'Описание третьего фото',
  'Описание четвертого фото',
  'Описание пятого фото',
  'Описание шестого фото',
  'Описание седьмого фото',
  'Описание восьмого фото',
  'Описание девятого фото',
  'Описание десятого фото',
  'Описание одиннадцатого фото',
  'Описание двенадцатого фото',
  'Описание тринадцатого фото',
  'Описание четырнадцатого фото',
  'Описание пятнадцатого фото',
  'Описание шестнадцатого фото',
  'Описание семнадцатого фото',
  'Описание восемнадцатого фото',
  'Описание девятнадцатого фото',
  'Описание двадцатого фото',
  'Описание двадцать первого фото',
  'Описание двадцать второго фото',
  'Описание двадцать третьего фото',
  'Описание двадцать четвертого фото',
  'Описание двадцать пятого фото',
];

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
}

const createPhotoDescription = (photoId) => {
  const likes = getRandomInt(15, 200);
  const commentCount = getRandomInt(1, NAMES.length);
  const comments = [];

  for (let j = 1; j <= commentCount; j++) {
    comments.push(createPhotoComment(j));
  }

  const photoItem = {
    id: photoId,
    url: 'photos/' + photoId + '.jpg',
    description: DESCRIPTIONS[photoId - 1],
    likes: likes,
    comments: comments,
  };

  return photoItem;
};

const createPhotoComment = (commentId) => {
  const messageCount = getRandomInt(1, 2);
  let message = '';

  for (let k = 1; k <= messageCount; k++) {
    if (k > 1) {
      message += ' ';
    }

    message += getRandomArrayElement(MESSAGES);
  }

  const commentItem = {
    id: commentId,
    avatar: 'img/avatar-' + commentId + '.svg',
    message: message,
    name: getRandomArrayElement(NAMES),
  };

  return commentItem;
};

const createPhotos = () => {
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photos.push(createPhotoDescription(i));
  }

  return photos;
};

export {createPhotos};
