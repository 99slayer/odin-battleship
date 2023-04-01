import { createPlayer } from "../factories/createPlayer";
import { gridEvents, renderGrid } from "../DOM/interaction/grid";
import { firstTurn, changeTurn } from "./turn";
import { highlight, updateDisplays } from "../DOM/interaction/playerDisplays";
import { compTurn } from "./turn";

export let playerOne,playerTwo;

export const setup = (nameOne, nameTwo) => {
  if(!playerOne||!playerTwo){
    let x = false;

    if(nameTwo === 'computer'){
      x = true;
    };
    
    playerOne = createPlayer(nameOne);
    playerTwo = createPlayer(nameTwo,x);
    gridEvents();
  };

  //temporary placement setup
  playerOne.board.place(['C3','C4','C5']);
  playerOne.board.place(['E3','F3','G3']);
  playerOne.board.place(['A1','B1','C1','D1']);
  // playerOne.board.place(['C10','D10','E10','F10']);

  playerTwo.board.place(['A4','B4','C4']);
  // playerTwo.board.place(['A5','A6','A7']);
  playerTwo.board.place(['E5','F5','G5','H5']);
  // playerTwo.board.place(['E6','E7','E8','E9']);

  renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
  renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);

  if(playerOne.getWins() === 0 && playerTwo.getWins() === 0){
    firstTurn(playerOne,playerTwo);
  };

  highlight(playerOne,playerTwo);

  let computerPlayer;

  if(playerOne.computer){
    computerPlayer = playerOne;
  } else if (playerTwo.computer){
    computerPlayer = playerTwo;
  };
  
  if(computerPlayer.isTurn){
    compTurn(playerOne,playerTwo);
  };
};
