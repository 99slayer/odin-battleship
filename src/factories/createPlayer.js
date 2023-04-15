import { createGameboard } from "./createGameboard";
import { computerAttack } from "../modules/computer";

export const createPlayer = (playerName, isComp = false) => {
  const name = playerName;
  const computer = isComp;
  const board = createGameboard();
  const isTurn = false;
  let wins = 0;

  const makeAttack = (enemyBoard, coordinates = null) => {
    let target = coordinates;

    if (computer) {
      target = computerAttack(enemyBoard);
    }

    enemyBoard.receiveAttack(target);
  };

  const getName = () => {
    return name;
  };

  const won = () => {
    wins += 1;
  };

  const getWins = () => {
    return wins;
  };

  return { board, computer, isTurn, makeAttack, getName, won, getWins };
};
