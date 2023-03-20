import { createGameboard } from "./factories/createGameboard";
import { playerOne, playerTwo } from "./DOM/interaction/menu";

//could potentially implement something later for two player.

//singleplayer/multiplayer menu
//choose player names

//place ships. with predetermined coordinates for now.
playerOne.board.place(['A2','A3','A4']);
playerOne.board.place(['E3','F3','G3']);
playerOne.board.place(['A1','B1','C1','D1']);
playerOne.board.place(['C10','D10','E10','F10']);

playerTwo.board.place(['A4','B4','C4']);
playerTwo.board.place(['A5','A6','A7']);
playerTwo.board.place(['E5','F5','G5','H5']);
playerTwo.board.place(['E6','E7','E8','E9']);
//decide who goes first

//V LOOP V
//alternate turns until there's a winner
//add win to that player
//loosing player gets to go first

//if implemented you should be able to restart a game or change the rules at anytime
