// how live cell color changes w/ gradient in frames
const BASE_LIFESPAN = 20;
// how long traces of live cell paths last in frames and
// how trace cell color changes w/ gradient (lower => shorter traces, more performant)
// const BASE_TRACESPAN = 60;
let BASE_TRACESPAN = 50;

const BASE_RESOLUTION = 5;
const NUM_COLORS = 20; // number of colors in gradient (lower => more performant)
const ONEDIM_PREVIEW = 10; // number of rows to preview 1D cellular automata input
let PRETTY_RULES_ONLY = true;

// Changed by options:
let LIFESPAN = BASE_LIFESPAN;
let TRACESPAN = BASE_TRACESPAN;
let ONEDIM_INPUT = false;
let DELAY = 10; // delay between draw cycles in msec (higher => more performant)
// up to 60 FPS (~20 msec delay) with window.requestAnimationFrame
let USING_GREYSCALE = false;

const randRange = (range) => Math.floor(Math.random() * range);

const canvas = document.querySelector('#automata');
const ctx = canvas.getContext('2d');

const PRETTY_RULES = [18, 30, 60, 86, 110, 124, 150];
const CLUTTERED_RULES = [
  45,
  73,
  75,
  89,
  105,
  109,
  129,
  135,
  137,
  169,
  193,
  195
];

let GRID = [];
let GRID_CPY = [];
let ROWS = 0;
let COLS = 0;
let RESOLUTION = BASE_RESOLUTION;
let ONEDIM_SPAWN = 0;

const init = (resolution = RESOLUTION) => {
  ROWS = parseInt(window.innerHeight / resolution);
  COLS = parseInt(window.innerWidth / resolution);
  canvas.width = resolution * COLS;
  canvas.height = resolution * ROWS;
  RESOLUTION = resolution;
  GRID = [];
  GRID_CPY = [];
  ONEDIM_SPAWN = ROWS - 1;

  for (let i = 0; i < ROWS; i++) {
    const row = [];
    const row2 = [];
    for (let j = 0; j < COLS; j++) {
      row.push(false);
      row2.push(false);
    }
    GRID.push(row);
    GRID_CPY.push(row2);
  }
};

const LIVE_CELL_COLORS = [
  [18, 223, 153],
  [38, 164, 121]
];
const TRACE_CELL_COLORS = [
  [15, 160, 187],
  [5, 51, 60]
];
const GREY = [
  [0, 0, 0],
  [150, 150, 150]
];

// start color when ticks === max,
// end color when ticks === 0,
const getGradient = (ticks, max, colors) => {
  let [start, end] = colors;
  const rDiff = end[0] - start[0];
  const gDiff = end[1] - start[1];
  const bDiff = end[2] - start[2];

  const weight = (max - ticks) / max;
  const r = parseInt(rDiff * weight + start[0]);
  const g = parseInt(gDiff * weight + start[1]);
  const b = parseInt(bDiff * weight + start[2]);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return 'rgb(255, 255, 255)';
  }
  return `rgb(${r}, ${g}, ${b})`;
};

const changeList = [];

let makeRule = (num) => (a, b, c) => {
  const getBit = (num, k) => (num >> k) & 1;
  const addedBinary = (a << 2) + (b << 1) + c;
  return getBit(num, addedBinary);
};
let curRule = () => {};

const createCell = (i, j, forceWriteCpy = false) => {
  GRID[i][j] = true;
  if (forceWriteCpy) {
    GRID_CPY[i][j] = true;
    colorCell(i, j, true);
  } else {
    changeList.push([i, j, true]);
  }
};

const killCell = (i, j) => {
  GRID[i][j] = false;
  changeList.push([i, j, false]);
};

const colorCell = (i, j, type) => {
  let color = getGradient(
    randRange(NUM_COLORS),
    NUM_COLORS,
    USING_GREYSCALE ? GREY : TRACE_CELL_COLORS
  );
  let fill = type ? color : '#fff';
  ctx.fillStyle = fill;
  ctx.fillRect(j * RESOLUTION, i * RESOLUTION, RESOLUTION, RESOLUTION);
};

let timestamp = new Date();
let rowCnt = -1;
const draw = () => {
  const now = new Date();
  if (
    canvas.classList.contains('showcase-disable') ||
    now - timestamp < DELAY ||
    rowCnt === -1 ||
    rowCnt >= ROWS
    // atTop
  ) {
    window.requestAnimationFrame(draw);
    if (rowCnt === -1) {
      canvas.classList.remove('fade-enable');
    }
    return;
  }
  timestamp = now;
  rowCnt++;

  // for (let i = 0; i < ROWS - 1; i++) {
  //   for (let j = 0; j < COLS; j++) {
  //     const shouldLive = GRID_CPY[i + 1][j];
  //     const alive = GRID[i][j];
  //     if (alive && !shouldLive) {
  //       killCell(i, j);
  //     } else if (!alive && shouldLive) {
  //       createCell(i, j);
  //       if (i === 0) atTop = true;
  //     }
  //   }
  // }

  canvas.classList.add('fade-enable');

  const saved = ctx.getImageData(
    0,
    RESOLUTION,
    RESOLUTION * COLS,
    RESOLUTION * (ROWS - 1)
  );
  ctx.putImageData(saved, 0, 0);

  for (let j = 0; j < COLS; j++) {
    const [L, C, R] = [
      j === 0 ? false : GRID_CPY[ONEDIM_SPAWN][j - 1],
      GRID_CPY[ONEDIM_SPAWN][j],
      j === COLS - 1 ? false : GRID_CPY[ONEDIM_SPAWN][j + 1]
    ];
    // const CorR = C || R;
    // const R30 = (L && !CorR) || (!L && CorR);
    const nextGen = curRule(Number(L), Number(C), Number(R));

    const alive = GRID[ONEDIM_SPAWN][j];
    if (alive && !nextGen) {
      killCell(ONEDIM_SPAWN, j);
    } else if (!alive && nextGen) {
      createCell(ONEDIM_SPAWN, j);
    }
  }

  while (changeList.length) {
    const [i, j, status] = changeList[0];
    colorCell(i, j, status);
    changeList.splice(0, 1);
  }

  GRID.forEach((row, i) => {
    row.forEach((alive, j) => {
      GRID_CPY[i][j] = alive;
    });
  });
  window.requestAnimationFrame(draw);
};

const reset = () => {
  GRID.forEach((row, i) => {
    row.forEach((_, j) => {
      GRID[i][j] = false;
      GRID_CPY[i][j] = false;
      colorCell(i, j, false);
    });
  });
  rowCnt = -1;
};

const spawn = () => {
  const randJ = parseInt(randRange(COLS * 0.9) + COLS * 0.1);
  reset();
  createCell(ONEDIM_SPAWN, randJ, true);
  rowCnt = 1;
  const ruleNum = PRETTY_RULES_ONLY
    ? PRETTY_RULES[randRange(PRETTY_RULES.length)]
    : randRange(255) + 1;
  console.log('Spawning 1D celluar automata for rule', ruleNum);
  curRule = makeRule(ruleNum);
};

const options = {
  greyscale: 0,
  delay: 1,
  pretty: 2
};

const setOption = (type, value) => {
  switch (type) {
    case options.greyscale:
      USING_GREYSCALE = value;
      break;
    case options.delay:
      console.log('Set animation delay to', value);
      DELAY = value;
      return;
    case options.pretty:
      PRETTY_RULES_ONLY = value;
      break;
  }
};

export default { init, draw, reset, spawn, options, setOption };
