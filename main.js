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

    for(let i=0;i<11;i+=1){
      let currentRow = row
      let gridCell = document.createElement('div');
      gridCell.classList.add('grid-cell');
      gridCell.classList.add(`grid-cell-${gridNum}`);
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


/***/ }),

/***/ "./src/DOM/interaction/grid.js":
/*!*************************************!*\
  !*** ./src/DOM/interaction/grid.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gridEvents": () => (/* binding */ gridEvents),
/* harmony export */   "placementPhase": () => (/* binding */ placementPhase),
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid)
/* harmony export */ });
/* harmony import */ var _modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/parseCellCoordinate */ "./src/modules/parseCellCoordinate.js");
/* harmony import */ var _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/gameStart */ "./src/modules/gameStart.js");
/* harmony import */ var _modules_turn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/turn */ "./src/modules/turn.js");
/* harmony import */ var _modules_computer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/computer */ "./src/modules/computer.js");





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

const renderGrid = (cells,player) => {
  if(player.board.fleetCoordinates().length === 0){
    resetGrid(cells);
    return;
  };

  const fleet = player.board.fleetCoordinates();
  const fleetArr = fleet.reduce((acc,val)=>acc.concat(val));

  cells.forEach((cell)=>{
    let coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cell.getAttribute('data-cell-coordinate'));

    if(fleetArr.includes(coord) && player.board.attacks.includes(coord)) {
      cell.textContent = '●';
    } else if(!(fleetArr.includes(coord)) && player.board.attacks.includes(coord)) {
      cell.textContent = '/';
    };

    if(player.computer){
      return;
    };

    if((0,_modules_computer__WEBPACK_IMPORTED_MODULE_3__.checkForComputer)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo) || (player.board.attacks.length === 0 && player.board.fleetCoordinates().length < 5)){
      if(fleetArr.includes(coord)){
        cell.textContent = '○';
      };
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

//Creates and adds event listeners for the placement phase.
const placementPhase = (player, playerNum) => {
  const placement = document.getElementById('placement');
  const doneBtn = document.getElementById('done-btn');
  placement.style.display = 'block';
  doneBtn.style.display = null;

  let cells = document.querySelectorAll(`.grid-cell-${playerNum}`);
  const sizeArr = [5,4,3,3,2];
  let axis = 'y';

  cells.forEach((cell)=>{
    if(checkTier(cell)){
      return;
    };

    cell.addEventListener('mouseover',(e)=>{
      if(sizeArr.length===0){
        return;
      };

      let targetCell = e.target;
      let targetCellCoordinate = targetCell.getAttribute('data-cell-coordinate');
      let hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);
      // ------------------------------------------------
      //should make each of these a function
      hoverCells.forEach((hoverCell)=>{
        if(!hoverCell){
          //alert user they are trying to place a ship out of bounds.
          return;
        };

        hoverCell.classList.add('grid-cell-hover');
      });

      targetCell.onmouseleave = (e) => {
        cells.forEach((c)=>{
          c.classList.remove('grid-cell-hover');
        });
      };
      // ------------------------------------------------
      
      //change axis
      document.oncontextmenu = (e) => {
        e.preventDefault();

        hoverCells.forEach((hoverCell)=>{
          if(hoverCell === null){
            return;
          };

          hoverCell.classList.remove('grid-cell-hover');
        });

        if(axis === 'y'){
          axis = 'x';
        } else if (axis === 'x'){
          axis = 'y';
        };

        hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);

        hoverCells.forEach((hoverCell)=>{
          if(hoverCell === null){
            return;
          };

          hoverCell.classList.add('grid-cell-hover');
        });
      };

      //place ship
      targetCell.onclick = (e) => {
        if(hoverCells.includes(null)){
          console.log('OUT OF BOUNDS.');
          return;
        };

        let fleetArr = [];

        if(!(player.board.fleetCoordinates().length === 0)){
          fleetArr = player.board.fleetCoordinates().reduce((acc,val)=> acc.concat(val));
        };

        for(let i=0;i<hoverCells.length;i+=1){
          let cellCoord = hoverCells[i].getAttribute('data-cell-coordinate');

          if(fleetArr.includes((0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cellCoord))){
            return;
          };
        };

        const coordArr = [];

        for(let i=0;i<hoverCells.length;i+=1){
          let attribute = hoverCells[i].getAttribute('data-cell-coordinate');
          let coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(attribute);
          coordArr.push(coord);
        };

        player.board.place(coordArr);
        sizeArr.shift();
        hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);
        //rerender hovercells for hover visual
        renderGrid(cells,player);

        if(sizeArr.length === 0){
          doneBtn.style.display = 'block';
        };
      };
    });
  });
};

//returns node list
const getHoverCells = (start,size,axis,playerNum) => {
  const hoverCells = [];
  const startArr = start.split('');
  let x = getX(startArr);
  x = parseInt(x);
  let y = getY(startArr);
  y = parseInt(y);

  if(axis === 'x'){
    for(let i=0;i<size;i+=1){
      let cellX = (x + i) + '-' + y;
      hoverCells.push(document.querySelector(`.grid-${playerNum} [data-cell-coordinate="${cellX}"]`));
    };
  } else if (axis === 'y'){
    for(let i=0;i<size;i+=1){
      let cellY = x + '-' + (y + i);
      hoverCells.push(document.querySelector(`.grid-${playerNum} [data-cell-coordinate="${cellY}"]`));
    };
  };

  return hoverCells;
};

const getX = (arr) =>{
  let x;
  if(!(isNaN(parseInt(arr[1])))){
    let twoDigit = arr.slice(0,2);
    x = twoDigit.join('');
  } else {
    x = arr[0];
  };
  return x;
};

const getY = (arr) => {
  let y;
  if(!(isNaN(parseInt(arr[arr.length-2])))){
    let twoDigit = arr.slice(arr.length-2);
    y = twoDigit.join('');
  } else {
    y = arr[arr.length-1];
  };
  return y;
};


/***/ }),

/***/ "./src/DOM/interaction/highlight.js":
/*!******************************************!*\
  !*** ./src/DOM/interaction/highlight.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "highlight": () => (/* binding */ highlight)
/* harmony export */ });
const highlight = (firstPlayer, secondPlayer) => {
  const playerOneDisplay = document.getElementById('player-one-display');
  const playerTwoDisplay = document.getElementById('player-two-display');
  const grid1 = document.getElementById('player-one-grid');
  const grid2 = document.getElementById('player-two-grid');

  playerOneDisplay.classList.remove('waiting-player');
  grid1.classList.remove('waiting-player');
  playerTwoDisplay.classList.remove('waiting-player');
  grid2.classList.remove('waiting-player');

  if(firstPlayer.board.getShips().length === 0 && secondPlayer.board.getShips().length === 0){
    return;
  };

  if(firstPlayer.board.attacks.length === 0 &&secondPlayer.board.attacks.length === 0){
    if(firstPlayer.isTurn){
      playerTwoDisplay.classList.add('waiting-player');
      grid2.classList.add('waiting-player');
    } else if (secondPlayer.isTurn){
      playerOneDisplay.classList.add('waiting-player');
      grid1.classList.add('waiting-player');
    };
    return;
  };

  if(firstPlayer.isTurn){
    playerTwoDisplay.classList.add('waiting-player');
    grid2.classList.add('waiting-player');
  } else if (secondPlayer.isTurn){
    playerOneDisplay.classList.add('waiting-player');
    grid1.classList.add('waiting-player');
  };
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
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _modules_computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/computer */ "./src/modules/computer.js");





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
  hide(placement);

  if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo.computer){
    (0,_modules_computer__WEBPACK_IMPORTED_MODULE_2__.computerPlacement)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo,[2,2]);
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo);
  } else {
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo,2);
  };
};

const start = () => {
  let playerNames = getNames();
  let nameOne = playerNames[0];
  let nameTwo = playerNames[1]

  if(nameOne === '' || nameTwo === ''){
    return;
  };

  hide(names);

  (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.setup)(nameOne,nameTwo);
  playerOneNameEl.value = '';
  // playerTwoName.value = '';
};

//menu interaction events
const menuEvents = (() => {

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

  doneBtn.addEventListener('click',()=>{
    done();
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
/* harmony export */   "updateDisplays": () => (/* binding */ updateDisplays)
/* harmony export */ });
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

/***/ "./src/modules/computer.js":
/*!*********************************!*\
  !*** ./src/modules/computer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkForComputer": () => (/* binding */ checkForComputer),
/* harmony export */   "computerPlacement": () => (/* binding */ computerPlacement)
/* harmony export */ });
/* harmony import */ var _gameStart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameStart */ "./src/modules/gameStart.js");


const computerPlacement = (player,sizeArr) => {
  let numberOfShips = sizeArr.length

  for(let i=0;i<numberOfShips;i+=1){
    let coords = generateCoordinates(player,sizeArr[0]);

    let currentFleet = player.board.fleetCoordinates();
    let fleetArr;

    if(currentFleet.length !== 0){
      fleetArr = currentFleet.reduce((acc,val)=>acc.concat(val));
    };

    while(checkCoordinates(coords,fleetArr)){
      let old = coords;
      coords = generateCoordinates(player,sizeArr[0]);
      // console.log(`old coords: ${old}| new coords: ${coords}`);
    };

    // console.log(`computer places ship at ${coords}`);
    player.board.place(coords);
    sizeArr.shift();
  };
  
  (0,_gameStart__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
};

const generateCoordinates = (player,size) => {
  let axis = generateAxis();
  let start = generateStart();
  let x = start[0];
  let y = start [1];
  const coordArr = [];

  if(axis === 'x'){
    //increment letter
    for(let i=0;i<size;i+=1){
      let code = x.charCodeAt(0);
      let cellX = String.fromCharCode(code + i) + y;
      coordArr.push(cellX);
    };
  } else if (axis === 'y'){
    //increment number
    for(let i=0;i<size;i+=1){
      let cellY = x + (y + i);
      coordArr.push(cellY);
    };
  };

  return coordArr;
};

//return true if coordinates are invalid
const checkCoordinates = (coordinates,fleet) => {
  for(let i=0;i<coordinates.length;i+=1){
    if(fleet === undefined){
      break;
    }else if(fleet.includes(coordinates[i])){
      console.log('ship conflict');
      return true;
    };
  };

  let [letter,...rest] = coordinates[0];
  let x = letter;
  let y = parseInt(rest.join(''));

  if(x.charCodeAt(0)+(coordinates.length-1)>74){
    return true;
  }else if(y + (coordinates.length-1)>10){
    return true;
  };
};

const generateAxis = () => {
  let number = Math.floor((Math.random() * 10) + 1);
  let axis;

  if(number%2 === 0){
    axis = 'x';
  } else if (number%2 !== 0){
    axis = 'y';
  };

  return axis;
};

const generateStart = () => {
  const generateCharCode = () => {
    return Math.floor(Math.random() * (74 - 65 + 1) ) + 65;
  };

  let letter = String.fromCharCode(generateCharCode());
  let number = Math.floor(Math.random() * 10 + 1);
  // target = letter + number;

  return [letter,number];
};

const checkForComputer = (firstPlayer, secondPlayer) => {
  if(firstPlayer.computer || secondPlayer.computer){
    return true;
  } else {
    return false;
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
/* harmony export */   "gameStart": () => (/* binding */ gameStart),
/* harmony export */   "playerOne": () => (/* binding */ playerOne),
/* harmony export */   "playerTwo": () => (/* binding */ playerTwo),
/* harmony export */   "setup": () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var _factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/createPlayer */ "./src/factories/createPlayer.js");
/* harmony import */ var _DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/components/createPlayerDisplays */ "./src/DOM/components/createPlayerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");
/* harmony import */ var _DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DOM/interaction/highlight */ "./src/DOM/interaction/highlight.js");







let playerOne,playerTwo;

const setup = (nameOne, nameTwo) => {
  if(!playerOne||!playerTwo){
    let x = false;

    if(nameTwo === 'computer'){
      x = true;
    };
    
    playerOne = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameOne);
    playerTwo = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameTwo,x);
    (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerOne,1);
    (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerTwo,2);
  };
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__.highlight)(playerOne,playerTwo);
  //show placement menu
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.placementPhase)(playerOne, 1);
};

//should be called after ships have been placed
const gameStart = () => {
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.gridEvents)();

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-1'),playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-2'),playerTwo);

  if(playerOne.getWins() === 0 && playerTwo.getWins() === 0){
    (0,_turn__WEBPACK_IMPORTED_MODULE_3__.firstTurn)(playerOne,playerTwo);
  };

  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__.highlight)(playerOne,playerTwo);

  let computerPlayer;

  if(playerOne.computer){
    computerPlayer = playerOne;
  } else if (playerTwo.computer){
    computerPlayer = playerTwo;
  };
  
  if(computerPlayer.isTurn){
    (0,_turn__WEBPACK_IMPORTED_MODULE_3__.compTurn)(playerOne,playerTwo);
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
/* harmony import */ var _DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/interaction/highlight */ "./src/DOM/interaction/highlight.js");
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _checkWin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkWin */ "./src/modules/checkWin.js");
/* harmony import */ var _gameReset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameReset */ "./src/modules/gameReset.js");
/* harmony import */ var _gameStart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gameStart */ "./src/modules/gameStart.js");







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

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer,secondPlayer) === 'first'){
        turnWon(firstPlayer,secondPlayer,'first');
        return;
      };
    };
  } else if (secondPlayer.isTurn){
    if(firstPlayer.board.attacks.includes(target)){
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board,target);

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer,secondPlayer) === 'second'){
        turnWon(firstPlayer,secondPlayer,'second');
        return;
      }
    };
  };

  changeTurn(firstPlayer,secondPlayer);
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer,secondPlayer);

  compTurn(firstPlayer, secondPlayer);
};

const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    if(firstPlayer.computer){
      firstPlayer.makeAttack(secondPlayer.board);

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer,secondPlayer) === 'first'){
        turnWon(firstPlayer,secondPlayer,'first');
        return;
      };
    } else if (secondPlayer.computer){
      secondPlayer.makeAttack(firstPlayer.board);

      if((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer,secondPlayer) === 'second'){
        turnWon(firstPlayer,secondPlayer,'second');
        return;
      };
    };

    changeTurn(firstPlayer,secondPlayer);
    (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer,secondPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer,secondPlayer);
  }, 1000);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  console.log('game won.');
  (0,_gameReset__WEBPACK_IMPORTED_MODULE_4__.gameReset)(firstPlayer, secondPlayer, winner);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer,secondPlayer);
  (0,_gameStart__WEBPACK_IMPORTED_MODULE_5__.setup)();
};

const logTurn = () => {

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



const names = document.getElementById('names');
names.style.display = 'block';

const playerOneGrid = document.getElementById('player-one-grid');
const playerTwoGrid = document.getElementById('player-two-grid');

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid,1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid,2);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055RDtBQUNMOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0VBQVU7QUFDVixzRUFBVSxrQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2dyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9tZW51LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NoZWNrV2luLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbXB1dGVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVSZXNldC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lU3RhcnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy90dXJuLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY3JlYXRlR3JpZCA9IChncmlkLGdyaWROdW0pID0+IHtcbiAgZm9yKGxldCBpPTA7aTwxMTtpKz0xKXtcbiAgICBsZXQgcm93ID0gaTtcbiAgICBsZXQgZ3JpZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyaWRSb3cuY2xhc3NMaXN0LmFkZCgnZ3JpZC1yb3cnKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZSgnaWQnLGBncmlkLXJvdy0ke2l9YCk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LW51bWJlcicsYCR7aX1gKTtcblxuICAgIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgICBsZXQgY3VycmVudFJvdyA9IHJvd1xuICAgICAgbGV0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyxgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICAgICAgZ3JpZFJvdy5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG4gICAgfTtcbiAgICBcbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsUm93cyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IFtdO1xuICAgIGxldCByb3dzID0gZ3JpZC5jaGlsZE5vZGVzO1xuXG4gICAgcm93cy5mb3JFYWNoKChlKT0+e1xuICAgICAgbm9kZUxpc3QucHVzaChlLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuXG4gICAgbGV0IGkgPSAxO1xuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGlmKGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpID09PSAnMC0wJyl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7aX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IGdyaWQuZmlyc3RDaGlsZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMFxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGNvbnN0IGNlbGxDb29yZGluYXRlID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gICAgICBpZihjZWxsQ29vcmRpbmF0ZSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGxhYmVsUm93cygpO1xuICBsYWJlbENvbHVtbnMoKTtcbn07XG4iLCJjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktY29udCcpO1xuXG4gIGNvbnN0IHBsYXllck51bURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBuYW1lLnRleHRDb250ZW50ID0gYCR7cGxheWVyLmdldE5hbWUoKX1gO1xuXG4gIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHR1cm4uc2V0QXR0cmlidXRlKCdpZCcsYHR1cm4tJHtwbGF5ZXJOdW19YCk7XG4gIFxuICBpZihwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG5cbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNoaXBzLnNldEF0dHJpYnV0ZSgnaWQnLGBzaGlwcy0ke3BsYXllck51bX1gKTtcbiAgc2hpcHMudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtwbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuXG4gIGNvbnN0IHdpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHdpbnMuc2V0QXR0cmlidXRlKCdpZCcsYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSxuYW1lLHR1cm4sc2hpcHMsd2lucyk7XG5cbiAgaWYocGxheWVyTnVtID09PSAxKXtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpe1xuICAgIHBsYXllclR3b0Rpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9O1xufTtcbiIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICByZXR1cm4gY29vcmQ7XG59O1xuXG4vL3N0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybiYmZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4mJnNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgLy9zdG9wcyBwbGF5ZXIgZnJvbSBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIG93biBncmlkXG4gIGlmKHBsYXllck9uZS5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMScpKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTInKSl7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vL0NoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT57XG4gIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmKGNvb3JkaW5hdGVbMF09PT0nQCd8fChjb29yZGluYXRlLmxlbmd0aD09PTImJmNvb3JkaW5hdGVbMV09PT0nMCcpKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwnKTtcbiAgXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLy9hZGQgdHVybiBsaXN0ZW5lclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLHBsYXllclR3byxjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byxjb29yZCk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbC1ob3ZlcicpO1xuICAgIH0pO1xuXG4gICAgLy9yZW1vdmUgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBhbmQgcmVtb3ZlIGNsaWNrIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuXG4gICAgICBjZWxsLm9ubW91c2V1cCA9ICgpID0+e1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1tb3VzZWRvd24nKTtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwub25tb3VzZWxlYXZlID0gKCkgPT57XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscyxwbGF5ZXIpID0+IHtcbiAgaWYocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApe1xuICAgIHJlc2V0R3JpZChjZWxscyk7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3QgZmxlZXRBcnIgPSBmbGVldC5yZWR1Y2UoKGFjYyx2YWwpPT5hY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG5cbiAgICBpZihmbGVldEFyci5pbmNsdWRlcyhjb29yZCkgJiYgcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXjyc7XG4gICAgfSBlbHNlIGlmKCEoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpKSAmJiBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAnLyc7XG4gICAgfTtcblxuICAgIGlmKHBsYXllci5jb21wdXRlcil7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGlmKGNoZWNrRm9yQ29tcHV0ZXIocGxheWVyT25lLCBwbGF5ZXJUd28pIHx8IChwbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDAgJiYgcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPCA1KSl7XG4gICAgICBpZihmbGVldEFyci5pbmNsdWRlcyhjb29yZCkpe1xuICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXiyc7XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRHcmlkID0gKGNlbGxzKSA9PiB7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgaWYoY2hlY2tUaWVyKGNlbGwpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIGNlbGwudGV4dENvbnRlbnQgPSBudWxsO1xuICB9KTtcbn07XG5cbi8vQ3JlYXRlcyBhbmQgYWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwbGFjZW1lbnQgcGhhc2UuXG5leHBvcnQgY29uc3QgcGxhY2VtZW50UGhhc2UgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlbWVudCcpO1xuICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbmUtYnRuJyk7XG4gIHBsYWNlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcblxuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZ3JpZC1jZWxsLSR7cGxheWVyTnVtfWApO1xuICBjb25zdCBzaXplQXJyID0gWzUsNCwzLDMsMl07XG4gIGxldCBheGlzID0gJ3knO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgaWYoY2hlY2tUaWVyKGNlbGwpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLChlKT0+e1xuICAgICAgaWYoc2l6ZUFyci5sZW5ndGg9PT0wKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgbGV0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCB0YXJnZXRDZWxsQ29vcmRpbmF0ZSA9IHRhcmdldENlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgbGV0IGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKHRhcmdldENlbGxDb29yZGluYXRlLHNpemVBcnJbMF0sYXhpcyxwbGF5ZXJOdW0pO1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvL3Nob3VsZCBtYWtlIGVhY2ggb2YgdGhlc2UgYSBmdW5jdGlvblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpPT57XG4gICAgICAgIGlmKCFob3ZlckNlbGwpe1xuICAgICAgICAgIC8vYWxlcnQgdXNlciB0aGV5IGFyZSB0cnlpbmcgdG8gcGxhY2UgYSBzaGlwIG91dCBvZiBib3VuZHMuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpPT57XG4gICAgICAgICAgYy5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBcbiAgICAgIC8vY2hhbmdlIGF4aXNcbiAgICAgIGRvY3VtZW50Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpPT57XG4gICAgICAgICAgaWYoaG92ZXJDZWxsID09PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1ob3ZlcicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihheGlzID09PSAneScpe1xuICAgICAgICAgIGF4aXMgPSAneCc7XG4gICAgICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3gnKXtcbiAgICAgICAgICBheGlzID0gJ3knO1xuICAgICAgICB9O1xuXG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKHRhcmdldENlbGxDb29yZGluYXRlLHNpemVBcnJbMF0sYXhpcyxwbGF5ZXJOdW0pO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKT0+e1xuICAgICAgICAgIGlmKGhvdmVyQ2VsbCA9PT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvL3BsYWNlIHNoaXBcbiAgICAgIHRhcmdldENlbGwub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmKGhvdmVyQ2VsbHMuaW5jbHVkZXMobnVsbCkpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPVVQgT0YgQk9VTkRTLicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgZmxlZXRBcnIgPSBbXTtcblxuICAgICAgICBpZighKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSl7XG4gICAgICAgICAgZmxlZXRBcnIgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLnJlZHVjZSgoYWNjLHZhbCk9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvcihsZXQgaT0wO2k8aG92ZXJDZWxscy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgbGV0IGNlbGxDb29yZCA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuXG4gICAgICAgICAgaWYoZmxlZXRBcnIuaW5jbHVkZXMocGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsQ29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb29yZEFyciA9IFtdO1xuXG4gICAgICAgIGZvcihsZXQgaT0wO2k8aG92ZXJDZWxscy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgbGV0IGF0dHJpYnV0ZSA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgICAgIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoYXR0cmlidXRlKTtcbiAgICAgICAgICBjb29yZEFyci5wdXNoKGNvb3JkKTtcbiAgICAgICAgfTtcblxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2UoY29vcmRBcnIpO1xuICAgICAgICBzaXplQXJyLnNoaWZ0KCk7XG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKHRhcmdldENlbGxDb29yZGluYXRlLHNpemVBcnJbMF0sYXhpcyxwbGF5ZXJOdW0pO1xuICAgICAgICAvL3JlcmVuZGVyIGhvdmVyY2VsbHMgZm9yIGhvdmVyIHZpc3VhbFxuICAgICAgICByZW5kZXJHcmlkKGNlbGxzLHBsYXllcik7XG5cbiAgICAgICAgaWYoc2l6ZUFyci5sZW5ndGggPT09IDApe1xuICAgICAgICAgIGRvbmVCdG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vcmV0dXJucyBub2RlIGxpc3RcbmNvbnN0IGdldEhvdmVyQ2VsbHMgPSAoc3RhcnQsc2l6ZSxheGlzLHBsYXllck51bSkgPT4ge1xuICBjb25zdCBob3ZlckNlbGxzID0gW107XG4gIGNvbnN0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoJycpO1xuICBsZXQgeCA9IGdldFgoc3RhcnRBcnIpO1xuICB4ID0gcGFyc2VJbnQoeCk7XG4gIGxldCB5ID0gZ2V0WShzdGFydEFycik7XG4gIHkgPSBwYXJzZUludCh5KTtcblxuICBpZihheGlzID09PSAneCcpe1xuICAgIGZvcihsZXQgaT0wO2k8c2l6ZTtpKz0xKXtcbiAgICAgIGxldCBjZWxsWCA9ICh4ICsgaSkgKyAnLScgKyB5O1xuICAgICAgaG92ZXJDZWxscy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkLSR7cGxheWVyTnVtfSBbZGF0YS1jZWxsLWNvb3JkaW5hdGU9XCIke2NlbGxYfVwiXWApKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKGF4aXMgPT09ICd5Jyl7XG4gICAgZm9yKGxldCBpPTA7aTxzaXplO2krPTEpe1xuICAgICAgbGV0IGNlbGxZID0geCArICctJyArICh5ICsgaSk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFl9XCJdYCkpO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGhvdmVyQ2VsbHM7XG59O1xuXG5jb25zdCBnZXRYID0gKGFycikgPT57XG4gIGxldCB4O1xuICBpZighKGlzTmFOKHBhcnNlSW50KGFyclsxXSkpKSl7XG4gICAgbGV0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKDAsMik7XG4gICAgeCA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICB9IGVsc2Uge1xuICAgIHggPSBhcnJbMF07XG4gIH07XG4gIHJldHVybiB4O1xufTtcblxuY29uc3QgZ2V0WSA9IChhcnIpID0+IHtcbiAgbGV0IHk7XG4gIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyW2Fyci5sZW5ndGgtMl0pKSkpe1xuICAgIGxldCB0d29EaWdpdCA9IGFyci5zbGljZShhcnIubGVuZ3RoLTIpO1xuICAgIHkgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gYXJyW2Fyci5sZW5ndGgtMV07XG4gIH07XG4gIHJldHVybiB5O1xufTtcbiIsImV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuICBjb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZGlzcGxheScpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWdyaWQnKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1ncmlkJyk7XG5cbiAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCd3YWl0aW5nLXBsYXllcicpO1xuICBncmlkMS5jbGFzc0xpc3QucmVtb3ZlKCd3YWl0aW5nLXBsYXllcicpO1xuICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3dhaXRpbmctcGxheWVyJyk7XG4gIGdyaWQyLmNsYXNzTGlzdC5yZW1vdmUoJ3dhaXRpbmctcGxheWVyJyk7XG5cbiAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDAgJiYgc2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDAgJiZzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDApe1xuICAgIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3dhaXRpbmctcGxheWVyJyk7XG4gICAgICBncmlkMi5jbGFzc0xpc3QuYWRkKCd3YWl0aW5nLXBsYXllcicpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ3dhaXRpbmctcGxheWVyJyk7XG4gICAgICBncmlkMS5jbGFzc0xpc3QuYWRkKCd3YWl0aW5nLXBsYXllcicpO1xuICAgIH07XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCd3YWl0aW5nLXBsYXllcicpO1xuICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoJ3dhaXRpbmctcGxheWVyJyk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCd3YWl0aW5nLXBsYXllcicpO1xuICAgIGdyaWQxLmNsYXNzTGlzdC5hZGQoJ3dhaXRpbmctcGxheWVyJyk7XG4gIH07XG59OyIsImltcG9ydCB7IHNldHVwIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnQnO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGFjZW1lbnRQaGFzZSwgcmVuZGVyR3JpZCB9IGZyb20gJy4vZ3JpZCc7XG5pbXBvcnQgeyBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gJy4uLy4uL21vZHVsZXMvY29tcHV0ZXInO1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdWx0aXBsYXllcicpO1xuY29uc3QgbmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZXMnKTtcbmNvbnN0IHBsYWNlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZW1lbnQnKTtcbmNvbnN0IHJ1bGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3J1bGVzJyk7XG5cbmNvbnN0IHNpbmdsZVBsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW5nbGUtcGxheWVyJyk7XG5jb25zdCB0d29QbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHdvLXBsYXllcicpO1xuXG5jb25zdCBwbGF5ZXJPbmVOYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1uYW1lJyk7XG4vLyBjb25zdCBwbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tbmFtZScpO1xuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQnKTtcbmNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9uZS1idG4nKTtcblxuLy8gbGV0IG11bHRpcGxheWVyID0gZmFsc2U7XG5cbmNvbnN0IGhpZGUgPSAobWVudSkgPT4ge1xuICBtZW51LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xufTtcblxuY29uc3Qgc2hvdyA9IChtZW51KSA9PiB7XG4gIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG5jb25zdCBnZXROYW1lcyA9ICgpID0+IHtcbiAgbGV0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWU7XG4gIGxldCBwbGF5ZXJUd29OYW1lID0gJ2NvbXB1dGVyJztcbiAgLy8gaWYoIW11bHRpcGxheWVyKXtcbiAgLy8gICBwbGF5ZXJUd28gPSAnY29tcHV0ZXInO1xuICAvLyB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5jb25zdCBkb25lID0gKCkgPT4ge1xuICBsZXQgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ncmlkLTFgKTtcbiAgbGV0IGdyaWRDbG9uZSA9IGdyaWQuY2xvbmVOb2RlKHRydWUpO1xuICBncmlkLnJlcGxhY2VXaXRoKGdyaWRDbG9uZSk7XG4gIGhpZGUocGxhY2VtZW50KTtcblxuICBpZihwbGF5ZXJUd28uY29tcHV0ZXIpe1xuICAgIGNvbXB1dGVyUGxhY2VtZW50KHBsYXllclR3byxbMiwyXSk7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuICB9IGVsc2Uge1xuICAgIHBsYWNlbWVudFBoYXNlKHBsYXllclR3bywyKTtcbiAgfTtcbn07XG5cbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICBsZXQgcGxheWVyTmFtZXMgPSBnZXROYW1lcygpO1xuICBsZXQgbmFtZU9uZSA9IHBsYXllck5hbWVzWzBdO1xuICBsZXQgbmFtZVR3byA9IHBsYXllck5hbWVzWzFdXG5cbiAgaWYobmFtZU9uZSA9PT0gJycgfHwgbmFtZVR3byA9PT0gJycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBoaWRlKG5hbWVzKTtcblxuICBzZXR1cChuYW1lT25lLG5hbWVUd28pO1xuICBwbGF5ZXJPbmVOYW1lRWwudmFsdWUgPSAnJztcbiAgLy8gcGxheWVyVHdvTmFtZS52YWx1ZSA9ICcnO1xufTtcblxuLy9tZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuXG4gIC8vIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgLy8gICBoaWRlKG11bHRpcGxheWVyKTtcbiAgLy8gICBzaG93KG5hbWVzKTtcbiAgLy8gICBtdWx0aXBsYXllciA9IGZhbHNlO1xuICAvLyB9KTtcblxuICAvLyB0d29QbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gIC8vICAgaGlkZShtdWx0aXBsYXllcik7XG4gIC8vICAgc2hvdyhuYW1lcyk7XG4gIC8vICAgbXVsdGlwbGF5ZXIgPSB0cnVlO1xuICAvLyB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBzdGFydCgpO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcbiAgXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcblxuICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGRvbmUoKTtcbiAgfSk7XG59KSgpO1xuIiwiZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5jb25zdCB1cGRhdGVUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0xJyk7XG4gIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMicpO1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfTtcbn07XG5cbmNvbnN0IHVwZGF0ZVNoaXBzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgc2hpcHMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBzLTEnKTtcbiAgY29uc3Qgc2hpcHMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBzLTInKTtcbiAgc2hpcHMxLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7Zmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuICBzaGlwczIudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xufTtcblxuY29uc3QgdXBkYXRlV2lucyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHdpbnMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbnMtMScpO1xuICBjb25zdCB3aW5zMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5zLTInKTtcbiAgd2luczEudGV4dENvbnRlbnQgPSBgV2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YDtcbiAgd2luczIudGV4dENvbnRlbnQgPSBgV2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWA7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+e1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBhdHRhY2tzID0gW107XG4gIFxuICBjb25zdCBwbGFjZSA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGlmKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApPT57IHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCl9KTtcblxuICAgIGlmKHNoaXBJbmRleD4tMSl7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH07XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgfTtcbiAgXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT57XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yKGxldCBpPTA7aTxzaGlwcy5sZW5ndGg7aSs9MSl7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHNSZW1haW5pbmcgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgaWYoc2hpcC5pc1N1bmsoKSl7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwcy5sZW5ndGggLSBzaGlwc1N1bms7XG4gIH07XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiB7XG4gICAgaWYoc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzZXRBcnJheSA9IChhcnIpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhcnIubGVuZ3RoO1xuICAgIFxuICAgICAgZm9yKGxldCBpPTA7aTxzaXplO2krPTEpe1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXNldEFycmF5KHNoaXBzKTtcbiAgICByZXNldEFycmF5KGF0dGFja3MpO1xuICB9O1xuXG4gIHJldHVybiB7IGF0dGFja3MsIHBsYWNlLCByZWNlaXZlQXR0YWNrLCBnZXRTaGlwcywgZmxlZXRDb29yZGluYXRlcywgZ2V0U2hpcHNSZW1haW5pbmcsIGlzRmxlZXRTdW5rLCByZXNldCB9O1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLGlzQ29tcCA9IGZhbHNlKSA9PntcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBsZXQgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcbiAgXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCxjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZihjb21wdXRlcil7XG4gICAgICB0YXJnZXQgPSBjb21wdXRlckF0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH07XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgfTtcbiAgXG4gIGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKGVuZW15Qm9hcmQsZ2VuID0gMSkgPT4ge1xuICAgIGNvbnN0IGhpdHMgPSBbXTtcbiAgICBsZXQgc2hpcHMgPSBlbmVteUJvYXJkLmdldFNoaXBzKCk7XG4gICAgbGV0IHRhcmdldDtcblxuICAgIGNvbnN0IHRhcmdldEFkamFjZW50ID0gKCkgPT4ge1xuICAgICAgLy9wb3B1bGF0ZXMgaGl0cyBhcnJheVxuICAgICAgZm9yKGxldCBpPTA7aTxlbmVteUJvYXJkLmF0dGFja3MubGVuZ3RoO2krPTEpe1xuICAgICAgICBsZXQgYXRrID0gZW5lbXlCb2FyZC5hdHRhY2tzW2ldO1xuICAgICAgICBsZXQgZmxlZXRBcnIgPSBlbmVteUJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5yZWR1Y2UoKGFjYyx2YWwpPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICAgICAgICBpZihmbGVldEFyci5pbmNsdWRlcyhhdGspJiYhKGhpdHMuaW5jbHVkZXMoYXRrKSkpe1xuICAgICAgICAgIGhpdHMucHVzaChhdGspO1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgLy9yZW1vdmUgaGl0cyB0aGF0IGFyZSBvbiBzdW5rIHNoaXBzXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgICBpZihzaGlwLmlzU3VuaygpKXtcbiAgICAgICAgICBsZXQgbGlzdCA9IFtdO1xuXG4gICAgICAgICAgZm9yKGxldCBpPTA7aTxoaXRzLmxlbmd0aDtpKz0xKXtcbiAgICAgICAgICAgIGlmKHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXMoaGl0c1tpXSkpe1xuICAgICAgICAgICAgICBsaXN0LnB1c2goaGl0c1tpXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IobGV0IGk9MDtpPHNoaXAuY29vcmRpbmF0ZXMubGVuZ3RoO2krPTEpe1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gaGl0cy5pbmRleE9mKGxpc3RbMF0pO1xuICAgICAgICAgICAgaGl0cy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3JldHVybnMgdmFsaWQgdGFyZ2V0IGFkamFjZW50IHRvIHRoZSBpbnB1dCBjb29yZGluYXRlXG4gICAgICBjb25zdCBnZXRBZGphY2VudCA9IChpbnB1dENvb3JkKSA9PiB7XG4gICAgICAgIGxldCBbYSwgLi4ucmVzdF0gPSBpbnB1dENvb3JkO1xuICAgICAgICBsZXQgY2hhciA9IGE7XG4gICAgICAgIGxldCBudW0gPSBwYXJzZUludChyZXN0LmpvaW4oJycpKTtcbiAgICAgICAgbGV0IGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgaWYoY29kZSsxPD03NCl7XG4gICAgICAgICAgbGV0IGNvb3JkID0gKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSsxKStudW0pO1xuXG4gICAgICAgICAgaWYoIShlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZihjb2RlLTE+PTY1KXtcbiAgICAgICAgICBsZXQgY29vcmQgPSAoU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlLTEpK251bSk7XG5cbiAgICAgICAgICBpZighKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpKXtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG51bSsxPD0xMCl7XG4gICAgICAgICAgbGV0IGNvb3JkID0gY2hhciArIChudW0gKyAxKTtcblxuICAgICAgICAgIGlmKCEoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkpe1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYobnVtLTE+PTEpe1xuICAgICAgICAgIGxldCBjb29yZCA9IGNoYXIgKyAobnVtIC0gMSk7XG5cbiAgICAgICAgICBpZighKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpKXtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgZm9yKGxldCBpPTA7aTxoaXRzLmxlbmd0aDtpKz0xKXtcbiAgICAgICAgbGV0IGFkamFjZW50ID0gZ2V0QWRqYWNlbnQoaGl0c1tpXSk7XG5cbiAgICAgICAgaWYoQm9vbGVhbihhZGphY2VudCkpe1xuICAgICAgICAgIHRhcmdldCA9IGFkamFjZW50O1xuICAgICAgICAgIHJldHVybiBhZGphY2VudDtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHRhcmdldEFkamFjZW50KCk7XG4gICAgaWYoaGl0cy5sZW5ndGggIT09IDApe1xuICAgICAgLy8gY29uc29sZS5sb2coYGFkamFjZW50IHRhcmdldCBmb3VuZCA9PiAke3RhcmdldH1gKTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGdlbmVyYXRlQXR0YWNrID0gKCkgPT4ge1xuICAgICAgY29uc3QgZ2VuZXJhdGVDaGFyQ29kZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkgKSArIDY1O1xuICAgICAgfTtcblxuICAgICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICBcbiAgICAgIC8vcmVtYWtlcyBhdHRhY2sgaWYgdGFyZ2V0IGhhcyBhbHJlYWR5IGJlZW4gaGl0XG4gICAgICBpZihlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICAgIGRve1xuICAgICAgICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgICAgICBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZ2VuZXJhdGVBdHRhY2soKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3Qgd29uID0gKCkgPT4ge1xuICAgIHdpbnMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCB3b24sIGdldFdpbnMgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlQXJyYXkpID0+e1xuICBsZXQgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQXJyYXk7XG4gIGxldCBsZW5ndGggPSBjb29yZGluYXRlQXJyYXkubGVuZ3RoO1xuICBsZXQgZGFtYWdlID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgZGFtYWdlICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmKGxlbmd0aCA9PT0gZGFtYWdlKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBnZXREYW1hZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhbWFnZTtcbiAgfTtcblxuICByZXR1cm4geyBjb29yZGluYXRlcywgaGl0LCBpc1N1bmssIGdldERhbWFnZSB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjaGVja1dpbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmKHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKXtcbiAgICBjb25zb2xlLmxvZygncGxheWVyMSBXSU5TJyk7XG4gICAgZmlyc3RQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuICdmaXJzdCc7XG4gIH0gZWxzZSBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSl7XG4gICAgY29uc29sZS5sb2coJ3BsYXllcjIgV0lOUycpO1xuICAgIHNlY29uZFBsYXllci53b24oKTtcbiAgICByZXR1cm4gJ3NlY29uZCc7XG4gIH07XG59O1xuIiwiaW1wb3J0IHsgZ2FtZVN0YXJ0IH0gZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IChwbGF5ZXIsc2l6ZUFycikgPT4ge1xuICBsZXQgbnVtYmVyT2ZTaGlwcyA9IHNpemVBcnIubGVuZ3RoXG5cbiAgZm9yKGxldCBpPTA7aTxudW1iZXJPZlNoaXBzO2krPTEpe1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllcixzaXplQXJyWzBdKTtcblxuICAgIGxldCBjdXJyZW50RmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgIGxldCBmbGVldEFycjtcblxuICAgIGlmKGN1cnJlbnRGbGVldC5sZW5ndGggIT09IDApe1xuICAgICAgZmxlZXRBcnIgPSBjdXJyZW50RmxlZXQucmVkdWNlKChhY2MsdmFsKT0+YWNjLmNvbmNhdCh2YWwpKTtcbiAgICB9O1xuXG4gICAgd2hpbGUoY2hlY2tDb29yZGluYXRlcyhjb29yZHMsZmxlZXRBcnIpKXtcbiAgICAgIGxldCBvbGQgPSBjb29yZHM7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllcixzaXplQXJyWzBdKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBvbGQgY29vcmRzOiAke29sZH18IG5ldyBjb29yZHM6ICR7Y29vcmRzfWApO1xuICAgIH07XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgY29tcHV0ZXIgcGxhY2VzIHNoaXAgYXQgJHtjb29yZHN9YCk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlKGNvb3Jkcyk7XG4gICAgc2l6ZUFyci5zaGlmdCgpO1xuICB9O1xuICBcbiAgZ2FtZVN0YXJ0KCk7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKHBsYXllcixzaXplKSA9PiB7XG4gIGxldCBheGlzID0gZ2VuZXJhdGVBeGlzKCk7XG4gIGxldCBzdGFydCA9IGdlbmVyYXRlU3RhcnQoKTtcbiAgbGV0IHggPSBzdGFydFswXTtcbiAgbGV0IHkgPSBzdGFydCBbMV07XG4gIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgaWYoYXhpcyA9PT0gJ3gnKXtcbiAgICAvL2luY3JlbWVudCBsZXR0ZXJcbiAgICBmb3IobGV0IGk9MDtpPHNpemU7aSs9MSl7XG4gICAgICBsZXQgY29kZSA9IHguY2hhckNvZGVBdCgwKTtcbiAgICAgIGxldCBjZWxsWCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIGkpICsgeTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFgpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3knKXtcbiAgICAvL2luY3JlbWVudCBudW1iZXJcbiAgICBmb3IobGV0IGk9MDtpPHNpemU7aSs9MSl7XG4gICAgICBsZXQgY2VsbFkgPSB4ICsgKHkgKyBpKTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFkpO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGNvb3JkQXJyO1xufTtcblxuLy9yZXR1cm4gdHJ1ZSBpZiBjb29yZGluYXRlcyBhcmUgaW52YWxpZFxuY29uc3QgY2hlY2tDb29yZGluYXRlcyA9IChjb29yZGluYXRlcyxmbGVldCkgPT4ge1xuICBmb3IobGV0IGk9MDtpPGNvb3JkaW5hdGVzLmxlbmd0aDtpKz0xKXtcbiAgICBpZihmbGVldCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIGJyZWFrO1xuICAgIH1lbHNlIGlmKGZsZWV0LmluY2x1ZGVzKGNvb3JkaW5hdGVzW2ldKSl7XG4gICAgICBjb25zb2xlLmxvZygnc2hpcCBjb25mbGljdCcpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfTtcblxuICBsZXQgW2xldHRlciwuLi5yZXN0XSA9IGNvb3JkaW5hdGVzWzBdO1xuICBsZXQgeCA9IGxldHRlcjtcbiAgbGV0IHkgPSBwYXJzZUludChyZXN0LmpvaW4oJycpKTtcblxuICBpZih4LmNoYXJDb2RlQXQoMCkrKGNvb3JkaW5hdGVzLmxlbmd0aC0xKT43NCl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1lbHNlIGlmKHkgKyAoY29vcmRpbmF0ZXMubGVuZ3RoLTEpPjEwKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQXhpcyA9ICgpID0+IHtcbiAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxKTtcbiAgbGV0IGF4aXM7XG5cbiAgaWYobnVtYmVyJTIgPT09IDApe1xuICAgIGF4aXMgPSAneCc7XG4gIH0gZWxzZSBpZiAobnVtYmVyJTIgIT09IDApe1xuICAgIGF4aXMgPSAneSc7XG4gIH07XG5cbiAgcmV0dXJuIGF4aXM7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpICkgKyA2NTtcbiAgfTtcblxuICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgLy8gdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gIHJldHVybiBbbGV0dGVyLG51bWJlcl07XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tGb3JDb21wdXRlciA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmKGZpcnN0UGxheWVyLmNvbXB1dGVyIHx8IHNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzZXQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGlmKHdpbm5lciA9PT0gJ2ZpcnN0JyYmZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ3NlY29uZCcmJnNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG4gIGNvbnNvbGUubG9nKCdHQU1FIEhBUyBCRUVOIFJFU0VULicpO1xuICBcbiAgZmlyc3RQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgc2Vjb25kUGxheWVyLmJvYXJkLnJlc2V0KCk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tIFwiLi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IGdyaWRFdmVudHMsIHJlbmRlckdyaWQsIHBsYWNlbWVudFBoYXNlIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBmaXJzdFR1cm4sIGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgY29tcFR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBsZXQgcGxheWVyT25lLHBsYXllclR3bztcblxuZXhwb3J0IGNvbnN0IHNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgaWYoIXBsYXllck9uZXx8IXBsYXllclR3byl7XG4gICAgbGV0IHggPSBmYWxzZTtcblxuICAgIGlmKG5hbWVUd28gPT09ICdjb21wdXRlcicpe1xuICAgICAgeCA9IHRydWU7XG4gICAgfTtcbiAgICBcbiAgICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gICAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28seCk7XG4gICAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJPbmUsMSk7XG4gICAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJUd28sMik7XG4gIH07XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgLy9zaG93IHBsYWNlbWVudCBtZW51XG4gIHBsYWNlbWVudFBoYXNlKHBsYXllck9uZSwgMSk7XG59O1xuXG4vL3Nob3VsZCBiZSBjYWxsZWQgYWZ0ZXIgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuZXhwb3J0IGNvbnN0IGdhbWVTdGFydCA9ICgpID0+IHtcbiAgZ3JpZEV2ZW50cygpO1xuXG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJykscGxheWVyT25lKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuXG4gIGlmKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCl7XG4gICAgZmlyc3RUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICB9O1xuXG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcblxuICBsZXQgY29tcHV0ZXJQbGF5ZXI7XG5cbiAgaWYocGxheWVyT25lLmNvbXB1dGVyKXtcbiAgICBjb21wdXRlclBsYXllciA9IHBsYXllck9uZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uY29tcHV0ZXIpe1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyVHdvO1xuICB9O1xuICBcbiAgaWYoY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKXtcbiAgICBjb21wVHVybihwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgfTtcbn07XG4iLCIvL2lucHV0IGNlbGwgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZVxuLy9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYodHlwZW9mIGF0dHJpYnV0ZSAhPT0gJ3N0cmluZycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBsZXQgYXJyID0gYXR0cmlidXRlLnNwbGl0KCcnKTtcblxuICBjb25zdCBnZXRMZXR0ZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbGV0dGVyVmFsdWU7XG5cbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5WzFdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsMik7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH07XG5cbiAgICBsZXQgY29kZVZhbHVlID0gcGFyc2VJbnQobGV0dGVyVmFsdWUpO1xuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCg2NSArIGNvZGVWYWx1ZSkgLSAxKTtcblxuICAgIHJldHVybiBsZXR0ZXI7XG4gIH07XG5cbiAgY29uc3QgZ2V0TnVtYmVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IG51bWJlcjtcbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5W2FycmF5Lmxlbmd0aC0yXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGgtMik7XG4gICAgICBudW1iZXIgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoLTFdO1xuICAgIH07XG5cbiAgICByZXR1cm4gbnVtYmVyO1xuICB9O1xuXG4gIGxldCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgbGV0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuXG4gIHJldHVybiBsZXR0ZXIgKyBudW1iZXI7XG59O1xuIiwiaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHRcIjtcbmltcG9ydCB7IHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9jaGVja1dpblwiO1xuaW1wb3J0IHsgZ2FtZVJlc2V0IH0gZnJvbSBcIi4vZ2FtZVJlc2V0XCI7XG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gXCIuL2dhbWVTdGFydFwiO1xuXG4vL3JhbmRvbWx5IGNob29zZXMgYSBwbGF5ZXIgdG8gZ28gZmlyc3RcbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEpO1xuXG4gIGlmKG51bWJlciUyID09PSAwKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfSBlbHNlIGlmIChudW1iZXIlMiAhPT0gMCl7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfTtcbn07XG5cbi8vY2hhbmdlcyBjdXJyZW50IHBsYXllclxuZXhwb3J0IGNvbnN0IGNoYW5nZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGlmKHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCx0YXJnZXQpO1xuXG4gICAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnZmlyc3QnKXtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ2ZpcnN0Jyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgfTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBpZihmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCx0YXJnZXQpO1xuXG4gICAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnc2Vjb25kJyl7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdzZWNvbmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcblxuICBjb21wVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmKGZpcnN0UGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkKTtcblxuICAgICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ2ZpcnN0Jyl7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdmaXJzdCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcblxuICAgICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ3NlY29uZCcpe1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllciwnc2Vjb25kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gICAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCB0dXJuV29uID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBjb25zb2xlLmxvZygnZ2FtZSB3b24uJyk7XG4gIGdhbWVSZXNldChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICBzZXR1cCgpO1xufTtcblxuY29uc3QgbG9nVHVybiA9ICgpID0+IHtcblxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIjtcbmltcG9ydCB7IG1lbnVFdmVudHMgfSBmcm9tIFwiLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lcycpO1xubmFtZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1ncmlkJyk7XG5jb25zdCBwbGF5ZXJUd29HcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZ3JpZCcpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsMSk7XG5jcmVhdGVHcmlkKHBsYXllclR3b0dyaWQsMik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9