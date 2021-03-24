import {page} from './nodes.js';
const pageMain = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');
const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((uploadedPhotos) => {
      onSuccess(uploadedPhotos);
    })
    .catch(() => {
      page.insertAdjacentHTML('beforeend', '<p style="position: absolute; top: 0;">Ошибка загрузки данных с сервера</p>');
    })
}

const sendData = (onSuccess, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess()
        pageMain.insertAdjacentHTML('afterbegin', successMessage);
      } else {
        pageMain.insertAdjacentHTML('afterbegin', errorMessage);
      }
    })
    .catch(() => {
      pageMain.insertAdjacentHTML('afterbegin', errorMessage);
    })
}

export {getData, sendData};
