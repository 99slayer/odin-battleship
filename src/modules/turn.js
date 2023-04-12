import { highlight } from "../DOM/interaction/highlight";
import { updateDisplays } from "../DOM/interaction/playerDisplays";
import { renderGrid } from "../DOM/interaction/grid";
import { checkWin } from "./checkWin";
import { gameReset } from "./gameReset";
import { setup } from "./gameStart";
import { checkForComputer } from "./computer";

// randomly chooses a player to go first
export const firstTurn = (firstPlayer, secondPlayer) => {
  const number = Math.floor(Math.random() * 10 + 1);

  if (number % 2 === 0) {
    firstPlayer.isTurn = true;
    // console.log(`${firstPlayer.getName()} GOES FIRST.`);
  } else if (number % 2 !== 0) {
    secondPlayer.isTurn = true;
    // console.log(`${secondPlayer.getName()} GOES FIRST.`);
  }
};

// changes current player
export const changeTurn = (firstPlayer, secondPlayer) => {
  if (firstPlayer.isTurn) {
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
    // console.log(`IT IS NOW ${secondPlayer.getName()}s TURN.`);
  } else if (secondPlayer.isTurn) {
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
    // console.log(`IT IS NOW ${firstPlayer.getName()}s TURN.`);
  }
};

// Vmake into seperate function?V
// changeTurn(firstPlayer, secondPlayer);
// highlight(firstPlayer, secondPlayer);
// renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
// renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
// updateDisplays(firstPlayer, secondPlayer);

export const turn = (firstPlayer, secondPlayer, target) => {
  if (firstPlayer.isTurn) {
    if (secondPlayer.board.attacks.includes(target)) {
      return;
    } else {
      firstPlayer.makeAttack(secondPlayer.board, target);

      if (checkWin(firstPlayer, secondPlayer) === "first") {
        turnWon(firstPlayer, secondPlayer, "first");
        return;
      };
    };
  } else if (secondPlayer.isTurn) {
    if (firstPlayer.board.attacks.includes(target)) {
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board, target);

      if (checkWin(firstPlayer, secondPlayer) === "second") {
        turnWon(firstPlayer, secondPlayer, "second");
        return;
      };
    };
  };

  changeTurn(firstPlayer, secondPlayer);
  highlight(firstPlayer, secondPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  updateDisplays(firstPlayer, secondPlayer);

  if(checkForComputer(firstPlayer, secondPlayer)){
    compTurn(firstPlayer, secondPlayer);
  };
};

// should i move all computer functions to the computer module?
export const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    secondPlayer.makeAttack(firstPlayer.board);

    if (checkWin(firstPlayer, secondPlayer) === "second") {
      turnWon(firstPlayer, secondPlayer, "second");
      return;
    };

    changeTurn(firstPlayer, secondPlayer);
    highlight(firstPlayer, secondPlayer);
    renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
    renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
    updateDisplays(firstPlayer, secondPlayer);
  }, 1000);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  gameReset(firstPlayer, secondPlayer, winner);
  renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  updateDisplays(firstPlayer, secondPlayer);
  setup();
};
