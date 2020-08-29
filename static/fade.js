const FADE_DELAY = 2;

const init = (updateFn, mobileTouchStart) => {
  const fadeMe = document.querySelector('.fade');
  const trans = fadeMe.style.transition;

  let timer;
  const makeTimer = () => {
    const [fade, nextDelay] = updateFn();
    return setTimeout(() => {
      if (fade) {
        fadeMe.style.transition = trans;
        fadeMe.style.opacity = 0;
      } else {
        timer = makeTimer();
      }
    }, (nextDelay || FADE_DELAY) * 1000);
  };
  timer = makeTimer();

  document.addEventListener(
    mobileTouchStart ? 'touchstart' : 'mousemove',
    () => {
      clearTimeout(timer);
      fadeMe.style.transition += ', 0s opacity';
      fadeMe.style.opacity = 1;
      timer = makeTimer();
    }
  );
};

export default { init };
