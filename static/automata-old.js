const RESOLUTION = 10;
const LIFESPAN = 2;
const DEATHSPAN = 3;
const DELAY = 70;

const X_BOUND = Math.floor(window.innerWidth / RESOLUTION);
const Y_BOUND = Math.floor(window.innerHeight / RESOLUTION);

const PATTERNS = {
  init: [1, 0, 1]
};

let FADED = [];
let GRID = [];
let GRID_CPY = [];
for (let i = 0; i < X_BOUND; i++) {
  const row = [];
  const rowCpy = [];
  for (let j = 0; j < Y_BOUND; j++) {
    row.push({ live: false, kill: () => {} });
    rowCpy.push({ live: false, kill: () => {} });
  }
  GRID.push(row);
  GRID_CPY.push(rowCpy);
}

const randRange = (range) => Math.floor(Math.random() * range);

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

const createCell = (container, i, j, force = false) => {
  const element = getWrapped(GRID, i, j);
  const cpy = getWrapped(GRID_CPY, i, j);

  if (!element.cell) {
    const part = document.createElement('div');
    part.classList.add('particle');
    part.style.left = i * RESOLUTION + 'px';
    part.style.top = j * RESOLUTION + 'px';
    part.style.backgroundColor = '#000';
    container.appendChild(part);

    element.lifetime = Y_BOUND;
    element.cell = part;
  }

  if (!element.live) {
    const part = element.cell;
    element.lifetime = Y_BOUND;
    element.live = true;
    part.style.backgroundColor = '#000';
    element.remove = () => {
      part.style.backgroundColor = '#fff';
      element.live = false;
    };
  }
  if (force) cpy.live = true;
};

const spawnPattern = (pattern) => {
  const container = document.querySelector('.container');
  const randX = randRange(parseInt(X_BOUND * 0.9)) + parseInt(X_BOUND * 0.1);
  pattern.forEach((cell, i) => {
    if (cell === 1) {
      createCell(container, randX + i, 0, true);
    }
  });
};

const countNeighbors = (ref, i, j) => {
  const neighbors = [
    [0, 0, 0],
    [0, 0],
    [0, 0, 0]
  ];
  let cnt = 0;
  if (getWrapped(ref, i - 1, j - 1).live) {
    neighbors[0][0] = 1;
    cnt++;
  }
  if (getWrapped(ref, i - 1, j).live) {
    neighbors[1][0] = 1;
    cnt++;
  }
  if (getWrapped(ref, i - 1, j + 1).live) {
    neighbors[2][0] = 1;
    cnt++;
  }

  if (getWrapped(ref, i, j - 1).live) {
    neighbors[0][1] = 1;
    cnt++;
  }
  if (getWrapped(ref, i, j + 1).live) {
    neighbors[2][1] = 1;
    cnt++;
  }

  if (getWrapped(ref, i + 1, j - 1).live) {
    neighbors[0][2] = 1;
    cnt++;
  }
  if (getWrapped(ref, i + 1, j).live) {
    neighbors[1][1] = 1;
    cnt++;
  }
  if (getWrapped(ref, i + 1, j + 1).live) {
    neighbors[2][2] = 1;
    cnt++;
  }
  return { neighbors, count: cnt };
};

const draw = () => {
  const container = document.querySelector('.container');
  GRID.forEach((row, i) => {
    row.forEach((elem, j) => {
      const { neighbors } = countNeighbors(GRID_CPY, i, j);
      if (!elem.live) {
        let test = false;
        if (neighbors[0][1]) {
          if (
            (!neighbors[0][0] && !neighbors[0][2]) ||
            (!neighbors[0][0] && neighbors[0][2])
          )
            test = true;
        } else {
          if (
            (!neighbors[0][0] && neighbors[0][2]) ||
            (neighbors[0][0] && !neighbors[0][2])
          )
            test = true;
        }
        if (test) createCell(container, i, j);
      } else {
        let test = false;
        if (neighbors[0][1]) {
          if (
            (neighbors[0][0] && neighbors[0][2]) ||
            (neighbors[0][0] && !neighbors[0][2])
          )
            test = true;
        } else {
          if (
            (neighbors[0][0] && neighbors[0][2]) ||
            (!neighbors[0][0] && !neighbors[0][2])
          )
            test = true;
        }
        if (test) elem.remove();
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
  const pats = Object.entries(PATTERNS);
  const idx = randRange(pats.length);
  console.log('Spawning', pats[idx][0]);
  spawnPattern(pats[idx][1]);
  rows = 0;
  evt.target.blur();
});
setInterval(draw, DELAY);

// const draw = () => {
//   const container = document.querySelector('.container');
//   GRID.forEach((row, i) => {
//     row.forEach((elem, j) => {
//       // const { neighbors } = countNeighbors(GRID_CPY, i, j);
//       if (j != startRow) {
//         const shoudLive = GRID_CPY[i][j + 1].live;
//         if (!elem.live) {
//           if (shoudLive) {
//             createCell(container, i, j);
//           }
//         } else {
//           if (!shoudLive) {
//             elem.remove();
//           }
//         }
//       }
//     });
//   });
//   if (rows++ < MAX_ROWS) {
//     for (let i = 0; i < X_BOUND; i++) {
//       const { neighbors } = countNeighbors(GRID_CPY, i, startRow);
//       const elem = GRID[i][startRow];
//       if (!elem.live) {
//         if (
//           (neighbors[1][0] && !neighbors[1][1]) ||
//           (!neighbors[1][0] && neighbors[1][1])
//         )
//           createCell(container, i, startRow);
//       } else {
//         if (
//           (neighbors[1][0] && neighbors[1][1]) ||
//           (neighbors[1][0] && !neighbors[1][1])
//         )
//           elem.remove();
//       }
//     }
//   } else {
//     for (let i = 0; i < X_BOUND; i++) {
//       const elem = GRID[i][startRow];
//       if (elem.live) {
//         elem.remove();
//       }
//     }
//   }
//   GRID.forEach((row, i) => {
//     row.forEach((elem, j) => {
//       GRID_CPY[i][j].live = elem.live;
//     });
//   });
// };
