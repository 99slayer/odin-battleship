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
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer);
  //IF WON STOP GAME
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
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.updateDisplays)(firstPlayer,secondPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    (0,_wins__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer);
    //IF WON STOP GAME
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNKO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSwwRUFBUztBQUNYLEVBQUUsK0VBQWM7QUFDaEIsRUFBRSxpRUFBVTtBQUNaLEVBQUUsaUVBQVU7QUFDWixFQUFFLCtDQUFRO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBLElBQUksMEVBQVM7QUFDYixJQUFJLCtFQUFjO0FBQ2xCLElBQUksaUVBQVU7QUFDZCxJQUFJLGlFQUFVO0FBQ2QsSUFBSSwrQ0FBUTtBQUNaO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLCtCQUErQixzQkFBc0I7QUFDckQsK0JBQStCLHVCQUF1QjtBQUN0RDs7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQSxDQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2dyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9tZW51LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVMb29wLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvd2lucy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUdyaWQgPSAoZ3JpZCxncmlkTnVtKSA9PiB7XG4gIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgbGV0IHJvdyA9IGk7XG4gICAgbGV0IGdyaWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoJ2dyaWQtcm93Jyk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1yb3ctJHtpfWApO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKCdkYXRhLXJvdy1udW1iZXInLGAke2l9YCk7XG4gICAgLy9QUk9CQUJMWSBET05UIE5FRUQgSUQgQU5EIERBVEEgQVRUUklCVVRFLCBCVVQgSSdMTCBDT01FIEJBQ0sgVE8gVEhJUy5cbiAgICBmb3IobGV0IGk9MDtpPDExO2krPTEpe1xuICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3dcbiAgICAgIGxldCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKGBncmlkLWNlbGwtJHtncmlkTnVtfWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdpZCcsYGdyaWQtY2VsbC0ke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScsYCR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsYWNrJztcbiAgICAgIGdyaWRSb3cuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgIH07XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChncmlkUm93KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbFJvd3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBbXTtcbiAgICBsZXQgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcblxuICAgIHJvd3MuZm9yRWFjaCgoZSk9PntcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIGxldCBpID0gMTtcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBpZihlLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDBcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBjb25zdCBjZWxsQ29vcmRpbmF0ZSA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgaWYoY2VsbENvb3JkaW5hdGUgPT09ICcwLTAnKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBsYWJlbFJvd3MoKTtcbiAgbGFiZWxDb2x1bW5zKCk7XG59O1xuIiwiY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXJEaXNwbGF5ID0gKHBsYXllciwgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWNvbnQnKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgcGxheWVyTnVtRGlzcGxheS50ZXh0Q29udGVudCA9IGBQTEFZRVIgJHtwbGF5ZXJOdW19YDtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgdHVybi5zZXRBdHRyaWJ1dGUoJ2lkJyxgdHVybi0ke3BsYXllck51bX1gKTtcbiAgaWYocGxheWVyLmlzVHVybil7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICB9IGVsc2UgaWYgKCFwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xuXG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoJ2lkJyxgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB3aW5zLnNldEF0dHJpYnV0ZSgnaWQnLGB3aW5zLSR7cGxheWVyTnVtfWApO1xuICB3aW5zLnRleHRDb250ZW50ID0gYFdpbnM6ICR7cGxheWVyLmdldFdpbnMoKX1gO1xuXG4gIGRpc3BsYXkuYXBwZW5kKHBsYXllck51bURpc3BsYXksbmFtZSx0dXJuLHNoaXBzLHdpbnMpO1xuXG4gIGlmKHBsYXllck51bSA9PT0gMSl7XG4gICAgcGxheWVyT25lRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH0gZWxzZSBpZiAocGxheWVyTnVtID09PSAyKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfTtcbn07XG5cbi8vcGxheWVyI1xuLy9wbGF5ZXIgbmFtZVxuLy9pcyB0dXJuXG4vL2N1cnJlbnQgc2hpcHMgYWxpdmVcbi8vd2lucyIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcblxuY29uc3QgZ2V0R3JpZENvb3JkaW5hdGUgPSAoY2VsbCkgPT4ge1xuICBsZXQgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpKTtcbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuLy9PTkxZIENMSUNLSU5HIE9OIFRIRSBFTkVNWSBHUklEIFNIT1VMRCBCRSBBQkxFIFRPIEFUVEFDS1xuLy9PTkxZIEhPVkVSSU5HIE9OIFRIRSBFTkVNWSBHUklEIFNIT1VMRCBDSEFOR0UgQ0VMTCBDT0xPUlxuXG5leHBvcnQgY29uc3QgZ3JpZEV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsJyk7XG4gIFxuICAvL0NoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGNvbHVtbiBvciByb3cgbGFiZWxcbiAgY29uc3QgY2hlY2tUaWVyID0gKGNlbGwpID0+e1xuICAgIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgIGNvbnN0IGNvb3JkaW5hdGUgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxJRCk7XG5cbiAgICBpZihjb29yZGluYXRlWzBdPT09J0AnfHwoY29vcmRpbmF0ZS5sZW5ndGg9PT0yJiZjb29yZGluYXRlWzFdPT09JzAnKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9O1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICAvL05FRUQgVE8gTUFLRSBJVCBTTyBZT1UgQ0FOVCBBVFRBQ0sgV0hFTiBJVFMgTk9UIFlPVVIgVFVSTlxuICAgICAgLy9BTFNPIE1BS0UgU1VSRSBZT1UgQ0FOVCBBVFRBQ0sgSUYgWU9VIERPTlQgQ0xJQ0sgT04gVEhFIENPUlJFQ1QgR1JJRFxuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZihwbGF5ZXJUd28uY29tcHV0ZXImJnBsYXllclR3by5pc1R1cm4pe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTEnKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbC0yJykpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgXG4gICAgICB0dXJuKHBsYXllck9uZSxwbGF5ZXJUd28sY29vcmQpO1xuICAgIH0pO1xuICB9KTtcblxuICBjZWxscy5mb3JFYWNoKChub2RlKT0+e1xuICAgIGlmKGNoZWNrVGllcihub2RlKSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIC8vc3RvcHMgaG92ZXIgZnJvbSB3b3JraW5nIGlmIGl0cyBjb21wdXRlcnMgdHVyblxuICAgICAgaWYocGxheWVyT25lLmlzVHVybiYmcGxheWVyT25lLmNvbXB1dGVyKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuJiZwbGF5ZXJUd28uY29tcHV0ZXIpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTEnKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbC0yJykpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMTY3LCAxNjcsIDE2NyknO1xuICAgIH0pO1xuXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG51bGw7XG4gICAgfSk7XG5cbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT57XG4gICAgICBpZihwbGF5ZXJPbmUuaXNUdXJuJiZwbGF5ZXJPbmUuY29tcHV0ZXIpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJnBsYXllclR3by5jb21wdXRlcil7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibGFjayc7XG4gICAgfSk7XG5cbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vL1NIT1VMRE4nVCBSRU5ERVIgUExBWUVSIFRXTyBTSElQUyBJRiBQTEFZSU5HIEFHQUlOU1QgQ09NUFVURVJcbi8vSUYgVFdPIFBMQVlFUiBTSE9VTEROVCBSRU5ERVIgRUlUSEVSIFBMQVlFUlMgU0hJUFNcbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKGNlbGxzLHBsYXllcikgPT4ge1xuICBjb25zdCBmbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGFyciA9IGZsZWV0LnJlZHVjZSgoYWNjLHZhbCk9PmFjYy5jb25jYXQodmFsKSk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCk9PntcbiAgICBsZXQgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpKTtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGNvb3JkKSYmcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXjyc7XG4gICAgfSBlbHNlIGlmICghKGFyci5pbmNsdWRlcyhjb29yZCkpJiZwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAnLyc7XG4gICAgfSBlbHNlIGlmIChhcnIuaW5jbHVkZXMoY29vcmQpKXtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAn4peLJztcbiAgICB9O1xuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBzZXR1cCB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnQnO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyRGlzcGxheSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXMnO1xuXG5jb25zdCBtZW51TXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1tdWx0aXBsYXllcicpO1xuY29uc3QgbWVudU5hbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtbmFtZXMnKTtcbmNvbnN0IG1lbnVSdWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LXJ1bGVzJyk7XG5cbmNvbnN0IHNpbmdsZVBsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGUtcGxheWVyJyk7XG5jb25zdCB0d29QbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHdvLXBsYXllcicpO1xuXG5jb25zdCBwbGF5ZXJPbmVOYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1uYW1lJyk7XG4vLyBjb25zdCBwbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tbmFtZScpO1xuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcblxuLy8gbGV0IG11bHRpcGxheWVyID0gZmFsc2U7XG5cbmNvbnN0IGhpZGUgPSAobWVudSkgPT4ge1xuICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59O1xuXG5jb25zdCBzaG93ID0gKG1lbnUpID0+IHtcbiBtZW51LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGxldCBwbGF5ZXJPbmUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWU7XG4gIGxldCBwbGF5ZXJUd28gPSAnY29tcHV0ZXInO1xuICAvLyBpZighbXVsdGlwbGF5ZXIpe1xuICAvLyAgIHBsYXllclR3byA9ICdjb21wdXRlcic7XG4gIC8vIH07XG5cbiAgcmV0dXJuIFtwbGF5ZXJPbmUsIHBsYXllclR3b107XG59O1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgbGV0IG5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgbGV0IG5hbWVPbmUgPSBuYW1lc1swXTtcbiAgbGV0IG5hbWVUd28gPSBuYW1lc1sxXVxuXG4gIGlmKG5hbWVPbmUgPT09ICcnIHx8IG5hbWVUd28gPT09ICcnKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgc2V0dXAobmFtZU9uZSxuYW1lVHdvKTtcbiAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJPbmUsMSk7XG4gIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyVHdvLDIpO1xuXG4gIHBsYXllck9uZU5hbWVFbC52YWx1ZSA9ICcnO1xuICAvLyBwbGF5ZXJUd29OYW1lLnZhbHVlID0gJyc7XG4gIGhpZGUobWVudU5hbWVzKTtcbn07XG5cbi8vbWVudSBpbnRlcmFjdGlvbiBldmVudHNcbmV4cG9ydCBjb25zdCBtZW51RXZlbnRzID0gKCgpID0+IHtcblxuICBzaW5nbGVQbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgaGlkZShtZW51TXVsdGlwbGF5ZXIpO1xuICAgIHNob3cobWVudU5hbWVzKTtcbiAgICBtdWx0aXBsYXllciA9IGZhbHNlO1xuICB9KTtcblxuICB0d29QbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgaGlkZShtZW51TXVsdGlwbGF5ZXIpO1xuICAgIHNob3cobWVudU5hbWVzKTtcbiAgICBtdWx0aXBsYXllciA9IHRydWU7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIHN0YXJ0KCk7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywoZSk9PntcbiAgICBpZihlLmtleSA9PT0gJ0VudGVyJyl7XG4gICAgICBzdGFydCgpO1xuICAgIH07XG4gIH0pO1xuICBcbiAgcGxheWVyT25lTmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywoZSk9PntcbiAgICBpZihlLmtleSA9PT0gJ0VudGVyJyl7XG4gICAgICBzdGFydCgpO1xuICAgIH07XG4gIH0pO1xufSkoKTtcbiIsIi8vIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMScpO1xuLy8gY29uc3QgdHVybjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0yJyk7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuICBjb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZGlzcGxheScpO1xuXG4gIGlmKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwICYmc2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwKXtcbiAgICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgfTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXBsYXllcicpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcGxheWVyJyk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRGlzcGxheXMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICB1cGRhdGVUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVTaGlwcyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgLy8gdXBkYXRlV2lucyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbiAgY29uc3QgdHVybjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0yJyk7XG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xufTtcblxuY29uc3QgdXBkYXRlU2hpcHMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBzaGlwczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMtMScpO1xuICBjb25zdCBzaGlwczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMtMicpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG4vLyBjb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbi8vICAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0xJyk7XG4vLyAgIGNvbnN0IHdpbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbnMtMicpO1xuLy8gfTtcbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9jcmVhdGVTaGlwXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PntcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIE9MRHBsYWNlKGF4aXMsc3RhcnQsc2l6ZSl7XG4gICAgLy9YID0+IGhvcml6b250YWwgKyBsZXR0ZXJzXG4gICAgLy9ZID0+IHZlcnRpY2FsICsgbnVtYmVyc1xuICAgIGlmKCFheGlzfHwhc3RhcnR8fCFzaXplKXtcbiAgICAgIGNvbnNvbGUubG9nKCdwYXJhbWV0ZXIgbWlzc2luZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBsZXQgc3RhcnRBcnIgPSBzdGFydC5zcGxpdCgnJyk7XG4gICAgbGV0IHggPSBzdGFydEFyci5zbGljZSgwLDEpO1xuICAgIGxldCB5ID0gc3RhcnRBcnIuc2xpY2UoMSkuam9pbignJyk7XG5cbiAgICAvL3Rocm93cyBlcnJvciBpZiBzaGlwcyB3b3VsZCBiZSBwbGFjZWQgb3V0IG9mIGJvdW5kc1xuICAgIC8vdGhyb3dzIGVycm9ycyBmb3Igbm93IG1heWJlIGNoYW5nZSBsYXRlcioqXG4gICAgLy9USEUgQ09PUkRJTkFURVMgQ0FOIEJFIENIRUNLRUQgQkVGT1JFIFRIRVkgQVJFIFBBU1NFRCBUTyBQTEFDRSoqXG4gICAgaWYoKHhbMF0uY2hhckNvZGVBdCgwKStzaXplKT43NCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NoaXAgZXhjZWVkcyB0aGUgeCBheGlzIG9mIHRoZSBnYW1lYm9hcmQuJyk7XG4gICAgfSBlbHNlIGlmICgocGFyc2VJbnQoeSkrc2l6ZSk+MTApe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaGlwIGV4Y2VlZHMgdGhlIHkgYXhpcyBvZiB0aGUgZ2FtZWJvYXJkLicpO1xuICAgIH07XG5cbiAgICAvL0NoZWNrIGlmIHBsYWNlbWVudCBjb29yZGluYXRlcyBjb25mbGljdCB3aXRoIGFueSBvdGhlciBzaGlwc1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29vcmRpbmF0ZXMoc2hpcEF4aXMsc2hpcFNpemUpe1xuICAgICAgbGV0IGNvb3JkaW5hdGVzID0gW107XG5cbiAgICAgIGlmKHNoaXBBeGlzID09PSAnWCcpe1xuICAgICAgICAvL2luY3JlbWVudCBsZXR0ZXJzXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2hpcFNpemU7aSs9MSl7XG4gICAgICAgICAgbGV0IG5ld1ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHhbMF0uY2hhckNvZGVBdCgwKStpKTtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGAke25ld1ggKyB5fWApO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChzaGlwQXhpcyA9PT0gJ1knKXtcbiAgICAgICAgLy9pbmNyZW1lbnQgbnVtYmVyc1xuICAgICAgICBmb3IobGV0IGk9MDtpPHNoaXBTaXplO2krPTEpe1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goYCR7eCArIChwYXJzZUludCh5KSArIGkpfWApO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICAgIH07XG5cblxuICAgIGxldCBzaGlwID0gY3JlYXRlU2hpcChjcmVhdGVDb29yZGluYXRlcyhheGlzLHNpemUpKTtcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xuICB9OyAvL09MRCBQTEFDRSBGVU5DVElPTiwgU1RJTEwgVVNFRlVMIENPREUgSU4gSEVSRSBGT1IgTEFURVIqKlxuXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgbGV0IG5ld1NoaXAgPSBjcmVhdGVTaGlwKGNvb3JkaW5hdGVzKTtcbiAgICBzaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIHJldHVybiBuZXdTaGlwO1xuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh0YXJnZXQpID0+IHtcbiAgICBpZihhdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBsZXQgc2hpcEluZGV4ID0gc2hpcHMuZmluZEluZGV4KChzaGlwKT0+eyByZXR1cm4gc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyh0YXJnZXQpfSk7XG5cbiAgICBpZihzaGlwSW5kZXg+LTEpe1xuICAgICAgc2hpcHNbc2hpcEluZGV4XS5oaXQoKTtcbiAgICB9O1xuXG4gICAgYXR0YWNrcy5wdXNoKHRhcmdldCk7XG4gICAgLy8gcmV0dXJuIGlmIHNoaXAgd2FzIGhpdC93aGljaCBzaGlwIHdhcyBoaXQ/XG4gIH07XG4gIFxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT57XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yKGxldCBpPTA7aTxzaGlwcy5sZW5ndGg7aSs9MSl7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHNSZW1haW5pbmcgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgaWYoc2hpcC5pc1N1bmsoKSl7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwcy5sZW5ndGggLSBzaGlwc1N1bms7XG4gIH07XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiB7XG4gICAgaWYoc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrcywgcGxhY2UsIHJlY2VpdmVBdHRhY2ssIGZsZWV0Q29vcmRpbmF0ZXMsIGdldFNoaXBzUmVtYWluaW5nLCBpc0ZsZWV0U3VuayB9O1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLGlzQ29tcCA9IGZhbHNlKSA9PntcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBsZXQgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcbiAgXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCxjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZihjb21wdXRlcil7XG4gICAgICB0YXJnZXQgPSBnZW5lcmF0ZUF0dGFjayhlbmVteUJvYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gYXR0YWNrcyAke3RhcmdldH1gKTtcbiAgICB9O1xuXG4gICAgLy9NQVkgTk9UIE5FRURcbiAgICBpZihlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICBjb25zb2xlLmxvZygnc3F1YXJlIGhhcyBhbHJlYWR5IGJlZW4gaGl0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgfTtcblxuICAvLyBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuXG4gIC8vIH07XG4gIFxuICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9IChlbmVteUJvYXJkLGdlbiA9IDEpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkgKSArIDY1O1xuICAgIH07XG5cbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgIGxldCB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG5cbiAgICAvL2NoZWNrcyBpZiBzcXVhcmVzIGhhdmUgYWxyZWFkeSBiZWVuIGhpdFxuICAgIGlmKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIGRve1xuICAgICAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhgY29tcHV0ZXIgYXR0YWNrcyAke3RhcmdldH1gKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3Qgd29uID0gKCkgPT4ge1xuICAgIHdpbnMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCB3b24sIGdldFdpbnMgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlQXJyYXkpID0+e1xuICBsZXQgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQXJyYXk7XG4gIGxldCBsZW5ndGggPSBjb29yZGluYXRlcy5sZW5ndGg7XG4gIGxldCBkYW1hZ2UgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBkYW1hZ2UgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYobGVuZ3RoID09PSBkYW1hZ2Upe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGdldERhbWFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gZGFtYWdlO1xuICB9O1xuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBoaXQsIGlzU3VuaywgZ2V0RGFtYWdlIH07XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkXCJcbmltcG9ydCB7IGdyaWRFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IG1lbnVFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcblxuLy9TRVQgVVAgQkFTRSBHUklEXG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1ncmlkJyk7XG5jb25zdCBwbGF5ZXJUd29HcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZ3JpZCcpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsMSk7XG5jcmVhdGVHcmlkKHBsYXllclR3b0dyaWQsMik7XG4vLyBncmlkRXZlbnRzKCk7XG5cbi8vRE9OVCBTVEFSVCBMT09QIFVOVElMIFNUQVJUIEJVVFRPTiBJUyBDTElDS0VEXG5cbi8vIHdoaWxlKCEocGxheWVyT25lLmJvYXJkLmlzRmxlZXRTdW5rKCkpJiYhKHBsYXllclR3by5ib2FyZC5pc0ZsZWV0U3VuaygpKSl7XG4vLyAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byx0YXJnZXRQcm9taXNlKTtcbi8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxwbGF5ZXJPbmUpO1xuLy8gICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG4vLyB9O1xuXG5cbi8vZG8gZ2FtZSBsb29wIGlmIGZhY2luZyBhIGNvbXB1dGVyLCBidXQgbm90IGlmIHBsYXlpbmcgMiBwbGF5ZXI/Pz8/KioqKlxuXG5cbi8vZGVjbGFyZSB3aW5uZXJcblxuLy9kZWNpZGUgd2hvIGdvZXMgZmlyc3QgKHBsYXllciBvbmUgZ29lcyBmaXJzdD8pXG4vL3R1cm4gZnVuY3Rpb25cblxuLy9GSUdVUkUgT1VUIFRVUk5TIE5FWFRcblxuLy9WIExPT1AgVlxuLy9hbHRlcm5hdGUgdHVybnMgdW50aWwgdGhlcmUncyBhIHdpbm5lclxuLy9hZGQgd2luIHRvIHRoYXQgcGxheWVyXG4vL2xvb3NpbmcgcGxheWVyIGdldHMgdG8gZ28gZmlyc3RcblxuLy9pZiBpbXBsZW1lbnRlZCB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gcmVzdGFydCBhIGdhbWUgb3IgY2hhbmdlIHRoZSBydWxlcyBhdCBhbnl0aW1lXG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgZ3JpZEV2ZW50cywgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjaGFuZ2VUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuaW1wb3J0IHsgaGlnaGxpZ2h0LCB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IGNvbXBUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuXG5leHBvcnQgbGV0IHBsYXllck9uZSxwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChuYW1lT25lLCBuYW1lVHdvKSA9PiB7XG4gIGxldCB4ID0gZmFsc2U7XG5cbiAgaWYobmFtZVR3byA9PT0gJ2NvbXB1dGVyJyl7XG4gICAgeCA9IHRydWU7XG4gIH07XG4gIFxuICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gIHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihuYW1lVHdvLHgpO1xuXG4gIGdyaWRFdmVudHMoKTtcblxuICAvL3RlbXBvcmFyeSBwbGFjZW1lbnQgc2V0dXBcbiAgcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQTInLCdBMycsJ0E0J10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydFMycsJ0YzJywnRzMnXSk7XG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0ExJywnQjEnLCdDMScsJ0QxJ10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydDMTAnLCdEMTAnLCdFMTAnLCdGMTAnXSk7XG5cbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnQTQnLCdCNCcsJ0M0J10pO1xuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydBNScsJ0E2JywnQTcnXSk7XG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0U1JywnRjUnLCdHNScsJ0g1J10pO1xuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydFNicsJ0U3JywnRTgnLCdFOSddKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcblxuICBmaXJzdFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcblxuICBsZXQgY29tcHV0ZXJQbGF5ZXI7XG5cbiAgaWYocGxheWVyT25lLmNvbXB1dGVyKXtcbiAgICBjb21wdXRlclBsYXllciA9IHBsYXllck9uZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uY29tcHV0ZXIpe1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyVHdvO1xuICB9O1xuICBcbiAgaWYoY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKXtcbiAgICBjb21wVHVybihwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgIGlmKHBsYXllck9uZS5pc1R1cm4mJnBsYXllck9uZS5jb21wdXRlcil7XG4gICAgLy8gICAgIHBsYXllck9uZS5tYWtlQXR0YWNrKHBsYXllclR3by5ib2FyZCk7XG4gICAgLy8gICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJnBsYXllclR3by5jb21wdXRlcil7XG4gICAgLy8gICAgIHBsYXllclR3by5tYWtlQXR0YWNrKHBsYXllck9uZS5ib2FyZCk7XG4gICAgLy8gICB9O1xuXG4gICAgLy8gICBjaGFuZ2VUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIC8vICAgaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIC8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxwbGF5ZXJPbmUpO1xuICAgIC8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuICAgIC8vICAgdXBkYXRlRGlzcGxheXMocGxheWVyT25lLHBsYXllclR3byk7XG4gICAgLy8gfSwgMjAwMCk7XG4gIH07XG59O1xuIiwiLy9pbnB1dCBjZWxsIGVsZW1lbnQgZGF0YSBhdHRyaWJ1dGVcbi8vb3V0cHV0IGF0dGFjayBjb29yZGluYXRlc1xuZXhwb3J0IGNvbnN0IHBhcnNlQ2VsbENvb3JkaW5hdGUgPSAoYXR0cmlidXRlKSA9PiB7XG4gIGlmKHR5cGVvZiBhdHRyaWJ1dGUgIT09ICdzdHJpbmcnKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgbGV0IGFyciA9IGF0dHJpYnV0ZS5zcGxpdCgnJyk7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYoIShpc05hTihwYXJzZUludChhcnJheVsxXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZSgwLDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0dGVyVmFsdWUgPSBhcnJheVswXTtcbiAgICB9O1xuXG4gICAgbGV0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgoNjUgKyBjb2RlVmFsdWUpIC0gMSk7XG4gICAgLy8gY29uc29sZS5sb2cobGV0dGVyKTtcbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYoIShpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGgtMl0pKSkpe1xuICAgICAgbGV0IHR3b0RpZ2l0ID0gYXJyYXkuc2xpY2UoYXJyYXkubGVuZ3RoLTIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciA9IGFycmF5W2FycmF5Lmxlbmd0aC0xXTtcbiAgICB9O1xuICAgIC8vIGNvbnNvbGUubG9nKG51bWJlcik7XG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBsZXQgbGV0dGVyID0gZ2V0TGV0dGVyKGFycik7XG4gIGxldCBudW1iZXIgPSBnZXROdW1iZXIoYXJyKTtcbiAgLy8gY29uc29sZS5sb2cobGV0dGVyICsgbnVtYmVyKTtcbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQsIHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi93aW5zXCI7XG5cbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEpO1xuXG4gIGlmKG51bWJlciUyID09PSAwKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfSBlbHNlIGlmIChudW1iZXIlMiAhPT0gMCl7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coYElUIElTIE5PVyAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBpZihzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsdGFyZ2V0KTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGlmKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLHRhcmdldCk7XG4gICAgfTtcbiAgfTtcblxuICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICBjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAvL0lGIFdPTiBTVE9QIEdBTUVcbiAgLy9SRVNFVCBHQU1FXG4gIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbXBUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYoZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcbiAgICB9O1xuXG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICAgIGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgLy9JRiBXT04gU1RPUCBHQU1FXG4gICAgLy9SRVNFVCBHQU1FXG4gIH0sIDEwMDApO1xufTtcbiIsImV4cG9ydCBjb25zdCBjaGVja1dpbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGxldCBmaXJzdEZsZWV0ID0gZmlyc3RQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKTtcbiAgbGV0IHNlY29uZEZsZWV0ID0gc2Vjb25kUGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCk7XG5cbiAgaWYoc2Vjb25kRmxlZXQpe1xuICAgIGZpcnN0UGxheWVyLndvbigpO1xuICAgIGxvZ1dpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH0gZWxzZSBpZiAoZmlyc3RGbGVldCl7XG4gICAgc2Vjb25kUGxheWVyLndvbigpO1xuICAgIGxvZ1dpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG5cbn07XG5cbmNvbnN0IGxvZ1dpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zb2xlLmxvZyhgcGxheWVyMSB3aW5zOiAke2ZpcnN0UGxheWVyLmdldFdpbnMoKX1gKTtcbiAgY29uc29sZS5sb2coYHBsYXllcjIgd2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWApO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ2NoZWNrIGNoZWNrJylcbmltcG9ydCAnLi9tb2R1bGVzL2dhbWVMb29wJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==