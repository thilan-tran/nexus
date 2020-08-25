const RESOLUTION = 10;
const DELAY = 1;
const MAP = {};
let DOWN = false,
  X,
  Y;

const addParticle = (x, y) => {
  const part = document.createElement('div');
  part.classList.add('particle');
  part.classList.add('falling');
  part.style.left = x + 'px';
  const key = parseInt(x / RESOLUTION);
  const stacked = MAP[key];
  if (stacked && y < stacked) {
    part.style.bottom = stacked + 1 + 'px';
    MAP[key] = stacked + 1;
  } else {
    part.style.bottom = y + 'px';
  }
  document.querySelector('.container').appendChild(part);
};

const moveParticles = () => {
  document.querySelectorAll('.falling').forEach((part) => {
    const y = parseInt(part.style.bottom);
    const x = parseInt(part.style.left);
    const key = parseInt(x / RESOLUTION);
    let stacked = MAP[key];
    if (!stacked) {
      MAP[key] = 1;
      stacked = 1;
    }

    if (y > stacked) {
      part.style.bottom = y - 1 + 'px';
    } else {
      part.classList.remove('falling');
      MAP[key] = stacked + 1;
    }
  });
};

document.querySelector('.action-button').addEventListener('click', (evt) => {
  evt.target.blur();
});

document.addEventListener('mousedown', () => (DOWN = true));
document.addEventListener('mouseup', () => (DOWN = false));
document.addEventListener('mousemove', (evt) => {
  X = evt.clientX;
  Y = window.innerHeight - evt.clientY;
});

setInterval(() => {
  if (DOWN) {
    addParticle(X, Y);
  }
  moveParticles();
}, DELAY);
