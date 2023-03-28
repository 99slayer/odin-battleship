export const checkWin = (firstPlayer, secondPlayer) => {
  let firstFleet = firstPlayer.board.isFleetSunk();
  let secondFleet = secondPlayer.board.isFleetSunk();

  if(secondFleet){
    firstPlayer.won();
    logWins(firstPlayer, secondPlayer);
  } else if (firstFleet){
    secondPlayer.won();
    logWins(firstPlayer, secondPlayer);
  };

};

const logWins = (firstPlayer, secondPlayer) => {
  console.log(`player1 wins: ${firstPlayer.getWins()}`);
  console.log(`player2 wins: ${secondPlayer.getWins()}`);
};
