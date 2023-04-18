import {
  gameSetup,
  gameStart,
  playerOne,
  playerTwo,
} from "../../modules/gameFunctions";
import { placementPhase, renderGrid, resetGridEvents } from "./grid";
import { computerPlacement } from "../../modules/computer";

const resetBtn = document.getElementById("reset-btn");

resetBtn.onclick = () => {
  if (!playerOne && !playerTwo) {
    return;
  }

  window.location.reload();
};

const multiplayer = document.getElementById("multiplayer-menu");
const names = document.getElementById("name-menu");
const placement = document.getElementById("placement-menu");

const singlePlayerBtn = document.getElementById("single-player-btn");
const twoPlayerBtn = document.getElementById("two-player-btn");
const playerTwoCont = document.getElementById("player-two-cont");

const playerOneNameEl = document.getElementById("player-one-name");
const playerTwoNameEl = document.getElementById("player-two-name");
const startBtn = document.getElementById("start-btn");
const doneBtn = document.getElementById("done-btn");

const displays = document.querySelectorAll(".display");

let isMultiplayer = false;

const hide = (el) => {
  el.style.display = "none";
};

const show = (el) => {
  el.style.display = "block";
};

const getNames = () => {
  const playerOneName = playerOneNameEl.value.trim();
  let playerTwoName = playerTwoNameEl.value.trim();

  if (!isMultiplayer) {
    playerTwoName = "computer";
  }

  return [playerOneName, playerTwoName];
};

export const createPlacementText = (player) => {
  const placementText = document.getElementById("placement-text");
  const playerName = document.createElement("h3");
  playerName.classList.add("placement-player-name");
  playerName.textContent = player.getName();
  const text = document.createElement("p");
  text.textContent =
    "Place your ships by clicking on your gameboard. Right click to change the ships axis.";
  placementText.append(playerName, text);
};

const removePlacementText = () => {
  const placementText = document.getElementById("placement-text");
  placementText.innerHTML = "";
};

const donePlacement = (firstPlayer, secondPlayer) => {
  removePlacementText();
  renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);

  const firstFleet = firstPlayer.board.fleetCoordinates();
  const secondFleet = secondPlayer.board.fleetCoordinates();

  if (firstFleet.length === 5 && secondFleet.length === 0) {
    const grid1 = document.getElementById("player-one-grid");
    resetGridEvents(grid1);

    if (secondPlayer.computer) {
      computerPlacement(secondPlayer, [5, 4, 3, 3, 2]);
      hide(placement);
      renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
      gameStart();
    } else {
      createPlacementText(secondPlayer);
      placementPhase(secondPlayer, 2);
    }
  }

  if (firstFleet.length === 5 && secondFleet.length === 5) {
    const grid2 = document.getElementById("player-two-grid");
    resetGridEvents(grid2);
    hide(placement);
    gameStart();
  }
};

const startSetup = () => {
  const playerNames = getNames();
  const nameOne = playerNames[0];
  const nameTwo = playerNames[1];

  if (nameOne === "" || nameTwo === "") {
    return;
  }

  displays.forEach((display) => {
    display.style.display = null;
  });

  hide(names);

  gameSetup(nameOne, nameTwo);
  playerOneNameEl.value = "";
  playerTwoNameEl.value = "";
};

const multiplayerMenu = (e) => {
  hide(playerTwoCont);

  if (e.target.getAttribute("id") === "two-player-btn") {
    playerTwoCont.style.display = "flex";
    isMultiplayer = true;
  }

  hide(multiplayer);
  show(names);
};

// menu interaction events
export const menuEvents = (() => {
  singlePlayerBtn.addEventListener("click", multiplayerMenu);
  twoPlayerBtn.addEventListener("click", multiplayerMenu);

  startBtn.addEventListener("click", () => {
    startSetup();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startSetup();
    }
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startSetup();
    }
  });

  playerTwoNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startSetup();
    }
  });

  doneBtn.addEventListener("click", () => {
    donePlacement(playerOne, playerTwo);
  });
})();
