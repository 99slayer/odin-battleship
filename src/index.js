console.log('check check')
import { createGrid } from "./DOM/components/createGrid"
import { menuEvents } from "./DOM/interaction/menu";
import './gameLoop';
const computerGrid = document.getElementById('computer-grid');
const playerGrid = document.getElementById('player-grid');
createGrid(computerGrid);
createGrid(playerGrid);