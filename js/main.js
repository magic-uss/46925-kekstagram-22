import './picture-list.js';
import './upload-file.js';
import './photo-editing.js';
import './no-ui-slider.js';
import './img-upload-form.js';
import {createPhotos} from './picture-list.js';

fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((uploadedPhotos) => {
    createPhotos(uploadedPhotos);
  })
