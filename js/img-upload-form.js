import {isStringOverLimit} from './util.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_QUANTITY = 5;
const MAX_COMMENT_LENGTH = 140;

hashtagsInput.addEventListener('focus', (evt) => {
  if (document.activeElement.tagName === 'INPUT') {
    evt.stopPropagation();
  }
})

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
  } else {
    hashtagsInput.removeAttribute('style');
  }
})

commentInput.addEventListener('input', () => {
  if (isStringOverLimit(commentInput.value, MAX_COMMENT_LENGTH)) {
    commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }

  commentInput.reportValidity();

  if (!commentInput.validity.valid) {
    commentInput.setAttribute('style', 'border-color: red; outline: none;');
  } else {
    commentInput.removeAttribute('style');
  }
})
