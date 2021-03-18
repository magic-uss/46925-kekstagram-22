import {isEscEvent} from './util.js';
import {uploadNewPhoto} from './photo-editing.js';

const uploadClose = document.querySelector('#upload-cancel');

document.querySelector('#upload-file').addEventListener('change', () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  uploadNewPhoto();

  uploadClose.addEventListener('click', () => {
    closeUpload();
  });

  document.addEventListener('keydown', onUploadEscKeydown);
});

const onUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUpload();
  }
};

const closeUpload = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.querySelector('#upload-file').value = '';

  uploadClose.removeEventListener('click', () => {
    closeUpload();
  });

  document.removeEventListener('keydown', onUploadEscKeydown);
}
