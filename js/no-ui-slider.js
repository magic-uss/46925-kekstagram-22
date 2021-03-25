/* global noUiSlider:readonly */
import {effectSlider, previewImage, originalEffect} from './nodes.js';

const effectValue = document.querySelector('.effect-level__value');
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
})

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
    effectValue.text = values[handle];

    previewImage.style.filter = effect + '(' + effectValue.text + units + ')';
  });
}

document.querySelector('#effect-chrome').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 1, 1, 0.1);
    sliderUpdate('grayscale', '');
  }
})

document.querySelector('#effect-sepia').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 1, 1, 0.1);
    sliderUpdate('sepia', '');
  }
})

document.querySelector('#effect-marvin').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 100, 100, 1);
    sliderUpdate('invert', '%');
  }
})

document.querySelector('#effect-phobos').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 3, 3, 0.1);
    sliderUpdate('blur', 'px');
  }
})

document.querySelector('#effect-heat').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(1, 3, 3, 0.1);
    sliderUpdate('brightness', '');
  }
})

originalEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectSlider.setAttribute('hidden', true);
  }
})

if (originalEffect.checked) {
  effectSlider.setAttribute('hidden', true);
}
