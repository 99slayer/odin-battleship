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
const createGrid = (grid, gridNum) => {
  for (let i = 0; i < 11; i += 1) {
    const row = i;
    const gridRow = document.createElement("div");
    gridRow.classList.add("grid-row");
    gridRow.setAttribute("id", `grid-row-${i}`);
    gridRow.setAttribute("data-row-number", `${i}`);

    for (let i = 0; i < 11; i += 1) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      gridCell.classList.add(`grid-cell-${gridNum}`);
      gridCell.setAttribute("data-cell-coordinate", `${i}-${row}`);
      gridCell.style.border = "1px solid black";
      gridRow.appendChild(gridCell);
    }

    grid.appendChild(gridRow);
  }

  const labelRows = () => {
    const nodeList = [];
    const rows = grid.childNodes;

    rows.forEach((e) => {
      nodeList.push(e.firstChild);
    });

    let i = 1;
    nodeList.forEach((e) => {
      e.style.border = "none";
      if (e.getAttribute("data-cell-coordinate") === "0-0") {
        return;
      }
      e.textContent = `${i}`;
      i += 1;
    });
  };

  const labelColumns = () => {
    const nodeList = grid.firstChild.childNodes;
    let i = 0;
    nodeList.forEach((e) => {
      e.style.border = "none";
      const cellCoordinate = e.getAttribute("data-cell-coordinate");
      if (cellCoordinate === "0-0") {
        return;
      }
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
  turn.setAttribute('id', `turn-${playerNum}`);

  if (player.isTurn) {
    turn.textContent = 'ATTACKING...';
  } else if (!player.isTurn) {
    turn.textContent = 'WAITING...';
  };

  const ships = document.createElement('p');
  ships.setAttribute('id', `ships-${playerNum}`);
  ships.textContent = `Ships left: ${player.board.getShipsRemaining()}`;

  const wins = document.createElement('p');
  wins.setAttribute('id', `wins-${playerNum}`);
  wins.textContent = `Wins: ${player.getWins()}`;

  display.append(playerNumDisplay, name, turn, ships, wins);

  if (playerNum === 1) {
    playerOneDisplay.append(display);
  } else if (playerNum === 2) {
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
  const coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cell.getAttribute("data-cell-coordinate"));
  return coord;
};

// stops players from interacting with grids when they shouldn't be
const gridLogic = (firstPlayer, secondPlayer, cell) => {
  let x;

  // stops function if its computers turn
  if (firstPlayer.isTurn && firstPlayer.computer) {
    x = true;
  } else if (secondPlayer.isTurn && secondPlayer.computer) {
    x = true;
  };

  // stops player from interacting with their own grid
  if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn && cell.classList.contains("grid-cell-1")) {
    x = true;
  } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn && cell.classList.contains("grid-cell-2")) {
    x = true;
  };

  return x;
};

// Checks if the cell is a label
const checkTier = (cell) => {
  const cellID = cell.getAttribute("data-cell-coordinate");
  const coordinate = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cellID);

  if (
    coordinate[0] === "@" ||
    (coordinate.length === 2 && coordinate[1] === "0")
  ) {
    return true;
  };
};

const gridEvents = () => {
  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach((node) => {
    if (checkTier(node)) {
      return;
    };

    // add turn listener
    node.addEventListener("click", (e) => {
      const cell = e.target;
      const coord = getGridCoordinate(cell);

      if (gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
        return;
      };

      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, coord);
    });

    // add hover cell visual
    node.addEventListener("mouseover", (e) => {
      const cell = e.target;

      if (gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
        return;
      };

      cell.classList.add("grid-cell-hover");
    });

    // remove hover cell visual
    node.addEventListener("mouseleave", (e) => {
      const cell = e.target;
      cell.classList.remove("grid-cell-hover");
    });

    // add and remove click cell visual
    node.addEventListener("mousedown", (e) => {
      const cell = e.target;

      if (gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
        return;
      };

      cell.classList.add("grid-cell-mousedown");

      cell.onmouseup = () => {
        cell.classList.remove("grid-cell-mousedown");
      };

      cell.onmouseleave = () => {
        cell.classList.remove("grid-cell-mousedown");
      };
    });
  });
};

const renderGrid = (cells, player, placing = false) => {
  if (player.board.fleetCoordinates().length === 0) {
    resetGrid(cells);
    return;
  };

  const fleet = player.board.fleetCoordinates();
  const fleetArr = fleet.reduce((acc, val) => acc.concat(val));

  cells.forEach((cell) => {
    if(checkTier(cell)){
      return;
    };

    const coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(
      cell.getAttribute("data-cell-coordinate")
    );

    if (fleetArr.includes(coord) && player.board.attacks.includes(coord)) {
      cell.textContent = "●";
    } else if (
      !fleetArr.includes(coord) &&
      player.board.attacks.includes(coord)
    ) {
      cell.textContent = "/";
    } else if (player.computer){
      return;
    } else if (
      (0,_modules_computer__WEBPACK_IMPORTED_MODULE_3__.checkForComputer)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo) || placing
    ) {
      if (fleetArr.includes(coord)) {
        cell.textContent = "○";
      };
    } else {
      cell.textContent = "";
    };
  });
};

const resetGrid = (cells) => {
  cells.forEach((cell) => {
    if (checkTier(cell)) {
      return;
    };
    cell.textContent = null;
  });
};

// Creates and adds event listeners for the placement phase.
const placementPhase = (player, playerNum) => {
  const placement = document.getElementById("placement");
  const doneBtn = document.getElementById("done-btn");
  placement.style.display = "block";
  doneBtn.style.display = null;

  const cells = document.querySelectorAll(`.grid-cell-${playerNum}`);
  const sizeArr = [5, 4, 3, 3, 2];
  let axis = "y";

  cells.forEach((cell) => {
    if (checkTier(cell)) {
      return;
    }

    cell.addEventListener("mouseover", (e) => {
      if (sizeArr.length === 0) {
        return;
      }

      const targetCell = e.target;
      const targetCellCoordinate = targetCell.getAttribute(
        "data-cell-coordinate"
      );
      let hoverCells = getHoverCells(
        targetCellCoordinate,
        sizeArr[0],
        axis,
        playerNum
      );

      hoverCells.forEach((hoverCell) => {
        if (!hoverCell) {
          return;
        }

        hoverCell.classList.add("grid-cell-hover");
      });

      targetCell.onmouseleave = (e) => {
        cells.forEach((c) => {
          c.classList.remove("grid-cell-hover");
        });
      };

      // change axis
      document.oncontextmenu = (e) => {
        e.preventDefault();

        hoverCells.forEach((hoverCell) => {
          if (hoverCell === null) {
            return;
          }

          hoverCell.classList.remove("grid-cell-hover");
        });

        if (axis === "y") {
          axis = "x";
        } else if (axis === "x") {
          axis = "y";
        }

        hoverCells = getHoverCells(
          targetCellCoordinate,
          sizeArr[0],
          axis,
          playerNum
        );

        hoverCells.forEach((hoverCell) => {
          if (hoverCell === null) {
            return;
          }

          hoverCell.classList.add("grid-cell-hover");
        });
      };

      // place ship
      targetCell.onclick = (e) => {
        if (hoverCells.includes(null)) {
          console.log("OUT OF BOUNDS.");
          return;
        }

        let fleetArr = [];

        if (!(player.board.fleetCoordinates().length === 0)) {
          fleetArr = player.board
            .fleetCoordinates()
            .reduce((acc, val) => acc.concat(val));
        }

        for (let i = 0; i < hoverCells.length; i += 1) {
          const cellCoord = hoverCells[i].getAttribute("data-cell-coordinate");

          if (fleetArr.includes((0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(cellCoord))) {
            return;
          }
        }

        const coordArr = [];

        for (let i = 0; i < hoverCells.length; i += 1) {
          const attribute = hoverCells[i].getAttribute("data-cell-coordinate");
          const coord = (0,_modules_parseCellCoordinate__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinate)(attribute);
          coordArr.push(coord);
        };

        player.board.place(coordArr);
        sizeArr.shift();
        hoverCells = getHoverCells(
          targetCellCoordinate,
          sizeArr[0],
          axis,
          playerNum
        );
        // rerender hovercells for hover visual
        renderGrid(cells, player, true);

        if (sizeArr.length === 0) {
          doneBtn.style.display = "block";
        };
      };
    });
  });
};

// returns node list
const getHoverCells = (start, size, axis, playerNum) => {
  const hoverCells = [];
  const startArr = start.split("");
  let x = getX(startArr);
  x = parseInt(x);
  let y = getY(startArr);
  y = parseInt(y);

  if (axis === "x") {
    for (let i = 0; i < size; i += 1) {
      const cellX = x + i + "-" + y;
      hoverCells.push(
        document.querySelector(
          `.grid-${playerNum} [data-cell-coordinate="${cellX}"]`
        )
      );
    }
  } else if (axis === "y") {
    for (let i = 0; i < size; i += 1) {
      const cellY = x + "-" + (y + i);
      hoverCells.push(
        document.querySelector(
          `.grid-${playerNum} [data-cell-coordinate="${cellY}"]`
        )
      );
    }
  }

  return hoverCells;
};

const getX = (arr) => {
  let x;
  if (!isNaN(parseInt(arr[1]))) {
    const twoDigit = arr.slice(0, 2);
    x = twoDigit.join("");
  } else {
    x = arr[0];
  }
  return x;
};

const getY = (arr) => {
  let y;
  if (!isNaN(parseInt(arr[arr.length - 2]))) {
    const twoDigit = arr.slice(arr.length - 2);
    y = twoDigit.join("");
  } else {
    y = arr[arr.length - 1];
  }
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
  const playerOneDisplay = document.getElementById("player-one-display");
  const playerTwoDisplay = document.getElementById("player-two-display");
  const grid1 = document.getElementById("player-one-grid");
  const grid2 = document.getElementById("player-two-grid");

  playerOneDisplay.classList.remove("waiting-player");
  grid1.classList.remove("waiting-player");
  playerTwoDisplay.classList.remove("waiting-player");
  grid2.classList.remove("waiting-player");

  if (
    firstPlayer.board.getShips().length === 0 &&
    secondPlayer.board.getShips().length === 0
  ) {
    return;
  };

  if (
    firstPlayer.board.attacks.length === 0 &&
    secondPlayer.board.attacks.length === 0
  ) {
    if (firstPlayer.isTurn) {
      playerTwoDisplay.classList.add("waiting-player");
      grid2.classList.add("waiting-player");
    } else if (secondPlayer.isTurn) {
      playerOneDisplay.classList.add("waiting-player");
      grid1.classList.add("waiting-player");
    }
    return;
  };

  if (firstPlayer.isTurn) {
    playerTwoDisplay.classList.add("waiting-player");
    grid2.classList.add("waiting-player");
  } else if (secondPlayer.isTurn) {
    playerOneDisplay.classList.add("waiting-player");
    grid1.classList.add("waiting-player");
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




const multiplayer = document.getElementById("multiplayer");
const names = document.getElementById("names");
const placement = document.getElementById("placement");

const singlePlayerBtn = document.getElementById("single-player");
const twoPlayerBtn = document.getElementById("two-player");
const playerTwoCont = document.getElementById("player-two-cont");

const playerOneNameEl = document.getElementById("player-one-name");
const playerTwoNameEl = document.getElementById('player-two-name');
const startBtn = document.getElementById("start");
const doneBtn = document.getElementById("done-btn");

let isMultiplayer = false;

const hide = (el) => {
  el.style.display = "none";
};

const show = (el) => {
  el.style.display = 'block';
};

const getNames = () => {
  const playerOneName = playerOneNameEl.value;
  let playerTwoName = playerTwoNameEl.value;

  if(!isMultiplayer){
    playerTwoName = 'computer';
  };

  return [playerOneName, playerTwoName];
};

const donePlacement = (firstPlayer, secondPlayer) => {
  (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-1'),firstPlayer);
  (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),secondPlayer);

  const firstFleet = firstPlayer.board.fleetCoordinates();
  const secondFleet = secondPlayer.board.fleetCoordinates();

  if(firstFleet.length === 5 && secondFleet.length === 0){
    const grid1 = document.querySelector(".grid-1");
    const gridClone1 = grid1.cloneNode(true);
    grid1.replaceWith(gridClone1);
    if (secondPlayer.computer) {
      (0,_modules_computer__WEBPACK_IMPORTED_MODULE_2__.computerPlacement)(secondPlayer, [5, 4, 3, 3, 2]);
      hide(placement);
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
    } else {
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(secondPlayer, 2);
    };
  };

  if(firstFleet.length === 5 && secondFleet.length === 5){
    const grid2 = document.querySelector(".grid-2");
    const gridClone2 = grid2.cloneNode(true);
    grid2.replaceWith(gridClone2);
    hide(placement);
    (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
  };
};

const gameSetUp = () => {
  const playerNames = getNames();
  const nameOne = playerNames[0];
  const nameTwo = playerNames[1];

  if (nameOne === "" || nameTwo === "") {
    return;
  }

  hide(names);

  (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.setup)(nameOne, nameTwo);
  playerOneNameEl.value = "";
  playerTwoNameEl.value = '';
};

const multiplayerMenu = (e) => {
  hide(playerTwoCont);

  if(e.target.getAttribute('id')==='two-player'){
    playerTwoCont.style.display = 'flex';
    isMultiplayer = true;
  };

  hide(multiplayer);
  show(names);
};

// menu interaction events
const menuEvents = (() => {
  singlePlayerBtn.addEventListener('click',multiplayerMenu);
  twoPlayerBtn.addEventListener('click',multiplayerMenu);

  // do this for both inputs
  startBtn.addEventListener("click", () => {
    gameSetUp();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    };
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    };
  });

  doneBtn.addEventListener("click", () => {
    donePlacement(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerOne,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo);
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
  const turn1 = document.getElementById("turn-1");
  const turn2 = document.getElementById("turn-2");
  if (firstPlayer.isTurn) {
    turn1.textContent = "ATTACKING...";
    turn2.textContent = "WAITING...";
  } else if (secondPlayer.isTurn) {
    turn2.textContent = "ATTACKING...";
    turn1.textContent = "WAITING...";
  }
};

const updateShips = (firstPlayer, secondPlayer) => {
  const ships1 = document.getElementById("ships-1");
  const ships2 = document.getElementById("ships-2");
  ships1.textContent = `Ships left: ${firstPlayer.board.getShipsRemaining()}`;
  ships2.textContent = `Ships left: ${secondPlayer.board.getShipsRemaining()}`;
};

const updateWins = (firstPlayer, secondPlayer) => {
  const wins1 = document.getElementById("wins-1");
  const wins2 = document.getElementById("wins-2");
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


const createGameboard = () => {
  const ships = [];
  const attacks = [];

  const place = (coordinates) => {
    const newShip = (0,_createShip__WEBPACK_IMPORTED_MODULE_0__.createShip)(coordinates);
    ships.push(newShip);
    return newShip;
  };

  const receiveAttack = (target) => {
    if (attacks.includes(target)) {
      return;
    }

    const shipIndex = ships.findIndex((ship) => {
      return ship.coordinates.includes(target);
    });

    if (shipIndex > -1) {
      ships[shipIndex].hit();
    }

    attacks.push(target);
  };

  const getShips = () => {
    return ships;
  };

  const fleetCoordinates = () => {
    const arr = [];
    for (let i = 0; i < ships.length; i += 1) {
      arr.push(ships[i].coordinates);
    }

    return arr;
  };

  const getShipsRemaining = () => {
    let shipsSunk = 0;

    ships.forEach((ship) => {
      if (ship.isSunk()) {
        shipsSunk += 1;
      }
    });

    return ships.length - shipsSunk;
  };

  const isFleetSunk = () => {
    if (ships.every((ship) => ship.isSunk())) {
      return true;
    } else {
      return false;
    }
  };

  const reset = () => {
    const resetArray = (arr) => {
      const size = arr.length;

      for (let i = 0; i < size; i += 1) {
        arr.pop();
      }
    };

    resetArray(ships);
    resetArray(attacks);
  };

  return {
    attacks,
    place,
    receiveAttack,
    getShips,
    fleetCoordinates,
    getShipsRemaining,
    isFleetSunk,
    reset,
  };
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


const createPlayer = (playerName, isComp = false) => {
  const name = playerName;
  const computer = isComp;
  const board = (0,_createGameboard__WEBPACK_IMPORTED_MODULE_0__.createGameboard)();
  const isTurn = false;
  let wins = 0;

  const makeAttack = (enemyBoard, coordinates = null) => {
    let target = coordinates;

    if (computer) {
      target = computerAttack(enemyBoard);
      console.log(`computer attacks ${target}`);
    } else {
      console.log(`${name} attacks ${target}`);
    }

    enemyBoard.receiveAttack(target);
  };

  const computerAttack = (enemyBoard, gen = 1) => {
    const hits = [];
    const ships = enemyBoard.getShips();
    let target;

    const targetAdjacent = () => {
      // populates hits array
      for (let i = 0; i < enemyBoard.attacks.length; i += 1) {
        const atk = enemyBoard.attacks[i];
        const fleetArr = enemyBoard
          .fleetCoordinates()
          .reduce((acc, val) => acc.concat(val));

        if (fleetArr.includes(atk) && !hits.includes(atk)) {
          hits.push(atk);
        }
      }

      // remove hits that are on sunk ships
      ships.forEach((ship) => {
        if (ship.isSunk()) {
          const list = [];

          for (let i = 0; i < hits.length; i += 1) {
            if (ship.coordinates.includes(hits[i])) {
              list.push(hits[i]);
            }
          }

          for (let i = 0; i < ship.coordinates.length; i += 1) {
            const index = hits.indexOf(list[0]);
            hits.splice(index, 1);
            list.shift();
          }
        }
      });

      // returns valid target adjacent to the input coordinate
      const getAdjacent = (inputCoord) => {
        const [a, ...rest] = inputCoord;
        const char = a;
        const num = parseInt(rest.join(""));
        const code = char.charCodeAt(0);

        if (code + 1 <= 74) {
          const coord = String.fromCharCode(code + 1) + num;

          if (!enemyBoard.attacks.includes(coord)) {
            return coord;
          }
        }

        if (code - 1 >= 65) {
          const coord = String.fromCharCode(code - 1) + num;

          if (!enemyBoard.attacks.includes(coord)) {
            return coord;
          }
        }

        if (num + 1 <= 10) {
          const coord = char + (num + 1);

          if (!enemyBoard.attacks.includes(coord)) {
            return coord;
          }
        }

        if (num - 1 >= 1) {
          const coord = char + (num - 1);

          if (!enemyBoard.attacks.includes(coord)) {
            return coord;
          }
        }
      };

      for (let i = 0; i < hits.length; i += 1) {
        const adjacent = getAdjacent(hits[i]);

        if (adjacent) {
          target = adjacent;
          return adjacent;
        }
      }
    };

    targetAdjacent();
    if (hits.length !== 0) {
      // console.log(`adjacent target found => ${target}`);
      return target;
    }

    const generateAttack = () => {
      const generateCharCode = () => {
        return Math.floor(Math.random() * (74 - 65 + 1)) + 65;
      };

      let letter = String.fromCharCode(generateCharCode());
      let number = Math.floor(Math.random() * 10 + 1);
      target = letter + number;

      // remakes attack if target has already been hit
      if (enemyBoard.attacks.includes(target)) {
        do {
          letter = String.fromCharCode(generateCharCode());
          number = Math.floor(Math.random() * 10 + 1);
          target = letter + number;
        } while (enemyBoard.attacks.includes(target));
      }
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
const createShip = (coordinateArray) => {
  const coordinates = coordinateArray;
  const length = coordinateArray.length;
  let damage = 0;

  const hit = () => {
    damage += 1;
  };

  const isSunk = () => {
    if (length === damage) {
      return true;
    } else {
      return false;
    }
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
  if (secondPlayer.board.isFleetSunk()) {
    // console.log('player1 WINS');
    firstPlayer.won();
    return "first";
  } else if (firstPlayer.board.isFleetSunk()) {
    // console.log('player2 WINS');
    secondPlayer.won();
    return "second";
  }
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
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");



const computerPlacement = (player, sizeArr) => {
  const numberOfShips = sizeArr.length;

  for (let i = 0; i < numberOfShips; i += 1) {
    let coords = generateCoordinates(player, sizeArr[0]);

    const currentFleet = player.board.fleetCoordinates();
    let fleetArr;

    if (currentFleet.length !== 0) {
      fleetArr = currentFleet.reduce((acc, val) => acc.concat(val));
    };

    while (checkCoordinates(coords, fleetArr)) {
      // let old = coords;
      coords = generateCoordinates(player, sizeArr[0]);
      // console.log(`old coords: ${old}| new coords: ${coords}`);
    };

    // console.log(`computer places ship at ${coords}`);
    player.board.place(coords);
    sizeArr.shift();
  };
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll('.grid-cell-2'),player);

  (0,_gameStart__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
};

const generateCoordinates = (player, size) => {
  const axis = generateAxis();
  const start = generateStart();
  const x = start[0];
  const y = start[1];
  const coordArr = [];

  if (axis === "x") {
    // increment letter
    for (let i = 0; i < size; i += 1) {
      const code = x.charCodeAt(0);
      const cellX = String.fromCharCode(code + i) + y;
      coordArr.push(cellX);
    }
  } else if (axis === "y") {
    // increment number
    for (let i = 0; i < size; i += 1) {
      const cellY = x + (y + i);
      coordArr.push(cellY);
    }
  }

  return coordArr;
};

// return true if coordinates are invalid
const checkCoordinates = (coordinates, fleet) => {
  for (let i = 0; i < coordinates.length; i += 1) {
    if (fleet === undefined) {
      break;
    } else if (fleet.includes(coordinates[i])) {
      console.log("ship conflict");
      return true;
    }
  }

  const [letter, ...rest] = coordinates[0];
  const x = letter;
  const y = parseInt(rest.join(""));

  if (x.charCodeAt(0) + (coordinates.length - 1) > 74) {
    return true;
  } else if (y + (coordinates.length - 1) > 10) {
    return true;
  }
};

const generateAxis = () => {
  const number = Math.floor(Math.random() * 10 + 1);
  let axis;

  if (number % 2 === 0) {
    axis = "x";
  } else if (number % 2 !== 0) {
    axis = "y";
  }

  return axis;
};

const generateStart = () => {
  const generateCharCode = () => {
    return Math.floor(Math.random() * (74 - 65 + 1)) + 65;
  };

  const letter = String.fromCharCode(generateCharCode());
  const number = Math.floor(Math.random() * 10 + 1);

  return [letter, number];
};

const checkForComputer = (firstPlayer, secondPlayer) => {
  if (firstPlayer.computer || secondPlayer.computer) {
    return true;
  } else {
    return false;
  }
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
  if (winner === "first" && firstPlayer.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_0__.changeTurn)(firstPlayer, secondPlayer);
  } else if (winner === "second" && secondPlayer.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_0__.changeTurn)(firstPlayer, secondPlayer);
  }
  // console.log('GAME HAS BEEN RESET.');

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






let playerOne, playerTwo;

const setup = (nameOne, nameTwo) => {
  if (!playerOne || !playerTwo) {
    let x = false;

    if (nameTwo === "computer") {
      x = true;
    }

    playerOne = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameOne);
    playerTwo = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameTwo, x);
    (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerOne, 1);
    (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerTwo, 2);
  }
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__.highlight)(playerOne, playerTwo);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.placementPhase)(playerOne, 1);
};

// should be called after ships have been placed
const gameStart = () => {
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.gridEvents)();

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), playerTwo);

  if (playerOne.getWins() === 0 && playerTwo.getWins() === 0) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_3__.firstTurn)(playerOne, playerTwo);
  }

  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__.highlight)(playerOne, playerTwo);


  // fixVV
  let computerPlayer;

  if (playerOne.computer) {
    computerPlayer = playerOne;
  } else if (playerTwo.computer) {
    computerPlayer = playerTwo;
  }

  if (computerPlayer.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_3__.compTurn)(playerOne, playerTwo);
  }
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
// input cell element data attribute
// output attack coordinates
const parseCellCoordinate = (attribute) => {
  if (typeof attribute !== "string") {
    return;
  }

  const arr = attribute.split("");

  const getLetter = (array) => {
    let letterValue;

    if (!isNaN(parseInt(array[1]))) {
      const twoDigit = array.slice(0, 2);
      letterValue = twoDigit.join("");
    } else {
      letterValue = array[0];
    }

    const codeValue = parseInt(letterValue);
    const letter = String.fromCharCode(65 + codeValue - 1);

    return letter;
  };

  const getNumber = (array) => {
    let number;
    if (!isNaN(parseInt(array[array.length - 2]))) {
      const twoDigit = array.slice(array.length - 2);
      number = twoDigit.join("");
    } else {
      number = array[array.length - 1];
    }

    return number;
  };

  const letter = getLetter(arr);
  const number = getNumber(arr);

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







// randomly chooses a player to go first
const firstTurn = (firstPlayer, secondPlayer) => {
  const number = Math.floor(Math.random() * 10 + 1);

  if (number % 2 === 0) {
    firstPlayer.isTurn = true;
    // console.log(`${firstPlayer.getName()} GOES FIRST.`);
  } else if (number % 2 !== 0) {
    secondPlayer.isTurn = true;
    // console.log(`${secondPlayer.getName()} GOES FIRST.`);
  }
};

// changes current player
const changeTurn = (firstPlayer, secondPlayer) => {
  if (firstPlayer.isTurn) {
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
    // console.log(`IT IS NOW ${secondPlayer.getName()}s TURN.`);
  } else if (secondPlayer.isTurn) {
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
    // console.log(`IT IS NOW ${firstPlayer.getName()}s TURN.`);
  }
};

const turn = (firstPlayer, secondPlayer, target) => {
  if (firstPlayer.isTurn) {
    if (secondPlayer.board.attacks.includes(target)) {
      return;
    } else {
      firstPlayer.makeAttack(secondPlayer.board, target);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "first") {
        turnWon(firstPlayer, secondPlayer, "first");
        return;
      }
    }
  } else if (secondPlayer.isTurn) {
    if (firstPlayer.board.attacks.includes(target)) {
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board, target);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "second") {
        turnWon(firstPlayer, secondPlayer, "second");
        return;
      }
    }
  }

  changeTurn(firstPlayer, secondPlayer);
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer, secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer, secondPlayer);

  compTurn(firstPlayer, secondPlayer);
};

const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    if (firstPlayer.computer) {
      firstPlayer.makeAttack(secondPlayer.board);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "first") {
        turnWon(firstPlayer, secondPlayer, "first");
        return;
      }
    } else if (secondPlayer.computer) {
      secondPlayer.makeAttack(firstPlayer.board);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "second") {
        turnWon(firstPlayer, secondPlayer, "second");
        return;
      }
    }

    changeTurn(firstPlayer, secondPlayer);
    (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer, secondPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
    (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
    (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer, secondPlayer);
  }, 1000);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  (0,_gameReset__WEBPACK_IMPORTED_MODULE_4__.gameReset)(firstPlayer, secondPlayer, winner);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer, secondPlayer);
  (0,_gameStart__WEBPACK_IMPORTED_MODULE_5__.setup)();
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



const multiplayer = document.getElementById('multiplayer');
multiplayer.style.display = "block";

// const names = document.getElementById("names");
// names.style.display = "block";

const playerOneGrid = document.getElementById("player-one-grid");
const playerTwoGrid = document.getElementById("player-two-grid");

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid, 1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid, 2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlFQUFVO0FBQ1osRUFBRSxpRUFBVTtBQUNaLEVBQUUsK0VBQWM7QUFDaEIsRUFBRSxpREFBSztBQUNQOzs7Ozs7O1VDbkdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnlEO0FBQ0w7O0FBRXBEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNFQUFVO0FBQ1Ysc0VBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9ncmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vbWVudS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlR2FtZWJvYXJkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlUGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlU2hpcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jaGVja1dpbi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lUmVzZXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVN0YXJ0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdHVybi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUdyaWQgPSAoZ3JpZCwgZ3JpZE51bSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpICs9IDEpIHtcbiAgICBjb25zdCByb3cgPSBpO1xuICAgIGNvbnN0IGdyaWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdyaWRSb3cuY2xhc3NMaXN0LmFkZChcImdyaWQtcm93XCIpO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGdyaWQtcm93LSR7aX1gKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZShcImRhdGEtcm93LW51bWJlclwiLCBgJHtpfWApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChgZ3JpZC1jZWxsLSR7Z3JpZE51bX1gKTtcbiAgICAgIGdyaWRDZWxsLnNldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIsIGAke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICAgIGdyaWRSb3cuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgIH1cblxuICAgIGdyaWQuYXBwZW5kQ2hpbGQoZ3JpZFJvdyk7XG4gIH1cblxuICBjb25zdCBsYWJlbFJvd3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBbXTtcbiAgICBjb25zdCByb3dzID0gZ3JpZC5jaGlsZE5vZGVzO1xuXG4gICAgcm93cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBub2RlTGlzdC5wdXNoKGUuZmlyc3RDaGlsZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgaSA9IDE7XG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgICAgIGlmIChlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpID09PSBcIjAtMFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgbGFiZWxDb2x1bW5zID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gZ3JpZC5maXJzdENoaWxkLmNoaWxkTm9kZXM7XG4gICAgbGV0IGkgPSAwO1xuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICBjb25zdCBjZWxsQ29vcmRpbmF0ZSA9IGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG4gICAgICBpZiAoY2VsbENvb3JkaW5hdGUgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZS50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBpKX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGxhYmVsUm93cygpO1xuICBsYWJlbENvbHVtbnMoKTtcbn07XG4iLCJjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1vbmUtZGlzcGxheScpO1xuY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLWRpc3BsYXknKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXNwbGF5LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXktY29udCcpO1xuXG4gIGNvbnN0IHBsYXllck51bURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICBuYW1lLnRleHRDb250ZW50ID0gYCR7cGxheWVyLmdldE5hbWUoKX1gO1xuXG4gIGNvbnN0IHR1cm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHR1cm4uc2V0QXR0cmlidXRlKCdpZCcsIGB0dXJuLSR7cGxheWVyTnVtfWApO1xuXG4gIGlmIChwbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdBVFRBQ0tJTkcuLi4nO1xuICB9IGVsc2UgaWYgKCFwbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybi50ZXh0Q29udGVudCA9ICdXQUlUSU5HLi4uJztcbiAgfTtcblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgc2hpcHMuc2V0QXR0cmlidXRlKCdpZCcsIGBzaGlwcy0ke3BsYXllck51bX1gKTtcbiAgc2hpcHMudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtwbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuXG4gIGNvbnN0IHdpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHdpbnMuc2V0QXR0cmlidXRlKCdpZCcsIGB3aW5zLSR7cGxheWVyTnVtfWApO1xuICB3aW5zLnRleHRDb250ZW50ID0gYFdpbnM6ICR7cGxheWVyLmdldFdpbnMoKX1gO1xuXG4gIGRpc3BsYXkuYXBwZW5kKHBsYXllck51bURpc3BsYXksIG5hbWUsIHR1cm4sIHNoaXBzLCB3aW5zKTtcblxuICBpZiAocGxheWVyTnVtID09PSAxKSB7XG4gICAgcGxheWVyT25lRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH0gZWxzZSBpZiAocGxheWVyTnVtID09PSAyKSB7XG4gICAgcGxheWVyVHdvRGlzcGxheS5hcHBlbmQoZGlzcGxheSk7XG4gIH07XG59O1xuIiwiaW1wb3J0IHsgcGFyc2VDZWxsQ29vcmRpbmF0ZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGVcIjtcbmltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyB0dXJuIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvdHVyblwiO1xuaW1wb3J0IHsgY2hlY2tGb3JDb21wdXRlciB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2NvbXB1dGVyXCI7XG5cbmNvbnN0IGdldEdyaWRDb29yZGluYXRlID0gKGNlbGwpID0+IHtcbiAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIikpO1xuICByZXR1cm4gY29vcmQ7XG59O1xuXG4vLyBzdG9wcyBwbGF5ZXJzIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCBncmlkcyB3aGVuIHRoZXkgc2hvdWxkbid0IGJlXG5jb25zdCBncmlkTG9naWMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgY2VsbCkgPT4ge1xuICBsZXQgeDtcblxuICAvLyBzdG9wcyBmdW5jdGlvbiBpZiBpdHMgY29tcHV0ZXJzIHR1cm5cbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybiAmJiBmaXJzdFBsYXllci5jb21wdXRlcikge1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4gJiYgc2Vjb25kUGxheWVyLmNvbXB1dGVyKSB7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgLy8gc3RvcHMgcGxheWVyIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCB0aGVpciBvd24gZ3JpZFxuICBpZiAocGxheWVyT25lLmlzVHVybiAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWQtY2VsbC0xXCIpKSB7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWQtY2VsbC0yXCIpKSB7XG4gICAgeCA9IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vLyBDaGVja3MgaWYgdGhlIGNlbGwgaXMgYSBsYWJlbFxuY29uc3QgY2hlY2tUaWVyID0gKGNlbGwpID0+IHtcbiAgY29uc3QgY2VsbElEID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgY29uc3QgY29vcmRpbmF0ZSA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbElEKTtcblxuICBpZiAoXG4gICAgY29vcmRpbmF0ZVswXSA9PT0gXCJAXCIgfHxcbiAgICAoY29vcmRpbmF0ZS5sZW5ndGggPT09IDIgJiYgY29vcmRpbmF0ZVsxXSA9PT0gXCIwXCIpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdyaWRFdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG5cbiAgY2VsbHMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIobm9kZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgLy8gYWRkIHR1cm4gbGlzdGVuZXJcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgY29vcmQgPSBnZXRHcmlkQ29vcmRpbmF0ZShjZWxsKTtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgdHVybihwbGF5ZXJPbmUsIHBsYXllclR3bywgY29vcmQpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBhbmQgcmVtb3ZlIGNsaWNrIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG5cbiAgICAgIGNlbGwub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKGNlbGxzLCBwbGF5ZXIsIHBsYWNpbmcgPSBmYWxzZSkgPT4ge1xuICBpZiAocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXNldEdyaWQoY2VsbHMpO1xuICAgIHJldHVybjtcbiAgfTtcblxuICBjb25zdCBmbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGZsZWV0QXJyID0gZmxlZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYoY2hlY2tUaWVyKGNlbGwpKXtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKFxuICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKVxuICAgICk7XG5cbiAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4pePXCI7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFmbGVldEFyci5pbmNsdWRlcyhjb29yZCkgJiZcbiAgICAgIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKVxuICAgICkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLmNvbXB1dGVyKXtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY2hlY2tGb3JDb21wdXRlcihwbGF5ZXJPbmUsIHBsYXllclR3bykgfHwgcGxhY2luZ1xuICAgICkge1xuICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRHcmlkID0gKGNlbGxzKSA9PiB7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKGNlbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYWNlbWVudCBwaGFzZS5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudFwiKTtcbiAgY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9uZS1idG5cIik7XG4gIHBsYWNlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdyaWQtY2VsbC0ke3BsYXllck51bX1gKTtcbiAgY29uc3Qgc2l6ZUFyciA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgbGV0IGF4aXMgPSBcInlcIjtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgaWYgKHNpemVBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbENvb3JkaW5hdGUgPSB0YXJnZXRDZWxsLmdldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiXG4gICAgICApO1xuICAgICAgbGV0IGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgYXhpcyxcbiAgICAgICAgcGxheWVyTnVtXG4gICAgICApO1xuXG4gICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICBpZiAoIWhvdmVyQ2VsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRhcmdldENlbGwub25tb3VzZWxlYXZlID0gKGUpID0+IHtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBjaGFuZ2UgYXhpc1xuICAgICAgZG9jdW1lbnQub25jb250ZXh0bWVudSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICAgIGlmIChob3ZlckNlbGwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgICAgICAgYXhpcyA9IFwieFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICAgICAgYXhpcyA9IFwieVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgICAgaWYgKGhvdmVyQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHBsYWNlIHNoaXBcbiAgICAgIHRhcmdldENlbGwub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmIChob3ZlckNlbGxzLmluY2x1ZGVzKG51bGwpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJPVVQgT0YgQk9VTkRTLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmxlZXRBcnIgPSBbXTtcblxuICAgICAgICBpZiAoIShwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICBmbGVldEFyciA9IHBsYXllci5ib2FyZFxuICAgICAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdmVyQ2VsbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBjZWxsQ29vcmQgPSBob3ZlckNlbGxzW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbENvb3JkKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb29yZEFyciA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG92ZXJDZWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgY29vcmRBcnIucHVzaChjb29yZCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlKGNvb3JkQXJyKTtcbiAgICAgICAgc2l6ZUFyci5zaGlmdCgpO1xuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgICBzaXplQXJyWzBdLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgcGxheWVyTnVtXG4gICAgICAgICk7XG4gICAgICAgIC8vIHJlcmVuZGVyIGhvdmVyY2VsbHMgZm9yIGhvdmVyIHZpc3VhbFxuICAgICAgICByZW5kZXJHcmlkKGNlbGxzLCBwbGF5ZXIsIHRydWUpO1xuXG4gICAgICAgIGlmIChzaXplQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRvbmVCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gcmV0dXJucyBub2RlIGxpc3RcbmNvbnN0IGdldEhvdmVyQ2VsbHMgPSAoc3RhcnQsIHNpemUsIGF4aXMsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBob3ZlckNlbGxzID0gW107XG4gIGNvbnN0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoXCJcIik7XG4gIGxldCB4ID0gZ2V0WChzdGFydEFycik7XG4gIHggPSBwYXJzZUludCh4KTtcbiAgbGV0IHkgPSBnZXRZKHN0YXJ0QXJyKTtcbiAgeSA9IHBhcnNlSW50KHkpO1xuXG4gIGlmIChheGlzID09PSBcInhcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWCA9IHggKyBpICsgXCItXCIgKyB5O1xuICAgICAgaG92ZXJDZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWH1cIl1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxZID0geCArIFwiLVwiICsgKHkgKyBpKTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFl9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlckNlbGxzO1xufTtcblxuY29uc3QgZ2V0WCA9IChhcnIpID0+IHtcbiAgbGV0IHg7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyWzFdKSkpIHtcbiAgICBjb25zdCB0d29EaWdpdCA9IGFyci5zbGljZSgwLCAyKTtcbiAgICB4ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB4ID0gYXJyWzBdO1xuICB9XG4gIHJldHVybiB4O1xufTtcblxuY29uc3QgZ2V0WSA9IChhcnIpID0+IHtcbiAgbGV0IHk7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyW2Fyci5sZW5ndGggLSAyXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoYXJyLmxlbmd0aCAtIDIpO1xuICAgIHkgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIHkgPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiB5O1xufTtcbiIsImV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWRpc3BsYXlcIik7XG4gIGNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZGlzcGxheVwiKTtcbiAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZ3JpZFwiKTtcblxuICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgZ3JpZDEuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgZ3JpZDIuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwcygpLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwcygpLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgaWYgKFxuICAgIGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwICYmXG4gICAgc2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwXG4gICkge1xuICAgIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDIuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgICBncmlkMS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfTtcblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDIuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICBncmlkMS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIH07XG59O1xuIiwiaW1wb3J0IHsgc2V0dXAsIGdhbWVTdGFydCwgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlLCByZW5kZXJHcmlkIH0gZnJvbSBcIi4vZ3JpZFwiO1xuaW1wb3J0IHsgY29tcHV0ZXJQbGFjZW1lbnQgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVsdGlwbGF5ZXJcIik7XG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZXNcIik7XG5jb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudFwiKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5nbGUtcGxheWVyXCIpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0d28tcGxheWVyXCIpO1xuY29uc3QgcGxheWVyVHdvQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1jb250XCIpO1xuXG5jb25zdCBwbGF5ZXJPbmVOYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtbmFtZVwiKTtcbmNvbnN0IHBsYXllclR3b05hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKTtcbmNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmUtYnRuXCIpO1xuXG5sZXQgaXNNdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKGVsKSA9PiB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cbmNvbnN0IHNob3cgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG5jb25zdCBnZXROYW1lcyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyT25lTmFtZSA9IHBsYXllck9uZU5hbWVFbC52YWx1ZTtcbiAgbGV0IHBsYXllclR3b05hbWUgPSBwbGF5ZXJUd29OYW1lRWwudmFsdWU7XG5cbiAgaWYoIWlzTXVsdGlwbGF5ZXIpe1xuICAgIHBsYXllclR3b05hbWUgPSAnY29tcHV0ZXInO1xuICB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5jb25zdCBkb25lUGxhY2VtZW50ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTEnKSxmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0yJyksc2Vjb25kUGxheWVyKTtcblxuICBjb25zdCBmaXJzdEZsZWV0ID0gZmlyc3RQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBzZWNvbmRGbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG5cbiAgaWYoZmlyc3RGbGVldC5sZW5ndGggPT09IDUgJiYgc2Vjb25kRmxlZXQubGVuZ3RoID09PSAwKXtcbiAgICBjb25zdCBncmlkMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC0xXCIpO1xuICAgIGNvbnN0IGdyaWRDbG9uZTEgPSBncmlkMS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgZ3JpZDEucmVwbGFjZVdpdGgoZ3JpZENsb25lMSk7XG4gICAgaWYgKHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgICAgY29tcHV0ZXJQbGFjZW1lbnQoc2Vjb25kUGxheWVyLCBbNSwgNCwgMywgMywgMl0pO1xuICAgICAgaGlkZShwbGFjZW1lbnQpO1xuICAgICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGFjZW1lbnRQaGFzZShzZWNvbmRQbGF5ZXIsIDIpO1xuICAgIH07XG4gIH07XG5cbiAgaWYoZmlyc3RGbGVldC5sZW5ndGggPT09IDUgJiYgc2Vjb25kRmxlZXQubGVuZ3RoID09PSA1KXtcbiAgICBjb25zdCBncmlkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC0yXCIpO1xuICAgIGNvbnN0IGdyaWRDbG9uZTIgPSBncmlkMi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgZ3JpZDIucmVwbGFjZVdpdGgoZ3JpZENsb25lMik7XG4gICAgaGlkZShwbGFjZW1lbnQpO1xuICAgIGdhbWVTdGFydCgpO1xuICB9O1xufTtcblxuY29uc3QgZ2FtZVNldFVwID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lcyA9IGdldE5hbWVzKCk7XG4gIGNvbnN0IG5hbWVPbmUgPSBwbGF5ZXJOYW1lc1swXTtcbiAgY29uc3QgbmFtZVR3byA9IHBsYXllck5hbWVzWzFdO1xuXG4gIGlmIChuYW1lT25lID09PSBcIlwiIHx8IG5hbWVUd28gPT09IFwiXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBoaWRlKG5hbWVzKTtcblxuICBzZXR1cChuYW1lT25lLCBuYW1lVHdvKTtcbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gXCJcIjtcbiAgcGxheWVyVHdvTmFtZUVsLnZhbHVlID0gJyc7XG59O1xuXG5jb25zdCBtdWx0aXBsYXllck1lbnUgPSAoZSkgPT4ge1xuICBoaWRlKHBsYXllclR3b0NvbnQpO1xuXG4gIGlmKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKT09PSd0d28tcGxheWVyJyl7XG4gICAgcGxheWVyVHdvQ29udC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGlzTXVsdGlwbGF5ZXIgPSB0cnVlO1xuICB9O1xuXG4gIGhpZGUobXVsdGlwbGF5ZXIpO1xuICBzaG93KG5hbWVzKTtcbn07XG5cbi8vIG1lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbXVsdGlwbGF5ZXJNZW51KTtcbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxtdWx0aXBsYXllck1lbnUpO1xuXG4gIC8vIGRvIHRoaXMgZm9yIGJvdGggaW5wdXRzXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZVNldFVwKCk7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBnYW1lU2V0VXAoKTtcbiAgICB9O1xuICB9KTtcblxuICBwbGF5ZXJPbmVOYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGdhbWVTZXRVcCgpO1xuICAgIH07XG4gIH0pO1xuXG4gIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb25lUGxhY2VtZW50KHBsYXllck9uZSxwbGF5ZXJUd28pO1xuICB9KTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgdXBkYXRlRGlzcGxheXMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICB1cGRhdGVUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVTaGlwcyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlV2lucyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0xXCIpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0yXCIpO1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSBcIkFUVEFDS0lORy4uLlwiO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9IFwiV0FJVElORy4uLlwiO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtMVwiKTtcbiAgY29uc3Qgc2hpcHMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy0yXCIpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG5jb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMVwiKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMlwiKTtcbiAgd2luczEudGV4dENvbnRlbnQgPSBgV2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YDtcbiAgd2luczIudGV4dENvbnRlbnQgPSBgV2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWA7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh0YXJnZXQpID0+IHtcbiAgICBpZiAoYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcEluZGV4ID0gc2hpcHMuZmluZEluZGV4KChzaGlwKSA9PiB7XG4gICAgICByZXR1cm4gc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyh0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNoaXBJbmRleCA+IC0xKSB7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH1cblxuICAgIGF0dGFja3MucHVzaCh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzUmVtYWluaW5nID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2hpcHMubGVuZ3RoIC0gc2hpcHNTdW5rO1xuICB9O1xuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4ge1xuICAgIGlmIChzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc2V0QXJyYXkgPSAoYXJyKSA9PiB7XG4gICAgICBjb25zdCBzaXplID0gYXJyLmxlbmd0aDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXNldEFycmF5KHNoaXBzKTtcbiAgICByZXNldEFycmF5KGF0dGFja3MpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrcyxcbiAgICBwbGFjZSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzLFxuICAgIGZsZWV0Q29vcmRpbmF0ZXMsXG4gICAgZ2V0U2hpcHNSZW1haW5pbmcsXG4gICAgaXNGbGVldFN1bmssXG4gICAgcmVzZXQsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vY3JlYXRlR2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyTmFtZSwgaXNDb21wID0gZmFsc2UpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBjb25zdCBpc1R1cm4gPSBmYWxzZTtcbiAgbGV0IHdpbnMgPSAwO1xuXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCwgY29vcmRpbmF0ZXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKGNvbXB1dGVyKSB7XG4gICAgICB0YXJnZXQgPSBjb21wdXRlckF0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKGVuZW15Qm9hcmQsIGdlbiA9IDEpID0+IHtcbiAgICBjb25zdCBoaXRzID0gW107XG4gICAgY29uc3Qgc2hpcHMgPSBlbmVteUJvYXJkLmdldFNoaXBzKCk7XG4gICAgbGV0IHRhcmdldDtcblxuICAgIGNvbnN0IHRhcmdldEFkamFjZW50ID0gKCkgPT4ge1xuICAgICAgLy8gcG9wdWxhdGVzIGhpdHMgYXJyYXlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGF0ayA9IGVuZW15Qm9hcmQuYXR0YWNrc1tpXTtcbiAgICAgICAgY29uc3QgZmxlZXRBcnIgPSBlbmVteUJvYXJkXG4gICAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuXG4gICAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhhdGspICYmICFoaXRzLmluY2x1ZGVzKGF0aykpIHtcbiAgICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgaGl0cyB0aGF0IGFyZSBvbiBzdW5rIHNoaXBzXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyhoaXRzW2ldKSkge1xuICAgICAgICAgICAgICBsaXN0LnB1c2goaGl0c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGhpdHMuaW5kZXhPZihsaXN0WzBdKTtcbiAgICAgICAgICAgIGhpdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm5zIHZhbGlkIHRhcmdldCBhZGphY2VudCB0byB0aGUgaW5wdXQgY29vcmRpbmF0ZVxuICAgICAgY29uc3QgZ2V0QWRqYWNlbnQgPSAoaW5wdXRDb29yZCkgPT4ge1xuICAgICAgICBjb25zdCBbYSwgLi4ucmVzdF0gPSBpbnB1dENvb3JkO1xuICAgICAgICBjb25zdCBjaGFyID0gYTtcbiAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcbiAgICAgICAgY29uc3QgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICBpZiAoY29kZSArIDEgPD0gNzQpIHtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIDEpICsgbnVtO1xuXG4gICAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgLSAxID49IDY1KSB7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgLSAxKSArIG51bTtcblxuICAgICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gKyAxIDw9IDEwKSB7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBjaGFyICsgKG51bSArIDEpO1xuXG4gICAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bSAtIDEgPj0gMSkge1xuICAgICAgICAgIGNvbnN0IGNvb3JkID0gY2hhciArIChudW0gLSAxKTtcblxuICAgICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGFkamFjZW50ID0gZ2V0QWRqYWNlbnQoaGl0c1tpXSk7XG5cbiAgICAgICAgaWYgKGFkamFjZW50KSB7XG4gICAgICAgICAgdGFyZ2V0ID0gYWRqYWNlbnQ7XG4gICAgICAgICAgcmV0dXJuIGFkamFjZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRhcmdldEFkamFjZW50KCk7XG4gICAgaWYgKGhpdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgYWRqYWNlbnQgdGFyZ2V0IGZvdW5kID0+ICR7dGFyZ2V0fWApO1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICAgICAgfTtcblxuICAgICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgICAvLyByZW1ha2VzIGF0dGFjayBpZiB0YXJnZXQgaGFzIGFscmVhZHkgYmVlbiBoaXRcbiAgICAgIGlmIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgICB9IHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdlbmVyYXRlQXR0YWNrKCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIGNvbnN0IHdvbiA9ICgpID0+IHtcbiAgICB3aW5zICs9IDE7XG4gIH07XG5cbiAgY29uc3QgZ2V0V2lucyA9ICgpID0+IHtcbiAgICByZXR1cm4gd2lucztcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgY29tcHV0ZXIsIGlzVHVybiwgbWFrZUF0dGFjaywgZ2V0TmFtZSwgd29uLCBnZXRXaW5zIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZUFycmF5KSA9PiB7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZUFycmF5O1xuICBjb25zdCBsZW5ndGggPSBjb29yZGluYXRlQXJyYXkubGVuZ3RoO1xuICBsZXQgZGFtYWdlID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgZGFtYWdlICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmIChsZW5ndGggPT09IGRhbWFnZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0RGFtYWdlID0gKCkgPT4ge1xuICAgIHJldHVybiBkYW1hZ2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBnZXREYW1hZ2UgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncGxheWVyMSBXSU5TJyk7XG4gICAgZmlyc3RQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuIFwiZmlyc3RcIjtcbiAgfSBlbHNlIGlmIChmaXJzdFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3BsYXllcjIgV0lOUycpO1xuICAgIHNlY29uZFBsYXllci53b24oKTtcbiAgICByZXR1cm4gXCJzZWNvbmRcIjtcbiAgfVxufTtcbiIsImltcG9ydCB7IGdhbWVTdGFydCB9IGZyb20gXCIuL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSAocGxheWVyLCBzaXplQXJyKSA9PiB7XG4gIGNvbnN0IG51bWJlck9mU2hpcHMgPSBzaXplQXJyLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mU2hpcHM7IGkgKz0gMSkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllciwgc2l6ZUFyclswXSk7XG5cbiAgICBjb25zdCBjdXJyZW50RmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgIGxldCBmbGVldEFycjtcblxuICAgIGlmIChjdXJyZW50RmxlZXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICBmbGVldEFyciA9IGN1cnJlbnRGbGVldC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgIH07XG5cbiAgICB3aGlsZSAoY2hlY2tDb29yZGluYXRlcyhjb29yZHMsIGZsZWV0QXJyKSkge1xuICAgICAgLy8gbGV0IG9sZCA9IGNvb3JkcztcbiAgICAgIGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMocGxheWVyLCBzaXplQXJyWzBdKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBvbGQgY29vcmRzOiAke29sZH18IG5ldyBjb29yZHM6ICR7Y29vcmRzfWApO1xuICAgIH07XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgY29tcHV0ZXIgcGxhY2VzIHNoaXAgYXQgJHtjb29yZHN9YCk7XG4gICAgcGxheWVyLmJvYXJkLnBsYWNlKGNvb3Jkcyk7XG4gICAgc2l6ZUFyci5zaGlmdCgpO1xuICB9O1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHBsYXllcik7XG5cbiAgZ2FtZVN0YXJ0KCk7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKHBsYXllciwgc2l6ZSkgPT4ge1xuICBjb25zdCBheGlzID0gZ2VuZXJhdGVBeGlzKCk7XG4gIGNvbnN0IHN0YXJ0ID0gZ2VuZXJhdGVTdGFydCgpO1xuICBjb25zdCB4ID0gc3RhcnRbMF07XG4gIGNvbnN0IHkgPSBzdGFydFsxXTtcbiAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAvLyBpbmNyZW1lbnQgbGV0dGVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSB4LmNoYXJDb2RlQXQoMCk7XG4gICAgICBjb25zdCBjZWxsWCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIGkpICsgeTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIC8vIGluY3JlbWVudCBudW1iZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFkgPSB4ICsgKHkgKyBpKTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb29yZEFycjtcbn07XG5cbi8vIHJldHVybiB0cnVlIGlmIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXG5jb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzLCBmbGVldCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGZsZWV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoZmxlZXQuaW5jbHVkZXMoY29vcmRpbmF0ZXNbaV0pKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNoaXAgY29uZmxpY3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBbbGV0dGVyLCAuLi5yZXN0XSA9IGNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCB4ID0gbGV0dGVyO1xuICBjb25zdCB5ID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcblxuICBpZiAoeC5jaGFyQ29kZUF0KDApICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gNzQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh5ICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gMTApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVBeGlzID0gKCkgPT4ge1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICBsZXQgYXhpcztcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGF4aXMgPSBcInhcIjtcbiAgfSBlbHNlIGlmIChudW1iZXIgJSAyICE9PSAwKSB7XG4gICAgYXhpcyA9IFwieVwiO1xuICB9XG5cbiAgcmV0dXJuIGF4aXM7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICB9O1xuXG4gIGNvbnN0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICByZXR1cm4gW2xldHRlciwgbnVtYmVyXTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0ZvckNvbXB1dGVyID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmNvbXB1dGVyIHx8IHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzZXQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGlmICh3aW5uZXIgPT09IFwiZmlyc3RcIiAmJiBmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gXCJzZWNvbmRcIiAmJiBzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfVxuICAvLyBjb25zb2xlLmxvZygnR0FNRSBIQVMgQkVFTiBSRVNFVC4nKTtcblxuICBmaXJzdFBsYXllci5ib2FyZC5yZXNldCgpO1xuICBzZWNvbmRQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyRGlzcGxheSB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHtcbiAgZ3JpZEV2ZW50cyxcbiAgcmVuZGVyR3JpZCxcbiAgcGxhY2VtZW50UGhhc2UsXG59IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0XCI7XG5cbmV4cG9ydCBsZXQgcGxheWVyT25lLCBwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChuYW1lT25lLCBuYW1lVHdvKSA9PiB7XG4gIGlmICghcGxheWVyT25lIHx8ICFwbGF5ZXJUd28pIHtcbiAgICBsZXQgeCA9IGZhbHNlO1xuXG4gICAgaWYgKG5hbWVUd28gPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgeCA9IHRydWU7XG4gICAgfVxuXG4gICAgcGxheWVyT25lID0gY3JlYXRlUGxheWVyKG5hbWVPbmUpO1xuICAgIHBsYXllclR3byA9IGNyZWF0ZVBsYXllcihuYW1lVHdvLCB4KTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllck9uZSwgMSk7XG4gICAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJUd28sIDIpO1xuICB9XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIHBsYWNlbWVudFBoYXNlKHBsYXllck9uZSwgMSk7XG59O1xuXG4vLyBzaG91bGQgYmUgY2FsbGVkIGFmdGVyIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWRcbmV4cG9ydCBjb25zdCBnYW1lU3RhcnQgPSAoKSA9PiB7XG4gIGdyaWRFdmVudHMoKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgcGxheWVyVHdvKTtcblxuICBpZiAocGxheWVyT25lLmdldFdpbnMoKSA9PT0gMCAmJiBwbGF5ZXJUd28uZ2V0V2lucygpID09PSAwKSB7XG4gICAgZmlyc3RUdXJuKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cblxuICAvLyBmaXhWVlxuICBsZXQgY29tcHV0ZXJQbGF5ZXI7XG5cbiAgaWYgKHBsYXllck9uZS5jb21wdXRlcikge1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyT25lO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5jb21wdXRlcikge1xuICAgIGNvbXB1dGVyUGxheWVyID0gcGxheWVyVHdvO1xuICB9XG5cbiAgaWYgKGNvbXB1dGVyUGxheWVyLmlzVHVybikge1xuICAgIGNvbXBUdXJuKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgfVxufTtcbiIsIi8vIGlucHV0IGNlbGwgZWxlbWVudCBkYXRhIGF0dHJpYnV0ZVxuLy8gb3V0cHV0IGF0dGFjayBjb29yZGluYXRlc1xuZXhwb3J0IGNvbnN0IHBhcnNlQ2VsbENvb3JkaW5hdGUgPSAoYXR0cmlidXRlKSA9PiB7XG4gIGlmICh0eXBlb2YgYXR0cmlidXRlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXJyID0gYXR0cmlidXRlLnNwbGl0KFwiXCIpO1xuXG4gIGNvbnN0IGdldExldHRlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBsZXR0ZXJWYWx1ZTtcblxuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyYXlbMV0pKSkge1xuICAgICAgY29uc3QgdHdvRGlnaXQgPSBhcnJheS5zbGljZSgwLCAyKTtcbiAgICAgIGxldHRlclZhbHVlID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0dGVyVmFsdWUgPSBhcnJheVswXTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2RlVmFsdWUgPSBwYXJzZUludChsZXR0ZXJWYWx1ZSk7XG4gICAgY29uc3QgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGNvZGVWYWx1ZSAtIDEpO1xuXG4gICAgcmV0dXJuIGxldHRlcjtcbiAgfTtcblxuICBjb25zdCBnZXROdW1iZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbnVtYmVyO1xuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyYXlbYXJyYXkubGVuZ3RoIC0gMl0pKSkge1xuICAgICAgY29uc3QgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGggLSAyKTtcbiAgICAgIG51bWJlciA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3QgbGV0dGVyID0gZ2V0TGV0dGVyKGFycik7XG4gIGNvbnN0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuXG4gIHJldHVybiBsZXR0ZXIgKyBudW1iZXI7XG59O1xuIiwiaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHRcIjtcbmltcG9ydCB7IHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9jaGVja1dpblwiO1xuaW1wb3J0IHsgZ2FtZVJlc2V0IH0gZnJvbSBcIi4vZ2FtZVJlc2V0XCI7XG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gXCIuL2dhbWVTdGFydFwiO1xuXG4vLyByYW5kb21seSBjaG9vc2VzIGEgcGxheWVyIHRvIGdvIGZpcnN0XG5leHBvcnQgY29uc3QgZmlyc3RUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coYCR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9IGVsc2UgaWYgKG51bWJlciAlIDIgIT09IDApIHtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAvLyBjb25zb2xlLmxvZyhgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9XG59O1xuXG4vLyBjaGFuZ2VzIGN1cnJlbnQgcGxheWVyXG5leHBvcnQgY29uc3QgY2hhbmdlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAvLyBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIC8vIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtmaXJzdFBsYXllci5nZXROYW1lKCl9cyBUVVJOLmApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkLCB0YXJnZXQpO1xuXG4gICAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwiZmlyc3RcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwiZmlyc3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwic2Vjb25kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcblxuICBjb21wVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChmaXJzdFBsYXllci5jb21wdXRlcikge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQpO1xuXG4gICAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwiZmlyc3RcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwiZmlyc3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQpO1xuXG4gICAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwic2Vjb25kXCIpIHtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBcInNlY29uZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gICAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCB0dXJuV29uID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBnYW1lUmVzZXQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHNldHVwKCk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuL0RPTS9pbnRlcmFjdGlvbi9tZW51XCI7XG5cbmNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211bHRpcGxheWVyJyk7XG5tdWx0aXBsYXllci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4vLyBjb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZXNcIik7XG4vLyBuYW1lcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG5jb25zdCBwbGF5ZXJPbmVHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWdyaWRcIik7XG5jb25zdCBwbGF5ZXJUd29HcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG5cbmNyZWF0ZUdyaWQocGxheWVyT25lR3JpZCwgMSk7XG5jcmVhdGVHcmlkKHBsYXllclR3b0dyaWQsIDIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9