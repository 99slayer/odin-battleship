import { updateDisplays } from "../DOM/interaction/playerDisplays";
import { renderGrid, resetGrid } from "../DOM/interaction/grid";

export const gameReset = (firstPlayer, secondPlayer) => {
  firstPlayer.board.reset();
  firstPlayer.isTurn = false;
  secondPlayer.board.reset();
  secondPlayer.isTurn = false;

  console.log(firstPlayer.board);
  console.log(secondPlayer.board);
};

// export const resetPlayers = (firstPlayer, secondPlayer) => {
//   firstPlayer.resetBoard();
//   secondPlayer.resetBoard();
// };

// export const resetDom = (firstPlayer, secondPlayer) => {
//   renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
//   renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
//   updateDisplays(firstPlayer,secondPlayer);
// }
