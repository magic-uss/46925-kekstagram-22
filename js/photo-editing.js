import {effectSlider, previewImage, originalEffect} from './nodes.js';

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const DEFAULT_SCALE_VALUE = 100;
let originalScale = DEFAULT_SCALE_VALUE;

const uploadNewPhoto = () => {
  originalScale = DEFAULT_SCALE_VALUE;
  scaleValue.value = DEFAULT_SCALE_VALUE + '%';
  previewImage.style.transform = 'scale(' + 1 + ')';
  previewImage.style.filter = '';
  previewImage.removeAttribute('class');
  effectSlider.setAttribute('hidden', true);
  originalEffect.setAttribute('checked', true);
}

const resizePhoto = (value) => {
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

/*scaleSmaller.addEventListener('click', () => {
  resizePhoto(-25);
})

scaleBigger.addEventListener('click', () => {
  resizePhoto(25);
})*/

document.querySelector('.img-upload__scale').addEventListener('click', (evt) => {
  if (scaleSmaller == evt.target) {
    resizePhoto(-25);
  }

  if (scaleBigger == evt.target) {
    resizePhoto(25);
  }
})

const effectRadioButtons = document.querySelectorAll('.effects__radio');

for (let i = 0; i <= effectRadioButtons.length - 1; i++) {
  effectRadioButtons[i].addEventListener('click', () => {
    previewImage.removeAttribute('class');
    previewImage.classList.add('effects__preview--' + effectRadioButtons[i].value);
  })
}

export {uploadNewPhoto};
