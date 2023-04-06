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
/* harmony export */   "placementPhase": () => (/* binding */ placementPhase),
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

const placementPhase = (player, playerNum) => {
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
        console.log(sizeArr);
        hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);
        //rerender hovercells for hover visual
        renderGrid(cells,player);

        if(sizeArr.length === 0){
          const doneBtn = document.getElementById('done-btn');
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

const nextPlacement = () => {

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
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _modules_computer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/computer */ "./src/modules/computer.js");






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
  doneBtn.style.display = null;
  if(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo.computer){
    (0,_modules_computer__WEBPACK_IMPORTED_MODULE_3__.computerPlacement)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo,[5,4,3,3,2]);
    (0,_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll('.grid-cell-2'),_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo);
    //computer places ships
    //generate a target coord
  } else {
    (0,_grid__WEBPACK_IMPORTED_MODULE_2__.placementPhase)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo,2);
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
  show(placement);

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



  //USE THIS

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
/* harmony export */   "computerPlacement": () => (/* binding */ computerPlacement)
/* harmony export */ });
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
      console.log(`old coords: ${old}| new coords: ${coords}`);
    };

    console.log(`computer places ship at ${coords}`);
    player.board.place(coords);
    sizeArr.shift();
  };
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
/* harmony import */ var _DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/components/createPlayerDisplays */ "./src/DOM/components/createPlayerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");







let playerOne,playerTwo;

const setup = (nameOne, nameTwo) => {
  if(!playerOne||!playerTwo){
    let x = false;

    if(nameTwo === 'computer'){
      x = true;
    };
    
    playerOne = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameOne);
    playerTwo = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameTwo,x);
  };

  (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerOne,1);
  (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerTwo,2);

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.placementPhase)(playerOne, 1);
  //call grid events in placement after players done?
  // gridEvents();

  //should all be at the end of placementPhase?
  //or rather maybe on done btn?
  // renderGrid(document.querySelectorAll('.grid-cell-1'),playerOne);
  // renderGrid(document.querySelectorAll('.grid-cell-2'),playerTwo);

  // if(playerOne.getWins() === 0 && playerTwo.getWins() === 0){
  //   firstTurn(playerOne,playerTwo);
  // };

  // highlight(playerOne,playerTwo);

  // let computerPlayer;

  // if(playerOne.computer){
  //   computerPlayer = playerOne;
  // } else if (playerTwo.computer){
  //   computerPlayer = playerTwo;
  // };
  
  // if(computerPlayer.isTurn){
  //   compTurn(playerOne,playerTwo);
  // };
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



const names = document.getElementById('names');
names.style.display = 'block';

const playerOneGrid = document.getElementById('player-one-grid');
const playerTwoGrid = document.getElementById('player-two-grid');

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid,1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid,2);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnlEO0FBQ0w7O0FBRXBEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVJlc2V0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsZ3JpZE51bSkgPT4ge1xuICBmb3IobGV0IGk9MDtpPDExO2krPTEpe1xuICAgIGxldCByb3cgPSBpO1xuICAgIGxldCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3JpZFJvdy5jbGFzc0xpc3QuYWRkKCdncmlkLXJvdycpO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKCdpZCcsYGdyaWQtcm93LSR7aX1gKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZSgnZGF0YS1yb3ctbnVtYmVyJyxgJHtpfWApO1xuICAgIC8vUFJPQkFCTFkgRE9OVCBORUVEIElEIEFORCBEQVRBIEFUVFJJQlVURSwgQlVUIEknTEwgQ09NRSBCQUNLIFRPIFRISVMuXG4gICAgZm9yKGxldCBpPTA7aTwxMTtpKz0xKXtcbiAgICAgIGxldCBjdXJyZW50Um93ID0gcm93XG4gICAgICBsZXQgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChgZ3JpZC1jZWxsLSR7Z3JpZE51bX1gKTtcbiAgICAgIGdyaWRDZWxsLnNldEF0dHJpYnV0ZSgnaWQnLGBncmlkLWNlbGwtJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnLGAke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCBibGFjayc7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9O1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoZ3JpZFJvdyk7XG4gIH07XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgbGV0IHJvd3MgPSBncmlkLmNoaWxkTm9kZXM7XG5cbiAgICByb3dzLmZvckVhY2goKGUpPT57XG4gICAgICBub2RlTGlzdC5wdXNoKGUuZmlyc3RDaGlsZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgaSA9IDE7XG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSk9PntcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgaWYoZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykgPT09ICcwLTAnKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgbGFiZWxDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gZ3JpZC5maXJzdENoaWxkLmNoaWxkTm9kZXM7XG4gICAgbGV0IGkgPSAwXG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSk9PntcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKTtcbiAgICAgIGlmKGNlbGxDb29yZGluYXRlID09PSAnMC0wJyl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1kaXNwbGF5Jyk7XG5jb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZGlzcGxheScpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyRGlzcGxheSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1jb250Jyk7XG5cbiAgY29uc3QgcGxheWVyTnVtRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIHBsYXllck51bURpc3BsYXkudGV4dENvbnRlbnQgPSBgUExBWUVSICR7cGxheWVyTnVtfWA7XG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBuYW1lLnRleHRDb250ZW50ID0gYCR7cGxheWVyLmdldE5hbWUoKX1gO1xuXG4gIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHR1cm4uc2V0QXR0cmlidXRlKCdpZCcsYHR1cm4tJHtwbGF5ZXJOdW19YCk7XG4gIGlmKHBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgfSBlbHNlIGlmICghcGxheWVyLmlzVHVybil7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfTtcblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgc2hpcHMuc2V0QXR0cmlidXRlKCdpZCcsYHNoaXBzLSR7cGxheWVyTnVtfWApO1xuICBzaGlwcy50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3BsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG5cbiAgY29uc3Qgd2lucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgd2lucy5zZXRBdHRyaWJ1dGUoJ2lkJyxgd2lucy0ke3BsYXllck51bX1gKTtcbiAgd2lucy50ZXh0Q29udGVudCA9IGBXaW5zOiAke3BsYXllci5nZXRXaW5zKCl9YDtcblxuICBkaXNwbGF5LmFwcGVuZChwbGF5ZXJOdW1EaXNwbGF5LG5hbWUsdHVybixzaGlwcyx3aW5zKTtcblxuICBpZihwbGF5ZXJOdW0gPT09IDEpe1xuICAgIHBsYXllck9uZURpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9IGVsc2UgaWYgKHBsYXllck51bSA9PT0gMil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH07XG59O1xuXG4vL3BsYXllciNcbi8vcGxheWVyIG5hbWVcbi8vaXMgdHVyblxuLy9jdXJyZW50IHNoaXBzIGFsaXZlXG4vL3dpbnMiLCJpbXBvcnQgeyBwYXJzZUNlbGxDb29yZGluYXRlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZVwiO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHR1cm4gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90dXJuXCI7XG5cbmNvbnN0IGdldEdyaWRDb29yZGluYXRlID0gKGNlbGwpID0+IHtcbiAgbGV0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKSk7XG4gIHJldHVybiBjb29yZDtcbn07XG5cbi8vc3RvcHMgcGxheWVycyBmcm9tIGludGVyYWN0aW5nIHdpdGggZ3JpZHMgd2hlbiB0aGV5IHNob3VsZG4ndCBiZVxuY29uc3QgZ3JpZExvZ2ljID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIGNlbGwpID0+IHtcbiAgbGV0IHg7XG5cbiAgLy9zdG9wcyBmdW5jdGlvbiBpZiBpdHMgY29tcHV0ZXJzIHR1cm5cbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuJiZmaXJzdFBsYXllci5jb21wdXRlcil7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybiYmc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcblxuICAvL3N0b3BzIHBsYXllciBmcm9tIGludGVyYWN0aW5nIHdpdGggdGhlaXIgb3duIGdyaWRcbiAgaWYocGxheWVyT25lLmlzVHVybiYmY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtY2VsbC0xJykpe1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMicpKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geDtcbn07XG5cbi8vQ2hlY2tzIGlmIHRoZSBjZWxsIGlzIGEgbGFiZWxcbmNvbnN0IGNoZWNrVGllciA9IChjZWxsKSA9PntcbiAgY29uc3QgY2VsbElEID0gY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gIGNvbnN0IGNvb3JkaW5hdGUgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxJRCk7XG5cbiAgaWYoY29vcmRpbmF0ZVswXT09PSdAJ3x8KGNvb3JkaW5hdGUubGVuZ3RoPT09MiYmY29vcmRpbmF0ZVsxXT09PScwJykpe1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdyaWRFdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuICBcbiAgY2VsbHMuZm9yRWFjaCgobm9kZSk9PntcbiAgICBpZihjaGVja1RpZXIobm9kZSkpe1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvL2FkZCB0dXJuIGxpc3RlbmVyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgbGV0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUscGxheWVyVHdvLGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgdHVybihwbGF5ZXJPbmUscGxheWVyVHdvLGNvb3JkKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvL3JlbW92ZSBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGFuZCByZW1vdmUgY2xpY2sgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsKGUpPT57XG4gICAgICBsZXQgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG5cbiAgICAgIGNlbGwub25tb3VzZXVwID0gKCkgPT57XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5vbm1vdXNlbGVhdmUgPSAoKSA9PntcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtbW91c2Vkb3duJyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vdGVtcG9yYXJpbHkgcmVuZGVyaW5nIGV2ZXJ5dGhpbmcgZm9yIHRlc3RpbmcvZGVidWdnaW5nIHB1cnBvc2VzXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscyxwbGF5ZXIpID0+IHtcbiAgaWYocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApe1xuICAgIHJlc2V0R3JpZChjZWxscyk7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3QgYXJyID0gZmxlZXQucmVkdWNlKChhY2MsdmFsKT0+YWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKT0+e1xuICAgIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICAgIGlmIChhcnIuaW5jbHVkZXMoY29vcmQpJiZwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAn4pePJztcbiAgICB9IGVsc2UgaWYgKCEoYXJyLmluY2x1ZGVzKGNvb3JkKSkmJnBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICcvJztcbiAgICB9IGVsc2UgaWYgKGFyci5pbmNsdWRlcyhjb29yZCkpe1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9ICfil4snO1xuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRHcmlkID0gKGNlbGxzKSA9PiB7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgaWYoY2hlY2tUaWVyKGNlbGwpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIGNlbGwudGV4dENvbnRlbnQgPSBudWxsO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZ3JpZC1jZWxsLSR7cGxheWVyTnVtfWApO1xuICBjb25zdCBzaXplQXJyID0gWzUsNCwzLDMsMl07XG4gIGxldCBheGlzID0gJ3knO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpPT57XG4gICAgaWYoY2hlY2tUaWVyKGNlbGwpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLChlKT0+e1xuICAgICAgaWYoc2l6ZUFyci5sZW5ndGg9PT0wKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgbGV0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCB0YXJnZXRDZWxsQ29vcmRpbmF0ZSA9IHRhcmdldENlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgbGV0IGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKHRhcmdldENlbGxDb29yZGluYXRlLHNpemVBcnJbMF0sYXhpcyxwbGF5ZXJOdW0pO1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvL3Nob3VsZCBtYWtlIGVhY2ggb2YgdGhlc2UgYSBmdW5jdGlvblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpPT57XG4gICAgICAgIGlmKCFob3ZlckNlbGwpe1xuICAgICAgICAgIC8vYWxlcnQgdXNlciB0aGV5IGFyZSB0cnlpbmcgdG8gcGxhY2UgYSBzaGlwIG91dCBvZiBib3VuZHMuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpPT57XG4gICAgICAgICAgYy5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBcbiAgICAgIC8vY2hhbmdlIGF4aXNcbiAgICAgIGRvY3VtZW50Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpPT57XG4gICAgICAgICAgaWYoaG92ZXJDZWxsID09PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1ob3ZlcicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihheGlzID09PSAneScpe1xuICAgICAgICAgIGF4aXMgPSAneCc7XG4gICAgICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3gnKXtcbiAgICAgICAgICBheGlzID0gJ3knO1xuICAgICAgICB9O1xuXG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKHRhcmdldENlbGxDb29yZGluYXRlLHNpemVBcnJbMF0sYXhpcyxwbGF5ZXJOdW0pO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKT0+e1xuICAgICAgICAgIGlmKGhvdmVyQ2VsbCA9PT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvL3BsYWNlIHNoaXBcbiAgICAgIHRhcmdldENlbGwub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmKGhvdmVyQ2VsbHMuaW5jbHVkZXMobnVsbCkpe1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdPVVQgT0YgQk9VTkRTLicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgZmxlZXRBcnIgPSBbXTtcblxuICAgICAgICBpZighKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSl7XG4gICAgICAgICAgZmxlZXRBcnIgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLnJlZHVjZSgoYWNjLHZhbCk9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvcihsZXQgaT0wO2k8aG92ZXJDZWxscy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgbGV0IGNlbGxDb29yZCA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuXG4gICAgICAgICAgaWYoZmxlZXRBcnIuaW5jbHVkZXMocGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsQ29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb29yZEFyciA9IFtdO1xuXG4gICAgICAgIGZvcihsZXQgaT0wO2k8aG92ZXJDZWxscy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgbGV0IGF0dHJpYnV0ZSA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICAgICAgICAgIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoYXR0cmlidXRlKTtcbiAgICAgICAgICBjb29yZEFyci5wdXNoKGNvb3JkKTtcbiAgICAgICAgfTtcblxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2UoY29vcmRBcnIpO1xuICAgICAgICBzaXplQXJyLnNoaWZ0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNpemVBcnIpO1xuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyh0YXJnZXRDZWxsQ29vcmRpbmF0ZSxzaXplQXJyWzBdLGF4aXMscGxheWVyTnVtKTtcbiAgICAgICAgLy9yZXJlbmRlciBob3ZlcmNlbGxzIGZvciBob3ZlciB2aXN1YWxcbiAgICAgICAgcmVuZGVyR3JpZChjZWxscyxwbGF5ZXIpO1xuXG4gICAgICAgIGlmKHNpemVBcnIubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbmUtYnRuJyk7XG4gICAgICAgICAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy9yZXR1cm5zIG5vZGUgbGlzdFxuY29uc3QgZ2V0SG92ZXJDZWxscyA9IChzdGFydCxzaXplLGF4aXMscGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGhvdmVyQ2VsbHMgPSBbXTtcbiAgY29uc3Qgc3RhcnRBcnIgPSBzdGFydC5zcGxpdCgnJyk7XG4gIGxldCB4ID0gZ2V0WChzdGFydEFycik7XG4gIHggPSBwYXJzZUludCh4KTtcbiAgbGV0IHkgPSBnZXRZKHN0YXJ0QXJyKTtcbiAgeSA9IHBhcnNlSW50KHkpO1xuXG4gIGlmKGF4aXMgPT09ICd4Jyl7XG4gICAgZm9yKGxldCBpPTA7aTxzaXplO2krPTEpe1xuICAgICAgbGV0IGNlbGxYID0gKHggKyBpKSArICctJyArIHk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFh9XCJdYCkpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3knKXtcbiAgICBmb3IobGV0IGk9MDtpPHNpemU7aSs9MSl7XG4gICAgICBsZXQgY2VsbFkgPSB4ICsgJy0nICsgKHkgKyBpKTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWX1cIl1gKSk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gaG92ZXJDZWxscztcbn07XG5cbmNvbnN0IGdldFggPSAoYXJyKSA9PntcbiAgbGV0IHg7XG4gIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyWzFdKSkpKXtcbiAgICBsZXQgdHdvRGlnaXQgPSBhcnIuc2xpY2UoMCwyKTtcbiAgICB4ID0gdHdvRGlnaXQuam9pbignJyk7XG4gIH0gZWxzZSB7XG4gICAgeCA9IGFyclswXTtcbiAgfTtcbiAgcmV0dXJuIHg7XG59O1xuXG5jb25zdCBnZXRZID0gKGFycikgPT4ge1xuICBsZXQgeTtcbiAgaWYoIShpc05hTihwYXJzZUludChhcnJbYXJyLmxlbmd0aC0yXSkpKSl7XG4gICAgbGV0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKGFyci5sZW5ndGgtMik7XG4gICAgeSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICB9IGVsc2Uge1xuICAgIHkgPSBhcnJbYXJyLmxlbmd0aC0xXTtcbiAgfTtcbiAgcmV0dXJuIHk7XG59O1xuXG5jb25zdCBuZXh0UGxhY2VtZW50ID0gKCkgPT4ge1xuXG59O1xuIiwiaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzJztcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlLCByZW5kZXJHcmlkIH0gZnJvbSAnLi9ncmlkJztcbmltcG9ydCB7IGNvbXB1dGVyUGxhY2VtZW50IH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9jb21wdXRlcic7XG5cbmNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211bHRpcGxheWVyJyk7XG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lcycpO1xuY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlbWVudCcpO1xuY29uc3QgcnVsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncnVsZXMnKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZS1wbGF5ZXInKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0d28tcGxheWVyJyk7XG5cbmNvbnN0IHBsYXllck9uZU5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLW5hbWUnKTtcbi8vIGNvbnN0IHBsYXllclR3b05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1uYW1lJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpO1xuY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb25lLWJ0bicpO1xuXG4vLyBsZXQgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcblxuY29uc3QgaGlkZSA9IChtZW51KSA9PiB7XG4gIG1lbnUuc3R5bGUuZGlzcGxheSA9IG51bGw7XG59O1xuXG5jb25zdCBzaG93ID0gKG1lbnUpID0+IHtcbiAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn07XG5cbmNvbnN0IGdldE5hbWVzID0gKCkgPT4ge1xuICBsZXQgcGxheWVyT25lTmFtZSA9IHBsYXllck9uZU5hbWVFbC52YWx1ZTtcbiAgbGV0IHBsYXllclR3b05hbWUgPSAnY29tcHV0ZXInO1xuICAvLyBpZighbXVsdGlwbGF5ZXIpe1xuICAvLyAgIHBsYXllclR3byA9ICdjb21wdXRlcic7XG4gIC8vIH07XG5cbiAgcmV0dXJuIFtwbGF5ZXJPbmVOYW1lLCBwbGF5ZXJUd29OYW1lXTtcbn07XG5cbmNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gIGxldCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQtMWApO1xuICBsZXQgZ3JpZENsb25lID0gZ3JpZC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGdyaWQucmVwbGFjZVdpdGgoZ3JpZENsb25lKTtcbiAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgaWYocGxheWVyVHdvLmNvbXB1dGVyKXtcbiAgICBjb21wdXRlclBsYWNlbWVudChwbGF5ZXJUd28sWzUsNCwzLDMsMl0pO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJykscGxheWVyVHdvKTtcbiAgICAvL2NvbXB1dGVyIHBsYWNlcyBzaGlwc1xuICAgIC8vZ2VuZXJhdGUgYSB0YXJnZXQgY29vcmRcbiAgfSBlbHNlIHtcbiAgICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJUd28sMik7XG4gIH07XG59O1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgbGV0IHBsYXllck5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgbGV0IG5hbWVPbmUgPSBwbGF5ZXJOYW1lc1swXTtcbiAgbGV0IG5hbWVUd28gPSBwbGF5ZXJOYW1lc1sxXVxuXG4gIGlmKG5hbWVPbmUgPT09ICcnIHx8IG5hbWVUd28gPT09ICcnKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgaGlkZShuYW1lcyk7XG4gIHNob3cocGxhY2VtZW50KTtcblxuICBzZXR1cChuYW1lT25lLG5hbWVUd28pO1xuICBwbGF5ZXJPbmVOYW1lRWwudmFsdWUgPSAnJztcbiAgLy8gcGxheWVyVHdvTmFtZS52YWx1ZSA9ICcnO1xufTtcblxuLy9tZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuXG4gIC8vIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgLy8gICBoaWRlKG11bHRpcGxheWVyKTtcbiAgLy8gICBzaG93KG5hbWVzKTtcbiAgLy8gICBtdWx0aXBsYXllciA9IGZhbHNlO1xuICAvLyB9KTtcblxuICAvLyB0d29QbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gIC8vICAgaGlkZShtdWx0aXBsYXllcik7XG4gIC8vICAgc2hvdyhuYW1lcyk7XG4gIC8vICAgbXVsdGlwbGF5ZXIgPSB0cnVlO1xuICAvLyB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCk9PntcbiAgICBzdGFydCgpO1xuICAgIC8vIGhpZGUobmFtZXMpO1xuICAgIC8vIHNob3cocGxhY2VtZW50KTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLChlKT0+e1xuICAgIGlmKGUua2V5ID09PSAnRW50ZXInKXtcbiAgICAgIHN0YXJ0KCk7XG4gICAgICAvLyBoaWRlKG5hbWVzKTtcbiAgICAgIC8vIHNob3cocGxhY2VtZW50KTtcbiAgICB9O1xuICB9KTtcbiAgXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsKGUpPT57XG4gICAgaWYoZS5rZXkgPT09ICdFbnRlcicpe1xuICAgICAgc3RhcnQoKTtcbiAgICAgIC8vIGhpZGUobmFtZXMpO1xuICAgICAgLy8gc2hvdyhwbGFjZW1lbnQpO1xuICAgIH07XG4gIH0pO1xuXG4gIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgZG9uZSgpO1xuICB9KTtcbn0pKCk7XG4iLCIvLyBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbi8vIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMicpO1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuICBpZihmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJnNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIH07XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXBsYXllcicpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG4vL05FRUQgU09NRVRISU5HIFdIRU4gUExBWUVSUyBBUkUgV0FJVElORyBGT1IgVEhFIE5FWFQgR0FNRVxuY29uc3QgdXBkYXRlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R1cm4tMScpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0xJyk7XG4gIGNvbnN0IHNoaXBzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwcy0yJyk7XG4gIHNoaXBzMS50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke2ZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgc2hpcHMyLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7c2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbn07XG5cbmNvbnN0IHVwZGF0ZVdpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB3aW5zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5zLTEnKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0yJyk7XG4gIHdpbnMxLnRleHRDb250ZW50ID0gYFdpbnM6ICR7Zmlyc3RQbGF5ZXIuZ2V0V2lucygpfWA7XG4gIHdpbnMyLnRleHRDb250ZW50ID0gYFdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9jcmVhdGVTaGlwXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PntcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG5cblxuICAvL1VTRSBUSElTXG5cbiAgLy9VU0UgRk9SIFBMQUNFIEZMRUVUIEZVTkNUSU9OXG4gIGZ1bmN0aW9uIE9MRHBsYWNlKGF4aXMsc3RhcnQsc2l6ZSl7XG4gICAgLy9YID0+IGhvcml6b250YWwgKyBsZXR0ZXJzXG4gICAgLy9ZID0+IHZlcnRpY2FsICsgbnVtYmVyc1xuICAgIGlmKCFheGlzfHwhc3RhcnR8fCFzaXplKXtcbiAgICAgIGNvbnNvbGUubG9nKCdwYXJhbWV0ZXIgbWlzc2luZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBsZXQgc3RhcnRBcnIgPSBzdGFydC5zcGxpdCgnJyk7XG4gICAgbGV0IHggPSBzdGFydEFyci5zbGljZSgwLDEpO1xuICAgIGxldCB5ID0gc3RhcnRBcnIuc2xpY2UoMSkuam9pbignJyk7XG5cbiAgICAvL3Rocm93cyBlcnJvciBpZiBzaGlwcyB3b3VsZCBiZSBwbGFjZWQgb3V0IG9mIGJvdW5kc1xuICAgIC8vdGhyb3dzIGVycm9ycyBmb3Igbm93IG1heWJlIGNoYW5nZSBsYXRlcioqXG4gICAgLy9USEUgQ09PUkRJTkFURVMgQ0FOIEJFIENIRUNLRUQgQkVGT1JFIFRIRVkgQVJFIFBBU1NFRCBUTyBQTEFDRSoqXG4gICAgaWYoKHhbMF0uY2hhckNvZGVBdCgwKStzaXplKT43NCl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NoaXAgZXhjZWVkcyB0aGUgeCBheGlzIG9mIHRoZSBnYW1lYm9hcmQuJyk7XG4gICAgfSBlbHNlIGlmICgocGFyc2VJbnQoeSkrc2l6ZSk+MTApe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaGlwIGV4Y2VlZHMgdGhlIHkgYXhpcyBvZiB0aGUgZ2FtZWJvYXJkLicpO1xuICAgIH07XG5cbiAgICAvL0NoZWNrIGlmIHBsYWNlbWVudCBjb29yZGluYXRlcyBjb25mbGljdCB3aXRoIGFueSBvdGhlciBzaGlwc1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvb3JkaW5hdGVzKHNoaXBBeGlzLHNoaXBTaXplKXtcbiAgICAgIGxldCBjb29yZGluYXRlcyA9IFtdO1xuXG4gICAgICBpZihzaGlwQXhpcyA9PT0gJ1gnKXtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGV0dGVyc1xuICAgICAgICBmb3IobGV0IGk9MDtpPHNoaXBTaXplO2krPTEpe1xuICAgICAgICAgIGxldCBuZXdYID0gU3RyaW5nLmZyb21DaGFyQ29kZSh4WzBdLmNoYXJDb2RlQXQoMCkraSk7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHtuZXdYICsgeX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2hpcEF4aXMgPT09ICdZJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IG51bWJlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKGAke3ggKyAocGFyc2VJbnQoeSkgKyBpKX1gKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgICB9O1xuXG5cbiAgICBsZXQgc2hpcCA9IGNyZWF0ZVNoaXAoY3JlYXRlQ29vcmRpbmF0ZXMoYXhpcyxzaXplKSk7XG4gICAgc2hpcHMucHVzaChzaGlwKTtcbiAgfTsgLy9PTEQgUExBQ0UgRlVOQ1RJT04sIFNUSUxMIFVTRUZVTCBDT0RFIElOIEhFUkUgRk9SIExBVEVSKipcblxuXG5cblxuXG5cbiAgXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgbGV0IG5ld1NoaXAgPSBjcmVhdGVTaGlwKGNvb3JkaW5hdGVzKTtcbiAgICBzaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIHJldHVybiBuZXdTaGlwO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYoYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHNoaXBJbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCk9PnsgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXModGFyZ2V0KX0pO1xuXG4gICAgaWYoc2hpcEluZGV4Pi0xKXtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfTtcblxuICAgIGF0dGFja3MucHVzaCh0YXJnZXQpO1xuICB9O1xuICBcbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzO1xuICB9O1xuXG4gIGNvbnN0IGZsZWV0Q29vcmRpbmF0ZXMgPSAoKSA9PntcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IobGV0IGk9MDtpPHNoaXBzLmxlbmd0aDtpKz0xKXtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApPT57XG4gICAgICBpZihzaGlwLmlzU3VuaygpKXtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZihzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCByZXNldEFycmF5ID0gKGFycikgPT4ge1xuICAgICAgY29uc3Qgc2l6ZSA9IGFyci5sZW5ndGg7XG4gICAgXG4gICAgICBmb3IobGV0IGk9MDtpPHNpemU7aSs9MSl7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJlc2V0QXJyYXkoc2hpcHMpO1xuICAgIHJlc2V0QXJyYXkoYXR0YWNrcyk7XG4gIH07XG5cbiAgcmV0dXJuIHsgYXR0YWNrcywgcGxhY2UsIHJlY2VpdmVBdHRhY2ssIGdldFNoaXBzLCBmbGVldENvb3JkaW5hdGVzLCBnZXRTaGlwc1JlbWFpbmluZywgaXNGbGVldFN1bmssIHJlc2V0IH07XG59OyIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2NyZWF0ZUdhbWVib2FyZFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllck5hbWUsaXNDb21wID0gZmFsc2UpID0+e1xuICBjb25zdCBuYW1lID0gcGxheWVyTmFtZTtcbiAgY29uc3QgY29tcHV0ZXIgPSBpc0NvbXA7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG4gIGxldCBpc1R1cm4gPSBmYWxzZTtcbiAgbGV0IHdpbnMgPSAwO1xuICBcbiAgY29uc3QgbWFrZUF0dGFjayA9IChlbmVteUJvYXJkLGNvb3JkaW5hdGVzID0gbnVsbCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBjb29yZGluYXRlcztcblxuICAgIGlmKGNvbXB1dGVyKXtcbiAgICAgIHRhcmdldCA9IGNvbXB1dGVyQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgICAgY29uc29sZS5sb2coYGNvbXB1dGVyIGF0dGFja3MgJHt0YXJnZXR9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9IGF0dGFja3MgJHt0YXJnZXR9YCk7XG4gICAgfTtcblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuICBcbiAgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoZW5lbXlCb2FyZCxnZW4gPSAxKSA9PiB7XG4gICAgY29uc3QgaGl0cyA9IFtdO1xuICAgIGxldCBzaGlwcyA9IGVuZW15Qm9hcmQuZ2V0U2hpcHMoKTtcbiAgICBsZXQgdGFyZ2V0O1xuXG4gICAgY29uc3QgdGFyZ2V0QWRqYWNlbnQgPSAoKSA9PiB7XG4gICAgICAvL3BvcHVsYXRlcyBoaXRzIGFycmF5XG4gICAgICBmb3IobGV0IGk9MDtpPGVuZW15Qm9hcmQuYXR0YWNrcy5sZW5ndGg7aSs9MSl7XG4gICAgICAgIGxldCBhdGsgPSBlbmVteUJvYXJkLmF0dGFja3NbaV07XG4gICAgICAgIGxldCBmbGVldEFyciA9IGVuZW15Qm9hcmQuZmxlZXRDb29yZGluYXRlcygpLnJlZHVjZSgoYWNjLHZhbCk9PiBhY2MuY29uY2F0KHZhbCkpO1xuXG4gICAgICAgIGlmKGZsZWV0QXJyLmluY2x1ZGVzKGF0aykmJiEoaGl0cy5pbmNsdWRlcyhhdGspKSl7XG4gICAgICAgICAgaGl0cy5wdXNoKGF0ayk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICAvL3JlbW92ZSBoaXRzIHRoYXQgYXJlIG9uIHN1bmsgc2hpcHNcbiAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApPT57XG4gICAgICAgIGlmKHNoaXAuaXNTdW5rKCkpe1xuICAgICAgICAgIGxldCBsaXN0ID0gW107XG5cbiAgICAgICAgICBmb3IobGV0IGk9MDtpPGhpdHMubGVuZ3RoO2krPTEpe1xuICAgICAgICAgICAgaWYoc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyhoaXRzW2ldKSl7XG4gICAgICAgICAgICAgIGxpc3QucHVzaChoaXRzW2ldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZvcihsZXQgaT0wO2k8c2hpcC5jb29yZGluYXRlcy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBoaXRzLmluZGV4T2YobGlzdFswXSk7XG4gICAgICAgICAgICBoaXRzLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vcmV0dXJucyB2YWxpZCB0YXJnZXQgYWRqYWNlbnQgdG8gdGhlIGlucHV0IGNvb3JkaW5hdGVcbiAgICAgIGNvbnN0IGdldEFkamFjZW50ID0gKGlucHV0Q29vcmQpID0+IHtcbiAgICAgICAgbGV0IFthLCAuLi5yZXN0XSA9IGlucHV0Q29vcmQ7XG4gICAgICAgIGxldCBjaGFyID0gYTtcbiAgICAgICAgbGV0IG51bSA9IHBhcnNlSW50KHJlc3Quam9pbignJykpO1xuICAgICAgICBsZXQgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICBpZihjb2RlKzE8PTc0KXtcbiAgICAgICAgICBsZXQgY29vcmQgPSAoU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKzEpK251bSk7XG5cbiAgICAgICAgICBpZighKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpKXtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGNvZGUtMT49NjUpe1xuICAgICAgICAgIGxldCBjb29yZCA9IChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUtMSkrbnVtKTtcblxuICAgICAgICAgIGlmKCEoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkpe1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYobnVtKzE8PTEwKXtcbiAgICAgICAgICBsZXQgY29vcmQgPSBjaGFyICsgKG51bSArIDEpO1xuXG4gICAgICAgICAgaWYoIShlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZihudW0tMT49MSl7XG4gICAgICAgICAgbGV0IGNvb3JkID0gY2hhciArIChudW0gLSAxKTtcblxuICAgICAgICAgIGlmKCEoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkpe1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBmb3IobGV0IGk9MDtpPGhpdHMubGVuZ3RoO2krPTEpe1xuICAgICAgICBsZXQgYWRqYWNlbnQgPSBnZXRBZGphY2VudChoaXRzW2ldKTtcblxuICAgICAgICBpZihCb29sZWFuKGFkamFjZW50KSl7XG4gICAgICAgICAgdGFyZ2V0ID0gYWRqYWNlbnQ7XG4gICAgICAgICAgcmV0dXJuIGFkamFjZW50O1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdGFyZ2V0QWRqYWNlbnQoKTtcbiAgICBpZihoaXRzLmxlbmd0aCAhPT0gMCl7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgYWRqYWNlbnQgdGFyZ2V0IGZvdW5kID0+ICR7dGFyZ2V0fWApO1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2VuZXJhdGVBdHRhY2sgPSAoKSA9PiB7XG4gICAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc0IC0gNjUgKyAxKSApICsgNjU7XG4gICAgICB9O1xuXG4gICAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG4gIFxuICAgICAgLy9yZW1ha2VzIGF0dGFjayBpZiB0YXJnZXQgaGFzIGFscmVhZHkgYmVlbiBoaXRcbiAgICAgIGlmKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgICAgZG97XG4gICAgICAgICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBnZW5lcmF0ZUF0dGFjaygpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICBjb25zdCB3b24gPSAoKSA9PiB7XG4gICAgd2lucyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGdldFdpbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHdpbnM7XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGNvbXB1dGVyLCBpc1R1cm4sIG1ha2VBdHRhY2ssIGdldE5hbWUsIHdvbiwgZ2V0V2lucyB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVBcnJheSkgPT57XG4gIGxldCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVBcnJheTtcbiAgbGV0IGxlbmd0aCA9IGNvb3JkaW5hdGVBcnJheS5sZW5ndGg7XG4gIGxldCBkYW1hZ2UgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBkYW1hZ2UgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYobGVuZ3RoID09PSBkYW1hZ2Upe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGdldERhbWFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gZGFtYWdlO1xuICB9O1xuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBoaXQsIGlzU3VuaywgZ2V0RGFtYWdlIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNoZWNrV2luID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYoc2Vjb25kUGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpe1xuICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIxIFdJTlMnKTtcbiAgICBmaXJzdFBsYXllci53b24oKTtcbiAgICByZXR1cm4gJ2ZpcnN0JztcbiAgfSBlbHNlIGlmIChmaXJzdFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKXtcbiAgICBjb25zb2xlLmxvZygncGxheWVyMiBXSU5TJyk7XG4gICAgc2Vjb25kUGxheWVyLndvbigpO1xuICAgIHJldHVybiAnc2Vjb25kJztcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSAocGxheWVyLHNpemVBcnIpID0+IHtcbiAgbGV0IG51bWJlck9mU2hpcHMgPSBzaXplQXJyLmxlbmd0aFxuXG4gIGZvcihsZXQgaT0wO2k8bnVtYmVyT2ZTaGlwcztpKz0xKXtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsc2l6ZUFyclswXSk7XG5cbiAgICBsZXQgY3VycmVudEZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgICBsZXQgZmxlZXRBcnI7XG5cbiAgICBpZihjdXJyZW50RmxlZXQubGVuZ3RoICE9PSAwKXtcbiAgICAgIGZsZWV0QXJyID0gY3VycmVudEZsZWV0LnJlZHVjZSgoYWNjLHZhbCk9PmFjYy5jb25jYXQodmFsKSk7XG4gICAgfTtcblxuICAgIHdoaWxlKGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRzLGZsZWV0QXJyKSl7XG4gICAgICBsZXQgb2xkID0gY29vcmRzO1xuICAgICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsc2l6ZUFyclswXSk7XG4gICAgICBjb25zb2xlLmxvZyhgb2xkIGNvb3JkczogJHtvbGR9fCBuZXcgY29vcmRzOiAke2Nvb3Jkc31gKTtcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coYGNvbXB1dGVyIHBsYWNlcyBzaGlwIGF0ICR7Y29vcmRzfWApO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZHMpO1xuICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgfTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAocGxheWVyLHNpemUpID0+IHtcbiAgbGV0IGF4aXMgPSBnZW5lcmF0ZUF4aXMoKTtcbiAgbGV0IHN0YXJ0ID0gZ2VuZXJhdGVTdGFydCgpO1xuICBsZXQgeCA9IHN0YXJ0WzBdO1xuICBsZXQgeSA9IHN0YXJ0IFsxXTtcbiAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICBpZihheGlzID09PSAneCcpe1xuICAgIC8vaW5jcmVtZW50IGxldHRlclxuICAgIGZvcihsZXQgaT0wO2k8c2l6ZTtpKz0xKXtcbiAgICAgIGxldCBjb2RlID0geC5jaGFyQ29kZUF0KDApO1xuICAgICAgbGV0IGNlbGxYID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgaSkgKyB5O1xuICAgICAgY29vcmRBcnIucHVzaChjZWxsWCk7XG4gICAgfTtcbiAgfSBlbHNlIGlmIChheGlzID09PSAneScpe1xuICAgIC8vaW5jcmVtZW50IG51bWJlclxuICAgIGZvcihsZXQgaT0wO2k8c2l6ZTtpKz0xKXtcbiAgICAgIGxldCBjZWxsWSA9IHggKyAoeSArIGkpO1xuICAgICAgY29vcmRBcnIucHVzaChjZWxsWSk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gY29vcmRBcnI7XG59O1xuXG4vL3JldHVybiB0cnVlIGlmIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXG5jb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzLGZsZWV0KSA9PiB7XG4gIGZvcihsZXQgaT0wO2k8Y29vcmRpbmF0ZXMubGVuZ3RoO2krPTEpe1xuICAgIGlmKGZsZWV0ID09PSB1bmRlZmluZWQpe1xuICAgICAgYnJlYWs7XG4gICAgfWVsc2UgaWYoZmxlZXQuaW5jbHVkZXMoY29vcmRpbmF0ZXNbaV0pKXtcbiAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGNvbmZsaWN0Jyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9O1xuXG4gIGxldCBbbGV0dGVyLC4uLnJlc3RdID0gY29vcmRpbmF0ZXNbMF07XG4gIGxldCB4ID0gbGV0dGVyO1xuICBsZXQgeSA9IHBhcnNlSW50KHJlc3Quam9pbignJykpO1xuXG4gIGlmKHguY2hhckNvZGVBdCgwKSsoY29vcmRpbmF0ZXMubGVuZ3RoLTEpPjc0KXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfWVsc2UgaWYoeSArIChjb29yZGluYXRlcy5sZW5ndGgtMSk+MTApe1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufTtcblxuY29uc3QgZ2VuZXJhdGVBeGlzID0gKCkgPT4ge1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEpO1xuICBsZXQgYXhpcztcblxuICBpZihudW1iZXIlMiA9PT0gMCl7XG4gICAgYXhpcyA9ICd4JztcbiAgfSBlbHNlIGlmIChudW1iZXIlMiAhPT0gMCl7XG4gICAgYXhpcyA9ICd5JztcbiAgfTtcblxuICByZXR1cm4gYXhpcztcbn07XG5cbmNvbnN0IGdlbmVyYXRlU3RhcnQgPSAoKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkgKSArIDY1O1xuICB9O1xuXG4gIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAvLyB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG5cbiAgcmV0dXJuIFtsZXR0ZXIsbnVtYmVyXTtcbn07XG4iLCJpbXBvcnQgeyBjaGFuZ2VUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuXG5leHBvcnQgY29uc3QgZ2FtZVJlc2V0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBpZih3aW5uZXIgPT09ICdmaXJzdCcmJmZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSBlbHNlIGlmICh3aW5uZXIgPT09ICdzZWNvbmQnJiZzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9O1xuICBjb25zb2xlLmxvZygnR0FNRSBIQVMgQkVFTiBSRVNFVC4nKTtcbiAgXG4gIGZpcnN0UGxheWVyLmJvYXJkLnJlc2V0KCk7XG4gIHNlY29uZFBsYXllci5ib2FyZC5yZXNldCgpO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuLi9mYWN0b3JpZXMvY3JlYXRlUGxheWVyXCI7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJEaXNwbGF5IH0gZnJvbSBcIi4uL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyBncmlkRXZlbnRzLCByZW5kZXJHcmlkLCBwbGFjZW1lbnRQaGFzZSB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjaGFuZ2VUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuaW1wb3J0IHsgaGlnaGxpZ2h0LCB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IGNvbXBUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuXG5leHBvcnQgbGV0IHBsYXllck9uZSxwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChuYW1lT25lLCBuYW1lVHdvKSA9PiB7XG4gIGlmKCFwbGF5ZXJPbmV8fCFwbGF5ZXJUd28pe1xuICAgIGxldCB4ID0gZmFsc2U7XG5cbiAgICBpZihuYW1lVHdvID09PSAnY29tcHV0ZXInKXtcbiAgICAgIHggPSB0cnVlO1xuICAgIH07XG4gICAgXG4gICAgcGxheWVyT25lID0gY3JlYXRlUGxheWVyKG5hbWVPbmUpO1xuICAgIHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihuYW1lVHdvLHgpO1xuICB9O1xuXG4gIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLDEpO1xuICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywyKTtcblxuICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJPbmUsIDEpO1xuICAvL2NhbGwgZ3JpZCBldmVudHMgaW4gcGxhY2VtZW50IGFmdGVyIHBsYXllcnMgZG9uZT9cbiAgLy8gZ3JpZEV2ZW50cygpO1xuXG4gIC8vc2hvdWxkIGFsbCBiZSBhdCB0aGUgZW5kIG9mIHBsYWNlbWVudFBoYXNlP1xuICAvL29yIHJhdGhlciBtYXliZSBvbiBkb25lIGJ0bj9cbiAgLy8gcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxwbGF5ZXJPbmUpO1xuICAvLyByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllclR3byk7XG5cbiAgLy8gaWYocGxheWVyT25lLmdldFdpbnMoKSA9PT0gMCAmJiBwbGF5ZXJUd28uZ2V0V2lucygpID09PSAwKXtcbiAgLy8gICBmaXJzdFR1cm4ocGxheWVyT25lLHBsYXllclR3byk7XG4gIC8vIH07XG5cbiAgLy8gaGlnaGxpZ2h0KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuXG4gIC8vIGxldCBjb21wdXRlclBsYXllcjtcblxuICAvLyBpZihwbGF5ZXJPbmUuY29tcHV0ZXIpe1xuICAvLyAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyT25lO1xuICAvLyB9IGVsc2UgaWYgKHBsYXllclR3by5jb21wdXRlcil7XG4gIC8vICAgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIC8vIH07XG4gIFxuICAvLyBpZihjb21wdXRlclBsYXllci5pc1R1cm4pe1xuICAvLyAgIGNvbXBUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAvLyB9O1xufTtcbiIsIi8vaW5wdXQgY2VsbCBlbGVtZW50IGRhdGEgYXR0cmlidXRlXG4vL291dHB1dCBhdHRhY2sgY29vcmRpbmF0ZXNcbmV4cG9ydCBjb25zdCBwYXJzZUNlbGxDb29yZGluYXRlID0gKGF0dHJpYnV0ZSkgPT4ge1xuICBpZih0eXBlb2YgYXR0cmlidXRlICE9PSAnc3RyaW5nJyl7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGxldCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoJycpO1xuXG4gIGNvbnN0IGdldExldHRlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBsZXR0ZXJWYWx1ZTtcblxuICAgIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyYXlbMV0pKSkpe1xuICAgICAgbGV0IHR3b0RpZ2l0ID0gYXJyYXkuc2xpY2UoMCwyKTtcbiAgICAgIGxldHRlclZhbHVlID0gdHdvRGlnaXQuam9pbignJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldHRlclZhbHVlID0gYXJyYXlbMF07XG4gICAgfTtcblxuICAgIGxldCBjb2RlVmFsdWUgPSBwYXJzZUludChsZXR0ZXJWYWx1ZSk7XG4gICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoKDY1ICsgY29kZVZhbHVlKSAtIDEpO1xuXG4gICAgcmV0dXJuIGxldHRlcjtcbiAgfTtcblxuICBjb25zdCBnZXROdW1iZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbnVtYmVyO1xuICAgIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyYXlbYXJyYXkubGVuZ3RoLTJdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aC0yKTtcbiAgICAgIG51bWJlciA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW1iZXIgPSBhcnJheVthcnJheS5sZW5ndGgtMV07XG4gICAgfTtcblxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgbGV0IGxldHRlciA9IGdldExldHRlcihhcnIpO1xuICBsZXQgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG5cbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQsIHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9jaGVja1dpblwiO1xuaW1wb3J0IHsgZ2FtZVJlc2V0IH0gZnJvbSBcIi4vZ2FtZVJlc2V0XCI7XG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gXCIuL2dhbWVTdGFydFwiO1xuXG4vL3JhbmRvbWx5IGNob29zZXMgYSBwbGF5ZXIgdG8gZ28gZmlyc3RcbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEpO1xuXG4gIGlmKG51bWJlciUyID09PSAwKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfSBlbHNlIGlmIChudW1iZXIlMiAhPT0gMCl7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgY29uc29sZS5sb2coYCR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfTtcbn07XG5cbi8vY2hhbmdlcyBjdXJyZW50IHBsYXllclxuZXhwb3J0IGNvbnN0IGNoYW5nZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIGlmKHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCx0YXJnZXQpO1xuXG4gICAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnZmlyc3QnKXtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ2ZpcnN0Jyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgfTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICBpZihmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCx0YXJnZXQpO1xuXG4gICAgICBpZihjaGVja1dpbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpID09PSAnc2Vjb25kJyl7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdzZWNvbmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgY2hhbmdlVHVybihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIpO1xuICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcblxuICBjb21wVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmKGZpcnN0UGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkKTtcblxuICAgICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ2ZpcnN0Jyl7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdmaXJzdCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcblxuICAgICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ3NlY29uZCcpe1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllciwnc2Vjb25kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMScpLGZpcnN0UGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gICAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCB0dXJuV29uID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBnYW1lUmVzZXQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcbiAgc2V0dXAoKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgLy9icmluZyB1cCBtZW51XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuL0RPTS9pbnRlcmFjdGlvbi9tZW51XCI7XG5cbmNvbnN0IG5hbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzJyk7XG5uYW1lcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWdyaWQnKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1ncmlkJyk7XG5cbmNyZWF0ZUdyaWQocGxheWVyT25lR3JpZCwxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwyKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=