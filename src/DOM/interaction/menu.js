//this file is the module, no need to make a "module object"
//menu multiplayer
//menu names
//menu rules
import { createPlayer } from './../../factories/createPlayer';

const menuMultiplayer = document.getElementById('menu-multiplayer');
const menuNames = document.getElementById('menu-names');
const menuRules = document.getElementById('menu-rules');

let multiplayer = false;

const hide = (menu) => {
  menu.style.display = 'none';
};

const show = (menu) => {
 menu.style.display = null;
};

export let playerOne, playerTwo;

//menu interaction events
export const menuEvents = (() => {
  const singlePlayerBtn = document.getElementById('single-player');
  const twoPlayerBtn = document.getElementById('two-player');
  
  const playerOneName = document.getElementById('player-one-name');
  // const playerTwoName = document.getElementById('player-two-name');
  const startBtn = document.getElementById('start');

  singlePlayerBtn.addEventListener('click',()=>{
    hide(menuMultiplayer);
    show(menuNames);
    multiplayer = false;
  });

  twoPlayerBtn.addEventListener('click',()=>{
    hide(menuMultiplayer);
    show(menuNames);
    multiplayer = true;
  });

  startBtn.addEventListener('click',()=>{
    //(should trigger on hitting enter also, not just click.)
    //create players with names

    // if(!multiplayer){
    //   playerTwo = 'computer';
    // };

    playerOne = createPlayer(playerOneName.value);
    playerTwo = createPlayer('computer', true);

    playerOneName.value = '';
    // playerTwoName.value = '';
    hide(menuNames);
  });
  
})();