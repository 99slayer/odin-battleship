import { createPlayer } from "../factories/createPlayer";
import { createPlayerDisplay } from "../DOM/components/createPlayerDisplays";
import { gridEvents, renderGrid, placementPhase } from "../DOM/interaction/grid";
import { firstTurn, changeTurn } from "./turn";
import { highlight } from "../DOM/interaction/highlight";
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
  };

  createPlayerDisplay(playerOne,1);
  createPlayerDisplay(playerTwo,2);

  placementPhase(playerOne, 1);
};

//should be called after ships have been placed
export const gameStart = () => {
  gridEvents();

  renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
  renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);

  //randomly chooses a player to go first if this is the first match
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
