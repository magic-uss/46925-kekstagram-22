import './picture-list.js';
import './upload-file.js';
import './photo-editing.js';
import './no-ui-slider.js';
import './img-upload-form.js';
import {createPhotos} from './picture-list.js';
import {closeUpload} from './upload-file.js';
import {setUserFormSubmit} from './img-upload-form.js';
import {getData} from './api.js';
import {pageMain} from './nodes.js';

const errorMessage = () => {
  pageMain.insertAdjacentHTML('beforeend', '<p style="position: absolute; top: 0;">Ошибка загрузки данных с сервера</p>');
}

const fetchPhotos = getData(
  (uploadedPhotos) => {
    createPhotos(uploadedPhotos);
  },
  () => {
    errorMessage();
  })

fetchPhotos();

setUserFormSubmit(closeUpload);


