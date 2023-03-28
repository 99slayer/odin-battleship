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

const gridEvents = () => {
  const cells = document.querySelectorAll('.grid-cell');
  
  //Checks if the cell is a label
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

    //add turn listener
    node.addEventListener('click',(e)=>{
      let cell = e.target;
      let coord = getGridCoordinate(cell);

      if(gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo,cell)){
        return;
      };

      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo,coord);
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
  updateWins(firstPlayer, secondPlayer);
};

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

  changeTurn(firstPlayer,secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
  //IF WON UPDATE DISPLAY WINS THEN STOP GAME
  //RESET GAME
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
    (0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
    //IF WON UPDATE DISPLAY WINS THEN STOP GAME
    //RESET GAME
  }, 1000);
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
const checkWin = (firstPlayer, secondPlayer) => {
  let firstFleet = firstPlayer.board.isFleetSunk();
  let secondFleet = secondPlayer.board.isFleetSunk();

  if(secondFleet){
    firstPlayer.won();
    logWins(firstPlayer, secondPlayer);
  } else if (firstFleet){
    secondPlayer.won();
    logWins(firstPlayer, secondPlayer);
  };

};

const logWins = (firstPlayer, secondPlayer) => {
  console.log(`player1 wins: ${firstPlayer.getWins()}`);
  console.log(`player2 wins: ${secondPlayer.getWins()}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsaUVBQVU7QUFDWixFQUFFLGlFQUFVO0FBQ1osRUFBRSwrQ0FBUTtBQUNWLEVBQUUsK0VBQWM7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLElBQUksMEVBQVM7QUFDYixJQUFJLGlFQUFVO0FBQ2QsSUFBSSxpRUFBVTtBQUNkLElBQUksK0NBQVE7QUFDWixJQUFJLCtFQUFjO0FBQ2xCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtCQUErQixzQkFBc0I7QUFDckQsK0JBQStCLHVCQUF1QjtBQUN0RDs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSxDQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2dyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9tZW51LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVMb29wLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvd2lucy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUdyaWQgPSAoZ3JpZCxncmlkTnVtKSA9PiB7XG4gIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgbGV0IHJvdyA9IGk7XG4gICAgbGV0IGdyaWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoJ2dyaWQtcm93Jyk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1yb3ctJHtpfWApO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKCdkYXRhLXJvdy1udW1iZXInLGAke2l9YCk7XG4gICAgLy9QUk9CQUJMWSBET05UIE5FRUQgSUQgQU5EIERBVEEgQVRUUklCVVRFLCBCVVQgSSdMTCBDT01FIEJBQ0sgVE8gVEhJUy5cbiAgICBmb3IobGV0IGk9MDtpPDExO2krPTEpe1xuICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3dcbiAgICAgIGxldCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKGBncmlkLWNlbGwtJHtncmlkTnVtfWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdpZCcsYGdyaWQtY2VsbC0ke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScsYCR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsYWNrJztcbiAgICAgIGdyaWRSb3cuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgIH07XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChncmlkUm93KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbFJvd3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBbXTtcbiAgICBsZXQgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcblxuICAgIHJvd3MuZm9yRWFjaCgoZSk9PntcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIGxldCBpID0gMTtcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBpZihlLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDBcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBjb25zdCBjZWxsQ29vcmRpbmF0ZSA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgaWYoY2VsbENvb3JkaW5hdGUgPT09ICcwLTAnKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBsYWJlbFJvd3MoKTtcbiAgbGFiZWxDb2x1bW5zKCk7XG59O1xuIiwiY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXJEaXNwbGF5ID0gKHBsYXllciwgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWNvbnQnKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgcGxheWVyTnVtRGlzcGxheS50ZXh0Q29udGVudCA9IGBQTEFZRVIgJHtwbGF5ZXJOdW19YDtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgdHVybi5zZXRBdHRyaWJ1dGUoJ2lkJyxgdHVybi0ke3BsYXllck51bX1gKTtcbiAgaWYocGxheWVyLmlzVHVybil7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICB9IGVsc2UgaWYgKCFwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xuXG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoJ2lkJyxgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB3aW5zLnNldEF0dHJpYnV0ZSgnaWQnLGB3aW5zLSR7cGxheWVyTnVtfWApO1xuICB3aW5zLnRleHRDb250ZW50ID0gYFdpbnM6ICR7cGxheWVyLmdldFdpbnMoKX1gO1xuXG4gIGRpc3BsYXkuYXBwZW5kKHBsYXllck51bURpc3BsYXksbmFtZSx0dXJuLHNoaXBzLHdpbnMpO1xuXG4gIGlmKHBsYXllck51bSA9PT0gMSl7XG4gICAgcGxheWVyT25lRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH0gZWxzZSBpZiAocGxheWVyTnVtID09PSAyKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfTtcbn07XG5cbi8vcGxheWVyI1xuLy9wbGF5ZXIgbmFtZVxuLy9pcyB0dXJuXG4vL2N1cnJlbnQgc2hpcHMgYWxpdmVcbi8vd2lucyIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcblxuY29uc3QgZ2V0R3JpZENvb3JkaW5hdGUgPSAoY2VsbCkgPT4ge1xuICBsZXQgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpKTtcbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuLy9zdG9wcyBwbGF5ZXJzIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCBncmlkcyB3aGVuIHRoZXkgc2hvdWxkbid0IGJlXG5jb25zdCBncmlkTG9naWMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgY2VsbCkgPT4ge1xuICBsZXQgeDtcblxuICAvL3N0b3BzIGZ1bmN0aW9uIGlmIGl0cyBjb21wdXRlcnMgdHVyblxuICBpZihmaXJzdFBsYXllci5pc1R1cm4mJmZpcnN0UGxheWVyLmNvbXB1dGVyKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuJiZzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpe1xuICAgIHggPSB0cnVlO1xuICB9O1xuXG4gIC8vc3RvcHMgcGxheWVyIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCB0aGVpciBvd24gZ3JpZFxuICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTEnKSl7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbC0yJykpe1xuICAgIHggPSB0cnVlO1xuICB9O1xuXG4gIHJldHVybiB4O1xufTtcblxuZXhwb3J0IGNvbnN0IGdyaWRFdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuICBcbiAgLy9DaGVja3MgaWYgdGhlIGNlbGwgaXMgYSBsYWJlbFxuICBjb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT57XG4gICAgY29uc3QgY2VsbElEID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbElEKTtcblxuICAgIGlmKGNvb3JkaW5hdGVbMF09PT0nQCd8fChjb29yZGluYXRlLmxlbmd0aD09PTImJmNvb3JkaW5hdGVbMV09PT0nMCcpKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH07XG5cbiAgY2VsbHMuZm9yRWFjaCgobm9kZSk9PntcbiAgICBpZihjaGVja1RpZXIobm9kZSkpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvL2FkZCB0dXJuIGxpc3RlbmVyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgbGV0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUscGxheWVyVHdvLGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgdHVybihwbGF5ZXJPbmUscGxheWVyVHdvLGNvb3JkKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvL3JlbW92ZSBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGFuZCByZW1vdmUgY2xpY2sgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG5cbiAgICAgIGNlbGwub25tb3VzZXVwID0gKCkgPT57XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5vbm1vdXNlbGVhdmUgPSAoKSA9PntcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vdGVtcG9yYXJpbHkgcmVuZGVyaW5nIGV2ZXJ5dGhpbmcgZm9yIHRlc3RpbmcvZGVidWdnaW5nIHB1cnBvc2VzXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscyxwbGF5ZXIpID0+IHtcbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBhcnIgPSBmbGVldC5yZWR1Y2UoKGFjYyx2YWwpPT5hY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gICAgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil48nO1xuICAgIH0gZWxzZSBpZiAoIShhcnIuaW5jbHVkZXMoY29vcmQpKSYmcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJy8nO1xuICAgIH0gZWxzZSBpZiAoYXJyLmluY2x1ZGVzKGNvb3JkKSl7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXiyc7XG4gICAgfTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzJztcblxuY29uc3QgbWVudU11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtbXVsdGlwbGF5ZXInKTtcbmNvbnN0IG1lbnVOYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LW5hbWVzJyk7XG5jb25zdCBtZW51UnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1ydWxlcycpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLXBsYXllcicpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3by1wbGF5ZXInKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtbmFtZScpO1xuLy8gY29uc3QgcGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XG5cbi8vIGxldCBtdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKG1lbnUpID0+IHtcbiAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxuY29uc3Qgc2hvdyA9IChtZW51KSA9PiB7XG4gbWVudS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbn07XG5cbmNvbnN0IGdldE5hbWVzID0gKCkgPT4ge1xuICBsZXQgcGxheWVyT25lID0gcGxheWVyT25lTmFtZUVsLnZhbHVlO1xuICBsZXQgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gaWYoIW11bHRpcGxheWVyKXtcbiAgLy8gICBwbGF5ZXJUd28gPSAnY29tcHV0ZXInO1xuICAvLyB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lLCBwbGF5ZXJUd29dO1xufTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gIGxldCBuYW1lcyA9IGdldE5hbWVzKCk7XG4gIGxldCBuYW1lT25lID0gbmFtZXNbMF07XG4gIGxldCBuYW1lVHdvID0gbmFtZXNbMV1cblxuICBpZihuYW1lT25lID09PSAnJyB8fCBuYW1lVHdvID09PSAnJyl7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIHNldHVwKG5hbWVPbmUsbmFtZVR3byk7XG4gIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLDEpO1xuICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywyKTtcblxuICBwbGF5ZXJPbmVOYW1lRWwudmFsdWUgPSAnJztcbiAgLy8gcGxheWVyVHdvTmFtZS52YWx1ZSA9ICcnO1xuICBoaWRlKG1lbnVOYW1lcyk7XG59O1xuXG4vL21lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG5cbiAgc2luZ2xlUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGhpZGUobWVudU11bHRpcGxheWVyKTtcbiAgICBzaG93KG1lbnVOYW1lcyk7XG4gICAgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcbiAgfSk7XG5cbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGhpZGUobWVudU11bHRpcGxheWVyKTtcbiAgICBzaG93KG1lbnVOYW1lcyk7XG4gICAgbXVsdGlwbGF5ZXIgPSB0cnVlO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBzdGFydCgpO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbiAgXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvLyBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbi8vIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMicpO1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuICBpZihmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJnNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIH07XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXBsYXllcicpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5jb25zdCB1cGRhdGVUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0xJyk7XG4gIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMicpO1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfTtcbn07XG5cbmNvbnN0IHVwZGF0ZVNoaXBzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgc2hpcHMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBzLTEnKTtcbiAgY29uc3Qgc2hpcHMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBzLTInKTtcbiAgc2hpcHMxLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7Zmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuICBzaGlwczIudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xufTtcblxuY29uc3QgdXBkYXRlV2lucyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHdpbnMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbnMtMScpO1xuICBjb25zdCB3aW5zMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5zLTInKTtcbiAgd2luczEudGV4dENvbnRlbnQgPSBgV2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YDtcbiAgd2luczIudGV4dENvbnRlbnQgPSBgV2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWA7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+e1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBhdHRhY2tzID0gW107XG5cbiAgZnVuY3Rpb24gT0xEcGxhY2UoYXhpcyxzdGFydCxzaXplKXtcbiAgICAvL1ggPT4gaG9yaXpvbnRhbCArIGxldHRlcnNcbiAgICAvL1kgPT4gdmVydGljYWwgKyBudW1iZXJzXG4gICAgaWYoIWF4aXN8fCFzdGFydHx8IXNpemUpe1xuICAgICAgY29uc29sZS5sb2coJ3BhcmFtZXRlciBtaXNzaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzdGFydEFyciA9IHN0YXJ0LnNwbGl0KCcnKTtcbiAgICBsZXQgeCA9IHN0YXJ0QXJyLnNsaWNlKDAsMSk7XG4gICAgbGV0IHkgPSBzdGFydEFyci5zbGljZSgxKS5qb2luKCcnKTtcblxuICAgIC8vdGhyb3dzIGVycm9yIGlmIHNoaXBzIHdvdWxkIGJlIHBsYWNlZCBvdXQgb2YgYm91bmRzXG4gICAgLy90aHJvd3MgZXJyb3JzIGZvciBub3cgbWF5YmUgY2hhbmdlIGxhdGVyKipcbiAgICAvL1RIRSBDT09SRElOQVRFUyBDQU4gQkUgQ0hFQ0tFRCBCRUZPUkUgVEhFWSBBUkUgUEFTU0VEIFRPIFBMQUNFKipcbiAgICBpZigoeFswXS5jaGFyQ29kZUF0KDApK3NpemUpPjc0KXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB4IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9IGVsc2UgaWYgKChwYXJzZUludCh5KStzaXplKT4xMCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NoaXAgZXhjZWVkcyB0aGUgeSBheGlzIG9mIHRoZSBnYW1lYm9hcmQuJyk7XG4gICAgfTtcblxuICAgIC8vQ2hlY2sgaWYgcGxhY2VtZW50IGNvb3JkaW5hdGVzIGNvbmZsaWN0IHdpdGggYW55IG90aGVyIHNoaXBzXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb29yZGluYXRlcyhzaGlwQXhpcyxzaGlwU2l6ZSl7XG4gICAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgICAgaWYoc2hpcEF4aXMgPT09ICdYJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IGxldHRlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBsZXQgbmV3WCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeFswXS5jaGFyQ29kZUF0KDApK2kpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goYCR7bmV3WCArIHl9YCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNoaXBBeGlzID09PSAnWScpe1xuICAgICAgICAvL2luY3JlbWVudCBudW1iZXJzXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2hpcFNpemU7aSs9MSl7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHt4ICsgKHBhcnNlSW50KHkpICsgaSl9YCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfTtcblxuXG4gICAgbGV0IHNoaXAgPSBjcmVhdGVTaGlwKGNyZWF0ZUNvb3JkaW5hdGVzKGF4aXMsc2l6ZSkpO1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gIH07IC8vT0xEIFBMQUNFIEZVTkNUSU9OLCBTVElMTCBVU0VGVUwgQ09ERSBJTiBIRVJFIEZPUiBMQVRFUioqXG5cbiAgY29uc3QgcGxhY2UgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBsZXQgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGlmKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApPT57IHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCl9KTtcblxuICAgIGlmKHNoaXBJbmRleD4tMSl7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH07XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgICAvLyByZXR1cm4gaWYgc2hpcCB3YXMgaGl0L3doaWNoIHNoaXAgd2FzIGhpdD9cbiAgfTtcbiAgXG4gIGNvbnN0IGZsZWV0Q29vcmRpbmF0ZXMgPSAoKSA9PntcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IobGV0IGk9MDtpPHNoaXBzLmxlbmd0aDtpKz0xKXtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApPT57XG4gICAgICBpZihzaGlwLmlzU3VuaygpKXtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZihzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4geyBhdHRhY2tzLCBwbGFjZSwgcmVjZWl2ZUF0dGFjaywgZmxlZXRDb29yZGluYXRlcywgZ2V0U2hpcHNSZW1haW5pbmcsIGlzRmxlZXRTdW5rIH07XG59OyIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2NyZWF0ZUdhbWVib2FyZFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllck5hbWUsaXNDb21wID0gZmFsc2UpID0+e1xuICBjb25zdCBuYW1lID0gcGxheWVyTmFtZTtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBpc0NvbXA7XG4gIGxldCBpc1R1cm4gPSBmYWxzZTtcbiAgbGV0IHdpbnMgPSAwO1xuICBcbiAgY29uc3QgbWFrZUF0dGFjayA9IChlbmVteUJvYXJkLGNvb3JkaW5hdGVzID0gbnVsbCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBjb29yZGluYXRlcztcblxuICAgIGlmKGNvbXB1dGVyKXtcbiAgICAgIHRhcmdldCA9IGdlbmVyYXRlQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH07XG5cbiAgICAvL01BWSBOT1QgTkVFRFxuICAgIGlmKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIGNvbnNvbGUubG9nKCdzcXVhcmUgaGFzIGFscmVhZHkgYmVlbiBoaXQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuXG4gIC8vIGNvbnN0IHBsYWNlRmxlZXQgPSAoKSA9PiB7XG5cbiAgLy8gfTtcbiAgXG4gIGNvbnN0IGdlbmVyYXRlQXR0YWNrID0gKGVuZW15Qm9hcmQsZ2VuID0gMSkgPT4ge1xuICAgIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc0IC0gNjUgKyAxKSApICsgNjU7XG4gICAgfTtcblxuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgbGV0IHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcblxuICAgIC8vY2hlY2tzIGlmIHNxdWFyZXMgaGF2ZSBhbHJlYWR5IGJlZW4gaGl0XG4gICAgaWYoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgZG97XG4gICAgICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKTtcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICBjb25zdCB3b24gPSAoKSA9PiB7XG4gICAgd2lucyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGdldFdpbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHdpbnM7XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGNvbXB1dGVyLCBpc1R1cm4sIG1ha2VBdHRhY2ssIGdldE5hbWUsIHdvbiwgZ2V0V2lucyB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVBcnJheSkgPT57XG4gIGxldCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVBcnJheTtcbiAgbGV0IGxlbmd0aCA9IGNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZihsZW5ndGggPT09IGRhbWFnZSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0RGFtYWdlID0gKCkgPT4ge1xuICAgIHJldHVybiBkYW1hZ2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBnZXREYW1hZ2UgfTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4uL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIlxuaW1wb3J0IHsgZ3JpZEV2ZW50cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG4vL1NFVCBVUCBCQVNFIEdSSURcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWdyaWQnKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1ncmlkJyk7XG5cbmNyZWF0ZUdyaWQocGxheWVyT25lR3JpZCwxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwyKTtcbi8vIGdyaWRFdmVudHMoKTtcblxuLy9ET05UIFNUQVJUIExPT1AgVU5USUwgU1RBUlQgQlVUVE9OIElTIENMSUNLRURcblxuLy8gd2hpbGUoIShwbGF5ZXJPbmUuYm9hcmQuaXNGbGVldFN1bmsoKSkmJiEocGxheWVyVHdvLmJvYXJkLmlzRmxlZXRTdW5rKCkpKXtcbi8vICAgdHVybihwbGF5ZXJPbmUscGxheWVyVHdvLHRhcmdldFByb21pc2UpO1xuLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4vLyAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcbi8vIH07XG5cblxuLy9kbyBnYW1lIGxvb3AgaWYgZmFjaW5nIGEgY29tcHV0ZXIsIGJ1dCBub3QgaWYgcGxheWluZyAyIHBsYXllcj8/Pz8qKioqXG5cblxuLy9kZWNsYXJlIHdpbm5lclxuXG4vL2RlY2lkZSB3aG8gZ29lcyBmaXJzdCAocGxheWVyIG9uZSBnb2VzIGZpcnN0Pylcbi8vdHVybiBmdW5jdGlvblxuXG4vL0ZJR1VSRSBPVVQgVFVSTlMgTkVYVFxuXG4vL1YgTE9PUCBWXG4vL2FsdGVybmF0ZSB0dXJucyB1bnRpbCB0aGVyZSdzIGEgd2lubmVyXG4vL2FkZCB3aW4gdG8gdGhhdCBwbGF5ZXJcbi8vbG9vc2luZyBwbGF5ZXIgZ2V0cyB0byBnbyBmaXJzdFxuXG4vL2lmIGltcGxlbWVudGVkIHlvdSBzaG91bGQgYmUgYWJsZSB0byByZXN0YXJ0IGEgZ2FtZSBvciBjaGFuZ2UgdGhlIHJ1bGVzIGF0IGFueXRpbWVcbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuLi9mYWN0b3JpZXMvY3JlYXRlUGxheWVyXCI7XG5pbXBvcnQgeyBncmlkRXZlbnRzLCByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBmaXJzdFR1cm4sIGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyBoaWdobGlnaHQsIHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgY29tcFR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBsZXQgcGxheWVyT25lLHBsYXllclR3bztcblxuZXhwb3J0IGNvbnN0IHNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgbGV0IHggPSBmYWxzZTtcblxuICBpZihuYW1lVHdvID09PSAnY29tcHV0ZXInKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcbiAgXG4gIHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihuYW1lT25lKTtcbiAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28seCk7XG5cbiAgZ3JpZEV2ZW50cygpO1xuXG4gIC8vdGVtcG9yYXJ5IHBsYWNlbWVudCBzZXR1cFxuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydBMicsJ0EzJywnQTQnXSk7XG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0UzJywnRjMnLCdHMyddKTtcbiAgcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQTEnLCdCMScsJ0MxJywnRDEnXSk7XG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0MxMCcsJ0QxMCcsJ0UxMCcsJ0YxMCddKTtcblxuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydBNCcsJ0I0JywnQzQnXSk7XG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0E1JywnQTYnLCdBNyddKTtcbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnRTUnLCdGNScsJ0c1JywnSDUnXSk7XG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0U2JywnRTcnLCdFOCcsJ0U5J10pO1xuXG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJykscGxheWVyT25lKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuXG4gIGZpcnN0VHVybihwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuXG4gIGxldCBjb21wdXRlclBsYXllcjtcblxuICBpZihwbGF5ZXJPbmUuY29tcHV0ZXIpe1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyT25lO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5jb21wdXRlcil7XG4gICAgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIH07XG4gIFxuICBpZihjb21wdXRlclBsYXllci5pc1R1cm4pe1xuICAgIGNvbXBUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgaWYocGxheWVyT25lLmlzVHVybiYmcGxheWVyT25lLmNvbXB1dGVyKXtcbiAgICAvLyAgICAgcGxheWVyT25lLm1ha2VBdHRhY2socGxheWVyVHdvLmJvYXJkKTtcbiAgICAvLyAgIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmcGxheWVyVHdvLmNvbXB1dGVyKXtcbiAgICAvLyAgICAgcGxheWVyVHdvLm1ha2VBdHRhY2socGxheWVyT25lLmJvYXJkKTtcbiAgICAvLyAgIH07XG5cbiAgICAvLyAgIGNoYW5nZVR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gICAgLy8gICBoaWdobGlnaHQocGxheWVyT25lLHBsYXllclR3byk7XG4gICAgLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gICAgLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG4gICAgLy8gICB1cGRhdGVEaXNwbGF5cyhwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgICAvLyB9LCAyMDAwKTtcbiAgfTtcbn07XG4iLCIvL2lucHV0IGNlbGwgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZVxuLy9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYodHlwZW9mIGF0dHJpYnV0ZSAhPT0gJ3N0cmluZycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBsZXQgYXJyID0gYXR0cmlidXRlLnNwbGl0KCcnKTtcblxuICBjb25zdCBnZXRMZXR0ZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbGV0dGVyVmFsdWU7XG5cbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5WzFdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsMik7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH07XG5cbiAgICBsZXQgY29kZVZhbHVlID0gcGFyc2VJbnQobGV0dGVyVmFsdWUpO1xuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCg2NSArIGNvZGVWYWx1ZSkgLSAxKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsZXR0ZXIpO1xuICAgIHJldHVybiBsZXR0ZXI7XG4gIH07XG5cbiAgY29uc3QgZ2V0TnVtYmVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IG51bWJlcjtcbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5W2FycmF5Lmxlbmd0aC0yXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGgtMik7XG4gICAgICBudW1iZXIgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoLTFdO1xuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9O1xuXG4gIGxldCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgbGV0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuICAvLyBjb25zb2xlLmxvZyhsZXR0ZXIgKyBudW1iZXIpO1xuICByZXR1cm4gbGV0dGVyICsgbnVtYmVyO1xufTtcbiIsImltcG9ydCB7IGhpZ2hsaWdodCwgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL3dpbnNcIjtcblxuZXhwb3J0IGNvbnN0IGZpcnN0VHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTApICsgMSk7XG5cbiAgaWYobnVtYmVyJTIgPT09IDApe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9IGVsc2UgaWYgKG51bWJlciUyICE9PSAwKXtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGlmKHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCx0YXJnZXQpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsdGFyZ2V0KTtcbiAgICB9O1xuICB9O1xuXG4gIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIC8vSUYgV09OIFVQREFURSBESVNQTEFZIFdJTlMgVEhFTiBTVE9QIEdBTUVcbiAgLy9SRVNFVCBHQU1FXG4gIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbXBUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYoZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcbiAgICB9O1xuXG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgICBjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgLy9JRiBXT04gVVBEQVRFIERJU1BMQVkgV0lOUyBUSEVOIFNUT1AgR0FNRVxuICAgIC8vUkVTRVQgR0FNRVxuICB9LCAxMDAwKTtcbn07XG4iLCJleHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgZmlyc3RGbGVldCA9IGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCk7XG4gIGxldCBzZWNvbmRGbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpO1xuXG4gIGlmKHNlY29uZEZsZWV0KXtcbiAgICBmaXJzdFBsYXllci53b24oKTtcbiAgICBsb2dXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKGZpcnN0RmxlZXQpe1xuICAgIHNlY29uZFBsYXllci53b24oKTtcbiAgICBsb2dXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9O1xuXG59O1xuXG5jb25zdCBsb2dXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc29sZS5sb2coYHBsYXllcjEgd2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YCk7XG4gIGNvbnNvbGUubG9nKGBwbGF5ZXIyIHdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdjaGVjayBjaGVjaycpXG5pbXBvcnQgJy4vbW9kdWxlcy9nYW1lTG9vcCc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=