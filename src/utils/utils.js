export const getScrollBarWidth = () => {
  let scroll = document.createElement('div');
  scroll.style.overflow = 'scroll';
  document.body.appendChild(scroll);
  let width = scroll.offsetWidth - scroll.clientWidth;
  document.body.removeChild(scroll);
  return width;
};

export const getIos = () =>
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

export const getMobileView = () => window.innerWidth <= 640;

export const getTouchSupported = () =>
  'ontouchstart' in document.documentElement;
