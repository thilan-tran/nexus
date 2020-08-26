const MAX_SPEED = 15;
const MAX_LIFESPAN = 10;
const DELAY = 10;

let MOUSE_DOWN = false,
  X,
  Y;

const randRange = (range) => Math.floor(Math.random() * range);
const getRandSpeed = () =>
  (Math.random() > 0.5 ? 1 : -1) * (randRange(MAX_SPEED) + 1);
const getRandLife = () => randRange((MAX_LIFESPAN * 1000) / DELAY) + 1;

const addParticle = (x, y, num = 1) => {
  for (let i = 0; i < num; i++) {
    const part = document.createElement('div');
    part.classList.add('particle');
    part.style.left = x + 'px';
    part.style.bottom = y + 'px';
    part.dataset.velX = getRandSpeed();
    part.dataset.velY = getRandSpeed();
    part.dataset.lifetime = getRandLife();
    document.querySelector('.container').appendChild(part);
  }
};

const moveParticles = () => {
  document.querySelectorAll('.particle').forEach((part) => {
    const life = Number(part.dataset.lifetime);
    const x = parseInt(part.style.left);
    const y = parseInt(part.style.bottom);
    const velX = Number(part.dataset.velX);
    const velY = Number(part.dataset.velY);

    if (part.dataset.lifetime === '0') {
      part.parentNode.removeChild(part);
      return;
    } else {
      part.dataset.lifetime = life - 1;
    }

    let newX = x + velX;
    let newY = y + velY;
    if (newX > window.innerWidth || newX < 0) part.dataset.velX = -1 * velX;
    if (newY > window.innerHeight || newY < 0) part.dataset.velY = -1 * velY;
    part.style.left = newX + 'px';
    part.style.bottom = newY + 'px';
  });
};

document.querySelector('.action-button').addEventListener('click', (evt) => {
  addParticle(evt.clientX, window.innerHeight - evt.clientY, 5);
  evt.target.blur();
});

document.addEventListener('mousedown', () => (MOUSE_DOWN = true));
document.addEventListener('mouseup', () => (MOUSE_DOWN = false));
document.addEventListener('mousemove', (evt) => {
  X = evt.clientX;
  Y = window.innerHeight - evt.clientY;
});

// document.querySelector('.action-button').addEventListener('mousedown', () => {
//   const x = randRange(window.innerWidth);
//   const y = randRange(window.innerHeight);
//   addParticle(x, y);
// });

setInterval(() => {
  if (MOUSE_DOWN) {
    addParticle(X, Y, 1);
  }
  moveParticles();
}, DELAY);
