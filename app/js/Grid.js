/*
eslint
  function-paren-newline: 0,
  no-multi-spaces: 0,
  arrow-body-style: 0,
  no-underscore-dangle: 0
  */

import Cell from './Cell';

export default class Grid {
  constructor(x, y, gridElement) {
    this.x = x;
    this.y = y;
    this.grid = [];
    this.gridElement = gridElement;
    this.interval = null;
    this.isRunning = false;
    this._speed = 100;

    this.runLifeCycle = this.runLifeCycle.bind(this);

    this.empty()
      .generateGrid()
      .renderGrid();
  }

  generateGrid() {
    for (let y = 0; y < this.y; y += 1) {
      const row = [];
      for (let x = 0; x < this.x; x += 1) {
        row.push(new Cell());
      }
      this.grid.push(row);
    }

    this.setNeighbours();

    return this;
  }

  setNeighbours() {
    this.grid.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        const neighbours = [];

        neighbours.push(
          this.grid[ri === 0 ? this.y - 1 : ri - 1][
            ci === 0 ? this.x - 1 : ci - 1
          ],
        );
        neighbours.push(this.grid[ri === 0 ? this.y - 1 : ri - 1][ci]);
        neighbours.push(
          this.grid[ri === 0 ? this.y - 1 : ri - 1][
            ci + 1 === this.x ? 0 : ci + 1
          ],
        );

        neighbours.push(this.grid[ri][ci === 0 ? this.x - 1 : ci - 1]);
        neighbours.push(this.grid[ri][ci + 1 === this.x ? 0 : ci + 1]);

        neighbours.push(
          this.grid[ri + 1 === this.y ? 0 : ri + 1][
            ci === 0 ? this.x - 1 : ci - 1
          ],
        );
        neighbours.push(this.grid[ri + 1 === this.y ? 0 : ri + 1][ci]);
        neighbours.push(
          this.grid[ri + 1 === this.y ? 0 : ri + 1][
            ci + 1 === this.x ? 0 : ci + 1
          ],
        );

        cell.addNeighbours(neighbours);
      });
    });
  }

  renderGrid() {
    this.gridElement.innerHTML = '';
    this.gridElement.style.width = `${this.x * 10}px`;
    this.gridElement.style.height = `${this.y * 10}px`;

    this.grid.forEach(row =>
      row.forEach(cell => this.gridElement.appendChild(cell.element)),
    );
  }

  runThroughGrid(fn) {
    this.grid.forEach(row => row.forEach(cell => fn(cell)));
  }

  empty() {
    this.stop();
    this.runThroughGrid(cell => cell.setState(false));
    return this;
  }

  revive(event) {
    this.runThroughGrid((cell) => {
      if (cell.id === event.target.dataset.id) {
        cell.setState(true);
      }
    });
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }

  randomize() {
    this.runThroughGrid(cell => cell.setState(Math.random() > 0.75));
  }

  runLifeCycle() {
    this.runThroughGrid(cell => cell.calculateNextState());
    this.runThroughGrid(cell => cell.moveToNextState());
  }

  clear() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  stop() {
    this.clear();
    if (this.isRunning) {
      this.isRunning = false;
    }
  }

  run() {
    this.interval = setInterval(this.runLifeCycle, this.speed);
    if (!this.isRunning) {
      this.isRunning = true;
    }
  }

  changeSpeed(value) {
    if (!this.isRunning) {
      this.speed = value;
    } else {
      this.speed = value;
      this.stop();
      this.run();
    }
  }
}
