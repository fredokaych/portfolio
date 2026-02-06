const ROWS = 15;
const COLS = 20;

const gridEl = document.getElementById("grid");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const algoSelect = document.getElementById("algorithm");
const speedInput = document.getElementById("speed");

let grid = [];
let mouseDown = false;

let startNode = { row: 7, col: 4 };
let endNode = { row: 7, col: 15 };

function createGrid() {
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      row.push({
        row: r,
        col: c,
        isStart: r === startNode.row && c === startNode.col,
        isEnd: r === endNode.row && c === endNode.col,
        isWall: false,
        visited: false,
        previous: null
      });
    }
    grid.push(row);
  }
}

function renderGrid() {
  gridEl.innerHTML = "";
  grid.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement("div");
      div.className = "cell";

      if (cell.isStart) div.classList.add("start");
      if (cell.isEnd) div.classList.add("end");
      if (cell.isWall) div.classList.add("wall");
      if (cell.visited) div.classList.add("visited");
      if (cell.path) div.classList.add("path");

      div.addEventListener("mousedown", () => toggleWall(cell));
      gridEl.appendChild(div);
    });
  });
}

function toggleWall(cell) {
  if (cell.isStart || cell.isEnd) return;
  cell.isWall = !cell.isWall;
  renderGrid();
}

function resetGrid() {
  createGrid();
  renderGrid();
}

function getNeighbors(cell) {
  const dirs = [
    [0,1],[1,0],[0,-1],[-1,0]
  ];
  return dirs
    .map(([dr, dc]) => {
      const r = cell.row + dr;
      const c = cell.col + dc;
      return grid[r]?.[c];
    })
    .filter(n => n && !n.isWall && !n.visited);
}

/* Algorithms */

async function bfs() {
  const queue = [];
  const start = grid[startNode.row][startNode.col];
  queue.push(start);
  start.visited = true;

  while (queue.length) {
    const current = queue.shift();
    if (current.isEnd) return current;

    for (const neighbor of getNeighbors(current)) {
      neighbor.visited = true;
      neighbor.previous = current;
      queue.push(neighbor);
    }

    renderGrid();
    await sleep();
  }
}

async function dfs() {
  const stack = [];
  const start = grid[startNode.row][startNode.col];
  stack.push(start);
  start.visited = true;

  while (stack.length) {
    const current = stack.pop();
    if (current.isEnd) return current;

    for (const neighbor of getNeighbors(current)) {
      neighbor.visited = true;
      neighbor.previous = current;
      stack.push(neighbor);
    }

    renderGrid();
    await sleep();
  }
}

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

async function astar() {
  const open = [];
  const start = grid[startNode.row][startNode.col];
  start.g = 0;
  start.f = heuristic(start, endNode);
  open.push(start);

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    current.visited = true;

    if (current.isEnd) return current;

    for (const neighbor of getNeighbors(current)) {
      const g = current.g + 1;
      if (neighbor.g === undefined || g < neighbor.g) {
        neighbor.g = g;
        neighbor.f = g + heuristic(neighbor, endNode);
        neighbor.previous = current;
        open.push(neighbor);
      }
    }

    renderGrid();
    await sleep();
  }
}

/* Path tracing */

function drawPath(endCell) {
  let curr = endCell.previous;
  while (curr && !curr.isStart) {
    curr.path = true;
    curr = curr.previous;
  }
  renderGrid();
}

function sleep() {
  return new Promise(res => setTimeout(res, speedInput.value));
}

/* Controls */

startBtn.addEventListener("click", async () => {
  let result;
  if (algoSelect.value === "bfs") result = await bfs();
  if (algoSelect.value === "dfs") result = await dfs();
  if (algoSelect.value === "astar") result = await astar();
  if (result) drawPath(result);
});

resetBtn.addEventListener("click", resetGrid);

/* Init */
createGrid();
renderGrid();
