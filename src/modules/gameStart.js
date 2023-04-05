import { createPlayer } from "../factories/createPlayer";
import { gridEvents, renderGrid, placementPhase } from "../DOM/interaction/grid";
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
  };

  //NEED TO DO SHIP PLACEMENT HERE
  placementPhase(playerOne, 1);
  //call grid events in placement after players done?
  // gridEvents();

  //should all be at the end of placementPhase?
  //or rather maybe on done btn?
  // renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
  // renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);

  // if(playerOne.getWins() === 0 && playerTwo.getWins() === 0){
  //   firstTurn(playerOne,playerTwo);
  // };

  // highlight(playerOne,playerTwo);

  // let computerPlayer;

  // if(playerOne.computer){
  //   computerPlayer = playerOne;
  // } else if (playerTwo.computer){
  //   computerPlayer = playerTwo;
  // };
  
  // if(computerPlayer.isTurn){
  //   compTurn(playerOne,playerTwo);
  // };
};
