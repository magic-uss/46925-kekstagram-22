/* global _:readonly */
import './picture-list.js';
import './upload-file.js';
import './photo-editing.js';
import './no-ui-slider.js';
import './img-upload-form.js';
import {closeUpload} from './upload-file.js';
import {setUserFormSubmit} from './img-upload-form.js';
import {getData} from './api.js';
import {pageMain} from './nodes.js';
import {filterSwitch, renderPhotos, createPhotos, createPhotosArray} from './picture-list.js';

const CREATE_DELAY = 500;

const showErrorInformation = () => {
  pageMain.insertAdjacentHTML('beforeend', '<p style="position: absolute; top: 0;">Ошибка загрузки данных с сервера</p>');
}

const fetchPhotos = getData(
  (uploadedPhotos) => {

    createPhotosArray(uploadedPhotos);
    createPhotos(uploadedPhotos);

    filterSwitch(_.debounce(
      (filter) => renderPhotos(filter, uploadedPhotos),
      CREATE_DELAY,
    ));
  },
  () => {
    showErrorInformation();
  })

fetchPhotos();

setUserFormSubmit(closeUpload, closeUpload);


