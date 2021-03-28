import {isStringOverLimit, isEscEvent} from './util.js';
import {sendData} from './api.js';
import {pageMain, uploadInput} from './nodes.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');
const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_QUANTITY = 5;
const MAX_COMMENT_LENGTH = 140;

const showPopupSuccess = () => {
  const element = successMessage.cloneNode(true);
  element.style.zIndex = '1000';
  pageMain.appendChild(element);

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      onPopupClick();
    }
  }

  const onPopupClick = () => {
    element.remove();
    document.removeEventListener('keydown', onEscKeydown);
  }

  document.addEventListener('keydown', onEscKeydown);
  element.addEventListener('click', onPopupClick);

  const button = document.querySelector('.success__button');
  button.addEventListener('click', onPopupClick);
}

const showSuccessMessage = () => {
  showPopupSuccess();
}

const showPopupError = () => {
  const element = errorMessage.cloneNode(true);
  element.style.zIndex = '1000';
  pageMain.appendChild(element);

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      onPopupClick();
    }
  }

  const onPopupClick = () => {
    element.remove();
    document.removeEventListener('keydown', onEscKeydown);
  }

  document.addEventListener('keydown', onEscKeydown);
  element.addEventListener('click', onPopupClick);

  const button = document.querySelector('.error__button');
  button.addEventListener('click', onPopupClick);
}

const showErrorMessage = () => {
  showPopupError();
}

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();


    sendData(
      () => onSuccess(showSuccessMessage()),
      () => onError(showErrorMessage()),
      new FormData(evt.target),
    );

    uploadInput.value = '';
  });
}

hashtagsInput.addEventListener('input', () => {
  let hashtagsArray = hashtagsInput.value.toLowerCase().split(' ');
  let regex = /^#[0-9a-zA-Zа-яА-Я]+$/;

  for (let i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i][0] !== '#') {
      hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа #');
    } else if (hashtagsArray[i].length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity('Максимальная длина одного хэштега 20 символов, включая символ #');
    } else if (hashtagsArray.length > MAX_HASHTAG_QUANTITY) {
      hashtagsInput.setCustomValidity('Нельзя указывать более пяти хэштегов');
    } else if (hashtagsArray[i].length < MIN_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity('Хэштег не может состоять только из одного символа #');
    } else if (i !== hashtagsArray.indexOf(hashtagsArray[i]) || i !== hashtagsArray.lastIndexOf(hashtagsArray[i])) {
      hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
    } else if (hashtagsArray[i].search(regex) === -1) {
      hashtagsInput.setCustomValidity('В имени хэштега можно использовать только буквы и числа');
    } else {
      hashtagsInput.setCustomValidity('');
    }

    hashtagsInput.reportValidity();
  }

  if (!hashtagsInput.validity.valid) {
    hashtagsInput.setAttribute('style', 'border-color: red; outline: none;');
    return;
  }
  hashtagsInput.removeAttribute('style');

})

commentInput.addEventListener('input', () => {
  if (isStringOverLimit(commentInput.value, MAX_COMMENT_LENGTH)) {
    commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
    return;
  }
  commentInput.setCustomValidity('');


  commentInput.reportValidity();

  if (!commentInput.validity.valid) {
    commentInput.setAttribute('style', 'border-color: red; outline: none;');
    return;
  }
  commentInput.removeAttribute('style');

})

export {setUserFormSubmit, hashtagsInput, commentInput};
