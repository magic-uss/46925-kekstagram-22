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

const isStringOverLimit = (message, limit) => message.length >= limit;

// проверка нажатия Esc

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

export {getRandomInt, isStringOverLimit, isEscEvent};
