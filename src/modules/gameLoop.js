import { createGrid } from "../DOM/components/createGrid"
import { gridEvents } from "../DOM/interaction/grid";
import { menuEvents } from "../DOM/interaction/menu";
import { playerOne, playerTwo } from "./setup";

//SET UP
const playerOneGrid = document.getElementById('player-one-grid');
const playerTwoGrid = document.getElementById('player-two-grid');

createGrid(playerOneGrid,1);
createGrid(playerTwoGrid,2);
gridEvents();

//decide who goes first (player one goes first?)
//turn function

//FIGURE OUT TURNS NEXT

//V LOOP V
//alternate turns until there's a winner
//add win to that player
//loosing player gets to go first

//if implemented you should be able to restart a game or change the rules at anytime
