import { createGrid } from "./DOM/components/createGrid";
import { menuEvents } from "./DOM/interaction/menu";
import "./index.css";

const displays = document.querySelectorAll(".display");
displays.forEach((x) => {
  x.style.display = "none";
});

const winScreen = document.getElementById("win-screen");
winScreen.style.display = "none";

const multiplayer = document.getElementById("multiplayer-menu");
multiplayer.style.display = "block";

const playerOneGrid = document.getElementById("player-one-grid");
const playerTwoGrid = document.getElementById("player-two-grid");

createGrid(playerOneGrid, 1);
createGrid(playerTwoGrid, 2);
