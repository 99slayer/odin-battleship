import { setup, gameStart, playerOne, playerTwo } from "../../modules/gameStart";
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

const donePlacement = (firstPlayer, secondPlayer) => {
  renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);

  const firstFleet = firstPlayer.board.fleetCoordinates();
  const secondFleet = secondPlayer.board.fleetCoordinates();

  if(firstFleet.length === 5 && secondFleet.length === 0){
    const grid1 = document.querySelector(".grid-1");
    const gridClone1 = grid1.cloneNode(true);
    grid1.replaceWith(gridClone1);
    if (secondPlayer.computer) {
      computerPlacement(secondPlayer, [5, 4, 3, 3, 2]);
      hide(placement);
      renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
    } else {
      placementPhase(secondPlayer, 2);
    };
  };

  if(firstFleet.length === 5 && secondFleet.length === 5){
    const grid2 = document.querySelector(".grid-2");
    const gridClone2 = grid2.cloneNode(true);
    grid2.replaceWith(gridClone2);
    hide(placement);
    gameStart();
  };
};

const gameSetUp = () => {
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

  // do this for both inputs
  startBtn.addEventListener("click", () => {
    gameSetUp();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    };
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    };
  });

  doneBtn.addEventListener("click", () => {
    donePlacement(playerOne,playerTwo);
  });
})();
