import { createPlayer } from "../factories/createPlayer";
import { renderGrid } from "../DOM/interaction/grid";
import { firstTurn } from "./turn";

export let playerOne,playerTwo;

export const setup = (nameOne, nameTwo) => {
  let x = true;

  if(nameTwo === 'computer'){
    x = false;
  };
  
  playerOne = createPlayer(nameOne);
  playerTwo = createPlayer(nameTwo,x);

  //temporary placement setup
  playerOne.board.place(['A2','A3','A4']);
  playerOne.board.place(['E3','F3','G3']);
  playerOne.board.place(['A1','B1','C1','D1']);
  playerOne.board.place(['C10','D10','E10','F10']);

  playerTwo.board.place(['A4','B4','C4']);
  playerTwo.board.place(['A5','A6','A7']);
  playerTwo.board.place(['E5','F5','G5','H5']);
  playerTwo.board.place(['E6','E7','E8','E9']);

  renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
  renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);

  firstTurn(playerOne,playerTwo);
  
  if(playerOne.isTurn&&playerOne.computer){
    playerOne.makeAttack(playerTwo.board);
    changeTurn(playerOne,playerTwo);
    highlight(playerOne,playerTwo);
    renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
    renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);
  } else if (playerTwo.isTurn&&playerTwo.computer){
    playerTwo.makeAttack(playerOne.board);
    changeTurn(playerOne,playerTwo);
    highlight(playerOne,playerTwo);
    renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
    renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);
  };

};

export const gameStart = async () => {
  let p = new Promise(function(resolve){
    let start = true;
    resolve(start);
  });
};
