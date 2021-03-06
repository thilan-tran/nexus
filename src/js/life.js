// how live cell color changes w/ gradient in frames
const BASE_LIFESPAN = 20;
// how long traces of live cell paths last in frames and
// how trace cell color changes w/ gradient (lower => shorter traces, more performant)
// const BASE_TRACESPAN = 60;
let BASE_TRACESPAN = 50;

const BASE_RESOLUTION = 10;
const NUM_COLORS = 8; // number of colors in gradient (lower => more performant)
const ONEDIM_PREVIEW = 10; // number of rows to preview 1D cellular automata input

// Changed by options:
let LIFESPAN = BASE_LIFESPAN;
let TRACESPAN = BASE_TRACESPAN;
let ONEDIM_INPUT = false;
let RESTRICT_RULES = true;
let DELAY = 30; // delay between draw cycles in msec (higher => more performant)
// up to 60 FPS (~20 msec delay) with window.requestAnimationFrame
let USING_GREYSCALE = false;

const PATTERNS = {
  // glider: [
  //   [0, 1, 0],
  //   [0, 0, 1],
  //   [1, 1, 1]
  // ],
  // LWSS: [
  //   [0, 1, 0, 0, 1],
  //   [1, 0, 0, 0, 0],
  //   [1, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 0]
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

const randRange = (range) => Math.floor(Math.random() * range);

const UNINIT = -1;
const DEAD = 0;
const ALIVE = 1;
const TRACE = 2;

let canvas = null;
let ctx = null;

let GRID = [];
let GRID_CPY = [];
let ROWS = 0;
let COLS = 0;
let RESOLUTION = BASE_RESOLUTION;
let ONEDIM_SPAWN = 0;
let PREVIEW_START = 0;

const init = (canvasElem, resolution = RESOLUTION) => {
  console.log('Initializing GoL showcase at resolution:', resolution);
  canvas = canvasElem;
  ctx = canvas.getContext('2d');

  ROWS = parseInt(window.innerHeight / resolution);
  COLS = parseInt(window.innerWidth / resolution);
  canvas.width = resolution * COLS;
  canvas.height = resolution * ROWS;
  RESOLUTION = resolution;
  GRID = [];
  GRID_CPY = [];
  ONEDIM_SPAWN = ROWS - 1;
  PREVIEW_START = ROWS - ONEDIM_PREVIEW;

  for (let i = 0; i < ROWS; i++) {
    const row = [];
    const row2 = [];
    for (let j = 0; j < COLS; j++) {
      row.push({ status: UNINIT, lifespan: 0 });
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
const GREYSCALE_CELL_COLORS = {
  live: [
    [0, 0, 0],
    [60, 60, 60]
  ],
  trace: [
    [72, 72, 72],
    [200, 200, 200]
  ]
};

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

let LIVE_COLOR_MAP = [];
let TRACE_COLOR_MAP = [];
let initColors = (max, colors) => {
  const map = new Array(parseInt(max + 1) || 1).fill('');
  const bucketSize = parseInt(max / NUM_COLORS || 1);
  for (let i = 0; i < NUM_COLORS + 1; i++) {
    const color = getGradient((i / NUM_COLORS) * max, max, colors);
    map.fill(color, i * bucketSize, (i + 1) * bucketSize);
  }
  const finalColor = getGradient(max, max, colors);
  map.fill(finalColor, NUM_COLORS * bucketSize);
  return map;
};
LIVE_COLOR_MAP = initColors(
  LIFESPAN,
  USING_GREYSCALE ? GREYSCALE_CELL_COLORS.live : LIVE_CELL_COLORS
);
TRACE_COLOR_MAP = initColors(
  TRACESPAN,
  USING_GREYSCALE ? GREYSCALE_CELL_COLORS.trace : TRACE_CELL_COLORS
);

const spawnPattern = (pattern) => {
  const [randI, randJ] = [randRange(ROWS), randRange(COLS)];
  const [flip, rDir, cDir] = [randRange(2), randRange(2), randRange(2)];
  pattern.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell) {
        const newI = flip ? j : i;
        const newJ = flip ? i : j;
        const applyRDir = rDir ? randI + newI : randI - newI;
        const applyCDir = cDir ? randJ + newJ : randJ - newJ;
        createCell((applyRDir + ROWS) % ROWS, (applyCDir + COLS) % COLS, true);
      }
    });
  });
};

let makeRule = (num) => (a, b, c) => {
  const getBit = (num, k) => (num >> k) & 1;
  const addedBinary = (a << 2) + (b << 1) + c;
  return getBit(num, addedBinary);
};
let curRule = () => {};

const startOnedimInput = (customStart = false) => {
  const randJ = customStart ? customStart : randRange(COLS);
  createCell(ONEDIM_SPAWN, randJ, true);
};

const getNumNeighbors = (gridRef, i, j) => {
  const neighbors = [
    [i - 1, j - 1],
    [i, j - 1],
    [i + 1, j - 1],
    [i - 1, j],
    [i + 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1]
  ];
  let cnt = 0;
  neighbors.forEach(([r, c]) => {
    if (ONEDIM_INPUT && (r < 0 || r >= ROWS)) return;
    const modR = (r + ROWS) % ROWS;
    const modC = (c + COLS) % COLS;
    if (gridRef[modR][modC]) {
      cnt++;
    }
  });
  return cnt;
};

const changeList = [];

const createCell = (i, j, forceWriteCpy = false) => {
  GRID[i][j].status = ALIVE;
  GRID[i][j].lifespan = LIFESPAN;
  changeList.push([i, j, ALIVE, LIFESPAN]);
  if (forceWriteCpy) {
    GRID_CPY[i][j] = true;
  }
};

const traceCell = (i, j, useBaseTracespan = false) => {
  GRID[i][j].status = TRACE;
  GRID[i][j].lifespan = useBaseTracespan ? BASE_TRACESPAN : TRACESPAN;
  changeList.push([i, j, TRACE, useBaseTracespan ? BASE_TRACESPAN : TRACESPAN]);
};

const colorCell = (i, j, status, lifespan) => {
  let fill = '';
  let idx = lifespan;
  switch (status) {
    case ALIVE:
      if (idx < 0) idx = 0;
      if (idx >= LIVE_COLOR_MAP.length) idx = LIVE_COLOR_MAP.length - 1;
      fill = LIVE_COLOR_MAP[idx];
      break;
    case DEAD:
      fill = '#fff';
      break;
    case TRACE:
      if (idx < 0) idx = 0;
      if (idx >= TRACE_COLOR_MAP.length) {
        idx = TRACE_COLOR_MAP.length - 1;
      }
      fill = TRACE_COLOR_MAP[idx];
      break;
    default:
      console.log('Unknown cell status', status);
  }
  ctx.fillStyle = fill;
  ctx.fillRect(j * RESOLUTION, i * RESOLUTION, RESOLUTION, RESOLUTION);
};

const reColorCells = () => {
  GRID.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.status === ALIVE) {
        colorCell(i, j, cell.status, cell.lifespan);
      } else if (cell.status === TRACE) {
        cell.lifespan = 0;
      }
    });
  });
};

let timestamp = new Date();
let reqFrame = null;
let active = false;
const draw = () => {
  const now = new Date();
  if (now - timestamp < DELAY) {
    reqFrame = window.requestAnimationFrame(draw);
    return;
  }
  timestamp = now;

  let cellCount = [0, 0];
  GRID.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (i < PREVIEW_START || !ONEDIM_INPUT) {
        const numNeighbors = getNumNeighbors(GRID_CPY, i, j);
        switch (cell.status) {
          case ALIVE:
            cellCount[0]++;
            if (numNeighbors < 2 || 3 < numNeighbors) {
              traceCell(i, j);
            } else if (cell.lifespan > 0) {
              changeList.push([i, j, ALIVE, cell.lifespan--]);
            }
            break;
          case TRACE:
            cellCount[1]++;
            if (cell.lifespan > 0) {
              changeList.push([i, j, TRACE, cell.lifespan--]);
            } else {
              cell.status = DEAD;
              changeList.push([i, j, DEAD, 0]);
            }
          case UNINIT:
          case DEAD:
            if (numNeighbors === 3) {
              createCell(i, j);
            }
            break;
          default:
            console.log('Unknown cell status', cell.status);
        }
      }
    });
  });

  if (ONEDIM_INPUT) {
    for (let i = PREVIEW_START; i < ROWS - 1; i++) {
      for (let j = 0; j < COLS; j++) {
        const shouldLive = GRID_CPY[i + 1][j];
        const cell = GRID[i][j];
        switch (cell.status) {
          case ALIVE:
            cellCount[0]++;
            if (!shouldLive) {
              traceCell(i, j, true);
            }
            break;
          default:
            if (shouldLive) {
              createCell(i, j);
            }
        }
      }
    }

    for (let j = 0; j < COLS; j++) {
      const [L, C, R] = [
        j === 0 ? false : GRID_CPY[ONEDIM_SPAWN][j - 1],
        GRID_CPY[ONEDIM_SPAWN][j],
        j === COLS - 1 ? false : GRID_CPY[ONEDIM_SPAWN][j + 1]
      ];
      const nextGen = curRule(Number(L), Number(C), Number(R));

      const cell = GRID[ONEDIM_SPAWN][j];
      switch (cell.status) {
        case ALIVE:
          cellCount[0]++;
          if (!nextGen) {
            traceCell(ONEDIM_SPAWN, j, true);
          }
          break;
        default:
          if (nextGen) {
            createCell(ONEDIM_SPAWN, j);
          }
      }
    }
  }

  if (cellCount[0] + cellCount[1] > 0) {
    active = true;
  } else {
    active = false;
  }

  while (changeList.length) {
    const [i, j, status, lifespan] = changeList[0];
    colorCell(i, j, status, lifespan);
    changeList.splice(0, 1);
  }

  GRID.forEach((row, i) => {
    row.forEach((cell, j) => {
      GRID_CPY[i][j] = cell.status === ALIVE;
    });
  });
  reqFrame = window.requestAnimationFrame(draw);
};

const reset = () => {
  GRID.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.status !== UNINIT) {
        cell.status = DEAD;
        cell.lifespan = 0;
        GRID_CPY[i][j] = false;
        colorCell(i, j, DEAD, 0);
      }
    });
  });
};

const clearDraw = () => {
  console.log('Clearing GoL');
  reqFrame && window.cancelAnimationFrame(reqFrame);
};

const spawn = () => {
  if (ONEDIM_INPUT) {
    reset();
    let ruleNo;
    let customStart = false;
    if (RESTRICT_RULES) {
      ruleNo = randRange(2) ? 30 : 110;
      customStart = ruleNo === 110 && COLS - 1;
    } else {
      ruleNo = randRange(255) + 1;
    }
    console.log(
      'Using one dimensional cellular automata as input: rule',
      ruleNo
    );
    curRule = makeRule(ruleNo);
    startOnedimInput(customStart);
    return;
  }
  const pats = Object.entries(PATTERNS);
  const idx = randRange(pats.length);
  console.log('Spawning', pats[idx][0]);
  spawnPattern(pats[idx][1]);
};

const options = {
  greyscale: 0,
  delay: 1,
  trace: 2,
  traceLength: 3,
  oneDimInput: 4,
  colorful: 5,
  restrictRules: 6
};

const setOption = (type, value) => {
  switch (type) {
    case options.delay:
      console.log('Set animation delay to', value);
      DELAY = value;
      return;
    case options.oneDimInput:
      if (ONEDIM_INPUT && !value) {
        reset();
        ONEDIM_INPUT = false;
      } else if (!ONEDIM_INPUT && value) {
        reset();
        ONEDIM_INPUT = true;
      }
      return;
    case options.greyscale:
      USING_GREYSCALE = value;
      break;
    case options.colorful:
      USING_GREYSCALE = !value;
      break;
    case options.trace:
      TRACESPAN = value ? BASE_TRACESPAN : 0;
      break;
    case options.traceLength:
      BASE_TRACESPAN = Number(value);
      if (TRACESPAN !== 0) {
        TRACESPAN = Number(value);
      }
      break;
    case options.restrictRules:
      RESTRICT_RULES = value;
    default:
      console.log('Unkown option', type);
  }

  console.log(LIFESPAN, TRACESPAN);
  LIVE_COLOR_MAP = initColors(
    LIFESPAN,
    USING_GREYSCALE ? GREYSCALE_CELL_COLORS.live : LIVE_CELL_COLORS
  );
  TRACE_COLOR_MAP = initColors(
    TRACESPAN,
    USING_GREYSCALE ? GREYSCALE_CELL_COLORS.trace : TRACE_CELL_COLORS
  );
  reColorCells();
};

const optionInputAttributes = [
  {
    desc: 'Greyscale',
    attr: {
      type: 'radio',
      name: 'color',
      id: 'greyscale'
    },
    option: options.greyscale,
    init: false
  },
  {
    desc: 'Colorful',
    attr: {
      type: 'radio',
      name: 'color',
      id: 'colorful'
    },
    option: options.colorful,
    init: true
  },
  {
    desc: 'Trace cell path',
    attr: {
      type: 'checkbox',
      name: 'trace'
    },
    option: options.trace,
    init: true
  },
  {
    desc: 'Trace path length',
    attr: {
      type: 'range',
      name: 'trace-length',
      min: 20,
      max: 150
    },
    option: options.traceLength,
    init: 50
  },
  {
    desc: 'Feed 1D automaton as input',
    attr: {
      type: 'checkbox',
      name: 'onedim-input'
    },
    option: options.oneDimInput,
    init: false
  },
  {
    desc: 'Use only Rule 30 and 110 for 1D automaton',
    attr: {
      type: 'checkbox',
      name: 'restrict-rules'
    },
    option: options.restrictRules,
    init: true
  },
  {
    desc: 'Animation delay',
    attr: {
      type: 'range',
      name: 'delay',
      min: 20,
      max: 100
    },
    option: options.delay,
    init: 30
  }
];

const spawnPrompt = "PLAY CONWAY'S GAME OF LIFE.";

const aboutUrl = 'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life';

const getActive = () => active;

export default {
  init,
  draw,
  clearDraw,
  reset,
  spawn,
  spawnPrompt,
  options,
  optionInputAttributes,
  setOption,
  aboutUrl,
  getActive
};
