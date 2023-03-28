import { highlight, updateDisplays } from "../DOM/interaction/playerDisplays";
import { renderGrid } from "../DOM/interaction/grid";
import { checkWin } from "./wins";

export const firstTurn = (firstPlayer, secondPlayer) => {
  let number = Math.floor((Math.random() * 10) + 1);

  if(number%2 === 0){
    firstPlayer.isTurn = true;
    console.log(`${firstPlayer.getName()} GOES FIRST.`);
  } else if (number%2 !== 0){
    secondPlayer.isTurn = true;
    console.log(`${secondPlayer.getName()} GOES FIRST.`);
  };
};

export const changeTurn = (firstPlayer, secondPlayer) => {
  if(firstPlayer.isTurn){
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
    console.log(`IT IS NOW ${secondPlayer.getName()}s TURN.`);
  } else if (secondPlayer.isTurn){
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
    console.log(`IT IS NOW ${firstPlayer.getName()}s TURN.`);
  };
};

export const turn = (firstPlayer, secondPlayer, target) => {
  if(firstPlayer.isTurn){
    firstPlayer.makeAttack(secondPlayer.board,target);
  } else if (secondPlayer.isTurn){
    secondPlayer.makeAttack(firstPlayer.board,target);
  };

  changeTurn(firstPlayer,secondPlayer);
  highlight(firstPlayer,secondPlayer);
  updateDisplays(firstPlayer,secondPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  checkWin(firstPlayer,secondPlayer);
  //IF WON STOP GAME
  //RESET GAME
  compTurn(firstPlayer, secondPlayer);
};

export const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    if(firstPlayer.computer){
      firstPlayer.makeAttack(secondPlayer.board);
    } else if (secondPlayer.computer){
      secondPlayer.makeAttack(firstPlayer.board);
    };

    changeTurn(firstPlayer,secondPlayer);
    highlight(firstPlayer,secondPlayer);
    updateDisplays(firstPlayer,secondPlayer);
    renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    checkWin(firstPlayer,secondPlayer);
    //IF WON STOP GAME
    //RESET GAME
  }, 1000);
};
