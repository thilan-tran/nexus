import Fade from './fade.js';
import GoL from './life.js';
import Particles from './particles.js';
import Automata from './automata.js';

const getScrollWidth = () => {
  let scroll = document.createElement('div');
  scroll.style.overflow = 'scroll';
  document.body.appendChild(scroll);
  let width = scroll.offsetWidth - scroll.clientWidth;
  document.body.removeChild(scroll);
  return width;
};
const SCROLL_WIDTH = getScrollWidth();

const getIos = () =>
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
if (getIos()) {
  document.body.classList.add('ios-font-spacing');
}

const IS_MOBILE = window.innerWidth <= 640;

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

const carousel = document.querySelector('.carousel');
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

// if (content.getBoundingClientRect().top < window.innerHeight / 2) {
//   caret.classList.add('point-up');
// }
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

const modalList = [['.card', '.modal']];
for (const item of document.querySelector('.grid').children) {
  modalList.push([item, `.modal[data-project="${item.dataset.project}"]`]);
}

initModals(modalList);

function initModals(modalList) {
  const wrapper = document.querySelector('.body-wrapper');

  const openModal = (elem) => {
    if (!elem.classList.contains('show')) {
      wrapper.style.top = `-${window.scrollY}px`;
      wrapper.style.position = 'fixed';
      wrapper.style.width = `calc(100% - ${SCROLL_WIDTH}px)`;
      elem.classList.add('show');
    }
  };
  const closeModal = (elem) => {
    if (elem.classList.contains('show')) {
      const top = wrapper.style.top;
      wrapper.style.position = '';
      wrapper.style.top = '';
      wrapper.style.width = 'auto';
      window.scrollTo(0, parseInt(top || '0') * -1);
      elem.classList.remove('show');
    }
  };

  const registerModal = (clickElem, modalElem) => {
    if (IS_MOBILE) {
      modalElem.style.height = `${window.innerHeight * 0.9}px`;
    }

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

  modalList.forEach(([trigger, modal]) => {
    console.log(trigger, modal);
    registerModal(
      typeof trigger === 'string' ? document.querySelector(trigger) : trigger,
      typeof modal === 'string' ? document.querySelector(modal) : modal
    );
  });
}

const shouldFadeOverlay = () => {
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

Fade.init(shouldFadeOverlay, IS_MOBILE);

const SHOWCASES = [
  {
    obj: GoL,
    el: '#game-of-life',
    optionsEl: '.life-options',
    initOptions: [IS_MOBILE ? 8 : 10]
  },
  {
    obj: Automata,
    el: '#automata',
    optionsEl: '.automata-options',
    initOptions: []
  },
  {
    obj: Particles,
    el: '#particles',
    optionsEl: '.particle-options',
    initOptions: [optionsDrop]
  }
];

startShowcases('.swap', '.action-button');

function startShowcases(swapSelector, actionSelector) {
  let STATE = 0;

  const swap = document.querySelector(swapSelector);
  const actionButton = document.querySelector(actionSelector);
  actionButton.textContent = document.querySelector(
    SHOWCASES[0].el
  ).dataset.descrip;

  swap.addEventListener('click', () => {
    const nextState = (STATE + 1) % SHOWCASES.length;
    for (let i = 0; i < SHOWCASES.length; i++) {
      const { obj, el, optionsEl } = SHOWCASES[i];
      obj.reset();
      if (i === nextState) {
        document.querySelector(el).classList.remove('showcase-disable');
        document.querySelector(optionsEl).classList.remove('disable');
      } else {
        document.querySelector(el).classList.add('showcase-disable');
        document.querySelector(optionsEl).classList.add('disable');
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

  GoL.initOptionListeners({
    greyId: 'input[id="life-greyscale"]',
    colorId: 'input[id="life-colorful"]',
    traceId: 'input[name="trace"]',
    feedId: 'input[name="feed1D"]',
    delayId: 'input[name="delay"]',
    traceLengthId: 'input[name="trace-length"]'
  });

  Particles.initOptionListeners({
    greyId: 'input[id="particle-greyscale"]',
    colorId: 'input[id="particle-colorful"]',
    gravityId: 'input[name="gravity"]'
  });

  Automata.initOptionListeners({
    greyId: 'input[id="auto-greyscale"]',
    colorId: 'input[id="auto-colorful"]',
    prettyId: 'input[name="pretty"]',
    delayId: 'input[name="auto-delay"]'
  });

  SHOWCASES.forEach(({ obj, initOptions }) => {
    obj.init(...initOptions);
    obj.draw();
  });
}
