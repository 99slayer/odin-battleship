import { createGrid } from "./DOM/components/createGrid";
import { menuEvents } from "./DOM/interaction/menu";

const multiplayer = document.getElementById("multiplayer");
multiplayer.style.display = "block";

// const names = document.getElementById("names");
// names.style.display = "block";

const playerOneGrid = document.getElementById("player-one-grid");
const playerTwoGrid = document.getElementById("player-two-grid");

createGrid(playerOneGrid, 1);
createGrid(playerTwoGrid, 2);
