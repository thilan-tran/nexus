const RESOLUTION = 10;
const MAX_CELLS_PERCENT = 0.18;
const NUM_COLORS = 8;
const LIFESPAN = 2;
const DEATHSPAN = 7;
const DELAY = 70;

const AGE_OVERFLOW_THRESHOLD = 0.15;
const SPAWN_THRESHOLD = 0.3;

const X_BOUND = Math.floor(window.innerWidth / RESOLUTION);
const Y_BOUND = Math.floor(window.innerHeight / RESOLUTION);
const MAX_CELLS = X_BOUND * Y_BOUND * MAX_CELLS_PERCENT;
let SCALED_LIFESPAN = (1000 * LIFESPAN) / DELAY;
let SCALED_DEATHSPAN = (1000 * DEATHSPAN) / DELAY;

const CONTAINER = document.querySelector('.container');

const PATTERNS = {
  // glider: [
  //   [0, 1, 0],
  //   [0, 0, 1],
  //   [1, 1, 1]
  // ],
  bunnies: [
    [1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 0]
  ],
  rabbits: [
    [1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0]
  ],
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

const GRID = [];
const GRID_CPY = [];
const DEAD_CELLS = [];

for (let i = 0; i < X_BOUND; i++) {
  const row = [];
  const rowCpy = [];
  const rowCpy2 = [];
  for (let j = 0; j < Y_BOUND; j++) {
    row.push({ live: false });
    rowCpy.push({ live: false });
    rowCpy2.push({ exists: false });
  }
  GRID.push(row);
  GRID_CPY.push(rowCpy);
  DEAD_CELLS.push(rowCpy2);
}

let sourceRow = Y_BOUND - 1;

// bright green -> dark green
const LIVE_CELL_COLORS = [
  [18, 223, 153],
  [38, 164, 121]
];

// bright red: rgb(255, 64, 129) -> dark red: rgb(240, 79, 134)

// teal -> dark grey teal
const DEAD_CELL_COLORS = [
  [15, 160, 187],
  [5, 51, 60]
];

const GREYSCALE_CELL_COLORS = [
  [
    [0, 0, 0],
    [90, 90, 90]
  ],
  [
    [0, 0, 0],
    [200, 200, 200]
  ]
];

const getGradient = (ticks, deadColors = false, customColors = null) => {
  const ref = deadColors ? SCALED_DEATHSPAN : SCALED_LIFESPAN;
  let start, end;
  if (customColors) {
    [start, end] = deadColors ? customColors[1] : customColors[0];
  } else {
    [start, end] = deadColors ? DEAD_CELL_COLORS : LIVE_CELL_COLORS;
  }
  const rDiff = end[0] - start[0];
  const gDiff = end[1] - start[1];
  const bDiff = end[2] - start[2];

  const r = parseInt(rDiff * (ticks / ref) + start[0]);
  const g = parseInt(gDiff * (ticks / ref) + start[1]);
  const b = parseInt(bDiff * (ticks / ref) + start[2]);
  return `rgb(${r}, ${g}, ${b})`;
};

const L_COLOR_MAP = new Array(NUM_COLORS).fill('');
const D_COLOR_MAP = new Array(NUM_COLORS).fill('');
const initColors = (customColors = null) => {
  for (let i = 0; i < NUM_COLORS; i++) {
    L_COLOR_MAP[i] = getGradient(
      (i / NUM_COLORS) * SCALED_LIFESPAN,
      false,
      customColors
    );
    D_COLOR_MAP[i] = getGradient(
      (i / NUM_COLORS) * SCALED_DEATHSPAN,
      true,
      customColors
    );
  }
};
initColors();

const getWrappedCell = (ref, i, j, retIdx = false) => {
  let newI = i;
  let newJ = j;

  if (i < 0) newI = X_BOUND - 1;
  else if (i >= X_BOUND) newI = 0;
  if (j < 0) newJ = Y_BOUND - 1;
  else if (j >= Y_BOUND) newJ = 0;
  return retIdx ? [ref[newI][newJ], newI, newJ] : ref[newI][newJ];
};

const createCell = (i, j, force = false) => {
  const cell = getWrappedCell(GRID, i, j);
  const cpy = getWrappedCell(GRID_CPY, i, j);
  const [ded, dedI, dedJ] = getWrappedCell(DEAD_CELLS, i, j, true);

  if (!cell.ref) {
    const part = document.createElement('div');
    part.classList.add('particle');
    part.style.left = i * RESOLUTION + 'px';
    part.style.top = j * RESOLUTION + 'px';
    part.style.backgroundColor = L_COLOR_MAP[0];
    CONTAINER.appendChild(part);
    cell.ref = part;
  }

  if (!cell.live) {
    const part = cell.ref;
    part.style.backgroundColor = L_COLOR_MAP[0];

    cell.live = true;
    cell.lifespan = SCALED_LIFESPAN;
    cell.kill = (noFadeOut = false) => {
      cell.live = false;
      part.style.backgroundColor = D_COLOR_MAP[0];
      if (!noFadeOut) {
        cell.lifespan = SCALED_DEATHSPAN;
        if (!ded.exists) {
          DEAD_CELLS[dedI][dedJ] = {
            ...cell,
            getAlive: () => cell.live,
            exists: true
          };
        }
      }
    };
    cell.remove = () => {
      cell.lifespan = null;
      part.style.backgroundColor = '#fff';
    };
    cell.reColor = (ticks, deadColors = false) => {
      const idx = ~~(
        ((deadColors ? SCALED_DEATHSPAN : SCALED_LIFESPAN) - ticks) /
        ((deadColors ? SCALED_DEATHSPAN : SCALED_LIFESPAN) / NUM_COLORS + 1)
      );
      const color = deadColors ? D_COLOR_MAP[idx] : L_COLOR_MAP[idx];
      part.style.backgroundColor = color;
    };

    if (force) {
      cpy.live = true;
    }
  }
};

const randRange = (range) => Math.floor(Math.random() * range);

const startR30 = () => {
  const randX = randRange(parseInt(X_BOUND * 0.9)) + parseInt(X_BOUND * 0.1);
  createCell(randX, sourceRow, true);
};

const spawnPattern = (pattern) => {
  const randX = randRange(parseInt(X_BOUND * 0.9)) + parseInt(X_BOUND * 0.1);
  const randY = randRange(parseInt(Y_BOUND * 0.9)) + parseInt(Y_BOUND * 0.1);
  const orientation = randRange(4);
  pattern.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 1) {
        switch (orientation) {
          case 0:
            createCell(randX + i, randY + j, true);
            break;
          case 1:
            createCell(randX - i, randY + j, true);
            break;
          case 2:
            createCell(randX + i, randY - j, true);
            break;
          case 3:
            createCell(randX - i, randY - j, true);
            break;
        }
      }
    });
  });
};

const clickClosestCell = (x, y) => {
  const idxX = Math.floor(x / RESOLUTION);
  const idxY = Math.floor(y / RESOLUTION);
  createCell(idxX, idxY, true);
};

const countNeighbors = (ref, i, j) => {
  let cnt = 0;
  if (getWrappedCell(ref, i - 1, j - 1).live) cnt++;
  if (getWrappedCell(ref, i - 1, j).live) cnt++;
  if (getWrappedCell(ref, i - 1, j + 1).live) cnt++;

  if (getWrappedCell(ref, i, j - 1).live) cnt++;
  if (cnt > 3) return cnt;
  if (getWrappedCell(ref, i, j + 1).live) cnt++;
  if (cnt > 3) return cnt;

  if (getWrappedCell(ref, i + 1, j - 1).live) cnt++;
  if (cnt > 3) return cnt;
  if (getWrappedCell(ref, i + 1, j).live) cnt++;
  if (cnt > 3) return cnt;
  if (getWrappedCell(ref, i + 1, j + 1).live) cnt++;
  return cnt;
};

let lastCnt = 0;
let cnt = 0;
let oldestDeadCells = [];
const draw = () => {
  DEAD_CELLS.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.exists) {
        cnt++;
        if (cell.lifespan <= 0) {
          cell.remove();
          cell.exists = false;
        } else {
          if (cell.lifespan < SCALED_DEATHSPAN * AGE_OVERFLOW_THRESHOLD) {
            oldestDeadCells.push([i, j]);
          }
          cell.lifespan--;
          if (!cell.getAlive()) {
            cell.reColor(cell.lifespan, true);
          }
        }
      }
    });
  });

  if (cnt > MAX_CELLS) {
    console.log('Trimming', oldestDeadCells.length);
    oldestDeadCells.forEach(([i, j]) => {
      const cell = DEAD_CELLS[i][j];
      cell.remove();
      cell.exists = false;
    });
    cnt -= oldestDeadCells.length;
  }
  oldestDeadCells = [];

  lastCnt = cnt;
  cnt = 0;

  GRID.forEach((row, i) => {
    row.forEach((cell, j) => {
      // if (j !== sourceRow) {
      const numNeighbors = countNeighbors(GRID_CPY, i, j);
      if (cell.live) {
        if (numNeighbors < 2 || numNeighbors > 3) {
          cell.kill();
        } else {
          cell.lifespan--;
          cell.reColor(cell.lifespan);
          cnt++;
        }
      } else {
        if (numNeighbors === 3) {
          createCell(i, j);
          cnt++;
        }
      }
      // }
    });
  });

  // for (let i = 1; i < X_BOUND - 1; i++) {
  //   const [L, C, R] = [
  //     GRID_CPY[i - 1][sourceRow].live,
  //     GRID_CPY[i][sourceRow].live,
  //     GRID_CPY[i + 1][sourceRow].live
  //   ];

  //   const CorR = C || R;
  //   const R30 = (L && !CorR) || (!L && CorR);

  //   const elem = GRID[i][sourceRow];
  //   if (R30 && !elem.live) {
  //     createCell(i, sourceRow);
  //   } else if (!R30 && elem.live) {
  //     elem.kill(true);
  //   }
  // }

  GRID.forEach((row, i) => {
    row.forEach((cell, j) => {
      GRID_CPY[i][j].live = cell.live;
    });
  });
};

const reset = (fullReset = true) => {
  if (fullReset) {
    GRID.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.live) {
          cell.kill();
          GRID_CPY[i][j].live = false;
        }
      });
    });
  }
  DEAD_CELLS.forEach((row) => {
    row.forEach((cell) => {
      if (cell.exists) {
        cell.remove();
        cell.exists = false;
      }
    });
  });
};

document.querySelector('.action-button').addEventListener('click', (evt) => {
  const pats = Object.entries(PATTERNS);
  const idx = randRange(pats.length);
  if (lastCnt < MAX_CELLS * SPAWN_THRESHOLD) {
    console.log('Spawning', pats[idx][0]);
    spawnPattern(pats[idx][1]);
  } else {
    console.log('Too many cells to spawn a pattern');
  }
  // startR30();
  evt.target.blur();
});

// document.addEventListener('click', (evt) => {
//   clickClosestCell(evt.clientX, evt.clientY);
// });

const pathSelector = document.querySelector('input[name="path"]');
const greySelector = document.querySelector('input[id="greyscale"]');
const colorSelector = document.querySelector('input[id="colorful"]');
const resetButton = document.querySelector('button[id="reset"]');

const onSelector = () => {
  if (pathSelector.checked) {
    SCALED_DEATHSPAN = (1000 * DEATHSPAN) / DELAY;
  } else {
    if (SCALED_DEATHSPAN !== 0) {
      reset(false);
    }
    SCALED_DEATHSPAN = 0;
  }
  initColors(greySelector.checked && GREYSCALE_CELL_COLORS);

  GRID.forEach((row) => row.forEach((cell) => cell.live && cell.reColor()));
};

pathSelector.addEventListener('click', onSelector);
greySelector.addEventListener('click', onSelector);
colorSelector.addEventListener('click', onSelector);
resetButton.addEventListener('click', reset);

setInterval(() => {
  draw();
}, DELAY);
