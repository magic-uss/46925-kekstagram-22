import {isStringOverLimit} from './util.js';

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
let hashtagsArray = [];

const hashtagCheck = (hashtag) => {
  const valueLength = hashtag.length;
  /*const regex = /^([a-zа-яё]+|\d+)$/i;*/

  if (hashtag[0] != '#' && hashtagsArray.length <= 5) {
    hashtagsInput.setCustomValidity('Хэштег должен начинаться с символа #');
  } else if (valueLength < MIN_HASHTAG_LENGTH && hashtagsArray.length <= 5) {
    hashtagsInput.setCustomValidity('Хэштег должен состоять из знака # и как минимум одного символа после него');
  } /*else if (valueLength > 1) {
    for (let i = 1; i <= valueLength - 1; i++) {
      if (!regex.test(hashtag[i])) {
        hashtagsInput.setCustomValidity('В имени хэштега можно использовать только буквы и числа');
      }
    }
  }*/ else if (valueLength > MAX_HASHTAG_LENGTH) {
    hashtagsInput.setCustomValidity('Хэштег не может быть длинее 20-ти символов');
  } else if (hashtagsArray.length > 1 && hashtagsArray.length <= 5) {
    for (let j = 1; j <= hashtagsArray.length - 1; j++) {
      let current = hashtagsArray[j];

      for (let k = 0; k < j; k++) {
        if (current.toLowerCase() === hashtagsArray[k].toLowerCase()) {
          hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
        } else {
          hashtagsInput.setCustomValidity('');
        }
      }
    }
  } else if (hashtagsArray.length > 5) {
    hashtagsInput.setAttribute('maxlength', hashtagsArray.length);
    hashtagsInput.setCustomValidity('Нельзя указывать более пяти хэштегов');
  } else {
    hashtagsInput.removeAttribute('maxlength');
    hashtagsInput.setCustomValidity('');
  }

  hashtagsInput.reportValidity();
}

hashtagsInput.addEventListener('input', () => {
  /*onUploadEscKeydown.stopPropagation();*/

  hashtagsArray = hashtagsInput.value.split(' ');

  for (let i = 0; i <= hashtagsArray.length - 1; i++) {
    hashtagCheck(hashtagsArray[i]);
  }

  return hashtagsArray;
});

hashtagsInput.addEventListener('invalid', () => {
  hashtagsInput.setAttribute('style', 'border-color: red');
});

commentInput.addEventListener('input', (/*evt*/) => {
  /*evt.stopPropagation();*/

  if (isStringOverLimit(commentInput.value, 140)) {
    commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }

  commentInput.reportValidity();
});

commentInput.addEventListener('invalid', () => {
  commentInput.setAttribute('style', 'border-color: red');
});
