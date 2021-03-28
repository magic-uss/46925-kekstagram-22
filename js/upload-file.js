import {isEscEvent} from './util.js';
import {uploadNewPhoto} from './photo-editing.js';
import {page, previewImage, uploadInput} from './nodes.js';

const uploadClose = document.querySelector('#upload-cancel');
const imageUploadWindow = document.querySelector('.img-upload__overlay');

const onUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (document.activeElement.className === 'text__hashtags' || document.activeElement.className === 'text__description') {
      return;
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

uploadInput.addEventListener('change', () => {
  imageUploadWindow.classList.remove('hidden');
  page.classList.add('modal-open');

  uploadNewPhoto();

  previewImage.src = 'photos/' + uploadInput.files[0].name;

  uploadClose.addEventListener('click', () => {
    closeUpload();
  })

  document.addEventListener('keydown', onUploadEscKeydown);
})

export {closeUpload};
