import { highlight } from "../DOM/interaction/highlight";
import { updateDisplays } from "../DOM/interaction/playerDisplays";
import { renderGrid } from "../DOM/interaction/grid";
import { checkWin } from "./checkWin";
import { gameReset } from "./gameReset";
import { setup } from "./gameStart";

//randomly chooses a player to go first
export const firstTurn = (firstPlayer, secondPlayer) => {
  let number = Math.floor((Math.random() * 10) + 1);

  if(number%2 === 0){
    firstPlayer.isTurn = true;
    // console.log(`${firstPlayer.getName()} GOES FIRST.`);
  } else if (number%2 !== 0){
    secondPlayer.isTurn = true;
    // console.log(`${secondPlayer.getName()} GOES FIRST.`);
  };
};

//changes current player
export const changeTurn = (firstPlayer, secondPlayer) => {
  if(firstPlayer.isTurn){
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
    // console.log(`IT IS NOW ${secondPlayer.getName()}s TURN.`);
  } else if (secondPlayer.isTurn){
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
    // console.log(`IT IS NOW ${firstPlayer.getName()}s TURN.`);
  };
};

export const turn = (firstPlayer, secondPlayer, target) => {
  if(firstPlayer.isTurn){
    if(secondPlayer.board.attacks.includes(target)){
      return;
    } else {
      firstPlayer.makeAttack(secondPlayer.board,target);

      if(checkWin(firstPlayer,secondPlayer) === 'first'){
        turnWon(firstPlayer,secondPlayer,'first');
        return;
      };
    };
  } else if (secondPlayer.isTurn){
    if(firstPlayer.board.attacks.includes(target)){
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board,target);

      if(checkWin(firstPlayer,secondPlayer) === 'second'){
        turnWon(firstPlayer,secondPlayer,'second');
        return;
      }
    };
  };
  // logTurn(firstPlayer,secondPlayer);

  changeTurn(firstPlayer,secondPlayer);
  highlight(firstPlayer,secondPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  updateDisplays(firstPlayer,secondPlayer);

  compTurn(firstPlayer, secondPlayer);
};

export const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    if(firstPlayer.computer){
      firstPlayer.makeAttack(secondPlayer.board);

      if(checkWin(firstPlayer,secondPlayer) === 'first'){
        turnWon(firstPlayer,secondPlayer,'first');
        return;
      };
    } else if (secondPlayer.computer){
      secondPlayer.makeAttack(firstPlayer.board);

      if(checkWin(firstPlayer,secondPlayer) === 'second'){
        turnWon(firstPlayer,secondPlayer,'second');
        return;
      };
    };
    // logTurn(firstPlayer,secondPlayer);
    
    changeTurn(firstPlayer,secondPlayer);
    highlight(firstPlayer,secondPlayer);
    renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    updateDisplays(firstPlayer,secondPlayer);
  }, 1000);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  console.log('game won.');
  // logTurn(firstPlayer,secondPlayer);

  gameReset(firstPlayer, secondPlayer, winner);
  renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  updateDisplays(firstPlayer,secondPlayer);
  setup();
};

const logTurn = (firstPlayer, secondPlayer) => {
  logPlayer(firstPlayer);
  logPlayer(secondPlayer);
};

const logPlayer = (player) => {
  console.log({
    name: player.getName(),
    wins: player.getWins(),
    isComputer: player.computer,
    shipsLeft: player.board.getShipsRemaining(),
  });

  let fleet = player.board.fleetCoordinates();

  for(let i=0;i<fleet.length;i+=1){
    console.log(fleet[i]);
  };
};
