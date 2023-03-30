import { gameReset } from "./gameReset";

export const checkWin = (firstPlayer, secondPlayer) => {
  let firstFleet = firstPlayer.board.isFleetSunk();
  let secondFleet = secondPlayer.board.isFleetSunk();
  // let x = false;

  if(secondFleet){
    firstPlayer.won();
    return 'first';
    // x = true;
    // gameReset(firstPlayer, secondPlayer);
  } else if (firstFleet){
    secondPlayer.won();
    return 'second';
    // x = true;
    // gameReset(firstPlayer, secondPlayer);
  };
  // return x
  //return bool game reset in turn 
  //return bool or player??
};

// const logWins = (firstPlayer, secondPlayer) => {
//   console.log(`player1 wins: ${firstPlayer.getWins()}`);
//   console.log(`player2 wins: ${secondPlayer.getWins()}`);
// };
