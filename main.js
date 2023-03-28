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

//ONLY CLICKING ON THE ENEMY GRID SHOULD BE ABLE TO ATTACK
//ONLY HOVERING ON THE ENEMY GRID SHOULD CHANGE CELL COLOR

const gridEvents = () => {
  const cells = document.querySelectorAll('.grid-cell');
  
  //Checks if the cell is a column or row label
  const checkTier = (cell) =>{
    const cellID = cell.getAttribute('data-cell-coordinate');
    const coordinate = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cellID);

    if(coordinate[0]==='@'||(coordinate.length===2&&coordinate[1]==='0')){
      return true;
    };
  };

  cells.forEach((node)=>{
    if(checkTier(node)){
      return;
    };

    node.addEventListener('click',(e)=>{
      //NEED TO MAKE IT SO YOU CANT ATTACK WHEN ITS NOT YOUR TURN
      //ALSO MAKE SURE YOU CANT ATTACK IF YOU DONT CLICK ON THE CORRECT GRID
      let cell = e.target;
      let coord = getGridCoordinate(cell);

      if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.computer&&_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn){
        return;
      };

      if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn&&cell.classList.contains('grid-cell-1')){
        return;
      } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn&&cell.classList.contains('grid-cell-2')){
        return;
      };

      console.log(`coordinate: ${coord}`);
      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo,coord);
    });
  });

  cells.forEach((node)=>{
    if(checkTier(node)){
      return;
    };

    node.addEventListener('mouseover',(e)=>{
      let cell = e.target;

      //stops hover from working if its computers turn
      if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn&&_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.computer){
        return;
      } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn&&_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.computer){
        return;
      };

      if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn&&cell.classList.contains('grid-cell-1')){
        return;
      } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn&&cell.classList.contains('grid-cell-2')){
        return;
      };

      cell.style.backgroundColor = 'rgb(167, 167, 167)';
    });

    node.addEventListener('mouseleave',(e)=>{
      let cell = e.target;
      cell.style.backgroundColor = null;
    });

    node.addEventListener('mousedown',(e)=>{
      if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn&&_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.computer){
        return;
      } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn&&_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.computer){
        return;
      };

      let cell = e.target;
      cell.style.backgroundColor = 'black';
    });

    node.addEventListener('mouseup',(e)=>{
      let cell = e.target;
    });
  });
};

//SHOULDN'T RENDER PLAYER TWO SHIPS IF PLAYING AGAINST COMPUTER
//IF TWO PLAYER SHOULDNT RENDER EITHER PLAYERS SHIPS
const renderGrid = (cells,player) => {
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
  // updateWins(firstPlayer, secondPlayer);
};

const updateTurn = (firstPlayer, secondPlayer) => {
  console.log('updating attacking player...');
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

// const updateWins = (firstPlayer, secondPlayer) => {
//   const wins1 = document.getElementById('wins-1');
//   const wins2 = document.getElementById('wins-2');
// };


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

  return { attacks, place, receiveAttack, fleetCoordinates, getShipsRemaining, isFleetSunk };
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
  const board = (0,_createGameboard__WEBPACK_IMPORTED_MODULE_0__.createGameboard)();
  const computer = isComp;
  let isTurn = false;
  let wins = 0;
  
  const makeAttack = (enemyBoard,coordinates = null) => {
    let target = coordinates;

    if(computer){
      //use set interval to have a small delay here
      console.log('computer has generated an attack.');
      target = generateAttack(enemyBoard);
    };

    if(enemyBoard.attacks.includes(target)){
      console.log('square has already been hit.');
      return;
    };
    enemyBoard.receiveAttack(target);
    console.log(`computer has attacked ${target}.`);
  };

  const placeFleet = () => {

  };
  
  const generateAttack = (enemyBoard,gen = 1) => {
    //could potentially make it 'smarter' later on aka, once it lands a hit, focus on that area until the ship is sunk.
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
    console.log(target);
    return target;
  };

  const getName = () => {
    return name;
  };

  const getWins = () => {
    return wins;
  };

  return { board, computer, isTurn, makeAttack, getName, getWins };
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
  let x = false;

  if(nameTwo === 'computer'){
    x = true;
  };
  
  playerOne = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameOne);
  playerTwo = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameTwo,x);

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.gridEvents)();

  //temporary placement setup
  playerOne.board.place(['A2','A3','A4']);
  playerOne.board.place(['E3','F3','G3']);
  playerOne.board.place(['A1','B1','C1','D1']);
  playerOne.board.place(['C10','D10','E10','F10']);

  playerTwo.board.place(['A4','B4','C4']);
  playerTwo.board.place(['A5','A6','A7']);
  playerTwo.board.place(['E5','F5','G5','H5']);
  playerTwo.board.place(['E6','E7','E8','E9']);

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),playerTwo);

  (0,_turn__WEBPACK_IMPORTED_MODULE_2__.firstTurn)(playerOne,playerTwo);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.highlight)(playerOne,playerTwo);

  setTimeout(() => {
    if(playerOne.isTurn&&playerOne.computer){
      playerOne.makeAttack(playerTwo.board);
    } else if (playerTwo.isTurn&&playerTwo.computer){
      playerTwo.makeAttack(playerOne.board);
    };

    (0,_turn__WEBPACK_IMPORTED_MODULE_2__.changeTurn)(playerOne,playerTwo);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.highlight)(playerOne,playerTwo);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),playerOne);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),playerTwo);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.updateDisplays)(playerOne,playerTwo);
  }, 2000);
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
/* harmony export */   "firstTurn": () => (/* binding */ firstTurn),
/* harmony export */   "turn": () => (/* binding */ turn)
/* harmony export */ });
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");



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
    firstPlayer.makeAttack(secondPlayer.board,target);
  } else if (secondPlayer.isTurn){
    secondPlayer.makeAttack(firstPlayer.board,target);
  };

  changeTurn(firstPlayer,secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  
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
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  }, 2000);
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsaUVBQVU7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLElBQUksMEVBQVM7QUFDYixJQUFJLCtFQUFjO0FBQ2xCLElBQUksaUVBQVU7QUFDZCxJQUFJLGlFQUFVO0FBQ2QsR0FBRztBQUNIOzs7Ozs7O1VDekRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBLENBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVN0YXJ0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdHVybi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUdyaWQgPSAoZ3JpZCxncmlkTnVtKSA9PiB7XG4gIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgbGV0IHJvdyA9IGk7XG4gICAgbGV0IGdyaWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoJ2dyaWQtcm93Jyk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1yb3ctJHtpfWApO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKCdkYXRhLXJvdy1udW1iZXInLGAke2l9YCk7XG4gICAgLy9QUk9CQUJMWSBET05UIE5FRUQgSUQgQU5EIERBVEEgQVRUUklCVVRFLCBCVVQgSSdMTCBDT01FIEJBQ0sgVE8gVEhJUy5cbiAgICBmb3IobGV0IGk9MDtpPDExO2krPTEpe1xuICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3dcbiAgICAgIGxldCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKGBncmlkLWNlbGwtJHtncmlkTnVtfWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdpZCcsYGdyaWQtY2VsbC0ke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScsYCR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsYWNrJztcbiAgICAgIGdyaWRSb3cuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgIH07XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChncmlkUm93KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbFJvd3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBbXTtcbiAgICBsZXQgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcblxuICAgIHJvd3MuZm9yRWFjaCgoZSk9PntcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIGxldCBpID0gMTtcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBpZihlLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDBcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBjb25zdCBjZWxsQ29vcmRpbmF0ZSA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgaWYoY2VsbENvb3JkaW5hdGUgPT09ICcwLTAnKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBsYWJlbFJvd3MoKTtcbiAgbGFiZWxDb2x1bW5zKCk7XG59O1xuIiwiY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXJEaXNwbGF5ID0gKHBsYXllciwgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWNvbnQnKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgcGxheWVyTnVtRGlzcGxheS50ZXh0Q29udGVudCA9IGBQTEFZRVIgJHtwbGF5ZXJOdW19YDtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgdHVybi5zZXRBdHRyaWJ1dGUoJ2lkJyxgdHVybi0ke3BsYXllck51bX1gKTtcbiAgaWYocGxheWVyLmlzVHVybil7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICB9IGVsc2UgaWYgKCFwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xuXG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoJ2lkJyxgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB3aW5zLnNldEF0dHJpYnV0ZSgnaWQnLGB3aW5zLSR7cGxheWVyTnVtfWApO1xuICB3aW5zLnRleHRDb250ZW50ID0gYFdpbnM6ICR7cGxheWVyLmdldFdpbnMoKX1gO1xuXG4gIGRpc3BsYXkuYXBwZW5kKHBsYXllck51bURpc3BsYXksbmFtZSx0dXJuLHNoaXBzLHdpbnMpO1xuXG4gIGlmKHBsYXllck51bSA9PT0gMSl7XG4gICAgcGxheWVyT25lRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH0gZWxzZSBpZiAocGxheWVyTnVtID09PSAyKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfTtcbn07XG5cbi8vcGxheWVyI1xuLy9wbGF5ZXIgbmFtZVxuLy9pcyB0dXJuXG4vL2N1cnJlbnQgc2hpcHMgYWxpdmVcbi8vd2lucyIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcblxuY29uc3QgZ2V0R3JpZENvb3JkaW5hdGUgPSAoY2VsbCkgPT4ge1xuICBsZXQgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpKTtcbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuLy9PTkxZIENMSUNLSU5HIE9OIFRIRSBFTkVNWSBHUklEIFNIT1VMRCBCRSBBQkxFIFRPIEFUVEFDS1xuLy9PTkxZIEhPVkVSSU5HIE9OIFRIRSBFTkVNWSBHUklEIFNIT1VMRCBDSEFOR0UgQ0VMTCBDT0xPUlxuXG5leHBvcnQgY29uc3QgZ3JpZEV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsJyk7XG4gIFxuICAvL0NoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGNvbHVtbiBvciByb3cgbGFiZWxcbiAgY29uc3QgY2hlY2tUaWVyID0gKGNlbGwpID0+e1xuICAgIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxJRCk7XG5cbiAgICBpZihjb29yZGluYXRlWzBdPT09J0AnfHwoY29vcmRpbmF0ZS5sZW5ndGg9PT0yJiZjb29yZGluYXRlWzFdPT09JzAnKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9O1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICAvL05FRUQgVE8gTUFLRSBJVCBTTyBZT1UgQ0FOVCBBVFRBQ0sgV0hFTiBJVFMgTk9UIFlPVVIgVFVSTlxuICAgICAgLy9BTFNPIE1BS0UgU1VSRSBZT1UgQ0FOVCBBVFRBQ0sgSUYgWU9VIERPTlQgQ0xJQ0sgT04gVEhFIENPUlJFQ1QgR1JJRFxuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZihwbGF5ZXJUd28uY29tcHV0ZXImJnBsYXllclR3by5pc1R1cm4pe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTEnKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbC0yJykpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjb25zb2xlLmxvZyhgY29vcmRpbmF0ZTogJHtjb29yZH1gKTtcbiAgICAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byxjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgLy9zdG9wcyBob3ZlciBmcm9tIHdvcmtpbmcgaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gICAgICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZwbGF5ZXJPbmUuY29tcHV0ZXIpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJnBsYXllclR3by5jb21wdXRlcil7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGlmKHBsYXllck9uZS5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMScpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTInKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigxNjcsIDE2NywgMTY3KSc7XG4gICAgfSk7XG5cbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gbnVsbDtcbiAgICB9KTtcblxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywoZSk9PntcbiAgICAgIGlmKHBsYXllck9uZS5pc1R1cm4mJnBsYXllck9uZS5jb21wdXRlcil7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmcGxheWVyVHdvLmNvbXB1dGVyKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcbiAgICB9KTtcblxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vU0hPVUxETidUIFJFTkRFUiBQTEFZRVIgVFdPIFNISVBTIElGIFBMQVlJTkcgQUdBSU5TVCBDT01QVVRFUlxuLy9JRiBUV08gUExBWUVSIFNIT1VMRE5UIFJFTkRFUiBFSVRIRVIgUExBWUVSUyBTSElQU1xuZXhwb3J0IGNvbnN0IHJlbmRlckdyaWQgPSAoY2VsbHMscGxheWVyKSA9PiB7XG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3QgYXJyID0gZmxlZXQucmVkdWNlKChhY2MsdmFsKT0+YWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKT0+e1xuICAgIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICAgIGlmIChhcnIuaW5jbHVkZXMoY29vcmQpJiZwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAn4pePJztcbiAgICB9IGVsc2UgaWYgKCEoYXJyLmluY2x1ZGVzKGNvb3JkKSkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICcvJztcbiAgICB9IGVsc2UgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkpe1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil4snO1xuICAgIH07XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IHNldHVwIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnQnO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJEaXNwbGF5IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cyc7XG5cbmNvbnN0IG1lbnVNdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LW11bHRpcGxheWVyJyk7XG5jb25zdCBtZW51TmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1uYW1lcycpO1xuY29uc3QgbWVudVJ1bGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtcnVsZXMnKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZS1wbGF5ZXInKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0d28tcGxheWVyJyk7XG5cbmNvbnN0IHBsYXllck9uZU5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLW5hbWUnKTtcbi8vIGNvbnN0IHBsYXllclR3b05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1uYW1lJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuXG4vLyBsZXQgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcblxuY29uc3QgaGlkZSA9IChtZW51KSA9PiB7XG4gIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn07XG5cbmNvbnN0IHNob3cgPSAobWVudSkgPT4ge1xuIG1lbnUuc3R5bGUuZGlzcGxheSA9IG51bGw7XG59O1xuXG5jb25zdCBnZXROYW1lcyA9ICgpID0+IHtcbiAgbGV0IHBsYXllck9uZSA9IHBsYXllck9uZU5hbWVFbC52YWx1ZTtcbiAgbGV0IHBsYXllclR3byA9ICdjb21wdXRlcic7XG4gIC8vIGlmKCFtdWx0aXBsYXllcil7XG4gIC8vICAgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gfTtcblxuICByZXR1cm4gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbn07XG5cbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICBsZXQgbmFtZXMgPSBnZXROYW1lcygpO1xuICBsZXQgbmFtZU9uZSA9IG5hbWVzWzBdO1xuICBsZXQgbmFtZVR3byA9IG5hbWVzWzFdXG5cbiAgaWYobmFtZU9uZSA9PT0gJycgfHwgbmFtZVR3byA9PT0gJycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBzZXR1cChuYW1lT25lLG5hbWVUd28pO1xuICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllck9uZSwxKTtcbiAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJUd28sMik7XG5cbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gJyc7XG4gIC8vIHBsYXllclR3b05hbWUudmFsdWUgPSAnJztcbiAgaGlkZShtZW51TmFtZXMpO1xufTtcblxuLy9tZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuXG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBoaWRlKG1lbnVNdWx0aXBsYXllcik7XG4gICAgc2hvdyhtZW51TmFtZXMpO1xuICAgIG11bHRpcGxheWVyID0gZmFsc2U7XG4gIH0pO1xuXG4gIHR3b1BsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBoaWRlKG1lbnVNdWx0aXBsYXllcik7XG4gICAgc2hvdyhtZW51TmFtZXMpO1xuICAgIG11bHRpcGxheWVyID0gdHJ1ZTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgc3RhcnQoKTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLChlKT0+e1xuICAgIGlmKGUua2V5ID09PSAnRW50ZXInKXtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfTtcbiAgfSk7XG4gIFxuICBwbGF5ZXJPbmVOYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLChlKT0+e1xuICAgIGlmKGUua2V5ID09PSAnRW50ZXInKXtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLy8gY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0xJyk7XG4vLyBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1kaXNwbGF5Jyk7XG4gIGNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbiAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDAgJiZzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDApe1xuICAgIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9O1xuICAgIHJldHVybjtcbiAgfTtcblxuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcGxheWVyJyk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVEaXNwbGF5cyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHVwZGF0ZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVNoaXBzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICAvLyB1cGRhdGVXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuY29uc3QgdXBkYXRlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnNvbGUubG9nKCd1cGRhdGluZyBhdHRhY2tpbmcgcGxheWVyLi4uJyk7XG4gIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMScpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0xJyk7XG4gIGNvbnN0IHNoaXBzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0yJyk7XG4gIHNoaXBzMS50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke2ZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgc2hpcHMyLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7c2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbn07XG5cbi8vIGNvbnN0IHVwZGF0ZVdpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuLy8gICBjb25zdCB3aW5zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5zLTEnKTtcbi8vICAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0yJyk7XG4vLyB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+e1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBhdHRhY2tzID0gW107XG5cbiAgZnVuY3Rpb24gT0xEcGxhY2UoYXhpcyxzdGFydCxzaXplKXtcbiAgICAvL1ggPT4gaG9yaXpvbnRhbCArIGxldHRlcnNcbiAgICAvL1kgPT4gdmVydGljYWwgKyBudW1iZXJzXG4gICAgaWYoIWF4aXN8fCFzdGFydHx8IXNpemUpe1xuICAgICAgY29uc29sZS5sb2coJ3BhcmFtZXRlciBtaXNzaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzdGFydEFyciA9IHN0YXJ0LnNwbGl0KCcnKTtcbiAgICBsZXQgeCA9IHN0YXJ0QXJyLnNsaWNlKDAsMSk7XG4gICAgbGV0IHkgPSBzdGFydEFyci5zbGljZSgxKS5qb2luKCcnKTtcblxuICAgIC8vdGhyb3dzIGVycm9yIGlmIHNoaXBzIHdvdWxkIGJlIHBsYWNlZCBvdXQgb2YgYm91bmRzXG4gICAgLy90aHJvd3MgZXJyb3JzIGZvciBub3cgbWF5YmUgY2hhbmdlIGxhdGVyKipcbiAgICAvL1RIRSBDT09SRElOQVRFUyBDQU4gQkUgQ0hFQ0tFRCBCRUZPUkUgVEhFWSBBUkUgUEFTU0VEIFRPIFBMQUNFKipcbiAgICBpZigoeFswXS5jaGFyQ29kZUF0KDApK3NpemUpPjc0KXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB4IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9IGVsc2UgaWYgKChwYXJzZUludCh5KStzaXplKT4xMCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NoaXAgZXhjZWVkcyB0aGUgeSBheGlzIG9mIHRoZSBnYW1lYm9hcmQuJyk7XG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgcGxhY2VtZW50IGNvb3JkaW5hdGVzIGNvbmZsaWN0IHdpdGggYW55IG90aGVyIHNoaXBzXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb29yZGluYXRlcyhzaGlwQXhpcyxzaGlwU2l6ZSl7XG4gICAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgICAgaWYoc2hpcEF4aXMgPT09ICdYJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IGxldHRlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBsZXQgbmV3WCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeFswXS5jaGFyQ29kZUF0KDApK2kpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goYCR7bmV3WCArIHl9YCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNoaXBBeGlzID09PSAnWScpe1xuICAgICAgICAvL2luY3JlbWVudCBudW1iZXJzXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2hpcFNpemU7aSs9MSl7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHt4ICsgKHBhcnNlSW50KHkpICsgaSl9YCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfTtcblxuXG4gICAgbGV0IHNoaXAgPSBjcmVhdGVTaGlwKGNyZWF0ZUNvb3JkaW5hdGVzKGF4aXMsc2l6ZSkpO1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gIH07IC8vT0xEIFBMQUNFIEZVTkNUSU9OLCBTVElMTCBVU0VGVUwgQ09ERSBJTiBIRVJFIEZPUiBMQVRFUioqXG5cbiAgY29uc3QgcGxhY2UgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBsZXQgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGlmKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApPT57IHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCl9KTtcblxuICAgIGlmKHNoaXBJbmRleD4tMSl7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH07XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgICAvLyByZXR1cm4gaWYgc2hpcCB3YXMgaGl0L3doaWNoIHNoaXAgd2FzIGhpdD9cbiAgfTtcbiAgXG4gIGNvbnN0IGZsZWV0Q29vcmRpbmF0ZXMgPSAoKSA9PntcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IobGV0IGk9MDtpPHNoaXBzLmxlbmd0aDtpKz0xKXtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApPT57XG4gICAgICBpZihzaGlwLmlzU3VuaygpKXtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZihzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4geyBhdHRhY2tzLCBwbGFjZSwgcmVjZWl2ZUF0dGFjaywgZmxlZXRDb29yZGluYXRlcywgZ2V0U2hpcHNSZW1haW5pbmcsIGlzRmxlZXRTdW5rIH07XG59OyIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2NyZWF0ZUdhbWVib2FyZFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllck5hbWUsaXNDb21wID0gZmFsc2UpID0+e1xuICBjb25zdCBuYW1lID0gcGxheWVyTmFtZTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBpc0NvbXA7XG4gIGxldCBpc1R1cm4gPSBmYWxzZTtcbiAgbGV0IHdpbnMgPSAwO1xuICBcbiAgY29uc3QgbWFrZUF0dGFjayA9IChlbmVteUJvYXJkLGNvb3JkaW5hdGVzID0gbnVsbCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBjb29yZGluYXRlcztcblxuICAgIGlmKGNvbXB1dGVyKXtcbiAgICAgIC8vdXNlIHNldCBpbnRlcnZhbCB0byBoYXZlIGEgc21hbGwgZGVsYXkgaGVyZVxuICAgICAgY29uc29sZS5sb2coJ2NvbXB1dGVyIGhhcyBnZW5lcmF0ZWQgYW4gYXR0YWNrLicpO1xuICAgICAgdGFyZ2V0ID0gZ2VuZXJhdGVBdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgfTtcblxuICAgIGlmKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIGNvbnNvbGUubG9nKCdzcXVhcmUgaGFzIGFscmVhZHkgYmVlbiBoaXQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgICBjb25zb2xlLmxvZyhgY29tcHV0ZXIgaGFzIGF0dGFja2VkICR7dGFyZ2V0fS5gKTtcbiAgfTtcblxuICBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuXG4gIH07XG4gIFxuICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9IChlbmVteUJvYXJkLGdlbiA9IDEpID0+IHtcbiAgICAvL2NvdWxkIHBvdGVudGlhbGx5IG1ha2UgaXQgJ3NtYXJ0ZXInIGxhdGVyIG9uIGFrYSwgb25jZSBpdCBsYW5kcyBhIGhpdCwgZm9jdXMgb24gdGhhdCBhcmVhIHVudGlsIHRoZSBzaGlwIGlzIHN1bmsuXG4gICAgY29uc3QgZ2VuZXJhdGVDaGFyQ29kZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpICkgKyA2NTtcbiAgICB9O1xuXG4gICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICBsZXQgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgLy9jaGVja3MgaWYgc3F1YXJlcyBoYXZlIGFscmVhZHkgYmVlbiBoaXRcbiAgICBpZihlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICBkb3tcbiAgICAgICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgICBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG4gICAgICB9XG4gICAgICB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgIH07XG4gICAgY29uc29sZS5sb2codGFyZ2V0KTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3QgZ2V0V2lucyA9ICgpID0+IHtcbiAgICByZXR1cm4gd2lucztcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgY29tcHV0ZXIsIGlzVHVybiwgbWFrZUF0dGFjaywgZ2V0TmFtZSwgZ2V0V2lucyB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVBcnJheSkgPT57XG4gIGxldCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVBcnJheTtcbiAgbGV0IGxlbmd0aCA9IGNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZihsZW5ndGggPT09IGRhbWFnZSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0RGFtYWdlID0gKCkgPT4ge1xuICAgIHJldHVybiBkYW1hZ2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBnZXREYW1hZ2UgfTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4uL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIlxuaW1wb3J0IHsgZ3JpZEV2ZW50cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG4vL1NFVCBVUCBCQVNFIEdSSURcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWdyaWQnKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1ncmlkJyk7XG5cbmNyZWF0ZUdyaWQocGxheWVyT25lR3JpZCwxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwyKTtcbi8vIGdyaWRFdmVudHMoKTtcblxuLy9ET05UIFNUQVJUIExPT1AgVU5USUwgU1RBUlQgQlVUVE9OIElTIENMSUNLRURcblxuLy8gd2hpbGUoIShwbGF5ZXJPbmUuYm9hcmQuaXNGbGVldFN1bmsoKSkmJiEocGxheWVyVHdvLmJvYXJkLmlzRmxlZXRTdW5rKCkpKXtcbi8vICAgdHVybihwbGF5ZXJPbmUscGxheWVyVHdvLHRhcmdldFByb21pc2UpO1xuLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4vLyAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcbi8vIH07XG5cblxuLy9kbyBnYW1lIGxvb3AgaWYgZmFjaW5nIGEgY29tcHV0ZXIsIGJ1dCBub3QgaWYgcGxheWluZyAyIHBsYXllcj8/Pz8qKioqXG5cblxuLy9kZWNsYXJlIHdpbm5lclxuXG4vL2RlY2lkZSB3aG8gZ29lcyBmaXJzdCAocGxheWVyIG9uZSBnb2VzIGZpcnN0Pylcbi8vdHVybiBmdW5jdGlvblxuXG4vL0ZJR1VSRSBPVVQgVFVSTlMgTkVYVFxuXG4vL1YgTE9PUCBWXG4vL2FsdGVybmF0ZSB0dXJucyB1bnRpbCB0aGVyZSdzIGEgd2lubmVyXG4vL2FkZCB3aW4gdG8gdGhhdCBwbGF5ZXJcbi8vbG9vc2luZyBwbGF5ZXIgZ2V0cyB0byBnbyBmaXJzdFxuXG4vL2lmIGltcGxlbWVudGVkIHlvdSBzaG91bGQgYmUgYWJsZSB0byByZXN0YXJ0IGEgZ2FtZSBvciBjaGFuZ2UgdGhlIHJ1bGVzIGF0IGFueXRpbWVcbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuLi9mYWN0b3JpZXMvY3JlYXRlUGxheWVyXCI7XG5pbXBvcnQgeyBncmlkRXZlbnRzLCByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBmaXJzdFR1cm4sIGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyBoaWdobGlnaHQsIHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuXG5leHBvcnQgbGV0IHBsYXllck9uZSxwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChuYW1lT25lLCBuYW1lVHdvKSA9PiB7XG4gIGxldCB4ID0gZmFsc2U7XG5cbiAgaWYobmFtZVR3byA9PT0gJ2NvbXB1dGVyJyl7XG4gICAgeCA9IHRydWU7XG4gIH07XG4gIFxuICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gIHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihuYW1lVHdvLHgpO1xuXG4gIGdyaWRFdmVudHMoKTtcblxuICAvL3RlbXBvcmFyeSBwbGFjZW1lbnQgc2V0dXBcbiAgcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQTInLCdBMycsJ0E0J10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydFMycsJ0YzJywnRzMnXSk7XG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0ExJywnQjEnLCdDMScsJ0QxJ10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydDMTAnLCdEMTAnLCdFMTAnLCdGMTAnXSk7XG5cbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnQTQnLCdCNCcsJ0M0J10pO1xuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydBNScsJ0E2JywnQTcnXSk7XG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0U1JywnRjUnLCdHNScsJ0g1J10pO1xuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydFNicsJ0U3JywnRTgnLCdFOSddKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcblxuICBmaXJzdFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZwbGF5ZXJPbmUuY29tcHV0ZXIpe1xuICAgICAgcGxheWVyT25lLm1ha2VBdHRhY2socGxheWVyVHdvLmJvYXJkKTtcbiAgICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJnBsYXllclR3by5jb21wdXRlcil7XG4gICAgICBwbGF5ZXJUd28ubWFrZUF0dGFjayhwbGF5ZXJPbmUuYm9hcmQpO1xuICAgIH07XG5cbiAgICBjaGFuZ2VUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuICAgIHVwZGF0ZURpc3BsYXlzKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICB9LCAyMDAwKTtcbn07XG4iLCIvL2lucHV0IGNlbGwgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZVxuLy9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYodHlwZW9mIGF0dHJpYnV0ZSAhPT0gJ3N0cmluZycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBsZXQgYXJyID0gYXR0cmlidXRlLnNwbGl0KCcnKTtcblxuICBjb25zdCBnZXRMZXR0ZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbGV0dGVyVmFsdWU7XG5cbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5WzFdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsMik7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH07XG5cbiAgICBsZXQgY29kZVZhbHVlID0gcGFyc2VJbnQobGV0dGVyVmFsdWUpO1xuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCg2NSArIGNvZGVWYWx1ZSkgLSAxKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsZXR0ZXIpO1xuICAgIHJldHVybiBsZXR0ZXI7XG4gIH07XG5cbiAgY29uc3QgZ2V0TnVtYmVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IG51bWJlcjtcbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5W2FycmF5Lmxlbmd0aC0yXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGgtMik7XG4gICAgICBudW1iZXIgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoLTFdO1xuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9O1xuXG4gIGxldCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgbGV0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuICAvLyBjb25zb2xlLmxvZyhsZXR0ZXIgKyBudW1iZXIpO1xuICByZXR1cm4gbGV0dGVyICsgbnVtYmVyO1xufTtcbiIsImltcG9ydCB7IGhpZ2hsaWdodCwgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5cbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEpO1xuXG4gIGlmKG51bWJlciUyID09PSAwKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfSBlbHNlIGlmIChudW1iZXIlMiAhPT0gMCl7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coYElUIElTIE5PVyAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCx0YXJnZXQpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLHRhcmdldCk7XG4gIH07XG5cbiAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgXG4gIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuY29uc3QgY29tcFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZihmaXJzdFBsYXllci5jb21wdXRlcil7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCk7XG4gICAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpe1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQpO1xuICAgIH07XG5cbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIH0sIDIwMDApO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ2NoZWNrIGNoZWNrJylcbmltcG9ydCAnLi9tb2R1bGVzL2dhbWVMb29wJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==