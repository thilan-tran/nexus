const RESOLUTION = 10;
const LIFESPAN = 5;
const DELAY = 80;
const X_BOUND = Math.floor(window.innerWidth / RESOLUTION);
const Y_BOUND = Math.floor(window.innerHeight / RESOLUTION);

const PATTERNS = {
  acorn: [
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1]
  ],
  rPentomino: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
  ],
  dieHard: [
    [0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 1, 1]
  ]
};

let GRID = [];
let GRID_CPY = [];
for (let i = 0; i < X_BOUND; i++) {
  const row = [];
  const rowCpy = [];
  for (let j = 0; j < Y_BOUND; j++) {
    row.push({ live: false, spawned: false, kill: () => {} });
    rowCpy.push({ live: false, spawned: false, kill: () => {} });
  }
  GRID.push(row);
  GRID_CPY.push(rowCpy);
}

const randRange = (range) => Math.floor(Math.random() * range);

const createCell = (container, i, j, force = false) => {
  if (i >= GRID.length || j >= GRID[0].length) return;

  const element = GRID[i][j];
  const cpy = GRID_CPY[i][j];
  if (!element.live) {
    const part = document.createElement('div');
    part.classList.add('particle');
    part.style.left = i * RESOLUTION + 'px';
    part.style.top = j * RESOLUTION + 'px';
    container.appendChild(part);
    element.live = true;
    element.lifespan = (1000 * LIFESPAN) / DELAY;
    element.kill = () => {
      part.parentNode.removeChild(part);
      element.live = false;
    };
    if (force) cpy.live = true;
  }
};

const spawnPattern = (pattern) => {
  const container = document.querySelector('.container');
  const randX = randRange(parseInt(X_BOUND * 0.9)) + parseInt(X_BOUND * 0.1);
  const randY = randRange(parseInt(Y_BOUND * 0.9)) + parseInt(Y_BOUND * 0.1);
  pattern.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 1) {
        createCell(container, randX + i, randY + j, true);
      }
    });
  });
};

const clickClosestCell = (x, y) => {
  const idxX = Math.floor(x / RESOLUTION);
  const idxY = Math.floor(y / RESOLUTION);
  const container = document.querySelector('.container');
  createCell(container, idxX, idxY, true);
};

const getWrapped = (ref, i, j) => {
  const xBound = ref.length;
  const yBound = ref[0].length;
  let newI = i,
    newJ = j;

  if (i < 0) newI = xBound - 1;
  else if (i >= xBound) newI = 0;
  if (j < 0) newJ = yBound - 1;
  else if (j >= yBound) newJ = 0;
  return ref[newI][newJ];
};

const countNeighbors = (ref, i, j) => {
  let cnt = 0;
  if (getWrapped(ref, i - 1, j - 1).live) cnt++;
  if (getWrapped(ref, i - 1, j).live) cnt++;
  if (getWrapped(ref, i - 1, j + 1).live) cnt++;

  if (getWrapped(ref, i, j - 1).live) cnt++;
  if (cnt > 3) return cnt;
  if (getWrapped(ref, i, j + 1).live) cnt++;
  if (cnt > 3) return cnt;

  if (getWrapped(ref, i + 1, j - 1).live) cnt++;
  if (cnt > 3) return cnt;
  if (getWrapped(ref, i + 1, j).live) cnt++;
  if (cnt > 3) return cnt;
  if (getWrapped(ref, i + 1, j + 1).live) cnt++;
  return cnt;
};

const draw = () => {
  const container = document.querySelector('.container');
  GRID.forEach((row, i) => {
    row.forEach((elem, j) => {
      const numNeighbors = countNeighbors(GRID_CPY, i, j);
      if (elem.live) {
        if (numNeighbors < 2 || numNeighbors > 3 || elem.lifespan <= 0) {
          elem.kill();
        }
        elem.lifespan--;
      } else {
        if (numNeighbors === 3) {
          createCell(container, i, j);
        }
      }
    });
  });
  GRID.forEach((row, i) => {
    row.forEach((elem, j) => {
      GRID_CPY[i][j].live = elem.live;
    });
  });
};

document.querySelector('.action-button').addEventListener('click', (evt) => {
  const pats = Object.values(PATTERNS);
  const idx = randRange(pats.length);
  spawnPattern(pats[idx]);
  evt.target.blur();
});

// document.addEventListener('click', (evt) => {
//   clickClosestCell(evt.clientX, evt.clientY);
// });

setInterval(draw, DELAY);
