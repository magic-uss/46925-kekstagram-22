import {effectSlider, previewImage} from './nodes.js';
import {hashtagsInput, commentInput} from './img-upload-form.js';

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const inputsEffect = document.querySelectorAll('.effects__radio');
const DEFAULT_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;
let originalScale = DEFAULT_SCALE_VALUE;

const uploadNewPhoto = () => {
  scaleValue.value = DEFAULT_SCALE_VALUE + '%';
  previewImage.style.transform = 'scale(' + 1 + ')';
  previewImage.removeAttribute('style', 'filter');
  previewImage.removeAttribute('class');
  effectSlider.setAttribute('hidden', true);

  for (let i = 0; i <= inputsEffect.length - 1; i++) {
    if (i === 0) {
      inputsEffect[i].checked = true;
    }
    inputsEffect[i].removeAttribute('checked');
  }

  hashtagsInput.value = '';
  commentInput.value = '';
}

const resizePhoto = (evt) => {
  const value = (evt.target === scaleSmaller) ? -SCALE_VALUE_STEP : SCALE_VALUE_STEP;

  originalScale = originalScale + value;

  if (originalScale < SCALE_VALUE_STEP || originalScale > DEFAULT_SCALE_VALUE) {
    originalScale = originalScale - value;
  }

  scaleValue.value = originalScale + '%';

  if (originalScale < DEFAULT_SCALE_VALUE) {
    previewImage.style.transform = 'scale(0.' + originalScale + ')';
  }

  if (originalScale === DEFAULT_SCALE_VALUE) {
    previewImage.style.transform = 'scale(' + 1 + ')';
  }

  return originalScale;
}

const effectRadioButtons = document.querySelectorAll('.effects__radio');

document.querySelector('.img-upload__scale').addEventListener('click', resizePhoto);

for (let i = 0; i <= effectRadioButtons.length - 1; i++) {
  effectRadioButtons[i].addEventListener('click', () => {
    previewImage.removeAttribute('class');
    previewImage.classList.add('effects__preview--' + effectRadioButtons[i].value);
  })
}

export {uploadNewPhoto};
