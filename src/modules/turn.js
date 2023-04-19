import { highlight } from "../DOM/interaction/highlight";
import { updateDisplays } from "../DOM/interaction/playerDisplays";
import { renderGrid, resetGridEvents } from "../DOM/interaction/grid";
import { checkWin } from "./checkWin";
import { checkForComputer } from "./computer";
import { showScreen } from "../DOM/interaction/winScreen";

// randomly chooses a player to go first
export const firstTurn = (firstPlayer, secondPlayer) => {
  const number = Math.floor(Math.random() * 10 + 1);

  if (number % 2 === 0) {
    firstPlayer.isTurn = true;
  } else if (number % 2 !== 0) {
    secondPlayer.isTurn = true;
  }
};

// changes current player
export const changeTurn = (firstPlayer, secondPlayer) => {
  if (firstPlayer.isTurn) {
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
  } else if (secondPlayer.isTurn) {
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
  }
};

// lets the current player make an attack, then checks for a winner
export const turn = (firstPlayer, secondPlayer, target) => {
  if (firstPlayer.isTurn) {
    if (secondPlayer.board.attacks.includes(target)) {
      return;
    } else {
      firstPlayer.makeAttack(secondPlayer.board, target);

      if (checkWin(firstPlayer, secondPlayer) === 1) {
        turnWon(firstPlayer, secondPlayer, 1);
        return;
      }
    }
  } else if (secondPlayer.isTurn) {
    if (firstPlayer.board.attacks.includes(target)) {
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board, target);

      if (checkWin(firstPlayer, secondPlayer) === 2) {
        turnWon(firstPlayer, secondPlayer, 2);
        return;
      }
    }
  }

  turnRegular(firstPlayer, secondPlayer);

  if (checkForComputer(firstPlayer, secondPlayer)) {
    compTurn(firstPlayer, secondPlayer);
  }
};

export const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    secondPlayer.makeAttack(firstPlayer.board);

    if (checkWin(firstPlayer, secondPlayer) === 2) {
      turnWon(firstPlayer, secondPlayer, 2);
      return;
    }

    turnRegular(firstPlayer, secondPlayer);
  }, 1000);
};

const turnRegular = (firstPlayer, secondPlayer) => {
  changeTurn(firstPlayer, secondPlayer);
  highlight(firstPlayer, secondPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  updateDisplays(firstPlayer, secondPlayer);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  const grid1 = document.getElementById("player-one-grid");
  const grid2 = document.getElementById("player-two-grid");
  resetGridEvents(grid1);
  resetGridEvents(grid2);
  showScreen(winner);
};
