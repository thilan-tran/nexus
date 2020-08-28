const FADE_DELAY = 3;

(() => {
  const fadeMe = document.querySelector('.fade');
  const trans = fadeMe.style.transition;
  const content = document.querySelector('.container');

  let timer;
  const makeTimer = () =>
    setTimeout(() => {
      if (
        !content ||
        content.classList.contains('enable-fade') ||
        content.childElementCount > 0
      ) {
        fadeMe.style.transition = trans;
        fadeMe.style.opacity = 0;
      } else {
        timer = makeTimer();
      }
    }, FADE_DELAY * 1000);
  timer = makeTimer();

  document.addEventListener('mousemove', () => {
    clearTimeout(timer);
    fadeMe.style.transition = '0s opacity';
    fadeMe.style.opacity = 1;
    timer = makeTimer();
  });
})();
