import { setup } from '../../modules/gameStart';
import { playerOne, playerTwo } from '../../modules/gameStart';
import { createPlayerDisplay } from '../components/createPlayerDisplays';
import { placementPhase } from './grid';

const multiplayer = document.getElementById('multiplayer');
const names = document.getElementById('names');
const placement = document.getElementById('placement');
const rules = document.getElementById('rules');

const singlePlayerBtn = document.getElementById('single-player');
const twoPlayerBtn = document.getElementById('two-player');

const playerOneNameEl = document.getElementById('player-one-name');
// const playerTwoName = document.getElementById('player-two-name');
const startBtn = document.getElementById('start');
const doneBtn = document.getElementById('done-btn');

// let multiplayer = false;

const hide = (menu) => {
  menu.style.display = null;
};

const show = (menu) => {
  menu.style.display = 'block';
};

const getNames = () => {
  let playerOneName = playerOneNameEl.value;
  let playerTwoName = 'computer';
  // if(!multiplayer){
  //   playerTwo = 'computer';
  // };

  return [playerOneName, playerTwoName];
};

const done = () => {
  let grid = document.querySelector(`.grid-1`);
  let gridClone = grid.cloneNode(true);
  grid.replaceWith(gridClone);
  placementPhase(playerTwo,2);
  doneBtn.style.display = null;
};

const start = () => {
  let playerNames = getNames();
  let nameOne = playerNames[0];
  let nameTwo = playerNames[1]

  if(nameOne === '' || nameTwo === ''){
    return;
  };

  hide(names);
  show(placement);

  setup(nameOne,nameTwo);
  //Vmove theseV
  // createPlayerDisplay(playerOne,1);
  // createPlayerDisplay(playerTwo,2);

  playerOneNameEl.value = '';
  // playerTwoName.value = '';
};

//menu interaction events
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

  startBtn.addEventListener('click',()=>{
    start();
    // hide(names);
    // show(placement);
  });

  startBtn.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
      start();
      // hide(names);
      // show(placement);
    };
  });
  
  playerOneNameEl.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
      start();
      // hide(names);
      // show(placement);
    };
  });

  doneBtn.addEventListener('click',()=>{
    done();
  });
})();
