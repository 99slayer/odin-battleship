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
/* harmony import */ var _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/gameFunctions */ "./src/modules/gameFunctions.js");
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
  if (_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerOne.isTurn && cell.classList.contains("grid-cell-1")) {
    x = true;
  } else if (_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerTwo.isTurn && cell.classList.contains("grid-cell-2")) {
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

      if (gridLogic(_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
        return;
      }

      (0,_modules_turn__WEBPACK_IMPORTED_MODULE_2__.turn)(_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerTwo, coord);
    });

    // add hover cell visual
    node.addEventListener("mouseover", (e) => {
      const cell = e.target;

      if (gridLogic(_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
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

      if (gridLogic(_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerTwo, cell)) {
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
    } else if ((0,_modules_computer__WEBPACK_IMPORTED_MODULE_3__.checkForComputer)(_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_1__.playerTwo) || placing) {
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

// Creates event listeners for the placement phase.
const placementPhase = (player, playerNum) => {
  const gridSpace = document.getElementById("grid-space");
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

      // change axis on right click
      gridSpace.oncontextmenu = (e) => {
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
/* harmony import */ var _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/gameFunctions */ "./src/modules/gameFunctions.js");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _modules_computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/computer */ "./src/modules/computer.js");




const resetBtn = document.getElementById("reset-btn");

resetBtn.onclick = () => {
  if (!_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.playerOne && !_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.playerTwo) {
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
  const text = document.createElement("p");
  const warning = document.createElement("p");

  playerName.classList.add("placement-player-name");
  playerName.textContent = player.getName();
  text.textContent =
    "Place your ships by clicking on your gameboard. Right click to change the ships axis.";
  warning.textContent =
    "If you're playing with another person make sure they aren't looking!";
  placementText.append(playerName, text, warning);
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
      (0,_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
    } else {
      createPlacementText(secondPlayer);
      (0,_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(secondPlayer, 2);
    }
  }

  if (firstFleet.length === 5 && secondFleet.length === 5) {
    const grid2 = document.getElementById("player-two-grid");
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.resetGridEvents)(grid2);
    hide(placement);
    (0,_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.gameStart)();
  }
};

const startSetup = () => {
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

  (0,_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.gameSetup)(nameOne, nameTwo);
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
    startSetup();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startSetup();
    }
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startSetup();
    }
  });

  playerTwoNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startSetup();
    }
  });

  doneBtn.addEventListener("click", () => {
    donePlacement(_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.playerOne, _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.playerTwo);
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

/***/ "./src/DOM/interaction/winScreen.js":
/*!******************************************!*\
  !*** ./src/DOM/interaction/winScreen.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showScreen": () => (/* binding */ showScreen)
/* harmony export */ });
/* harmony import */ var _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/gameFunctions */ "./src/modules/gameFunctions.js");


const winScreen = document.getElementById("win-screen");
const winCont = document.getElementById("win-cont");

const showScreen = (winner) => {
  let winnerName;

  if (winner === 1) {
    winnerName = _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.playerOne.getName();
  } else if (winner === 2) {
    winnerName = _modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.playerTwo.getName();
  }

  winScreen.style.display = null;
  const winnerText = document.createElement("p");
  winnerText.textContent = `${winnerName} won!`;
  const okBtn = document.createElement("button");
  okBtn.textContent = "START NEW GAME";

  okBtn.onclick = () => {
    (0,_modules_gameFunctions__WEBPACK_IMPORTED_MODULE_0__.gameRestart)();
    removeScreen();
  };

  winCont.append(winnerText, okBtn);
};

const removeScreen = () => {
  winCont.innerHTML = "";
  winScreen.style.display = "none";
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
    return 1;
  } else if (firstPlayer.board.isFleetSunk()) {
    secondPlayer.won();
    return 2;
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

  // if there are no valid adjacent targets, a new target is generated
  const generateAttack = () => {
    const generateCharCode = () => {
      return Math.floor(Math.random() * (74 - 65 + 1)) + 65;
    };

    let letter = String.fromCharCode(generateCharCode());
    let number = Math.floor(Math.random() * 10 + 1);
    target = letter + number;

    // remakes target coordinates if target has already been hit
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

/***/ "./src/modules/gameFunctions.js":
/*!**************************************!*\
  !*** ./src/modules/gameFunctions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameRestart": () => (/* binding */ gameRestart),
/* harmony export */   "gameSetup": () => (/* binding */ gameSetup),
/* harmony export */   "gameStart": () => (/* binding */ gameStart),
/* harmony export */   "playerOne": () => (/* binding */ playerOne),
/* harmony export */   "playerTwo": () => (/* binding */ playerTwo)
/* harmony export */ });
/* harmony import */ var _factories_createPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/createPlayer */ "./src/factories/createPlayer.js");
/* harmony import */ var _DOM_components_createPlayerDisplays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM/components/createPlayerDisplays */ "./src/DOM/components/createPlayerDisplays.js");
/* harmony import */ var _DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DOM/interaction/grid */ "./src/DOM/interaction/grid.js");
/* harmony import */ var _DOM_interaction_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DOM/interaction/menu */ "./src/DOM/interaction/menu.js");
/* harmony import */ var _turn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./turn */ "./src/modules/turn.js");
/* harmony import */ var _DOM_interaction_highlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DOM/interaction/highlight */ "./src/DOM/interaction/highlight.js");
/* harmony import */ var _DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../DOM/interaction/playerDisplays */ "./src/DOM/interaction/playerDisplays.js");








let playerOne, playerTwo;

const gameSetup = (nameOne, nameTwo) => {
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

const gameRestart = (winner) => {
  if (winner === 1 && playerOne.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_4__.changeTurn)(playerOne, playerTwo);
  } else if (winner === 2 && playerTwo.isTurn) {
    (0,_turn__WEBPACK_IMPORTED_MODULE_4__.changeTurn)(playerOne, playerTwo);
  }

  playerOne.board.reset();
  playerTwo.board.reset();
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), playerOne);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), playerTwo);
  (0,_DOM_interaction_playerDisplays__WEBPACK_IMPORTED_MODULE_6__.updateDisplays)(playerOne, playerTwo);
  gameSetup();
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
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./computer */ "./src/modules/computer.js");
/* harmony import */ var _DOM_interaction_winScreen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DOM/interaction/winScreen */ "./src/DOM/interaction/winScreen.js");







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

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === 1) {
        turnWon(firstPlayer, secondPlayer, 1);
        return;
      }
    }
  } else if (secondPlayer.isTurn) {
    if (firstPlayer.board.attacks.includes(target)) {
      return;
    } else {
      secondPlayer.makeAttack(firstPlayer.board, target);

      if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === 2) {
        turnWon(firstPlayer, secondPlayer, 2);
        return;
      }
    }
  }

  turnRegular(firstPlayer, secondPlayer);

  if ((0,_computer__WEBPACK_IMPORTED_MODULE_4__.checkForComputer)(firstPlayer, secondPlayer)) {
    compTurn(firstPlayer, secondPlayer);
  }
};

const compTurn = (firstPlayer, secondPlayer) => {
  setTimeout(() => {
    secondPlayer.makeAttack(firstPlayer.board);

    if ((0,_checkWin__WEBPACK_IMPORTED_MODULE_3__.checkWin)(firstPlayer, secondPlayer) === 2) {
      turnWon(firstPlayer, secondPlayer, 2);
      return;
    }

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
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  const grid1 = document.getElementById("player-one-grid");
  const grid2 = document.getElementById("player-two-grid");
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.resetGridEvents)(grid1);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.resetGridEvents)(grid2);
  (0,_DOM_interaction_winScreen__WEBPACK_IMPORTED_MODULE_5__.showScreen)(winner);
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

const winScreen = document.getElementById("win-screen");
winScreen.style.display = "none";

const multiplayer = document.getElementById("multiplayer-menu");
multiplayer.style.display = "block";

const playerOneGrid = document.getElementById("player-one-grid");
const playerTwoGrid = document.getElementById("player-two-grid");

(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerOneGrid, 1);
(0,_DOM_components_createGrid__WEBPACK_IMPORTED_MODULE_0__.createGrid)(playerTwoGrid, 2);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG1EQUFRO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxxRUFBUztBQUNYLEVBQUUsaUVBQVU7QUFDWixFQUFFLGlFQUFVO0FBQ1osRUFBRSwrRUFBYztBQUNoQjs7QUFFQTtBQUNBLEVBQUUsaUVBQVU7QUFDWixFQUFFLGlFQUFVO0FBQ1o7QUFDQTtBQUNBLEVBQUUsc0VBQWU7QUFDakIsRUFBRSxzRUFBZTtBQUNqQixFQUFFLHNFQUFVO0FBQ1o7Ozs7Ozs7VUMzRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDTDs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL3dpblNjcmVlbi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsIGdyaWROdW0pID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gaTtcbiAgICBjb25zdCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoXCJncmlkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiLCBgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9XG5cbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDE7XG5cbiAgICByb3dzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG5cbiAgICAgIGlmIChlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpID09PSBcIjAtMFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICBpZiAoY2VsbENvb3JkaW5hdGUgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZGlzcGxheVwiKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZChcImRpc3BsYXktY29udFwiKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0dXJuLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0dXJuLSR7cGxheWVyTnVtfWApO1xuXG4gIGlmIChwbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybi50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH1cblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHdpbnMuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSwgbmFtZSwgdHVybiwgc2hpcHMsIHdpbnMpO1xuXG4gIGlmIChwbGF5ZXJOdW0gPT09IDEpIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpIHtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVGdW5jdGlvbnNcIjtcbmltcG9ydCB7IHR1cm4gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90dXJuXCI7XG5pbXBvcnQgeyBjaGVja0ZvckNvbXB1dGVyIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvY29tcHV0ZXJcIjtcblxuY29uc3QgZ2V0R3JpZENvb3JkaW5hdGUgPSAoY2VsbCkgPT4ge1xuICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKSk7XG4gIHJldHVybiBjb29yZDtcbn07XG5cbi8vIHN0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vIHN0b3BzIGZ1bmN0aW9uIGlmIGl0cyBjb21wdXRlcnMgdHVyblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuICYmIGZpcnN0UGxheWVyLmNvbXB1dGVyKSB7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybiAmJiBzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIHN0b3BzIHBsYXllciBmcm9tIGludGVyYWN0aW5nIHdpdGggdGhlaXIgb3duIGdyaWRcbiAgaWYgKHBsYXllck9uZS5pc1R1cm4gJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJncmlkLWNlbGwtMVwiKSkge1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4gJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJncmlkLWNlbGwtMlwiKSkge1xuICAgIHggPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vLyBDaGVja3MgaWYgdGhlIGNlbGwgaXMgYSBsYWJlbFxuY29uc3QgY2hlY2tUaWVyID0gKGNlbGwpID0+IHtcbiAgY29uc3QgY2VsbElEID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgY29uc3QgY29vcmRpbmF0ZSA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbElEKTtcblxuICBpZiAoXG4gICAgY29vcmRpbmF0ZVswXSA9PT0gXCJAXCIgfHxcbiAgICAoY29vcmRpbmF0ZS5sZW5ndGggPT09IDIgJiYgY29vcmRpbmF0ZVsxXSA9PT0gXCIwXCIpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ3JpZEV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcblxuICBjZWxscy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihub2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGFkZCB0dXJuIGxpc3RlbmVyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHVybihwbGF5ZXJPbmUsIHBsYXllclR3bywgY29vcmQpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGFuZCByZW1vdmUgY2xpY2sgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuXG4gICAgICBjZWxsLm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscywgcGxheWVyLCBwbGFjaW5nID0gZmFsc2UpID0+IHtcbiAgaWYgKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgcmVzZXRHcmlkKGNlbGxzKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBmbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGZsZWV0QXJyID0gZmxlZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShcbiAgICAgIGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIilcbiAgICApO1xuXG4gICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSAmJiBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIuKXj1wiO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmXG4gICAgICBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZClcbiAgICApIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICB9IGVsc2UgaWYgKHBsYXllci5jb21wdXRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tGb3JDb21wdXRlcihwbGF5ZXJPbmUsIHBsYXllclR3bykgfHwgcGxhY2luZykge1xuICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNldEdyaWQgPSAoY2VsbHMpID0+IHtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYWNlbWVudCBwaGFzZS5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBncmlkU3BhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWQtc3BhY2VcIik7XG4gIGNvbnN0IHBsYWNlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VtZW50LW1lbnVcIik7XG4gIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmUtYnRuXCIpO1xuICBwbGFjZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5ncmlkLWNlbGwtJHtwbGF5ZXJOdW19YCk7XG4gIGNvbnN0IHNpemVBcnIgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBheGlzID0gXCJ5XCI7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGlmIChzaXplQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHRhcmdldENlbGxDb29yZGluYXRlID0gdGFyZ2V0Q2VsbC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIlxuICAgICAgKTtcbiAgICAgIGxldCBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHBsYXllck51bVxuICAgICAgKTtcblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgaWYgKCFob3ZlckNlbGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gY2hhbmdlIGF4aXMgb24gcmlnaHQgY2xpY2tcbiAgICAgIGdyaWRTcGFjZS5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgICAgaWYgKGhvdmVyQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICBheGlzID0gXCJ4XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICBheGlzID0gXCJ5XCI7XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgICBzaXplQXJyWzBdLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgcGxheWVyTnVtXG4gICAgICAgICk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgICBpZiAoaG92ZXJDZWxsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gcGxhY2Ugc2hpcFxuICAgICAgdGFyZ2V0Q2VsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGhvdmVyQ2VsbHMuaW5jbHVkZXMobnVsbCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VVCBPRiBCT1VORFMuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmbGVldEFyciA9IFtdO1xuXG4gICAgICAgIGlmICghKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgIGZsZWV0QXJyID0gcGxheWVyLmJvYXJkXG4gICAgICAgICAgICAuZmxlZXRDb29yZGluYXRlcygpXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG92ZXJDZWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGNlbGxDb29yZCA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG5cbiAgICAgICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMocGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsQ29vcmQpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3ZlckNlbGxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gaG92ZXJDZWxsc1tpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoYXR0cmlidXRlKTtcbiAgICAgICAgICBjb29yZEFyci5wdXNoKGNvb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZEFycik7XG4gICAgICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuICAgICAgICAvLyByZXJlbmRlciBob3ZlcmNlbGxzIGZvciBob3ZlciB2aXN1YWxcbiAgICAgICAgcmVuZGVyR3JpZChjZWxscywgcGxheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoc2l6ZUFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gcmV0dXJucyBub2RlIGxpc3RcbmNvbnN0IGdldEhvdmVyQ2VsbHMgPSAoc3RhcnQsIHNpemUsIGF4aXMsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBob3ZlckNlbGxzID0gW107XG4gIGNvbnN0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoXCJcIik7XG4gIGxldCB4ID0gZ2V0WChzdGFydEFycik7XG4gIHggPSBwYXJzZUludCh4KTtcbiAgbGV0IHkgPSBnZXRZKHN0YXJ0QXJyKTtcbiAgeSA9IHBhcnNlSW50KHkpO1xuXG4gIGlmIChheGlzID09PSBcInhcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWCA9IHggKyBpICsgXCItXCIgKyB5O1xuICAgICAgaG92ZXJDZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWH1cIl1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxZID0geCArIFwiLVwiICsgKHkgKyBpKTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFl9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlckNlbGxzO1xufTtcblxuY29uc3QgZ2V0WCA9IChhcnIpID0+IHtcbiAgbGV0IHg7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyWzFdKSkpIHtcbiAgICBjb25zdCB0d29EaWdpdCA9IGFyci5zbGljZSgwLCAyKTtcbiAgICB4ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB4ID0gYXJyWzBdO1xuICB9XG4gIHJldHVybiB4O1xufTtcblxuY29uc3QgZ2V0WSA9IChhcnIpID0+IHtcbiAgbGV0IHk7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyW2Fyci5sZW5ndGggLSAyXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoYXJyLmxlbmd0aCAtIDIpO1xuICAgIHkgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIHkgPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiB5O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0R3JpZEV2ZW50cyA9IChncmlkKSA9PiB7XG4gIGNvbnN0IGdyaWRDbG9uZSA9IGdyaWQuY2xvbmVOb2RlKHRydWUpO1xuICBncmlkLnJlcGxhY2VXaXRoKGdyaWRDbG9uZSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1kaXNwbGF5XCIpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG4gIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBncmlkMS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBncmlkMi5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG5cbiAgaWYgKFxuICAgIGZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwICYmXG4gICAgc2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDIuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICBncmlkMS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIH1cbn07XG4iLCJpbXBvcnQge1xuICBnYW1lU2V0dXAsXG4gIGdhbWVTdGFydCxcbiAgcGxheWVyT25lLFxuICBwbGF5ZXJUd28sXG59IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVGdW5jdGlvbnNcIjtcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlLCByZW5kZXJHcmlkLCByZXNldEdyaWRFdmVudHMgfSBmcm9tIFwiLi9ncmlkXCI7XG5pbXBvcnQgeyBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2NvbXB1dGVyXCI7XG5cbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1idG5cIik7XG5cbnJlc2V0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGlmICghcGxheWVyT25lICYmICFwbGF5ZXJUd28pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59O1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVsdGlwbGF5ZXItbWVudVwiKTtcbmNvbnN0IG5hbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lLW1lbnVcIik7XG5jb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudC1tZW51XCIpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpbmdsZS1wbGF5ZXItYnRuXCIpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0d28tcGxheWVyLWJ0blwiKTtcbmNvbnN0IHBsYXllclR3b0NvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tY29udFwiKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLW5hbWVcIik7XG5jb25zdCBwbGF5ZXJUd29OYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tbmFtZVwiKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idG5cIik7XG5jb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb25lLWJ0blwiKTtcblxuY29uc3QgZGlzcGxheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXlcIik7XG5cbmxldCBpc011bHRpcGxheWVyID0gZmFsc2U7XG5cbmNvbnN0IGhpZGUgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxuY29uc3Qgc2hvdyA9IChlbCkgPT4ge1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWUudHJpbSgpO1xuICBsZXQgcGxheWVyVHdvTmFtZSA9IHBsYXllclR3b05hbWVFbC52YWx1ZS50cmltKCk7XG5cbiAgaWYgKCFpc011bHRpcGxheWVyKSB7XG4gICAgcGxheWVyVHdvTmFtZSA9IFwiY29tcHV0ZXJcIjtcbiAgfVxuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxhY2VtZW50VGV4dCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxhY2VtZW50VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VtZW50LXRleHRcIik7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIHBsYXllck5hbWUuY2xhc3NMaXN0LmFkZChcInBsYWNlbWVudC1wbGF5ZXItbmFtZVwiKTtcbiAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllci5nZXROYW1lKCk7XG4gIHRleHQudGV4dENvbnRlbnQgPVxuICAgIFwiUGxhY2UgeW91ciBzaGlwcyBieSBjbGlja2luZyBvbiB5b3VyIGdhbWVib2FyZC4gUmlnaHQgY2xpY2sgdG8gY2hhbmdlIHRoZSBzaGlwcyBheGlzLlwiO1xuICB3YXJuaW5nLnRleHRDb250ZW50ID1cbiAgICBcIklmIHlvdSdyZSBwbGF5aW5nIHdpdGggYW5vdGhlciBwZXJzb24gbWFrZSBzdXJlIHRoZXkgYXJlbid0IGxvb2tpbmchXCI7XG4gIHBsYWNlbWVudFRleHQuYXBwZW5kKHBsYXllck5hbWUsIHRleHQsIHdhcm5pbmcpO1xufTtcblxuY29uc3QgcmVtb3ZlUGxhY2VtZW50VGV4dCA9ICgpID0+IHtcbiAgY29uc3QgcGxhY2VtZW50VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VtZW50LXRleHRcIik7XG4gIHBsYWNlbWVudFRleHQuaW5uZXJIVE1MID0gXCJcIjtcbn07XG5cbmNvbnN0IGRvbmVQbGFjZW1lbnQgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICByZW1vdmVQbGFjZW1lbnRUZXh0KCk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG5cbiAgY29uc3QgZmlyc3RGbGVldCA9IGZpcnN0UGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcbiAgY29uc3Qgc2Vjb25kRmxlZXQgPSBzZWNvbmRQbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuXG4gIGlmIChmaXJzdEZsZWV0Lmxlbmd0aCA9PT0gNSAmJiBzZWNvbmRGbGVldC5sZW5ndGggPT09IDApIHtcbiAgICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuICAgIHJlc2V0R3JpZEV2ZW50cyhncmlkMSk7XG5cbiAgICBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKSB7XG4gICAgICBjb21wdXRlclBsYWNlbWVudChzZWNvbmRQbGF5ZXIsIFs1LCA0LCAzLCAzLCAyXSk7XG4gICAgICBoaWRlKHBsYWNlbWVudCk7XG4gICAgICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gICAgICBnYW1lU3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3JlYXRlUGxhY2VtZW50VGV4dChzZWNvbmRQbGF5ZXIpO1xuICAgICAgcGxhY2VtZW50UGhhc2Uoc2Vjb25kUGxheWVyLCAyKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZmlyc3RGbGVldC5sZW5ndGggPT09IDUgJiYgc2Vjb25kRmxlZXQubGVuZ3RoID09PSA1KSB7XG4gICAgY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZ3JpZFwiKTtcbiAgICByZXNldEdyaWRFdmVudHMoZ3JpZDIpO1xuICAgIGhpZGUocGxhY2VtZW50KTtcbiAgICBnYW1lU3RhcnQoKTtcbiAgfVxufTtcblxuY29uc3Qgc3RhcnRTZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZXMgPSBnZXROYW1lcygpO1xuICBjb25zdCBuYW1lT25lID0gcGxheWVyTmFtZXNbMF07XG4gIGNvbnN0IG5hbWVUd28gPSBwbGF5ZXJOYW1lc1sxXTtcblxuICBpZiAobmFtZU9uZSA9PT0gXCJcIiB8fCBuYW1lVHdvID09PSBcIlwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGlzcGxheXMuZm9yRWFjaCgoZGlzcGxheSkgPT4ge1xuICAgIGRpc3BsYXkuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gIH0pO1xuXG4gIGhpZGUobmFtZXMpO1xuXG4gIGdhbWVTZXR1cChuYW1lT25lLCBuYW1lVHdvKTtcbiAgcGxheWVyT25lTmFtZUVsLnZhbHVlID0gXCJcIjtcbiAgcGxheWVyVHdvTmFtZUVsLnZhbHVlID0gXCJcIjtcbn07XG5cbmNvbnN0IG11bHRpcGxheWVyTWVudSA9IChlKSA9PiB7XG4gIGhpZGUocGxheWVyVHdvQ29udCk7XG5cbiAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInR3by1wbGF5ZXItYnRuXCIpIHtcbiAgICBwbGF5ZXJUd29Db250LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBpc011bHRpcGxheWVyID0gdHJ1ZTtcbiAgfVxuXG4gIGhpZGUobXVsdGlwbGF5ZXIpO1xuICBzaG93KG5hbWVzKTtcbn07XG5cbi8vIG1lbnUgaW50ZXJhY3Rpb24gZXZlbnRzXG5leHBvcnQgY29uc3QgbWVudUV2ZW50cyA9ICgoKSA9PiB7XG4gIHNpbmdsZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbXVsdGlwbGF5ZXJNZW51KTtcbiAgdHdvUGxheWVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtdWx0aXBsYXllck1lbnUpO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc3RhcnRTZXR1cCgpO1xuICB9KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgc3RhcnRTZXR1cCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcGxheWVyT25lTmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBzdGFydFNldHVwKCk7XG4gICAgfVxuICB9KTtcblxuICBwbGF5ZXJUd29OYW1lRWwuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIHN0YXJ0U2V0dXAoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb25lUGxhY2VtZW50KHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgfSk7XG59KSgpO1xuIiwiZXhwb3J0IGNvbnN0IHVwZGF0ZURpc3BsYXlzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgdXBkYXRlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlU2hpcHMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVdpbnMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5jb25zdCB1cGRhdGVUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgdHVybjEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm4tMVwiKTtcbiAgY29uc3QgdHVybjIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm4tMlwiKTtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9IFwiV0FJVElORy4uLlwiO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuMi50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSBcIldBSVRJTkcuLi5cIjtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlU2hpcHMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBzaGlwczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLTFcIik7XG4gIGNvbnN0IHNoaXBzMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtMlwiKTtcbiAgc2hpcHMxLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7Zmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xuICBzaGlwczIudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKX1gO1xufTtcblxuY29uc3QgdXBkYXRlV2lucyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHdpbnMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5zLTFcIik7XG4gIGNvbnN0IHdpbnMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5zLTJcIik7XG4gIHdpbnMxLnRleHRDb250ZW50ID0gYFdpbnM6ICR7Zmlyc3RQbGF5ZXIuZ2V0V2lucygpfWA7XG4gIHdpbnMyLnRleHRDb250ZW50ID0gYFdpbnM6ICR7c2Vjb25kUGxheWVyLmdldFdpbnMoKX1gO1xufTtcbiIsImltcG9ydCB7IHBsYXllck9uZSwgcGxheWVyVHdvLCBnYW1lUmVzdGFydCB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVGdW5jdGlvbnNcIjtcblxuY29uc3Qgd2luU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW4tc2NyZWVuXCIpO1xuY29uc3Qgd2luQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luLWNvbnRcIik7XG5cbmV4cG9ydCBjb25zdCBzaG93U2NyZWVuID0gKHdpbm5lcikgPT4ge1xuICBsZXQgd2lubmVyTmFtZTtcblxuICBpZiAod2lubmVyID09PSAxKSB7XG4gICAgd2lubmVyTmFtZSA9IHBsYXllck9uZS5nZXROYW1lKCk7XG4gIH0gZWxzZSBpZiAod2lubmVyID09PSAyKSB7XG4gICAgd2lubmVyTmFtZSA9IHBsYXllclR3by5nZXROYW1lKCk7XG4gIH1cblxuICB3aW5TY3JlZW4uc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gIGNvbnN0IHdpbm5lclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgd2lubmVyVGV4dC50ZXh0Q29udGVudCA9IGAke3dpbm5lck5hbWV9IHdvbiFgO1xuICBjb25zdCBva0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG9rQnRuLnRleHRDb250ZW50ID0gXCJTVEFSVCBORVcgR0FNRVwiO1xuXG4gIG9rQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgZ2FtZVJlc3RhcnQoKTtcbiAgICByZW1vdmVTY3JlZW4oKTtcbiAgfTtcblxuICB3aW5Db250LmFwcGVuZCh3aW5uZXJUZXh0LCBva0J0bik7XG59O1xuXG5jb25zdCByZW1vdmVTY3JlZW4gPSAoKSA9PiB7XG4gIHdpbkNvbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgd2luU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vY3JlYXRlU2hpcFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBhdHRhY2tzID0gW107XG5cbiAgY29uc3QgcGxhY2UgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChjb29yZGluYXRlcyk7XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICByZXR1cm4gbmV3U2hpcDtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IHNoaXBJbmRleCA9IHNoaXBzLmZpbmRJbmRleCgoc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIHNoaXAuY29vcmRpbmF0ZXMuaW5jbHVkZXModGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIGlmIChzaGlwSW5kZXggPiAtMSkge1xuICAgICAgc2hpcHNbc2hpcEluZGV4XS5oaXQoKTtcbiAgICB9XG5cbiAgICBhdHRhY2tzLnB1c2godGFyZ2V0KTtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcHM7XG4gIH07XG5cbiAgY29uc3QgZmxlZXRDb29yZGluYXRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBhcnIucHVzaChzaGlwc1tpXS5jb29yZGluYXRlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwc1JlbWFpbmluZyA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIHNoaXBzU3VuayArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNoaXBzLmxlbmd0aCAtIHNoaXBzU3VuaztcbiAgfTtcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IHtcbiAgICBpZiAoc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCByZXNldEFycmF5ID0gKGFycikgPT4ge1xuICAgICAgY29uc3Qgc2l6ZSA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVzZXRBcnJheShzaGlwcyk7XG4gICAgcmVzZXRBcnJheShhdHRhY2tzKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGF0dGFja3MsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTaGlwcyxcbiAgICBmbGVldENvb3JkaW5hdGVzLFxuICAgIGdldFNoaXBzUmVtYWluaW5nLFxuICAgIGlzRmxlZXRTdW5rLFxuICAgIHJlc2V0LFxuICB9O1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2NyZWF0ZUdhbWVib2FyZFwiO1xuaW1wb3J0IHsgY29tcHV0ZXJBdHRhY2sgfSBmcm9tIFwiLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllck5hbWUsIGlzQ29tcCA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBwbGF5ZXJOYW1lO1xuICBjb25zdCBjb21wdXRlciA9IGlzQ29tcDtcbiAgY29uc3QgYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgY29uc3QgaXNUdXJuID0gZmFsc2U7XG4gIGxldCB3aW5zID0gMDtcblxuICBjb25zdCBtYWtlQXR0YWNrID0gKGVuZW15Qm9hcmQsIGNvb3JkaW5hdGVzID0gbnVsbCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBjb29yZGluYXRlcztcblxuICAgIGlmIChjb21wdXRlcikge1xuICAgICAgdGFyZ2V0ID0gY29tcHV0ZXJBdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgfVxuXG4gICAgZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHRhcmdldCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmFtZTtcbiAgfTtcblxuICBjb25zdCB3b24gPSAoKSA9PiB7XG4gICAgd2lucyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGdldFdpbnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHdpbnM7XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIGNvbXB1dGVyLCBpc1R1cm4sIG1ha2VBdHRhY2ssIGdldE5hbWUsIHdvbiwgZ2V0V2lucyB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVBcnJheSkgPT4ge1xuICBjb25zdCBjb29yZGluYXRlcyA9IGNvb3JkaW5hdGVBcnJheTtcbiAgY29uc3QgbGVuZ3RoID0gY29vcmRpbmF0ZUFycmF5Lmxlbmd0aDtcbiAgbGV0IGRhbWFnZSA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGRhbWFnZSArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICBpZiAobGVuZ3RoID09PSBkYW1hZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldERhbWFnZSA9ICgpID0+IHtcbiAgICByZXR1cm4gZGFtYWdlO1xuICB9O1xuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVzLCBoaXQsIGlzU3VuaywgZ2V0RGFtYWdlIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNoZWNrV2luID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgZmlyc3RQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgIHNlY29uZFBsYXllci53b24oKTtcbiAgICByZXR1cm4gMjtcbiAgfVxufTtcbiIsImltcG9ydCB7IHJlbmRlckdyaWQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyUGxhY2VtZW50ID0gKHBsYXllciwgc2l6ZUFycikgPT4ge1xuICBjb25zdCBudW1iZXJPZlNoaXBzID0gc2l6ZUFyci5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlNoaXBzOyBpICs9IDEpIHtcbiAgICBsZXQgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsIHNpemVBcnJbMF0pO1xuICAgIGNvbnN0IGN1cnJlbnRGbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gICAgbGV0IGZsZWV0QXJyO1xuXG4gICAgaWYgKGN1cnJlbnRGbGVldC5sZW5ndGggIT09IDApIHtcbiAgICAgIGZsZWV0QXJyID0gY3VycmVudEZsZWV0LnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNoZWNrQ29vcmRpbmF0ZXMoY29vcmRzLCBmbGVldEFycikpIHtcbiAgICAgIGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMocGxheWVyLCBzaXplQXJyWzBdKTtcbiAgICB9XG5cbiAgICBwbGF5ZXIuYm9hcmQucGxhY2UoY29vcmRzKTtcbiAgICBzaXplQXJyLnNoaWZ0KCk7XG4gIH1cblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllcik7XG59O1xuXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKHBsYXllciwgc2l6ZSkgPT4ge1xuICBjb25zdCBheGlzID0gZ2VuZXJhdGVBeGlzKCk7XG4gIGNvbnN0IHN0YXJ0ID0gZ2VuZXJhdGVTdGFydCgpO1xuICBjb25zdCB4ID0gc3RhcnRbMF07XG4gIGNvbnN0IHkgPSBzdGFydFsxXTtcbiAgY29uc3QgY29vcmRBcnIgPSBbXTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAvLyBpbmNyZW1lbnQgbGV0dGVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSB4LmNoYXJDb2RlQXQoMCk7XG4gICAgICBjb25zdCBjZWxsWCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIGkpICsgeTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIC8vIGluY3JlbWVudCBudW1iZXJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFkgPSB4ICsgKHkgKyBpKTtcbiAgICAgIGNvb3JkQXJyLnB1c2goY2VsbFkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb29yZEFycjtcbn07XG5cbi8vIHJldHVybiB0cnVlIGlmIGNvb3JkaW5hdGVzIGFyZSBpbnZhbGlkXG5jb25zdCBjaGVja0Nvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzLCBmbGVldCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGZsZWV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoZmxlZXQuaW5jbHVkZXMoY29vcmRpbmF0ZXNbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBbbGV0dGVyLCAuLi5yZXN0XSA9IGNvb3JkaW5hdGVzWzBdO1xuICBjb25zdCB4ID0gbGV0dGVyO1xuICBjb25zdCB5ID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcblxuICBpZiAoeC5jaGFyQ29kZUF0KDApICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gNzQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh5ICsgKGNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpID4gMTApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVBeGlzID0gKCkgPT4ge1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICBsZXQgYXhpcztcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGF4aXMgPSBcInhcIjtcbiAgfSBlbHNlIGlmIChudW1iZXIgJSAyICE9PSAwKSB7XG4gICAgYXhpcyA9IFwieVwiO1xuICB9XG5cbiAgcmV0dXJuIGF4aXM7XG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0YXJ0ID0gKCkgPT4ge1xuICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICB9O1xuXG4gIGNvbnN0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICByZXR1cm4gW2xldHRlciwgbnVtYmVyXTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0ZvckNvbXB1dGVyID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmNvbXB1dGVyIHx8IHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKGVuZW15Qm9hcmQsIGdlbiA9IDEpID0+IHtcbiAgY29uc3QgaGl0cyA9IFtdO1xuICBjb25zdCBzaGlwcyA9IGVuZW15Qm9hcmQuZ2V0U2hpcHMoKTtcbiAgbGV0IHRhcmdldDtcblxuICAvLyBjaGVja3MgaWYgdGhlcmUgYXJlIGFueSB0YXJnZXRzIGFkamFjZW50IHRvIGN1cnJlbnQgaGl0c1xuICBjb25zdCB0YXJnZXRBZGphY2VudCA9ICgpID0+IHtcbiAgICAvLyBwb3B1bGF0ZXMgaGl0cyBhcnJheVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBhdGsgPSBlbmVteUJvYXJkLmF0dGFja3NbaV07XG4gICAgICBjb25zdCBmbGVldEFyciA9IGVuZW15Qm9hcmRcbiAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGF0aykgJiYgIWhpdHMuaW5jbHVkZXMoYXRrKSkge1xuICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgaGl0cyB0aGF0IGFyZSBvbiBzdW5rIHNoaXBzXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKGhpdHNbaV0pKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goaGl0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBoaXRzLmluZGV4T2YobGlzdFswXSk7XG4gICAgICAgICAgaGl0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gcmV0dXJucyB2YWxpZCB0YXJnZXQgYWRqYWNlbnQgdG8gdGhlIGlucHV0IGNvb3JkaW5hdGVcbiAgICBjb25zdCBnZXRBZGphY2VudCA9IChpbnB1dENvb3JkKSA9PiB7XG4gICAgICBjb25zdCBbYSwgLi4ucmVzdF0gPSBpbnB1dENvb3JkO1xuICAgICAgY29uc3QgY2hhciA9IGE7XG4gICAgICBjb25zdCBudW0gPSBwYXJzZUludChyZXN0LmpvaW4oXCJcIikpO1xuICAgICAgY29uc3QgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgaWYgKGNvZGUgKyAxIDw9IDc0KSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlICsgMSkgKyBudW07XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2RlIC0gMSA+PSA2NSkge1xuICAgICAgICBjb25zdCBjb29yZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSAtIDEpICsgbnVtO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobnVtICsgMSA8PSAxMCkge1xuICAgICAgICBjb25zdCBjb29yZCA9IGNoYXIgKyAobnVtICsgMSk7XG5cbiAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChudW0gLSAxID49IDEpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBjaGFyICsgKG51bSAtIDEpO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGFkamFjZW50ID0gZ2V0QWRqYWNlbnQoaGl0c1tpXSk7XG5cbiAgICAgIGlmIChhZGphY2VudCkge1xuICAgICAgICB0YXJnZXQgPSBhZGphY2VudDtcbiAgICAgICAgcmV0dXJuIGFkamFjZW50O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0YXJnZXRBZGphY2VudCgpO1xuXG4gIGlmIChoaXRzLmxlbmd0aCAhPT0gMCkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICAvLyBpZiB0aGVyZSBhcmUgbm8gdmFsaWQgYWRqYWNlbnQgdGFyZ2V0cywgYSBuZXcgdGFyZ2V0IGlzIGdlbmVyYXRlZFxuICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBnZW5lcmF0ZUNoYXJDb2RlID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NCAtIDY1ICsgMSkpICsgNjU7XG4gICAgfTtcblxuICAgIGxldCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgLy8gcmVtYWtlcyB0YXJnZXQgY29vcmRpbmF0ZXMgaWYgdGFyZ2V0IGhhcyBhbHJlYWR5IGJlZW4gaGl0XG4gICAgaWYgKGVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgICAgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgfSB3aGlsZSAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpO1xuICAgIH1cbiAgfTtcblxuICBnZW5lcmF0ZUF0dGFjaygpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuLi9mYWN0b3JpZXMvY3JlYXRlUGxheWVyXCI7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJEaXNwbGF5IH0gZnJvbSBcIi4uL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQge1xuICBncmlkRXZlbnRzLFxuICByZW5kZXJHcmlkLFxuICBwbGFjZW1lbnRQaGFzZSxcbn0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjcmVhdGVQbGFjZW1lbnRUZXh0IH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9tZW51XCI7XG5pbXBvcnQgeyBjaGFuZ2VUdXJuLCBmaXJzdFR1cm4sIGNvbXBUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHRcIjtcbmltcG9ydCB7IHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuXG5leHBvcnQgbGV0IHBsYXllck9uZSwgcGxheWVyVHdvO1xuXG5leHBvcnQgY29uc3QgZ2FtZVNldHVwID0gKG5hbWVPbmUsIG5hbWVUd28pID0+IHtcbiAgaWYgKCFwbGF5ZXJPbmUgfHwgIXBsYXllclR3bykge1xuICAgIGxldCB4ID0gZmFsc2U7XG5cbiAgICBpZiAobmFtZVR3byA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICB4ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5ZXJPbmUgPSBjcmVhdGVQbGF5ZXIobmFtZU9uZSk7XG4gICAgcGxheWVyVHdvID0gY3JlYXRlUGxheWVyKG5hbWVUd28sIHgpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyT25lLCAxKTtcbiAgICBjcmVhdGVQbGF5ZXJEaXNwbGF5KHBsYXllclR3bywgMik7XG4gIH1cblxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBjcmVhdGVQbGFjZW1lbnRUZXh0KHBsYXllck9uZSk7XG4gIHBsYWNlbWVudFBoYXNlKHBsYXllck9uZSwgMSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBncmlkRXZlbnRzKCk7XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCkge1xuICAgIGZpcnN0VHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5cyhwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllclR3by5jb21wdXRlciAmJiBwbGF5ZXJUd28uaXNUdXJuKSB7XG4gICAgY29tcFR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2FtZVJlc3RhcnQgPSAod2lubmVyKSA9PiB7XG4gIGlmICh3aW5uZXIgPT09IDEgJiYgcGxheWVyT25lLmlzVHVybikge1xuICAgIGNoYW5nZVR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gMiAmJiBwbGF5ZXJUd28uaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH1cblxuICBwbGF5ZXJPbmUuYm9hcmQucmVzZXQoKTtcbiAgcGxheWVyVHdvLmJvYXJkLnJlc2V0KCk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgcGxheWVyT25lKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBwbGF5ZXJUd28pO1xuICB1cGRhdGVEaXNwbGF5cyhwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIGdhbWVTZXR1cCgpO1xufTtcbiIsIi8vIGlucHV0IGNlbGwgZGF0YSBhdHRyaWJ1dGUvb3V0cHV0IGF0dGFjayBjb29yZGluYXRlc1xuZXhwb3J0IGNvbnN0IHBhcnNlQ2VsbENvb3JkaW5hdGUgPSAoYXR0cmlidXRlKSA9PiB7XG4gIGlmICh0eXBlb2YgYXR0cmlidXRlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXJyID0gYXR0cmlidXRlLnNwbGl0KFwiXCIpO1xuXG4gIGNvbnN0IGdldExldHRlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBsZXR0ZXJWYWx1ZTtcblxuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyYXlbMV0pKSkge1xuICAgICAgY29uc3QgdHdvRGlnaXQgPSBhcnJheS5zbGljZSgwLCAyKTtcbiAgICAgIGxldHRlclZhbHVlID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0dGVyVmFsdWUgPSBhcnJheVswXTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2RlVmFsdWUgPSBwYXJzZUludChsZXR0ZXJWYWx1ZSk7XG4gICAgY29uc3QgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGNvZGVWYWx1ZSAtIDEpO1xuXG4gICAgcmV0dXJuIGxldHRlcjtcbiAgfTtcblxuICBjb25zdCBnZXROdW1iZXIgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgbnVtYmVyO1xuICAgIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyYXlbYXJyYXkubGVuZ3RoIC0gMl0pKSkge1xuICAgICAgY29uc3QgdHdvRGlnaXQgPSBhcnJheS5zbGljZShhcnJheS5sZW5ndGggLSAyKTtcbiAgICAgIG51bWJlciA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG51bWJlciA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHJldHVybiBudW1iZXI7XG4gIH07XG5cbiAgY29uc3QgbGV0dGVyID0gZ2V0TGV0dGVyKGFycik7XG4gIGNvbnN0IG51bWJlciA9IGdldE51bWJlcihhcnIpO1xuXG4gIHJldHVybiBsZXR0ZXIgKyBudW1iZXI7XG59O1xuIiwiaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHRcIjtcbmltcG9ydCB7IHVwZGF0ZURpc3BsYXlzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5c1wiO1xuaW1wb3J0IHsgcmVuZGVyR3JpZCwgcmVzZXRHcmlkRXZlbnRzIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL2NoZWNrV2luXCI7XG5pbXBvcnQgeyBjaGVja0ZvckNvbXB1dGVyIH0gZnJvbSBcIi4vY29tcHV0ZXJcIjtcbmltcG9ydCB7IHNob3dTY3JlZW4gfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3dpblNjcmVlblwiO1xuXG4vLyByYW5kb21seSBjaG9vc2VzIGEgcGxheWVyIHRvIGdvIGZpcnN0XG5leHBvcnQgY29uc3QgZmlyc3RUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcblxuICBpZiAobnVtYmVyICUgMiA9PT0gMCkge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IHRydWU7XG4gIH0gZWxzZSBpZiAobnVtYmVyICUgMiAhPT0gMCkge1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICB9XG59O1xuXG4vLyBjaGFuZ2VzIGN1cnJlbnQgcGxheWVyXG5leHBvcnQgY29uc3QgY2hhbmdlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vIGxldHMgdGhlIGN1cnJlbnQgcGxheWVyIG1ha2UgYW4gYXR0YWNrLCB0aGVuIGNoZWNrcyBmb3IgYSB3aW5uZXJcbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gMSkge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkLCB0YXJnZXQpO1xuXG4gICAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IDIpIHtcbiAgICAgICAgdHVybldvbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCAyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHR1cm5SZWd1bGFyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuXG4gIGlmIChjaGVja0ZvckNvbXB1dGVyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpKSB7XG4gICAgY29tcFR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb21wVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNlY29uZFBsYXllci5tYWtlQXR0YWNrKGZpcnN0UGxheWVyLmJvYXJkKTtcblxuICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gMikge1xuICAgICAgdHVybldvbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCAyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0dXJuUmVndWxhcihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCB0dXJuUmVndWxhciA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIGhpZ2hsaWdodChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlRGlzcGxheXMoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG59O1xuXG5jb25zdCB0dXJuV29uID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuICByZXNldEdyaWRFdmVudHMoZ3JpZDEpO1xuICByZXNldEdyaWRFdmVudHMoZ3JpZDIpO1xuICBzaG93U2NyZWVuKHdpbm5lcik7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSBcIi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlR3JpZFwiO1xuaW1wb3J0IHsgbWVudUV2ZW50cyB9IGZyb20gXCIuL0RPTS9pbnRlcmFjdGlvbi9tZW51XCI7XG5cbmNvbnN0IGRpc3BsYXlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXNwbGF5XCIpO1xuZGlzcGxheXMuZm9yRWFjaCgoeCkgPT4ge1xuICB4LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn0pO1xuXG5jb25zdCB3aW5TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbi1zY3JlZW5cIik7XG53aW5TY3JlZW4uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVsdGlwbGF5ZXItbWVudVwiKTtcbm11bHRpcGxheWVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZ3JpZFwiKTtcblxuY3JlYXRlR3JpZChwbGF5ZXJPbmVHcmlkLCAxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwgMik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=