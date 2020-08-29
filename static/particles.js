const MAX_SPEED = 15;
const MAX_LIFESPAN = 8;
const DELAY = 10;

const GRAVITY_ACCEL = +0.05 / (DELAY / 1000);

let OPTIONS_ELEM = null;
let GRAV = false;
let MOUSE_DOWN = false,
  X,
  Y;

const COLORFUL_RANGE = [
  [242, 0, 48],
  [100, 129, 244]
];
const GREYSCALE_RANGE = [
  [0, 0, 0],
  [255, 255, 255]
];
let COLOR_RANGE = COLORFUL_RANGE;

const SCALED_LIFESPAN = (MAX_LIFESPAN * 1000) / DELAY;

const randRange = (range) => Math.floor(Math.random() * range);

const getRandSpeed = () =>
  (Math.random() > 0.5 ? 1 : -1) * (randRange(MAX_SPEED) + 1);
const getRandLife = () => randRange(SCALED_LIFESPAN) + 1;
const getGradientColor = (bias) => {
  const [start, end] = COLOR_RANGE;
  const rDiff = end[0] - start[0];
  const gDiff = end[1] - start[1];
  const bDiff = end[2] - start[2];

  const weight = bias / (2 * MAX_SPEED);
  const r = parseInt(rDiff * weight + start[0]);
  const g = parseInt(gDiff * weight + start[1]);
  const b = parseInt(bDiff * weight + start[2]);
  return `rgb(${r}, ${g}, ${b})`;
};

const canvas = document.querySelector('#particles');
const WIDTH = window.innerWidth - 50;
const HEIGHT = window.innerHeight - 50;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');

let BOX = [];

const addParticle = (x, y, num = 1) => {
  for (let i = 0; i < num; i++) {
    const part = {
      x,
      y,
      velX: getRandSpeed(),
      velY: getRandSpeed(),
      life: getRandLife()
    };
    BOX.push(part);
  }
};

const moveParticles = () => {
  if (!BOX.length) {
    canvas.classList.remove('fade-enable');
    return;
  } else {
    canvas.classList.add('fade-enable');
  }

  // ctx.fillStyle = '#fff';
  // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < BOX.length; i++) {
    const part = BOX[i];
    let { life, x, y, velX, velY } = part;

    if (life <= 0) {
      BOX.splice(i--, 1);
      continue;
    } else {
      // console.log(i, life);
      part.life--;
    }

    let newX = x + velX;
    let newY = y + velY;
    part.x = newX;
    part.y = newY;

    let drawX = newX < 0 ? -1 * newX : newX;
    let drawY = newY < 0 ? -1 * newY : newY;
    drawX = drawX + 10 > WIDTH ? 2 * WIDTH - drawX : drawX;
    drawY = drawY + 10 > HEIGHT ? 2 * HEIGHT - drawY : drawY;
    // ctx.fillStyle = getGradientColor(
    //   2 * MAX_SPEED - (Math.abs(velX) + Math.abs(velY))
    // );
    ctx.fillStyle = '#000';
    ctx.fillRect(drawX, drawY, 10, 10);

    if (newX > WIDTH || newX < 0) {
      velX *= -1;
    }
    if (newY > HEIGHT || newY < 0) {
      velY *= GRAV ? -0.9 : -1;
    }

    if (GRAV) {
      if (newY < HEIGHT) {
        velY += GRAVITY_ACCEL;
        // } else if (Math.abs(velY) < 25) {
        // velY = 0;
      }
    }

    part.velX = velX;
    part.velY = velY;
  }
};

const spawn = (evt) => {
  addParticle(evt.clientX, evt.clientY, 5);
};

document.querySelector('.action-button').addEventListener('click', (evt) => {
  addParticle(evt.clientX, evt.clientY, 5);
  evt.target.blur();
});

document.addEventListener('mousedown', (evt) => {
  if (
    evt.pageY <= HEIGHT &&
    (!OPTIONS_ELEM || !OPTIONS_ELEM.contains(evt.target))
  ) {
    MOUSE_DOWN = true;
  }
});
document.addEventListener('mouseup', () => (MOUSE_DOWN = false));
document.addEventListener('mousemove', (evt) => {
  X = evt.clientX;
  Y = evt.clientY;
});

const options = {
  greyscale: 0,
  gravity: 1
};

const setOption = (type, value) => {
  switch (type) {
    case options.greyscale:
      COLOR_RANGE = value ? GREYSCALE_RANGE : COLORFUL_RANGE;
      break;
    case options.gravity:
      GRAV = value;
      break;
  }
};

const reset = () => {
  while (BOX.length) {
    BOX.splice(0, 1);
  }
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

let timestamp = new Date();
const draw = () => {
  const now = new Date();
  if (
    canvas.classList.contains('showcase-disable') ||
    now - timestamp < DELAY
  ) {
    window.requestAnimationFrame(draw);
    return;
  }
  timestamp = now;
  if (MOUSE_DOWN) {
    addParticle(X, Y, 1);
  }
  moveParticles();
  window.requestAnimationFrame(draw);
};

const init = (elem) => (OPTIONS_ELEM = elem);

export default { init, draw, reset, spawn, options, setOption };
