import {effectSlider, previewImage, originalEffect} from './nodes.js';
import {hashtagsInput, commentInput} from './img-upload-form.js';

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const inputEffect = document.querySelector('.effects__radio');

const DEFAULT_SCALE_VALUE = 100;
let originalScale = DEFAULT_SCALE_VALUE;

const uploadNewPhoto = () => {
  originalScale = DEFAULT_SCALE_VALUE;
  scaleValue.value = DEFAULT_SCALE_VALUE + '%';
  previewImage.style.transform = 'scale(' + 1 + ')';
  previewImage.removeAttribute('style', 'filter');
  previewImage.removeAttribute('class');
  effectSlider.setAttribute('hidden', true);
  inputEffect.removeAttribute('checked');
  hashtagsInput.value = '';
  commentInput.value = '';
}

const resizePhoto = (evt) => {
  const value = (evt.target === scaleSmaller) ? -25 : 25;

  originalScale = originalScale + value;

  if (originalScale < 25 || originalScale > 100) {
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

document.querySelector('.img-upload__scale').addEventListener('click', resizePhoto);

const effectRadioButtons = document.querySelectorAll('.effects__radio');

for (let i = 0; i <= effectRadioButtons.length - 1; i++) {
  effectRadioButtons[i].addEventListener('click', () => {
    previewImage.removeAttribute('class');
    previewImage.classList.add('effects__preview--' + effectRadioButtons[i].value);
  })
}

export {uploadNewPhoto};
