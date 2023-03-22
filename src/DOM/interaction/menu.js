//this file is the module, no need to make a "module object"
//menu multiplayer
//menu names
//menu rules
import { setup } from '../../modules/setup';
import { playerOne, playerTwo } from '../../modules/setup';
import { createPlayerDisplay } from '../components/createPlayerDisplays';

const menuMultiplayer = document.getElementById('menu-multiplayer');
const menuNames = document.getElementById('menu-names');
const menuRules = document.getElementById('menu-rules');

const singlePlayerBtn = document.getElementById('single-player');
const twoPlayerBtn = document.getElementById('two-player');

const playerOneNameEl = document.getElementById('player-one-name');
// const playerTwoName = document.getElementById('player-two-name');
const startBtn = document.getElementById('start');

// let multiplayer = false;

const hide = (menu) => {
  menu.style.display = 'none';
};

const show = (menu) => {
 menu.style.display = null;
};

const getNames = () => {
  let playerOne = playerOneNameEl.value;
  let playerTwo = 'computer';
  // if(!multiplayer){
  //   playerTwo = 'computer';
  // };

  return [playerOne, playerTwo];
};

//menu interaction events
export const menuEvents = (() => {

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
    let names = getNames();
    let nameOne = names[0];
    let nameTwo = names[1]

    if(nameOne === '' || nameTwo === ''){
      return;
    };

    setup(nameOne,nameTwo);
    createPlayerDisplay(playerOne,1);
    createPlayerDisplay(playerTwo,2);
    // console.log(playerOne.board.fleetCoordinates());
    // console.log(playerTwo.board.fleetCoordinates());
    playerOneNameEl.value = '';
    // playerTwoName.value = '';
    hide(menuNames);

  });
  
})();