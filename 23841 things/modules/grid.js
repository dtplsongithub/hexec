import number from './number.js';

const grid = {
  gridElement: document.getElementsByClassName("grid")[0],
  cells: [],
  playable: false,
  directionRoots: {
    // roots are the first row's or column's indexes of swipe direction
    'UP': [1, 2, 3, 4],
    'RIGHT': [4, 8, 12, 16],
    'DOWN': [13, 14, 15, 16],
    'LEFT': [1, 5, 9, 13]
  },
  init: function () {
    const cellElements = document.getElementsByClassName("cell");
    let cellIndex = 1;

    for (let cellElement of cellElements) {
      grid.cells[cellIndex] = {
        element: cellElement,
        top: cellElement.offsetTop,
        left: cellElement.offsetLeft,
        number: null
      }

      cellIndex++;
    }

    // spawn first number and start game
    number.spawn();
    this.playable = true;
  },
  randomEmptyCellIndex: function () {
    let emptyCells = [];
    for (let i = 1; i < this.cells.length; i++) if (this.cells[i].number === null) emptyCells.push(i);

    // no empty cell, game over
    if (emptyCells.length === 0) return false;

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  },
  slide: function (direction) {
    if (!this.playable) return false;

    // set playable to false to prevent continous slides
    this.playable = false;

    // get direction's grid root indexes
    const roots = this.directionRoots[direction];

    // indexes increments or decrements depend on direction
    let increment = (direction === 'RIGHT' || direction === 'DOWN') ? -1 : 1;

    // nidexes moves by
    increment *= (direction === 'UP' || direction === 'DOWN') ? 4 : 1;

    // start loop with root index
    for (let i = 0; i < roots.length; i++) {
      const root = roots[i];

      // increment or decrement through grid from root
      // j starts from 1 bc no need to check root cell
      for (let j = 1; j < 4; j++) {
        const cellIndex = root + (j * increment);
        const cell = this.cells[cellIndex];

        if (cell.number !== null) {
          let moveToCell = null;

          // check if cells below(to root) this cell empty or has same number
          // to decide to move or stay
          // k starts from j-1 first cell below j
          // k ends by 0 which is root cell
          for (let k = j - 1; k >= 0; k--) {
            const foreCellIndex = root + (k * increment);
            const foreCell = this.cells[foreCellIndex];

            // the cell is empty, move to and check next cell
            if (foreCell.number === null) moveToCell = foreCell; else if (cell.number.dataset.value === foreCell.number.dataset.value) {
              // the cell has same number, move, merge and stop
              moveToCell = foreCell;
              break;

              // next cell is not empty and not same with moving number(number is moving cell is not)
              // number can't go further
            } else break;
          }

          if (moveToCell !== null) number.moveTo(cell, moveToCell);
        }
      }
    }

    // spawn a new number and make game playable
    setTimeout(function () {
      if (number.spawn()) grid.playable = true; else {
        // game over screen
        document.getElementsByClassName("grid")[0].style = "filter: brightness(1.5);";
        document.getElementById("gameover").style.display = "block"
        document.getElementById("scoreelem").innerHTML = number.score();
      }
    }, 500);
  }
}

export default grid;