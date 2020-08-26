const BASE_SPEED = 3;
const SPEED_RANGE = 5;
const MAX_LIFESPAN = 12;
const DELAY = 5;

let bouncing = false;

const randRange = (range) => Math.floor(Math.random() * range);
const getRandSpeed = (scale = null) =>
  (scale || (Math.random() > 0.5 ? 1 : -1)) *
  (randRange(SPEED_RANGE) + BASE_SPEED);

const moveElem = (el) => {
  const x = parseInt(el.style.left) || 0;
  const y = parseInt(el.style.top) || 0;
  const velX = Number(el.dataset.velX);
  const velY = Number(el.dataset.velY);
  let newX = x + velX;
  let newY = y + velY;

  el.style.left = newX + 'px';
  el.style.top = newY + 'px';
  const rect = el.getBoundingClientRect();

  if (rect.left > window.innerWidth - 220 || rect.left < 10)
    el.dataset.velX = -1 * velX;
  if (rect.top > window.innerHeight - 110 || rect.top < 10)
    el.dataset.velY = -1 * velY;
};

const button = document.querySelector('.action-button');
// button.addEventListener('click', (evt) => {
//   if (!bouncing) {
//     bouncing = true;
//     button.style.position = 'relative';
//     button.style.transition = '0s all';
//     button.dataset.velX = getRandSpeed();
//     button.dataset.velY = getRandSpeed();
//   } else {
//     bouncing = false;
//     button.style.transition = '0.2s all ease';
//   }
//   evt.stopPropagation();
//   button.blur();
// });

document.addEventListener('click', () => {
  if (!bouncing) {
    bouncing = true;
    button.style.position = 'relative';
    button.style.transition = '0s all';
    button.dataset.velX = getRandSpeed();
    button.dataset.velY = getRandSpeed();
  }
  const velX = Number(button.dataset.velX) || getRandSpeed();
  const velY = Number(button.dataset.velY) || getRandSpeed();
  button.dataset.velX = velX > 0 ? getRandSpeed(-1) : getRandSpeed(1);
  button.dataset.velY = velY > 0 ? getRandSpeed(-1) : getRandSpeed(1);
  button.blur();
});

setInterval(() => {
  if (bouncing) {
    moveElem(button);
  }
}, 10);
