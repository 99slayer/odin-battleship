import { createPlayer } from "../factories/createPlayer";
import { createPlayerDisplay } from "../DOM/components/createPlayerDisplays";
import {
  gridEvents,
  renderGrid,
  placementPhase,
} from "../DOM/interaction/grid";
import { createPlacementText } from "../DOM/interaction/menu";
import { changeTurn, firstTurn, compTurn } from "./turn";
import { highlight } from "../DOM/interaction/highlight";
import { updateDisplays } from "../DOM/interaction/playerDisplays";

export let playerOne, playerTwo;

export const gameSetup = (nameOne, nameTwo) => {
  if (!playerOne || !playerTwo) {
    let x = false;

    if (nameTwo === "computer") {
      x = true;
    }

    playerOne = createPlayer(nameOne);
    playerTwo = createPlayer(nameTwo, x);
    createPlayerDisplay(playerOne, 1);
    createPlayerDisplay(playerTwo, 2);
  }

  highlight(playerOne, playerTwo);
  createPlacementText(playerOne);
  placementPhase(playerOne, 1);
};

export const gameStart = () => {
  gridEvents();

  renderGrid(document.querySelectorAll(".grid-cell-1"), playerOne);
  renderGrid(document.querySelectorAll(".grid-cell-2"), playerTwo);

  if (playerOne.getWins() === 0 && playerTwo.getWins() === 0) {
    firstTurn(playerOne, playerTwo);
  }

  updateDisplays(playerOne, playerTwo);
  highlight(playerOne, playerTwo);

  if (playerTwo.computer && playerTwo.isTurn) {
    compTurn(playerOne, playerTwo);
  }
};

export const gameRestart = (winner) => {
  if (winner === 1 && playerOne.isTurn) {
    changeTurn(playerOne, playerTwo);
  } else if (winner === 2 && playerTwo.isTurn) {
    changeTurn(playerOne, playerTwo);
  }

  playerOne.board.reset();
  playerTwo.board.reset();
  renderGrid(document.querySelectorAll(".grid-cell-1"), playerOne);
  renderGrid(document.querySelectorAll(".grid-cell-2"), playerTwo);
  updateDisplays(playerOne, playerTwo);
  gameSetup();
};
