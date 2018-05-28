/* global document */
/* eslint  arrow-body-style: 0 */
import uniqueID from './utils';

export default class Cell {
  constructor() {
    this.alive = false;
    this.id = null;
    this.nextState = null;
    this.neighbours = [];

    this.init = this.init.bind(this);
    this.init();
  }

  init() {
    this.element = document.createElement('div');
    this.element.classname = 'grid__cell';
    this.element.setAttribute('data-id', uniqueID());
    this.id = this.element.dataset.id;
    this.setElementState();
  }

  addNeighbours(neighbouringCells) {
    if (!Array.isArray(neighbouringCells)) {
      throw new Error('Wrong type of argument: Array expected.');
    }

    this.neighbours = this.neighbours.concat(neighbouringCells);
  }

  setElementState() {
    this.element.className = this.alive ? 'grid__cell grid__cell--alive' : 'grid__cell grid__cell--dead';
  }

  setState(newState) {
    this.alive = newState;
    this.setElementState();
  }

  calculateNextState() {
    const aliveNeighbours = this.neighbours.reduce((acc, cell) => {
      return acc + (cell.alive ? 1 : 0);
    }, 0);

    this.nextState = this.alive
      ? aliveNeighbours >= 2 && aliveNeighbours < 4
      : aliveNeighbours === 3;
  }

  moveToNextState() {
    this.alive = this.nextState;
    this.setElementState();
  }
}
