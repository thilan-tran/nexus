(() => {
  const MAX_SPEED = 20;
  const MIN_SPEED = 2;
  const MAX_LIFESPAN = 8;
  const DELAY = 10;

  const GRAVITY_ACCEL = -0.03 / (DELAY / 1000);

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

  const container = document.querySelector('.particle-container');
  const addParticle = (x, y, num = 1) => {
    for (let i = 0; i < num; i++) {
      const part = document.createElement('div');
      part.classList.add('particle');
      part.style.left = x + 'px';
      part.style.bottom = y + 'px';
      part.style.backgroundColor = getGradientColor(0);
      part.dataset.velX = getRandSpeed();
      part.dataset.velY = getRandSpeed();
      part.dataset.lifetime = getRandLife();
      container.appendChild(part);
    }
  };

  const moveParticles = () => {
    document.querySelectorAll('.particle').forEach((part) => {
      const life = Number(part.dataset.lifetime);
      const x = parseInt(part.style.left);
      const y = parseInt(part.style.bottom);
      let velX = Number(part.dataset.velX);
      let velY = Number(part.dataset.velY);

      if (part.dataset.lifetime === '0') {
        part.parentNode.removeChild(part);
        return;
      } else {
        part.dataset.lifetime = life - 1;
      }

      part.style.backgroundColor = getGradientColor(
        2 * MAX_SPEED - (Math.abs(velX) + Math.abs(velY))
      );

      let newX = x + velX;
      let newY = y + velY;
      part.style.left = newX + 'px';
      part.style.bottom = (newY >= 0 ? newY : 0) + 'px';

      if (newX > window.innerWidth || newX < 0) {
        velX *= -0.9;
      }
      if (newY > window.innerHeight || newY < 0) {
        velY *= -0.9;
      }

      if (GRAV) {
        if (newY > 0) {
          velY += GRAVITY_ACCEL;
        } else if (Math.abs(velY) < 25) {
          velY = 0;
        }
      }

      part.dataset.velX = velX;
      part.dataset.velY = velY;
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

  // const greySelector = document.querySelector('input[id="greyscale"]');
  // const colorSelector = document.querySelector('input[id="colorful"]');
  // const gravSelector = document.querySelector('input[name="gravity"]');

  const onSelector = () => {
    GRAV = gravSelector.checked;
    COLOR_RANGE = greySelector.checked ? GREYSCALE_RANGE : COLORFUL_RANGE;
  };

  // colorSelector.addEventListener('click', onSelector);
  // greySelector.addEventListener('click', onSelector);
  // gravSelector.addEventListener('click', onSelector);

  const draw2 = () => {
    if (container.classList.contains('container-disable')) {
      window.requestAnimationFrame(draw2);
      return;
    }
    if (MOUSE_DOWN) {
      addParticle(X, Y, 1);
    }
    moveParticles();
    window.requestAnimationFrame(draw2);
  };

  draw2();
})();
