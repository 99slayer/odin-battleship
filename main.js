/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM/components/createGrid.js":
/*!******************************************!*\
  !*** ./src/DOM/components/createGrid.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGrid": () => (/* binding */ createGrid)
/* harmony export */ });
const createGrid = (grid,gridNum) => {
  for(let i=0;i<11;i+=1){
    let row = i;
    let gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    gridRow.setAttribute('id',`grid-row-${i}`);
    gridRow.setAttribute('data-row-number',`${i}`);
    //PROBABLY DONT NEED ID AND DATA ATTRIBUTE, BUT I'LL COME BACK TO THIS.
    for(let i=0;i<11;i+=1){
      let currentRow = row
      let gridCell = document.createElement('div');
      gridCell.classList.add('grid-cell');
      gridCell.classList.add(`grid-cell-${gridNum}`);
      gridCell.setAttribute('id',`grid-cell-${i}-${row}`);
      gridCell.setAttribute('data-cell-coordinate',`${i}-${row}`);
      gridCell.style.border = '1px solid black';
      gridRow.appendChild(gridCell);
    };
    grid.appendChild(gridRow);
  };

  const labelRows = () => {
    const nodeList = [];
    let rows = grid.childNodes;

    rows.forEach((e)=>{
      nodeList.push(e.firstChild);
    });

    let i = 1;
    nodeList.forEach((e)=>{
      e.style.border = 'none';
      if(e.getAttribute('data-cell-coordinate') === '0-0'){
        return;
      };
      e.textContent = `${i}`;
      i += 1;
    });
  };

  const labelColumns = () => {
    const nodeList = grid.firstChild.childNodes;
    let i = 0
    nodeList.forEach((e)=>{
      e.style.border = 'none';
      const cellCoordinate = e.getAttribute('data-cell-coordinate');
      if(cellCoordinate === '0-0'){
        return;
      };
      e.textContent = `${String.fromCharCode(65 + i)}`;
      i += 1;
    });
  };

  labelRows();
  labelColumns();
};


/***/ }),

/***/ "./src/DOM/components/createPlayerDisplays.js":
/*!****************************************************!*\
  !*** ./src/DOM/components/createPlayerDisplays.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayerDisplay": () => (/* binding */ createPlayerDisplay)
/* harmony export */ });
const playerOneDisplay = document.getElementById('player-one-display');
const playerTwoDisplay = document.getElementById('player-two-display');

const createPlayerDisplay = (player, playerNum) => {
  const display = document.createElement('div');
  display.classList.add('display-cont');

  const playerNumDisplay = document.createElement('h1');
  playerNumDisplay.textContent = `PLAYER ${playerNum}`;
  const name = document.createElement('h3');
  name.textContent = `${player.getName()}`;

  const turn = document.createElement('p');
  turn.setAttribute('id',`turn-${playerNum}`);
  if(player.isTurn){
    turn.textContent = 'ATTACKING...';
  } else if (!player.isTurn){
    turn.textContent = 'WAITING...';
  };

  const ships = document.createElement('p');
  ships.setAttribute('id',`ships-${playerNum}`);
  ships.textContent = `Ships left: ${player.board.getShipsRemaining()}`;

  const wins = document.createElement('p');
  wins.setAttribute('id',`wins-${playerNum}`);
  wins.textContent = `Wins: ${player.getWins()}`;

  display.append(playerNumDisplay,name,turn,ships,wins);

  if(playerNum === 1){
    playerOneDisplay.append(display);
  } else if (playerNum === 2){
    playerTwoDisplay.append(display);
  };
};

//player#
//player name
//is turn
//current ships alive
//wins

/***/ }),

/***/ "./src/DOM/interaction/grid.js":
/*!*************************************!*\
  !*** ./src/DOM/interaction/grid.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gridEvents": () => (/* binding */ gridEvents),
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid)
/* harmony export */ });
/* harmony import */ var _modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/parseCellCoordinate */ "./src/modules/parseCellCoordinate.js");
/* harmony import */ var _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/gameStart */ "./src/modules/gameStart.js");
/* harmony import */ var _modules_turn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/turn */ "./src/modules/turn.js");




const getGridCoordinate = (cell) => {
  let coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cell.getAttribute('data-cell-coordinate'));
  return coord;
};

//stops players from interacting with grids when they shouldn't be
const gridLogic = (firstPlayer, secondPlayer, cell) => {
  let x;

  //stops function if its computers turn
  if(firstPlayer.isTurn&&firstPlayer.computer){
    x = true;
  } else if (secondPlayer.isTurn&&secondPlayer.computer){
    x = true;
  };

  //stops player from interacting with their own grid
  if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn&&cell.classList.contains('grid-cell-1')){
    x = true;
  } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn&&cell.classList.contains('grid-cell-2')){
    x = true;
  };

  return x;
};

//Checks if the cell is a label
const checkTier = (cell) =>{
  const cellID = cell.getAttribute('data-cell-coordinate');
  const coordinate = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cellID);

  if(coordinate[0]==='@'||(coordinate.length===2&&coordinate[1]==='0')){
    return true;
  };
};

const gridEvents = () => {
  const cells = document.querySelectorAll('.grid-cell');
  
  cells.forEach((node)=>{
    if(checkTier(node)){
      return;
    };

    //add turn listener
    node.addEventListener('click',(e)=>{
      let cell = e.target;
      let coord = getGridCoordinate(cell);

      if(gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo,cell)){
        return;
      };

      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo,coord);
      console.log(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.board);
    });

    //add hover cell visual
    node.addEventListener('mouseover',(e)=>{
      let cell = e.target;

      if(gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)){
        return;
      };

      cell.classList.add('grid-cell-hover');
    });

    //remove hover cell visual
    node.addEventListener('mouseleave',(e)=>{
      let cell = e.target;
      cell.classList.remove('grid-cell-hover');
    });

    //add and remove click cell visual
    node.addEventListener('mousedown',(e)=>{
      let cell = e.target;

      if(gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)){
        return;
      };

      cell.classList.add('grid-cell-mousedown');

      cell.onmouseup = () =>{
        cell.classList.remove('grid-cell-mousedown');
      };

      cell.onmouseleave = () =>{
        cell.classList.remove('grid-cell-mousedown');
      };
    });
  });
};

//temporarily rendering everything for testing/debugging purposes
const renderGrid = (cells,player) => {
  if(player.board.fleetCoordinates().length === 0){
    resetGrid(cells);
    return;
  };

  const fleet = player.board.fleetCoordinates();
  const arr = fleet.reduce((acc,val)=>acc.concat(val));

  cells.forEach((cell)=>{
    let coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cell.getAttribute('data-cell-coordinate'));
    if (arr.includes(coord)&&player.board.attacks.includes(coord)) {
      cell.textContent = '●';
    } else if (!(arr.includes(coord))&&player.board.attacks.includes(coord)) {
      cell.textContent = '/';
    } else if (arr.includes(coord)){
      cell.textContent = '○';
    };
  });
};

const resetGrid = (cells) => {
  cells.forEach((cell)=>{
    if(checkTier(cell)){
      return;
    };

    cell.textContent = null;
  });
};


/***/ }),

/***/ "./src/DOM/interaction/menu.js":
/*!*************************************!*\
  !*** ./src/DOM/interaction/menu.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuEvents": () => (/* binding */ menuEvents)
/* harmony export */ });
/* harmony import */ var _modules_gameStart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/gameStart */ "./src/modules/gameStart.js");
/* harmony import */ var _components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/createPlayerDisplays */ "./src/DOM/components/createPlayerDisplays.js");




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

const start = () => {
  let names = getNames();
  let nameOne = names[0];
  let nameTwo = names[1]

  if(nameOne === '' || nameTwo === ''){
    return;
  };

  (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.setup)(nameOne,nameTwo);
  (0,_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerOne,1);
  (0,_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo,2);

  playerOneNameEl.value = '';
  // playerTwoName.value = '';
  hide(menuNames);
};

//menu interaction events
const menuEvents = (() => {

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
    start();
  });

  startBtn.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
      start();
    };
  });
  
  playerOneNameEl.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
      start();
    };
  });
})();


/***/ }),

/***/ "./src/DOM/interaction/playerDisplays.js":
/*!***********************************************!*\
  !*** ./src/DOM/interaction/playerDisplays.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "highlight": () => (/* binding */ highlight),
/* harmony export */   "updateDisplays": () => (/* binding */ updateDisplays)
/* harmony export */ });
// const turn1 = document.getElementById('turn-1');
// const turn2 = document.getElementById('turn-2');

const highlight = (firstPlayer, secondPlayer) => {
  const playerOneDisplay = document.getElementById('player-one-display');
  const playerTwoDisplay = document.getElementById('player-two-display');

  if(firstPlayer.board.attacks.length === 0 &&secondPlayer.board.attacks.length === 0){
    if(firstPlayer.isTurn){
      playerOneDisplay.classList.add('current-player');
    } else if (secondPlayer.isTurn){
      playerTwoDisplay.classList.add('current-player');
    };
    return;
  };

  if(firstPlayer.isTurn){
    playerOneDisplay.classList.add('current-player');
    playerTwoDisplay.classList.remove('current-player');
  } else if (secondPlayer.isTurn){
    playerTwoDisplay.classList.add('current-player');
    playerOneDisplay.classList.remove('current-player');
  };
};

const updateDisplays = (firstPlayer, secondPlayer) => {
  updateTurn(firstPlayer, secondPlayer);
  updateShips(firstPlayer, secondPlayer);
  updateWins(firstPlayer, secondPlayer);
};

//NEED SOMETHING WHEN PLAYERS ARE WAITING FOR THE NEXT GAME
const updateTurn = (firstPlayer, secondPlayer) => {
  const turn1 = document.getElementById('turn-1');
  const turn2 = document.getElementById('turn-2');
  if(firstPlayer.isTurn){
    turn1.textContent = 'ATTACKING...';
    turn2.textContent = 'WAITING...';
  } else if (secondPlayer.isTurn){
    turn2.textContent = 'ATTACKING...';
    turn1.textContent = 'WAITING...';
  };
};

const updateShips = (firstPlayer, secondPlayer) => {
  const ships1 = document.getElementById('ships-1');
  const ships2 = document.getElementById('ships-2');
  ships1.textContent = `Ships left: ${firstPlayer.board.getShipsRemaining()}`;
  ships2.textContent = `Ships left: ${secondPlayer.board.getShipsRemaining()}`;
};

const updateWins = (firstPlayer, secondPlayer) => {
  const wins1 = document.getElementById('wins-1');
  const wins2 = document.getElementById('wins-2');
  wins1.textContent = `Wins: ${firstPlayer.getWins()}`;
  wins2.textContent = `Wins: ${secondPlayer.getWins()}`;
};


/***/ }),

/***/ "./src/factories/createGameboard.js":
/*!******************************************!*\
  !*** ./src/factories/createGameboard.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGameboard": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _createShip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createShip */ "./src/factories/createShip.js");


const createGameboard = () =>{
  const ships = [];
  const attacks = [];

  //USE FOR PLACE FLEET FUNCTION
  function OLDplace(axis,start,size){
    //X => horizontal + letters
    //Y => vertical + numbers
    if(!axis||!start||!size){
      console.log('parameter missing');
      return;
    };

    let startArr = start.split('');
    let x = startArr.slice(0,1);
    let y = startArr.slice(1).join('');

    //throws error if ships would be placed out of bounds
    //throws errors for now maybe change later**
    //THE COORDINATES CAN BE CHECKED BEFORE THEY ARE PASSED TO PLACE**
    if((x[0].charCodeAt(0)+size)>74){
      throw new Error('ship exceeds the x axis of the gameboard.');
    } else if ((parseInt(y)+size)>10){
      throw new Error('ship exceeds the y axis of the gameboard.');
    };

    //Check if placement coordinates conflict with any other ships

    function createCoordinates(shipAxis,shipSize){
      let coordinates = [];

      if(shipAxis === 'X'){
        //increment letters
        for(let i=0;i<shipSize;i+=1){
          let newX = String.fromCharCode(x[0].charCodeAt(0)+i);
          coordinates.push(`${newX + y}`);
        };
      } else if (shipAxis === 'Y'){
        //increment numbers
        for(let i=0;i<shipSize;i+=1){
          coordinates.push(`${x + (parseInt(y) + i)}`);
        };
      };

      return coordinates;
    };


    let ship = (0,_createShip__WEBPACK_IMPORTED_MODULE_0__.createShip)(createCoordinates(axis,size));
    ships.push(ship);
  }; //OLD PLACE FUNCTION, STILL USEFUL CODE IN HERE FOR LATER**

  const place = (coordinates) => {
    let newShip = (0,_createShip__WEBPACK_IMPORTED_MODULE_0__.createShip)(coordinates);
    ships.push(newShip);
    return newShip;
  }

  const receiveAttack = (target) => {
    if(attacks.includes(target)){
      return;
    };

    let shipIndex = ships.findIndex((ship)=>{ return ship.coordinates.includes(target)});

    if(shipIndex>-1){
      ships[shipIndex].hit();
    };

    attacks.push(target);
    // return if ship was hit/which ship was hit?
  };
  
  const fleetCoordinates = () =>{
    const arr = [];
    for(let i=0;i<ships.length;i+=1){
      arr.push(ships[i].coordinates);
    };

    return arr;
  };

  const getShipsRemaining = () => {
    let shipsSunk = 0;

    ships.forEach((ship)=>{
      if(ship.isSunk()){
        shipsSunk += 1;
      };
    });

    return ships.length - shipsSunk;
  };

  const isFleetSunk = () => {
    if(ships.every(ship => ship.isSunk())){
      return true;
    } else {
      return false;
    };
  };

  const reset = () => {
    const resetArray = (arr) => {
    const size = arr.length
    
      for(let i=0;i<size;i+=1){
        arr.pop();
      };
    };

    resetArray(ships);
    resetArray(attacks);
  };

  return { attacks, place, receiveAttack, fleetCoordinates, getShipsRemaining, isFleetSunk, reset };
};

/***/ }),

/***/ "./src/factories/createPlayer.js":
/*!***************************************!*\
  !*** ./src/factories/createPlayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer)
/* harmony export */ });
/* harmony import */ var _createGameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createGameboard */ "./src/factories/createGameboard.js");


const createPlayer = (playerName,isComp = false) =>{
  const name = playerName;
  const computer = isComp;
  const board = (0,_createGameboard__WEBPACK_IMPORTED_MODULE_0__.createGameboard)();
  let isTurn = false;
  let wins = 0;
  
  const makeAttack = (enemyBoard,coordinates = null) => {
    let target = coordinates;

    if(computer){
      target = generateAttack(enemyBoard);
    } else {
      console.log(`${name} attacks ${target}`);
    };

    //MAY NOT NEED
    if(enemyBoard.attacks.includes(target)){
      console.log('square has already been hit.');
      return;
    };

    enemyBoard.receiveAttack(target);
  };

  // const placeFleet = () => {

  // };
  
  const generateAttack = (enemyBoard,gen = 1) => {
    const generateCharCode = () => {
      return Math.floor(Math.random() * (74 - 65 + 1) ) + 65;
    };

    let letter = String.fromCharCode(generateCharCode());
    let number = Math.floor(Math.random() * 10 + 1);
    let target = letter + number;

    //checks if squares have already been hit
    if(enemyBoard.attacks.includes(target)){
      do{
        letter = String.fromCharCode(generateCharCode());
        number = Math.floor(Math.random() * 10 + 1);
        target = letter + number;
      }
      while (enemyBoard.attacks.includes(target));
    };
    console.log(`computer attacks ${target}`);
    return target;
  };

  const getName = () => {
    return name;
  };

  const won = () => {
    wins += 1;
  };

  const getWins = () => {
    return wins;
  };

  return { board, computer, isTurn, makeAttack, getName, won, getWins };
};


/***/ }),

/***/ "./src/factories/createShip.js":
/*!*************************************!*\
  !*** ./src/factories/createShip.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
const createShip = (coordinateArray) =>{
  let coordinates = coordinateArray;
  let length = coordinates.length;
  let damage = 0;

  const hit = () => {
    damage += 1;
  };

  const isSunk = () => {
    if(length === damage){
      return true;
    } else {
      return false;
    };
  };

  const getDamage = () => {
    return damage;
  };

  return { coordinates, hit, isSunk, getDamage };
};


/***/ }),

/***/ "./src/modules/gameLoop.js":
/*!*********************************!*\
  !*** ./src/modules/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/components/createGrid */ "./src/DOM/components/createGrid.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _DOM_interaction_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/interaction/menu */ "./src/DOM/interaction/menu.js");




//SET UP BASE GRID

const playerOneGrid = document.getElementById('player-one-grid');
const playerTwoGrid = document.getElementById('player-two-grid');

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid,1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid,2);
// gridEvents();

//DONT START LOOP UNTIL START BUTTON IS CLICKED

// while(!(playerOne.board.isFleetSunk())&&!(playerTwo.board.isFleetSunk())){
//   turn(playerOne,playerTwo,targetPromise);
//   renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
//   renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);
// };


//do game loop if facing a computer, but not if playing 2 player????****


//declare winner

//decide who goes first (player one goes first?)
//turn function

//FIGURE OUT TURNS NEXT

//V LOOP V
//alternate turns until there's a winner
//add win to that player
//loosing player gets to go first

//if implemented you should be able to restart a game or change the rules at anytime


/***/ }),

/***/ "./src/modules/gameReset.js":
/*!**********************************!*\
  !*** ./src/modules/gameReset.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameReset": () => (/* binding */ gameReset)
/* harmony export */ });
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");



const gameReset = (firstPlayer, secondPlayer) => {
  firstPlayer.board.reset();
  firstPlayer.isTurn = false;
  secondPlayer.board.reset();
  secondPlayer.isTurn = false;

  console.log(firstPlayer.board);
  console.log(secondPlayer.board);
};

// export const resetPlayers = (firstPlayer, secondPlayer) => {
//   firstPlayer.resetBoard();
//   secondPlayer.resetBoard();
// };

// export const resetDom = (firstPlayer, secondPlayer) => {
//   renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
//   renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
//   updateDisplays(firstPlayer,secondPlayer);
// }


/***/ }),

/***/ "./src/modules/gameStart.js":
/*!**********************************!*\
  !*** ./src/modules/gameStart.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerOne": () => (/* binding */ playerOne),
/* harmony export */   "playerTwo": () => (/* binding */ playerTwo),
/* harmony export */   "setup": () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var _factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/createPlayer */ "./src/factories/createPlayer.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");






let playerOne,playerTwo;

const setup = (nameOne, nameTwo) => {
  if(!playerOne||!playerTwo){
    let x = false;

    if(nameTwo === 'computer'){
      x = true;
    };
    
    playerOne = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameOne);
    playerTwo = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameTwo,x);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.gridEvents)();
  };

  //temporary placement setup
  playerOne.board.place(['A2','A3','A4']);
  // playerOne.board.place(['E3','F3','G3']);
  // playerOne.board.place(['A1','B1','C1','D1']);
  // playerOne.board.place(['C10','D10','E10','F10']);

  playerTwo.board.place(['A4','B4','C4']);
  // playerTwo.board.place(['A5','A6','A7']);
  // playerTwo.board.place(['E5','F5','G5','H5']);
  // playerTwo.board.place(['E6','E7','E8','E9']);

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),playerTwo);

  (0,_turn__WEBPACK_IMPORTED_MODULE_2__.firstTurn)(playerOne,playerTwo);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.highlight)(playerOne,playerTwo);

  let computerPlayer;

  if(playerOne.computer){
    computerPlayer = playerOne;
  } else if (playerTwo.computer){
    computerPlayer = playerTwo;
  };
  
  if(computerPlayer.isTurn){
    (0,_turn__WEBPACK_IMPORTED_MODULE_2__.compTurn)(playerOne,playerTwo);
    // setTimeout(() => {
    //   if(playerOne.isTurn&&playerOne.computer){
    //     playerOne.makeAttack(playerTwo.board);
    //   } else if (playerTwo.isTurn&&playerTwo.computer){
    //     playerTwo.makeAttack(playerOne.board);
    //   };

    //   changeTurn(playerOne,playerTwo);
    //   highlight(playerOne,playerTwo);
    //   renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
    //   renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);
    //   updateDisplays(playerOne,playerTwo);
    // }, 2000);
  };
};


/***/ }),

/***/ "./src/modules/parseCellCoordinate.js":
/*!********************************************!*\
  !*** ./src/modules/parseCellCoordinate.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseCellCoordinate": () => (/* binding */ parseCellCoordinate)
/* harmony export */ });
//input cell element data attribute
//output attack coordinates
const parseCellCoordinate = (attribute) => {
  if(typeof attribute !== 'string'){
    return;
  };

  let arr = attribute.split('');

  const getLetter = (array) => {
    let letterValue;

    if(!(isNaN(parseInt(array[1])))){
      let twoDigit = array.slice(0,2);
      letterValue = twoDigit.join('');
    } else {
      letterValue = array[0];
    };

    let codeValue = parseInt(letterValue);
    let letter = String.fromCharCode((65 + codeValue) - 1);
    // console.log(letter);
    return letter;
  };

  const getNumber = (array) => {
    let number;
    if(!(isNaN(parseInt(array[array.length-2])))){
      let twoDigit = array.slice(array.length-2);
      number = twoDigit.join('');
    } else {
      number = array[array.length-1];
    };
    // console.log(number);
    return number;
  };

  let letter = getLetter(arr);
  let number = getNumber(arr);
  // console.log(letter + number);
  return letter + number;
};


/***/ }),

/***/ "./src/modules/turn.js":
/*!*****************************!*\
  !*** ./src/modules/turn.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTurn": () => (/* binding */ changeTurn),
/* harmony export */   "compTurn": () => (/* binding */ compTurn),
/* harmony export */   "firstTurn": () => (/* binding */ firstTurn),
/* harmony export */   "turn": () => (/* binding */ turn)
/* harmony export */ });
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _wins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wins */ "./src/modules/wins.js");
/* harmony import */ var _gameReset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameReset */ "./src/modules/gameReset.js");
/* harmony import */ var _gameStart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameStart */ "./src/modules/gameStart.js");






const firstTurn = (firstPlayer, secondPlayer) => {
  let number = Math.floor((Math.random() * 10) + 1);

  if(number%2 === 0){
    firstPlayer.isTurn = true;
    console.log(`${firstPlayer.getName()} GOES FIRST.`);
  } else if (number%2 !== 0){
    secondPlayer.isTurn = true;
    console.log(`${secondPlayer.getName()} GOES FIRST.`);
  };
};

const changeTurn = (firstPlayer, secondPlayer) => {
  if(firstPlayer.isTurn){
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
    console.log(`IT IS NOW ${secondPlayer.getName()}s TURN.`);
  } else if (secondPlayer.isTurn){
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
    console.log(`IT IS NOW ${firstPlayer.getName()}s TURN.`);
  };
};

const turn = (firstPlayer, secondPlayer, target) => {
  if(firstPlayer.isTurn){
    if(secondPlayer.board.attacks.includes(target)){
      return;
    } else {
      firstPlayer.makeAttack(secondPlayer.board,target);
    };
  } else if (secondPlayer.isTurn){
    if(firstPlayer.board.attacks.includes(target)){
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board,target);
    };
  };

  //DO I NEED TO KNOW WHO WON HERE?
  //FOR FIRST TURN?
  if((0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'first'){
    turnWon(firstPlayer,secondPlayer);
    // gameReset(firstPlayer,secondPlayer);
    // renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    // renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    // setup();
    // updateDisplays(firstPlayer,secondPlayer);
    //bring up menu
    return;
  } else if ((0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'second'){
    turnWon(firstPlayer,secondPlayer);
    // gameReset(firstPlayer,secondPlayer);
    // renderGrid(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    // renderGrid(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    // setup();
    // updateDisplays(firstPlayer,secondPlayer);
    //bring up menu
    return;
  };

  changeTurn(firstPlayer,secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);

  compTurn(firstPlayer, secondPlayer);
};

const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    if(firstPlayer.computer){
      firstPlayer.makeAttack(secondPlayer.board);
    } else if (secondPlayer.computer){
      secondPlayer.makeAttack(firstPlayer.board);
    };

    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    // checkWin(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);

    if((0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'first'){
      turnWon(firstPlayer,secondPlayer);
    } else if ((0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'second'){
      turnWon(firstPlayer,secondPlayer);
    };
    
    //SET UP COMPUTER WIN SCENARIO
  }, 1000);
};

const turnWon = (firstPlayer, secondPlayer) => {
  (0,_gameReset__WEBPACK_IMPORTED_MODULE_3__.gameReset)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_gameStart__WEBPACK_IMPORTED_MODULE_4__.setup)();
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
  //bring up menu
};


/***/ }),

/***/ "./src/modules/wins.js":
/*!*****************************!*\
  !*** ./src/modules/wins.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkWin": () => (/* binding */ checkWin)
/* harmony export */ });
/* harmony import */ var _gameReset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameReset */ "./src/modules/gameReset.js");


const checkWin = (firstPlayer, secondPlayer) => {
  let firstFleet = firstPlayer.board.isFleetSunk();
  let secondFleet = secondPlayer.board.isFleetSunk();
  // let x = false;

  if(secondFleet){
    firstPlayer.won();
    return 'first';
    // x = true;
    // gameReset(firstPlayer, secondPlayer);
  } else if (firstFleet){
    secondPlayer.won();
    return 'second';
    // x = true;
    // gameReset(firstPlayer, secondPlayer);
  };
  // return x
  //return bool game reset in turn 
  //return bool or player??
};

// const logWins = (firstPlayer, secondPlayer) => {
//   console.log(`player1 wins: ${firstPlayer.getWins()}`);
//   console.log(`player2 wins: ${secondPlayer.getWins()}`);
// };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_gameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameLoop */ "./src/modules/gameLoop.js");
console.log('check check')
;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0Msc0JBQXNCO0FBQ3hELGtDQUFrQyx1QkFBdUI7QUFDekQ7Ozs7Ozs7VUMxQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0EsQ0FBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9ncmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vbWVudS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlR2FtZWJvYXJkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlUGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlU2hpcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lUmVzZXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVN0YXJ0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdHVybi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy93aW5zLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY3JlYXRlR3JpZCA9IChncmlkLGdyaWROdW0pID0+IHtcbiAgZm9yKGxldCBpPTA7aTwxMTtpKz0xKXtcbiAgICBsZXQgcm93ID0gaTtcbiAgICBsZXQgZ3JpZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyaWRSb3cuY2xhc3NMaXN0LmFkZCgnZ3JpZC1yb3cnKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZSgnaWQnLGBncmlkLXJvdy0ke2l9YCk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LW51bWJlcicsYCR7aX1gKTtcbiAgICAvL1BST0JBQkxZIERPTlQgTkVFRCBJRCBBTkQgREFUQSBBVFRSSUJVVEUsIEJVVCBJJ0xMIENPTUUgQkFDSyBUTyBUSElTLlxuICAgIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgICBsZXQgY3VycmVudFJvdyA9IHJvd1xuICAgICAgbGV0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1jZWxsLSR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyxgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICAgICAgZ3JpZFJvdy5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG4gICAgfTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsUm93cyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IFtdO1xuICAgIGxldCByb3dzID0gZ3JpZC5jaGlsZE5vZGVzO1xuXG4gICAgcm93cy5mb3JFYWNoKChlKT0+e1xuICAgICAgbm9kZUxpc3QucHVzaChlLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuXG4gICAgbGV0IGkgPSAxO1xuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGlmKGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpID09PSAnMC0wJyl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7aX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IGdyaWQuZmlyc3RDaGlsZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMFxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGNvbnN0IGNlbGxDb29yZGluYXRlID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gICAgICBpZihjZWxsQ29vcmRpbmF0ZSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGxhYmVsUm93cygpO1xuICBsYWJlbENvbHVtbnMoKTtcbn07XG4iLCJjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktY29udCcpO1xuXG4gIGNvbnN0IHBsYXllck51bURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgbmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllci5nZXROYW1lKCl9YDtcblxuICBjb25zdCB0dXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB0dXJuLnNldEF0dHJpYnV0ZSgnaWQnLGB0dXJuLSR7cGxheWVyTnVtfWApO1xuICBpZihwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG5cbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNoaXBzLnNldEF0dHJpYnV0ZSgnaWQnLGBzaGlwcy0ke3BsYXllck51bX1gKTtcbiAgc2hpcHMudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtwbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuXG4gIGNvbnN0IHdpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHdpbnMuc2V0QXR0cmlidXRlKCdpZCcsYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSxuYW1lLHR1cm4sc2hpcHMsd2lucyk7XG5cbiAgaWYocGxheWVyTnVtID09PSAxKXtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpe1xuICAgIHBsYXllclR3b0Rpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9O1xufTtcblxuLy9wbGF5ZXIjXG4vL3BsYXllciBuYW1lXG4vL2lzIHR1cm5cbi8vY3VycmVudCBzaGlwcyBhbGl2ZVxuLy93aW5zIiwiaW1wb3J0IHsgcGFyc2VDZWxsQ29vcmRpbmF0ZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGVcIjtcbmltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyB0dXJuIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvdHVyblwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICByZXR1cm4gY29vcmQ7XG59O1xuXG4vL3N0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybiYmZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4mJnNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgLy9zdG9wcyBwbGF5ZXIgZnJvbSBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIG93biBncmlkXG4gIGlmKHBsYXllck9uZS5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMScpKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTInKSl7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vL0NoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT57XG4gIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmKGNvb3JkaW5hdGVbMF09PT0nQCd8fChjb29yZGluYXRlLmxlbmd0aD09PTImJmNvb3JkaW5hdGVbMV09PT0nMCcpKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwnKTtcbiAgXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLy9hZGQgdHVybiBsaXN0ZW5lclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLHBsYXllclR3byxjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byxjb29yZCk7XG4gICAgICBjb25zb2xlLmxvZyhwbGF5ZXJPbmUuYm9hcmQpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vcmVtb3ZlIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1ob3ZlcicpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgYW5kIHJlbW92ZSBjbGljayBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbC1tb3VzZWRvd24nKTtcblxuICAgICAgY2VsbC5vbm1vdXNldXAgPSAoKSA9PntcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG4gICAgICB9O1xuXG4gICAgICBjZWxsLm9ubW91c2VsZWF2ZSA9ICgpID0+e1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1tb3VzZWRvd24nKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy90ZW1wb3JhcmlseSByZW5kZXJpbmcgZXZlcnl0aGluZyBmb3IgdGVzdGluZy9kZWJ1Z2dpbmcgcHVycG9zZXNcbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKGNlbGxzLHBsYXllcikgPT4ge1xuICBpZihwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCl7XG4gICAgcmVzZXRHcmlkKGNlbGxzKTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBhcnIgPSBmbGVldC5yZWR1Y2UoKGFjYyx2YWwpPT5hY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gICAgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil48nO1xuICAgIH0gZWxzZSBpZiAoIShhcnIuaW5jbHVkZXMoY29vcmQpKSYmcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJy8nO1xuICAgIH0gZWxzZSBpZiAoYXJyLmluY2x1ZGVzKGNvb3JkKSl7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXiyc7XG4gICAgfTtcbiAgfSk7XG59O1xuXG5jb25zdCByZXNldEdyaWQgPSAoY2VsbHMpID0+IHtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCk9PntcbiAgICBpZihjaGVja1RpZXIoY2VsbCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzJztcblxuY29uc3QgbWVudU11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtbXVsdGlwbGF5ZXInKTtcbmNvbnN0IG1lbnVOYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LW5hbWVzJyk7XG5jb25zdCBtZW51UnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1ydWxlcycpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLXBsYXllcicpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3by1wbGF5ZXInKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtbmFtZScpO1xuLy8gY29uc3QgcGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XG5cbi8vIGxldCBtdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKG1lbnUpID0+IHtcbiAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxuY29uc3Qgc2hvdyA9IChtZW51KSA9PiB7XG4gbWVudS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbn07XG5cbmNvbnN0IGdldE5hbWVzID0gKCkgPT4ge1xuICBsZXQgcGxheWVyT25lID0gcGxheWVyT25lTmFtZUVsLnZhbHVlO1xuICBsZXQgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gaWYoIW11bHRpcGxheWVyKXtcbiAgLy8gICBwbGF5ZXJUd28gPSAnY29tcHV0ZXInO1xuICAvLyB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lLCBwbGF5ZXJUd29dO1xufTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gIGxldCBuYW1lcyA9IGdldE5hbWVzKCk7XG4gIGxldCBuYW1lT25lID0gbmFtZXNbMF07XG4gIGxldCBuYW1lVHdvID0gbmFtZXNbMV1cblxuICBpZihuYW1lT25lID09PSAnJyB8fCBuYW1lVHdvID09PSAnJyl7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIHNldHVwKG5hbWVPbmUsbmFtZVR3byk7XG4gIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLDEpO1xuICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywyKTtcblxuICBwbGF5ZXJPbmVOYW1lRWwudmFsdWUgPSAnJztcbiAgLy8gcGxheWVyVHdvTmFtZS52YWx1ZSA9ICcnO1xuICBoaWRlKG1lbnVOYW1lcyk7XG59O1xuXG4vL21lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG5cbiAgc2luZ2xlUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGhpZGUobWVudU11bHRpcGxheWVyKTtcbiAgICBzaG93KG1lbnVOYW1lcyk7XG4gICAgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcbiAgfSk7XG5cbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGhpZGUobWVudU11bHRpcGxheWVyKTtcbiAgICBzaG93KG1lbnVOYW1lcyk7XG4gICAgbXVsdGlwbGF5ZXIgPSB0cnVlO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBzdGFydCgpO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbiAgXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvLyBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbi8vIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMicpO1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuICBpZihmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJnNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIH07XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXBsYXllcicpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG4vL05FRUQgU09NRVRISU5HIFdIRU4gUExBWUVSUyBBUkUgV0FJVElORyBGT1IgVEhFIE5FWFQgR0FNRVxuY29uc3QgdXBkYXRlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMScpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0xJyk7XG4gIGNvbnN0IHNoaXBzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0yJyk7XG4gIHNoaXBzMS50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke2ZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgc2hpcHMyLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7c2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbn07XG5cbmNvbnN0IHVwZGF0ZVdpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB3aW5zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5zLTEnKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0yJyk7XG4gIHdpbnMxLnRleHRDb250ZW50ID0gYFdpbnM6ICR7Zmlyc3RQbGF5ZXIuZ2V0V2lucygpfWA7XG4gIHdpbnMyLnRleHRDb250ZW50ID0gYFdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9jcmVhdGVTaGlwXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PntcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIC8vVVNFIEZPUiBQTEFDRSBGTEVFVCBGVU5DVElPTlxuICBmdW5jdGlvbiBPTERwbGFjZShheGlzLHN0YXJ0LHNpemUpe1xuICAgIC8vWCA9PiBob3Jpem9udGFsICsgbGV0dGVyc1xuICAgIC8vWSA9PiB2ZXJ0aWNhbCArIG51bWJlcnNcbiAgICBpZighYXhpc3x8IXN0YXJ0fHwhc2l6ZSl7XG4gICAgICBjb25zb2xlLmxvZygncGFyYW1ldGVyIG1pc3NpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoJycpO1xuICAgIGxldCB4ID0gc3RhcnRBcnIuc2xpY2UoMCwxKTtcbiAgICBsZXQgeSA9IHN0YXJ0QXJyLnNsaWNlKDEpLmpvaW4oJycpO1xuXG4gICAgLy90aHJvd3MgZXJyb3IgaWYgc2hpcHMgd291bGQgYmUgcGxhY2VkIG91dCBvZiBib3VuZHNcbiAgICAvL3Rocm93cyBlcnJvcnMgZm9yIG5vdyBtYXliZSBjaGFuZ2UgbGF0ZXIqKlxuICAgIC8vVEhFIENPT1JESU5BVEVTIENBTiBCRSBDSEVDS0VEIEJFRk9SRSBUSEVZIEFSRSBQQVNTRUQgVE8gUExBQ0UqKlxuICAgIGlmKCh4WzBdLmNoYXJDb2RlQXQoMCkrc2l6ZSk+NzQpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaGlwIGV4Y2VlZHMgdGhlIHggYXhpcyBvZiB0aGUgZ2FtZWJvYXJkLicpO1xuICAgIH0gZWxzZSBpZiAoKHBhcnNlSW50KHkpK3NpemUpPjEwKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB5IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9O1xuXG4gICAgLy9DaGVjayBpZiBwbGFjZW1lbnQgY29vcmRpbmF0ZXMgY29uZmxpY3Qgd2l0aCBhbnkgb3RoZXIgc2hpcHNcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvb3JkaW5hdGVzKHNoaXBBeGlzLHNoaXBTaXplKXtcbiAgICAgIGxldCBjb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICBpZihzaGlwQXhpcyA9PT0gJ1gnKXtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGV0dGVyc1xuICAgICAgICBmb3IobGV0IGk9MDtpPHNoaXBTaXplO2krPTEpe1xuICAgICAgICAgIGxldCBuZXdYID0gU3RyaW5nLmZyb21DaGFyQ29kZSh4WzBdLmNoYXJDb2RlQXQoMCkraSk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHtuZXdYICsgeX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2hpcEF4aXMgPT09ICdZJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IG51bWJlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGAke3ggKyAocGFyc2VJbnQoeSkgKyBpKX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgICB9O1xuXG5cbiAgICBsZXQgc2hpcCA9IGNyZWF0ZVNoaXAoY3JlYXRlQ29vcmRpbmF0ZXMoYXhpcyxzaXplKSk7XG4gICAgc2hpcHMucHVzaChzaGlwKTtcbiAgfTsgLy9PTEQgUExBQ0UgRlVOQ1RJT04sIFNUSUxMIFVTRUZVTCBDT0RFIElOIEhFUkUgRk9SIExBVEVSKipcblxuICBjb25zdCBwbGFjZSA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYoYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHNoaXBJbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCk9PnsgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXModGFyZ2V0KX0pO1xuXG4gICAgaWYoc2hpcEluZGV4Pi0xKXtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfTtcblxuICAgIGF0dGFja3MucHVzaCh0YXJnZXQpO1xuICAgIC8vIHJldHVybiBpZiBzaGlwIHdhcyBoaXQvd2hpY2ggc2hpcCB3YXMgaGl0P1xuICB9O1xuICBcbiAgY29uc3QgZmxlZXRDb29yZGluYXRlcyA9ICgpID0+e1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvcihsZXQgaT0wO2k8c2hpcHMubGVuZ3RoO2krPTEpe1xuICAgICAgYXJyLnB1c2goc2hpcHNbaV0uY29vcmRpbmF0ZXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzUmVtYWluaW5nID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgIGlmKHNoaXAuaXNTdW5rKCkpe1xuICAgICAgICBzaGlwc1N1bmsgKz0gMTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2hpcHMubGVuZ3RoIC0gc2hpcHNTdW5rO1xuICB9O1xuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4ge1xuICAgIGlmKHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSkpe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc2V0QXJyYXkgPSAoYXJyKSA9PiB7XG4gICAgY29uc3Qgc2l6ZSA9IGFyci5sZW5ndGhcbiAgICBcbiAgICAgIGZvcihsZXQgaT0wO2k8c2l6ZTtpKz0xKXtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmVzZXRBcnJheShzaGlwcyk7XG4gICAgcmVzZXRBcnJheShhdHRhY2tzKTtcbiAgfTtcblxuICByZXR1cm4geyBhdHRhY2tzLCBwbGFjZSwgcmVjZWl2ZUF0dGFjaywgZmxlZXRDb29yZGluYXRlcywgZ2V0U2hpcHNSZW1haW5pbmcsIGlzRmxlZXRTdW5rLCByZXNldCB9O1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLGlzQ29tcCA9IGZhbHNlKSA9PntcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBsZXQgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcbiAgXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCxjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZihjb21wdXRlcil7XG4gICAgICB0YXJnZXQgPSBnZW5lcmF0ZUF0dGFjayhlbmVteUJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gYXR0YWNrcyAke3RhcmdldH1gKTtcbiAgICB9O1xuXG4gICAgLy9NQVkgTk9UIE5FRURcbiAgICBpZihlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICBjb25zb2xlLmxvZygnc3F1YXJlIGhhcyBhbHJlYWR5IGJlZW4gaGl0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgfTtcblxuICAvLyBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuXG4gIC8vIH07XG4gIFxuICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9IChlbmVteUJvYXJkLGdlbiA9IDEpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkgKSArIDY1O1xuICAgIH07XG5cbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgIGxldCB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG5cbiAgICAvL2NoZWNrcyBpZiBzcXVhcmVzIGhhdmUgYWxyZWFkeSBiZWVuIGhpdFxuICAgIGlmKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIGRve1xuICAgICAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhgY29tcHV0ZXIgYXR0YWNrcyAke3RhcmdldH1gKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3Qgd29uID0gKCkgPT4ge1xuICAgIHdpbnMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCB3b24sIGdldFdpbnMgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlQXJyYXkpID0+e1xuICBsZXQgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQXJyYXk7XG4gIGxldCBsZW5ndGggPSBjb29yZGluYXRlcy5sZW5ndGg7XG4gIGxldCBkYW1hZ2UgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBkYW1hZ2UgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYobGVuZ3RoID09PSBkYW1hZ2Upe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGdldERhbWFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gZGFtYWdlO1xuICB9O1xuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBoaXQsIGlzU3VuaywgZ2V0RGFtYWdlIH07XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkXCJcbmltcG9ydCB7IGdyaWRFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IG1lbnVFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcblxuLy9TRVQgVVAgQkFTRSBHUklEXG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1ncmlkJyk7XG5jb25zdCBwbGF5ZXJUd29HcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZ3JpZCcpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsMSk7XG5jcmVhdGVHcmlkKHBsYXllclR3b0dyaWQsMik7XG4vLyBncmlkRXZlbnRzKCk7XG5cbi8vRE9OVCBTVEFSVCBMT09QIFVOVElMIFNUQVJUIEJVVFRPTiBJUyBDTElDS0VEXG5cbi8vIHdoaWxlKCEocGxheWVyT25lLmJvYXJkLmlzRmxlZXRTdW5rKCkpJiYhKHBsYXllclR3by5ib2FyZC5pc0ZsZWV0U3VuaygpKSl7XG4vLyAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byx0YXJnZXRQcm9taXNlKTtcbi8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxwbGF5ZXJPbmUpO1xuLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG4vLyB9O1xuXG5cbi8vZG8gZ2FtZSBsb29wIGlmIGZhY2luZyBhIGNvbXB1dGVyLCBidXQgbm90IGlmIHBsYXlpbmcgMiBwbGF5ZXI/Pz8/KioqKlxuXG5cbi8vZGVjbGFyZSB3aW5uZXJcblxuLy9kZWNpZGUgd2hvIGdvZXMgZmlyc3QgKHBsYXllciBvbmUgZ29lcyBmaXJzdD8pXG4vL3R1cm4gZnVuY3Rpb25cblxuLy9GSUdVUkUgT1VUIFRVUk5TIE5FWFRcblxuLy9WIExPT1AgVlxuLy9hbHRlcm5hdGUgdHVybnMgdW50aWwgdGhlcmUncyBhIHdpbm5lclxuLy9hZGQgd2luIHRvIHRoYXQgcGxheWVyXG4vL2xvb3NpbmcgcGxheWVyIGdldHMgdG8gZ28gZmlyc3RcblxuLy9pZiBpbXBsZW1lbnRlZCB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gcmVzdGFydCBhIGdhbWUgb3IgY2hhbmdlIHRoZSBydWxlcyBhdCBhbnl0aW1lXG4iLCJpbXBvcnQgeyB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQsIHJlc2V0R3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuXG5leHBvcnQgY29uc3QgZ2FtZVJlc2V0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgZmlyc3RQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gIHNlY29uZFBsYXllci5ib2FyZC5yZXNldCgpO1xuICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG5cbiAgY29uc29sZS5sb2coZmlyc3RQbGF5ZXIuYm9hcmQpO1xuICBjb25zb2xlLmxvZyhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xufTtcblxuLy8gZXhwb3J0IGNvbnN0IHJlc2V0UGxheWVycyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4vLyAgIGZpcnN0UGxheWVyLnJlc2V0Qm9hcmQoKTtcbi8vICAgc2Vjb25kUGxheWVyLnJlc2V0Qm9hcmQoKTtcbi8vIH07XG5cbi8vIGV4cG9ydCBjb25zdCByZXNldERvbSA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4vLyAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4vLyAgIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4vLyB9XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgZ3JpZEV2ZW50cywgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjaGFuZ2VUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuaW1wb3J0IHsgaGlnaGxpZ2h0LCB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IGNvbXBUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuXG5leHBvcnQgbGV0IHBsYXllck9uZSxwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChuYW1lT25lLCBuYW1lVHdvKSA9PiB7XG4gIGlmKCFwbGF5ZXJPbmV8fCFwbGF5ZXJUd28pe1xuICAgIGxldCB4ID0gZmFsc2U7XG5cbiAgICBpZihuYW1lVHdvID09PSAnY29tcHV0ZXInKXtcbiAgICAgIHggPSB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgcGxheWVyT25lID0gY3JlYXRlUGxheWVyKG5hbWVPbmUpO1xuICAgIHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihuYW1lVHdvLHgpO1xuICAgIGdyaWRFdmVudHMoKTtcbiAgfTtcblxuICAvL3RlbXBvcmFyeSBwbGFjZW1lbnQgc2V0dXBcbiAgcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQTInLCdBMycsJ0E0J10pO1xuICAvLyBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydFMycsJ0YzJywnRzMnXSk7XG4gIC8vIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0ExJywnQjEnLCdDMScsJ0QxJ10pO1xuICAvLyBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydDMTAnLCdEMTAnLCdFMTAnLCdGMTAnXSk7XG5cbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnQTQnLCdCNCcsJ0M0J10pO1xuICAvLyBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydBNScsJ0E2JywnQTcnXSk7XG4gIC8vIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0U1JywnRjUnLCdHNScsJ0g1J10pO1xuICAvLyBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydFNicsJ0U3JywnRTgnLCdFOSddKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcblxuICBmaXJzdFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcblxuICBsZXQgY29tcHV0ZXJQbGF5ZXI7XG5cbiAgaWYocGxheWVyT25lLmNvbXB1dGVyKXtcbiAgICBjb21wdXRlclBsYXllciA9IHBsYXllck9uZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uY29tcHV0ZXIpe1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyVHdvO1xuICB9O1xuICBcbiAgaWYoY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKXtcbiAgICBjb21wVHVybihwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgIGlmKHBsYXllck9uZS5pc1R1cm4mJnBsYXllck9uZS5jb21wdXRlcil7XG4gICAgLy8gICAgIHBsYXllck9uZS5tYWtlQXR0YWNrKHBsYXllclR3by5ib2FyZCk7XG4gICAgLy8gICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJnBsYXllclR3by5jb21wdXRlcil7XG4gICAgLy8gICAgIHBsYXllclR3by5tYWtlQXR0YWNrKHBsYXllck9uZS5ib2FyZCk7XG4gICAgLy8gICB9O1xuXG4gICAgLy8gICBjaGFuZ2VUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIC8vICAgaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIC8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxwbGF5ZXJPbmUpO1xuICAgIC8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuICAgIC8vICAgdXBkYXRlRGlzcGxheXMocGxheWVyT25lLHBsYXllclR3byk7XG4gICAgLy8gfSwgMjAwMCk7XG4gIH07XG59O1xuIiwiLy9pbnB1dCBjZWxsIGVsZW1lbnQgZGF0YSBhdHRyaWJ1dGVcbi8vb3V0cHV0IGF0dGFjayBjb29yZGluYXRlc1xuZXhwb3J0IGNvbnN0IHBhcnNlQ2VsbENvb3JkaW5hdGUgPSAoYXR0cmlidXRlKSA9PiB7XG4gIGlmKHR5cGVvZiBhdHRyaWJ1dGUgIT09ICdzdHJpbmcnKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgbGV0IGFyciA9IGF0dHJpYnV0ZS5zcGxpdCgnJyk7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYoIShpc05hTihwYXJzZUludChhcnJheVsxXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZSgwLDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0dGVyVmFsdWUgPSBhcnJheVswXTtcbiAgICB9O1xuXG4gICAgbGV0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgoNjUgKyBjb2RlVmFsdWUpIC0gMSk7XG4gICAgLy8gY29uc29sZS5sb2cobGV0dGVyKTtcbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYoIShpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGgtMl0pKSkpe1xuICAgICAgbGV0IHR3b0RpZ2l0ID0gYXJyYXkuc2xpY2UoYXJyYXkubGVuZ3RoLTIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciA9IGFycmF5W2FycmF5Lmxlbmd0aC0xXTtcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKG51bWJlcik7XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBsZXQgbGV0dGVyID0gZ2V0TGV0dGVyKGFycik7XG4gIGxldCBudW1iZXIgPSBnZXROdW1iZXIoYXJyKTtcbiAgLy8gY29uc29sZS5sb2cobGV0dGVyICsgbnVtYmVyKTtcbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQsIHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi93aW5zXCI7XG5pbXBvcnQgeyBnYW1lUmVzZXQgfSBmcm9tIFwiLi9nYW1lUmVzZXRcIjtcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5cbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEpO1xuXG4gIGlmKG51bWJlciUyID09PSAwKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfSBlbHNlIGlmIChudW1iZXIlMiAhPT0gMCl7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coYElUIElTIE5PVyAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBpZihzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsdGFyZ2V0KTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGlmKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLHRhcmdldCk7XG4gICAgfTtcbiAgfTtcblxuICAvL0RPIEkgTkVFRCBUTyBLTk9XIFdITyBXT04gSEVSRT9cbiAgLy9GT1IgRklSU1QgVFVSTj9cbiAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ2ZpcnN0Jyl7XG4gICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIC8vIGdhbWVSZXNldChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIC8vIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICAgIC8vIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgICAvLyBzZXR1cCgpO1xuICAgIC8vIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgLy9icmluZyB1cCBtZW51XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcikgPT09ICdzZWNvbmQnKXtcbiAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgLy8gZ2FtZVJlc2V0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgLy8gcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gICAgLy8gcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICAgIC8vIHNldHVwKCk7XG4gICAgLy8gdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICAvL2JyaW5nIHVwIG1lbnVcbiAgICByZXR1cm47XG4gIH07XG5cbiAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcblxuICBjb21wVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmKGZpcnN0UGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCk7XG4gICAgfTtcblxuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gICAgLy8gY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuXG4gICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ2ZpcnN0Jyl7XG4gICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgfSBlbHNlIGlmIChjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnc2Vjb25kJyl7XG4gICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgfTtcbiAgICBcbiAgICAvL1NFVCBVUCBDT01QVVRFUiBXSU4gU0NFTkFSSU9cbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCB0dXJuV29uID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgZ2FtZVJlc2V0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIHNldHVwKCk7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIC8vYnJpbmcgdXAgbWVudVxufTtcbiIsImltcG9ydCB7IGdhbWVSZXNldCB9IGZyb20gXCIuL2dhbWVSZXNldFwiO1xuXG5leHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgZmlyc3RGbGVldCA9IGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCk7XG4gIGxldCBzZWNvbmRGbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpO1xuICAvLyBsZXQgeCA9IGZhbHNlO1xuXG4gIGlmKHNlY29uZEZsZWV0KXtcbiAgICBmaXJzdFBsYXllci53b24oKTtcbiAgICByZXR1cm4gJ2ZpcnN0JztcbiAgICAvLyB4ID0gdHJ1ZTtcbiAgICAvLyBnYW1lUmVzZXQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH0gZWxzZSBpZiAoZmlyc3RGbGVldCl7XG4gICAgc2Vjb25kUGxheWVyLndvbigpO1xuICAgIHJldHVybiAnc2Vjb25kJztcbiAgICAvLyB4ID0gdHJ1ZTtcbiAgICAvLyBnYW1lUmVzZXQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG4gIC8vIHJldHVybiB4XG4gIC8vcmV0dXJuIGJvb2wgZ2FtZSByZXNldCBpbiB0dXJuIFxuICAvL3JldHVybiBib29sIG9yIHBsYXllcj8/XG59O1xuXG4vLyBjb25zdCBsb2dXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbi8vICAgY29uc29sZS5sb2coYHBsYXllcjEgd2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YCk7XG4vLyAgIGNvbnNvbGUubG9nKGBwbGF5ZXIyIHdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gKTtcbi8vIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdjaGVjayBjaGVjaycpXG5pbXBvcnQgJy4vbW9kdWxlcy9nYW1lTG9vcCc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=