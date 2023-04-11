import { setup, playerTwo } from "../../modules/gameStart";
import { placementPhase, renderGrid } from "./grid";
import { computerPlacement } from "../../modules/computer";

const multiplayer = document.getElementById("multiplayer");
const names = document.getElementById("names");
const placement = document.getElementById("placement");

const singlePlayerBtn = document.getElementById("single-player");
const twoPlayerBtn = document.getElementById("two-player");
const playerTwoCont = document.getElementById("player-two-cont");

const playerOneNameEl = document.getElementById("player-one-name");
const playerTwoNameEl = document.getElementById('player-two-name');
const startBtn = document.getElementById("start");
const doneBtn = document.getElementById("done-btn");

let isMultiplayer = false;

const hide = (el) => {
  el.style.display = "none";
};

const show = (el) => {
  el.style.display = 'block';
};

const getNames = () => {
  const playerOneName = playerOneNameEl.value;
  let playerTwoName = playerTwoNameEl.value;

  if(!isMultiplayer){
    playerTwoName = 'computer';
  };

  return [playerOneName, playerTwoName];
};

const donePlacement = () => {
  const grid = document.querySelector(".grid-1");
  const gridClone = grid.cloneNode(true);
  grid.replaceWith(gridClone);
  hide(placement);

  if (playerTwo.computer) {
    computerPlacement(playerTwo, [5, 4, 3, 3, 2]);
    renderGrid(document.querySelectorAll(".grid-cell-2"), playerTwo);
  } else {
    placementPhase(playerTwo, 2);
  }
};

const start = () => {
  const playerNames = getNames();
  const nameOne = playerNames[0];
  const nameTwo = playerNames[1];

  if (nameOne === "" || nameTwo === "") {
    return;
  }

  hide(names);

  setup(nameOne, nameTwo);
  playerOneNameEl.value = "";
  playerTwoNameEl.value = '';
};

const multiplayerMenu = (e) => {
  hide(playerTwoCont);

  if(e.target.getAttribute('id')==='two-player'){
    playerTwoCont.style.display = 'flex';
    isMultiplayer = true;
  };

  hide(multiplayer);
  show(names);
};

// menu interaction events
export const menuEvents = (() => {
  singlePlayerBtn.addEventListener('click',multiplayerMenu);
  twoPlayerBtn.addEventListener('click',multiplayerMenu);

  startBtn.addEventListener("click", () => {
    start();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      start();
    };
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      start();
    };
  });

  doneBtn.addEventListener("click", () => {
    donePlacement();
  });
})();
