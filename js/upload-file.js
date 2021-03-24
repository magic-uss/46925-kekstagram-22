import {isEscEvent} from './util.js';
import {uploadNewPhoto} from './photo-editing.js';
import {page} from './nodes.js';

const uploadClose = document.querySelector('#upload-cancel');
const uploadInput = document.querySelector('#upload-file');
const imageUploadWindow = document.querySelector('.img-upload__overlay');

uploadInput.addEventListener('change', () => {
  imageUploadWindow.classList.remove('hidden');
  page.classList.add('modal-open');

  uploadNewPhoto();

  uploadClose.addEventListener('click', () => {
    closeUpload();
  })

  document.addEventListener('keydown', onUploadEscKeydown);
})

const onUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (document.activeElement.tagName === 'INPUT') {
      evt.stopPropagation();
    }

    evt.preventDefault();
    closeUpload();
  }
}

const closeUpload = () => {
  imageUploadWindow.classList.add('hidden');
  page.classList.remove('modal-open');

  uploadInput.value = '';

  uploadClose.removeEventListener('click', () => {
    closeUpload();
  })

  document.removeEventListener('keydown', onUploadEscKeydown);
}

export {closeUpload};
