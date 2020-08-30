import Fade from './fade.js';
import GoL from './life.js';
import Particles from './particles.js';
import Automata from './automata.js';

const IS_MOBILE = window.innerWidth <= 640;

const carousel = document.querySelector('.carousel');

const optionsDrop = document.querySelector('.dropdown');
const dropContent = document.querySelector('.dropdown .dropdown-content');
optionsDrop.addEventListener(
  'click',
  (evt) =>
    !dropContent.contains(evt.target) && optionsDrop.classList.toggle('expand')
);
document.addEventListener(
  'click',
  (evt) =>
    !optionsDrop.contains(evt.target) && optionsDrop.classList.remove('expand')
);
document.addEventListener(
  'touchend',
  (evt) =>
    !optionsDrop.contains(evt.target) && optionsDrop.classList.remove('expand')
);

const content = document.querySelector('.content');

const caret = document.querySelector('.caret');
caret.addEventListener('click', () => {
  if (caret.classList.contains('point-up')) {
    carousel.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'nearest'
    });
  } else {
    content.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'nearest'
    });
  }
});

if (content.getBoundingClientRect().top < window.innerHeight / 2) {
  caret.classList.add('point-up');
}
const sticky = document.querySelector('.sticky');
const toolbar = document.querySelector('.toolbar');
document.addEventListener('scroll', () => {
  const rect = content.getBoundingClientRect();
  const pastSticky = document.querySelector('#about p').getBoundingClientRect();
  if (rect.top < window.innerHeight / 2) {
    caret.classList.add('point-up');
    toolbar.classList.add('hide-me');
  } else {
    caret.classList.remove('point-up');
    toolbar.classList.remove('hide-me');
  }
  if (pastSticky.top <= 0) {
    sticky.classList.add('up');
  } else {
    sticky.classList.remove('up');
  }
  optionsDrop.classList.remove('expand');
});

document.addEventListener('mousemove', (evt) => {
  if (
    !IS_MOBILE &&
    caret.classList.contains('point-up') &&
    evt.screenY > window.innerHeight / 5
  ) {
    caret.style.visibility = 'hidden';
  } else {
    caret.style.visibility = 'visible';
  }
});

if (window.innerWidth <= 640) {
  document.querySelector('.fade').classList.remove('fade');
  document.querySelector('.center-both').classList.add('fade');
}

const links = document.querySelectorAll('a');
links.forEach((link) =>
  link.addEventListener('click', (evt) => evt.stopPropagation())
);

const wrapper = document.querySelector('.body-wrapper');
const openModal = (elem) => {
  if (!elem.classList.contains('show')) {
    wrapper.style.top = `-${window.scrollY}px`;
    wrapper.style.position = 'fixed';
    elem.classList.add('show');
  }
};
const closeModal = (elem) => {
  if (elem.classList.contains('show')) {
    const top = wrapper.style.top;
    wrapper.style.position = '';
    wrapper.style.top = '';
    window.scrollTo(0, parseInt(top || '0') * -1);
    elem.classList.remove('show');
  }
};

const registerModalEvents = (clickElem, modalElem) => {
  const modalBody = modalElem.querySelector('.modal-body');
  const overlay = modalElem.nextElementSibling;
  overlay.addEventListener('click', () => {});
  modalElem
    .querySelector('.close')
    .addEventListener('click', () => closeModal(modalElem));
  clickElem.addEventListener('click', (evt) => {
    openModal(modalElem);
    evt.stopPropagation();
  });
  document.addEventListener('click', (evt) => {
    if (!modalBody.contains(evt.target)) {
      closeModal(modalElem);
      evt.stopPropagation();
    }
  });
};

const firstModal = document.querySelector('.modal');
if (IS_MOBILE) {
  firstModal.style.height = `${window.innerHeight * 0.9}px`;
}
registerModalEvents(document.querySelector('.card'), firstModal);
for (const item of document.querySelector('.grid').children) {
  const modal = document.querySelector(
    `.modal[data-project="${item.dataset.project}"]`
  );
  if (IS_MOBILE) {
    modal.style.height = `${window.innerHeight * 0.9}px`;
  }
  modal && registerModalEvents(item, modal);
}

// document.querySelector('.card').addEventListener('click', (evt) => {
//   modal.classList.toggle('show');
//   evt.stopPropagation();
// });
// modal
//   .querySelector('.close')
//   .addEventListener('click', () => modal.classList.remove('show'));
// document.addEventListener(
//   'click',
//   (evt) => !modal.contains(evt.target) && modal.classList.remove('show')
// );

const SHOWCASES = [
  { obj: GoL, el: '#game-of-life', options: '.life-options' },
  { obj: Automata, el: '#automata', options: '.automata-options' },
  { obj: Particles, el: '#particles', options: '.particle-options' }
];
let STATE = 0;

const swap = document.querySelector('.swap');
const actionButton = document.querySelector('.action-button');

swap.addEventListener('click', () => {
  const nextState = (STATE + 1) % SHOWCASES.length;
  for (let i = 0; i < SHOWCASES.length; i++) {
    const { obj, el, options } = SHOWCASES[i];
    obj.reset();
    if (i === nextState) {
      document.querySelector(el).classList.remove('showcase-disable');
      document.querySelector(options).classList.remove('disable');
    } else {
      document.querySelector(el).classList.add('showcase-disable');
      document.querySelector(options).classList.add('disable');
    }
  }
  actionButton.textContent = document.querySelector(
    SHOWCASES[nextState].el
  ).dataset.descrip;
  STATE = nextState;
  swap.classList.toggle('clicked');
});

actionButton.addEventListener('click', (evt) => {
  evt.target.blur();
  SHOWCASES[STATE].obj.spawn(evt);
});
const resetButtons = document.querySelectorAll('.reset');
resetButtons.forEach((button) =>
  button.addEventListener('click', () => SHOWCASES[STATE].obj.reset())
);

const greySelector = document.querySelector('input[id="life-greyscale"]');
greySelector.addEventListener('click', () =>
  GoL.setOption(GoL.options.greyscale, greySelector.checked)
);
const colorSelector = document.querySelector('input[id="life-colorful"]');
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
  'input[id="particle-greyscale"]'
);
partGreySelector.addEventListener('click', () =>
  Particles.setOption(Particles.options.greyscale, partGreySelector.checked)
);
const partColorSelector = document.querySelector(
  'input[id="particle-colorful"]'
);
partColorSelector.addEventListener('click', () =>
  Particles.setOption(Particles.options.greyscale, partGreySelector.checked)
);
const gravSelector = document.querySelector('input[name="gravity"]');
gravSelector.addEventListener('click', () =>
  Particles.setOption(Particles.options.gravity, gravSelector.checked)
);

const autoGreySelector = document.querySelector('input[id="auto-greyscale"]');
autoGreySelector.addEventListener('click', () =>
  Automata.setOption(Automata.options.greyscale, autoGreySelector.checked)
);
const autoColorSelector = document.querySelector('input[id="auto-colorful"]');
autoColorSelector.addEventListener('click', () =>
  Automata.setOption(Automata.options.greyscale, autoGreySelector.checked)
);
const prettySelector = document.querySelector('input[name="pretty"]');
prettySelector.addEventListener('click', () =>
  Automata.setOption(Automata.options.pretty, prettySelector.checked)
);
const autoDelaySlider = document.querySelector('input[name="auto-delay"]');
autoDelaySlider.addEventListener('change', () =>
  Automata.setOption(Automata.options.delay, autoDelaySlider.value)
);

const testFade = () => {
  let showcase = null;
  for (let i = 0; i < carousel.children.length; i++) {
    if (!carousel.children[i].classList.contains('showcase-disable')) {
      showcase = carousel.children[i];
    }
  }
  const pointingUp = caret.classList.contains('point-up');
  const fade =
    !pointingUp && showcase && showcase.classList.contains('fade-enable');
  const nextDelay = pointingUp ? 0.5 : 2;
  return [fade, nextDelay];
};

Fade.init(testFade, IS_MOBILE);

GoL.init(IS_MOBILE ? 8 : 10);
GoL.draw();

Particles.init(optionsDrop);
Particles.draw();

Automata.init();
Automata.draw();

const iOS = () =>
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

if (true) {
  document.body.classList.add('ios-font-spacing');
}
