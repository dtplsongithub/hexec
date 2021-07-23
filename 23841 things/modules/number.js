import grid from './grid.js';
let score = 0;
const number = {
  numbers: [],
  score: function () { return score; },
  getElements: function () {
    const numberElements = document.getElementsByClassName("number");
    for (let numberElement of numberElements) this.numbers.push(numberElement);
  },
  spawn: function () {
    const emptyCellIndex = grid.randomEmptyCellIndex();
    if (emptyCellIndex === false) return false;
    const numberElement = document.createElement("div");
    const numberValue = 2.5;

    numberElement.style.backgroundColor = "rgb(" + (100 / numberValue) + ", " + (50 / numberElement) + ", 0)";
    numberElement.innerHTML = "<span style='font-size: " + (170 / numberValue.toString().length) + "px;'>" + numberValue + "</span>";
    numberElement.dataset.value = numberValue;
    numberElement.classList.add("number");
    numberElement.style.top = `${grid.cells[emptyCellIndex].top}px`;
    numberElement.style.left = `${grid.cells[emptyCellIndex].left}px`;

    grid.cells[emptyCellIndex].number = numberElement;
    grid.gridElement.append(numberElement);
    return true;
  },
  moveTo: function (fromCell, toCell) {
    const number = fromCell.number;
    if (toCell.number === null) {
      // target cell is empty fill with number
      number.style.top = `${toCell.top}px`;
      number.style.left = `${toCell.left}px`;

      toCell.number = number;
      fromCell.number = null;
    } else if (number.dataset.value === toCell.number.dataset.value) {
      // target cell has same number
      // merge both cell

      number.style.top = `${toCell.top}px`;
      number.style.left = `${toCell.left}px`;
      number.style.opacity = '0';

      // remove number DOM element after transition
      setTimeout(function () { grid.gridElement.removeChild(number); }, 500);

      // double target cell's number
      const newNumberValue = toCell.number.dataset.value * 2.5;
      toCell.number.dataset.value = newNumberValue;
      toCell.number.innerHTML = "<span style='font-size: " + (170 / newNumberValue.toString().length) + "px;'>" + newNumberValue + "</span>";

      fromCell.number = null;

      // add score
      score += toCell.number.dataset.value;
    }
  }
}

export default number;