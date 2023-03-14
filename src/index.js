console.log('check check')
import { createGrid } from "./DOM/createGrid"
const computerGrid = document.getElementById('computer-grid');
const playerGrid = document.getElementById('player-grid');
createGrid(computerGrid);
createGrid(playerGrid);