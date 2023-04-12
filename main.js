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
    };
  } else if (axis === "y") {
    // increment number
    for (let i = 0; i < size; i += 1) {
      const cellY = x + (y + i);
      coordArr.push(cellY);
    };
  };

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
    };
  };

  const [letter, ...rest] = coordinates[0];
  const x = letter;
  const y = parseInt(rest.join(""));

  if (x.charCodeAt(0) + (coordinates.length - 1) > 74) {
    return true;
  } else if (y + (coordinates.length - 1) > 10) {
    return true;
  };
};

const generateAxis = () => {
  const number = Math.floor(Math.random() * 10 + 1);
  let axis;

  if (number % 2 === 0) {
    axis = "x";
  } else if (number % 2 !== 0) {
    axis = "y";
  };

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
    };

    playerOne = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameOne);
    playerTwo = (0,_factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(nameTwo, x);
    (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerOne, 1);
    (0,_DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__.createPlayerDisplay)(playerTwo, 2);
  };

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
  };

  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__.highlight)(playerOne, playerTwo);

  if (playerTwo.computer && playerTwo.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_3__.compTurn)(playerOne, playerTwo);
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
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./computer */ "./src/modules/computer.js");








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

// Vmake into seperate function?V
// changeTurn(firstPlayer, secondPlayer);
// highlight(firstPlayer, secondPlayer);
// renderGrid(document.querySelectorAll(".grid-cell-1"), firstPlayer);
// renderGrid(document.querySelectorAll(".grid-cell-2"), secondPlayer);
// updateDisplays(firstPlayer, secondPlayer);

const turn = (firstPlayer, secondPlayer, target) => {
  if (firstPlayer.isTurn) {
    if (secondPlayer.board.attacks.includes(target)) {
      return;
    } else {
      firstPlayer.makeAttack(secondPlayer.board, target);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "first") {
        turnWon(firstPlayer, secondPlayer, "first");
        return;
      };
    };
  } else if (secondPlayer.isTurn) {
    if (firstPlayer.board.attacks.includes(target)) {
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board, target);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "second") {
        turnWon(firstPlayer, secondPlayer, "second");
        return;
      };
    };
  };

  changeTurn(firstPlayer, secondPlayer);
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer, secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer, secondPlayer);

  if((0,_computer__WEBPACK_IMPORTED_MODULE_6__.checkForComputer)(firstPlayer, secondPlayer)){
    compTurn(firstPlayer, secondPlayer);
  };
};

// should i move all computer functions to the computer module?
const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    secondPlayer.makeAttack(firstPlayer.board);

    if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "second") {
      turnWon(firstPlayer, secondPlayer, "second");
      return;
    };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFjO0FBQ2hCLEVBQUUsaURBQUs7QUFDUDs7Ozs7OztVQ3JHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055RDtBQUNMOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVJlc2V0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsIGdyaWROdW0pID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gaTtcbiAgICBjb25zdCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoXCJncmlkLXJvd1wiKTtcbiAgICBncmlkUm93LnNldEF0dHJpYnV0ZShcImlkXCIsIGBncmlkLXJvdy0ke2l9YCk7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJvdy1udW1iZXJcIiwgYCR7aX1gKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiLCBgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9XG5cbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcblxuICAgIHJvd3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbm9kZUxpc3QucHVzaChlLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuXG4gICAgbGV0IGkgPSAxO1xuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICBpZiAoZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKSA9PT0gXCIwLTBcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7aX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IGdyaWQuZmlyc3RDaGlsZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMDtcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuICAgICAgaWYgKGNlbGxDb29yZGluYXRlID09PSBcIjAtMFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBsYWJlbFJvd3MoKTtcbiAgbGFiZWxDb2x1bW5zKCk7XG59O1xuIiwiY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lLWRpc3BsYXknKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1kaXNwbGF5Jyk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXJEaXNwbGF5ID0gKHBsYXllciwgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGlzcGxheS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5LWNvbnQnKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgcGxheWVyTnVtRGlzcGxheS50ZXh0Q29udGVudCA9IGBQTEFZRVIgJHtwbGF5ZXJOdW19YDtcblxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgbmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllci5nZXROYW1lKCl9YDtcblxuICBjb25zdCB0dXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB0dXJuLnNldEF0dHJpYnV0ZSgnaWQnLCBgdHVybi0ke3BsYXllck51bX1gKTtcblxuICBpZiAocGxheWVyLmlzVHVybikge1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnQVRUQUNLSU5HLi4uJztcbiAgfSBlbHNlIGlmICghcGxheWVyLmlzVHVybikge1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSAnV0FJVElORy4uLic7XG4gIH07XG5cbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHNoaXBzLnNldEF0dHJpYnV0ZSgnaWQnLCBgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICB3aW5zLnNldEF0dHJpYnV0ZSgnaWQnLCBgd2lucy0ke3BsYXllck51bX1gKTtcbiAgd2lucy50ZXh0Q29udGVudCA9IGBXaW5zOiAke3BsYXllci5nZXRXaW5zKCl9YDtcblxuICBkaXNwbGF5LmFwcGVuZChwbGF5ZXJOdW1EaXNwbGF5LCBuYW1lLCB0dXJuLCBzaGlwcywgd2lucyk7XG5cbiAgaWYgKHBsYXllck51bSA9PT0gMSkge1xuICAgIHBsYXllck9uZURpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9IGVsc2UgaWYgKHBsYXllck51bSA9PT0gMikge1xuICAgIHBsYXllclR3b0Rpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9O1xufTtcbiIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpKTtcbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuLy8gc3RvcHMgcGxheWVycyBmcm9tIGludGVyYWN0aW5nIHdpdGggZ3JpZHMgd2hlbiB0aGV5IHNob3VsZG4ndCBiZVxuY29uc3QgZ3JpZExvZ2ljID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIGNlbGwpID0+IHtcbiAgbGV0IHg7XG5cbiAgLy8gc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4gJiYgZmlyc3RQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuICYmIHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHggPSB0cnVlO1xuICB9O1xuXG4gIC8vIHN0b3BzIHBsYXllciBmcm9tIGludGVyYWN0aW5nIHdpdGggdGhlaXIgb3duIGdyaWRcbiAgaWYgKHBsYXllck9uZS5pc1R1cm4gJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJncmlkLWNlbGwtMVwiKSkge1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4gJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJncmlkLWNlbGwtMlwiKSkge1xuICAgIHggPSB0cnVlO1xuICB9O1xuXG4gIHJldHVybiB4O1xufTtcblxuLy8gQ2hlY2tzIGlmIHRoZSBjZWxsIGlzIGEgbGFiZWxcbmNvbnN0IGNoZWNrVGllciA9IChjZWxsKSA9PiB7XG4gIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG4gIGNvbnN0IGNvb3JkaW5hdGUgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxJRCk7XG5cbiAgaWYgKFxuICAgIGNvb3JkaW5hdGVbMF0gPT09IFwiQFwiIHx8XG4gICAgKGNvb3JkaW5hdGUubGVuZ3RoID09PSAyICYmIGNvb3JkaW5hdGVbMV0gPT09IFwiMFwiKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKG5vZGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIC8vIGFkZCB0dXJuIGxpc3RlbmVyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG5cbiAgICAgIHR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28sIGNvb3JkKTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgYW5kIHJlbW92ZSBjbGljayBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuXG4gICAgICBjZWxsLm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscywgcGxheWVyLCBwbGFjaW5nID0gZmFsc2UpID0+IHtcbiAgaWYgKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgcmVzZXRHcmlkKGNlbGxzKTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBmbGVldEFyciA9IGZsZWV0LnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmKGNoZWNrVGllcihjZWxsKSl7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShcbiAgICAgIGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIilcbiAgICApO1xuXG4gICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSAmJiBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIuKXj1wiO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmXG4gICAgICBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZClcbiAgICApIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICB9IGVsc2UgaWYgKHBsYXllci5jb21wdXRlcil7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNoZWNrRm9yQ29tcHV0ZXIocGxheWVyT25lLCBwbGF5ZXJUd28pIHx8IHBsYWNpbmdcbiAgICApIHtcbiAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4peLXCI7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9O1xuICB9KTtcbn07XG5cbmNvbnN0IHJlc2V0R3JpZCA9IChjZWxscykgPT4ge1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgY2VsbC50ZXh0Q29udGVudCA9IG51bGw7XG4gIH0pO1xufTtcblxuLy8gQ3JlYXRlcyBhbmQgYWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIHRoZSBwbGFjZW1lbnQgcGhhc2UuXG5leHBvcnQgY29uc3QgcGxhY2VtZW50UGhhc2UgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZW1lbnRcIik7XG4gIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmUtYnRuXCIpO1xuICBwbGFjZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5ncmlkLWNlbGwtJHtwbGF5ZXJOdW19YCk7XG4gIGNvbnN0IHNpemVBcnIgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBheGlzID0gXCJ5XCI7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGlmIChzaXplQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHRhcmdldENlbGxDb29yZGluYXRlID0gdGFyZ2V0Q2VsbC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIlxuICAgICAgKTtcbiAgICAgIGxldCBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHBsYXllck51bVxuICAgICAgKTtcblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgaWYgKCFob3ZlckNlbGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gY2hhbmdlIGF4aXNcbiAgICAgIGRvY3VtZW50Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgICBpZiAoaG92ZXJDZWxsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgICAgIGF4aXMgPSBcInhcIjtcbiAgICAgICAgfSBlbHNlIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgICAgIGF4aXMgPSBcInlcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICAgIHRhcmdldENlbGxDb29yZGluYXRlLFxuICAgICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBwbGF5ZXJOdW1cbiAgICAgICAgKTtcblxuICAgICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICAgIGlmIChob3ZlckNlbGwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICB0YXJnZXRDZWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBpZiAoaG92ZXJDZWxscy5pbmNsdWRlcyhudWxsKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VUIE9GIEJPVU5EUy5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZsZWV0QXJyID0gW107XG5cbiAgICAgICAgaWYgKCEocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgZmxlZXRBcnIgPSBwbGF5ZXIuYm9hcmRcbiAgICAgICAgICAgIC5mbGVldENvb3JkaW5hdGVzKClcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3ZlckNlbGxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgY2VsbENvb3JkID0gaG92ZXJDZWxsc1tpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcblxuICAgICAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxDb29yZCkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdmVyQ2VsbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBob3ZlckNlbGxzW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuICAgICAgICAgIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShhdHRyaWJ1dGUpO1xuICAgICAgICAgIGNvb3JkQXJyLnB1c2goY29vcmQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZEFycik7XG4gICAgICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuICAgICAgICAvLyByZXJlbmRlciBob3ZlcmNlbGxzIGZvciBob3ZlciB2aXN1YWxcbiAgICAgICAgcmVuZGVyR3JpZChjZWxscywgcGxheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoc2l6ZUFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vIHJldHVybnMgbm9kZSBsaXN0XG5jb25zdCBnZXRIb3ZlckNlbGxzID0gKHN0YXJ0LCBzaXplLCBheGlzLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgaG92ZXJDZWxscyA9IFtdO1xuICBjb25zdCBzdGFydEFyciA9IHN0YXJ0LnNwbGl0KFwiXCIpO1xuICBsZXQgeCA9IGdldFgoc3RhcnRBcnIpO1xuICB4ID0gcGFyc2VJbnQoeCk7XG4gIGxldCB5ID0gZ2V0WShzdGFydEFycik7XG4gIHkgPSBwYXJzZUludCh5KTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFggPSB4ICsgaSArIFwiLVwiICsgeTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFh9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWSA9IHggKyBcIi1cIiArICh5ICsgaSk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ncmlkLSR7cGxheWVyTnVtfSBbZGF0YS1jZWxsLWNvb3JkaW5hdGU9XCIke2NlbGxZfVwiXWBcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJDZWxscztcbn07XG5cbmNvbnN0IGdldFggPSAoYXJyKSA9PiB7XG4gIGxldCB4O1xuICBpZiAoIWlzTmFOKHBhcnNlSW50KGFyclsxXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoMCwgMik7XG4gICAgeCA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgeCA9IGFyclswXTtcbiAgfVxuICByZXR1cm4geDtcbn07XG5cbmNvbnN0IGdldFkgPSAoYXJyKSA9PiB7XG4gIGxldCB5O1xuICBpZiAoIWlzTmFOKHBhcnNlSW50KGFyclthcnIubGVuZ3RoIC0gMl0pKSkge1xuICAgIGNvbnN0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKGFyci5sZW5ndGggLSAyKTtcbiAgICB5ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcbiAgfVxuICByZXR1cm4geTtcbn07XG4iLCJleHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1kaXNwbGF5XCIpO1xuICBjb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWRpc3BsYXlcIik7XG4gIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWdyaWRcIik7XG4gIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG5cbiAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIGdyaWQxLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIGdyaWQyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcblxuICBpZiAoXG4gICAgZmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDAgJiZcbiAgICBzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDBcbiAgKSB7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH07XG5cbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9O1xufTtcbiIsImltcG9ydCB7IHNldHVwLCBnYW1lU3RhcnQsIHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyBwbGFjZW1lbnRQaGFzZSwgcmVuZGVyR3JpZCB9IGZyb20gXCIuL2dyaWRcIjtcbmltcG9ydCB7IGNvbXB1dGVyUGxhY2VtZW50IH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvY29tcHV0ZXJcIjtcblxuY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11bHRpcGxheWVyXCIpO1xuY29uc3QgbmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVzXCIpO1xuY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZW1lbnRcIik7XG5cbmNvbnN0IHNpbmdsZVBsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2luZ2xlLXBsYXllclwiKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHdvLXBsYXllclwiKTtcbmNvbnN0IHBsYXllclR3b0NvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tY29udFwiKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLW5hbWVcIik7XG5jb25zdCBwbGF5ZXJUd29OYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3by1uYW1lJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIik7XG5jb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb25lLWJ0blwiKTtcblxubGV0IGlzTXVsdGlwbGF5ZXIgPSBmYWxzZTtcblxuY29uc3QgaGlkZSA9IChlbCkgPT4ge1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59O1xuXG5jb25zdCBzaG93ID0gKGVsKSA9PiB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWU7XG4gIGxldCBwbGF5ZXJUd29OYW1lID0gcGxheWVyVHdvTmFtZUVsLnZhbHVlO1xuXG4gIGlmKCFpc011bHRpcGxheWVyKXtcbiAgICBwbGF5ZXJUd29OYW1lID0gJ2NvbXB1dGVyJztcbiAgfTtcblxuICByZXR1cm4gW3BsYXllck9uZU5hbWUsIHBsYXllclR3b05hbWVdO1xufTtcblxuY29uc3QgZG9uZVBsYWNlbWVudCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbC0xJyksZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwtMicpLHNlY29uZFBsYXllcik7XG5cbiAgY29uc3QgZmlyc3RGbGVldCA9IGZpcnN0UGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3Qgc2Vjb25kRmxlZXQgPSBzZWNvbmRQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuXG4gIGlmKGZpcnN0RmxlZXQubGVuZ3RoID09PSA1ICYmIHNlY29uZEZsZWV0Lmxlbmd0aCA9PT0gMCl7XG4gICAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtMVwiKTtcbiAgICBjb25zdCBncmlkQ2xvbmUxID0gZ3JpZDEuY2xvbmVOb2RlKHRydWUpO1xuICAgIGdyaWQxLnJlcGxhY2VXaXRoKGdyaWRDbG9uZTEpO1xuICAgIGlmIChzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICAgIGNvbXB1dGVyUGxhY2VtZW50KHNlY29uZFBsYXllciwgWzUsIDQsIDMsIDMsIDJdKTtcbiAgICAgIGhpZGUocGxhY2VtZW50KTtcbiAgICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxhY2VtZW50UGhhc2Uoc2Vjb25kUGxheWVyLCAyKTtcbiAgICB9O1xuICB9O1xuXG4gIGlmKGZpcnN0RmxlZXQubGVuZ3RoID09PSA1ICYmIHNlY29uZEZsZWV0Lmxlbmd0aCA9PT0gNSl7XG4gICAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtMlwiKTtcbiAgICBjb25zdCBncmlkQ2xvbmUyID0gZ3JpZDIuY2xvbmVOb2RlKHRydWUpO1xuICAgIGdyaWQyLnJlcGxhY2VXaXRoKGdyaWRDbG9uZTIpO1xuICAgIGhpZGUocGxhY2VtZW50KTtcbiAgICBnYW1lU3RhcnQoKTtcbiAgfTtcbn07XG5cbmNvbnN0IGdhbWVTZXRVcCA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZXMgPSBnZXROYW1lcygpO1xuICBjb25zdCBuYW1lT25lID0gcGxheWVyTmFtZXNbMF07XG4gIGNvbnN0IG5hbWVUd28gPSBwbGF5ZXJOYW1lc1sxXTtcblxuICBpZiAobmFtZU9uZSA9PT0gXCJcIiB8fCBuYW1lVHdvID09PSBcIlwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaGlkZShuYW1lcyk7XG5cbiAgc2V0dXAobmFtZU9uZSwgbmFtZVR3byk7XG4gIHBsYXllck9uZU5hbWVFbC52YWx1ZSA9IFwiXCI7XG4gIHBsYXllclR3b05hbWVFbC52YWx1ZSA9ICcnO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXJNZW51ID0gKGUpID0+IHtcbiAgaGlkZShwbGF5ZXJUd29Db250KTtcblxuICBpZihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk9PT0ndHdvLXBsYXllcicpe1xuICAgIHBsYXllclR3b0NvbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBpc011bHRpcGxheWVyID0gdHJ1ZTtcbiAgfTtcblxuICBoaWRlKG11bHRpcGxheWVyKTtcbiAgc2hvdyhuYW1lcyk7XG59O1xuXG4vLyBtZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuICBzaW5nbGVQbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLG11bHRpcGxheWVyTWVudSk7XG4gIHR3b1BsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbXVsdGlwbGF5ZXJNZW51KTtcblxuICAvLyBkbyB0aGlzIGZvciBib3RoIGlucHV0c1xuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWVTZXRVcCgpO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZ2FtZVNldFVwKCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgcGxheWVyT25lTmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBnYW1lU2V0VXAoKTtcbiAgICB9O1xuICB9KTtcblxuICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9uZVBsYWNlbWVudChwbGF5ZXJPbmUscGxheWVyVHdvKTtcbiAgfSk7XG59KSgpO1xuIiwiZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5jb25zdCB1cGRhdGVUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm4tMVwiKTtcbiAgY29uc3QgdHVybjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm4tMlwiKTtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9IFwiV0FJVElORy4uLlwiO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSBcIldBSVRJTkcuLi5cIjtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlU2hpcHMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBzaGlwczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLTFcIik7XG4gIGNvbnN0IHNoaXBzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtMlwiKTtcbiAgc2hpcHMxLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7Zmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuICBzaGlwczIudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xufTtcblxuY29uc3QgdXBkYXRlV2lucyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHdpbnMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5zLTFcIik7XG4gIGNvbnN0IHdpbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5zLTJcIik7XG4gIHdpbnMxLnRleHRDb250ZW50ID0gYFdpbnM6ICR7Zmlyc3RQbGF5ZXIuZ2V0V2lucygpfWA7XG4gIHdpbnMyLnRleHRDb250ZW50ID0gYFdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9jcmVhdGVTaGlwXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBzID0gW107XG4gIGNvbnN0IGF0dGFja3MgPSBbXTtcblxuICBjb25zdCBwbGFjZSA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGNvbnN0IG5ld1NoaXAgPSBjcmVhdGVTaGlwKGNvb3JkaW5hdGVzKTtcbiAgICBzaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIHJldHVybiBuZXdTaGlwO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYgKGF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBJbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXModGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIGlmIChzaGlwSW5kZXggPiAtMSkge1xuICAgICAgc2hpcHNbc2hpcEluZGV4XS5oaXQoKTtcbiAgICB9XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcHM7XG4gIH07XG5cbiAgY29uc3QgZmxlZXRDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZiAoc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCByZXNldEFycmF5ID0gKGFycikgPT4ge1xuICAgICAgY29uc3Qgc2l6ZSA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVzZXRBcnJheShzaGlwcyk7XG4gICAgcmVzZXRBcnJheShhdHRhY2tzKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFja3MsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTaGlwcyxcbiAgICBmbGVldENvb3JkaW5hdGVzLFxuICAgIGdldFNoaXBzUmVtYWluaW5nLFxuICAgIGlzRmxlZXRTdW5rLFxuICAgIHJlc2V0LFxuICB9O1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2NyZWF0ZUdhbWVib2FyZFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllck5hbWUsIGlzQ29tcCA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBjb21wdXRlciA9IGlzQ29tcDtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgY29uc3QgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcblxuICBjb25zdCBtYWtlQXR0YWNrID0gKGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzID0gbnVsbCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBjb29yZGluYXRlcztcblxuICAgIGlmIChjb21wdXRlcikge1xuICAgICAgdGFyZ2V0ID0gY29tcHV0ZXJBdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgICBjb25zb2xlLmxvZyhgY29tcHV0ZXIgYXR0YWNrcyAke3RhcmdldH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gYXR0YWNrcyAke3RhcmdldH1gKTtcbiAgICB9XG5cbiAgICBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2sodGFyZ2V0KTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlckF0dGFjayA9IChlbmVteUJvYXJkLCBnZW4gPSAxKSA9PiB7XG4gICAgY29uc3QgaGl0cyA9IFtdO1xuICAgIGNvbnN0IHNoaXBzID0gZW5lbXlCb2FyZC5nZXRTaGlwcygpO1xuICAgIGxldCB0YXJnZXQ7XG5cbiAgICBjb25zdCB0YXJnZXRBZGphY2VudCA9ICgpID0+IHtcbiAgICAgIC8vIHBvcHVsYXRlcyBoaXRzIGFycmF5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZW15Qm9hcmQuYXR0YWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBhdGsgPSBlbmVteUJvYXJkLmF0dGFja3NbaV07XG4gICAgICAgIGNvbnN0IGZsZWV0QXJyID0gZW5lbXlCb2FyZFxuICAgICAgICAgIC5mbGVldENvb3JkaW5hdGVzKClcbiAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICAgICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoYXRrKSAmJiAhaGl0cy5pbmNsdWRlcyhhdGspKSB7XG4gICAgICAgICAgaGl0cy5wdXNoKGF0ayk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGhpdHMgdGhhdCBhcmUgb24gc3VuayBzaGlwc1xuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXMoaGl0c1tpXSkpIHtcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKGhpdHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5jb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBoaXRzLmluZGV4T2YobGlzdFswXSk7XG4gICAgICAgICAgICBoaXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gcmV0dXJucyB2YWxpZCB0YXJnZXQgYWRqYWNlbnQgdG8gdGhlIGlucHV0IGNvb3JkaW5hdGVcbiAgICAgIGNvbnN0IGdldEFkamFjZW50ID0gKGlucHV0Q29vcmQpID0+IHtcbiAgICAgICAgY29uc3QgW2EsIC4uLnJlc3RdID0gaW5wdXRDb29yZDtcbiAgICAgICAgY29uc3QgY2hhciA9IGE7XG4gICAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHJlc3Quam9pbihcIlwiKSk7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgaWYgKGNvZGUgKyAxIDw9IDc0KSB7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgKyAxKSArIG51bTtcblxuICAgICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlIC0gMSA+PSA2NSkge1xuICAgICAgICAgIGNvbnN0IGNvb3JkID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlIC0gMSkgKyBudW07XG5cbiAgICAgICAgICBpZiAoIWVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobnVtICsgMSA8PSAxMCkge1xuICAgICAgICAgIGNvbnN0IGNvb3JkID0gY2hhciArIChudW0gKyAxKTtcblxuICAgICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gLSAxID49IDEpIHtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IGNoYXIgKyAobnVtIC0gMSk7XG5cbiAgICAgICAgICBpZiAoIWVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBhZGphY2VudCA9IGdldEFkamFjZW50KGhpdHNbaV0pO1xuXG4gICAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICAgIHRhcmdldCA9IGFkamFjZW50O1xuICAgICAgICAgIHJldHVybiBhZGphY2VudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0YXJnZXRBZGphY2VudCgpO1xuICAgIGlmIChoaXRzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgLy8gY29uc29sZS5sb2coYGFkamFjZW50IHRhcmdldCBmb3VuZCA9PiAke3RhcmdldH1gKTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdGVBdHRhY2sgPSAoKSA9PiB7XG4gICAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc0IC0gNjUgKyAxKSkgKyA2NTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcblxuICAgICAgLy8gcmVtYWtlcyBhdHRhY2sgaWYgdGFyZ2V0IGhhcyBhbHJlYWR5IGJlZW4gaGl0XG4gICAgICBpZiAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgICAgICBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgICAgICAgfSB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBnZW5lcmF0ZUF0dGFjaygpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICBjb25zdCB3b24gPSAoKSA9PiB7XG4gICAgd2lucyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGdldFdpbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHdpbnM7XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGNvbXB1dGVyLCBpc1R1cm4sIG1ha2VBdHRhY2ssIGdldE5hbWUsIHdvbiwgZ2V0V2lucyB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVBcnJheSkgPT4ge1xuICBjb25zdCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVBcnJheTtcbiAgY29uc3QgbGVuZ3RoID0gY29vcmRpbmF0ZUFycmF5Lmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuZ3RoID09PSBkYW1hZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldERhbWFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gZGFtYWdlO1xuICB9O1xuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBoaXQsIGlzU3VuaywgZ2V0RGFtYWdlIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNoZWNrV2luID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3BsYXllcjEgV0lOUycpO1xuICAgIGZpcnN0UGxheWVyLndvbigpO1xuICAgIHJldHVybiBcImZpcnN0XCI7XG4gIH0gZWxzZSBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdwbGF5ZXIyIFdJTlMnKTtcbiAgICBzZWNvbmRQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuIFwic2Vjb25kXCI7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBnYW1lU3RhcnQgfSBmcm9tIFwiLi9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxhY2VtZW50ID0gKHBsYXllciwgc2l6ZUFycikgPT4ge1xuICBjb25zdCBudW1iZXJPZlNoaXBzID0gc2l6ZUFyci5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlNoaXBzOyBpICs9IDEpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsIHNpemVBcnJbMF0pO1xuXG4gICAgY29uc3QgY3VycmVudEZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgICBsZXQgZmxlZXRBcnI7XG5cbiAgICBpZiAoY3VycmVudEZsZWV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZmxlZXRBcnIgPSBjdXJyZW50RmxlZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcbiAgICB9O1xuXG4gICAgd2hpbGUgKGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRzLCBmbGVldEFycikpIHtcbiAgICAgIC8vIGxldCBvbGQgPSBjb29yZHM7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllciwgc2l6ZUFyclswXSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgb2xkIGNvb3JkczogJHtvbGR9fCBuZXcgY29vcmRzOiAke2Nvb3Jkc31gKTtcbiAgICB9O1xuXG4gICAgLy8gY29uc29sZS5sb2coYGNvbXB1dGVyIHBsYWNlcyBzaGlwIGF0ICR7Y29vcmRzfWApO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZHMpO1xuICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgfTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsLTInKSxwbGF5ZXIpO1xuXG4gIGdhbWVTdGFydCgpO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDb29yZGluYXRlcyA9IChwbGF5ZXIsIHNpemUpID0+IHtcbiAgY29uc3QgYXhpcyA9IGdlbmVyYXRlQXhpcygpO1xuICBjb25zdCBzdGFydCA9IGdlbmVyYXRlU3RhcnQoKTtcbiAgY29uc3QgeCA9IHN0YXJ0WzBdO1xuICBjb25zdCB5ID0gc3RhcnRbMV07XG4gIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgLy8gaW5jcmVtZW50IGxldHRlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0geC5jaGFyQ29kZUF0KDApO1xuICAgICAgY29uc3QgY2VsbFggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgKyBpKSArIHk7XG4gICAgICBjb29yZEFyci5wdXNoKGNlbGxYKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgLy8gaW5jcmVtZW50IG51bWJlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWSA9IHggKyAoeSArIGkpO1xuICAgICAgY29vcmRBcnIucHVzaChjZWxsWSk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gY29vcmRBcnI7XG59O1xuXG4vLyByZXR1cm4gdHJ1ZSBpZiBjb29yZGluYXRlcyBhcmUgaW52YWxpZFxuY29uc3QgY2hlY2tDb29yZGluYXRlcyA9IChjb29yZGluYXRlcywgZmxlZXQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChmbGVldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKGZsZWV0LmluY2x1ZGVzKGNvb3JkaW5hdGVzW2ldKSkge1xuICAgICAgY29uc29sZS5sb2coXCJzaGlwIGNvbmZsaWN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBbbGV0dGVyLCAuLi5yZXN0XSA9IGNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCB4ID0gbGV0dGVyO1xuICBjb25zdCB5ID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcblxuICBpZiAoeC5jaGFyQ29kZUF0KDApICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gNzQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh5ICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gMTApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQXhpcyA9ICgpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgbGV0IGF4aXM7XG5cbiAgaWYgKG51bWJlciAlIDIgPT09IDApIHtcbiAgICBheGlzID0gXCJ4XCI7XG4gIH0gZWxzZSBpZiAobnVtYmVyICUgMiAhPT0gMCkge1xuICAgIGF4aXMgPSBcInlcIjtcbiAgfTtcblxuICByZXR1cm4gYXhpcztcbn07XG5cbmNvbnN0IGdlbmVyYXRlU3RhcnQgPSAoKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkpICsgNjU7XG4gIH07XG5cbiAgY29uc3QgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuXG4gIHJldHVybiBbbGV0dGVyLCBudW1iZXJdO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRm9yQ29tcHV0ZXIgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuY29tcHV0ZXIgfHwgc2Vjb25kUGxheWVyLmNvbXB1dGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzZXQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGlmICh3aW5uZXIgPT09IFwiZmlyc3RcIiAmJiBmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gXCJzZWNvbmRcIiAmJiBzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfVxuICAvLyBjb25zb2xlLmxvZygnR0FNRSBIQVMgQkVFTiBSRVNFVC4nKTtcblxuICBmaXJzdFBsYXllci5ib2FyZC5yZXNldCgpO1xuICBzZWNvbmRQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyRGlzcGxheSB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHtcbiAgZ3JpZEV2ZW50cyxcbiAgcmVuZGVyR3JpZCxcbiAgcGxhY2VtZW50UGhhc2UsXG59IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0XCI7XG5cbmV4cG9ydCBsZXQgcGxheWVyT25lLCBwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChuYW1lT25lLCBuYW1lVHdvKSA9PiB7XG4gIGlmICghcGxheWVyT25lIHx8ICFwbGF5ZXJUd28pIHtcbiAgICBsZXQgeCA9IGZhbHNlO1xuXG4gICAgaWYgKG5hbWVUd28gPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgeCA9IHRydWU7XG4gICAgfTtcblxuICAgIHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihuYW1lT25lKTtcbiAgICBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIobmFtZVR3bywgeCk7XG4gICAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJPbmUsIDEpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyVHdvLCAyKTtcbiAgfTtcblxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJPbmUsIDEpO1xufTtcblxuLy8gc2hvdWxkIGJlIGNhbGxlZCBhZnRlciBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBncmlkRXZlbnRzKCk7XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCkge1xuICAgIGZpcnN0VHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH07XG5cbiAgaGlnaGxpZ2h0KHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuICBpZiAocGxheWVyVHdvLmNvbXB1dGVyICYmIHBsYXllclR3by5pc1R1cm4pIHtcbiAgICBjb21wVHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH07XG59O1xuIiwiLy8gaW5wdXQgY2VsbCBlbGVtZW50IGRhdGEgYXR0cmlidXRlXG4vLyBvdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVsxXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsIDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgY29kZVZhbHVlIC0gMSk7XG5cbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGggLSAyXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aCAtIDIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgY29uc3QgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG5cbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL2NoZWNrV2luXCI7XG5pbXBvcnQgeyBnYW1lUmVzZXQgfSBmcm9tIFwiLi9nYW1lUmVzZXRcIjtcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyBjaGVja0ZvckNvbXB1dGVyIH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcblxuLy8gcmFuZG9tbHkgY2hvb3NlcyBhIHBsYXllciB0byBnbyBmaXJzdFxuZXhwb3J0IGNvbnN0IGZpcnN0VHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG5cbiAgaWYgKG51bWJlciAlIDIgPT09IDApIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIC8vIGNvbnNvbGUubG9nKGAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfSBlbHNlIGlmIChudW1iZXIgJSAyICE9PSAwKSB7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coYCR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX0gR09FUyBGSVJTVC5gKTtcbiAgfVxufTtcblxuLy8gY2hhbmdlcyBjdXJyZW50IHBsYXllclxuZXhwb3J0IGNvbnN0IGNoYW5nZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coYElUIElTIE5PVyAke3NlY29uZFBsYXllci5nZXROYW1lKCl9cyBUVVJOLmApO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICAvLyBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfVxufTtcblxuLy8gVm1ha2UgaW50byBzZXBlcmF0ZSBmdW5jdGlvbj9WXG4vLyBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuLy8gaGlnaGxpZ2h0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuLy8gcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4vLyByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4vLyB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcblxuZXhwb3J0IGNvbnN0IHR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgdGFyZ2V0KSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCwgdGFyZ2V0KTtcblxuICAgICAgaWYgKGNoZWNrV2luKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID09PSBcImZpcnN0XCIpIHtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBcImZpcnN0XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH07XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwic2Vjb25kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcblxuICBpZihjaGVja0ZvckNvbXB1dGVyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpKXtcbiAgICBjb21wVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfTtcbn07XG5cbi8vIHNob3VsZCBpIG1vdmUgYWxsIGNvbXB1dGVyIGZ1bmN0aW9ucyB0byB0aGUgY29tcHV0ZXIgbW9kdWxlP1xuZXhwb3J0IGNvbnN0IGNvbXBUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQpO1xuXG4gICAgaWYgKGNoZWNrV2luKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID09PSBcInNlY29uZFwiKSB7XG4gICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwic2Vjb25kXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICAgIGhpZ2hsaWdodChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gICAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH0sIDEwMDApO1xufTtcblxuY29uc3QgdHVybldvbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpID0+IHtcbiAgZ2FtZVJlc2V0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICBzZXR1cCgpO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIjtcbmltcG9ydCB7IG1lbnVFdmVudHMgfSBmcm9tIFwiLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdWx0aXBsYXllcicpO1xubXVsdGlwbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuLy8gY29uc3QgbmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hbWVzXCIpO1xuLy8gbmFtZXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuY29uc3QgcGxheWVyVHdvR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsIDEpO1xuY3JlYXRlR3JpZChwbGF5ZXJUd29HcmlkLCAyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==