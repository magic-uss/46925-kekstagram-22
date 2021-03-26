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
import {createPhotos, selectDefault, selectRandom, selectDiscussed, createPhotosArray} from './picture-list.js';

const CREATE_DELAY = 500;

const errorMessage = () => {
  pageMain.insertAdjacentHTML('beforeend', '<p style="position: absolute; top: 0;">Ошибка загрузки данных с сервера</p>');
}

const fetchPhotos = getData(
  (uploadedPhotos) => {
    createPhotosArray(uploadedPhotos);
    createPhotos(uploadedPhotos);
    selectDefault(uploadedPhotos, _.debounce(
      (photos) => createPhotos(photos),
      CREATE_DELAY,
    ));
    selectRandom(uploadedPhotos, _.debounce(
      (photos) => createPhotos(photos),
      CREATE_DELAY,
    ));
    selectDiscussed(uploadedPhotos, _.debounce(
      (photos) => createPhotos(photos),
      CREATE_DELAY,
    ));
  },
  () => {
    errorMessage();
  })

fetchPhotos();

setTimeout(() => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}, 1000);

setUserFormSubmit(closeUpload);


