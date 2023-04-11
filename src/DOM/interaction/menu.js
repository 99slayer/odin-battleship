import { setup, playerOne, playerTwo } from "../../modules/gameStart";
import { placementPhase, renderGrid } from "./grid";
import { computerPlacement } from "../../modules/computer";

const multiplayer = document.getElementById("multiplayer");
const names = document.getElementById("names");
const placement = document.getElementById("placement");
const rules = document.getElementById("rules");

const singlePlayerBtn = document.getElementById("single-player");
const twoPlayerBtn = document.getElementById("two-player");

const playerOneNameEl = document.getElementById("player-one-name");
// const playerTwoName = document.getElementById('player-two-name');
const startBtn = document.getElementById("start");
const doneBtn = document.getElementById("done-btn");

// let multiplayer = false;

const hide = (menu) => {
  menu.style.display = null;
};

// const show = (menu) => {
//   menu.style.display = 'block';
// };

const getNames = () => {
  const playerOneName = playerOneNameEl.value;
  const playerTwoName = "computer";
  // if(!multiplayer){
  //   playerTwo = 'computer';
  // };

  return [playerOneName, playerTwoName];
};

const done = () => {
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
  // playerTwoName.value = '';
};

// menu interaction events
export const menuEvents = (() => {
  // singlePlayerBtn.addEventListener('click',()=>{
  //   hide(multiplayer);
  //   show(names);
  //   multiplayer = false;
  // });

  // twoPlayerBtn.addEventListener('click',()=>{
  //   hide(multiplayer);
  //   show(names);
  //   multiplayer = true;
  // });

  startBtn.addEventListener("click", () => {
    start();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      start();
    }
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      start();
    }
  });

  doneBtn.addEventListener("click", () => {
    done();
  });
})();
