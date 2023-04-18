export const checkWin = (firstPlayer, secondPlayer) => {
  if (secondPlayer.board.isFleetSunk()) {
    firstPlayer.won();
    return 1;
  } else if (firstPlayer.board.isFleetSunk()) {
    secondPlayer.won();
    return 2;
  }
};
