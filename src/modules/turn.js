import { highlight } from "../DOM/interaction/playerDisplays";
import { renderGrid } from "../DOM/interaction/grid";

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
    changeTurn(firstPlayer,secondPlayer);
    highlight(firstPlayer,secondPlayer);
  } else if (secondPlayer.isTurn){
    secondPlayer.makeAttack(firstPlayer.board,target);
    changeTurn(firstPlayer,secondPlayer);
    highlight(firstPlayer,secondPlayer);
  };
  //COMPUTER IS NOT ATTACKIGN HERE
  if(firstPlayer.computer){
    firstPlayer.makeAttack(secondPlayer.board);
    changeTurn(firstPlayer,secondPlayer);
    highlight(firstPlayer,secondPlayer);
  } else if (secondPlayer.computer){
    secondPlayer.makeAttack(firstPlayer.board);
    changeTurn(firstPlayer,secondPlayer);
    highlight(firstPlayer,secondPlayer);
  };
  renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  
  // console.log({p1turn:firstPlayer.isTurn,p1computer:firstPlayer.computer,p1attacks:firstPlayer.board.attacks});
  // console.log({p2turn:secondPlayer.isTurn,p2computer:secondPlayer.computer,p2attacks:secondPlayer.board.attacks});
};
