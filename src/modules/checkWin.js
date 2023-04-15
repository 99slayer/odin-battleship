export const checkWin = (firstPlayer, secondPlayer) => {
  if (secondPlayer.board.isFleetSunk()) {
    firstPlayer.won();
    return "first";
  } else if (firstPlayer.board.isFleetSunk()) {
    secondPlayer.won();
    return "second";
  }
};
