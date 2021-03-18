/* global noUiSlider:readonly */
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const previewImage = document.querySelector('.img-upload__preview img');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const originalEffect = document.querySelector('#effect-none');

const DEFAULT_SCALE_VALUE = 100;
let originalScale = DEFAULT_SCALE_VALUE;

const uploadNewPhoto = () => {
  originalScale = DEFAULT_SCALE_VALUE;
  scaleValue.value = DEFAULT_SCALE_VALUE + '%';
  previewImage.setAttribute('style', 'transform: scale(' + 1 + ')');
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
    previewImage.setAttribute('style', 'transform: scale(0.' + originalScale + ')');
  }

  if (originalScale === DEFAULT_SCALE_VALUE) {
    previewImage.setAttribute('style', 'transform: scale(' + 1 + ')');
  }

  return originalScale;
}

scaleSmaller.addEventListener('click', () => {
  resizePhoto(-25);
})

scaleBigger.addEventListener('click', () => {
  resizePhoto(25);
})

const effectRadioButtons = document.querySelectorAll('.effects__radio');

for (let i = 0; i <= effectRadioButtons.length - 1; i++) {
  effectRadioButtons[i].addEventListener('click', () => {
    previewImage.removeAttribute('class');
    previewImage.removeAttribute('style');
    previewImage.classList.add('effects__preview--' + effectRadioButtons[i].value);
  })
}

const DEFAULT_EFFECT_VALUE = 100;
effectValue.value = DEFAULT_EFFECT_VALUE;

noUiSlider.create(effectSlider, {
  range: {
    min: 1,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => {
      return parseFloat(value);
    },
  },
});

const updateSliderOptions = (minValue, maxValue, start, step) => {
  effectSlider.removeAttribute('hidden');

  effectSlider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: start,
    step: step,
  });
}

const sliderUpdate = (effect, units) => {
  effectSlider.noUiSlider.off('update');

  effectSlider.noUiSlider.on('update', (values, handle) => {
    effectValue.value = values[handle];
    previewImage.setAttribute('style', 'filter: ' + effect + '(' + effectValue.value + units + ')');
  });
}

document.querySelector('#effect-chrome').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 1, 1, 0.1);
    sliderUpdate('grayscale', '');
  }
});

document.querySelector('#effect-sepia').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 1, 1, 0.1);
    sliderUpdate('sepia', '');
  }
});

document.querySelector('#effect-marvin').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 100, 100, 1);
    sliderUpdate('invert', '%');
  }
});

document.querySelector('#effect-phobos').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 3, 3, 0.1);
    sliderUpdate('blur', 'px');
  }
});

document.querySelector('#effect-heat').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(1, 3, 3, 0.1);
    sliderUpdate('brightness', '');
  }
});

originalEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectSlider.setAttribute('hidden', true);
  }
});

if (originalEffect.checked) {
  effectSlider.setAttribute('hidden', true);
}

export {uploadNewPhoto};
