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
/* harmony export */   "createPlacementText": () => (/* binding */ createPlacementText),
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

const displays = document.querySelectorAll(".display");

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

const createPlacementText = (player) => {
  const placementText = document.getElementById("placement-text");
  const playerName = document.createElement("h3");
  playerName.classList.add("placement-player-name");
  playerName.textContent = player.getName();
  const text = document.createElement("p");
  text.textContent =
    "Place your ships by clicking on your gameboard. Right click to change the ships axis.";
  placementText.append(playerName, text);
};

const removePlacementText = () => {
  const placementText = document.getElementById("placement-text");
  placementText.innerHTML = "";
};

const donePlacement = (firstPlayer, secondPlayer) => {
  removePlacementText();
  (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);

  const firstFleet = firstPlayer.board.fleetCoordinates();
  const secondFleet = secondPlayer.board.fleetCoordinates();

  if (firstFleet.length === 5 && secondFleet.length === 0) {
    const grid1 = document.getElementById("player-one-grid");
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.resetGridEvents)(grid1);

    if (secondPlayer.computer) {
      (0,_modules_computer__WEBPACK_IMPORTED_MODULE_2__.computerPlacement)(secondPlayer, [5, 4, 3, 3, 2]);
      hide(placement);
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
      (0,_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
    } else {
      createPlacementText(secondPlayer);
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(secondPlayer, 2);
    }
  }

  if (firstFleet.length === 5 && secondFleet.length === 5) {
    const grid2 = document.getElementById("player-two-grid");
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

  displays.forEach((display) => {
    display.style.display = null;
  });

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

  const grid1 = document.getElementById("player-one-grid");
  const grid2 = document.getElementById("player-two-grid");
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
/* harmony import */ var _DOM_interaction_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DOM/interaction/menu */ "./src/DOM/interaction/menu.js");
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");
/* harmony import */ var _DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DOM/interaction/highlight */ "./src/DOM/interaction/highlight.js");
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");








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

  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_5__.highlight)(playerOne, playerTwo);
  (0,_DOM_interaction_menu__WEBPACK_IMPORTED_MODULE_3__.createPlacementText)(playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.placementPhase)(playerOne, 1);
};

const gameStart = () => {
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.gridEvents)();

  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), playerTwo);

  if (playerOne.getWins() === 0 && playerTwo.getWins() === 0) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_4__.firstTurn)(playerOne, playerTwo);
  }

  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_6__.updateDisplays)(playerOne, playerTwo);
  (0,_DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_5__.highlight)(playerOne, playerTwo);

  if (playerTwo.computer && playerTwo.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_4__.compTurn)(playerOne, playerTwo);
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



const displays = document.querySelectorAll(".display");
displays.forEach((x) => {
  x.style.display = "none";
});

const multiplayer = document.getElementById("multiplayer-menu");
multiplayer.style.display = "block";

const playerOneGrid = document.getElementById("player-one-grid");
const playerTwoGrid = document.getElementById("player-two-grid");

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid, 1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid, 2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFjO0FBQ2hCLEVBQUUsaURBQUs7QUFDUDs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlEQUFpRDtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055RDtBQUNMOztBQUVwRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZVJlc2V0LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVTdGFydC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsIGdyaWROdW0pID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gaTtcbiAgICBjb25zdCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoXCJncmlkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiLCBgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9XG5cbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDE7XG5cbiAgICByb3dzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG5cbiAgICAgIGlmIChlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpID09PSBcIjAtMFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICBpZiAoY2VsbENvb3JkaW5hdGUgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZGlzcGxheVwiKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZChcImRpc3BsYXktY29udFwiKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0dXJuLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0dXJuLSR7cGxheWVyTnVtfWApO1xuXG4gIGlmIChwbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybi50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH1cblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHdpbnMuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSwgbmFtZSwgdHVybiwgc2hpcHMsIHdpbnMpO1xuXG4gIGlmIChwbGF5ZXJOdW0gPT09IDEpIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpIHtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVTdGFydFwiO1xuaW1wb3J0IHsgdHVybiB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL3R1cm5cIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCBnZXRHcmlkQ29vcmRpbmF0ZSA9IChjZWxsKSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpKTtcbiAgcmV0dXJuIGNvb3JkO1xufTtcblxuLy8gc3RvcHMgcGxheWVycyBmcm9tIGludGVyYWN0aW5nIHdpdGggZ3JpZHMgd2hlbiB0aGV5IHNob3VsZG4ndCBiZVxuY29uc3QgZ3JpZExvZ2ljID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIGNlbGwpID0+IHtcbiAgbGV0IHg7XG5cbiAgLy8gc3RvcHMgZnVuY3Rpb24gaWYgaXRzIGNvbXB1dGVycyB0dXJuXG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4gJiYgZmlyc3RQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuICYmIHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHggPSB0cnVlO1xuICB9XG5cbiAgLy8gc3RvcHMgcGxheWVyIGZyb20gaW50ZXJhY3Rpbmcgd2l0aCB0aGVpciBvd24gZ3JpZFxuICBpZiAocGxheWVyT25lLmlzVHVybiAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWQtY2VsbC0xXCIpKSB7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmlzVHVybiAmJiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWQtY2VsbC0yXCIpKSB7XG4gICAgeCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4geDtcbn07XG5cbi8vIENoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT4ge1xuICBjb25zdCBjZWxsSUQgPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmIChcbiAgICBjb29yZGluYXRlWzBdID09PSBcIkBcIiB8fFxuICAgIChjb29yZGluYXRlLmxlbmd0aCA9PT0gMiAmJiBjb29yZGluYXRlWzFdID09PSBcIjBcIilcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBncmlkRXZlbnRzID0gKCkgPT4ge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuXG4gIGNlbGxzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKG5vZGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYWRkIHR1cm4gbGlzdGVuZXJcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgY29vcmQgPSBnZXRHcmlkQ29vcmRpbmF0ZShjZWxsKTtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0dXJuKHBsYXllck9uZSwgcGxheWVyVHdvLCBjb29yZCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgYW5kIHJlbW92ZSBjbGljayBjZWxsIHZpc3VhbFxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG5cbiAgICAgIGNlbGwub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5vbm1vdXNlbGVhdmUgPSAoKSA9PiB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKGNlbGxzLCBwbGF5ZXIsIHBsYWNpbmcgPSBmYWxzZSkgPT4ge1xuICBpZiAocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXNldEdyaWQoY2VsbHMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3QgZmxlZXRBcnIgPSBmbGVldC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKGNlbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKFxuICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKVxuICAgICk7XG5cbiAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4pePXCI7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFmbGVldEFyci5pbmNsdWRlcyhjb29yZCkgJiZcbiAgICAgIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKVxuICAgICkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgIH0gZWxzZSBpZiAocGxheWVyLmNvbXB1dGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaGVja0ZvckNvbXB1dGVyKHBsYXllck9uZSwgcGxheWVyVHdvKSB8fCBwbGFjaW5nKSB7XG4gICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIuKXi1wiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0R3JpZCA9IChjZWxscykgPT4ge1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYWNlbWVudCBwaGFzZS5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudC1tZW51XCIpO1xuICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb25lLWJ0blwiKTtcbiAgcGxhY2VtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIGRvbmVCdG4uc3R5bGUuZGlzcGxheSA9IG51bGw7XG5cbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZ3JpZC1jZWxsLSR7cGxheWVyTnVtfWApO1xuICBjb25zdCBzaXplQXJyID0gWzUsIDQsIDMsIDMsIDJdO1xuICBsZXQgYXhpcyA9IFwieVwiO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKGNlbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgICBpZiAoc2l6ZUFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXJnZXRDZWxsID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCB0YXJnZXRDZWxsQ29vcmRpbmF0ZSA9IHRhcmdldENlbGwuZ2V0QXR0cmlidXRlKFxuICAgICAgICBcImRhdGEtY2VsbC1jb29yZGluYXRlXCJcbiAgICAgICk7XG4gICAgICBsZXQgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgIHRhcmdldENlbGxDb29yZGluYXRlLFxuICAgICAgICBzaXplQXJyWzBdLFxuICAgICAgICBheGlzLFxuICAgICAgICBwbGF5ZXJOdW1cbiAgICAgICk7XG5cbiAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgIGlmICghaG92ZXJDZWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICB9KTtcblxuICAgICAgdGFyZ2V0Q2VsbC5vbm1vdXNlbGVhdmUgPSAoZSkgPT4ge1xuICAgICAgICBjZWxscy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgICAgYy5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGNoYW5nZSBheGlzXG4gICAgICBkb2N1bWVudC5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgICAgaWYgKGhvdmVyQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICBheGlzID0gXCJ4XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICBheGlzID0gXCJ5XCI7XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgICBzaXplQXJyWzBdLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgcGxheWVyTnVtXG4gICAgICAgICk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgICBpZiAoaG92ZXJDZWxsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gcGxhY2Ugc2hpcFxuICAgICAgdGFyZ2V0Q2VsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGhvdmVyQ2VsbHMuaW5jbHVkZXMobnVsbCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VVCBPRiBCT1VORFMuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmbGVldEFyciA9IFtdO1xuXG4gICAgICAgIGlmICghKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgIGZsZWV0QXJyID0gcGxheWVyLmJvYXJkXG4gICAgICAgICAgICAuZmxlZXRDb29yZGluYXRlcygpXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG92ZXJDZWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGNlbGxDb29yZCA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG5cbiAgICAgICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMocGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsQ29vcmQpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3ZlckNlbGxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gaG92ZXJDZWxsc1tpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoYXR0cmlidXRlKTtcbiAgICAgICAgICBjb29yZEFyci5wdXNoKGNvb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZEFycik7XG4gICAgICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuICAgICAgICAvLyByZXJlbmRlciBob3ZlcmNlbGxzIGZvciBob3ZlciB2aXN1YWxcbiAgICAgICAgcmVuZGVyR3JpZChjZWxscywgcGxheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoc2l6ZUFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gcmV0dXJucyBub2RlIGxpc3RcbmNvbnN0IGdldEhvdmVyQ2VsbHMgPSAoc3RhcnQsIHNpemUsIGF4aXMsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBob3ZlckNlbGxzID0gW107XG4gIGNvbnN0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoXCJcIik7XG4gIGxldCB4ID0gZ2V0WChzdGFydEFycik7XG4gIHggPSBwYXJzZUludCh4KTtcbiAgbGV0IHkgPSBnZXRZKHN0YXJ0QXJyKTtcbiAgeSA9IHBhcnNlSW50KHkpO1xuXG4gIGlmIChheGlzID09PSBcInhcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWCA9IHggKyBpICsgXCItXCIgKyB5O1xuICAgICAgaG92ZXJDZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWH1cIl1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxZID0geCArIFwiLVwiICsgKHkgKyBpKTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFl9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlckNlbGxzO1xufTtcblxuY29uc3QgZ2V0WCA9IChhcnIpID0+IHtcbiAgbGV0IHg7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyWzFdKSkpIHtcbiAgICBjb25zdCB0d29EaWdpdCA9IGFyci5zbGljZSgwLCAyKTtcbiAgICB4ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB4ID0gYXJyWzBdO1xuICB9XG4gIHJldHVybiB4O1xufTtcblxuY29uc3QgZ2V0WSA9IChhcnIpID0+IHtcbiAgbGV0IHk7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyW2Fyci5sZW5ndGggLSAyXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoYXJyLmxlbmd0aCAtIDIpO1xuICAgIHkgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIHkgPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiB5O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0R3JpZEV2ZW50cyA9IChncmlkKSA9PiB7XG4gIGNvbnN0IGdyaWRDbG9uZSA9IGdyaWQuY2xvbmVOb2RlKHRydWUpO1xuICBncmlkLnJlcGxhY2VXaXRoKGdyaWRDbG9uZSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1kaXNwbGF5XCIpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG4gIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBncmlkMS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBncmlkMi5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG5cbiAgaWYgKFxuICAgIGZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwICYmXG4gICAgc2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDIuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICBncmlkMS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIH1cbn07XG4iLCJpbXBvcnQge1xuICBzZXR1cCxcbiAgZ2FtZVN0YXJ0LFxuICBwbGF5ZXJPbmUsXG4gIHBsYXllclR3byxcbn0gZnJvbSBcIi4uLy4uL21vZHVsZXMvZ2FtZVN0YXJ0XCI7XG5pbXBvcnQgeyBwbGFjZW1lbnRQaGFzZSwgcmVuZGVyR3JpZCwgcmVzZXRHcmlkRXZlbnRzIH0gZnJvbSBcIi4vZ3JpZFwiO1xuaW1wb3J0IHsgY29tcHV0ZXJQbGFjZW1lbnQgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXQtYnRuXCIpO1xuXG5yZXNldEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICBpZiAoIXBsYXllck9uZSAmJiAhcGxheWVyVHdvKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm11bHRpcGxheWVyLW1lbnVcIik7XG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZS1tZW51XCIpO1xuY29uc3QgcGxhY2VtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZW1lbnQtbWVudVwiKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5nbGUtcGxheWVyLWJ0blwiKTtcbmNvbnN0IHR3b1BsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHdvLXBsYXllci1idG5cIik7XG5jb25zdCBwbGF5ZXJUd29Db250ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWNvbnRcIik7XG5cbmNvbnN0IHBsYXllck9uZU5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1uYW1lXCIpO1xuY29uc3QgcGxheWVyVHdvTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLW5hbWVcIik7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYnRuXCIpO1xuY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9uZS1idG5cIik7XG5cbmNvbnN0IGRpc3BsYXlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXNwbGF5XCIpO1xuXG5sZXQgaXNNdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKGVsKSA9PiB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cbmNvbnN0IHNob3cgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn07XG5cbmNvbnN0IGdldE5hbWVzID0gKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJPbmVOYW1lID0gcGxheWVyT25lTmFtZUVsLnZhbHVlLnRyaW0oKTtcbiAgbGV0IHBsYXllclR3b05hbWUgPSBwbGF5ZXJUd29OYW1lRWwudmFsdWUudHJpbSgpO1xuXG4gIGlmICghaXNNdWx0aXBsYXllcikge1xuICAgIHBsYXllclR3b05hbWUgPSBcImNvbXB1dGVyXCI7XG4gIH1cblxuICByZXR1cm4gW3BsYXllck9uZU5hbWUsIHBsYXllclR3b05hbWVdO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYWNlbWVudFRleHQgPSAocGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYWNlbWVudFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudC10ZXh0XCIpO1xuICBjb25zdCBwbGF5ZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBwbGF5ZXJOYW1lLmNsYXNzTGlzdC5hZGQoXCJwbGFjZW1lbnQtcGxheWVyLW5hbWVcIik7XG4gIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIuZ2V0TmFtZSgpO1xuICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHRleHQudGV4dENvbnRlbnQgPVxuICAgIFwiUGxhY2UgeW91ciBzaGlwcyBieSBjbGlja2luZyBvbiB5b3VyIGdhbWVib2FyZC4gUmlnaHQgY2xpY2sgdG8gY2hhbmdlIHRoZSBzaGlwcyBheGlzLlwiO1xuICBwbGFjZW1lbnRUZXh0LmFwcGVuZChwbGF5ZXJOYW1lLCB0ZXh0KTtcbn07XG5cbmNvbnN0IHJlbW92ZVBsYWNlbWVudFRleHQgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYWNlbWVudFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudC10ZXh0XCIpO1xuICBwbGFjZW1lbnRUZXh0LmlubmVySFRNTCA9IFwiXCI7XG59O1xuXG5jb25zdCBkb25lUGxhY2VtZW50ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgcmVtb3ZlUGxhY2VtZW50VGV4dCgpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuXG4gIGNvbnN0IGZpcnN0RmxlZXQgPSBmaXJzdFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IHNlY29uZEZsZWV0ID0gc2Vjb25kUGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcblxuICBpZiAoZmlyc3RGbGVldC5sZW5ndGggPT09IDUgJiYgc2Vjb25kRmxlZXQubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbiAgICByZXNldEdyaWRFdmVudHMoZ3JpZDEpO1xuXG4gICAgaWYgKHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgICAgY29tcHV0ZXJQbGFjZW1lbnQoc2Vjb25kUGxheWVyLCBbNSwgNCwgMywgMywgMl0pO1xuICAgICAgaGlkZShwbGFjZW1lbnQpO1xuICAgICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICAgICAgZ2FtZVN0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVBsYWNlbWVudFRleHQoc2Vjb25kUGxheWVyKTtcbiAgICAgIHBsYWNlbWVudFBoYXNlKHNlY29uZFBsYXllciwgMik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZpcnN0RmxlZXQubGVuZ3RoID09PSA1ICYmIHNlY29uZEZsZWV0Lmxlbmd0aCA9PT0gNSkge1xuICAgIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG4gICAgcmVzZXRHcmlkRXZlbnRzKGdyaWQyKTtcbiAgICBoaWRlKHBsYWNlbWVudCk7XG4gICAgZ2FtZVN0YXJ0KCk7XG4gIH1cbn07XG5cbmNvbnN0IGdhbWVTZXRVcCA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZXMgPSBnZXROYW1lcygpO1xuICBjb25zdCBuYW1lT25lID0gcGxheWVyTmFtZXNbMF07XG4gIGNvbnN0IG5hbWVUd28gPSBwbGF5ZXJOYW1lc1sxXTtcblxuICBpZiAobmFtZU9uZSA9PT0gXCJcIiB8fCBuYW1lVHdvID09PSBcIlwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGlzcGxheXMuZm9yRWFjaCgoZGlzcGxheSkgPT4ge1xuICAgIGRpc3BsYXkuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gIH0pO1xuXG4gIGhpZGUobmFtZXMpO1xuXG4gIHNldHVwKG5hbWVPbmUsIG5hbWVUd28pO1xuICBwbGF5ZXJPbmVOYW1lRWwudmFsdWUgPSBcIlwiO1xuICBwbGF5ZXJUd29OYW1lRWwudmFsdWUgPSBcIlwiO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXJNZW51ID0gKGUpID0+IHtcbiAgaGlkZShwbGF5ZXJUd29Db250KTtcblxuICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IFwidHdvLXBsYXllci1idG5cIikge1xuICAgIHBsYXllclR3b0NvbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGlzTXVsdGlwbGF5ZXIgPSB0cnVlO1xuICB9XG5cbiAgaGlkZShtdWx0aXBsYXllcik7XG4gIHNob3cobmFtZXMpO1xufTtcblxuLy8gbWVudSBpbnRlcmFjdGlvbiBldmVudHNcbmV4cG9ydCBjb25zdCBtZW51RXZlbnRzID0gKCgpID0+IHtcbiAgc2luZ2xlUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtdWx0aXBsYXllck1lbnUpO1xuICB0d29QbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG11bHRpcGxheWVyTWVudSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lU2V0VXAoKTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIGdhbWVTZXRVcCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcGxheWVyT25lTmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBnYW1lU2V0VXAoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBsYXllclR3b05hbWVFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgZ2FtZVNldFVwKCk7XG4gICAgfVxuICB9KTtcblxuICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9uZVBsYWNlbWVudChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH0pO1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCB1cGRhdGVEaXNwbGF5cyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHVwZGF0ZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVNoaXBzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuY29uc3QgdXBkYXRlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuLTFcIik7XG4gIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuLTJcIik7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSBcIldBSVRJTkcuLi5cIjtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSBcIkFUVEFDS0lORy4uLlwiO1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVNoaXBzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgc2hpcHMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy0xXCIpO1xuICBjb25zdCBzaGlwczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLTJcIik7XG4gIHNoaXBzMS50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke2ZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgc2hpcHMyLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7c2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbn07XG5cbmNvbnN0IHVwZGF0ZVdpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB3aW5zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lucy0xXCIpO1xuICBjb25zdCB3aW5zMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lucy0yXCIpO1xuICB3aW5zMS50ZXh0Q29udGVudCA9IGBXaW5zOiAke2ZpcnN0UGxheWVyLmdldFdpbnMoKX1gO1xuICB3aW5zMi50ZXh0Q29udGVudCA9IGBXaW5zOiAke3NlY29uZFBsYXllci5nZXRXaW5zKCl9YDtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vY3JlYXRlU2hpcFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBhdHRhY2tzID0gW107XG5cbiAgY29uc3QgcGxhY2UgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IHNoaXBJbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXModGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIGlmIChzaGlwSW5kZXggPiAtMSkge1xuICAgICAgc2hpcHNbc2hpcEluZGV4XS5oaXQoKTtcbiAgICB9XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcHM7XG4gIH07XG5cbiAgY29uc3QgZmxlZXRDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZiAoc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCByZXNldEFycmF5ID0gKGFycikgPT4ge1xuICAgICAgY29uc3Qgc2l6ZSA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVzZXRBcnJheShzaGlwcyk7XG4gICAgcmVzZXRBcnJheShhdHRhY2tzKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFja3MsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTaGlwcyxcbiAgICBmbGVldENvb3JkaW5hdGVzLFxuICAgIGdldFNoaXBzUmVtYWluaW5nLFxuICAgIGlzRmxlZXRTdW5rLFxuICAgIHJlc2V0LFxuICB9O1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2NyZWF0ZUdhbWVib2FyZFwiO1xuaW1wb3J0IHsgY29tcHV0ZXJBdHRhY2sgfSBmcm9tIFwiLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllck5hbWUsIGlzQ29tcCA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBjb21wdXRlciA9IGlzQ29tcDtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgY29uc3QgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcblxuICBjb25zdCBtYWtlQXR0YWNrID0gKGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzID0gbnVsbCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBjb29yZGluYXRlcztcblxuICAgIGlmIChjb21wdXRlcikge1xuICAgICAgdGFyZ2V0ID0gY29tcHV0ZXJBdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgfVxuXG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHRhcmdldCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICBjb25zdCB3b24gPSAoKSA9PiB7XG4gICAgd2lucyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGdldFdpbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHdpbnM7XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGNvbXB1dGVyLCBpc1R1cm4sIG1ha2VBdHRhY2ssIGdldE5hbWUsIHdvbiwgZ2V0V2lucyB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVBcnJheSkgPT4ge1xuICBjb25zdCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVBcnJheTtcbiAgY29uc3QgbGVuZ3RoID0gY29vcmRpbmF0ZUFycmF5Lmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuZ3RoID09PSBkYW1hZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldERhbWFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gZGFtYWdlO1xuICB9O1xuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBoaXQsIGlzU3VuaywgZ2V0RGFtYWdlIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNoZWNrV2luID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgZmlyc3RQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuIFwiZmlyc3RcIjtcbiAgfSBlbHNlIGlmIChmaXJzdFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgc2Vjb25kUGxheWVyLndvbigpO1xuICAgIHJldHVybiBcInNlY29uZFwiO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgcmVuZGVyR3JpZCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSAocGxheWVyLCBzaXplQXJyKSA9PiB7XG4gIGNvbnN0IG51bWJlck9mU2hpcHMgPSBzaXplQXJyLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mU2hpcHM7IGkgKz0gMSkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllciwgc2l6ZUFyclswXSk7XG4gICAgY29uc3QgY3VycmVudEZsZWV0ID0gcGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgICBsZXQgZmxlZXRBcnI7XG5cbiAgICBpZiAoY3VycmVudEZsZWV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZmxlZXRBcnIgPSBjdXJyZW50RmxlZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoY2hlY2tDb29yZGluYXRlcyhjb29yZHMsIGZsZWV0QXJyKSkge1xuICAgICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsIHNpemVBcnJbMF0pO1xuICAgIH1cblxuICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZHMpO1xuICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgfVxuXG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgcGxheWVyKTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAocGxheWVyLCBzaXplKSA9PiB7XG4gIGNvbnN0IGF4aXMgPSBnZW5lcmF0ZUF4aXMoKTtcbiAgY29uc3Qgc3RhcnQgPSBnZW5lcmF0ZVN0YXJ0KCk7XG4gIGNvbnN0IHggPSBzdGFydFswXTtcbiAgY29uc3QgeSA9IHN0YXJ0WzFdO1xuICBjb25zdCBjb29yZEFyciA9IFtdO1xuXG4gIGlmIChheGlzID09PSBcInhcIikge1xuICAgIC8vIGluY3JlbWVudCBsZXR0ZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY29kZSA9IHguY2hhckNvZGVBdCgwKTtcbiAgICAgIGNvbnN0IGNlbGxYID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgaSkgKyB5O1xuICAgICAgY29vcmRBcnIucHVzaChjZWxsWCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgLy8gaW5jcmVtZW50IG51bWJlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWSA9IHggKyAoeSArIGkpO1xuICAgICAgY29vcmRBcnIucHVzaChjZWxsWSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvb3JkQXJyO1xufTtcblxuLy8gcmV0dXJuIHRydWUgaWYgY29vcmRpbmF0ZXMgYXJlIGludmFsaWRcbmNvbnN0IGNoZWNrQ29vcmRpbmF0ZXMgPSAoY29vcmRpbmF0ZXMsIGZsZWV0KSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRpbmF0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoZmxlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIGlmIChmbGVldC5pbmNsdWRlcyhjb29yZGluYXRlc1tpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IFtsZXR0ZXIsIC4uLnJlc3RdID0gY29vcmRpbmF0ZXNbMF07XG4gIGNvbnN0IHggPSBsZXR0ZXI7XG4gIGNvbnN0IHkgPSBwYXJzZUludChyZXN0LmpvaW4oXCJcIikpO1xuXG4gIGlmICh4LmNoYXJDb2RlQXQoMCkgKyAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkgPiA3NCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKHkgKyAoY29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkgPiAxMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5jb25zdCBnZW5lcmF0ZUF4aXMgPSAoKSA9PiB7XG4gIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gIGxldCBheGlzO1xuXG4gIGlmIChudW1iZXIgJSAyID09PSAwKSB7XG4gICAgYXhpcyA9IFwieFwiO1xuICB9IGVsc2UgaWYgKG51bWJlciAlIDIgIT09IDApIHtcbiAgICBheGlzID0gXCJ5XCI7XG4gIH1cblxuICByZXR1cm4gYXhpcztcbn07XG5cbmNvbnN0IGdlbmVyYXRlU3RhcnQgPSAoKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkpICsgNjU7XG4gIH07XG5cbiAgY29uc3QgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuXG4gIHJldHVybiBbbGV0dGVyLCBudW1iZXJdO1xufTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrRm9yQ29tcHV0ZXIgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuY29tcHV0ZXIgfHwgc2Vjb25kUGxheWVyLmNvbXB1dGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJBdHRhY2sgPSAoZW5lbXlCb2FyZCwgZ2VuID0gMSkgPT4ge1xuICBjb25zdCBoaXRzID0gW107XG4gIGNvbnN0IHNoaXBzID0gZW5lbXlCb2FyZC5nZXRTaGlwcygpO1xuICBsZXQgdGFyZ2V0O1xuXG4gIC8vIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHRhcmdldHMgYWRqYWNlbnQgdG8gY3VycmVudCBoaXRzXG4gIGNvbnN0IHRhcmdldEFkamFjZW50ID0gKCkgPT4ge1xuICAgIC8vIHBvcHVsYXRlcyBoaXRzIGFycmF5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmVteUJvYXJkLmF0dGFja3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGF0ayA9IGVuZW15Qm9hcmQuYXR0YWNrc1tpXTtcbiAgICAgIGNvbnN0IGZsZWV0QXJyID0gZW5lbXlCb2FyZFxuICAgICAgICAuZmxlZXRDb29yZGluYXRlcygpXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuXG4gICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoYXRrKSAmJiAhaGl0cy5pbmNsdWRlcyhhdGspKSB7XG4gICAgICAgIGhpdHMucHVzaChhdGspO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBoaXRzIHRoYXQgYXJlIG9uIHN1bmsgc2hpcHNcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBjb25zdCBsaXN0ID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXMoaGl0c1tpXSkpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChoaXRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuY29vcmRpbmF0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGhpdHMuaW5kZXhPZihsaXN0WzBdKTtcbiAgICAgICAgICBoaXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyByZXR1cm5zIHZhbGlkIHRhcmdldCBhZGphY2VudCB0byB0aGUgaW5wdXQgY29vcmRpbmF0ZVxuICAgIGNvbnN0IGdldEFkamFjZW50ID0gKGlucHV0Q29vcmQpID0+IHtcbiAgICAgIGNvbnN0IFthLCAuLi5yZXN0XSA9IGlucHV0Q29vcmQ7XG4gICAgICBjb25zdCBjaGFyID0gYTtcbiAgICAgIGNvbnN0IG51bSA9IHBhcnNlSW50KHJlc3Quam9pbihcIlwiKSk7XG4gICAgICBjb25zdCBjb2RlID0gY2hhci5jaGFyQ29kZUF0KDApO1xuXG4gICAgICBpZiAoY29kZSArIDEgPD0gNzQpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgKyAxKSArIG51bTtcblxuICAgICAgICBpZiAoIWVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvZGUgLSAxID49IDY1KSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlIC0gMSkgKyBudW07XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChudW0gKyAxIDw9IDEwKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gY2hhciArIChudW0gKyAxKTtcblxuICAgICAgICBpZiAoIWVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG51bSAtIDEgPj0gMSkge1xuICAgICAgICBjb25zdCBjb29yZCA9IGNoYXIgKyAobnVtIC0gMSk7XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgYWRqYWNlbnQgPSBnZXRBZGphY2VudChoaXRzW2ldKTtcblxuICAgICAgaWYgKGFkamFjZW50KSB7XG4gICAgICAgIHRhcmdldCA9IGFkamFjZW50O1xuICAgICAgICByZXR1cm4gYWRqYWNlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRhcmdldEFkamFjZW50KCk7XG5cbiAgaWYgKGhpdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBubyBhZGphY2VudCB0YXJnZXRzIHRoaXMgZ2VuZXJhdGVzIGEgbmV3IHRhcmdldFxuICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkpICsgNjU7XG4gICAgfTtcblxuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgLy8gcmVtYWtlcyBhdHRhY2sgaWYgdGFyZ2V0IGhhcyBhbHJlYWR5IGJlZW4gaGl0XG4gICAgaWYgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgfSB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgIH1cbiAgfTtcblxuICBnZW5lcmF0ZUF0dGFjaygpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsImltcG9ydCB7IGNoYW5nZVR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyByZXNldEdyaWRFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWVSZXN0YXJ0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBpZiAod2lubmVyID09PSBcImZpcnN0XCIgJiYgZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSBlbHNlIGlmICh3aW5uZXIgPT09IFwic2Vjb25kXCIgJiYgc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH1cblxuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuICBmaXJzdFBsYXllci5ib2FyZC5yZXNldCgpO1xuICBzZWNvbmRQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgcmVzZXRHcmlkRXZlbnRzKGdyaWQxKTtcbiAgcmVzZXRHcmlkRXZlbnRzKGdyaWQyKTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL2NyZWF0ZVBsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyRGlzcGxheSB9IGZyb20gXCIuLi9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHtcbiAgZ3JpZEV2ZW50cyxcbiAgcmVuZGVyR3JpZCxcbiAgcGxhY2VtZW50UGhhc2UsXG59IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vZ3JpZFwiO1xuaW1wb3J0IHsgY3JlYXRlUGxhY2VtZW50VGV4dCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vbWVudVwiO1xuaW1wb3J0IHsgZmlyc3RUdXJuLCBjb21wVHVybiB9IGZyb20gXCIuL3R1cm5cIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vaGlnaGxpZ2h0XCI7XG5pbXBvcnQgeyB1cGRhdGVEaXNwbGF5cyB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXNcIjtcblxuZXhwb3J0IGxldCBwbGF5ZXJPbmUsIHBsYXllclR3bztcblxuZXhwb3J0IGNvbnN0IHNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgaWYgKCFwbGF5ZXJPbmUgfHwgIXBsYXllclR3bykge1xuICAgIGxldCB4ID0gZmFsc2U7XG5cbiAgICBpZiAobmFtZVR3byA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICB4ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gICAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28sIHgpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLCAxKTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywgMik7XG4gIH1cblxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBjcmVhdGVQbGFjZW1lbnRUZXh0KHBsYXllck9uZSk7XG4gIHBsYWNlbWVudFBoYXNlKHBsYXllck9uZSwgMSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBncmlkRXZlbnRzKCk7XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCkge1xuICAgIGZpcnN0VHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5cyhwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllclR3by5jb21wdXRlciAmJiBwbGF5ZXJUd28uaXNUdXJuKSB7XG4gICAgY29tcFR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9XG59O1xuIiwiLy8gaW5wdXQgY2VsbCBkYXRhIGF0dHJpYnV0ZS9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVsxXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsIDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgY29kZVZhbHVlIC0gMSk7XG5cbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGggLSAyXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aCAtIDIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgY29uc3QgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG5cbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL2NoZWNrV2luXCI7XG5pbXBvcnQgeyBnYW1lUmVzdGFydCB9IGZyb20gXCIuL2dhbWVSZXNldFwiO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tIFwiLi9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuXG4vLyByYW5kb21seSBjaG9vc2VzIGEgcGxheWVyIHRvIGdvIGZpcnN0XG5leHBvcnQgY29uc3QgZmlyc3RUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gIH0gZWxzZSBpZiAobnVtYmVyICUgMiAhPT0gMCkge1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICB9XG59O1xuXG4vLyBjaGFuZ2VzIGN1cnJlbnQgcGxheWVyXG5leHBvcnQgY29uc3QgY2hhbmdlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vIGxldHMgdGhlIGN1cnJlbnQgcGxheWVyIG1ha2UgYW4gYXR0YWNrLCB0aGVuIGNoZWNrcyBmb3IgYSB3aW5uZXJcbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJmaXJzdFwiKSB7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJmaXJzdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgaWYgKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCwgdGFyZ2V0KTtcblxuICAgICAgaWYgKGNoZWNrV2luKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID09PSBcInNlY29uZFwiKSB7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJzZWNvbmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsb2coZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHR1cm5SZWd1bGFyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuXG4gIGlmIChjaGVja0ZvckNvbXB1dGVyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpKSB7XG4gICAgY29tcFR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb21wVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcblxuICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgdHVybldvbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBcInNlY29uZFwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2coZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gICAgdHVyblJlZ3VsYXIoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH0sIDEwMDApO1xufTtcblxuY29uc3QgdHVyblJlZ3VsYXIgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuY29uc3QgdHVybldvbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpID0+IHtcbiAgbG9nKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICBnYW1lUmVzdGFydChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgc2V0dXAoKTtcbn07XG5cbmNvbnN0IGxvZyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGxldCB4ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpICs9IDEpIHtcbiAgICBpZiAoeCA9PT0gMCkge1xuICAgICAgY29uc3QgZmxlZXQgPSBmaXJzdFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciAxXCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJzdFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZmxlZXRbaV0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKSk7XG4gICAgICB4ICs9IDE7XG4gICAgfSBlbHNlIGlmICh4ID09PSAxKSB7XG4gICAgICBjb25zdCBmbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciAyXCIpO1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBpIDwgc2Vjb25kUGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGg7XG4gICAgICAgIGkgKz0gMVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGZsZWV0W2ldKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHNlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpKTtcbiAgICB9XG4gIH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkXCI7XG5pbXBvcnQgeyBtZW51RXZlbnRzIH0gZnJvbSBcIi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcblxuY29uc3QgZGlzcGxheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXlcIik7XG5kaXNwbGF5cy5mb3JFYWNoKCh4KSA9PiB7XG4gIHguc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG5cbmNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtdWx0aXBsYXllci1tZW51XCIpO1xubXVsdGlwbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuY29uc3QgcGxheWVyVHdvR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsIDEpO1xuY3JlYXRlR3JpZChwbGF5ZXJUd29HcmlkLCAyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==