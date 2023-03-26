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
  turn.textContent = `${player.isTurn}`;
  //maybe use some other way to display whos turn it is??**

  const ships = document.createElement('p');
  ships.textContent = `Ships left: ${player.board.getShipsRemaining()}`;
  const wins = document.createElement('p');
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

  cells.forEach((node)=>{
    node.addEventListener('click',(e)=>{
      let cell = e.target;
      let coord = getGridCoordinate(cell);
      console.log(`coordinate: ${coord}`);
      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo,coord);
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
    //(should trigger on hitting enter also, not just click.)
    //create players with names
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
/* harmony export */   "highlight": () => (/* binding */ highlight)
/* harmony export */ });
const highlight = (firstPlayer, secondPlayer) => {
  const playerOneDisplay = document.getElementById('player-one-display');
  const playerTwoDisplay = document.getElementById('player-two-display');

  if(firstPlayer.isTurn){
    playerOneDisplay.classList.add('current-player');
    playerTwoDisplay.classList.remove('current-player');
  } else if (secondPlayer.isTurn){
    playerTwoDisplay.classList.add('current-player');
    playerOneDisplay.classList.remove('current-player');
  };
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
(0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.gridEvents)();

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
/* harmony export */   "gameStart": () => (/* binding */ gameStart),
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

  if(playerOne.isTurn&&playerOne.computer){
    playerOne.makeAttack(playerTwo.board);
    (0,_turn__WEBPACK_IMPORTED_MODULE_2__.changeTurn)(playerOne,playerTwo);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.highlight)(playerOne,playerTwo);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),playerOne);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),playerTwo);
  } else if (playerTwo.isTurn&&playerTwo.computer){
    playerTwo.makeAttack(playerOne.board);
    (0,_turn__WEBPACK_IMPORTED_MODULE_2__.changeTurn)(playerOne,playerTwo);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_3__.highlight)(playerOne,playerTwo);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),playerOne);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),playerTwo);
  };
  // console.log({p1turn:playerOne.isTurn,p1computer:playerOne.computer,p1attacks:playerOne.board.attacks});
  // console.log({p2turn:playerTwo.isTurn,p2computer:playerTwo.computer,p2attacks:playerTwo.board.attacks});
};

const gameStart = async () => {
  let p = new Promise(function(resolve){
    let start = true;
    resolve(start);
  });
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
    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  } else if (secondPlayer.isTurn){
    secondPlayer.makeAttack(firstPlayer.board,target);
    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  };
  //COMPUTER IS NOT ATTACKIGN HERE
  if(firstPlayer.computer){
    firstPlayer.makeAttack(secondPlayer.board);
    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  } else if (secondPlayer.computer){
    secondPlayer.makeAttack(firstPlayer.board);
    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  };
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  
  // console.log({p1turn:firstPlayer.isTurn,p1computer:firstPlayer.computer,p1attacks:firstPlayer.board.attacks});
  // console.log({p2turn:secondPlayer.isTurn,p2computer:secondPlayer.computer,p2attacks:secondPlayer.board.attacks});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSwwRUFBUztBQUNiLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSSwwRUFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBFQUFTO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJLDBFQUFTO0FBQ2I7QUFDQSxFQUFFLGlFQUFVO0FBQ1osRUFBRSxpRUFBVTtBQUNaO0FBQ0Esa0JBQWtCLDhGQUE4RjtBQUNoSCxrQkFBa0IsaUdBQWlHO0FBQ25IOzs7Ozs7O1VDcERBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBLENBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVN0YXJ0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdHVybi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUdyaWQgPSAoZ3JpZCxncmlkTnVtKSA9PiB7XG4gIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgbGV0IHJvdyA9IGk7XG4gICAgbGV0IGdyaWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoJ2dyaWQtcm93Jyk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1yb3ctJHtpfWApO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKCdkYXRhLXJvdy1udW1iZXInLGAke2l9YCk7XG4gICAgLy9QUk9CQUJMWSBET05UIE5FRUQgSUQgQU5EIERBVEEgQVRUUklCVVRFLCBCVVQgSSdMTCBDT01FIEJBQ0sgVE8gVEhJUy5cbiAgICBmb3IobGV0IGk9MDtpPDExO2krPTEpe1xuICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3dcbiAgICAgIGxldCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKGBncmlkLWNlbGwtJHtncmlkTnVtfWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdpZCcsYGdyaWQtY2VsbC0ke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScsYCR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsYWNrJztcbiAgICAgIGdyaWRSb3cuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgIH07XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChncmlkUm93KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbFJvd3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBbXTtcbiAgICBsZXQgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcblxuICAgIHJvd3MuZm9yRWFjaCgoZSk9PntcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIGxldCBpID0gMTtcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBpZihlLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDBcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKT0+e1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSAnbm9uZSc7XG4gICAgICBjb25zdCBjZWxsQ29vcmRpbmF0ZSA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgaWYoY2VsbENvb3JkaW5hdGUgPT09ICcwLTAnKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBsYWJlbFJvd3MoKTtcbiAgbGFiZWxDb2x1bW5zKCk7XG59O1xuIiwiY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXJEaXNwbGF5ID0gKHBsYXllciwgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWNvbnQnKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgcGxheWVyTnVtRGlzcGxheS50ZXh0Q29udGVudCA9IGBQTEFZRVIgJHtwbGF5ZXJOdW19YDtcbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgdHVybi50ZXh0Q29udGVudCA9IGAke3BsYXllci5pc1R1cm59YDtcbiAgLy9tYXliZSB1c2Ugc29tZSBvdGhlciB3YXkgdG8gZGlzcGxheSB3aG9zIHR1cm4gaXQgaXM/PyoqXG5cbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgY29uc3Qgd2lucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgd2lucy50ZXh0Q29udGVudCA9IGBXaW5zOiAke3BsYXllci5nZXRXaW5zKCl9YDtcblxuICBkaXNwbGF5LmFwcGVuZChwbGF5ZXJOdW1EaXNwbGF5LG5hbWUsdHVybixzaGlwcyx3aW5zKTtcblxuICBpZihwbGF5ZXJOdW0gPT09IDEpe1xuICAgIHBsYXllck9uZURpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9IGVsc2UgaWYgKHBsYXllck51bSA9PT0gMil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH07XG59O1xuXG4vL3BsYXllciNcbi8vcGxheWVyIG5hbWVcbi8vaXMgdHVyblxuLy9jdXJyZW50IHNoaXBzIGFsaXZlXG4vL3dpbnMiLCJpbXBvcnQgeyBwYXJzZUNlbGxDb29yZGluYXRlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZVwiO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHR1cm4gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90dXJuXCI7XG5cbmNvbnN0IGdldEdyaWRDb29yZGluYXRlID0gKGNlbGwpID0+IHtcbiAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gIHJldHVybiBjb29yZDtcbn07XG5cbi8vT05MWSBDTElDS0lORyBPTiBUSEUgRU5FTVkgR1JJRCBTSE9VTEQgQkUgQUJMRSBUTyBBVFRBQ0tcbi8vT05MWSBIT1ZFUklORyBPTiBUSEUgRU5FTVkgR1JJRCBTSE9VTEQgQ0hBTkdFIENFTEwgQ09MT1JcblxuZXhwb3J0IGNvbnN0IGdyaWRFdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgbGV0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG4gICAgICBjb25zb2xlLmxvZyhgY29vcmRpbmF0ZTogJHtjb29yZH1gKTtcbiAgICAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byxjb29yZCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy9TSE9VTEROJ1QgUkVOREVSIFBMQVlFUiBUV08gU0hJUFMgSUYgUExBWUlORyBBR0FJTlNUIENPTVBVVEVSXG4vL0lGIFRXTyBQTEFZRVIgU0hPVUxETlQgUkVOREVSIEVJVEhFUiBQTEFZRVJTIFNISVBTXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscyxwbGF5ZXIpID0+IHtcbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBhcnIgPSBmbGVldC5yZWR1Y2UoKGFjYyx2YWwpPT5hY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gICAgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil48nO1xuICAgIH0gZWxzZSBpZiAoIShhcnIuaW5jbHVkZXMoY29vcmQpKSYmcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJy8nO1xuICAgIH0gZWxzZSBpZiAoYXJyLmluY2x1ZGVzKGNvb3JkKSl7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXiyc7XG4gICAgfTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzJztcblxuY29uc3QgbWVudU11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtbXVsdGlwbGF5ZXInKTtcbmNvbnN0IG1lbnVOYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LW5hbWVzJyk7XG5jb25zdCBtZW51UnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1ydWxlcycpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLXBsYXllcicpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3by1wbGF5ZXInKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtbmFtZScpO1xuLy8gY29uc3QgcGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XG5cbi8vIGxldCBtdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKG1lbnUpID0+IHtcbiAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxuY29uc3Qgc2hvdyA9IChtZW51KSA9PiB7XG4gbWVudS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbn07XG5cbmNvbnN0IGdldE5hbWVzID0gKCkgPT4ge1xuICBsZXQgcGxheWVyT25lID0gcGxheWVyT25lTmFtZUVsLnZhbHVlO1xuICBsZXQgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gaWYoIW11bHRpcGxheWVyKXtcbiAgLy8gICBwbGF5ZXJUd28gPSAnY29tcHV0ZXInO1xuICAvLyB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lLCBwbGF5ZXJUd29dO1xufTtcblxuLy9tZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuXG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBoaWRlKG1lbnVNdWx0aXBsYXllcik7XG4gICAgc2hvdyhtZW51TmFtZXMpO1xuICAgIG11bHRpcGxheWVyID0gZmFsc2U7XG4gIH0pO1xuXG4gIHR3b1BsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBoaWRlKG1lbnVNdWx0aXBsYXllcik7XG4gICAgc2hvdyhtZW51TmFtZXMpO1xuICAgIG11bHRpcGxheWVyID0gdHJ1ZTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgLy8oc2hvdWxkIHRyaWdnZXIgb24gaGl0dGluZyBlbnRlciBhbHNvLCBub3QganVzdCBjbGljay4pXG4gICAgLy9jcmVhdGUgcGxheWVycyB3aXRoIG5hbWVzXG4gICAgbGV0IG5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgICBsZXQgbmFtZU9uZSA9IG5hbWVzWzBdO1xuICAgIGxldCBuYW1lVHdvID0gbmFtZXNbMV1cblxuICAgIGlmKG5hbWVPbmUgPT09ICcnIHx8IG5hbWVUd28gPT09ICcnKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgc2V0dXAobmFtZU9uZSxuYW1lVHdvKTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllck9uZSwxKTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywyKTtcblxuICAgIHBsYXllck9uZU5hbWVFbC52YWx1ZSA9ICcnO1xuICAgIC8vIHBsYXllclR3b05hbWUudmFsdWUgPSAnJztcbiAgICBoaWRlKG1lbnVOYW1lcyk7XG4gIH0pO1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuICBjb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZGlzcGxheScpO1xuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXBsYXllcicpO1xuICB9O1xufTsiLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vY3JlYXRlU2hpcFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT57XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGF0dGFja3MgPSBbXTtcblxuICBmdW5jdGlvbiBPTERwbGFjZShheGlzLHN0YXJ0LHNpemUpe1xuICAgIC8vWCA9PiBob3Jpem9udGFsICsgbGV0dGVyc1xuICAgIC8vWSA9PiB2ZXJ0aWNhbCArIG51bWJlcnNcbiAgICBpZighYXhpc3x8IXN0YXJ0fHwhc2l6ZSl7XG4gICAgICBjb25zb2xlLmxvZygncGFyYW1ldGVyIG1pc3NpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoJycpO1xuICAgIGxldCB4ID0gc3RhcnRBcnIuc2xpY2UoMCwxKTtcbiAgICBsZXQgeSA9IHN0YXJ0QXJyLnNsaWNlKDEpLmpvaW4oJycpO1xuXG4gICAgLy90aHJvd3MgZXJyb3IgaWYgc2hpcHMgd291bGQgYmUgcGxhY2VkIG91dCBvZiBib3VuZHNcbiAgICAvL3Rocm93cyBlcnJvcnMgZm9yIG5vdyBtYXliZSBjaGFuZ2UgbGF0ZXIqKlxuICAgIC8vVEhFIENPT1JESU5BVEVTIENBTiBCRSBDSEVDS0VEIEJFRk9SRSBUSEVZIEFSRSBQQVNTRUQgVE8gUExBQ0UqKlxuICAgIGlmKCh4WzBdLmNoYXJDb2RlQXQoMCkrc2l6ZSk+NzQpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaGlwIGV4Y2VlZHMgdGhlIHggYXhpcyBvZiB0aGUgZ2FtZWJvYXJkLicpO1xuICAgIH0gZWxzZSBpZiAoKHBhcnNlSW50KHkpK3NpemUpPjEwKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB5IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9O1xuXG4gICAgLy9DaGVjayBpZiBwbGFjZW1lbnQgY29vcmRpbmF0ZXMgY29uZmxpY3Qgd2l0aCBhbnkgb3RoZXIgc2hpcHNcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvb3JkaW5hdGVzKHNoaXBBeGlzLHNoaXBTaXplKXtcbiAgICAgIGxldCBjb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICBpZihzaGlwQXhpcyA9PT0gJ1gnKXtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGV0dGVyc1xuICAgICAgICBmb3IobGV0IGk9MDtpPHNoaXBTaXplO2krPTEpe1xuICAgICAgICAgIGxldCBuZXdYID0gU3RyaW5nLmZyb21DaGFyQ29kZSh4WzBdLmNoYXJDb2RlQXQoMCkraSk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHtuZXdYICsgeX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2hpcEF4aXMgPT09ICdZJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IG51bWJlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGAke3ggKyAocGFyc2VJbnQoeSkgKyBpKX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgICB9O1xuXG5cbiAgICBsZXQgc2hpcCA9IGNyZWF0ZVNoaXAoY3JlYXRlQ29vcmRpbmF0ZXMoYXhpcyxzaXplKSk7XG4gICAgc2hpcHMucHVzaChzaGlwKTtcbiAgfTsgLy9PTEQgUExBQ0UgRlVOQ1RJT04sIFNUSUxMIFVTRUZVTCBDT0RFIElOIEhFUkUgRk9SIExBVEVSKipcblxuICBjb25zdCBwbGFjZSA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYoYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHNoaXBJbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCk9PnsgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXModGFyZ2V0KX0pO1xuXG4gICAgaWYoc2hpcEluZGV4Pi0xKXtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfTtcblxuICAgIGF0dGFja3MucHVzaCh0YXJnZXQpO1xuICAgIC8vIHJldHVybiBpZiBzaGlwIHdhcyBoaXQvd2hpY2ggc2hpcCB3YXMgaGl0P1xuICB9O1xuICBcbiAgY29uc3QgZmxlZXRDb29yZGluYXRlcyA9ICgpID0+e1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvcihsZXQgaT0wO2k8c2hpcHMubGVuZ3RoO2krPTEpe1xuICAgICAgYXJyLnB1c2goc2hpcHNbaV0uY29vcmRpbmF0ZXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzUmVtYWluaW5nID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgIGlmKHNoaXAuaXNTdW5rKCkpe1xuICAgICAgICBzaGlwc1N1bmsgKz0gMTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2hpcHMubGVuZ3RoIC0gc2hpcHNTdW5rO1xuICB9O1xuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4ge1xuICAgIGlmKHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSkpe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiB7IGF0dGFja3MsIHBsYWNlLCByZWNlaXZlQXR0YWNrLCBmbGVldENvb3JkaW5hdGVzLCBnZXRTaGlwc1JlbWFpbmluZywgaXNGbGVldFN1bmsgfTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vY3JlYXRlR2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyTmFtZSxpc0NvbXAgPSBmYWxzZSkgPT57XG4gIGNvbnN0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBjb25zdCBjb21wdXRlciA9IGlzQ29tcDtcbiAgbGV0IGlzVHVybiA9IGZhbHNlO1xuICBsZXQgd2lucyA9IDA7XG4gIFxuICBjb25zdCBtYWtlQXR0YWNrID0gKGVuZW15Qm9hcmQsY29vcmRpbmF0ZXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYoY29tcHV0ZXIpe1xuICAgICAgLy91c2Ugc2V0IGludGVydmFsIHRvIGhhdmUgYSBzbWFsbCBkZWxheSBoZXJlXG4gICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgaGFzIGdlbmVyYXRlZCBhbiBhdHRhY2suJyk7XG4gICAgICB0YXJnZXQgPSBnZW5lcmF0ZUF0dGFjayhlbmVteUJvYXJkKTtcbiAgICB9O1xuXG4gICAgaWYoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgY29uc29sZS5sb2coJ3NxdWFyZSBoYXMgYWxyZWFkeSBiZWVuIGhpdC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBoYXMgYXR0YWNrZWQgJHt0YXJnZXR9LmApO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlRmxlZXQgPSAoKSA9PiB7XG5cbiAgfTtcbiAgXG4gIGNvbnN0IGdlbmVyYXRlQXR0YWNrID0gKGVuZW15Qm9hcmQsZ2VuID0gMSkgPT4ge1xuICAgIC8vY291bGQgcG90ZW50aWFsbHkgbWFrZSBpdCAnc21hcnRlcicgbGF0ZXIgb24gYWthLCBvbmNlIGl0IGxhbmRzIGEgaGl0LCBmb2N1cyBvbiB0aGF0IGFyZWEgdW50aWwgdGhlIHNoaXAgaXMgc3Vuay5cbiAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkgKSArIDY1O1xuICAgIH07XG5cbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgIGxldCB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG5cbiAgICAvL2NoZWNrcyBpZiBzcXVhcmVzIGhhdmUgYWxyZWFkeSBiZWVuIGhpdFxuICAgIGlmKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIGRve1xuICAgICAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyh0YXJnZXQpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCBnZXRXaW5zIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZUFycmF5KSA9PntcbiAgbGV0IGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZUFycmF5O1xuICBsZXQgbGVuZ3RoID0gY29vcmRpbmF0ZXMubGVuZ3RoO1xuICBsZXQgZGFtYWdlID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgZGFtYWdlICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmKGxlbmd0aCA9PT0gZGFtYWdlKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBnZXREYW1hZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhbWFnZTtcbiAgfTtcblxuICByZXR1cm4geyBjb29yZGluYXRlcywgaGl0LCBpc1N1bmssIGdldERhbWFnZSB9O1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZFwiXG5pbXBvcnQgeyBncmlkRXZlbnRzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBtZW51RXZlbnRzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9tZW51XCI7XG5cbi8vU0VUIFVQIEJBU0UgR1JJRFxuXG5jb25zdCBwbGF5ZXJPbmVHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZ3JpZCcpO1xuY29uc3QgcGxheWVyVHdvR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWdyaWQnKTtcblxuY3JlYXRlR3JpZChwbGF5ZXJPbmVHcmlkLDEpO1xuY3JlYXRlR3JpZChwbGF5ZXJUd29HcmlkLDIpO1xuZ3JpZEV2ZW50cygpO1xuXG4vL0RPTlQgU1RBUlQgTE9PUCBVTlRJTCBTVEFSVCBCVVRUT04gSVMgQ0xJQ0tFRFxuXG4vLyB3aGlsZSghKHBsYXllck9uZS5ib2FyZC5pc0ZsZWV0U3VuaygpKSYmIShwbGF5ZXJUd28uYm9hcmQuaXNGbGVldFN1bmsoKSkpe1xuLy8gICB0dXJuKHBsYXllck9uZSxwbGF5ZXJUd28sdGFyZ2V0UHJvbWlzZSk7XG4vLyAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJykscGxheWVyT25lKTtcbi8vICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuLy8gfTtcblxuXG4vL2RvIGdhbWUgbG9vcCBpZiBmYWNpbmcgYSBjb21wdXRlciwgYnV0IG5vdCBpZiBwbGF5aW5nIDIgcGxheWVyPz8/PyoqKipcblxuXG4vL2RlY2xhcmUgd2lubmVyXG5cbi8vZGVjaWRlIHdobyBnb2VzIGZpcnN0IChwbGF5ZXIgb25lIGdvZXMgZmlyc3Q/KVxuLy90dXJuIGZ1bmN0aW9uXG5cbi8vRklHVVJFIE9VVCBUVVJOUyBORVhUXG5cbi8vViBMT09QIFZcbi8vYWx0ZXJuYXRlIHR1cm5zIHVudGlsIHRoZXJlJ3MgYSB3aW5uZXJcbi8vYWRkIHdpbiB0byB0aGF0IHBsYXllclxuLy9sb29zaW5nIHBsYXllciBnZXRzIHRvIGdvIGZpcnN0XG5cbi8vaWYgaW1wbGVtZW50ZWQgeW91IHNob3VsZCBiZSBhYmxlIHRvIHJlc3RhcnQgYSBnYW1lIG9yIGNoYW5nZSB0aGUgcnVsZXMgYXQgYW55dGltZVxuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGZpcnN0VHVybiwgY2hhbmdlVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcblxuZXhwb3J0IGxldCBwbGF5ZXJPbmUscGxheWVyVHdvO1xuXG5leHBvcnQgY29uc3Qgc2V0dXAgPSAobmFtZU9uZSwgbmFtZVR3bykgPT4ge1xuICBsZXQgeCA9IGZhbHNlO1xuXG4gIGlmKG5hbWVUd28gPT09ICdjb21wdXRlcicpe1xuICAgIHggPSB0cnVlO1xuICB9O1xuICBcbiAgcGxheWVyT25lID0gY3JlYXRlUGxheWVyKG5hbWVPbmUpO1xuICBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIobmFtZVR3byx4KTtcblxuICAvL3RlbXBvcmFyeSBwbGFjZW1lbnQgc2V0dXBcbiAgcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQTInLCdBMycsJ0E0J10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydFMycsJ0YzJywnRzMnXSk7XG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0ExJywnQjEnLCdDMScsJ0QxJ10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydDMTAnLCdEMTAnLCdFMTAnLCdGMTAnXSk7XG5cbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnQTQnLCdCNCcsJ0M0J10pO1xuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydBNScsJ0E2JywnQTcnXSk7XG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0U1JywnRjUnLCdHNScsJ0g1J10pO1xuICBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydFNicsJ0U3JywnRTgnLCdFOSddKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcblxuICBmaXJzdFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG5cbiAgaWYocGxheWVyT25lLmlzVHVybiYmcGxheWVyT25lLmNvbXB1dGVyKXtcbiAgICBwbGF5ZXJPbmUubWFrZUF0dGFjayhwbGF5ZXJUd28uYm9hcmQpO1xuICAgIGNoYW5nZVR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gICAgaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJykscGxheWVyT25lKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiYmcGxheWVyVHdvLmNvbXB1dGVyKXtcbiAgICBwbGF5ZXJUd28ubWFrZUF0dGFjayhwbGF5ZXJPbmUuYm9hcmQpO1xuICAgIGNoYW5nZVR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gICAgaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJykscGxheWVyT25lKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG4gIH07XG4gIC8vIGNvbnNvbGUubG9nKHtwMXR1cm46cGxheWVyT25lLmlzVHVybixwMWNvbXB1dGVyOnBsYXllck9uZS5jb21wdXRlcixwMWF0dGFja3M6cGxheWVyT25lLmJvYXJkLmF0dGFja3N9KTtcbiAgLy8gY29uc29sZS5sb2coe3AydHVybjpwbGF5ZXJUd28uaXNUdXJuLHAyY29tcHV0ZXI6cGxheWVyVHdvLmNvbXB1dGVyLHAyYXR0YWNrczpwbGF5ZXJUd28uYm9hcmQuYXR0YWNrc30pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdhbWVTdGFydCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKXtcbiAgICBsZXQgc3RhcnQgPSB0cnVlO1xuICAgIHJlc29sdmUoc3RhcnQpO1xuICB9KTtcbn07XG4iLCIvL2lucHV0IGNlbGwgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZVxuLy9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYodHlwZW9mIGF0dHJpYnV0ZSAhPT0gJ3N0cmluZycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBsZXQgYXJyID0gYXR0cmlidXRlLnNwbGl0KCcnKTtcblxuICBjb25zdCBnZXRMZXR0ZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbGV0dGVyVmFsdWU7XG5cbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5WzFdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsMik7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH07XG5cbiAgICBsZXQgY29kZVZhbHVlID0gcGFyc2VJbnQobGV0dGVyVmFsdWUpO1xuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCg2NSArIGNvZGVWYWx1ZSkgLSAxKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsZXR0ZXIpO1xuICAgIHJldHVybiBsZXR0ZXI7XG4gIH07XG5cbiAgY29uc3QgZ2V0TnVtYmVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IG51bWJlcjtcbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5W2FycmF5Lmxlbmd0aC0yXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGgtMik7XG4gICAgICBudW1iZXIgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoLTFdO1xuICAgIH07XG4gICAgLy8gY29uc29sZS5sb2cobnVtYmVyKTtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9O1xuXG4gIGxldCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgbGV0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuICAvLyBjb25zb2xlLmxvZyhsZXR0ZXIgKyBudW1iZXIpO1xuICByZXR1cm4gbGV0dGVyICsgbnVtYmVyO1xufTtcbiIsImltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcblxuZXhwb3J0IGNvbnN0IGZpcnN0VHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTApICsgMSk7XG5cbiAgaWYobnVtYmVyJTIgPT09IDApe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9IGVsc2UgaWYgKG51bWJlciUyICE9PSAwKXtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGNoYW5nZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkLHRhcmdldCk7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLHRhcmdldCk7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICB9O1xuICAvL0NPTVBVVEVSIElTIE5PVCBBVFRBQ0tJR04gSEVSRVxuICBpZihmaXJzdFBsYXllci5jb21wdXRlcil7XG4gICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpe1xuICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIH07XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIFxuICAvLyBjb25zb2xlLmxvZyh7cDF0dXJuOmZpcnN0UGxheWVyLmlzVHVybixwMWNvbXB1dGVyOmZpcnN0UGxheWVyLmNvbXB1dGVyLHAxYXR0YWNrczpmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzfSk7XG4gIC8vIGNvbnNvbGUubG9nKHtwMnR1cm46c2Vjb25kUGxheWVyLmlzVHVybixwMmNvbXB1dGVyOnNlY29uZFBsYXllci5jb21wdXRlcixwMmF0dGFja3M6c2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3N9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdjaGVjayBjaGVjaycpXG5pbXBvcnQgJy4vbW9kdWxlcy9nYW1lTG9vcCc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=