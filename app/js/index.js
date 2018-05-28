/* global document */
/* eslint no-return-assign: 0, arrow-body-style: 0 */
import Grid from './Grid';

const gridContainer = document.querySelector('.grid');
const grid = new Grid(50, 50, gridContainer);

Array.from(gridContainer.querySelectorAll('.grid__cell')).forEach((cell) => {
  cell.addEventListener('click', event => grid.revive(event));
});

document.querySelector('.controls-grid__control--play-button').addEventListener('click', () => grid.run());
document.querySelector('.controls-grid__control--randomize-button').addEventListener('click', () => grid.randomize());
document.querySelector('.controls-grid__control--reset-button').addEventListener('click', () => grid.stop());
document.querySelector('.controls-grid__control--clear-button').addEventListener('click', () => grid.empty());
document.querySelector('.controls-grid__control--speed-slider').addEventListener('change', (event) => {
  return grid.changeSpeed(Number(event.target.value));
});
