import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import {effectSlider, previewImage, originalEffect} from './nodes.js';

const effectValue = document.querySelector('.effect-level__value');
const DEFAULT_EFFECT_VALUE = 100;

effectValue.value = DEFAULT_EFFECT_VALUE;

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

const updateSlider = (effect, units) => {
  effectSlider.noUiSlider.off('update');

  effectSlider.noUiSlider.on('update', (values, handle) => {
    effectValue.text = values[handle];

    previewImage.style.filter = effect + '(' + effectValue.text + units + ')';
  });
}

noUiSlider.create(effectSlider, {
  range: {
    min: 1,
    max: DEFAULT_EFFECT_VALUE,
  },
  start: DEFAULT_EFFECT_VALUE,
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

document.querySelector('#effect-chrome').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 1, 1, 0.1);
    updateSlider('grayscale', '');
  }
})

document.querySelector('#effect-sepia').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 1, 1, 0.1);
    updateSlider('sepia', '');
  }
})

document.querySelector('#effect-marvin').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 100, 100, 1);
    updateSlider('invert', '%');
  }
})

document.querySelector('#effect-phobos').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(0, 3, 3, 0.1);
    updateSlider('blur', 'px');
  }
})

document.querySelector('#effect-heat').addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateSliderOptions(1, 3, 3, 0.1);
    updateSlider('brightness', '');
  }
})

originalEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    effectSlider.setAttribute('hidden', true);
    previewImage.style.filter = '';
  }
})

if (originalEffect.checked) {
  effectSlider.setAttribute('hidden', true);
}
