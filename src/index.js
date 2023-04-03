import { createGrid } from "./DOM/components/createGrid";
import { menuEvents } from "./DOM/interaction/menu";

const playerOneGrid = document.getElementById('player-one-grid');
const playerTwoGrid = document.getElementById('player-two-grid');

createGrid(playerOneGrid,1);
createGrid(playerTwoGrid,2);