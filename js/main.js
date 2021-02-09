'use strict'

const getRandomInt = (a, b) => {
  if (a >= b) {
    return 'Первое число должно быть меньше второго';
  }

  if (a < 0) {
    return 'Введите положительные числа';
  }

  let min = Math.ceil(a);
  let max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

alert(getRandomInt(3.3, 8));

const checkStringLength = (message, maxLength) => {
  return (message.length <= maxLength) ? 'Допустимое количество символов' : 'Превышено максимальное количество символов';
}

alert(checkStringLength('Привет, Кекс!', 12));
