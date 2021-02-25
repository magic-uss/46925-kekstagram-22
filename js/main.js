'use strict'

// получение случайного целого числа из переданного диапазона включительно

const getRandomInt = (a, b) => {
  if (a >= b) {
    throw new Error('Начальное число больше или равно конечному числу');
  }

  if (a < 0) {
    throw new Error('Введено отрицательное число');
  }

  let min = Math.ceil(a);
  let max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// проверка максимальной длины строки

const isStringLessLimit = (message, limit) => message.length <= limit;

if (isStringLessLimit('Привет, Кекс!', 12)) {
  // результат если true
}

// генерирование временных данных

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

const PHOTO_COUNT = 25;

const PHOTOS = [];

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

for (let i = 1; i <= PHOTO_COUNT; i++) {
  const createPhotoDescription = () => {
    const likes = getRandomInt(15, 200);
    const commentId = getRandomInt(1, NAMES.length);
    const COMMENTS = [];

    for (let j = 1; j <= commentId; j++) {
      const createPhotoComment = () => {
        const messageCount = getRandomInt(1, 2);
        let message = '';

        for (let k = 1; k <= messageCount; k++) {
          if (k > 1) {
            message += ' ';
          }

          message += getRandomArrayElement(MESSAGES);
        }

        const commentItem = {
          id: j,
          avatar: 'img/avatar-' + j + '.svg',
          message: message,
          name: getRandomArrayElement(NAMES),
        };

        return COMMENTS.push(commentItem)
      };

      createPhotoComment();
    }

    const photoItem = {
      id: i,
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[i - 1],
      likes: likes,
      comments: COMMENTS,
    };

    return PHOTOS.push(photoItem);
  };

  createPhotoDescription();
}

console.log(PHOTOS);

