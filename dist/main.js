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



// import { elements } from "../elements";

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
      // console.log(`computer attacks ${target}`);
    } else {
      // console.log(`${name} attacks ${target}`);
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
      // let old = coords;
      coords = generateCoordinates(player, sizeArr[0]);
      // console.log(`old coords: ${old}| new coords: ${coords}`);
    }

    // console.log(`computer places ship at ${coords}`);
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
  // console.log('GAME HAS BEEN RESET.');

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

// should be called after ships have been placed
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

// should i move all computer functions to the computer module?
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLGlFQUFVO0FBQ1osRUFBRSxpRUFBVTtBQUNaLEVBQUUsK0VBQWM7QUFDaEI7O0FBRUE7QUFDQTtBQUNBLEVBQUUsdURBQVc7QUFDYixFQUFFLGlFQUFVO0FBQ1osRUFBRSxpRUFBVTtBQUNaLEVBQUUsK0VBQWM7QUFDaEIsRUFBRSxpREFBSztBQUNQOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaURBQWlEO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDekhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnlEO0FBQ0w7O0FBRXBEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVJlc2V0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsIGdyaWROdW0pID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gaTtcbiAgICBjb25zdCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoXCJncmlkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiLCBgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9XG5cbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDE7XG5cbiAgICByb3dzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG5cbiAgICAgIGlmIChlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpID09PSBcIjAtMFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICBpZiAoY2VsbENvb3JkaW5hdGUgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZGlzcGxheVwiKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZChcImRpc3BsYXktY29udFwiKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0dXJuLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0dXJuLSR7cGxheWVyTnVtfWApO1xuXG4gIGlmIChwbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybi50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH1cblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHdpbnMuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSwgbmFtZSwgdHVybiwgc2hpcHMsIHdpbnMpO1xuXG4gIGlmIChwbGF5ZXJOdW0gPT09IDEpIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpIHtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpKTtcbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuLy8gc3RvcHMgcGxheWVycyBmcm9tIGludGVyYWN0aW5nIHdpdGggZ3JpZHMgd2hlbiB0aGV5IHNob3VsZG4ndCBiZVxuY29uc3QgZ3JpZExvZ2ljID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIGNlbGwpID0+IHtcbiAgbGV0IHg7XG5cbiAgLy8gc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4gJiYgZmlyc3RQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuICYmIHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHggPSB0cnVlO1xuICB9XG5cbiAgLy8gc3RvcHMgcGxheWVyIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCB0aGVpciBvd24gZ3JpZFxuICBpZiAocGxheWVyT25lLmlzVHVybiAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWQtY2VsbC0xXCIpKSB7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWQtY2VsbC0yXCIpKSB7XG4gICAgeCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4geDtcbn07XG5cbi8vIENoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT4ge1xuICBjb25zdCBjZWxsSUQgPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmIChcbiAgICBjb29yZGluYXRlWzBdID09PSBcIkBcIiB8fFxuICAgIChjb29yZGluYXRlLmxlbmd0aCA9PT0gMiAmJiBjb29yZGluYXRlWzFdID09PSBcIjBcIilcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKG5vZGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYWRkIHR1cm4gbGlzdGVuZXJcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgY29vcmQgPSBnZXRHcmlkQ29vcmRpbmF0ZShjZWxsKTtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0dXJuKHBsYXllck9uZSwgcGxheWVyVHdvLCBjb29yZCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgYW5kIHJlbW92ZSBjbGljayBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG5cbiAgICAgIGNlbGwub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKGNlbGxzLCBwbGF5ZXIsIHBsYWNpbmcgPSBmYWxzZSkgPT4ge1xuICBpZiAocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXNldEdyaWQoY2VsbHMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3QgZmxlZXRBcnIgPSBmbGVldC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKGNlbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKFxuICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKVxuICAgICk7XG5cbiAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4pePXCI7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFmbGVldEFyci5pbmNsdWRlcyhjb29yZCkgJiZcbiAgICAgIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKVxuICAgICkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLmNvbXB1dGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaGVja0ZvckNvbXB1dGVyKHBsYXllck9uZSwgcGxheWVyVHdvKSB8fCBwbGFjaW5nKSB7XG4gICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIuKXi1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0R3JpZCA9IChjZWxscykgPT4ge1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYWNlbWVudCBwaGFzZS5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudFwiKTtcbiAgY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9uZS1idG5cIik7XG4gIHBsYWNlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdyaWQtY2VsbC0ke3BsYXllck51bX1gKTtcbiAgY29uc3Qgc2l6ZUFyciA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgbGV0IGF4aXMgPSBcInlcIjtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgaWYgKHNpemVBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbENvb3JkaW5hdGUgPSB0YXJnZXRDZWxsLmdldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiXG4gICAgICApO1xuICAgICAgbGV0IGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgYXhpcyxcbiAgICAgICAgcGxheWVyTnVtXG4gICAgICApO1xuXG4gICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICBpZiAoIWhvdmVyQ2VsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRhcmdldENlbGwub25tb3VzZWxlYXZlID0gKGUpID0+IHtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBjaGFuZ2UgYXhpc1xuICAgICAgZG9jdW1lbnQub25jb250ZXh0bWVudSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICAgIGlmIChob3ZlckNlbGwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgICAgICAgYXhpcyA9IFwieFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICAgICAgYXhpcyA9IFwieVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgICAgaWYgKGhvdmVyQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHBsYWNlIHNoaXBcbiAgICAgIHRhcmdldENlbGwub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmIChob3ZlckNlbGxzLmluY2x1ZGVzKG51bGwpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJPVVQgT0YgQk9VTkRTLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmxlZXRBcnIgPSBbXTtcblxuICAgICAgICBpZiAoIShwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICBmbGVldEFyciA9IHBsYXllci5ib2FyZFxuICAgICAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdmVyQ2VsbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBjZWxsQ29vcmQgPSBob3ZlckNlbGxzW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbENvb3JkKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb29yZEFyciA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG92ZXJDZWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgY29vcmRBcnIucHVzaChjb29yZCk7XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2UoY29vcmRBcnIpO1xuICAgICAgICBzaXplQXJyLnNoaWZ0KCk7XG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICAgIHRhcmdldENlbGxDb29yZGluYXRlLFxuICAgICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBwbGF5ZXJOdW1cbiAgICAgICAgKTtcbiAgICAgICAgLy8gcmVyZW5kZXIgaG92ZXJjZWxscyBmb3IgaG92ZXIgdmlzdWFsXG4gICAgICAgIHJlbmRlckdyaWQoY2VsbHMsIHBsYXllciwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHNpemVBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vIHJldHVybnMgbm9kZSBsaXN0XG5jb25zdCBnZXRIb3ZlckNlbGxzID0gKHN0YXJ0LCBzaXplLCBheGlzLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgaG92ZXJDZWxscyA9IFtdO1xuICBjb25zdCBzdGFydEFyciA9IHN0YXJ0LnNwbGl0KFwiXCIpO1xuICBsZXQgeCA9IGdldFgoc3RhcnRBcnIpO1xuICB4ID0gcGFyc2VJbnQoeCk7XG4gIGxldCB5ID0gZ2V0WShzdGFydEFycik7XG4gIHkgPSBwYXJzZUludCh5KTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFggPSB4ICsgaSArIFwiLVwiICsgeTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFh9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWSA9IHggKyBcIi1cIiArICh5ICsgaSk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ncmlkLSR7cGxheWVyTnVtfSBbZGF0YS1jZWxsLWNvb3JkaW5hdGU9XCIke2NlbGxZfVwiXWBcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJDZWxscztcbn07XG5cbmNvbnN0IGdldFggPSAoYXJyKSA9PiB7XG4gIGxldCB4O1xuICBpZiAoIWlzTmFOKHBhcnNlSW50KGFyclsxXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoMCwgMik7XG4gICAgeCA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgeCA9IGFyclswXTtcbiAgfVxuICByZXR1cm4geDtcbn07XG5cbmNvbnN0IGdldFkgPSAoYXJyKSA9PiB7XG4gIGxldCB5O1xuICBpZiAoIWlzTmFOKHBhcnNlSW50KGFyclthcnIubGVuZ3RoIC0gMl0pKSkge1xuICAgIGNvbnN0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKGFyci5sZW5ndGggLSAyKTtcbiAgICB5ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcbiAgfVxuICByZXR1cm4geTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNldEdyaWRFdmVudHMgPSAoZ3JpZCkgPT4ge1xuICBjb25zdCBncmlkQ2xvbmUgPSBncmlkLmNsb25lTm9kZSh0cnVlKTtcbiAgZ3JpZC5yZXBsYWNlV2l0aChncmlkQ2xvbmUpO1xufTtcbiIsImV4cG9ydCBjb25zdCBoaWdobGlnaHQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWRpc3BsYXlcIik7XG4gIGNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZGlzcGxheVwiKTtcbiAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZ3JpZFwiKTtcblxuICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgZ3JpZDEuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgZ3JpZDIuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwcygpLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwcygpLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoXG4gICAgZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDAgJiZcbiAgICBzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5sZW5ndGggPT09IDBcbiAgKSB7XG4gICAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgICBncmlkMi5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICAgIGdyaWQxLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9XG59O1xuIiwiaW1wb3J0IHtcbiAgc2V0dXAsXG4gIGdhbWVTdGFydCxcbiAgcGxheWVyT25lLFxuICBwbGF5ZXJUd28sXG59IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgcGxhY2VtZW50UGhhc2UsIHJlbmRlckdyaWQsIHJlc2V0R3JpZEV2ZW50cyB9IGZyb20gXCIuL2dyaWRcIjtcbmltcG9ydCB7IGNvbXB1dGVyUGxhY2VtZW50IH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvY29tcHV0ZXJcIjtcbi8vIGltcG9ydCB7IGVsZW1lbnRzIH0gZnJvbSBcIi4uL2VsZW1lbnRzXCI7XG5cbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1idG5cIik7XG5yZXNldEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICBpZiAoIXBsYXllck9uZSAmJiAhcGxheWVyVHdvKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11bHRpcGxheWVyLW1lbnVcIik7XG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1tZW51XCIpO1xuY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZW1lbnQtbWVudVwiKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5nbGUtcGxheWVyLWJ0blwiKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHdvLXBsYXllci1idG5cIik7XG5jb25zdCBwbGF5ZXJUd29Db250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWNvbnRcIik7XG5cbmNvbnN0IHBsYXllck9uZU5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1uYW1lXCIpO1xuY29uc3QgcGxheWVyVHdvTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLW5hbWVcIik7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnRuXCIpO1xuY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9uZS1idG5cIik7XG5cbmxldCBpc011bHRpcGxheWVyID0gZmFsc2U7XG5cbmNvbnN0IGhpZGUgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxuY29uc3Qgc2hvdyA9IChlbCkgPT4ge1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWUudHJpbSgpO1xuICBsZXQgcGxheWVyVHdvTmFtZSA9IHBsYXllclR3b05hbWVFbC52YWx1ZS50cmltKCk7XG5cbiAgaWYgKCFpc011bHRpcGxheWVyKSB7XG4gICAgcGxheWVyVHdvTmFtZSA9IFwiY29tcHV0ZXJcIjtcbiAgfVxuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5jb25zdCBkb25lUGxhY2VtZW50ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcblxuICBjb25zdCBmaXJzdEZsZWV0ID0gZmlyc3RQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICBjb25zdCBzZWNvbmRGbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG5cbiAgaWYgKGZpcnN0RmxlZXQubGVuZ3RoID09PSA1ICYmIHNlY29uZEZsZWV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLTFcIik7XG4gICAgcmVzZXRHcmlkRXZlbnRzKGdyaWQxKTtcblxuICAgIGlmIChzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICAgIGNvbXB1dGVyUGxhY2VtZW50KHNlY29uZFBsYXllciwgWzUsIDQsIDMsIDMsIDJdKTtcbiAgICAgIGhpZGUocGxhY2VtZW50KTtcbiAgICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgICAgIGdhbWVTdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGFjZW1lbnRQaGFzZShzZWNvbmRQbGF5ZXIsIDIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaXJzdEZsZWV0Lmxlbmd0aCA9PT0gNSAmJiBzZWNvbmRGbGVldC5sZW5ndGggPT09IDUpIHtcbiAgICBjb25zdCBncmlkMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZC0yXCIpO1xuICAgIHJlc2V0R3JpZEV2ZW50cyhncmlkMik7XG4gICAgaGlkZShwbGFjZW1lbnQpO1xuICAgIGdhbWVTdGFydCgpO1xuICB9XG59O1xuXG5jb25zdCBnYW1lU2V0VXAgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgY29uc3QgbmFtZU9uZSA9IHBsYXllck5hbWVzWzBdO1xuICBjb25zdCBuYW1lVHdvID0gcGxheWVyTmFtZXNbMV07XG5cbiAgaWYgKG5hbWVPbmUgPT09IFwiXCIgfHwgbmFtZVR3byA9PT0gXCJcIikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGhpZGUobmFtZXMpO1xuICBzZXR1cChuYW1lT25lLCBuYW1lVHdvKTtcbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gXCJcIjtcbiAgcGxheWVyVHdvTmFtZUVsLnZhbHVlID0gXCJcIjtcbn07XG5cbmNvbnN0IG11bHRpcGxheWVyTWVudSA9IChlKSA9PiB7XG4gIGhpZGUocGxheWVyVHdvQ29udCk7XG5cbiAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInR3by1wbGF5ZXItYnRuXCIpIHtcbiAgICBwbGF5ZXJUd29Db250LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBpc011bHRpcGxheWVyID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGUobXVsdGlwbGF5ZXIpO1xuICBzaG93KG5hbWVzKTtcbn07XG5cbi8vIG1lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbXVsdGlwbGF5ZXJNZW51KTtcbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtdWx0aXBsYXllck1lbnUpO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZVNldFVwKCk7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBnYW1lU2V0VXAoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZ2FtZVNldFVwKCk7XG4gICAgfVxuICB9KTtcblxuICBwbGF5ZXJUd29OYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGdhbWVTZXRVcCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvbmVQbGFjZW1lbnQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9KTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgdXBkYXRlRGlzcGxheXMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICB1cGRhdGVUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVTaGlwcyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlV2lucyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0xXCIpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0yXCIpO1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSBcIkFUVEFDS0lORy4uLlwiO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9IFwiV0FJVElORy4uLlwiO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtMVwiKTtcbiAgY29uc3Qgc2hpcHMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy0yXCIpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG5jb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMVwiKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMlwiKTtcbiAgd2luczEudGV4dENvbnRlbnQgPSBgV2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YDtcbiAgd2luczIudGV4dENvbnRlbnQgPSBgV2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWA7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh0YXJnZXQpID0+IHtcbiAgICBpZiAoYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcEluZGV4ID0gc2hpcHMuZmluZEluZGV4KChzaGlwKSA9PiB7XG4gICAgICByZXR1cm4gc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyh0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNoaXBJbmRleCA+IC0xKSB7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH1cblxuICAgIGF0dGFja3MucHVzaCh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzUmVtYWluaW5nID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2hpcHMubGVuZ3RoIC0gc2hpcHNTdW5rO1xuICB9O1xuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4ge1xuICAgIGlmIChzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc2V0QXJyYXkgPSAoYXJyKSA9PiB7XG4gICAgICBjb25zdCBzaXplID0gYXJyLmxlbmd0aDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXNldEFycmF5KHNoaXBzKTtcbiAgICByZXNldEFycmF5KGF0dGFja3MpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrcyxcbiAgICBwbGFjZSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzLFxuICAgIGZsZWV0Q29vcmRpbmF0ZXMsXG4gICAgZ2V0U2hpcHNSZW1haW5pbmcsXG4gICAgaXNGbGVldFN1bmssXG4gICAgcmVzZXQsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vY3JlYXRlR2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBjb21wdXRlckF0dGFjayB9IGZyb20gXCIuLi9tb2R1bGVzL2NvbXB1dGVyXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyTmFtZSwgaXNDb21wID0gZmFsc2UpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBjb25zdCBpc1R1cm4gPSBmYWxzZTtcbiAgbGV0IHdpbnMgPSAwO1xuXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCwgY29vcmRpbmF0ZXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKGNvbXB1dGVyKSB7XG4gICAgICB0YXJnZXQgPSBjb21wdXRlckF0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3Qgd29uID0gKCkgPT4ge1xuICAgIHdpbnMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCB3b24sIGdldFdpbnMgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlQXJyYXkpID0+IHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQXJyYXk7XG4gIGNvbnN0IGxlbmd0aCA9IGNvb3JkaW5hdGVBcnJheS5sZW5ndGg7XG4gIGxldCBkYW1hZ2UgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBkYW1hZ2UgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gZGFtYWdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXREYW1hZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhbWFnZTtcbiAgfTtcblxuICByZXR1cm4geyBjb29yZGluYXRlcywgaGl0LCBpc1N1bmssIGdldERhbWFnZSB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjaGVja1dpbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdwbGF5ZXIxIFdJTlMnKTtcbiAgICBmaXJzdFBsYXllci53b24oKTtcbiAgICByZXR1cm4gXCJmaXJzdFwiO1xuICB9IGVsc2UgaWYgKGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncGxheWVyMiBXSU5TJyk7XG4gICAgc2Vjb25kUGxheWVyLndvbigpO1xuICAgIHJldHVybiBcInNlY29uZFwiO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSAocGxheWVyLCBzaXplQXJyKSA9PiB7XG4gIGNvbnN0IG51bWJlck9mU2hpcHMgPSBzaXplQXJyLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mU2hpcHM7IGkgKz0gMSkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllciwgc2l6ZUFyclswXSk7XG5cbiAgICBjb25zdCBjdXJyZW50RmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgIGxldCBmbGVldEFycjtcblxuICAgIGlmIChjdXJyZW50RmxlZXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICBmbGVldEFyciA9IGN1cnJlbnRGbGVldC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgIH1cblxuICAgIHdoaWxlIChjaGVja0Nvb3JkaW5hdGVzKGNvb3JkcywgZmxlZXRBcnIpKSB7XG4gICAgICAvLyBsZXQgb2xkID0gY29vcmRzO1xuICAgICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsIHNpemVBcnJbMF0pO1xuICAgICAgLy8gY29uc29sZS5sb2coYG9sZCBjb29yZHM6ICR7b2xkfXwgbmV3IGNvb3JkczogJHtjb29yZHN9YCk7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYGNvbXB1dGVyIHBsYWNlcyBzaGlwIGF0ICR7Y29vcmRzfWApO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZHMpO1xuICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgfVxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllcik7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKHBsYXllciwgc2l6ZSkgPT4ge1xuICBjb25zdCBheGlzID0gZ2VuZXJhdGVBeGlzKCk7XG4gIGNvbnN0IHN0YXJ0ID0gZ2VuZXJhdGVTdGFydCgpO1xuICBjb25zdCB4ID0gc3RhcnRbMF07XG4gIGNvbnN0IHkgPSBzdGFydFsxXTtcbiAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAvLyBpbmNyZW1lbnQgbGV0dGVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSB4LmNoYXJDb2RlQXQoMCk7XG4gICAgICBjb25zdCBjZWxsWCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIGkpICsgeTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIC8vIGluY3JlbWVudCBudW1iZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFkgPSB4ICsgKHkgKyBpKTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb29yZEFycjtcbn07XG5cbi8vIHJldHVybiB0cnVlIGlmIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXG5jb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzLCBmbGVldCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGZsZWV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoZmxlZXQuaW5jbHVkZXMoY29vcmRpbmF0ZXNbaV0pKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNoaXAgY29uZmxpY3RcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBbbGV0dGVyLCAuLi5yZXN0XSA9IGNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCB4ID0gbGV0dGVyO1xuICBjb25zdCB5ID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcblxuICBpZiAoeC5jaGFyQ29kZUF0KDApICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gNzQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh5ICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gMTApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVBeGlzID0gKCkgPT4ge1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICBsZXQgYXhpcztcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGF4aXMgPSBcInhcIjtcbiAgfSBlbHNlIGlmIChudW1iZXIgJSAyICE9PSAwKSB7XG4gICAgYXhpcyA9IFwieVwiO1xuICB9XG5cbiAgcmV0dXJuIGF4aXM7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICB9O1xuXG4gIGNvbnN0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICByZXR1cm4gW2xldHRlciwgbnVtYmVyXTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0ZvckNvbXB1dGVyID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmNvbXB1dGVyIHx8IHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKGVuZW15Qm9hcmQsIGdlbiA9IDEpID0+IHtcbiAgY29uc3QgaGl0cyA9IFtdO1xuICBjb25zdCBzaGlwcyA9IGVuZW15Qm9hcmQuZ2V0U2hpcHMoKTtcbiAgbGV0IHRhcmdldDtcblxuICBjb25zdCB0YXJnZXRBZGphY2VudCA9ICgpID0+IHtcbiAgICAvLyBwb3B1bGF0ZXMgaGl0cyBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBhdGsgPSBlbmVteUJvYXJkLmF0dGFja3NbaV07XG4gICAgICBjb25zdCBmbGVldEFyciA9IGVuZW15Qm9hcmRcbiAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGF0aykgJiYgIWhpdHMuaW5jbHVkZXMoYXRrKSkge1xuICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgaGl0cyB0aGF0IGFyZSBvbiBzdW5rIHNoaXBzXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGhpdHNbaV0pKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goaGl0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBoaXRzLmluZGV4T2YobGlzdFswXSk7XG4gICAgICAgICAgaGl0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcmV0dXJucyB2YWxpZCB0YXJnZXQgYWRqYWNlbnQgdG8gdGhlIGlucHV0IGNvb3JkaW5hdGVcbiAgICBjb25zdCBnZXRBZGphY2VudCA9IChpbnB1dENvb3JkKSA9PiB7XG4gICAgICBjb25zdCBbYSwgLi4ucmVzdF0gPSBpbnB1dENvb3JkO1xuICAgICAgY29uc3QgY2hhciA9IGE7XG4gICAgICBjb25zdCBudW0gPSBwYXJzZUludChyZXN0LmpvaW4oXCJcIikpO1xuICAgICAgY29uc3QgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgaWYgKGNvZGUgKyAxIDw9IDc0KSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgMSkgKyBudW07XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2RlIC0gMSA+PSA2NSkge1xuICAgICAgICBjb25zdCBjb29yZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSAtIDEpICsgbnVtO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobnVtICsgMSA8PSAxMCkge1xuICAgICAgICBjb25zdCBjb29yZCA9IGNoYXIgKyAobnVtICsgMSk7XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChudW0gLSAxID49IDEpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBjaGFyICsgKG51bSAtIDEpO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGFkamFjZW50ID0gZ2V0QWRqYWNlbnQoaGl0c1tpXSk7XG5cbiAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICB0YXJnZXQgPSBhZGphY2VudDtcbiAgICAgICAgcmV0dXJuIGFkamFjZW50O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0YXJnZXRBZGphY2VudCgpO1xuICBpZiAoaGl0cy5sZW5ndGggIT09IDApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhgYWRqYWNlbnQgdGFyZ2V0IGZvdW5kID0+ICR7dGFyZ2V0fWApO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkpICsgNjU7XG4gICAgfTtcblxuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgLy8gcmVtYWtlcyBhdHRhY2sgaWYgdGFyZ2V0IGhhcyBhbHJlYWR5IGJlZW4gaGl0XG4gICAgaWYgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgfSB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgIH1cbiAgfTtcblxuICBnZW5lcmF0ZUF0dGFjaygpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyByZXNldEdyaWRFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWVSZXN0YXJ0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBpZiAod2lubmVyID09PSBcImZpcnN0XCIgJiYgZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSBlbHNlIGlmICh3aW5uZXIgPT09IFwic2Vjb25kXCIgJiYgc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coJ0dBTUUgSEFTIEJFRU4gUkVTRVQuJyk7XG5cbiAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtMVwiKTtcbiAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWQtMlwiKTtcblxuICBmaXJzdFBsYXllci5ib2FyZC5yZXNldCgpO1xuICBzZWNvbmRQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgcmVzZXRHcmlkRXZlbnRzKGdyaWQxKTtcbiAgcmVzZXRHcmlkRXZlbnRzKGdyaWQyKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyRGlzcGxheSB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHtcbiAgZ3JpZEV2ZW50cyxcbiAgcmVuZGVyR3JpZCxcbiAgcGxhY2VtZW50UGhhc2UsXG59IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0XCI7XG5pbXBvcnQgeyB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcblxuZXhwb3J0IGxldCBwbGF5ZXJPbmUsIHBsYXllclR3bztcblxuZXhwb3J0IGNvbnN0IHNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgaWYgKCFwbGF5ZXJPbmUgfHwgIXBsYXllclR3bykge1xuICAgIGxldCB4ID0gZmFsc2U7XG5cbiAgICBpZiAobmFtZVR3byA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICB4ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gICAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28sIHgpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLCAxKTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywgMik7XG4gIH1cblxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJPbmUsIDEpO1xufTtcblxuLy8gc2hvdWxkIGJlIGNhbGxlZCBhZnRlciBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBncmlkRXZlbnRzKCk7XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCkge1xuICAgIGZpcnN0VHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5cyhwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllclR3by5jb21wdXRlciAmJiBwbGF5ZXJUd28uaXNUdXJuKSB7XG4gICAgY29tcFR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9XG59O1xuIiwiLy8gaW5wdXQgY2VsbCBlbGVtZW50IGRhdGEgYXR0cmlidXRlXG4vLyBvdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVsxXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsIDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgY29kZVZhbHVlIC0gMSk7XG5cbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGggLSAyXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aCAtIDIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgY29uc3QgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG5cbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL2NoZWNrV2luXCI7XG5pbXBvcnQgeyBnYW1lUmVzdGFydCB9IGZyb20gXCIuL2dhbWVSZXNldFwiO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tIFwiLi9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuXG4vLyByYW5kb21seSBjaG9vc2VzIGEgcGxheWVyIHRvIGdvIGZpcnN0XG5leHBvcnQgY29uc3QgZmlyc3RUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgLy8gY29uc29sZS5sb2coYCR7Zmlyc3RQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9IGVsc2UgaWYgKG51bWJlciAlIDIgIT09IDApIHtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAvLyBjb25zb2xlLmxvZyhgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfSBHT0VTIEZJUlNULmApO1xuICB9XG59O1xuXG4vLyBjaGFuZ2VzIGN1cnJlbnQgcGxheWVyXG5leHBvcnQgY29uc3QgY2hhbmdlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAvLyBjb25zb2xlLmxvZyhgSVQgSVMgTk9XICR7c2Vjb25kUGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIC8vIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtmaXJzdFBsYXllci5nZXROYW1lKCl9cyBUVVJOLmApO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB0YXJnZXQpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0UGxheWVyLm1ha2VBdHRhY2soc2Vjb25kUGxheWVyLmJvYXJkLCB0YXJnZXQpO1xuXG4gICAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwiZmlyc3RcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwiZmlyc3RcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwic2Vjb25kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGxvZyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdHVyblJlZ3VsYXIoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG5cbiAgaWYgKGNoZWNrRm9yQ29tcHV0ZXIoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikpIHtcbiAgICBjb21wVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfVxufTtcblxuLy8gc2hvdWxkIGkgbW92ZSBhbGwgY29tcHV0ZXIgZnVuY3Rpb25zIHRvIHRoZSBjb21wdXRlciBtb2R1bGU/XG5leHBvcnQgY29uc3QgY29tcFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCk7XG5cbiAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IFwic2Vjb25kXCIpIHtcbiAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJzZWNvbmRcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvZyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgICB0dXJuUmVndWxhcihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCB0dXJuUmVndWxhciA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIGhpZ2hsaWdodChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5jb25zdCB0dXJuV29uID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBsb2coZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIGdhbWVSZXN0YXJ0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICBzZXR1cCgpO1xufTtcblxuY29uc3QgbG9nID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgbGV0IHggPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkgKz0gMSkge1xuICAgIGlmICh4ID09PSAwKSB7XG4gICAgICBjb25zdCBmbGVldCA9IGZpcnN0UGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIDFcIik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpcnN0UGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zb2xlLmxvZyhmbGVldFtpXSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpKTtcbiAgICAgIHggKz0gMTtcbiAgICB9IGVsc2UgaWYgKHggPT09IDEpIHtcbiAgICAgIGNvbnN0IGZsZWV0ID0gc2Vjb25kUGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicGxheWVyIDJcIik7XG4gICAgICBmb3IgKFxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGkgPCBzZWNvbmRQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aDtcbiAgICAgICAgaSArPSAxXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coZmxlZXRbaV0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCkpO1xuICAgIH1cbiAgfVxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gXCIuL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWRcIjtcbmltcG9ydCB7IG1lbnVFdmVudHMgfSBmcm9tIFwiLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVsdGlwbGF5ZXItbWVudVwiKTtcbm11bHRpcGxheWVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZ3JpZFwiKTtcblxuY3JlYXRlR3JpZChwbGF5ZXJPbmVHcmlkLCAxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwgMik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=