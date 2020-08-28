import GoL from './life.js';
import Particles from './particles.js';

const drop = document.querySelector('.dropdown');
const content = document.querySelector('.dropdown .content');
drop.addEventListener(
  'click',
  (evt) => !content.contains(evt.target) && drop.classList.toggle('expand')
);
document.addEventListener('click', (evt) => {
  !drop.contains(evt.target) && drop.classList.remove('expand');
});

const custom = document.querySelector('.custom-content');
document.querySelector('.caret').addEventListener('click', () =>
  custom.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
    inline: 'nearest'
  })
);

//const modal = document.querySelector('.modal');
//document
//.querySelector('#about')
//.addEventListener('click', () => modal.classList.toggle('show'));
//modal.addEventListener('click', () => modal.classList.toggle('show'));

let CAROUSEL_STATE = 0;
const PLAYGROUND_ARR = [GoL, Particles];

const swap = document.querySelector('.shuffle');
const actionButton = document.querySelector('.action-button');
const carousel = document.querySelector('.carousel');

const lifeOptions = document.querySelector('.life-options');
const particleOptions = document.querySelector('.particle-options');
const OPTIONS_ARR = [lifeOptions, particleOptions];

swap.addEventListener('click', () => {
  const nextState = (CAROUSEL_STATE + 1) % carousel.children.length;
  for (let i = 0; i < carousel.children.length; i++) {
    PLAYGROUND_ARR[i].reset();
    OPTIONS_ARR[i].classList.toggle('disable');
    carousel.children[i].classList.toggle('container-disable');
  }
  actionButton.textContent = carousel.children[nextState].dataset.descrip;
  CAROUSEL_STATE = nextState;
  swap.classList.toggle('clicked');
});

actionButton.addEventListener('click', (evt) => {
  evt.target.blur();
  PLAYGROUND_ARR[CAROUSEL_STATE].spawn(evt);
});
const resetButton = document.querySelector('button[id="reset"]');
resetButton.addEventListener('click', PLAYGROUND_ARR[CAROUSEL_STATE].reset);

const greySelector = document.querySelector(
  '.life-options input[id="greyscale"]'
);
greySelector.addEventListener('click', () =>
  GoL.setOption(GoL.options.greyscale, greySelector.checked)
);
const colorSelector = document.querySelector(
  '.life-options input[id="colorful"]'
);
colorSelector.addEventListener('click', () =>
  GoL.setOption(GoL.options.greyscale, greySelector.checked)
);
const traceSelector = document.querySelector('input[name="trace"]');
traceSelector.addEventListener('click', () =>
  GoL.setOption(GoL.options.trace, traceSelector.checked)
);
const oneDimSelector = document.querySelector('input[name="feed1D"]');
oneDimSelector.addEventListener('click', () =>
  GoL.setOption(GoL.options.oneDimIput, oneDimSelector.checked)
);

const delaySlider = document.querySelector('input[name="delay"]');
delaySlider.addEventListener('change', () =>
  GoL.setOption(GoL.options.delay, delaySlider.value)
);
const traceSlider = document.querySelector('input[name="trace-length"]');
traceSlider.addEventListener('change', () =>
  GoL.setOption(GoL.options.traceLength, traceSlider.value)
);

const partGreySelector = document.querySelector(
  '.particle-options input[id="greyscale"]'
);
partGreySelector.addEventListener('click', () =>
  Particles.setOption(Particles.options.greyscale, partGreySelector.checked)
);
const partColorSelector = document.querySelector(
  '.particle-options input[id="colorful"]'
);
partColorSelector.addEventListener('click', () =>
  Particles.setOption(Particles.options.greyscale, partGreySelector.checked)
);
const gravSelector = document.querySelector('input[name="gravity"]');
gravSelector.addEventListener('click', () =>
  Particles.setOption(Particles.options.gravity, gravSelector.checked)
);

GoL.draw();
Particles.draw();
