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
  log(firstPlayer,secondPlayer);
  turnRegular(firstPlayer, secondPlayer);

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
    log(firstPlayer,secondPlayer);
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
  log(firstPlayer,secondPlayer);
  gameReset(firstPlayer, secondPlayer, winner);
  renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  updateDisplays(firstPlayer, secondPlayer);
  setup();
};

// just for testing
const log = (firstPlayer, secondPlayer) => {
  let x = 0;
  for(let i=0;i<2;i+=1){
    if(x === 0){
      const fleet = firstPlayer.board.fleetCoordinates();
      console.log('player 1');
      for(let i=0;i<firstPlayer.board.fleetCoordinates().length;i+=1){
        console.log(fleet[i]);
      };
      console.log(firstPlayer.board.getShipsRemaining());
      x += 1;
    } else if (x === 1){
      const fleet = secondPlayer.board.fleetCoordinates();
      console.log('player 2');
      for(let i=0;i<secondPlayer.board.fleetCoordinates().length;i+=1){
        console.log(fleet[i]);
      };
      console.log(secondPlayer.board.getShipsRemaining());
    };
  };
};
