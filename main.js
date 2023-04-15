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
    let i = 1;

    rows.forEach((e) => {
      nodeList.push(e.firstChild);
    });

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
const playerOneDisplay = document.getElementById("player-one-display");
const playerTwoDisplay = document.getElementById("player-two-display");

const createPlayerDisplay = (player, playerNum) => {
  const display = document.createElement("div");
  display.classList.add("display-cont");

  const playerNumDisplay = document.createElement("h1");
  playerNumDisplay.textContent = `PLAYER ${playerNum}`;

  const name = document.createElement("h3");
  name.textContent = `${player.getName()}`;

  const turn = document.createElement("p");
  turn.setAttribute("id", `turn-${playerNum}`);

  if (player.isTurn) {
    turn.textContent = "ATTACKING...";
  } else if (!player.isTurn) {
    turn.textContent = "WAITING...";
  }

  const ships = document.createElement("p");
  ships.setAttribute("id", `ships-${playerNum}`);
  ships.textContent = `Ships left: ${player.board.getShipsRemaining()}`;

  const wins = document.createElement("p");
  wins.setAttribute("id", `wins-${playerNum}`);
  wins.textContent = `Wins: ${player.getWins()}`;

  display.append(playerNumDisplay, name, turn, ships, wins);

  if (playerNum === 1) {
    playerOneDisplay.append(display);
  } else if (playerNum === 2) {
    playerTwoDisplay.append(display);
  }
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
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid),
/* harmony export */   "resetGrid": () => (/* binding */ resetGrid),
/* harmony export */   "resetGridEvents": () => (/* binding */ resetGridEvents)
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
  }

  // stops player from interacting with their own grid
  if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn && cell.classList.contains("grid-cell-1")) {
    x = true;
  } else if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn && cell.classList.contains("grid-cell-2")) {
    x = true;
  }

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
  }
};

const gridEvents = () => {
  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach((node) => {
    if (checkTier(node)) {
      return;
    }

    // add turn listener
    node.addEventListener("click", (e) => {
      const cell = e.target;
      const coord = getGridCoordinate(cell);

      if (gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
        return;
      }

      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, coord);
    });

    // add hover cell visual
    node.addEventListener("mouseover", (e) => {
      const cell = e.target;

      if (gridLogic(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
        return;
      }

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
      }

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
  }

  const fleet = player.board.fleetCoordinates();
  const fleetArr = fleet.reduce((acc, val) => acc.concat(val));

  cells.forEach((cell) => {
    if (checkTier(cell)) {
      return;
    }

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
    } else if (player.computer) {
      return;
    } else if ((0,_modules_computer__WEBPACK_IMPORTED_MODULE_3__.checkForComputer)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo) || placing) {
      if (fleetArr.includes(coord)) {
        cell.textContent = "○";
      }
    } else {
      cell.textContent = "";
    }
  });
};

const resetGrid = (cells) => {
  cells.forEach((cell) => {
    if (checkTier(cell)) {
      return;
    }
    cell.textContent = null;
  });
};

// Creates and adds event listeners for the placement phase.
const placementPhase = (player, playerNum) => {
  const placement = document.getElementById("placement-menu");
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
        }

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
        }
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

const resetGridEvents = (grid) => {
  const gridClone = grid.cloneNode(true);
  grid.replaceWith(gridClone);
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
  }

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
  }

  if (firstPlayer.isTurn) {
    playerTwoDisplay.classList.add("waiting-player");
    grid2.classList.add("waiting-player");
  } else if (secondPlayer.isTurn) {
    playerOneDisplay.classList.add("waiting-player");
    grid1.classList.add("waiting-player");
  }
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




const resetBtn = document.getElementById("reset-btn");
resetBtn.onclick = () => {
  if (!_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerOne && !_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo) {
    return;
  }

  window.location.reload();
};

const multiplayer = document.getElementById("multiplayer-menu");
const names = document.getElementById("name-menu");
const placement = document.getElementById("placement-menu");

const singlePlayerBtn = document.getElementById("single-player-btn");
const twoPlayerBtn = document.getElementById("two-player-btn");
const playerTwoCont = document.getElementById("player-two-cont");

const playerOneNameEl = document.getElementById("player-one-name");
const playerTwoNameEl = document.getElementById("player-two-name");
const startBtn = document.getElementById("start-btn");
const doneBtn = document.getElementById("done-btn");

let isMultiplayer = false;

const hide = (el) => {
  el.style.display = "none";
};

const show = (el) => {
  el.style.display = "block";
};

const getNames = () => {
  const playerOneName = playerOneNameEl.value.trim();
  let playerTwoName = playerTwoNameEl.value.trim();

  if (!isMultiplayer) {
    playerTwoName = "computer";
  }

  return [playerOneName, playerTwoName];
};

const donePlacement = (firstPlayer, secondPlayer) => {
  (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);

  const firstFleet = firstPlayer.board.fleetCoordinates();
  const secondFleet = secondPlayer.board.fleetCoordinates();

  if (firstFleet.length === 5 && secondFleet.length === 0) {
    const grid1 = document.querySelector(".grid-1");
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.resetGridEvents)(grid1);

    if (secondPlayer.computer) {
      (0,_modules_computer__WEBPACK_IMPORTED_MODULE_2__.computerPlacement)(secondPlayer, [5, 4, 3, 3, 2]);
      hide(placement);
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
      (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
    } else {
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(secondPlayer, 2);
    }
  }

  if (firstFleet.length === 5 && secondFleet.length === 5) {
    const grid2 = document.querySelector(".grid-2");
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.resetGridEvents)(grid2);
    hide(placement);
    (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
  }
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
  playerTwoNameEl.value = "";
};

const multiplayerMenu = (e) => {
  hide(playerTwoCont);

  if (e.target.getAttribute("id") === "two-player-btn") {
    playerTwoCont.style.display = "flex";
    isMultiplayer = true;
  }

  hide(multiplayer);
  show(names);
};

// menu interaction events
const menuEvents = (() => {
  singlePlayerBtn.addEventListener("click", multiplayerMenu);
  twoPlayerBtn.addEventListener("click", multiplayerMenu);

  startBtn.addEventListener("click", () => {
    gameSetUp();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    }
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    }
  });

  playerTwoNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      gameSetUp();
    }
  });

  doneBtn.addEventListener("click", () => {
    donePlacement(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo);
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
/* harmony import */ var _modules_computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/computer */ "./src/modules/computer.js");



const createPlayer = (playerName, isComp = false) => {
  const name = playerName;
  const computer = isComp;
  const board = (0,_createGameboard__WEBPACK_IMPORTED_MODULE_0__.createGameboard)();
  const isTurn = false;
  let wins = 0;

  const makeAttack = (enemyBoard, coordinates = null) => {
    let target = coordinates;

    if (computer) {
      target = (0,_modules_computer__WEBPACK_IMPORTED_MODULE_1__.computerAttack)(enemyBoard);
    }

    enemyBoard.receiveAttack(target);
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
    firstPlayer.won();
    return "first";
  } else if (firstPlayer.board.isFleetSunk()) {
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
/* harmony export */   "computerAttack": () => (/* binding */ computerAttack),
/* harmony export */   "computerPlacement": () => (/* binding */ computerPlacement)
/* harmony export */ });
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");


const computerPlacement = (player, sizeArr) => {
  const numberOfShips = sizeArr.length;

  for (let i = 0; i < numberOfShips; i += 1) {
    let coords = generateCoordinates(player, sizeArr[0]);
    const currentFleet = player.board.fleetCoordinates();
    let fleetArr;

    if (currentFleet.length !== 0) {
      fleetArr = currentFleet.reduce((acc, val) => acc.concat(val));
    }

    while (checkCoordinates(coords, fleetArr)) {
      coords = generateCoordinates(player, sizeArr[0]);
    }

    player.board.place(coords);
    sizeArr.shift();
  }

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_0__.renderGrid)(document.querySelectorAll(".grid-cell-2"), player);
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

const computerAttack = (enemyBoard, gen = 1) => {
  const hits = [];
  const ships = enemyBoard.getShips();
  let target;

  // checks if there are any targets adjacent to current hits
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
    return target;
  }

  // if there are no adjacent targets this generates a new target
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


/***/ }),

/***/ "./src/modules/gameReset.js":
/*!**********************************!*\
  !*** ./src/modules/gameReset.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameRestart": () => (/* binding */ gameRestart)
/* harmony export */ });
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");



const gameRestart = (firstPlayer, secondPlayer, winner) => {
  if (winner === "first" && firstPlayer.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_0__.changeTurn)(firstPlayer, secondPlayer);
  } else if (winner === "second" && secondPlayer.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_0__.changeTurn)(firstPlayer, secondPlayer);
  }

  const grid1 = document.querySelector(".grid-1");
  const grid2 = document.querySelector(".grid-2");

  firstPlayer.board.reset();
  secondPlayer.board.reset();
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.resetGridEvents)(grid1);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_1__.resetGridEvents)(grid2);
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
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");







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

const gameStart = () => {
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.gridEvents)();

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), playerTwo);

  if (playerOne.getWins() === 0 && playerTwo.getWins() === 0) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_3__.firstTurn)(playerOne, playerTwo);
  }

  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_5__.updateDisplays)(playerOne, playerTwo);
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_4__.highlight)(playerOne, playerTwo);

  if (playerTwo.computer && playerTwo.isTurn) {
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
// input cell data attribute/output attack coordinates
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
  } else if (number % 2 !== 0) {
    secondPlayer.isTurn = true;
  }
};

// changes current player
const changeTurn = (firstPlayer, secondPlayer) => {
  if (firstPlayer.isTurn) {
    firstPlayer.isTurn = false;
    secondPlayer.isTurn = true;
  } else if (secondPlayer.isTurn) {
    firstPlayer.isTurn = true;
    secondPlayer.isTurn = false;
  }
};

// lets the current player make an attack, then checks for a winner
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

  log(firstPlayer, secondPlayer);
  turnRegular(firstPlayer, secondPlayer);

  if ((0,_computer__WEBPACK_IMPORTED_MODULE_6__.checkForComputer)(firstPlayer, secondPlayer)) {
    compTurn(firstPlayer, secondPlayer);
  }
};

const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    secondPlayer.makeAttack(firstPlayer.board);

    if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === "second") {
      turnWon(firstPlayer, secondPlayer, "second");
      return;
    }

    log(firstPlayer, secondPlayer);
    turnRegular(firstPlayer, secondPlayer);
  }, 1000);
};

const turnRegular = (firstPlayer, secondPlayer) => {
  changeTurn(firstPlayer, secondPlayer);
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_0__.highlight)(firstPlayer, secondPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer, secondPlayer);
};

const turnWon = (firstPlayer, secondPlayer, winner) => {
  log(firstPlayer, secondPlayer);
  (0,_gameReset__WEBPACK_IMPORTED_MODULE_4__.gameRestart)(firstPlayer, secondPlayer, winner);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_1__.updateDisplays)(firstPlayer, secondPlayer);
  (0,_gameStart__WEBPACK_IMPORTED_MODULE_5__.setup)();
};

const log = (firstPlayer, secondPlayer) => {
  let x = 0;
  for (let i = 0; i < 2; i += 1) {
    if (x === 0) {
      const fleet = firstPlayer.board.fleetCoordinates();
      console.log("player 1");
      for (let i = 0; i < firstPlayer.board.fleetCoordinates().length; i += 1) {
        console.log(fleet[i]);
      }
      console.log(firstPlayer.board.getShipsRemaining());
      x += 1;
    } else if (x === 1) {
      const fleet = secondPlayer.board.fleetCoordinates();
      console.log("player 2");
      for (
        let i = 0;
        i < secondPlayer.board.fleetCoordinates().length;
        i += 1
      ) {
        console.log(fleet[i]);
      }
      console.log(secondPlayer.board.getShipsRemaining());
    }
  }
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



const multiplayer = document.getElementById("multiplayer-menu");
multiplayer.style.display = "block";

const playerOneGrid = document.getElementById("player-one-grid");
const playerTwoGrid = document.getElementById("player-two-grid");

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid, 1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid, 2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN2SEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDTDs7QUFFcEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNFQUFVO0FBQ1Ysc0VBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9ncmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vbWVudS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlR2FtZWJvYXJkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlUGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvY3JlYXRlU2hpcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jaGVja1dpbi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lUmVzZXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVN0YXJ0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdHVybi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNyZWF0ZUdyaWQgPSAoZ3JpZCwgZ3JpZE51bSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpICs9IDEpIHtcbiAgICBjb25zdCByb3cgPSBpO1xuICAgIGNvbnN0IGdyaWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdyaWRSb3cuY2xhc3NMaXN0LmFkZChcImdyaWQtcm93XCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChgZ3JpZC1jZWxsLSR7Z3JpZE51bX1gKTtcbiAgICAgIGdyaWRDZWxsLnNldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIsIGAke2l9LSR7cm93fWApO1xuICAgICAgZ3JpZENlbGwuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICAgIGdyaWRSb3cuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgIH1cblxuICAgIGdyaWQuYXBwZW5kQ2hpbGQoZ3JpZFJvdyk7XG4gIH1cblxuICBjb25zdCBsYWJlbFJvd3MgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBbXTtcbiAgICBjb25zdCByb3dzID0gZ3JpZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMTtcblxuICAgIHJvd3MuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgbm9kZUxpc3QucHVzaChlLmZpcnN0Q2hpbGQpO1xuICAgIH0pO1xuXG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcblxuICAgICAgaWYgKGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIikgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7aX1gO1xuICAgICAgaSArPSAxO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGxhYmVsQ29sdW1ucyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IGdyaWQuZmlyc3RDaGlsZC5jaGlsZE5vZGVzO1xuICAgIGxldCBpID0gMDtcblxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgICBjb25zdCBjZWxsQ29vcmRpbmF0ZSA9IGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG5cbiAgICAgIGlmIChjZWxsQ29vcmRpbmF0ZSA9PT0gXCIwLTBcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGUudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgaSl9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBsYWJlbFJvd3MoKTtcbiAgbGFiZWxDb2x1bW5zKCk7XG59O1xuIiwiY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1kaXNwbGF5XCIpO1xuY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1kaXNwbGF5XCIpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyRGlzcGxheSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiZGlzcGxheS1jb250XCIpO1xuXG4gIGNvbnN0IHBsYXllck51bURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHBsYXllck51bURpc3BsYXkudGV4dENvbnRlbnQgPSBgUExBWUVSICR7cGxheWVyTnVtfWA7XG5cbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgbmFtZS50ZXh0Q29udGVudCA9IGAke3BsYXllci5nZXROYW1lKCl9YDtcblxuICBjb25zdCB0dXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHR1cm4uc2V0QXR0cmlidXRlKFwiaWRcIiwgYHR1cm4tJHtwbGF5ZXJOdW19YCk7XG5cbiAgaWYgKHBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgfSBlbHNlIGlmICghcGxheWVyLmlzVHVybikge1xuICAgIHR1cm4udGV4dENvbnRlbnQgPSBcIldBSVRJTkcuLi5cIjtcbiAgfVxuXG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHNoaXBzLnNldEF0dHJpYnV0ZShcImlkXCIsIGBzaGlwcy0ke3BsYXllck51bX1gKTtcbiAgc2hpcHMudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtwbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuXG4gIGNvbnN0IHdpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgd2lucy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgd2lucy0ke3BsYXllck51bX1gKTtcbiAgd2lucy50ZXh0Q29udGVudCA9IGBXaW5zOiAke3BsYXllci5nZXRXaW5zKCl9YDtcblxuICBkaXNwbGF5LmFwcGVuZChwbGF5ZXJOdW1EaXNwbGF5LCBuYW1lLCB0dXJuLCBzaGlwcywgd2lucyk7XG5cbiAgaWYgKHBsYXllck51bSA9PT0gMSkge1xuICAgIHBsYXllck9uZURpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9IGVsc2UgaWYgKHBsYXllck51bSA9PT0gMikge1xuICAgIHBsYXllclR3b0Rpc3BsYXkuYXBwZW5kKGRpc3BsYXkpO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgcGFyc2VDZWxsQ29vcmRpbmF0ZSB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3BhcnNlQ2VsbENvb3JkaW5hdGVcIjtcbmltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyB0dXJuIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvdHVyblwiO1xuaW1wb3J0IHsgY2hlY2tGb3JDb21wdXRlciB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2NvbXB1dGVyXCI7XG5cbmNvbnN0IGdldEdyaWRDb29yZGluYXRlID0gKGNlbGwpID0+IHtcbiAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIikpO1xuICByZXR1cm4gY29vcmQ7XG59O1xuXG4vLyBzdG9wcyBwbGF5ZXJzIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCBncmlkcyB3aGVuIHRoZXkgc2hvdWxkbid0IGJlXG5jb25zdCBncmlkTG9naWMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgY2VsbCkgPT4ge1xuICBsZXQgeDtcblxuICAvLyBzdG9wcyBmdW5jdGlvbiBpZiBpdHMgY29tcHV0ZXJzIHR1cm5cbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybiAmJiBmaXJzdFBsYXllci5jb21wdXRlcikge1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4gJiYgc2Vjb25kUGxheWVyLmNvbXB1dGVyKSB7XG4gICAgeCA9IHRydWU7XG4gIH1cblxuICAvLyBzdG9wcyBwbGF5ZXIgZnJvbSBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIG93biBncmlkXG4gIGlmIChwbGF5ZXJPbmUuaXNUdXJuICYmIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3JpZC1jZWxsLTFcIikpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuICYmIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3JpZC1jZWxsLTJcIikpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB4O1xufTtcblxuLy8gQ2hlY2tzIGlmIHRoZSBjZWxsIGlzIGEgbGFiZWxcbmNvbnN0IGNoZWNrVGllciA9IChjZWxsKSA9PiB7XG4gIGNvbnN0IGNlbGxJRCA9IGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG4gIGNvbnN0IGNvb3JkaW5hdGUgPSBwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxJRCk7XG5cbiAgaWYgKFxuICAgIGNvb3JkaW5hdGVbMF0gPT09IFwiQFwiIHx8XG4gICAgKGNvb3JkaW5hdGUubGVuZ3RoID09PSAyICYmIGNvb3JkaW5hdGVbMV0gPT09IFwiMFwiKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdyaWRFdmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG5cbiAgY2VsbHMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIobm9kZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBhZGQgdHVybiBsaXN0ZW5lclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28sIGNvb3JkKTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBob3ZlciBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICB9KTtcblxuICAgIC8vIGFkZCBhbmQgcmVtb3ZlIGNsaWNrIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcblxuICAgICAgY2VsbC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG4gICAgICB9O1xuXG4gICAgICBjZWxsLm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckdyaWQgPSAoY2VsbHMsIHBsYXllciwgcGxhY2luZyA9IGZhbHNlKSA9PiB7XG4gIGlmIChwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJlc2V0R3JpZChjZWxscyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBmbGVldEFyciA9IGZsZWV0LnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoXG4gICAgICBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpXG4gICAgKTtcblxuICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhjb29yZCkgJiYgcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gXCLil49cIjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgIWZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSAmJlxuICAgICAgcGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpXG4gICAgKSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gXCIvXCI7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNoZWNrRm9yQ29tcHV0ZXIocGxheWVyT25lLCBwbGF5ZXJUd28pIHx8IHBsYWNpbmcpIHtcbiAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4peLXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzZXRHcmlkID0gKGNlbGxzKSA9PiB7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKGNlbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNlbGwudGV4dENvbnRlbnQgPSBudWxsO1xuICB9KTtcbn07XG5cbi8vIENyZWF0ZXMgYW5kIGFkZHMgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgcGxhY2VtZW50IHBoYXNlLlxuZXhwb3J0IGNvbnN0IHBsYWNlbWVudFBoYXNlID0gKHBsYXllciwgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IHBsYWNlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VtZW50LW1lbnVcIik7XG4gIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmUtYnRuXCIpO1xuICBwbGFjZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5ncmlkLWNlbGwtJHtwbGF5ZXJOdW19YCk7XG4gIGNvbnN0IHNpemVBcnIgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBheGlzID0gXCJ5XCI7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGlmIChzaXplQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHRhcmdldENlbGxDb29yZGluYXRlID0gdGFyZ2V0Q2VsbC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIlxuICAgICAgKTtcbiAgICAgIGxldCBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHBsYXllck51bVxuICAgICAgKTtcblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgaWYgKCFob3ZlckNlbGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gY2hhbmdlIGF4aXNcbiAgICAgIGRvY3VtZW50Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgICBpZiAoaG92ZXJDZWxsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgICAgIGF4aXMgPSBcInhcIjtcbiAgICAgICAgfSBlbHNlIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgICAgIGF4aXMgPSBcInlcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICAgIHRhcmdldENlbGxDb29yZGluYXRlLFxuICAgICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBwbGF5ZXJOdW1cbiAgICAgICAgKTtcblxuICAgICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICAgIGlmIChob3ZlckNlbGwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICB0YXJnZXRDZWxsLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBpZiAoaG92ZXJDZWxscy5pbmNsdWRlcyhudWxsKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiT1VUIE9GIEJPVU5EUy5cIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZsZWV0QXJyID0gW107XG5cbiAgICAgICAgaWYgKCEocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgZmxlZXRBcnIgPSBwbGF5ZXIuYm9hcmRcbiAgICAgICAgICAgIC5mbGVldENvb3JkaW5hdGVzKClcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3ZlckNlbGxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgY2VsbENvb3JkID0gaG92ZXJDZWxsc1tpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcblxuICAgICAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhwYXJzZUNlbGxDb29yZGluYXRlKGNlbGxDb29yZCkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdmVyQ2VsbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBob3ZlckNlbGxzW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuICAgICAgICAgIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShhdHRyaWJ1dGUpO1xuICAgICAgICAgIGNvb3JkQXJyLnB1c2goY29vcmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlKGNvb3JkQXJyKTtcbiAgICAgICAgc2l6ZUFyci5zaGlmdCgpO1xuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgICBzaXplQXJyWzBdLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgcGxheWVyTnVtXG4gICAgICAgICk7XG4gICAgICAgIC8vIHJlcmVuZGVyIGhvdmVyY2VsbHMgZm9yIGhvdmVyIHZpc3VhbFxuICAgICAgICByZW5kZXJHcmlkKGNlbGxzLCBwbGF5ZXIsIHRydWUpO1xuXG4gICAgICAgIGlmIChzaXplQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRvbmVCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vLyByZXR1cm5zIG5vZGUgbGlzdFxuY29uc3QgZ2V0SG92ZXJDZWxscyA9IChzdGFydCwgc2l6ZSwgYXhpcywgcGxheWVyTnVtKSA9PiB7XG4gIGNvbnN0IGhvdmVyQ2VsbHMgPSBbXTtcbiAgY29uc3Qgc3RhcnRBcnIgPSBzdGFydC5zcGxpdChcIlwiKTtcbiAgbGV0IHggPSBnZXRYKHN0YXJ0QXJyKTtcbiAgeCA9IHBhcnNlSW50KHgpO1xuICBsZXQgeSA9IGdldFkoc3RhcnRBcnIpO1xuICB5ID0gcGFyc2VJbnQoeSk7XG5cbiAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxYID0geCArIGkgKyBcIi1cIiArIHk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ncmlkLSR7cGxheWVyTnVtfSBbZGF0YS1jZWxsLWNvb3JkaW5hdGU9XCIke2NlbGxYfVwiXWBcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFkgPSB4ICsgXCItXCIgKyAoeSArIGkpO1xuICAgICAgaG92ZXJDZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWX1cIl1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhvdmVyQ2VsbHM7XG59O1xuXG5jb25zdCBnZXRYID0gKGFycikgPT4ge1xuICBsZXQgeDtcbiAgaWYgKCFpc05hTihwYXJzZUludChhcnJbMV0pKSkge1xuICAgIGNvbnN0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKDAsIDIpO1xuICAgIHggPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIHggPSBhcnJbMF07XG4gIH1cbiAgcmV0dXJuIHg7XG59O1xuXG5jb25zdCBnZXRZID0gKGFycikgPT4ge1xuICBsZXQgeTtcbiAgaWYgKCFpc05hTihwYXJzZUludChhcnJbYXJyLmxlbmd0aCAtIDJdKSkpIHtcbiAgICBjb25zdCB0d29EaWdpdCA9IGFyci5zbGljZShhcnIubGVuZ3RoIC0gMik7XG4gICAgeSA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgeSA9IGFyclthcnIubGVuZ3RoIC0gMV07XG4gIH1cbiAgcmV0dXJuIHk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzZXRHcmlkRXZlbnRzID0gKGdyaWQpID0+IHtcbiAgY29uc3QgZ3JpZENsb25lID0gZ3JpZC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGdyaWQucmVwbGFjZVdpdGgoZ3JpZENsb25lKTtcbn07XG4iLCJleHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1kaXNwbGF5XCIpO1xuICBjb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWRpc3BsYXlcIik7XG4gIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWdyaWRcIik7XG4gIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG5cbiAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIGdyaWQxLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIGdyaWQyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcblxuICBpZiAoXG4gICAgZmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDAgJiZcbiAgICBzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDBcbiAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKFxuICAgIGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwICYmXG4gICAgc2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwXG4gICkge1xuICAgIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDIuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgICBncmlkMS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICBncmlkMi5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIGdyaWQxLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgfVxufTtcbiIsImltcG9ydCB7XG4gIHNldHVwLFxuICBnYW1lU3RhcnQsXG4gIHBsYXllck9uZSxcbiAgcGxheWVyVHdvLFxufSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlLCByZW5kZXJHcmlkLCByZXNldEdyaWRFdmVudHMgfSBmcm9tIFwiLi9ncmlkXCI7XG5pbXBvcnQgeyBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2NvbXB1dGVyXCI7XG5cbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1idG5cIik7XG5yZXNldEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICBpZiAoIXBsYXllck9uZSAmJiAhcGxheWVyVHdvKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11bHRpcGxheWVyLW1lbnVcIik7XG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1tZW51XCIpO1xuY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZW1lbnQtbWVudVwiKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5nbGUtcGxheWVyLWJ0blwiKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHdvLXBsYXllci1idG5cIik7XG5jb25zdCBwbGF5ZXJUd29Db250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWNvbnRcIik7XG5cbmNvbnN0IHBsYXllck9uZU5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1uYW1lXCIpO1xuY29uc3QgcGxheWVyVHdvTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLW5hbWVcIik7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnRuXCIpO1xuY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9uZS1idG5cIik7XG5cbmxldCBpc011bHRpcGxheWVyID0gZmFsc2U7XG5cbmNvbnN0IGhpZGUgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxuY29uc3Qgc2hvdyA9IChlbCkgPT4ge1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWUudHJpbSgpO1xuICBsZXQgcGxheWVyVHdvTmFtZSA9IHBsYXllclR3b05hbWVFbC52YWx1ZS50cmltKCk7XG5cbiAgaWYgKCFpc011bHRpcGxheWVyKSB7XG4gICAgcGxheWVyVHdvTmFtZSA9IFwiY29tcHV0ZXJcIjtcbiAgfVxuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5jb25zdCBkb25lUGxhY2VtZW50ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcblxuICBjb25zdCBmaXJzdEZsZWV0ID0gZmlyc3RQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBzZWNvbmRGbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG5cbiAgaWYgKGZpcnN0RmxlZXQubGVuZ3RoID09PSA1ICYmIHNlY29uZEZsZWV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLTFcIik7XG4gICAgcmVzZXRHcmlkRXZlbnRzKGdyaWQxKTtcblxuICAgIGlmIChzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICAgIGNvbXB1dGVyUGxhY2VtZW50KHNlY29uZFBsYXllciwgWzUsIDQsIDMsIDMsIDJdKTtcbiAgICAgIGhpZGUocGxhY2VtZW50KTtcbiAgICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgICAgIGdhbWVTdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGFjZW1lbnRQaGFzZShzZWNvbmRQbGF5ZXIsIDIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaXJzdEZsZWV0Lmxlbmd0aCA9PT0gNSAmJiBzZWNvbmRGbGVldC5sZW5ndGggPT09IDUpIHtcbiAgICBjb25zdCBncmlkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC0yXCIpO1xuICAgIHJlc2V0R3JpZEV2ZW50cyhncmlkMik7XG4gICAgaGlkZShwbGFjZW1lbnQpO1xuICAgIGdhbWVTdGFydCgpO1xuICB9XG59O1xuXG5jb25zdCBnYW1lU2V0VXAgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgY29uc3QgbmFtZU9uZSA9IHBsYXllck5hbWVzWzBdO1xuICBjb25zdCBuYW1lVHdvID0gcGxheWVyTmFtZXNbMV07XG5cbiAgaWYgKG5hbWVPbmUgPT09IFwiXCIgfHwgbmFtZVR3byA9PT0gXCJcIikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGhpZGUobmFtZXMpO1xuICBzZXR1cChuYW1lT25lLCBuYW1lVHdvKTtcbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gXCJcIjtcbiAgcGxheWVyVHdvTmFtZUVsLnZhbHVlID0gXCJcIjtcbn07XG5cbmNvbnN0IG11bHRpcGxheWVyTWVudSA9IChlKSA9PiB7XG4gIGhpZGUocGxheWVyVHdvQ29udCk7XG5cbiAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInR3by1wbGF5ZXItYnRuXCIpIHtcbiAgICBwbGF5ZXJUd29Db250LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBpc011bHRpcGxheWVyID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGUobXVsdGlwbGF5ZXIpO1xuICBzaG93KG5hbWVzKTtcbn07XG5cbi8vIG1lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbXVsdGlwbGF5ZXJNZW51KTtcbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtdWx0aXBsYXllck1lbnUpO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZVNldFVwKCk7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBnYW1lU2V0VXAoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZ2FtZVNldFVwKCk7XG4gICAgfVxuICB9KTtcblxuICBwbGF5ZXJUd29OYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGdhbWVTZXRVcCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvbmVQbGFjZW1lbnQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9KTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgdXBkYXRlRGlzcGxheXMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICB1cGRhdGVUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVTaGlwcyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlV2lucyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0xXCIpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0yXCIpO1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSBcIkFUVEFDS0lORy4uLlwiO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9IFwiV0FJVElORy4uLlwiO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtMVwiKTtcbiAgY29uc3Qgc2hpcHMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy0yXCIpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG5jb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMVwiKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMlwiKTtcbiAgd2luczEudGV4dENvbnRlbnQgPSBgV2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YDtcbiAgd2luczIudGV4dENvbnRlbnQgPSBgV2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWA7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApID0+IHtcbiAgICAgIHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2hpcEluZGV4ID4gLTEpIHtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfVxuXG4gICAgYXR0YWNrcy5wdXNoKHRhcmdldCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzO1xuICB9O1xuXG4gIGNvbnN0IGZsZWV0Q29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYXJyLnB1c2goc2hpcHNbaV0uY29vcmRpbmF0ZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHNSZW1haW5pbmcgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBzaGlwc1N1bmsgKz0gMTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwcy5sZW5ndGggLSBzaGlwc1N1bms7XG4gIH07XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzZXRBcnJheSA9IChhcnIpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlc2V0QXJyYXkoc2hpcHMpO1xuICAgIHJlc2V0QXJyYXkoYXR0YWNrcyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2tzLFxuICAgIHBsYWNlLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0U2hpcHMsXG4gICAgZmxlZXRDb29yZGluYXRlcyxcbiAgICBnZXRTaGlwc1JlbWFpbmluZyxcbiAgICBpc0ZsZWV0U3VuayxcbiAgICByZXNldCxcbiAgfTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcbmltcG9ydCB7IGNvbXB1dGVyQXR0YWNrIH0gZnJvbSBcIi4uL21vZHVsZXMvY29tcHV0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLCBpc0NvbXAgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBuYW1lID0gcGxheWVyTmFtZTtcbiAgY29uc3QgY29tcHV0ZXIgPSBpc0NvbXA7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGlzVHVybiA9IGZhbHNlO1xuICBsZXQgd2lucyA9IDA7XG5cbiAgY29uc3QgbWFrZUF0dGFjayA9IChlbmVteUJvYXJkLCBjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoY29tcHV0ZXIpIHtcbiAgICAgIHRhcmdldCA9IGNvbXB1dGVyQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3Qgd29uID0gKCkgPT4ge1xuICAgIHdpbnMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCB3b24sIGdldFdpbnMgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlQXJyYXkpID0+IHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQXJyYXk7XG4gIGNvbnN0IGxlbmd0aCA9IGNvb3JkaW5hdGVBcnJheS5sZW5ndGg7XG4gIGxldCBkYW1hZ2UgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBkYW1hZ2UgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gZGFtYWdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXREYW1hZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhbWFnZTtcbiAgfTtcblxuICByZXR1cm4geyBjb29yZGluYXRlcywgaGl0LCBpc1N1bmssIGdldERhbWFnZSB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjaGVja1dpbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgIGZpcnN0UGxheWVyLndvbigpO1xuICAgIHJldHVybiBcImZpcnN0XCI7XG4gIH0gZWxzZSBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgIHNlY29uZFBsYXllci53b24oKTtcbiAgICByZXR1cm4gXCJzZWNvbmRcIjtcbiAgfVxufTtcbiIsImltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxhY2VtZW50ID0gKHBsYXllciwgc2l6ZUFycikgPT4ge1xuICBjb25zdCBudW1iZXJPZlNoaXBzID0gc2l6ZUFyci5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlNoaXBzOyBpICs9IDEpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsIHNpemVBcnJbMF0pO1xuICAgIGNvbnN0IGN1cnJlbnRGbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gICAgbGV0IGZsZWV0QXJyO1xuXG4gICAgaWYgKGN1cnJlbnRGbGVldC5sZW5ndGggIT09IDApIHtcbiAgICAgIGZsZWV0QXJyID0gY3VycmVudEZsZWV0LnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRzLCBmbGVldEFycikpIHtcbiAgICAgIGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMocGxheWVyLCBzaXplQXJyWzBdKTtcbiAgICB9XG5cbiAgICBwbGF5ZXIuYm9hcmQucGxhY2UoY29vcmRzKTtcbiAgICBzaXplQXJyLnNoaWZ0KCk7XG4gIH1cblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllcik7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKHBsYXllciwgc2l6ZSkgPT4ge1xuICBjb25zdCBheGlzID0gZ2VuZXJhdGVBeGlzKCk7XG4gIGNvbnN0IHN0YXJ0ID0gZ2VuZXJhdGVTdGFydCgpO1xuICBjb25zdCB4ID0gc3RhcnRbMF07XG4gIGNvbnN0IHkgPSBzdGFydFsxXTtcbiAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAvLyBpbmNyZW1lbnQgbGV0dGVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSB4LmNoYXJDb2RlQXQoMCk7XG4gICAgICBjb25zdCBjZWxsWCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIGkpICsgeTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIC8vIGluY3JlbWVudCBudW1iZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFkgPSB4ICsgKHkgKyBpKTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb29yZEFycjtcbn07XG5cbi8vIHJldHVybiB0cnVlIGlmIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXG5jb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzLCBmbGVldCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGZsZWV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoZmxlZXQuaW5jbHVkZXMoY29vcmRpbmF0ZXNbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBbbGV0dGVyLCAuLi5yZXN0XSA9IGNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCB4ID0gbGV0dGVyO1xuICBjb25zdCB5ID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcblxuICBpZiAoeC5jaGFyQ29kZUF0KDApICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gNzQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh5ICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gMTApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVBeGlzID0gKCkgPT4ge1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICBsZXQgYXhpcztcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGF4aXMgPSBcInhcIjtcbiAgfSBlbHNlIGlmIChudW1iZXIgJSAyICE9PSAwKSB7XG4gICAgYXhpcyA9IFwieVwiO1xuICB9XG5cbiAgcmV0dXJuIGF4aXM7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICB9O1xuXG4gIGNvbnN0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICByZXR1cm4gW2xldHRlciwgbnVtYmVyXTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0ZvckNvbXB1dGVyID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmNvbXB1dGVyIHx8IHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKGVuZW15Qm9hcmQsIGdlbiA9IDEpID0+IHtcbiAgY29uc3QgaGl0cyA9IFtdO1xuICBjb25zdCBzaGlwcyA9IGVuZW15Qm9hcmQuZ2V0U2hpcHMoKTtcbiAgbGV0IHRhcmdldDtcblxuICAvLyBjaGVja3MgaWYgdGhlcmUgYXJlIGFueSB0YXJnZXRzIGFkamFjZW50IHRvIGN1cnJlbnQgaGl0c1xuICBjb25zdCB0YXJnZXRBZGphY2VudCA9ICgpID0+IHtcbiAgICAvLyBwb3B1bGF0ZXMgaGl0cyBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBhdGsgPSBlbmVteUJvYXJkLmF0dGFja3NbaV07XG4gICAgICBjb25zdCBmbGVldEFyciA9IGVuZW15Qm9hcmRcbiAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGF0aykgJiYgIWhpdHMuaW5jbHVkZXMoYXRrKSkge1xuICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgaGl0cyB0aGF0IGFyZSBvbiBzdW5rIHNoaXBzXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGhpdHNbaV0pKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goaGl0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBoaXRzLmluZGV4T2YobGlzdFswXSk7XG4gICAgICAgICAgaGl0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcmV0dXJucyB2YWxpZCB0YXJnZXQgYWRqYWNlbnQgdG8gdGhlIGlucHV0IGNvb3JkaW5hdGVcbiAgICBjb25zdCBnZXRBZGphY2VudCA9IChpbnB1dENvb3JkKSA9PiB7XG4gICAgICBjb25zdCBbYSwgLi4ucmVzdF0gPSBpbnB1dENvb3JkO1xuICAgICAgY29uc3QgY2hhciA9IGE7XG4gICAgICBjb25zdCBudW0gPSBwYXJzZUludChyZXN0LmpvaW4oXCJcIikpO1xuICAgICAgY29uc3QgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgaWYgKGNvZGUgKyAxIDw9IDc0KSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgMSkgKyBudW07XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2RlIC0gMSA+PSA2NSkge1xuICAgICAgICBjb25zdCBjb29yZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSAtIDEpICsgbnVtO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobnVtICsgMSA8PSAxMCkge1xuICAgICAgICBjb25zdCBjb29yZCA9IGNoYXIgKyAobnVtICsgMSk7XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChudW0gLSAxID49IDEpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBjaGFyICsgKG51bSAtIDEpO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGFkamFjZW50ID0gZ2V0QWRqYWNlbnQoaGl0c1tpXSk7XG5cbiAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICB0YXJnZXQgPSBhZGphY2VudDtcbiAgICAgICAgcmV0dXJuIGFkamFjZW50O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0YXJnZXRBZGphY2VudCgpO1xuXG4gIGlmIChoaXRzLmxlbmd0aCAhPT0gMCkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvLyBpZiB0aGVyZSBhcmUgbm8gYWRqYWNlbnQgdGFyZ2V0cyB0aGlzIGdlbmVyYXRlcyBhIG5ldyB0YXJnZXRcbiAgY29uc3QgZ2VuZXJhdGVBdHRhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2VuZXJhdGVDaGFyQ29kZSA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICAgIH07XG5cbiAgICBsZXQgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcblxuICAgIC8vIHJlbWFrZXMgYXR0YWNrIGlmIHRhcmdldCBoYXMgYWxyZWFkeSBiZWVuIGhpdFxuICAgIGlmIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgZG8ge1xuICAgICAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgIHRhcmdldCA9IGxldHRlciArIG51bWJlcjtcbiAgICAgIH0gd2hpbGUgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKTtcbiAgICB9XG4gIH07XG5cbiAgZ2VuZXJhdGVBdHRhY2soKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCJpbXBvcnQgeyBjaGFuZ2VUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuaW1wb3J0IHsgcmVzZXRHcmlkRXZlbnRzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzdGFydCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpID0+IHtcbiAgaWYgKHdpbm5lciA9PT0gXCJmaXJzdFwiICYmIGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH0gZWxzZSBpZiAod2lubmVyID09PSBcInNlY29uZFwiICYmIHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9XG5cbiAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtMVwiKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtMlwiKTtcblxuICBmaXJzdFBsYXllci5ib2FyZC5yZXNldCgpO1xuICBzZWNvbmRQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgcmVzZXRHcmlkRXZlbnRzKGdyaWQxKTtcbiAgcmVzZXRHcmlkRXZlbnRzKGdyaWQyKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyRGlzcGxheSB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHtcbiAgZ3JpZEV2ZW50cyxcbiAgcmVuZGVyR3JpZCxcbiAgcGxhY2VtZW50UGhhc2UsXG59IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0XCI7XG5pbXBvcnQgeyB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcblxuZXhwb3J0IGxldCBwbGF5ZXJPbmUsIHBsYXllclR3bztcblxuZXhwb3J0IGNvbnN0IHNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgaWYgKCFwbGF5ZXJPbmUgfHwgIXBsYXllclR3bykge1xuICAgIGxldCB4ID0gZmFsc2U7XG5cbiAgICBpZiAobmFtZVR3byA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICB4ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gICAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28sIHgpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLCAxKTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywgMik7XG4gIH1cblxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJPbmUsIDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdhbWVTdGFydCA9ICgpID0+IHtcbiAgZ3JpZEV2ZW50cygpO1xuXG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgcGxheWVyT25lKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBwbGF5ZXJUd28pO1xuXG4gIGlmIChwbGF5ZXJPbmUuZ2V0V2lucygpID09PSAwICYmIHBsYXllclR3by5nZXRXaW5zKCkgPT09IDApIHtcbiAgICBmaXJzdFR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9XG5cbiAgdXBkYXRlRGlzcGxheXMocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gIGlmIChwbGF5ZXJUd28uY29tcHV0ZXIgJiYgcGxheWVyVHdvLmlzVHVybikge1xuICAgIGNvbXBUdXJuKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgfVxufTtcbiIsIi8vIGlucHV0IGNlbGwgZGF0YSBhdHRyaWJ1dGUvb3V0cHV0IGF0dGFjayBjb29yZGluYXRlc1xuZXhwb3J0IGNvbnN0IHBhcnNlQ2VsbENvb3JkaW5hdGUgPSAoYXR0cmlidXRlKSA9PiB7XG4gIGlmICh0eXBlb2YgYXR0cmlidXRlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXJyID0gYXR0cmlidXRlLnNwbGl0KFwiXCIpO1xuXG4gIGNvbnN0IGdldExldHRlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBsZXR0ZXJWYWx1ZTtcblxuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyYXlbMV0pKSkge1xuICAgICAgY29uc3QgdHdvRGlnaXQgPSBhcnJheS5zbGljZSgwLCAyKTtcbiAgICAgIGxldHRlclZhbHVlID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0dGVyVmFsdWUgPSBhcnJheVswXTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2RlVmFsdWUgPSBwYXJzZUludChsZXR0ZXJWYWx1ZSk7XG4gICAgY29uc3QgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGNvZGVWYWx1ZSAtIDEpO1xuXG4gICAgcmV0dXJuIGxldHRlcjtcbiAgfTtcblxuICBjb25zdCBnZXROdW1iZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbnVtYmVyO1xuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyYXlbYXJyYXkubGVuZ3RoIC0gMl0pKSkge1xuICAgICAgY29uc3QgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGggLSAyKTtcbiAgICAgIG51bWJlciA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3QgbGV0dGVyID0gZ2V0TGV0dGVyKGFycik7XG4gIGNvbnN0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuXG4gIHJldHVybiBsZXR0ZXIgKyBudW1iZXI7XG59O1xuIiwiaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHRcIjtcbmltcG9ydCB7IHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY2hlY2tXaW4gfSBmcm9tIFwiLi9jaGVja1dpblwiO1xuaW1wb3J0IHsgZ2FtZVJlc3RhcnQgfSBmcm9tIFwiLi9nYW1lUmVzZXRcIjtcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyBjaGVja0ZvckNvbXB1dGVyIH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcblxuLy8gcmFuZG9tbHkgY2hvb3NlcyBhIHBsYXllciB0byBnbyBmaXJzdFxuZXhwb3J0IGNvbnN0IGZpcnN0VHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG5cbiAgaWYgKG51bWJlciAlIDIgPT09IDApIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICB9IGVsc2UgaWYgKG51bWJlciAlIDIgIT09IDApIHtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgfVxufTtcblxuLy8gY2hhbmdlcyBjdXJyZW50IHBsYXllclxuZXhwb3J0IGNvbnN0IGNoYW5nZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICB9XG59O1xuXG4vLyBsZXRzIHRoZSBjdXJyZW50IHBsYXllciBtYWtlIGFuIGF0dGFjaywgdGhlbiBjaGVja3MgZm9yIGEgd2lubmVyXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkLCB0YXJnZXQpO1xuXG4gICAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwiZmlyc3RcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwiZmlyc3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwic2Vjb25kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB0dXJuUmVndWxhcihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcblxuICBpZiAoY2hlY2tGb3JDb21wdXRlcihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSkge1xuICAgIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29tcFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCk7XG5cbiAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwic2Vjb25kXCIpIHtcbiAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJzZWNvbmRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICAgIHR1cm5SZWd1bGFyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IHR1cm5SZWd1bGFyID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHR1cm5Xb24gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGxvZyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgZ2FtZVJlc3RhcnQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHNldHVwKCk7XG59O1xuXG5jb25zdCBsb2cgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBsZXQgeCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSArPSAxKSB7XG4gICAgaWYgKHggPT09IDApIHtcbiAgICAgIGNvbnN0IGZsZWV0ID0gZmlyc3RQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgMVwiKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3RQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGZsZWV0W2ldKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCkpO1xuICAgICAgeCArPSAxO1xuICAgIH0gZWxzZSBpZiAoeCA9PT0gMSkge1xuICAgICAgY29uc3QgZmxlZXQgPSBzZWNvbmRQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgMlwiKTtcbiAgICAgIGZvciAoXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgaSA8IHNlY29uZFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoO1xuICAgICAgICBpICs9IDFcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZyhmbGVldFtpXSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKSk7XG4gICAgfVxuICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuL0RPTS9pbnRlcmFjdGlvbi9tZW51XCI7XG5cbmNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtdWx0aXBsYXllci1tZW51XCIpO1xubXVsdGlwbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuY29uc3QgcGxheWVyVHdvR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsIDEpO1xuY3JlYXRlR3JpZChwbGF5ZXJUd29HcmlkLCAyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==