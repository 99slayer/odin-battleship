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
  console.log(cells);
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

      //also should not be able to place ships that conflict with other ships
      //place ship
      targetCell.onclick = (e) => {
        if(hoverCells.includes(null)){
          console.log('OUT OF BOUNDS');
          return;
        };

        const coordArr = [];

        for(let i=0;i<hoverCells.length;i+=1){
          let attribute = hoverCells[i].getAttribute('data-cell-coordinate');
          let coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(attribute);
          coordArr.push(coord);
        };

        player.board.place(coordArr);
        sizeArr.shift();

        //rerender hovercells for hover visual

        if(sizeArr.length === 0){
          const doneBtn = document.getElementById('done-btn');
          doneBtn.style.display = 'block';
        };
      };
    });
  });
};

//hereVV
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
  (0,_grid__WEBPACK_IMPORTED_MODULE_2__.placementPhase)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo,2);
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

  (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.setup)(nameOne,nameTwo);
  //Vmove theseV
  // createPlayerDisplay(playerOne,1);
  // createPlayerDisplay(playerTwo,2);

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
  };

  //NEED TO DO SHIP PLACEMENT HERE
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(playerOne, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7OztVQ25HQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055RDtBQUNMOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0VBQVU7QUFDVixzRUFBVSxrQiIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2dyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9tZW51LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NoZWNrV2luLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVSZXNldC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lU3RhcnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy90dXJuLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY3JlYXRlR3JpZCA9IChncmlkLGdyaWROdW0pID0+IHtcbiAgZm9yKGxldCBpPTA7aTwxMTtpKz0xKXtcbiAgICBsZXQgcm93ID0gaTtcbiAgICBsZXQgZ3JpZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyaWRSb3cuY2xhc3NMaXN0LmFkZCgnZ3JpZC1yb3cnKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZSgnaWQnLGBncmlkLXJvdy0ke2l9YCk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LW51bWJlcicsYCR7aX1gKTtcbiAgICAvL1BST0JBQkxZIERPTlQgTkVFRCBJRCBBTkQgREFUQSBBVFRSSUJVVEUsIEJVVCBJJ0xMIENPTUUgQkFDSyBUTyBUSElTLlxuICAgIGZvcihsZXQgaT0wO2k8MTE7aSs9MSl7XG4gICAgICBsZXQgY3VycmVudFJvdyA9IHJvd1xuICAgICAgbGV0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJyxgZ3JpZC1jZWxsLSR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyxgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xuICAgICAgZ3JpZFJvdy5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG4gICAgfTtcbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsUm93cyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IFtdO1xuICAgIGxldCByb3dzID0gZ3JpZC5jaGlsZE5vZGVzO1xuXG4gICAgcm93cy5mb3JFYWNoKChlKT0+e1xuICAgICAgbm9kZUxpc3QucHVzaChlLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuXG4gICAgbGV0IGkgPSAxO1xuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGlmKGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpID09PSAnMC0wJyl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7aX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IGdyaWQuZmlyc3RDaGlsZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMFxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpPT57XG4gICAgICBlLnN0eWxlLmJvcmRlciA9ICdub25lJztcbiAgICAgIGNvbnN0IGNlbGxDb29yZGluYXRlID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJyk7XG4gICAgICBpZihjZWxsQ29vcmRpbmF0ZSA9PT0gJzAtMCcpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgICAgZS50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGxhYmVsUm93cygpO1xuICBsYWJlbENvbHVtbnMoKTtcbn07XG4iLCJjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktY29udCcpO1xuXG4gIGNvbnN0IHBsYXllck51bURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgbmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllci5nZXROYW1lKCl9YDtcblxuICBjb25zdCB0dXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB0dXJuLnNldEF0dHJpYnV0ZSgnaWQnLGB0dXJuLSR7cGxheWVyTnVtfWApO1xuICBpZihwbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pe1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG5cbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNoaXBzLnNldEF0dHJpYnV0ZSgnaWQnLGBzaGlwcy0ke3BsYXllck51bX1gKTtcbiAgc2hpcHMudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtwbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuXG4gIGNvbnN0IHdpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHdpbnMuc2V0QXR0cmlidXRlKCdpZCcsYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSxuYW1lLHR1cm4sc2hpcHMsd2lucyk7XG5cbiAgaWYocGxheWVyTnVtID09PSAxKXtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpe1xuICAgIHBsYXllclR3b0Rpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9O1xufTtcblxuLy9wbGF5ZXIjXG4vL3BsYXllciBuYW1lXG4vL2lzIHR1cm5cbi8vY3VycmVudCBzaGlwcyBhbGl2ZVxuLy93aW5zIiwiaW1wb3J0IHsgcGFyc2VDZWxsQ29vcmRpbmF0ZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGVcIjtcbmltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyB0dXJuIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvdHVyblwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGxldCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2VsbC1jb29yZGluYXRlJykpO1xuICByZXR1cm4gY29vcmQ7XG59O1xuXG4vL3N0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybiYmZmlyc3RQbGF5ZXIuY29tcHV0ZXIpe1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4mJnNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgLy9zdG9wcyBwbGF5ZXIgZnJvbSBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIG93biBncmlkXG4gIGlmKHBsYXllck9uZS5pc1R1cm4mJmNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWNlbGwtMScpKXtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuJiZjZWxsLmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1jZWxsLTInKSl7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vL0NoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT57XG4gIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmKGNvb3JkaW5hdGVbMF09PT0nQCd8fChjb29yZGluYXRlLmxlbmd0aD09PTImJmNvb3JkaW5hdGVbMV09PT0nMCcpKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwnKTtcbiAgXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpPT57XG4gICAgaWYoY2hlY2tUaWVyKG5vZGUpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLy9hZGQgdHVybiBsaXN0ZW5lclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGxldCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZihncmlkTG9naWMocGxheWVyT25lLHBsYXllclR3byxjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIHR1cm4ocGxheWVyT25lLHBsYXllclR3byxjb29yZCk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywoZSk9PntcbiAgICAgIGxldCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbC1ob3ZlcicpO1xuICAgIH0pO1xuXG4gICAgLy9yZW1vdmUgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLWhvdmVyJyk7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBhbmQgcmVtb3ZlIGNsaWNrIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlKT0+e1xuICAgICAgbGV0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuXG4gICAgICBjZWxsLm9ubW91c2V1cCA9ICgpID0+e1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC1tb3VzZWRvd24nKTtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwub25tb3VzZWxlYXZlID0gKCkgPT57XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLW1vdXNlZG93bicpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vL3RlbXBvcmFyaWx5IHJlbmRlcmluZyBldmVyeXRoaW5nIGZvciB0ZXN0aW5nL2RlYnVnZ2luZyBwdXJwb3Nlc1xuZXhwb3J0IGNvbnN0IHJlbmRlckdyaWQgPSAoY2VsbHMscGxheWVyKSA9PiB7XG4gIGlmKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKXtcbiAgICByZXNldEdyaWQoY2VsbHMpO1xuICAgIHJldHVybjtcbiAgfTtcblxuICBjb25zdCBmbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGFyciA9IGZsZWV0LnJlZHVjZSgoYWNjLHZhbCk9PmFjYy5jb25jYXQodmFsKSk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCk9PntcbiAgICBsZXQgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLWNlbGwtY29vcmRpbmF0ZScpKTtcbiAgICBpZiAoYXJyLmluY2x1ZGVzKGNvb3JkKSYmcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gJ+KXjyc7XG4gICAgfSBlbHNlIGlmICghKGFyci5pbmNsdWRlcyhjb29yZCkpJiZwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAnLyc7XG4gICAgfSBlbHNlIGlmIChhcnIuaW5jbHVkZXMoY29vcmQpKXtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSAn4peLJztcbiAgICB9O1xuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0R3JpZCA9IChjZWxscykgPT4ge1xuICBjZWxscy5mb3JFYWNoKChjZWxsKT0+e1xuICAgIGlmKGNoZWNrVGllcihjZWxsKSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGxhY2VtZW50UGhhc2UgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgbGV0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdyaWQtY2VsbC0ke3BsYXllck51bX1gKTtcbiAgY29uc3Qgc2l6ZUFyciA9IFs1LDQsMywzLDJdO1xuICBsZXQgYXhpcyA9ICd5JztcbiAgY29uc29sZS5sb2coY2VsbHMpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKT0+e1xuICAgIGlmKGNoZWNrVGllcihjZWxsKSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywoZSk9PntcbiAgICAgIGlmKHNpemVBcnIubGVuZ3RoPT09MCl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGxldCB0YXJnZXRDZWxsID0gZS50YXJnZXQ7XG4gICAgICBsZXQgdGFyZ2V0Q2VsbENvb3JkaW5hdGUgPSB0YXJnZXRDZWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKTtcbiAgICAgIGxldCBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyh0YXJnZXRDZWxsQ29vcmRpbmF0ZSxzaXplQXJyWzBdLGF4aXMscGxheWVyTnVtKTtcblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpPT57XG4gICAgICAgIGlmKCFob3ZlckNlbGwpe1xuICAgICAgICAgIC8vYWxlcnQgdXNlciB0aGV5IGFyZSB0cnlpbmcgdG8gcGxhY2UgYSBzaGlwIG91dCBvZiBib3VuZHMuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuXG4gICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpPT57XG4gICAgICAgICAgYy5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvL2NoYW5nZSBheGlzXG4gICAgICBkb2N1bWVudC5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKT0+e1xuICAgICAgICAgIGlmKGhvdmVyQ2VsbCA9PT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtaG92ZXInKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoYXhpcyA9PT0gJ3knKXtcbiAgICAgICAgICBheGlzID0gJ3gnO1xuICAgICAgICB9IGVsc2UgaWYgKGF4aXMgPT09ICd4Jyl7XG4gICAgICAgICAgYXhpcyA9ICd5JztcbiAgICAgICAgfTtcblxuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyh0YXJnZXRDZWxsQ29vcmRpbmF0ZSxzaXplQXJyWzBdLGF4aXMscGxheWVyTnVtKTtcblxuICAgICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCk9PntcbiAgICAgICAgICBpZihob3ZlckNlbGwgPT09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLWhvdmVyJyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy9hbHNvIHNob3VsZCBub3QgYmUgYWJsZSB0byBwbGFjZSBzaGlwcyB0aGF0IGNvbmZsaWN0IHdpdGggb3RoZXIgc2hpcHNcbiAgICAgIC8vcGxhY2Ugc2hpcFxuICAgICAgdGFyZ2V0Q2VsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgaWYoaG92ZXJDZWxscy5pbmNsdWRlcyhudWxsKSl7XG4gICAgICAgICAgY29uc29sZS5sb2coJ09VVCBPRiBCT1VORFMnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICAgICAgICBmb3IobGV0IGk9MDtpPGhvdmVyQ2VsbHMubGVuZ3RoO2krPTEpe1xuICAgICAgICAgIGxldCBhdHRyaWJ1dGUgPSBob3ZlckNlbGxzW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1jZWxsLWNvb3JkaW5hdGUnKTtcbiAgICAgICAgICBsZXQgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgY29vcmRBcnIucHVzaChjb29yZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlKGNvb3JkQXJyKTtcbiAgICAgICAgc2l6ZUFyci5zaGlmdCgpO1xuXG4gICAgICAgIC8vcmVyZW5kZXIgaG92ZXJjZWxscyBmb3IgaG92ZXIgdmlzdWFsXG5cbiAgICAgICAgaWYoc2l6ZUFyci5sZW5ndGggPT09IDApe1xuICAgICAgICAgIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG9uZS1idG4nKTtcbiAgICAgICAgICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vL2hlcmVWVlxuLy9yZXR1cm5zIG5vZGUgbGlzdFxuY29uc3QgZ2V0SG92ZXJDZWxscyA9IChzdGFydCxzaXplLGF4aXMscGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGhvdmVyQ2VsbHMgPSBbXTtcbiAgY29uc3Qgc3RhcnRBcnIgPSBzdGFydC5zcGxpdCgnJyk7XG4gIGxldCB4ID0gZ2V0WChzdGFydEFycik7XG4gIHggPSBwYXJzZUludCh4KTtcbiAgbGV0IHkgPSBnZXRZKHN0YXJ0QXJyKTtcbiAgeSA9IHBhcnNlSW50KHkpO1xuXG4gIGlmKGF4aXMgPT09ICd4Jyl7XG4gICAgZm9yKGxldCBpPTA7aTxzaXplO2krPTEpe1xuICAgICAgbGV0IGNlbGxYID0gKHggKyBpKSArICctJyArIHk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFh9XCJdYCkpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3knKXtcbiAgICBmb3IobGV0IGk9MDtpPHNpemU7aSs9MSl7XG4gICAgICBsZXQgY2VsbFkgPSB4ICsgJy0nICsgKHkgKyBpKTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWX1cIl1gKSk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gaG92ZXJDZWxscztcbn07XG5cbmNvbnN0IGdldFggPSAoYXJyKSA9PntcbiAgbGV0IHg7XG4gIGlmKCEoaXNOYU4ocGFyc2VJbnQoYXJyWzFdKSkpKXtcbiAgICBsZXQgdHdvRGlnaXQgPSBhcnIuc2xpY2UoMCwyKTtcbiAgICB4ID0gdHdvRGlnaXQuam9pbignJyk7XG4gIH0gZWxzZSB7XG4gICAgeCA9IGFyclswXTtcbiAgfTtcbiAgcmV0dXJuIHg7XG59O1xuXG5jb25zdCBnZXRZID0gKGFycikgPT4ge1xuICBsZXQgeTtcbiAgaWYoIShpc05hTihwYXJzZUludChhcnJbYXJyLmxlbmd0aC0yXSkpKSl7XG4gICAgbGV0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKGFyci5sZW5ndGgtMik7XG4gICAgeSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICB9IGVsc2Uge1xuICAgIHkgPSBhcnJbYXJyLmxlbmd0aC0xXTtcbiAgfTtcbiAgcmV0dXJuIHk7XG59O1xuXG5jb25zdCBuZXh0UGxhY2VtZW50ID0gKCkgPT4ge1xuXG59O1xuIiwiaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2dhbWVTdGFydCc7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gJy4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0JztcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzJztcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlIH0gZnJvbSAnLi9ncmlkJztcblxuY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVsdGlwbGF5ZXInKTtcbmNvbnN0IG5hbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVzJyk7XG5jb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VtZW50Jyk7XG5jb25zdCBydWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdydWxlcycpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2luZ2xlLXBsYXllcicpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3R3by1wbGF5ZXInKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtbmFtZScpO1xuLy8gY29uc3QgcGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XG5jb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RvbmUtYnRuJyk7XG5cbi8vIGxldCBtdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKG1lbnUpID0+IHtcbiAgbWVudS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbn07XG5cbmNvbnN0IHNob3cgPSAobWVudSkgPT4ge1xuICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGxldCBwbGF5ZXJPbmVOYW1lID0gcGxheWVyT25lTmFtZUVsLnZhbHVlO1xuICBsZXQgcGxheWVyVHdvTmFtZSA9ICdjb21wdXRlcic7XG4gIC8vIGlmKCFtdWx0aXBsYXllcil7XG4gIC8vICAgcGxheWVyVHdvID0gJ2NvbXB1dGVyJztcbiAgLy8gfTtcblxuICByZXR1cm4gW3BsYXllck9uZU5hbWUsIHBsYXllclR3b05hbWVdO1xufTtcblxuY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgbGV0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZ3JpZC0xYCk7XG4gIGxldCBncmlkQ2xvbmUgPSBncmlkLmNsb25lTm9kZSh0cnVlKTtcbiAgZ3JpZC5yZXBsYWNlV2l0aChncmlkQ2xvbmUpO1xuICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJUd28sMik7XG4gIGRvbmVCdG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XG59O1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgbGV0IHBsYXllck5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgbGV0IG5hbWVPbmUgPSBwbGF5ZXJOYW1lc1swXTtcbiAgbGV0IG5hbWVUd28gPSBwbGF5ZXJOYW1lc1sxXVxuXG4gIGlmKG5hbWVPbmUgPT09ICcnIHx8IG5hbWVUd28gPT09ICcnKXtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgaGlkZShuYW1lcyk7XG4gIHNob3cocGxhY2VtZW50KTtcblxuICBzZXR1cChuYW1lT25lLG5hbWVUd28pO1xuICAvL1Ztb3ZlIHRoZXNlVlxuICAvLyBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllck9uZSwxKTtcbiAgLy8gY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJUd28sMik7XG5cbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gJyc7XG4gIC8vIHBsYXllclR3b05hbWUudmFsdWUgPSAnJztcbn07XG5cbi8vbWVudSBpbnRlcmFjdGlvbiBldmVudHNcbmV4cG9ydCBjb25zdCBtZW51RXZlbnRzID0gKCgpID0+IHtcblxuICAvLyBzaW5nbGVQbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gIC8vICAgaGlkZShtdWx0aXBsYXllcik7XG4gIC8vICAgc2hvdyhuYW1lcyk7XG4gIC8vICAgbXVsdGlwbGF5ZXIgPSBmYWxzZTtcbiAgLy8gfSk7XG5cbiAgLy8gdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAvLyAgIGhpZGUobXVsdGlwbGF5ZXIpO1xuICAvLyAgIHNob3cobmFtZXMpO1xuICAvLyAgIG11bHRpcGxheWVyID0gdHJ1ZTtcbiAgLy8gfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpPT57XG4gICAgc3RhcnQoKTtcbiAgICAvLyBoaWRlKG5hbWVzKTtcbiAgICAvLyBzaG93KHBsYWNlbWVudCk7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywoZSk9PntcbiAgICBpZihlLmtleSA9PT0gJ0VudGVyJyl7XG4gICAgICBzdGFydCgpO1xuICAgICAgLy8gaGlkZShuYW1lcyk7XG4gICAgICAvLyBzaG93KHBsYWNlbWVudCk7XG4gICAgfTtcbiAgfSk7XG4gIFxuICBwbGF5ZXJPbmVOYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLChlKT0+e1xuICAgIGlmKGUua2V5ID09PSAnRW50ZXInKXtcbiAgICAgIHN0YXJ0KCk7XG4gICAgICAvLyBoaWRlKG5hbWVzKTtcbiAgICAgIC8vIHNob3cocGxhY2VtZW50KTtcbiAgICB9O1xuICB9KTtcblxuICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKT0+e1xuICAgIGRvbmUoKTtcbiAgfSk7XG59KSgpO1xuIiwiLy8gY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0xJyk7XG4vLyBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTInKTtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1kaXNwbGF5Jyk7XG4gIGNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbiAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDAgJiZzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDApe1xuICAgIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtcGxheWVyJyk7XG4gICAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICB9O1xuICAgIHJldHVybjtcbiAgfTtcblxuICBpZihmaXJzdFBsYXllci5pc1R1cm4pe1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1wbGF5ZXInKTtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtcGxheWVyJyk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXBsYXllcicpO1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1wbGF5ZXInKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVEaXNwbGF5cyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHVwZGF0ZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVNoaXBzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuLy9ORUVEIFNPTUVUSElORyBXSEVOIFBMQVlFUlMgQVJFIFdBSVRJTkcgRk9SIFRIRSBORVhUIEdBTUVcbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLTEnKTtcbiAgY29uc3QgdHVybjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybi0yJyk7XG4gIGlmKGZpcnN0UGxheWVyLmlzVHVybil7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKXtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xufTtcblxuY29uc3QgdXBkYXRlU2hpcHMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBzaGlwczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMtMScpO1xuICBjb25zdCBzaGlwczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcHMtMicpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG5jb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lucy0xJyk7XG4gIGNvbnN0IHdpbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbnMtMicpO1xuICB3aW5zMS50ZXh0Q29udGVudCA9IGBXaW5zOiAke2ZpcnN0UGxheWVyLmdldFdpbnMoKX1gO1xuICB3aW5zMi50ZXh0Q29udGVudCA9IGBXaW5zOiAke3NlY29uZFBsYXllci5nZXRXaW5zKCl9YDtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vY3JlYXRlU2hpcFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT57XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGF0dGFja3MgPSBbXTtcblxuXG5cblxuXG4gIC8vVVNFIEZPUiBQTEFDRSBGTEVFVCBGVU5DVElPTlxuICBmdW5jdGlvbiBPTERwbGFjZShheGlzLHN0YXJ0LHNpemUpe1xuICAgIC8vWCA9PiBob3Jpem9udGFsICsgbGV0dGVyc1xuICAgIC8vWSA9PiB2ZXJ0aWNhbCArIG51bWJlcnNcbiAgICBpZighYXhpc3x8IXN0YXJ0fHwhc2l6ZSl7XG4gICAgICBjb25zb2xlLmxvZygncGFyYW1ldGVyIG1pc3NpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgbGV0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoJycpO1xuICAgIGxldCB4ID0gc3RhcnRBcnIuc2xpY2UoMCwxKTtcbiAgICBsZXQgeSA9IHN0YXJ0QXJyLnNsaWNlKDEpLmpvaW4oJycpO1xuXG4gICAgLy90aHJvd3MgZXJyb3IgaWYgc2hpcHMgd291bGQgYmUgcGxhY2VkIG91dCBvZiBib3VuZHNcbiAgICAvL3Rocm93cyBlcnJvcnMgZm9yIG5vdyBtYXliZSBjaGFuZ2UgbGF0ZXIqKlxuICAgIC8vVEhFIENPT1JESU5BVEVTIENBTiBCRSBDSEVDS0VEIEJFRk9SRSBUSEVZIEFSRSBQQVNTRUQgVE8gUExBQ0UqKlxuICAgIGlmKCh4WzBdLmNoYXJDb2RlQXQoMCkrc2l6ZSk+NzQpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaGlwIGV4Y2VlZHMgdGhlIHggYXhpcyBvZiB0aGUgZ2FtZWJvYXJkLicpO1xuICAgIH0gZWxzZSBpZiAoKHBhcnNlSW50KHkpK3NpemUpPjEwKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2hpcCBleGNlZWRzIHRoZSB5IGF4aXMgb2YgdGhlIGdhbWVib2FyZC4nKTtcbiAgICB9O1xuXG4gICAgLy9DaGVjayBpZiBwbGFjZW1lbnQgY29vcmRpbmF0ZXMgY29uZmxpY3Qgd2l0aCBhbnkgb3RoZXIgc2hpcHNcbiAgICBmdW5jdGlvbiBjcmVhdGVDb29yZGluYXRlcyhzaGlwQXhpcyxzaGlwU2l6ZSl7XG4gICAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuICAgICAgaWYoc2hpcEF4aXMgPT09ICdYJyl7XG4gICAgICAgIC8vaW5jcmVtZW50IGxldHRlcnNcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwU2l6ZTtpKz0xKXtcbiAgICAgICAgICBsZXQgbmV3WCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeFswXS5jaGFyQ29kZUF0KDApK2kpO1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goYCR7bmV3WCArIHl9YCk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNoaXBBeGlzID09PSAnWScpe1xuICAgICAgICAvL2luY3JlbWVudCBudW1iZXJzXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2hpcFNpemU7aSs9MSl7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChgJHt4ICsgKHBhcnNlSW50KHkpICsgaSl9YCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfTtcblxuXG4gICAgbGV0IHNoaXAgPSBjcmVhdGVTaGlwKGNyZWF0ZUNvb3JkaW5hdGVzKGF4aXMsc2l6ZSkpO1xuICAgIHNoaXBzLnB1c2goc2hpcCk7XG4gIH07IC8vT0xEIFBMQUNFIEZVTkNUSU9OLCBTVElMTCBVU0VGVUwgQ09ERSBJTiBIRVJFIEZPUiBMQVRFUioqXG5cblxuXG5cblxuXG4gIFxuICBjb25zdCBwbGFjZSA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGlmKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGxldCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApPT57IHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCl9KTtcblxuICAgIGlmKHNoaXBJbmRleD4tMSl7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH07XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgfTtcbiAgXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT57XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yKGxldCBpPTA7aTxzaGlwcy5sZW5ndGg7aSs9MSl7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHNSZW1haW5pbmcgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKT0+e1xuICAgICAgaWYoc2hpcC5pc1N1bmsoKSl7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwcy5sZW5ndGggLSBzaGlwc1N1bms7XG4gIH07XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiB7XG4gICAgaWYoc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzZXRBcnJheSA9IChhcnIpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhcnIubGVuZ3RoO1xuICAgIFxuICAgICAgZm9yKGxldCBpPTA7aTxzaXplO2krPTEpe1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXNldEFycmF5KHNoaXBzKTtcbiAgICByZXNldEFycmF5KGF0dGFja3MpO1xuICB9O1xuXG4gIHJldHVybiB7IGF0dGFja3MsIHBsYWNlLCByZWNlaXZlQXR0YWNrLCBnZXRTaGlwcywgZmxlZXRDb29yZGluYXRlcywgZ2V0U2hpcHNSZW1haW5pbmcsIGlzRmxlZXRTdW5rLCByZXNldCB9O1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLGlzQ29tcCA9IGZhbHNlKSA9PntcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBsZXQgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcbiAgXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCxjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZihjb21wdXRlcil7XG4gICAgICB0YXJnZXQgPSBjb21wdXRlckF0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH07XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgfTtcblxuICAvLyBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuXG4gIC8vIH07XG4gIFxuICBjb25zdCBjb21wdXRlckF0dGFjayA9IChlbmVteUJvYXJkLGdlbiA9IDEpID0+IHtcbiAgICBjb25zdCBoaXRzID0gW107XG4gICAgbGV0IHNoaXBzID0gZW5lbXlCb2FyZC5nZXRTaGlwcygpO1xuICAgIGxldCB0YXJnZXQ7XG5cbiAgICBjb25zdCB0YXJnZXRBZGphY2VudCA9ICgpID0+IHtcbiAgICAgIC8vcG9wdWxhdGVzIGhpdHMgYXJyYXlcbiAgICAgIGZvcihsZXQgaT0wO2k8ZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDtpKz0xKXtcbiAgICAgICAgbGV0IGF0ayA9IGVuZW15Qm9hcmQuYXR0YWNrc1tpXTtcbiAgICAgICAgbGV0IGZsZWV0QXJyID0gZW5lbXlCb2FyZC5mbGVldENvb3JkaW5hdGVzKCkucmVkdWNlKChhY2MsdmFsKT0+IGFjYy5jb25jYXQodmFsKSk7XG5cbiAgICAgICAgaWYoZmxlZXRBcnIuaW5jbHVkZXMoYXRrKSYmIShoaXRzLmluY2x1ZGVzKGF0aykpKXtcbiAgICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8vcmVtb3ZlIGhpdHMgdGhhdCBhcmUgb24gc3VuayBzaGlwc1xuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCk9PntcbiAgICAgICAgaWYoc2hpcC5pc1N1bmsoKSl7XG4gICAgICAgICAgbGV0IGxpc3QgPSBbXTtcblxuICAgICAgICAgIGZvcihsZXQgaT0wO2k8aGl0cy5sZW5ndGg7aSs9MSl7XG4gICAgICAgICAgICBpZihzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGhpdHNbaV0pKXtcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKGhpdHNbaV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZm9yKGxldCBpPTA7aTxzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDtpKz0xKXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGhpdHMuaW5kZXhPZihsaXN0WzBdKTtcbiAgICAgICAgICAgIGhpdHMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy9yZXR1cm5zIHZhbGlkIHRhcmdldCBhZGphY2VudCB0byB0aGUgaW5wdXQgY29vcmRpbmF0ZVxuICAgICAgY29uc3QgZ2V0QWRqYWNlbnQgPSAoaW5wdXRDb29yZCkgPT4ge1xuICAgICAgICBsZXQgW2EsIC4uLnJlc3RdID0gaW5wdXRDb29yZDtcbiAgICAgICAgbGV0IGNoYXIgPSBhO1xuICAgICAgICBsZXQgbnVtID0gcGFyc2VJbnQocmVzdC5qb2luKCcnKSk7XG4gICAgICAgIGxldCBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgIGlmKGNvZGUrMTw9NzQpe1xuICAgICAgICAgIGxldCBjb29yZCA9IChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUrMSkrbnVtKTtcblxuICAgICAgICAgIGlmKCEoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkpe1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoY29kZS0xPj02NSl7XG4gICAgICAgICAgbGV0IGNvb3JkID0gKFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZS0xKStudW0pO1xuXG4gICAgICAgICAgaWYoIShlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZihudW0rMTw9MTApe1xuICAgICAgICAgIGxldCBjb29yZCA9IGNoYXIgKyAobnVtICsgMSk7XG5cbiAgICAgICAgICBpZighKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpKXtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKG51bS0xPj0xKXtcbiAgICAgICAgICBsZXQgY29vcmQgPSBjaGFyICsgKG51bSAtIDEpO1xuXG4gICAgICAgICAgaWYoIShlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSl7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIGZvcihsZXQgaT0wO2k8aGl0cy5sZW5ndGg7aSs9MSl7XG4gICAgICAgIGxldCBhZGphY2VudCA9IGdldEFkamFjZW50KGhpdHNbaV0pO1xuXG4gICAgICAgIGlmKEJvb2xlYW4oYWRqYWNlbnQpKXtcbiAgICAgICAgICB0YXJnZXQgPSBhZGphY2VudDtcbiAgICAgICAgICByZXR1cm4gYWRqYWNlbnQ7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB0YXJnZXRBZGphY2VudCgpO1xuICAgIGlmKGhpdHMubGVuZ3RoICE9PSAwKXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBhZGphY2VudCB0YXJnZXQgZm91bmQgPT4gJHt0YXJnZXR9YCk7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG5cbiAgICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpICkgKyA2NTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgXG4gICAgICAvL3JlbWFrZXMgYXR0YWNrIGlmIHRhcmdldCBoYXMgYWxyZWFkeSBiZWVuIGhpdFxuICAgICAgaWYoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpe1xuICAgICAgICBkb3tcbiAgICAgICAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGdlbmVyYXRlQXR0YWNrKCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIGNvbnN0IHdvbiA9ICgpID0+IHtcbiAgICB3aW5zICs9IDE7XG4gIH07XG5cbiAgY29uc3QgZ2V0V2lucyA9ICgpID0+IHtcbiAgICByZXR1cm4gd2lucztcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgY29tcHV0ZXIsIGlzVHVybiwgbWFrZUF0dGFjaywgZ2V0TmFtZSwgd29uLCBnZXRXaW5zIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZUFycmF5KSA9PntcbiAgbGV0IGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZUFycmF5O1xuICBsZXQgbGVuZ3RoID0gY29vcmRpbmF0ZUFycmF5Lmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZihsZW5ndGggPT09IGRhbWFnZSl7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgZ2V0RGFtYWdlID0gKCkgPT4ge1xuICAgIHJldHVybiBkYW1hZ2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBnZXREYW1hZ2UgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZihzZWNvbmRQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSl7XG4gICAgY29uc29sZS5sb2coJ3BsYXllcjEgV0lOUycpO1xuICAgIGZpcnN0UGxheWVyLndvbigpO1xuICAgIHJldHVybiAnZmlyc3QnO1xuICB9IGVsc2UgaWYgKGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpe1xuICAgIGNvbnNvbGUubG9nKCdwbGF5ZXIyIFdJTlMnKTtcbiAgICBzZWNvbmRQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuICdzZWNvbmQnO1xuICB9O1xufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzZXQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGlmKHdpbm5lciA9PT0gJ2ZpcnN0JyYmZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ3NlY29uZCcmJnNlY29uZFBsYXllci5pc1R1cm4pe1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH07XG4gIGNvbnNvbGUubG9nKCdHQU1FIEhBUyBCRUVOIFJFU0VULicpO1xuICBcbiAgZmlyc3RQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgc2Vjb25kUGxheWVyLmJvYXJkLnJlc2V0KCk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IGdyaWRFdmVudHMsIHJlbmRlckdyaWQsIHBsYWNlbWVudFBoYXNlIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBmaXJzdFR1cm4sIGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyBoaWdobGlnaHQsIHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgY29tcFR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBsZXQgcGxheWVyT25lLHBsYXllclR3bztcblxuZXhwb3J0IGNvbnN0IHNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgaWYoIXBsYXllck9uZXx8IXBsYXllclR3byl7XG4gICAgbGV0IHggPSBmYWxzZTtcblxuICAgIGlmKG5hbWVUd28gPT09ICdjb21wdXRlcicpe1xuICAgICAgeCA9IHRydWU7XG4gICAgfTtcbiAgICBcbiAgICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gICAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28seCk7XG4gIH07XG5cbiAgLy9ORUVEIFRPIERPIFNISVAgUExBQ0VNRU5UIEhFUkVcbiAgcGxhY2VtZW50UGhhc2UocGxheWVyT25lLCAxKTtcbiAgLy9jYWxsIGdyaWQgZXZlbnRzIGluIHBsYWNlbWVudCBhZnRlciBwbGF5ZXJzIGRvbmU/XG4gIC8vIGdyaWRFdmVudHMoKTtcblxuICAvL3Nob3VsZCBhbGwgYmUgYXQgdGhlIGVuZCBvZiBwbGFjZW1lbnRQaGFzZT9cbiAgLy9vciByYXRoZXIgbWF5YmUgb24gZG9uZSBidG4/XG4gIC8vIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJykscGxheWVyT25lKTtcbiAgLy8gcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXJUd28pO1xuXG4gIC8vIGlmKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCl7XG4gIC8vICAgZmlyc3RUdXJuKHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICAvLyB9O1xuXG4gIC8vIGhpZ2hsaWdodChwbGF5ZXJPbmUscGxheWVyVHdvKTtcblxuICAvLyBsZXQgY29tcHV0ZXJQbGF5ZXI7XG5cbiAgLy8gaWYocGxheWVyT25lLmNvbXB1dGVyKXtcbiAgLy8gICBjb21wdXRlclBsYXllciA9IHBsYXllck9uZTtcbiAgLy8gfSBlbHNlIGlmIChwbGF5ZXJUd28uY29tcHV0ZXIpe1xuICAvLyAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyVHdvO1xuICAvLyB9O1xuICBcbiAgLy8gaWYoY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKXtcbiAgLy8gICBjb21wVHVybihwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgLy8gfTtcbn07XG4iLCIvL2lucHV0IGNlbGwgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZVxuLy9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYodHlwZW9mIGF0dHJpYnV0ZSAhPT0gJ3N0cmluZycpe1xuICAgIHJldHVybjtcbiAgfTtcblxuICBsZXQgYXJyID0gYXR0cmlidXRlLnNwbGl0KCcnKTtcblxuICBjb25zdCBnZXRMZXR0ZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbGV0dGVyVmFsdWU7XG5cbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5WzFdKSkpKXtcbiAgICAgIGxldCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsMik7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IHR3b0RpZ2l0LmpvaW4oJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH07XG5cbiAgICBsZXQgY29kZVZhbHVlID0gcGFyc2VJbnQobGV0dGVyVmFsdWUpO1xuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCg2NSArIGNvZGVWYWx1ZSkgLSAxKTtcblxuICAgIHJldHVybiBsZXR0ZXI7XG4gIH07XG5cbiAgY29uc3QgZ2V0TnVtYmVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IG51bWJlcjtcbiAgICBpZighKGlzTmFOKHBhcnNlSW50KGFycmF5W2FycmF5Lmxlbmd0aC0yXSkpKSl7XG4gICAgICBsZXQgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGgtMik7XG4gICAgICBudW1iZXIgPSB0d29EaWdpdC5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoLTFdO1xuICAgIH07XG5cbiAgICByZXR1cm4gbnVtYmVyO1xuICB9O1xuXG4gIGxldCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgbGV0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuXG4gIHJldHVybiBsZXR0ZXIgKyBudW1iZXI7XG59O1xuIiwiaW1wb3J0IHsgaGlnaGxpZ2h0LCB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGNoZWNrV2luIH0gZnJvbSBcIi4vY2hlY2tXaW5cIjtcbmltcG9ydCB7IGdhbWVSZXNldCB9IGZyb20gXCIuL2dhbWVSZXNldFwiO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tIFwiLi9nYW1lU3RhcnRcIjtcblxuLy9yYW5kb21seSBjaG9vc2VzIGEgcGxheWVyIHRvIGdvIGZpcnN0XG5leHBvcnQgY29uc3QgZmlyc3RUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxKTtcblxuICBpZihudW1iZXIlMiA9PT0gMCl7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgJHtmaXJzdFBsYXllci5nZXROYW1lKCl9IEdPRVMgRklSU1QuYCk7XG4gIH0gZWxzZSBpZiAobnVtYmVyJTIgIT09IDApe1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIGNvbnNvbGUubG9nKGAke3NlY29uZFBsYXllci5nZXROYW1lKCl9IEdPRVMgRklSU1QuYCk7XG4gIH07XG59O1xuXG4vL2NoYW5nZXMgY3VycmVudCBwbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coYElUIElTIE5PVyAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYoZmlyc3RQbGF5ZXIuaXNUdXJuKXtcbiAgICBpZihzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsdGFyZ2V0KTtcblxuICAgICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ2ZpcnN0Jyl7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyLCdmaXJzdCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH07XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybil7XG4gICAgaWYoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsdGFyZ2V0KTtcblxuICAgICAgaWYoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKSA9PT0gJ3NlY29uZCcpe1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllciwnc2Vjb25kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsc2Vjb25kUGxheWVyKTtcbiAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG5cbiAgY29tcFR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5leHBvcnQgY29uc3QgY29tcFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZihmaXJzdFBsYXllci5jb21wdXRlcil7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCk7XG5cbiAgICAgIGlmKGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcikgPT09ICdmaXJzdCcpe1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLHNlY29uZFBsYXllciwnZmlyc3QnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5jb21wdXRlcil7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCk7XG5cbiAgICAgIGlmKGNoZWNrV2luKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcikgPT09ICdzZWNvbmQnKXtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllcixzZWNvbmRQbGF5ZXIsJ3NlY29uZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxzZWNvbmRQbGF5ZXIpO1xuICAgIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIH0sIDEwMDApO1xufTtcblxuY29uc3QgdHVybldvbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpID0+IHtcbiAgZ2FtZVJlc2V0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG4gIHNldHVwKCk7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLHNlY29uZFBsYXllcik7XG4gIC8vYnJpbmcgdXAgbWVudVxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIjtcbmltcG9ydCB7IG1lbnVFdmVudHMgfSBmcm9tIFwiLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lcycpO1xubmFtZXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1ncmlkJyk7XG5jb25zdCBwbGF5ZXJUd29HcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZ3JpZCcpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsMSk7XG5jcmVhdGVHcmlkKHBsYXllclR3b0dyaWQsMik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9