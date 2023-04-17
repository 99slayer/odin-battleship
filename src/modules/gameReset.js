import { changeTurn } from "./turn";
import { resetGridEvents } from "../DOM/interaction/grid";

export const gameRestart = (firstPlayer, secondPlayer, winner) => {
  if (winner === "first" && firstPlayer.isTurn) {
    changeTurn(firstPlayer, secondPlayer);
  } else if (winner === "second" && secondPlayer.isTurn) {
    changeTurn(firstPlayer, secondPlayer);
  }

  const grid1 = document.getElementById("player-one-grid");
  const grid2 = document.getElementById("player-two-grid");
  firstPlayer.board.reset();
  secondPlayer.board.reset();
  resetGridEvents(grid1);
  resetGridEvents(grid2);
};
