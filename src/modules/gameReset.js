import { changeTurn } from "./turn";

export const gameReset = (firstPlayer, secondPlayer, winner) => {
  if(winner === 'first'&&firstPlayer.isTurn){
    changeTurn(firstPlayer, secondPlayer);
  } else if (winner === 'second'&&secondPlayer.isTurn){
    changeTurn(firstPlayer, secondPlayer);
  };

  firstPlayer.board.reset();
  secondPlayer.board.reset();
};
