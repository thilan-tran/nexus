// resolution of cell grid, CSS .particle would need to be updated as well
const RESOLUTION = 10;

// how live cell color changes w/ gradient in sec
const LIFESPAN = 1;
// how long dead cells (traces of paths of live cells) last in sec and
// how dead cell color changes w/ gradient (lower => shorter traces, more performant)
const DEATHSPAN = 2;

const NUM_COLORS = 8; // number of colors in gradient (lower => more performant)
// const DELAY = 40; // delay between draw cycles in msec (higher => more performant)
const DELAY = 1000 / 60; // 60 FPS with window.requestAnimationFrame

const MAX_CELLS_PERCENT = 0.4; // max percentage of grid to fill with cells
const TRIM_THRESHOLD_PERCENT = 0.05; // percentage to start trimming early

const SOFT_AGE_THRESHOLD = 0.05; // initial percentage of dead cells to trim
const HARD_AGE_THRESHOLD = 0.7; // final, ramped percentage of dead cells to trim (as # cells approach max)

const LIVE_CELL_THRESHOLD = 0.05; // limit of live cells to spawn new patterns
const DEAD_CELL_THRESHOLD = 0.4; // limit of dead cells to spawn new patterns

const ONED_PREVIEW_ROWS = 10; // number of rows to preview 1D cellular automata input

const X_BOUND = Math.floor(window.innerWidth / RESOLUTION);
const Y_BOUND = Math.floor(window.innerHeight / RESOLUTION);
const MAX_CELLS = X_BOUND * Y_BOUND * MAX_CELLS_PERCENT;
const TRIM_THRESHOLD = X_BOUND * Y_BOUND * TRIM_THRESHOLD_PERCENT;

let SCALED_LIFESPAN = (1000 * LIFESPAN) / DELAY;
let SCALED_DEATHSPAN = (1000 * DEATHSPAN) / DELAY;

const PREVIEW_START = Y_BOUND - ONED_PREVIEW_ROWS;
const ONED_SRC_ROW = Y_BOUND - 1;
let ONED_INPUT = false;

const ALPHA = Math.exp(
  Math.log(HARD_AGE_THRESHOLD / SOFT_AGE_THRESHOLD) /
    (MAX_CELLS - TRIM_THRESHOLD)
);
const rampTrimPercentage = (x) =>
  SOFT_AGE_THRESHOLD * ALPHA ** (x - TRIM_THRESHOLD);

console.log(
  `${MAX_CELLS} max, ${MAX_CELLS *
    LIVE_CELL_THRESHOLD} live threshold, ${MAX_CELLS *
    DEAD_CELL_THRESHOLD} dead threshold, ${TRIM_THRESHOLD} init trim threshold`
);

const CONTAINER = document.querySelector('.container');

const PATTERNS = {
  glider: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ],
  LWSS: [
    [0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0]
  ],
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
    rowCpy2.push(false);
  }
  GRID.push(row);
  GRID_CPY.push(rowCpy);
  DEAD_CELLS.push(rowCpy2);
}

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
    [72, 72, 72]
  ],
  [
    [90, 90, 90],
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

  const weight = ticks / ref;
  if (isNaN(weight)) {
    return 'rgb(255, 255, 255)';
  }
  const r = parseInt(rDiff * weight + start[0]);
  const g = parseInt(gDiff * weight + start[1]);
  const b = parseInt(bDiff * weight + start[2]);
  return `rgb(${r}, ${g}, ${b})`;
};

const L_COLOR_MAP = new Array(parseInt(SCALED_LIFESPAN)).fill('');
const D_COLOR_MAP = new Array(parseInt(SCALED_DEATHSPAN)).fill('');
const liveBuckets = parseInt(SCALED_LIFESPAN / NUM_COLORS);
const deadBuckets = parseInt(SCALED_DEATHSPAN / NUM_COLORS);
const initColors = (customColors = null) => {
  for (let i = 0; i < NUM_COLORS + 1; i++) {
    const liveClr = getGradient(
      SCALED_LIFESPAN - (i / NUM_COLORS) * SCALED_LIFESPAN,
      false,
      customColors
    );
    L_COLOR_MAP.fill(liveClr, i * liveBuckets, (i + 1) * liveBuckets);
    const deadClr = getGradient(
      SCALED_DEATHSPAN - (i / NUM_COLORS) * SCALED_DEATHSPAN,
      true,
      customColors
    );
    D_COLOR_MAP.fill(deadClr, i * deadBuckets, (i + 1) * deadBuckets);
  }
  const liveClr = getGradient(0, false, customColors);
  L_COLOR_MAP.fill(liveClr, NUM_COLORS * liveBuckets);
  const deadClr = getGradient(0, true, customColors);
  D_COLOR_MAP.fill(deadClr, NUM_COLORS * deadBuckets);
};
initColors();

const getWrappedCell = (ref, i, j, retIdx = false) => {
  let newI = i;
  let newJ = j;

  if (i < 0) newI = X_BOUND - 1;
  else if (i >= X_BOUND) newI = 0;

  if (ONED_INPUT) {
    if (j < 0) return { live: false };
    if (j >= Y_BOUND) return { live: false };
  } else {
    if (j < 0) newJ = Y_BOUND - 1;
    else if (j >= Y_BOUND) newJ = 0;
  }

  return retIdx ? [ref[newI][newJ], newI, newJ] : ref[newI][newJ];
};

const createCell = (i, j, force = false) => {
  const [cell, newI, newJ] = getWrappedCell(GRID, i, j, true);
  const cpy = GRID_CPY[newI][newJ];
  const ded = DEAD_CELLS[newI][newJ];

  if (!cell.ref) {
    const part = document.createElement('div');
    part.classList.add('particle');
    part.style.left = i * RESOLUTION + 'px';
    part.style.top = j * RESOLUTION + 'px';
    part.style.backgroundColor = L_COLOR_MAP[L_COLOR_MAP.length - 1];
    CONTAINER.appendChild(part);

    cell.ref = part;
    cell.kill = (noFadeOut = false) => {
      cell.live = false;
      part.style.backgroundColor = D_COLOR_MAP[D_COLOR_MAP.length - 1];
      cell.lifespan = SCALED_DEATHSPAN;
      if (!noFadeOut) {
        if (SCALED_DEATHSPAN > 0 && !ded) {
          DEAD_CELLS[newI][newJ] = true;
        } else {
          cell.remove();
        }
      }
    };
    cell.remove = () => {
      cell.lifespan = null;
      part.style.backgroundColor = '#fff';
      DEAD_CELLS[newI][newJ] = false;
    };
    cell.reColor = (ticks, deadColors = false) => {
      const rnd = ticks <= 0 ? 0 : ~~ticks - 1;
      const color = deadColors ? D_COLOR_MAP[rnd] : L_COLOR_MAP[rnd];
      part.style.backgroundColor = color;
    };
  }

  if (!cell.live) {
    const part = cell.ref;
    part.style.backgroundColor = L_COLOR_MAP[L_COLOR_MAP.length - 1];

    cell.live = true;
    cell.lifespan = SCALED_LIFESPAN;
    if (force) {
      cpy.live = true;
    }
  }
};

const randRange = (range) => Math.floor(Math.random() * range);

const startR30 = () => {
  const randX = randRange(parseInt(X_BOUND * 0.9)) + parseInt(X_BOUND * 0.1);
  createCell(randX, ONED_SRC_ROW, true);
};

const spawnPattern = (pattern) => {
  const randX = randRange(parseInt(X_BOUND * 0.9)) + parseInt(X_BOUND * 0.1);
  const randY = randRange(parseInt(Y_BOUND * 0.9)) + parseInt(Y_BOUND * 0.1);
  const orientation = randRange(4);
  const flip = randRange(2);
  pattern.forEach((row, i) => {
    row.forEach((cell, j) => {
      const x = flip ? j : i;
      const y = flip ? i : j;
      if (cell === 1) {
        switch (orientation) {
          case 0:
            createCell(randX + x, randY + y, true);
            break;
          case 1:
            createCell(randX - x, randY + y, true);
            break;
          case 2:
            createCell(randX + x, randY - y, true);
            break;
          case 3:
            createCell(randX - x, randY - y, true);
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

let totalCnt = 0,
  dedCnt = 0,
  lastCnts = [0, 0],
  trimPercentage = rampTrimPercentage(0);
let oldestDeadCells = [];

let then = new Date();
const draw = () => {
  const now = new Date();

  if (now - then > DELAY) {
    then = now;

    DEAD_CELLS.forEach((row, i) => {
      row.forEach((exists, j) => {
        if (exists) {
          const cell = GRID[i][j];
          totalCnt++;
          dedCnt++;
          if (cell.lifespan <= 0) {
            cell.remove();
          } else {
            if (cell.lifespan < SCALED_DEATHSPAN * trimPercentage) {
              oldestDeadCells.push([i, j]);
            }
            cell.lifespan--;
            if (!cell.live) {
              cell.reColor(cell.lifespan, true);
            }
          }
        }
      });
    });

    if (totalCnt > TRIM_THRESHOLD && oldestDeadCells.length) {
      oldestDeadCells.forEach(([i, j]) => {
        GRID[i][j].remove();
      });
      totalCnt -= oldestDeadCells.length;
    }

    lastCnts = [totalCnt - dedCnt, dedCnt];
    trimPercentage = rampTrimPercentage(totalCnt);
    if (randRange(100) < 1) {
      console.log(
        `${trimPercentage.toFixed(4)} age cutoff, ${
          oldestDeadCells.length
        } trimmed, ${lastCnts[0]} live, ${lastCnts[1]} dead`
      );
    }
    oldestDeadCells = [];
    totalCnt = 0;
    dedCnt = 0;

    GRID.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!ONED_INPUT || j < PREVIEW_START) {
          const numNeighbors = countNeighbors(GRID_CPY, i, j);
          if (cell.live) {
            totalCnt++;
            if (numNeighbors < 2 || numNeighbors > 3) {
              cell.kill();
            } else {
              if (cell.lifespan >= 0) {
                cell.reColor(cell.lifespan--);
              }
            }
          } else {
            if (numNeighbors === 3) {
              createCell(i, j);
            }
          }
        }
      });
    });

    if (ONED_INPUT) {
      for (let j = PREVIEW_START; j < Y_BOUND - 1; j++) {
        for (let i = 0; i < X_BOUND; i++) {
          const shouldLive = GRID_CPY[i][j + 1].live;
          const cell = GRID[i][j];
          if (!cell.live) {
            if (shouldLive) {
              createCell(i, j);
              cell.oneDimInput = true;
            }
          } else {
            if (!shouldLive) {
              cell.kill(true);
            }
          }
        }
      }

      for (let i = 0; i < X_BOUND; i++) {
        const [L, C, R] = [
          i === 0 ? false : GRID_CPY[i - 1][ONED_SRC_ROW].live,
          GRID_CPY[i][ONED_SRC_ROW].live,
          i === X_BOUND - 1 ? false : GRID_CPY[i + 1][ONED_SRC_ROW].live
        ];

        const CorR = C || R;
        const R30 = (L && !CorR) || (!L && CorR);

        const cell = GRID[i][ONED_SRC_ROW];
        if (R30 && !cell.live) {
          createCell(i, ONED_SRC_ROW);
          cell.oneDimInput = true;
        } else if (!R30 && cell.live) {
          cell.kill(true);
        }
      }
    }

    GRID.forEach((row, i) => {
      row.forEach((cell, j) => {
        GRID_CPY[i][j].live = cell.live;
      });
    });
  }
  window.requestAnimationFrame(draw);
};

const reset = (fullReset = true) => {
  if (fullReset) {
    GRID.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.live) {
          cell.kill();
          GRID_CPY[i][j].live = false;
        }
        if (cell.ref) {
          cell.ref.style.backgroundColor = '#fff';
        }
      });
    });
  }
  DEAD_CELLS.forEach((row, i) => {
    row.forEach((exists, j) => {
      if (exists) {
        GRID[i][j].remove();
      }
    });
  });
};

document.querySelector('.action-button').addEventListener('click', (evt) => {
  const pats = Object.entries(PATTERNS);
  const idx = randRange(pats.length);
  if (ONED_INPUT) {
    reset(true);
    startR30();
  } else if (
    lastCnts[0] < MAX_CELLS * LIVE_CELL_THRESHOLD &&
    lastCnts[1] < MAX_CELLS * DEAD_CELL_THRESHOLD
  ) {
    console.log('Spawning', pats[idx][0]);
    spawnPattern(pats[idx][1]);
  } else {
    console.log('Too many cells to spawn pattern');
  }
  evt.target.blur();
});

const pathSelector = document.querySelector('input[name="path"]');
const feed1DSelector = document.querySelector('input[name="feed1D"]');
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

  GRID.forEach((row) =>
    row.forEach((cell, j) => {
      if (ONED_INPUT && j >= PREVIEW_START && cell.oneDimInput) {
        if (cell.lifespan === SCALED_LIFESPAN) {
          cell.reColor(SCALED_LIFESPAN, false);
        } else {
          cell.reColor(SCALED_DEATHSPAN, true);
        }
      } else {
        if (cell.live) {
          cell.reColor(cell.lifespan);
        }
      }
    })
  );

  if (ONED_INPUT && !feed1DSelector.checked) {
    reset(true);
    ONED_INPUT = false;
  } else if (!ONED_INPUT && feed1DSelector.checked) {
    reset(true);
    ONED_INPUT = true;
  }
};

feed1DSelector.addEventListener('click', onSelector);
pathSelector.addEventListener('click', onSelector);
greySelector.addEventListener('click', onSelector);
colorSelector.addEventListener('click', onSelector);
resetButton.addEventListener('click', reset);

draw();
