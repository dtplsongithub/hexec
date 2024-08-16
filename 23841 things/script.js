import grid from './modules/grid.js';

grid.init();

document.addEventListener("keyup", function (e) {
  let direction = null;

  if (e.keyCode === 38||e.code=="keyW") direction = "UP";
  else if (e.keyCode === 39||e.code=="KeyD") direction = "RIGHT";
  else if (e.keyCode === 40||e.code=="KeyS") direction = "DOWN";
  else if (e.keyCode === 37||e.code=="KeyA") direction = "LEFT";

  if (direction !== null) grid.slide(direction);
  return false;
});

