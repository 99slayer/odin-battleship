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

/***/ "./src/modules/checkWin.js":
/*!*********************************!*\
  !*** ./src/modules/checkWin.js ***!
  \*********************************/
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
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");


const gameReset = (firstPlayer, secondPlayer, winner) => {
  if(winner === 'first'&&firstPlayer.isTurn){
    (0,_turn__WEBPACK_IMPORTED_MODULE_0__.changeTurn)(firstPlayer, secondPlayer);
  } else if (winner === 'second'&&secondPlayer.isTurn){
    (0,_turn__WEBPACK_IMPORTED_MODULE_0__.changeTurn)(firstPlayer, secondPlayer);
  };

  firstPlayer.board.reset();
  secondPlayer.board.reset();
};


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

  if(playerOne.getWins() === 0 && playerTwo.getWins() === 0){
    (0,_turn__WEBPACK_IMPORTED_MODULE_2__.firstTurn)(playerOne,playerTwo);
  };

  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.highlight)(playerOne,playerTwo);

  let computerPlayer;

  if(playerOne.computer){
    computerPlayer = playerOne;
  } else if (playerTwo.computer){
    computerPlayer = playerTwo;
  };
  
  if(computerPlayer.isTurn){
    (0,_turn__WEBPACK_IMPORTED_MODULE_2__.compTurn)(playerOne,playerTwo);
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
/* harmony import */ var _checkWin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkWin */ "./src/modules/checkWin.js");
/* harmony import */ var _gameReset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameReset */ "./src/modules/gameReset.js");
/* harmony import */ var _gameStart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameStart */ "./src/modules/gameStart.js");






//randomly chooses a player to go first
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

//changes current player
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

  //PLAYER WINS
  if((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'first'){
    turnWon(firstPlayer,secondPlayer,'first');
    return;
  } else if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'second'){
    turnWon(firstPlayer,secondPlayer,'second');
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

    //COMP WINS
    if((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'first'){
      turnWon(firstPlayer,secondPlayer,'first');
      return;
    } else if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'second'){
      turnWon(firstPlayer,secondPlayer,'second');
      return;
    };

    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
  }, 1000);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  (0,_gameReset__WEBPACK_IMPORTED_MODULE_3__.gameReset)(firstPlayer, secondPlayer, winner);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_gameStart__WEBPACK_IMPORTED_MODULE_4__.setup)();
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
  //bring up menu
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSxDQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2dyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9tZW51LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NoZWNrV2luLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVMb29wLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVSZXNldC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lU3RhcnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy90dXJuLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY3JlYXRlR3JpZCA9IChncmlkLGdyaWROdW0pID0+IHtcbiAgZm9yKGxldCBpPTA7aTwxMTtpKz0xKXtcbiAgICBsZXQgcm93ID0gaTtcbiAgICBsZXQgZ3JpZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyaWRSb3cuY2xhc3NMaXN0LmFkZCgnZ3JpZC1yb3cnKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZSgnaWQnLGBncmlkLXJvdy0ke2l9YCk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LW51bWJlcicsYCR7aX1gKTtcbiAgICAvL1BST0JBQkxZIERPTlQgTkVFRCBJRCBBTkQgREFUQSBBVFRSSUJVVEUsIEJVVCBJJ0xMIENPTUUgQkFDSyBUTyBUSElTLlxuICAgIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgICBsZXQgY3VycmVudFJvdyA9IHJvd1xuICAgICAgbGV0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1jZWxsLSR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyxgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICAgICAgZ3JpZFJvdy5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG4gICAgfTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsUm93cyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IFtdO1xuICAgIGxldCByb3dzID0gZ3JpZC5jaGlsZE5vZGVzO1xuXG4gICAgcm93cy5mb3JFYWNoKChlKT0+e1xuICAgICAgbm9kZUxpc3QucHVzaChlLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuXG4gICAgbGV0IGkgPSAxO1xuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGlmKGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpID09PSAnMC0wJyl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7aX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IGdyaWQuZmlyc3RDaGlsZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMFxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGNvbnN0IGNlbGxDb29yZGluYXRlID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gICAgICBpZihjZWxsQ29vcmRpbmF0ZSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGxhYmVsUm93cygpO1xuICBsYWJlbENvbHVtbnMoKTtcbn07XG4iLCJjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktY29udCcpO1xuXG4gIGNvbnN0IHBsYXllck51bURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgbmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllci5nZXROYW1lKCl9YDtcblxuICBjb25zdCB0dXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB0dXJuLnNldEF0dHJpYnV0ZSgnaWQnLGB0dXJuLSR7cGxheWVyTnVtfWApO1xuICBpZihwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG5cbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNoaXBzLnNldEF0dHJpYnV0ZSgnaWQnLGBzaGlwcy0ke3BsYXllck51bX1gKTtcbiAgc2hpcHMudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtwbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuXG4gIGNvbnN0IHdpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHdpbnMuc2V0QXR0cmlidXRlKCdpZCcsYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSxuYW1lLHR1cm4sc2hpcHMsd2lucyk7XG5cbiAgaWYocGxheWVyTnVtID09PSAxKXtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpe1xuICAgIHBsYXllclR3b0Rpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9O1xufTtcblxuLy9wbGF5ZXIjXG4vL3BsYXllciBuYW1lXG4vL2lzIHR1cm5cbi8vY3VycmVudCBzaGlwcyBhbGl2ZVxuLy93aW5zIiwiaW1wb3J0IHsgcGFyc2VDZWxsQ29vcmRpbmF0ZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGVcIjtcbmltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyB0dXJuIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvdHVyblwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICByZXR1cm4gY29vcmQ7XG59O1xuXG4vL3N0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybiYmZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4mJnNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgLy9zdG9wcyBwbGF5ZXIgZnJvbSBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIG93biBncmlkXG4gIGlmKHBsYXllck9uZS5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMScpKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTInKSl7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vL0NoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT57XG4gIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmKGNvb3JkaW5hdGVbMF09PT0nQCd8fChjb29yZGluYXRlLmxlbmd0aD09PTImJmNvb3JkaW5hdGVbMV09PT0nMCcpKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwnKTtcbiAgXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLy9hZGQgdHVybiBsaXN0ZW5lclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLHBsYXllclR3byxjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byxjb29yZCk7XG4gICAgICBjb25zb2xlLmxvZyhwbGF5ZXJPbmUuYm9hcmQpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vcmVtb3ZlIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1ob3ZlcicpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgYW5kIHJlbW92ZSBjbGljayBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbC1tb3VzZWRvd24nKTtcblxuICAgICAgY2VsbC5vbm1vdXNldXAgPSAoKSA9PntcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG4gICAgICB9O1xuXG4gICAgICBjZWxsLm9ubW91c2VsZWF2ZSA9ICgpID0+e1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1tb3VzZWRvd24nKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy90ZW1wb3JhcmlseSByZW5kZXJpbmcgZXZlcnl0aGluZyBmb3IgdGVzdGluZy9kZWJ1Z2dpbmcgcHVycG9zZXNcbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKGNlbGxzLHBsYXllcikgPT4ge1xuICBpZihwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCl7XG4gICAgcmVzZXRHcmlkKGNlbGxzKTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBhcnIgPSBmbGVldC5yZWR1Y2UoKGFjYyx2YWwpPT5hY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gICAgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil48nO1xuICAgIH0gZWxzZSBpZiAoIShhcnIuaW5jbHVkZXMoY29vcmQpKSYmcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJy8nO1xuICAgIH0gZWxzZSBpZiAoYXJyLmluY2x1ZGVzKGNvb3JkKSl7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXiyc7XG4gICAgfTtcbiAgfSk7XG59O1xuXG5jb25zdCByZXNldEdyaWQgPSAoY2VsbHMpID0+IHtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCk9PntcbiAgICBpZihjaGVja1RpZXIoY2VsbCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgY2VsbC50ZXh0Q29udGVudCA9IG51bGw7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IHNldHVwIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnQnO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJEaXNwbGF5IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cyc7XG5cbmNvbnN0IG1lbnVNdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LW11bHRpcGxheWVyJyk7XG5jb25zdCBtZW51TmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1uYW1lcycpO1xuY29uc3QgbWVudVJ1bGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtcnVsZXMnKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZS1wbGF5ZXInKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0d28tcGxheWVyJyk7XG5cbmNvbnN0IHBsYXllck9uZU5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLW5hbWUnKTtcbi8vIGNvbnN0IHBsYXllclR3b05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1uYW1lJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuXG4vLyBsZXQgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcblxuY29uc3QgaGlkZSA9IChtZW51KSA9PiB7XG4gIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn07XG5cbmNvbnN0IHNob3cgPSAobWVudSkgPT4ge1xuIG1lbnUuc3R5bGUuZGlzcGxheSA9IG51bGw7XG59O1xuXG5jb25zdCBnZXROYW1lcyA9ICgpID0+IHtcbiAgbGV0IHBsYXllck9uZSA9IHBsYXllck9uZU5hbWVFbC52YWx1ZTtcbiAgbGV0IHBsYXllclR3byA9ICdjb21wdXRlcic7XG4gIC8vIGlmKCFtdWx0aXBsYXllcil7XG4gIC8vICAgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gfTtcblxuICByZXR1cm4gW3BsYXllck9uZSwgcGxheWVyVHdvXTtcbn07XG5cbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICBsZXQgbmFtZXMgPSBnZXROYW1lcygpO1xuICBsZXQgbmFtZU9uZSA9IG5hbWVzWzBdO1xuICBsZXQgbmFtZVR3byA9IG5hbWVzWzFdXG5cbiAgaWYobmFtZU9uZSA9PT0gJycgfHwgbmFtZVR3byA9PT0gJycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBzZXR1cChuYW1lT25lLG5hbWVUd28pO1xuICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllck9uZSwxKTtcbiAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJUd28sMik7XG5cbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gJyc7XG4gIC8vIHBsYXllclR3b05hbWUudmFsdWUgPSAnJztcbiAgaGlkZShtZW51TmFtZXMpO1xufTtcblxuLy9tZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuXG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBoaWRlKG1lbnVNdWx0aXBsYXllcik7XG4gICAgc2hvdyhtZW51TmFtZXMpO1xuICAgIG11bHRpcGxheWVyID0gZmFsc2U7XG4gIH0pO1xuXG4gIHR3b1BsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBoaWRlKG1lbnVNdWx0aXBsYXllcik7XG4gICAgc2hvdyhtZW51TmFtZXMpO1xuICAgIG11bHRpcGxheWVyID0gdHJ1ZTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgc3RhcnQoKTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLChlKT0+e1xuICAgIGlmKGUua2V5ID09PSAnRW50ZXInKXtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfTtcbiAgfSk7XG4gIFxuICBwbGF5ZXJPbmVOYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLChlKT0+e1xuICAgIGlmKGUua2V5ID09PSAnRW50ZXInKXtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiLy8gY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0xJyk7XG4vLyBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1kaXNwbGF5Jyk7XG4gIGNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbiAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDAgJiZzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDApe1xuICAgIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9O1xuICAgIHJldHVybjtcbiAgfTtcblxuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcGxheWVyJyk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVEaXNwbGF5cyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHVwZGF0ZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVNoaXBzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuLy9ORUVEIFNPTUVUSElORyBXSEVOIFBMQVlFUlMgQVJFIFdBSVRJTkcgRk9SIFRIRSBORVhUIEdBTUVcbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbiAgY29uc3QgdHVybjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0yJyk7XG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xufTtcblxuY29uc3QgdXBkYXRlU2hpcHMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBzaGlwczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMtMScpO1xuICBjb25zdCBzaGlwczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMtMicpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG5jb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0xJyk7XG4gIGNvbnN0IHdpbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbnMtMicpO1xuICB3aW5zMS50ZXh0Q29udGVudCA9IGBXaW5zOiAke2ZpcnN0UGxheWVyLmdldFdpbnMoKX1gO1xuICB3aW5zMi50ZXh0Q29udGVudCA9IGBXaW5zOiAke3NlY29uZFBsYXllci5nZXRXaW5zKCl9YDtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vY3JlYXRlU2hpcFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT57XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGF0dGFja3MgPSBbXTtcblxuICAvL1VTRSBGT1IgUExBQ0UgRkxFRVQgRlVOQ1RJT05cbiAgZnVuY3Rpb24gT0xEcGxhY2UoYXhpcyxzdGFydCxzaXplKXtcbiAgICAvL1ggPT4gaG9yaXpvbnRhbCArIGxldHRlcnNcbiAgICAvL1kgPT4gdmVydGljYWwgKyBudW1iZXJzXG4gICAgaWYoIWF4aXN8fCFzdGFydHx8IXNpemUpe1xuICAgICAgY29uc29sZS5sb2coJ3BhcmFtZXRlciBtaXNzaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzdGFydEFyciA9IHN0YXJ0LnNwbGl0KCcnKTtcbiAgICBsZXQgeCA9IHN0YXJ0QXJyLnNsaWNlKDAsMSk7XG4gICAgbGV0IHkgPSBzdGFydEFyci5zbGljZSgxKS5qb2luKCcnKTtcblxuICAgIC8vdGhyb3dzIGVycm9yIGlmIHNoaXBzIHdvdWxkIGJlIHBsYWNlZCBvdXQgb2YgYm91bmRzXG4gICAgLy90aHJvd3MgZXJyb3JzIGZvciBub3cgbWF5YmUgY2hhbmdlIGxhdGVyKipcbiAgICAvL1RIRSBDT09SRElOQVRFUyBDQU4gQkUgQ0hFQ0tFRCBCRUZPUkUgVEhFWSBBUkUgUEFTU0VEIFRPIFBMQUNFKipcbiAgICBpZigoeFswXS5jaGFyQ29kZUF0KDApK3NpemUpPjc0KXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB4IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9IGVsc2UgaWYgKChwYXJzZUludCh5KStzaXplKT4xMCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NoaXAgZXhjZWVkcyB0aGUgeSBheGlzIG9mIHRoZSBnYW1lYm9hcmQuJyk7XG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgcGxhY2VtZW50IGNvb3JkaW5hdGVzIGNvbmZsaWN0IHdpdGggYW55IG90aGVyIHNoaXBzXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb29yZGluYXRlcyhzaGlwQXhpcyxzaGlwU2l6ZSl7XG4gICAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgICAgaWYoc2hpcEF4aXMgPT09ICdYJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IGxldHRlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBsZXQgbmV3WCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeFswXS5jaGFyQ29kZUF0KDApK2kpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goYCR7bmV3WCArIHl9YCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNoaXBBeGlzID09PSAnWScpe1xuICAgICAgICAvL2luY3JlbWVudCBudW1iZXJzXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2hpcFNpemU7aSs9MSl7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHt4ICsgKHBhcnNlSW50KHkpICsgaSl9YCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfTtcblxuXG4gICAgbGV0IHNoaXAgPSBjcmVhdGVTaGlwKGNyZWF0ZUNvb3JkaW5hdGVzKGF4aXMsc2l6ZSkpO1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gIH07IC8vT0xEIFBMQUNFIEZVTkNUSU9OLCBTVElMTCBVU0VGVUwgQ09ERSBJTiBIRVJFIEZPUiBMQVRFUioqXG5cbiAgY29uc3QgcGxhY2UgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBsZXQgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGlmKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApPT57IHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCl9KTtcblxuICAgIGlmKHNoaXBJbmRleD4tMSl7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH07XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgICAvLyByZXR1cm4gaWYgc2hpcCB3YXMgaGl0L3doaWNoIHNoaXAgd2FzIGhpdD9cbiAgfTtcbiAgXG4gIGNvbnN0IGZsZWV0Q29vcmRpbmF0ZXMgPSAoKSA9PntcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IobGV0IGk9MDtpPHNoaXBzLmxlbmd0aDtpKz0xKXtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApPT57XG4gICAgICBpZihzaGlwLmlzU3VuaygpKXtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZihzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCByZXNldEFycmF5ID0gKGFycikgPT4ge1xuICAgIGNvbnN0IHNpemUgPSBhcnIubGVuZ3RoXG4gICAgXG4gICAgICBmb3IobGV0IGk9MDtpPHNpemU7aSs9MSl7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlc2V0QXJyYXkoc2hpcHMpO1xuICAgIHJlc2V0QXJyYXkoYXR0YWNrcyk7XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrcywgcGxhY2UsIHJlY2VpdmVBdHRhY2ssIGZsZWV0Q29vcmRpbmF0ZXMsIGdldFNoaXBzUmVtYWluaW5nLCBpc0ZsZWV0U3VuaywgcmVzZXQgfTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vY3JlYXRlR2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyTmFtZSxpc0NvbXAgPSBmYWxzZSkgPT57XG4gIGNvbnN0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBjb21wdXRlciA9IGlzQ29tcDtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgbGV0IGlzVHVybiA9IGZhbHNlO1xuICBsZXQgd2lucyA9IDA7XG4gIFxuICBjb25zdCBtYWtlQXR0YWNrID0gKGVuZW15Qm9hcmQsY29vcmRpbmF0ZXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYoY29tcHV0ZXIpe1xuICAgICAgdGFyZ2V0ID0gZ2VuZXJhdGVBdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9IGF0dGFja3MgJHt0YXJnZXR9YCk7XG4gICAgfTtcblxuICAgIC8vTUFZIE5PVCBORUVEXG4gICAgaWYoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgY29uc29sZS5sb2coJ3NxdWFyZSBoYXMgYWxyZWFkeSBiZWVuIGhpdC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHRhcmdldCk7XG4gIH07XG5cbiAgLy8gY29uc3QgcGxhY2VGbGVldCA9ICgpID0+IHtcblxuICAvLyB9O1xuICBcbiAgY29uc3QgZ2VuZXJhdGVBdHRhY2sgPSAoZW5lbXlCb2FyZCxnZW4gPSAxKSA9PiB7XG4gICAgY29uc3QgZ2VuZXJhdGVDaGFyQ29kZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpICkgKyA2NTtcbiAgICB9O1xuXG4gICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICBsZXQgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgLy9jaGVja3MgaWYgc3F1YXJlcyBoYXZlIGFscmVhZHkgYmVlbiBoaXRcbiAgICBpZihlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICBkb3tcbiAgICAgICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgICBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG4gICAgICB9XG4gICAgICB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgIH07XG4gICAgY29uc29sZS5sb2coYGNvbXB1dGVyIGF0dGFja3MgJHt0YXJnZXR9YCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIGNvbnN0IHdvbiA9ICgpID0+IHtcbiAgICB3aW5zICs9IDE7XG4gIH07XG5cbiAgY29uc3QgZ2V0V2lucyA9ICgpID0+IHtcbiAgICByZXR1cm4gd2lucztcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgY29tcHV0ZXIsIGlzVHVybiwgbWFrZUF0dGFjaywgZ2V0TmFtZSwgd29uLCBnZXRXaW5zIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZUFycmF5KSA9PntcbiAgbGV0IGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZUFycmF5O1xuICBsZXQgbGVuZ3RoID0gY29vcmRpbmF0ZXMubGVuZ3RoO1xuICBsZXQgZGFtYWdlID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgZGFtYWdlICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmKGxlbmd0aCA9PT0gZGFtYWdlKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBnZXREYW1hZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhbWFnZTtcbiAgfTtcblxuICByZXR1cm4geyBjb29yZGluYXRlcywgaGl0LCBpc1N1bmssIGdldERhbWFnZSB9O1xufTtcbiIsImltcG9ydCB7IGdhbWVSZXNldCB9IGZyb20gXCIuL2dhbWVSZXNldFwiO1xuXG5leHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgZmlyc3RGbGVldCA9IGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCk7XG4gIGxldCBzZWNvbmRGbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpO1xuICAvLyBsZXQgeCA9IGZhbHNlO1xuXG4gIGlmKHNlY29uZEZsZWV0KXtcbiAgICBmaXJzdFBsYXllci53b24oKTtcbiAgICByZXR1cm4gJ2ZpcnN0JztcbiAgICAvLyB4ID0gdHJ1ZTtcbiAgICAvLyBnYW1lUmVzZXQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH0gZWxzZSBpZiAoZmlyc3RGbGVldCl7XG4gICAgc2Vjb25kUGxheWVyLndvbigpO1xuICAgIHJldHVybiAnc2Vjb25kJztcbiAgICAvLyB4ID0gdHJ1ZTtcbiAgICAvLyBnYW1lUmVzZXQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG4gIC8vIHJldHVybiB4XG4gIC8vcmV0dXJuIGJvb2wgZ2FtZSByZXNldCBpbiB0dXJuIFxuICAvL3JldHVybiBib29sIG9yIHBsYXllcj8/XG59O1xuXG4vLyBjb25zdCBsb2dXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbi8vICAgY29uc29sZS5sb2coYHBsYXllcjEgd2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YCk7XG4vLyAgIGNvbnNvbGUubG9nKGBwbGF5ZXIyIHdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gKTtcbi8vIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4uL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIlxuaW1wb3J0IHsgZ3JpZEV2ZW50cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG4vL1NFVCBVUCBCQVNFIEdSSURcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWdyaWQnKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1ncmlkJyk7XG5cbmNyZWF0ZUdyaWQocGxheWVyT25lR3JpZCwxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwyKTtcbi8vIGdyaWRFdmVudHMoKTtcblxuLy9ET05UIFNUQVJUIExPT1AgVU5USUwgU1RBUlQgQlVUVE9OIElTIENMSUNLRURcblxuLy8gd2hpbGUoIShwbGF5ZXJPbmUuYm9hcmQuaXNGbGVldFN1bmsoKSkmJiEocGxheWVyVHdvLmJvYXJkLmlzRmxlZXRTdW5rKCkpKXtcbi8vICAgdHVybihwbGF5ZXJPbmUscGxheWVyVHdvLHRhcmdldFByb21pc2UpO1xuLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4vLyAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcbi8vIH07XG5cblxuLy9kbyBnYW1lIGxvb3AgaWYgZmFjaW5nIGEgY29tcHV0ZXIsIGJ1dCBub3QgaWYgcGxheWluZyAyIHBsYXllcj8/Pz8qKioqXG5cblxuLy9kZWNsYXJlIHdpbm5lclxuXG4vL2RlY2lkZSB3aG8gZ29lcyBmaXJzdCAocGxheWVyIG9uZSBnb2VzIGZpcnN0Pylcbi8vdHVybiBmdW5jdGlvblxuXG4vL0ZJR1VSRSBPVVQgVFVSTlMgTkVYVFxuXG4vL1YgTE9PUCBWXG4vL2FsdGVybmF0ZSB0dXJucyB1bnRpbCB0aGVyZSdzIGEgd2lubmVyXG4vL2FkZCB3aW4gdG8gdGhhdCBwbGF5ZXJcbi8vbG9vc2luZyBwbGF5ZXIgZ2V0cyB0byBnbyBmaXJzdFxuXG4vL2lmIGltcGxlbWVudGVkIHlvdSBzaG91bGQgYmUgYWJsZSB0byByZXN0YXJ0IGEgZ2FtZSBvciBjaGFuZ2UgdGhlIHJ1bGVzIGF0IGFueXRpbWVcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzZXQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGlmKHdpbm5lciA9PT0gJ2ZpcnN0JyYmZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ3NlY29uZCcmJnNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG5cbiAgZmlyc3RQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgc2Vjb25kUGxheWVyLmJvYXJkLnJlc2V0KCk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IGdyaWRFdmVudHMsIHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGZpcnN0VHVybiwgY2hhbmdlVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCwgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcblxuZXhwb3J0IGxldCBwbGF5ZXJPbmUscGxheWVyVHdvO1xuXG5leHBvcnQgY29uc3Qgc2V0dXAgPSAobmFtZU9uZSwgbmFtZVR3bykgPT4ge1xuICBpZighcGxheWVyT25lfHwhcGxheWVyVHdvKXtcbiAgICBsZXQgeCA9IGZhbHNlO1xuXG4gICAgaWYobmFtZVR3byA9PT0gJ2NvbXB1dGVyJyl7XG4gICAgICB4ID0gdHJ1ZTtcbiAgICB9O1xuICAgIFxuICAgIHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihuYW1lT25lKTtcbiAgICBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIobmFtZVR3byx4KTtcbiAgICBncmlkRXZlbnRzKCk7XG4gIH07XG5cbiAgLy90ZW1wb3JhcnkgcGxhY2VtZW50IHNldHVwXG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0EyJywnQTMnLCdBNCddKTtcbiAgLy8gcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnRTMnLCdGMycsJ0czJ10pO1xuICAvLyBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydBMScsJ0IxJywnQzEnLCdEMSddKTtcbiAgLy8gcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQzEwJywnRDEwJywnRTEwJywnRjEwJ10pO1xuXG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0E0JywnQjQnLCdDNCddKTtcbiAgLy8gcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnQTUnLCdBNicsJ0E3J10pO1xuICAvLyBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydFNScsJ0Y1JywnRzUnLCdINSddKTtcbiAgLy8gcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnRTYnLCdFNycsJ0U4JywnRTknXSk7XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG5cbiAgaWYocGxheWVyT25lLmdldFdpbnMoKSA9PT0gMCAmJiBwbGF5ZXJUd28uZ2V0V2lucygpID09PSAwKXtcbiAgICBmaXJzdFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gIH07XG5cbiAgaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuXG4gIGxldCBjb21wdXRlclBsYXllcjtcblxuICBpZihwbGF5ZXJPbmUuY29tcHV0ZXIpe1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyT25lO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5jb21wdXRlcil7XG4gICAgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIH07XG4gIFxuICBpZihjb21wdXRlclBsYXllci5pc1R1cm4pe1xuICAgIGNvbXBUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICB9O1xufTtcbiIsIi8vaW5wdXQgY2VsbCBlbGVtZW50IGRhdGEgYXR0cmlidXRlXG4vL291dHB1dCBhdHRhY2sgY29vcmRpbmF0ZXNcbmV4cG9ydCBjb25zdCBwYXJzZUNlbGxDb29yZGluYXRlID0gKGF0dHJpYnV0ZSkgPT4ge1xuICBpZih0eXBlb2YgYXR0cmlidXRlICE9PSAnc3RyaW5nJyl7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGxldCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoJycpO1xuXG4gIGNvbnN0IGdldExldHRlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBsZXR0ZXJWYWx1ZTtcblxuICAgIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyYXlbMV0pKSkpe1xuICAgICAgbGV0IHR3b0RpZ2l0ID0gYXJyYXkuc2xpY2UoMCwyKTtcbiAgICAgIGxldHRlclZhbHVlID0gdHdvRGlnaXQuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldHRlclZhbHVlID0gYXJyYXlbMF07XG4gICAgfTtcblxuICAgIGxldCBjb2RlVmFsdWUgPSBwYXJzZUludChsZXR0ZXJWYWx1ZSk7XG4gICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoKDY1ICsgY29kZVZhbHVlKSAtIDEpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxldHRlcik7XG4gICAgcmV0dXJuIGxldHRlcjtcbiAgfTtcblxuICBjb25zdCBnZXROdW1iZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbnVtYmVyO1xuICAgIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyYXlbYXJyYXkubGVuZ3RoLTJdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aC0yKTtcbiAgICAgIG51bWJlciA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW1iZXIgPSBhcnJheVthcnJheS5sZW5ndGgtMV07XG4gICAgfTtcbiAgICAvLyBjb25zb2xlLmxvZyhudW1iZXIpO1xuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgbGV0IGxldHRlciA9IGdldExldHRlcihhcnIpO1xuICBsZXQgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG4gIC8vIGNvbnNvbGUubG9nKGxldHRlciArIG51bWJlcik7XG4gIHJldHVybiBsZXR0ZXIgKyBudW1iZXI7XG59O1xuIiwiaW1wb3J0IHsgaGlnaGxpZ2h0LCB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGNoZWNrV2luIH0gZnJvbSBcIi4vY2hlY2tXaW5cIjtcbmltcG9ydCB7IGdhbWVSZXNldCB9IGZyb20gXCIuL2dhbWVSZXNldFwiO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tIFwiLi9nYW1lU3RhcnRcIjtcblxuLy9yYW5kb21seSBjaG9vc2VzIGEgcGxheWVyIHRvIGdvIGZpcnN0XG5leHBvcnQgY29uc3QgZmlyc3RUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxKTtcblxuICBpZihudW1iZXIlMiA9PT0gMCl7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgJHtmaXJzdFBsYXllci5nZXROYW1lKCl9IEdPRVMgRklSU1QuYCk7XG4gIH0gZWxzZSBpZiAobnVtYmVyJTIgIT09IDApe1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke3NlY29uZFBsYXllci5nZXROYW1lKCl9IEdPRVMgRklSU1QuYCk7XG4gIH07XG59O1xuXG4vL2NoYW5nZXMgY3VycmVudCBwbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coYElUIElTIE5PVyAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBpZihzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsdGFyZ2V0KTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGlmKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLHRhcmdldCk7XG4gICAgfTtcbiAgfTtcblxuICAvL1BMQVlFUiBXSU5TXG4gIGlmKGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcikgPT09ICdmaXJzdCcpe1xuICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdmaXJzdCcpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnc2Vjb25kJyl7XG4gICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ3NlY29uZCcpO1xuICAgIHJldHVybjtcbiAgfTtcblxuICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuXG4gIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbXBUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYoZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcbiAgICB9O1xuXG4gICAgLy9DT01QIFdJTlNcbiAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnZmlyc3QnKXtcbiAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdmaXJzdCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ3NlY29uZCcpe1xuICAgICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ3NlY29uZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICAgIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIH0sIDEwMDApO1xufTtcblxuY29uc3QgdHVybldvbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpID0+IHtcbiAgZ2FtZVJlc2V0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIHNldHVwKCk7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIC8vYnJpbmcgdXAgbWVudVxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ2NoZWNrIGNoZWNrJylcbmltcG9ydCAnLi9tb2R1bGVzL2dhbWVMb29wJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==