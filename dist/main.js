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
/* harmony export */   "placement": () => (/* binding */ placement),
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

const placement = (player) => {
  //hovering should display an outline of the ship
  //get player cells
  //biggest ship to smallest ship

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
  };

  const receiveAttack = (target) => {
    if(attacks.includes(target)){
      return;
    };

    let shipIndex = ships.findIndex((ship)=>{ return ship.coordinates.includes(target)});

    if(shipIndex>-1){
      ships[shipIndex].hit();
    };

    attacks.push(target);
  };
  
  const getShips = () => {
    return ships;
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
      const size = arr.length;
    
      for(let i=0;i<size;i+=1){
        arr.pop();
      };
    };

    resetArray(ships);
    resetArray(attacks);
  };

  return { attacks, place, receiveAttack, getShips, fleetCoordinates, getShipsRemaining, isFleetSunk, reset };
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
      target = computerAttack(enemyBoard);
      console.log(`computer attacks ${target}`);
    } else {
      console.log(`${name} attacks ${target}`);
    };

    enemyBoard.receiveAttack(target);
  };

  // const placeFleet = () => {

  // };
  
  const computerAttack = (enemyBoard,gen = 1) => {
    const hits = [];
    let ships = enemyBoard.getShips();
    let target;

    const targetAdjacent = () => {
      //populates hits array
      for(let i=0;i<enemyBoard.attacks.length;i+=1){
        let atk = enemyBoard.attacks[i];
        let fleetArr = enemyBoard.fleetCoordinates().reduce((acc,val)=> acc.concat(val));

        if(fleetArr.includes(atk)&&!(hits.includes(atk))){
          hits.push(atk);
        };
      };

      //remove hits that are on sunk ships
      ships.forEach((ship)=>{
        if(ship.isSunk()){
          let list = [];

          for(let i=0;i<hits.length;i+=1){
            if(ship.coordinates.includes(hits[i])){
              list.push(hits[i]);
            };
          };

          for(let i=0;i<ship.coordinates.length;i+=1){
            let index = hits.indexOf(list[0]);
            hits.splice(index,1);
            list.shift();
          };
        };
      });

      //returns valid target adjacent to the input coordinate
      const getAdjacent = (inputCoord) => {
        let [a, ...rest] = inputCoord;
        let char = a;
        let num = parseInt(rest.join(''));
        let code = char.charCodeAt(0);

        if(code+1<=74){
          let coord = (String.fromCharCode(code+1)+num);

          if(!(enemyBoard.attacks.includes(coord))){
            return coord;
          };
        };

        if(code-1>=65){
          let coord = (String.fromCharCode(code-1)+num);

          if(!(enemyBoard.attacks.includes(coord))){
            return coord;
          };
        };

        if(num+1<=10){
          let coord = char + (num + 1);

          if(!(enemyBoard.attacks.includes(coord))){
            return coord;
          };
        };

        if(num-1>=1){
          let coord = char + (num - 1);

          if(!(enemyBoard.attacks.includes(coord))){
            return coord;
          };
        };
      };

      for(let i=0;i<hits.length;i+=1){
        let adjacent = getAdjacent(hits[i]);

        if(Boolean(adjacent)){
          target = adjacent;
          return adjacent;
        };
      };
    };

    targetAdjacent();
    if(hits.length !== 0){
      // console.log(`adjacent target found => ${target}`);
      return target;
    };

    const generateAttack = () => {
      const generateCharCode = () => {
        return Math.floor(Math.random() * (74 - 65 + 1) ) + 65;
      };

      let letter = String.fromCharCode(generateCharCode());
      let number = Math.floor(Math.random() * 10 + 1);
      target = letter + number;
  
      //remakes attack if target has already been hit
      if(enemyBoard.attacks.includes(target)){
        do{
          letter = String.fromCharCode(generateCharCode());
          number = Math.floor(Math.random() * 10 + 1);
          target = letter + number;
        }
        while (enemyBoard.attacks.includes(target));
      };
    };

    generateAttack();
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
  let length = coordinateArray.length;
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
const checkWin = (firstPlayer, secondPlayer) => {
  if(secondPlayer.board.isFleetSunk()){
    console.log('player1 WINS');
    firstPlayer.won();
    return 'first';
  } else if (firstPlayer.board.isFleetSunk()){
    console.log('player2 WINS');
    secondPlayer.won();
    return 'second';
  };
};


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
  console.log('GAME HAS BEEN RESET.');
  
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
    //NEED TO DO SHIP PLACEMENT HERE
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.gridEvents)();
  };

  //temporary placement setup
  playerOne.board.place(['C3','C4','C5']);
  playerOne.board.place(['E3','F3','G3']);
  playerOne.board.place(['A1','B1','C1','D1']);
  // playerOne.board.place(['C10','D10','E10','F10']);

  playerTwo.board.place(['A4','B4','C4']);
  // playerTwo.board.place(['A5','A6','A7']);
  playerTwo.board.place(['E5','F5','G5','H5']);
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

    return number;
  };

  let letter = getLetter(arr);
  let number = getNumber(arr);

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

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'first'){
        turnWon(firstPlayer,secondPlayer,'first');
        return;
      };
    };
  } else if (secondPlayer.isTurn){
    if(firstPlayer.board.attacks.includes(target)){
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board,target);

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'second'){
        turnWon(firstPlayer,secondPlayer,'second');
        return;
      }
    };
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

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'first'){
        turnWon(firstPlayer,secondPlayer,'first');
        return;
      };
    } else if (secondPlayer.computer){
      secondPlayer.makeAttack(firstPlayer.board);

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_2__.checkWin)(firstPlayer,secondPlayer) === 'second'){
        turnWon(firstPlayer,secondPlayer,'second');
        return;
      };
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
/* harmony import */ var _DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM/components/createGrid */ "./src/DOM/components/createGrid.js");
/* harmony import */ var _DOM_interaction_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM/interaction/menu */ "./src/DOM/interaction/menu.js");



const playerOneGrid = document.getElementById('player-one-grid');
const playerTwoGrid = document.getElementById('player-two-grid');

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid,1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid,2);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCtFQUFjO0FBQ2xCLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEVBQUUscURBQVM7QUFDWCxFQUFFLGlFQUFVO0FBQ1osRUFBRSxpRUFBVTtBQUNaLEVBQUUsaURBQUs7QUFDUCxFQUFFLCtFQUFjO0FBQ2hCO0FBQ0E7Ozs7Ozs7VUNuR0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDTDs7QUFFcEQ7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVJlc2V0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsZ3JpZE51bSkgPT4ge1xuICBmb3IobGV0IGk9MDtpPDExO2krPTEpe1xuICAgIGxldCByb3cgPSBpO1xuICAgIGxldCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3JpZFJvdy5jbGFzc0xpc3QuYWRkKCdncmlkLXJvdycpO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKCdpZCcsYGdyaWQtcm93LSR7aX1gKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZSgnZGF0YS1yb3ctbnVtYmVyJyxgJHtpfWApO1xuICAgIC8vUFJPQkFCTFkgRE9OVCBORUVEIElEIEFORCBEQVRBIEFUVFJJQlVURSwgQlVUIEknTEwgQ09NRSBCQUNLIFRPIFRISVMuXG4gICAgZm9yKGxldCBpPTA7aTwxMTtpKz0xKXtcbiAgICAgIGxldCBjdXJyZW50Um93ID0gcm93XG4gICAgICBsZXQgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChgZ3JpZC1jZWxsLSR7Z3JpZE51bX1gKTtcbiAgICAgIGdyaWRDZWxsLnNldEF0dHJpYnV0ZSgnaWQnLGBncmlkLWNlbGwtJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnLGAke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCBibGFjayc7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9O1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoZ3JpZFJvdyk7XG4gIH07XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgbGV0IHJvd3MgPSBncmlkLmNoaWxkTm9kZXM7XG5cbiAgICByb3dzLmZvckVhY2goKGUpPT57XG4gICAgICBub2RlTGlzdC5wdXNoKGUuZmlyc3RDaGlsZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgaSA9IDE7XG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSk9PntcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgaWYoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykgPT09ICcwLTAnKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgbGFiZWxDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gZ3JpZC5maXJzdENoaWxkLmNoaWxkTm9kZXM7XG4gICAgbGV0IGkgPSAwXG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSk9PntcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKTtcbiAgICAgIGlmKGNlbGxDb29yZGluYXRlID09PSAnMC0wJyl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1kaXNwbGF5Jyk7XG5jb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZGlzcGxheScpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyRGlzcGxheSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1jb250Jyk7XG5cbiAgY29uc3QgcGxheWVyTnVtRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIHBsYXllck51bURpc3BsYXkudGV4dENvbnRlbnQgPSBgUExBWUVSICR7cGxheWVyTnVtfWA7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBuYW1lLnRleHRDb250ZW50ID0gYCR7cGxheWVyLmdldE5hbWUoKX1gO1xuXG4gIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHR1cm4uc2V0QXR0cmlidXRlKCdpZCcsYHR1cm4tJHtwbGF5ZXJOdW19YCk7XG4gIGlmKHBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgfSBlbHNlIGlmICghcGxheWVyLmlzVHVybil7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfTtcblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgc2hpcHMuc2V0QXR0cmlidXRlKCdpZCcsYHNoaXBzLSR7cGxheWVyTnVtfWApO1xuICBzaGlwcy50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3BsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG5cbiAgY29uc3Qgd2lucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgd2lucy5zZXRBdHRyaWJ1dGUoJ2lkJyxgd2lucy0ke3BsYXllck51bX1gKTtcbiAgd2lucy50ZXh0Q29udGVudCA9IGBXaW5zOiAke3BsYXllci5nZXRXaW5zKCl9YDtcblxuICBkaXNwbGF5LmFwcGVuZChwbGF5ZXJOdW1EaXNwbGF5LG5hbWUsdHVybixzaGlwcyx3aW5zKTtcblxuICBpZihwbGF5ZXJOdW0gPT09IDEpe1xuICAgIHBsYXllck9uZURpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9IGVsc2UgaWYgKHBsYXllck51bSA9PT0gMil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH07XG59O1xuXG4vL3BsYXllciNcbi8vcGxheWVyIG5hbWVcbi8vaXMgdHVyblxuLy9jdXJyZW50IHNoaXBzIGFsaXZlXG4vL3dpbnMiLCJpbXBvcnQgeyBwYXJzZUNlbGxDb29yZGluYXRlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZVwiO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHR1cm4gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90dXJuXCI7XG5cbmNvbnN0IGdldEdyaWRDb29yZGluYXRlID0gKGNlbGwpID0+IHtcbiAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gIHJldHVybiBjb29yZDtcbn07XG5cbi8vc3RvcHMgcGxheWVycyBmcm9tIGludGVyYWN0aW5nIHdpdGggZ3JpZHMgd2hlbiB0aGV5IHNob3VsZG4ndCBiZVxuY29uc3QgZ3JpZExvZ2ljID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIGNlbGwpID0+IHtcbiAgbGV0IHg7XG5cbiAgLy9zdG9wcyBmdW5jdGlvbiBpZiBpdHMgY29tcHV0ZXJzIHR1cm5cbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuJiZmaXJzdFBsYXllci5jb21wdXRlcil7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybiYmc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcblxuICAvL3N0b3BzIHBsYXllciBmcm9tIGludGVyYWN0aW5nIHdpdGggdGhlaXIgb3duIGdyaWRcbiAgaWYocGxheWVyT25lLmlzVHVybiYmY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbC0xJykpe1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMicpKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geDtcbn07XG5cbi8vQ2hlY2tzIGlmIHRoZSBjZWxsIGlzIGEgbGFiZWxcbmNvbnN0IGNoZWNrVGllciA9IChjZWxsKSA9PntcbiAgY29uc3QgY2VsbElEID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gIGNvbnN0IGNvb3JkaW5hdGUgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxJRCk7XG5cbiAgaWYoY29vcmRpbmF0ZVswXT09PSdAJ3x8KGNvb3JkaW5hdGUubGVuZ3RoPT09MiYmY29vcmRpbmF0ZVsxXT09PScwJykpe1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdyaWRFdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuICBcbiAgY2VsbHMuZm9yRWFjaCgobm9kZSk9PntcbiAgICBpZihjaGVja1RpZXIobm9kZSkpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvL2FkZCB0dXJuIGxpc3RlbmVyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgbGV0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUscGxheWVyVHdvLGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgdHVybihwbGF5ZXJPbmUscGxheWVyVHdvLGNvb3JkKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvL3JlbW92ZSBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGFuZCByZW1vdmUgY2xpY2sgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG5cbiAgICAgIGNlbGwub25tb3VzZXVwID0gKCkgPT57XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5vbm1vdXNlbGVhdmUgPSAoKSA9PntcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vdGVtcG9yYXJpbHkgcmVuZGVyaW5nIGV2ZXJ5dGhpbmcgZm9yIHRlc3RpbmcvZGVidWdnaW5nIHB1cnBvc2VzXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscyxwbGF5ZXIpID0+IHtcbiAgaWYocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApe1xuICAgIHJlc2V0R3JpZChjZWxscyk7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3QgYXJyID0gZmxlZXQucmVkdWNlKChhY2MsdmFsKT0+YWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKT0+e1xuICAgIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICAgIGlmIChhcnIuaW5jbHVkZXMoY29vcmQpJiZwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAn4pePJztcbiAgICB9IGVsc2UgaWYgKCEoYXJyLmluY2x1ZGVzKGNvb3JkKSkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICcvJztcbiAgICB9IGVsc2UgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkpe1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil4snO1xuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRHcmlkID0gKGNlbGxzKSA9PiB7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgaWYoY2hlY2tUaWVyKGNlbGwpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIGNlbGwudGV4dENvbnRlbnQgPSBudWxsO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnQgPSAocGxheWVyKSA9PiB7XG4gIC8vaG92ZXJpbmcgc2hvdWxkIGRpc3BsYXkgYW4gb3V0bGluZSBvZiB0aGUgc2hpcFxuICAvL2dldCBwbGF5ZXIgY2VsbHNcbiAgLy9iaWdnZXN0IHNoaXAgdG8gc21hbGxlc3Qgc2hpcFxuXG59O1xuIiwiaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzJztcblxuY29uc3QgbWVudU11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUtbXVsdGlwbGF5ZXInKTtcbmNvbnN0IG1lbnVOYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LW5hbWVzJyk7XG5jb25zdCBtZW51UnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1ydWxlcycpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLXBsYXllcicpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3by1wbGF5ZXInKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtbmFtZScpO1xuLy8gY29uc3QgcGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XG5cbi8vIGxldCBtdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKG1lbnUpID0+IHtcbiAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcblxuY29uc3Qgc2hvdyA9IChtZW51KSA9PiB7XG4gbWVudS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbn07XG5cbmNvbnN0IGdldE5hbWVzID0gKCkgPT4ge1xuICBsZXQgcGxheWVyT25lID0gcGxheWVyT25lTmFtZUVsLnZhbHVlO1xuICBsZXQgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gaWYoIW11bHRpcGxheWVyKXtcbiAgLy8gICBwbGF5ZXJUd28gPSAnY29tcHV0ZXInO1xuICAvLyB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lLCBwbGF5ZXJUd29dO1xufTtcblxuY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gIGxldCBuYW1lcyA9IGdldE5hbWVzKCk7XG4gIGxldCBuYW1lT25lID0gbmFtZXNbMF07XG4gIGxldCBuYW1lVHdvID0gbmFtZXNbMV1cblxuICBpZihuYW1lT25lID09PSAnJyB8fCBuYW1lVHdvID09PSAnJyl7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIHNldHVwKG5hbWVPbmUsbmFtZVR3byk7XG4gIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLDEpO1xuICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywyKTtcblxuICBwbGF5ZXJPbmVOYW1lRWwudmFsdWUgPSAnJztcbiAgLy8gcGxheWVyVHdvTmFtZS52YWx1ZSA9ICcnO1xuICBoaWRlKG1lbnVOYW1lcyk7XG59O1xuXG4vL21lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG5cbiAgc2luZ2xlUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGhpZGUobWVudU11bHRpcGxheWVyKTtcbiAgICBzaG93KG1lbnVOYW1lcyk7XG4gICAgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcbiAgfSk7XG5cbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGhpZGUobWVudU11bHRpcGxheWVyKTtcbiAgICBzaG93KG1lbnVOYW1lcyk7XG4gICAgbXVsdGlwbGF5ZXIgPSB0cnVlO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBzdGFydCgpO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbiAgXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvLyBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbi8vIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMicpO1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuICBpZihmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJnNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIH07XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXBsYXllcicpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG4vL05FRUQgU09NRVRISU5HIFdIRU4gUExBWUVSUyBBUkUgV0FJVElORyBGT1IgVEhFIE5FWFQgR0FNRVxuY29uc3QgdXBkYXRlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMScpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0xJyk7XG4gIGNvbnN0IHNoaXBzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0yJyk7XG4gIHNoaXBzMS50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke2ZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgc2hpcHMyLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7c2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbn07XG5cbmNvbnN0IHVwZGF0ZVdpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB3aW5zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5zLTEnKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0yJyk7XG4gIHdpbnMxLnRleHRDb250ZW50ID0gYFdpbnM6ICR7Zmlyc3RQbGF5ZXIuZ2V0V2lucygpfWA7XG4gIHdpbnMyLnRleHRDb250ZW50ID0gYFdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9jcmVhdGVTaGlwXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PntcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIC8vVVNFIEZPUiBQTEFDRSBGTEVFVCBGVU5DVElPTlxuICBmdW5jdGlvbiBPTERwbGFjZShheGlzLHN0YXJ0LHNpemUpe1xuICAgIC8vWCA9PiBob3Jpem9udGFsICsgbGV0dGVyc1xuICAgIC8vWSA9PiB2ZXJ0aWNhbCArIG51bWJlcnNcbiAgICBpZighYXhpc3x8IXN0YXJ0fHwhc2l6ZSl7XG4gICAgICBjb25zb2xlLmxvZygncGFyYW1ldGVyIG1pc3NpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoJycpO1xuICAgIGxldCB4ID0gc3RhcnRBcnIuc2xpY2UoMCwxKTtcbiAgICBsZXQgeSA9IHN0YXJ0QXJyLnNsaWNlKDEpLmpvaW4oJycpO1xuXG4gICAgLy90aHJvd3MgZXJyb3IgaWYgc2hpcHMgd291bGQgYmUgcGxhY2VkIG91dCBvZiBib3VuZHNcbiAgICAvL3Rocm93cyBlcnJvcnMgZm9yIG5vdyBtYXliZSBjaGFuZ2UgbGF0ZXIqKlxuICAgIC8vVEhFIENPT1JESU5BVEVTIENBTiBCRSBDSEVDS0VEIEJFRk9SRSBUSEVZIEFSRSBQQVNTRUQgVE8gUExBQ0UqKlxuICAgIGlmKCh4WzBdLmNoYXJDb2RlQXQoMCkrc2l6ZSk+NzQpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaGlwIGV4Y2VlZHMgdGhlIHggYXhpcyBvZiB0aGUgZ2FtZWJvYXJkLicpO1xuICAgIH0gZWxzZSBpZiAoKHBhcnNlSW50KHkpK3NpemUpPjEwKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB5IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9O1xuXG4gICAgLy9DaGVjayBpZiBwbGFjZW1lbnQgY29vcmRpbmF0ZXMgY29uZmxpY3Qgd2l0aCBhbnkgb3RoZXIgc2hpcHNcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvb3JkaW5hdGVzKHNoaXBBeGlzLHNoaXBTaXplKXtcbiAgICAgIGxldCBjb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICBpZihzaGlwQXhpcyA9PT0gJ1gnKXtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGV0dGVyc1xuICAgICAgICBmb3IobGV0IGk9MDtpPHNoaXBTaXplO2krPTEpe1xuICAgICAgICAgIGxldCBuZXdYID0gU3RyaW5nLmZyb21DaGFyQ29kZSh4WzBdLmNoYXJDb2RlQXQoMCkraSk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHtuZXdYICsgeX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2hpcEF4aXMgPT09ICdZJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IG51bWJlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGAke3ggKyAocGFyc2VJbnQoeSkgKyBpKX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgICB9O1xuXG5cbiAgICBsZXQgc2hpcCA9IGNyZWF0ZVNoaXAoY3JlYXRlQ29vcmRpbmF0ZXMoYXhpcyxzaXplKSk7XG4gICAgc2hpcHMucHVzaChzaGlwKTtcbiAgfTsgLy9PTEQgUExBQ0UgRlVOQ1RJT04sIFNUSUxMIFVTRUZVTCBDT0RFIElOIEhFUkUgRk9SIExBVEVSKipcblxuICBjb25zdCBwbGFjZSA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGlmKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApPT57IHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCl9KTtcblxuICAgIGlmKHNoaXBJbmRleD4tMSl7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH07XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgfTtcbiAgXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT57XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yKGxldCBpPTA7aTxzaGlwcy5sZW5ndGg7aSs9MSl7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHNSZW1haW5pbmcgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgaWYoc2hpcC5pc1N1bmsoKSl7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwcy5sZW5ndGggLSBzaGlwc1N1bms7XG4gIH07XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiB7XG4gICAgaWYoc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzZXRBcnJheSA9IChhcnIpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhcnIubGVuZ3RoO1xuICAgIFxuICAgICAgZm9yKGxldCBpPTA7aTxzaXplO2krPTEpe1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXNldEFycmF5KHNoaXBzKTtcbiAgICByZXNldEFycmF5KGF0dGFja3MpO1xuICB9O1xuXG4gIHJldHVybiB7IGF0dGFja3MsIHBsYWNlLCByZWNlaXZlQXR0YWNrLCBnZXRTaGlwcywgZmxlZXRDb29yZGluYXRlcywgZ2V0U2hpcHNSZW1haW5pbmcsIGlzRmxlZXRTdW5rLCByZXNldCB9O1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLGlzQ29tcCA9IGZhbHNlKSA9PntcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBsZXQgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcbiAgXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCxjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZihjb21wdXRlcil7XG4gICAgICB0YXJnZXQgPSBjb21wdXRlckF0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH07XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgfTtcblxuICAvLyBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuXG4gIC8vIH07XG4gIFxuICBjb25zdCBjb21wdXRlckF0dGFjayA9IChlbmVteUJvYXJkLGdlbiA9IDEpID0+IHtcbiAgICBjb25zdCBoaXRzID0gW107XG4gICAgbGV0IHNoaXBzID0gZW5lbXlCb2FyZC5nZXRTaGlwcygpO1xuICAgIGxldCB0YXJnZXQ7XG5cbiAgICBjb25zdCB0YXJnZXRBZGphY2VudCA9ICgpID0+IHtcbiAgICAgIC8vcG9wdWxhdGVzIGhpdHMgYXJyYXlcbiAgICAgIGZvcihsZXQgaT0wO2k8ZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDtpKz0xKXtcbiAgICAgICAgbGV0IGF0ayA9IGVuZW15Qm9hcmQuYXR0YWNrc1tpXTtcbiAgICAgICAgbGV0IGZsZWV0QXJyID0gZW5lbXlCb2FyZC5mbGVldENvb3JkaW5hdGVzKCkucmVkdWNlKChhY2MsdmFsKT0+IGFjYy5jb25jYXQodmFsKSk7XG5cbiAgICAgICAgaWYoZmxlZXRBcnIuaW5jbHVkZXMoYXRrKSYmIShoaXRzLmluY2x1ZGVzKGF0aykpKXtcbiAgICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8vcmVtb3ZlIGhpdHMgdGhhdCBhcmUgb24gc3VuayBzaGlwc1xuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSl7XG4gICAgICAgICAgbGV0IGxpc3QgPSBbXTtcblxuICAgICAgICAgIGZvcihsZXQgaT0wO2k8aGl0cy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgICBpZihzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGhpdHNbaV0pKXtcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKGhpdHNbaV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDtpKz0xKXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGhpdHMuaW5kZXhPZihsaXN0WzBdKTtcbiAgICAgICAgICAgIGhpdHMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy9yZXR1cm5zIHZhbGlkIHRhcmdldCBhZGphY2VudCB0byB0aGUgaW5wdXQgY29vcmRpbmF0ZVxuICAgICAgY29uc3QgZ2V0QWRqYWNlbnQgPSAoaW5wdXRDb29yZCkgPT4ge1xuICAgICAgICBsZXQgW2EsIC4uLnJlc3RdID0gaW5wdXRDb29yZDtcbiAgICAgICAgbGV0IGNoYXIgPSBhO1xuICAgICAgICBsZXQgbnVtID0gcGFyc2VJbnQocmVzdC5qb2luKCcnKSk7XG4gICAgICAgIGxldCBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgIGlmKGNvZGUrMTw9NzQpe1xuICAgICAgICAgIGxldCBjb29yZCA9IChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUrMSkrbnVtKTtcblxuICAgICAgICAgIGlmKCEoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkpe1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoY29kZS0xPj02NSl7XG4gICAgICAgICAgbGV0IGNvb3JkID0gKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZS0xKStudW0pO1xuXG4gICAgICAgICAgaWYoIShlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZihudW0rMTw9MTApe1xuICAgICAgICAgIGxldCBjb29yZCA9IGNoYXIgKyAobnVtICsgMSk7XG5cbiAgICAgICAgICBpZighKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpKXtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG51bS0xPj0xKXtcbiAgICAgICAgICBsZXQgY29vcmQgPSBjaGFyICsgKG51bSAtIDEpO1xuXG4gICAgICAgICAgaWYoIShlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGZvcihsZXQgaT0wO2k8aGl0cy5sZW5ndGg7aSs9MSl7XG4gICAgICAgIGxldCBhZGphY2VudCA9IGdldEFkamFjZW50KGhpdHNbaV0pO1xuXG4gICAgICAgIGlmKEJvb2xlYW4oYWRqYWNlbnQpKXtcbiAgICAgICAgICB0YXJnZXQgPSBhZGphY2VudDtcbiAgICAgICAgICByZXR1cm4gYWRqYWNlbnQ7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB0YXJnZXRBZGphY2VudCgpO1xuICAgIGlmKGhpdHMubGVuZ3RoICE9PSAwKXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBhZGphY2VudCB0YXJnZXQgZm91bmQgPT4gJHt0YXJnZXR9YCk7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG5cbiAgICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpICkgKyA2NTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgXG4gICAgICAvL3JlbWFrZXMgYXR0YWNrIGlmIHRhcmdldCBoYXMgYWxyZWFkeSBiZWVuIGhpdFxuICAgICAgaWYoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgICBkb3tcbiAgICAgICAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGdlbmVyYXRlQXR0YWNrKCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIGNvbnN0IHdvbiA9ICgpID0+IHtcbiAgICB3aW5zICs9IDE7XG4gIH07XG5cbiAgY29uc3QgZ2V0V2lucyA9ICgpID0+IHtcbiAgICByZXR1cm4gd2lucztcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgY29tcHV0ZXIsIGlzVHVybiwgbWFrZUF0dGFjaywgZ2V0TmFtZSwgd29uLCBnZXRXaW5zIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZUFycmF5KSA9PntcbiAgbGV0IGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZUFycmF5O1xuICBsZXQgbGVuZ3RoID0gY29vcmRpbmF0ZUFycmF5Lmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZihsZW5ndGggPT09IGRhbWFnZSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0RGFtYWdlID0gKCkgPT4ge1xuICAgIHJldHVybiBkYW1hZ2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBnZXREYW1hZ2UgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZihzZWNvbmRQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSl7XG4gICAgY29uc29sZS5sb2coJ3BsYXllcjEgV0lOUycpO1xuICAgIGZpcnN0UGxheWVyLndvbigpO1xuICAgIHJldHVybiAnZmlyc3QnO1xuICB9IGVsc2UgaWYgKGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpe1xuICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIyIFdJTlMnKTtcbiAgICBzZWNvbmRQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuICdzZWNvbmQnO1xuICB9O1xufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzZXQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGlmKHdpbm5lciA9PT0gJ2ZpcnN0JyYmZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ3NlY29uZCcmJnNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG4gIGNvbnNvbGUubG9nKCdHQU1FIEhBUyBCRUVOIFJFU0VULicpO1xuICBcbiAgZmlyc3RQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgc2Vjb25kUGxheWVyLmJvYXJkLnJlc2V0KCk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IGdyaWRFdmVudHMsIHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGZpcnN0VHVybiwgY2hhbmdlVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCwgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcblxuZXhwb3J0IGxldCBwbGF5ZXJPbmUscGxheWVyVHdvO1xuXG5leHBvcnQgY29uc3Qgc2V0dXAgPSAobmFtZU9uZSwgbmFtZVR3bykgPT4ge1xuICBpZighcGxheWVyT25lfHwhcGxheWVyVHdvKXtcbiAgICBsZXQgeCA9IGZhbHNlO1xuXG4gICAgaWYobmFtZVR3byA9PT0gJ2NvbXB1dGVyJyl7XG4gICAgICB4ID0gdHJ1ZTtcbiAgICB9O1xuICAgIFxuICAgIHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihuYW1lT25lKTtcbiAgICBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIobmFtZVR3byx4KTtcbiAgICAvL05FRUQgVE8gRE8gU0hJUCBQTEFDRU1FTlQgSEVSRVxuICAgIGdyaWRFdmVudHMoKTtcbiAgfTtcblxuICAvL3RlbXBvcmFyeSBwbGFjZW1lbnQgc2V0dXBcbiAgcGxheWVyT25lLmJvYXJkLnBsYWNlKFsnQzMnLCdDNCcsJ0M1J10pO1xuICBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydFMycsJ0YzJywnRzMnXSk7XG4gIHBsYXllck9uZS5ib2FyZC5wbGFjZShbJ0ExJywnQjEnLCdDMScsJ0QxJ10pO1xuICAvLyBwbGF5ZXJPbmUuYm9hcmQucGxhY2UoWydDMTAnLCdEMTAnLCdFMTAnLCdGMTAnXSk7XG5cbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlKFsnQTQnLCdCNCcsJ0M0J10pO1xuICAvLyBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydBNScsJ0E2JywnQTcnXSk7XG4gIHBsYXllclR3by5ib2FyZC5wbGFjZShbJ0U1JywnRjUnLCdHNScsJ0g1J10pO1xuICAvLyBwbGF5ZXJUd28uYm9hcmQucGxhY2UoWydFNicsJ0U3JywnRTgnLCdFOSddKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcblxuICBpZihwbGF5ZXJPbmUuZ2V0V2lucygpID09PSAwICYmIHBsYXllclR3by5nZXRXaW5zKCkgPT09IDApe1xuICAgIGZpcnN0VHVybihwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgfTtcblxuICBoaWdobGlnaHQocGxheWVyT25lLHBsYXllclR3byk7XG5cbiAgbGV0IGNvbXB1dGVyUGxheWVyO1xuXG4gIGlmKHBsYXllck9uZS5jb21wdXRlcil7XG4gICAgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmNvbXB1dGVyKXtcbiAgICBjb21wdXRlclBsYXllciA9IHBsYXllclR3bztcbiAgfTtcbiAgXG4gIGlmKGNvbXB1dGVyUGxheWVyLmlzVHVybil7XG4gICAgY29tcFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gIH07XG59O1xuIiwiLy9pbnB1dCBjZWxsIGVsZW1lbnQgZGF0YSBhdHRyaWJ1dGVcbi8vb3V0cHV0IGF0dGFjayBjb29yZGluYXRlc1xuZXhwb3J0IGNvbnN0IHBhcnNlQ2VsbENvb3JkaW5hdGUgPSAoYXR0cmlidXRlKSA9PiB7XG4gIGlmKHR5cGVvZiBhdHRyaWJ1dGUgIT09ICdzdHJpbmcnKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgbGV0IGFyciA9IGF0dHJpYnV0ZS5zcGxpdCgnJyk7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYoIShpc05hTihwYXJzZUludChhcnJheVsxXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZSgwLDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0dGVyVmFsdWUgPSBhcnJheVswXTtcbiAgICB9O1xuXG4gICAgbGV0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSgoNjUgKyBjb2RlVmFsdWUpIC0gMSk7XG5cbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYoIShpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGgtMl0pKSkpe1xuICAgICAgbGV0IHR3b0RpZ2l0ID0gYXJyYXkuc2xpY2UoYXJyYXkubGVuZ3RoLTIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciA9IGFycmF5W2FycmF5Lmxlbmd0aC0xXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBsZXQgbGV0dGVyID0gZ2V0TGV0dGVyKGFycik7XG4gIGxldCBudW1iZXIgPSBnZXROdW1iZXIoYXJyKTtcblxuICByZXR1cm4gbGV0dGVyICsgbnVtYmVyO1xufTtcbiIsImltcG9ydCB7IGhpZ2hsaWdodCwgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL2NoZWNrV2luXCI7XG5pbXBvcnQgeyBnYW1lUmVzZXQgfSBmcm9tIFwiLi9nYW1lUmVzZXRcIjtcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5cbi8vcmFuZG9tbHkgY2hvb3NlcyBhIHBsYXllciB0byBnbyBmaXJzdFxuZXhwb3J0IGNvbnN0IGZpcnN0VHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTApICsgMSk7XG5cbiAgaWYobnVtYmVyJTIgPT09IDApe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9IGVsc2UgaWYgKG51bWJlciUyICE9PSAwKXtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9O1xufTtcblxuLy9jaGFuZ2VzIGN1cnJlbnQgcGxheWVyXG5leHBvcnQgY29uc3QgY2hhbmdlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYElUIElTIE5PVyAke3NlY29uZFBsYXllci5nZXROYW1lKCl9cyBUVVJOLmApO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtmaXJzdFBsYXllci5nZXROYW1lKCl9cyBUVVJOLmApO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgdGFyZ2V0KSA9PiB7XG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgaWYoc2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkLHRhcmdldCk7XG5cbiAgICAgIGlmKGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcikgPT09ICdmaXJzdCcpe1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllciwnZmlyc3QnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGlmKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLHRhcmdldCk7XG5cbiAgICAgIGlmKGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcikgPT09ICdzZWNvbmQnKXtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ3NlY29uZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuXG4gIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbXBUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYoZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xuXG4gICAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnZmlyc3QnKXtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ2ZpcnN0Jyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpe1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQpO1xuXG4gICAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnc2Vjb25kJyl7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdzZWNvbmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIGhpZ2hsaWdodChmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IHR1cm5Xb24gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGdhbWVSZXNldChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICBzZXR1cCgpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICAvL2JyaW5nIHVwIG1lbnVcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkXCI7XG5pbXBvcnQgeyBtZW51RXZlbnRzIH0gZnJvbSBcIi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWdyaWQnKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1ncmlkJyk7XG5cbmNyZWF0ZUdyaWQocGxheWVyT25lR3JpZCwxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwyKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=