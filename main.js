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

// Creates and adds event listeners for the placement phase.
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
  playerName.classList.add("placement-player-name");
  playerName.textContent = player.getName();
  const text = document.createElement("p");
  const warning = document.createElement("p");
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

  log(firstPlayer, secondPlayer);
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
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-1"), firstPlayer);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.renderGrid)(document.querySelectorAll(".grid-cell-2"), secondPlayer);
  const grid1 = document.getElementById("player-one-grid");
  const grid2 = document.getElementById("player-two-grid");
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.resetGridEvents)(grid1);
  (0,_DOM_interaction_grid__WEBPACK_IMPORTED_MODULE_2__.resetGridEvents)(grid2);
  (0,_DOM_interaction_winScreen__WEBPACK_IMPORTED_MODULE_5__.showScreen)(winner);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUSxtREFBUTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsRUFBRSxxRUFBUztBQUNYLEVBQUUsaUVBQVU7QUFDWixFQUFFLGlFQUFVO0FBQ1osRUFBRSwrRUFBYztBQUNoQjs7QUFFQTtBQUNBLEVBQUUsaUVBQVU7QUFDWixFQUFFLGlFQUFVO0FBQ1o7QUFDQTtBQUNBLEVBQUUsc0VBQWU7QUFDakIsRUFBRSxzRUFBZTtBQUNqQixFQUFFLHNFQUFVO0FBQ1o7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpREFBaUQ7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN2SEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDTDs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzRUFBVTtBQUNWLHNFQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZUdyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9jb21wb25lbnRzL2NyZWF0ZVBsYXllckRpc3BsYXlzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vZ3JpZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL21lbnUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9wbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL3dpblNjcmVlbi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZUdhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVBsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2NyZWF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tXaW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3R1cm4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBjcmVhdGVHcmlkID0gKGdyaWQsIGdyaWROdW0pID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMTsgaSArPSAxKSB7XG4gICAgY29uc3Qgcm93ID0gaTtcbiAgICBjb25zdCBncmlkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBncmlkUm93LmNsYXNzTGlzdC5hZGQoXCJncmlkLXJvd1wiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoYGdyaWQtY2VsbC0ke2dyaWROdW19YCk7XG4gICAgICBncmlkQ2VsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiLCBgJHtpfS0ke3Jvd31gKTtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICBncmlkUm93LmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcbiAgICB9XG5cbiAgICBncmlkLmFwcGVuZENoaWxkKGdyaWRSb3cpO1xuICB9XG5cbiAgY29uc3QgbGFiZWxSb3dzID0gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGVMaXN0ID0gW107XG4gICAgY29uc3Qgcm93cyA9IGdyaWQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDE7XG5cbiAgICByb3dzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIG5vZGVMaXN0LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG5cbiAgICAgIGlmIChlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpID09PSBcIjAtMFwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgY29uc3QgY2VsbENvb3JkaW5hdGUgPSBlLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICBpZiAoY2VsbENvb3JkaW5hdGUgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbmNvbnN0IHBsYXllclR3b0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZGlzcGxheVwiKTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllckRpc3BsYXkgPSAocGxheWVyLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZChcImRpc3BsYXktY29udFwiKTtcblxuICBjb25zdCBwbGF5ZXJOdW1EaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBwbGF5ZXJOdW1EaXNwbGF5LnRleHRDb250ZW50ID0gYFBMQVlFUiAke3BsYXllck51bX1gO1xuXG4gIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0dXJuLnNldEF0dHJpYnV0ZShcImlkXCIsIGB0dXJuLSR7cGxheWVyTnVtfWApO1xuXG4gIGlmIChwbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybi50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH1cblxuICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgc2hpcHMtJHtwbGF5ZXJOdW19YCk7XG4gIHNoaXBzLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7cGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcblxuICBjb25zdCB3aW5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHdpbnMuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSwgbmFtZSwgdHVybiwgc2hpcHMsIHdpbnMpO1xuXG4gIGlmIChwbGF5ZXJOdW0gPT09IDEpIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpIHtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfVxufTtcbiIsImltcG9ydCB7IHBhcnNlQ2VsbENvb3JkaW5hdGUgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9wYXJzZUNlbGxDb29yZGluYXRlXCI7XG5pbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3byB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVGdW5jdGlvbnNcIjtcbmltcG9ydCB7IHR1cm4gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90dXJuXCI7XG5pbXBvcnQgeyBjaGVja0ZvckNvbXB1dGVyIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvY29tcHV0ZXJcIjtcblxuY29uc3QgZ2V0R3JpZENvb3JkaW5hdGUgPSAoY2VsbCkgPT4ge1xuICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKSk7XG4gIHJldHVybiBjb29yZDtcbn07XG5cbi8vIHN0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vIHN0b3BzIGZ1bmN0aW9uIGlmIGl0cyBjb21wdXRlcnMgdHVyblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuICYmIGZpcnN0UGxheWVyLmNvbXB1dGVyKSB7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybiAmJiBzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIHN0b3BzIHBsYXllciBmcm9tIGludGVyYWN0aW5nIHdpdGggdGhlaXIgb3duIGdyaWRcbiAgaWYgKHBsYXllck9uZS5pc1R1cm4gJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJncmlkLWNlbGwtMVwiKSkge1xuICAgIHggPSB0cnVlO1xuICB9IGVsc2UgaWYgKHBsYXllclR3by5pc1R1cm4gJiYgY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJncmlkLWNlbGwtMlwiKSkge1xuICAgIHggPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHg7XG59O1xuXG4vLyBDaGVja3MgaWYgdGhlIGNlbGwgaXMgYSBsYWJlbFxuY29uc3QgY2hlY2tUaWVyID0gKGNlbGwpID0+IHtcbiAgY29uc3QgY2VsbElEID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgY29uc3QgY29vcmRpbmF0ZSA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbElEKTtcblxuICBpZiAoXG4gICAgY29vcmRpbmF0ZVswXSA9PT0gXCJAXCIgfHxcbiAgICAoY29vcmRpbmF0ZS5sZW5ndGggPT09IDIgJiYgY29vcmRpbmF0ZVsxXSA9PT0gXCIwXCIpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ3JpZEV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcblxuICBjZWxscy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihub2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGFkZCB0dXJuIGxpc3RlbmVyXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IGNvb3JkID0gZ2V0R3JpZENvb3JkaW5hdGUoY2VsbCk7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHVybihwbGF5ZXJPbmUsIHBsYXllclR3bywgY29vcmQpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG5cbiAgICAgIGlmIChncmlkTG9naWMocGxheWVyT25lLCBwbGF5ZXJUd28sIGNlbGwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGFuZCByZW1vdmUgY2xpY2sgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuXG4gICAgICBjZWxsLm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcbiAgICAgIH07XG5cbiAgICAgIGNlbGwub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtbW91c2Vkb3duXCIpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyR3JpZCA9IChjZWxscywgcGxheWVyLCBwbGFjaW5nID0gZmFsc2UpID0+IHtcbiAgaWYgKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgcmVzZXRHcmlkKGNlbGxzKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBmbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGZsZWV0QXJyID0gZmxlZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvb3JkID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShcbiAgICAgIGNlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIilcbiAgICApO1xuXG4gICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSAmJiBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIuKXj1wiO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAhZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmXG4gICAgICBwbGF5ZXIuYm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZClcbiAgICApIHtcbiAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIi9cIjtcbiAgICB9IGVsc2UgaWYgKHBsYXllci5jb21wdXRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY2hlY2tGb3JDb21wdXRlcihwbGF5ZXJPbmUsIHBsYXllclR3bykgfHwgcGxhY2luZykge1xuICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCLil4tcIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZXNldEdyaWQgPSAoY2VsbHMpID0+IHtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYWNlbWVudCBwaGFzZS5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBncmlkU3BhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWQtc3BhY2VcIik7XG4gIGNvbnN0IHBsYWNlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VtZW50LW1lbnVcIik7XG4gIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmUtYnRuXCIpO1xuICBwbGFjZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5ncmlkLWNlbGwtJHtwbGF5ZXJOdW19YCk7XG4gIGNvbnN0IHNpemVBcnIgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBheGlzID0gXCJ5XCI7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChjaGVja1RpZXIoY2VsbCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGlmIChzaXplQXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldENlbGwgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHRhcmdldENlbGxDb29yZGluYXRlID0gdGFyZ2V0Q2VsbC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIlxuICAgICAgKTtcbiAgICAgIGxldCBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHBsYXllck51bVxuICAgICAgKTtcblxuICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgaWYgKCFob3ZlckNlbGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YXJnZXRDZWxsLm9ubW91c2VsZWF2ZSA9IChlKSA9PiB7XG4gICAgICAgIGNlbGxzLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICBjLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gY2hhbmdlIGF4aXMgb24gcmlnaHQgY2xpY2tcbiAgICAgIGdyaWRTcGFjZS5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgICAgaWYgKGhvdmVyQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICBheGlzID0gXCJ4XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICBheGlzID0gXCJ5XCI7XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckNlbGxzID0gZ2V0SG92ZXJDZWxscyhcbiAgICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgICBzaXplQXJyWzBdLFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgcGxheWVyTnVtXG4gICAgICAgICk7XG5cbiAgICAgICAgaG92ZXJDZWxscy5mb3JFYWNoKChob3ZlckNlbGwpID0+IHtcbiAgICAgICAgICBpZiAoaG92ZXJDZWxsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaG92ZXJDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGwtaG92ZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gcGxhY2Ugc2hpcFxuICAgICAgdGFyZ2V0Q2VsbC5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgaWYgKGhvdmVyQ2VsbHMuaW5jbHVkZXMobnVsbCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk9VVCBPRiBCT1VORFMuXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmbGVldEFyciA9IFtdO1xuXG4gICAgICAgIGlmICghKHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgIGZsZWV0QXJyID0gcGxheWVyLmJvYXJkXG4gICAgICAgICAgICAuZmxlZXRDb29yZGluYXRlcygpXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG92ZXJDZWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGNlbGxDb29yZCA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG5cbiAgICAgICAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMocGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsQ29vcmQpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3ZlckNlbGxzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gaG92ZXJDZWxsc1tpXS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoYXR0cmlidXRlKTtcbiAgICAgICAgICBjb29yZEFyci5wdXNoKGNvb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZEFycik7XG4gICAgICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuICAgICAgICAvLyByZXJlbmRlciBob3ZlcmNlbGxzIGZvciBob3ZlciB2aXN1YWxcbiAgICAgICAgcmVuZGVyR3JpZChjZWxscywgcGxheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoc2l6ZUFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gcmV0dXJucyBub2RlIGxpc3RcbmNvbnN0IGdldEhvdmVyQ2VsbHMgPSAoc3RhcnQsIHNpemUsIGF4aXMsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBob3ZlckNlbGxzID0gW107XG4gIGNvbnN0IHN0YXJ0QXJyID0gc3RhcnQuc3BsaXQoXCJcIik7XG4gIGxldCB4ID0gZ2V0WChzdGFydEFycik7XG4gIHggPSBwYXJzZUludCh4KTtcbiAgbGV0IHkgPSBnZXRZKHN0YXJ0QXJyKTtcbiAgeSA9IHBhcnNlSW50KHkpO1xuXG4gIGlmIChheGlzID09PSBcInhcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWCA9IHggKyBpICsgXCItXCIgKyB5O1xuICAgICAgaG92ZXJDZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuZ3JpZC0ke3BsYXllck51bX0gW2RhdGEtY2VsbC1jb29yZGluYXRlPVwiJHtjZWxsWH1cIl1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxZID0geCArIFwiLVwiICsgKHkgKyBpKTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFl9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3ZlckNlbGxzO1xufTtcblxuY29uc3QgZ2V0WCA9IChhcnIpID0+IHtcbiAgbGV0IHg7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyWzFdKSkpIHtcbiAgICBjb25zdCB0d29EaWdpdCA9IGFyci5zbGljZSgwLCAyKTtcbiAgICB4ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB4ID0gYXJyWzBdO1xuICB9XG4gIHJldHVybiB4O1xufTtcblxuY29uc3QgZ2V0WSA9IChhcnIpID0+IHtcbiAgbGV0IHk7XG4gIGlmICghaXNOYU4ocGFyc2VJbnQoYXJyW2Fyci5sZW5ndGggLSAyXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoYXJyLmxlbmd0aCAtIDIpO1xuICAgIHkgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIHkgPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiB5O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0R3JpZEV2ZW50cyA9IChncmlkKSA9PiB7XG4gIGNvbnN0IGdyaWRDbG9uZSA9IGdyaWQuY2xvbmVOb2RlKHRydWUpO1xuICBncmlkLnJlcGxhY2VXaXRoKGdyaWRDbG9uZSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGhpZ2hsaWdodCA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZGlzcGxheVwiKTtcbiAgY29uc3QgcGxheWVyVHdvRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1kaXNwbGF5XCIpO1xuICBjb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuICBjb25zdCBncmlkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG4gIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBncmlkMS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcIndhaXRpbmctcGxheWVyXCIpO1xuICBncmlkMi5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG5cbiAgaWYgKFxuICAgIGZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwICYmXG4gICAgc2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzKCkubGVuZ3RoID09PSAwXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDIuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICBncmlkMS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIH1cbn07XG4iLCJpbXBvcnQge1xuICBnYW1lU2V0dXAsXG4gIGdhbWVTdGFydCxcbiAgcGxheWVyT25lLFxuICBwbGF5ZXJUd28sXG59IGZyb20gXCIuLi8uLi9tb2R1bGVzL2dhbWVGdW5jdGlvbnNcIjtcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlLCByZW5kZXJHcmlkLCByZXNldEdyaWRFdmVudHMgfSBmcm9tIFwiLi9ncmlkXCI7XG5pbXBvcnQgeyBjb21wdXRlclBsYWNlbWVudCB9IGZyb20gXCIuLi8uLi9tb2R1bGVzL2NvbXB1dGVyXCI7XG5cbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1idG5cIik7XG5cbnJlc2V0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGlmICghcGxheWVyT25lICYmICFwbGF5ZXJUd28pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59O1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVsdGlwbGF5ZXItbWVudVwiKTtcbmNvbnN0IG5hbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lLW1lbnVcIik7XG5jb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudC1tZW51XCIpO1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpbmdsZS1wbGF5ZXItYnRuXCIpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0d28tcGxheWVyLWJ0blwiKTtcbmNvbnN0IHBsYXllclR3b0NvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tY29udFwiKTtcblxuY29uc3QgcGxheWVyT25lTmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLW5hbWVcIik7XG5jb25zdCBwbGF5ZXJUd29OYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tbmFtZVwiKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1idG5cIik7XG5jb25zdCBkb25lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb25lLWJ0blwiKTtcblxuY29uc3QgZGlzcGxheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXlcIik7XG5cbmxldCBpc011bHRpcGxheWVyID0gZmFsc2U7XG5cbmNvbnN0IGhpZGUgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxuY29uc3Qgc2hvdyA9IChlbCkgPT4ge1xuICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufTtcblxuY29uc3QgZ2V0TmFtZXMgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck9uZU5hbWUgPSBwbGF5ZXJPbmVOYW1lRWwudmFsdWUudHJpbSgpO1xuICBsZXQgcGxheWVyVHdvTmFtZSA9IHBsYXllclR3b05hbWVFbC52YWx1ZS50cmltKCk7XG5cbiAgaWYgKCFpc011bHRpcGxheWVyKSB7XG4gICAgcGxheWVyVHdvTmFtZSA9IFwiY29tcHV0ZXJcIjtcbiAgfVxuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxhY2VtZW50VGV4dCA9IChwbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxhY2VtZW50VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2VtZW50LXRleHRcIik7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIHBsYXllck5hbWUuY2xhc3NMaXN0LmFkZChcInBsYWNlbWVudC1wbGF5ZXItbmFtZVwiKTtcbiAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllci5nZXROYW1lKCk7XG4gIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgd2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0ZXh0LnRleHRDb250ZW50ID1cbiAgICBcIlBsYWNlIHlvdXIgc2hpcHMgYnkgY2xpY2tpbmcgb24geW91ciBnYW1lYm9hcmQuIFJpZ2h0IGNsaWNrIHRvIGNoYW5nZSB0aGUgc2hpcHMgYXhpcy5cIjtcbiAgd2FybmluZy50ZXh0Q29udGVudCA9XG4gICAgXCJJZiB5b3UncmUgcGxheWluZyB3aXRoIGFub3RoZXIgcGVyc29uIG1ha2Ugc3VyZSB0aGV5IGFyZW4ndCBsb29raW5nIVwiO1xuICBwbGFjZW1lbnRUZXh0LmFwcGVuZChwbGF5ZXJOYW1lLCB0ZXh0LCB3YXJuaW5nKTtcbn07XG5cbmNvbnN0IHJlbW92ZVBsYWNlbWVudFRleHQgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYWNlbWVudFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudC10ZXh0XCIpO1xuICBwbGFjZW1lbnRUZXh0LmlubmVySFRNTCA9IFwiXCI7XG59O1xuXG5jb25zdCBkb25lUGxhY2VtZW50ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgcmVtb3ZlUGxhY2VtZW50VGV4dCgpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuXG4gIGNvbnN0IGZpcnN0RmxlZXQgPSBmaXJzdFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IHNlY29uZEZsZWV0ID0gc2Vjb25kUGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKTtcblxuICBpZiAoZmlyc3RGbGVldC5sZW5ndGggPT09IDUgJiYgc2Vjb25kRmxlZXQubGVuZ3RoID09PSAwKSB7XG4gICAgY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbiAgICByZXNldEdyaWRFdmVudHMoZ3JpZDEpO1xuXG4gICAgaWYgKHNlY29uZFBsYXllci5jb21wdXRlcikge1xuICAgICAgY29tcHV0ZXJQbGFjZW1lbnQoc2Vjb25kUGxheWVyLCBbNSwgNCwgMywgMywgMl0pO1xuICAgICAgaGlkZShwbGFjZW1lbnQpO1xuICAgICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICAgICAgZ2FtZVN0YXJ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVBsYWNlbWVudFRleHQoc2Vjb25kUGxheWVyKTtcbiAgICAgIHBsYWNlbWVudFBoYXNlKHNlY29uZFBsYXllciwgMik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZpcnN0RmxlZXQubGVuZ3RoID09PSA1ICYmIHNlY29uZEZsZWV0Lmxlbmd0aCA9PT0gNSkge1xuICAgIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG4gICAgcmVzZXRHcmlkRXZlbnRzKGdyaWQyKTtcbiAgICBoaWRlKHBsYWNlbWVudCk7XG4gICAgZ2FtZVN0YXJ0KCk7XG4gIH1cbn07XG5cbmNvbnN0IHN0YXJ0U2V0dXAgPSAoKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWVzID0gZ2V0TmFtZXMoKTtcbiAgY29uc3QgbmFtZU9uZSA9IHBsYXllck5hbWVzWzBdO1xuICBjb25zdCBuYW1lVHdvID0gcGxheWVyTmFtZXNbMV07XG5cbiAgaWYgKG5hbWVPbmUgPT09IFwiXCIgfHwgbmFtZVR3byA9PT0gXCJcIikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRpc3BsYXlzLmZvckVhY2goKGRpc3BsYXkpID0+IHtcbiAgICBkaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICB9KTtcblxuICBoaWRlKG5hbWVzKTtcblxuICBnYW1lU2V0dXAobmFtZU9uZSwgbmFtZVR3byk7XG4gIHBsYXllck9uZU5hbWVFbC52YWx1ZSA9IFwiXCI7XG4gIHBsYXllclR3b05hbWVFbC52YWx1ZSA9IFwiXCI7XG59O1xuXG5jb25zdCBtdWx0aXBsYXllck1lbnUgPSAoZSkgPT4ge1xuICBoaWRlKHBsYXllclR3b0NvbnQpO1xuXG4gIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gXCJ0d28tcGxheWVyLWJ0blwiKSB7XG4gICAgcGxheWVyVHdvQ29udC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgaXNNdWx0aXBsYXllciA9IHRydWU7XG4gIH1cblxuICBoaWRlKG11bHRpcGxheWVyKTtcbiAgc2hvdyhuYW1lcyk7XG59O1xuXG4vLyBtZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuICBzaW5nbGVQbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG11bHRpcGxheWVyTWVudSk7XG4gIHR3b1BsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbXVsdGlwbGF5ZXJNZW51KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHN0YXJ0U2V0dXAoKTtcbiAgfSk7XG5cbiAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgIHN0YXJ0U2V0dXAoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgc3RhcnRTZXR1cCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcGxheWVyVHdvTmFtZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBzdGFydFNldHVwKCk7XG4gICAgfVxuICB9KTtcblxuICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9uZVBsYWNlbWVudChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH0pO1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCB1cGRhdGVEaXNwbGF5cyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIHVwZGF0ZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZVNoaXBzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVXaW5zKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuY29uc3QgdXBkYXRlVHVybiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHR1cm4xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuLTFcIik7XG4gIGNvbnN0IHR1cm4yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuLTJcIik7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9IFwiQVRUQUNLSU5HLi4uXCI7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSBcIldBSVRJTkcuLi5cIjtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybjIudGV4dENvbnRlbnQgPSBcIkFUVEFDS0lORy4uLlwiO1xuICAgIHR1cm4xLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVNoaXBzID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgc2hpcHMxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy0xXCIpO1xuICBjb25zdCBzaGlwczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLTJcIik7XG4gIHNoaXBzMS50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke2ZpcnN0UGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbiAgc2hpcHMyLnRleHRDb250ZW50ID0gYFNoaXBzIGxlZnQ6ICR7c2Vjb25kUGxheWVyLmJvYXJkLmdldFNoaXBzUmVtYWluaW5nKCl9YDtcbn07XG5cbmNvbnN0IHVwZGF0ZVdpbnMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB3aW5zMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lucy0xXCIpO1xuICBjb25zdCB3aW5zMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lucy0yXCIpO1xuICB3aW5zMS50ZXh0Q29udGVudCA9IGBXaW5zOiAke2ZpcnN0UGxheWVyLmdldFdpbnMoKX1gO1xuICB3aW5zMi50ZXh0Q29udGVudCA9IGBXaW5zOiAke3NlY29uZFBsYXllci5nZXRXaW5zKCl9YDtcbn07XG4iLCJpbXBvcnQgeyBwbGF5ZXJPbmUsIHBsYXllclR3bywgZ2FtZVJlc3RhcnQgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lRnVuY3Rpb25zXCI7XG5cbmNvbnN0IHdpblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luLXNjcmVlblwiKTtcbmNvbnN0IHdpbkNvbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbi1jb250XCIpO1xuXG5leHBvcnQgY29uc3Qgc2hvd1NjcmVlbiA9ICh3aW5uZXIpID0+IHtcbiAgbGV0IHdpbm5lck5hbWU7XG5cbiAgaWYgKHdpbm5lciA9PT0gMSkge1xuICAgIHdpbm5lck5hbWUgPSBwbGF5ZXJPbmUuZ2V0TmFtZSgpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gMikge1xuICAgIHdpbm5lck5hbWUgPSBwbGF5ZXJUd28uZ2V0TmFtZSgpO1xuICB9XG5cbiAgd2luU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICBjb25zdCB3aW5uZXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIHdpbm5lclRleHQudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJOYW1lfSB3b24hYDtcbiAgY29uc3Qgb2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBva0J0bi50ZXh0Q29udGVudCA9IFwiU1RBUlQgTkVXIEdBTUVcIjtcblxuICBva0J0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGdhbWVSZXN0YXJ0KCk7XG4gICAgcmVtb3ZlU2NyZWVuKCk7XG4gIH07XG5cbiAgd2luQ29udC5hcHBlbmQod2lubmVyVGV4dCwgb2tCdG4pO1xufTtcblxuY29uc3QgcmVtb3ZlU2NyZWVuID0gKCkgPT4ge1xuICB3aW5Db250LmlubmVySFRNTCA9IFwiXCI7XG4gIHdpblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh0YXJnZXQpID0+IHtcbiAgICBjb25zdCBzaGlwSW5kZXggPSBzaGlwcy5maW5kSW5kZXgoKHNoaXApID0+IHtcbiAgICAgIHJldHVybiBzaGlwLmNvb3JkaW5hdGVzLmluY2x1ZGVzKHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2hpcEluZGV4ID4gLTEpIHtcbiAgICAgIHNoaXBzW3NoaXBJbmRleF0uaGl0KCk7XG4gICAgfVxuXG4gICAgYXR0YWNrcy5wdXNoKHRhcmdldCk7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBzO1xuICB9O1xuXG4gIGNvbnN0IGZsZWV0Q29vcmRpbmF0ZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgYXJyLnB1c2goc2hpcHNbaV0uY29vcmRpbmF0ZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcHNSZW1haW5pbmcgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBzaGlwc1N1bmsgKz0gMTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzaGlwcy5sZW5ndGggLSBzaGlwc1N1bms7XG4gIH07XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiB7XG4gICAgaWYgKHNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVzZXRBcnJheSA9IChhcnIpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlc2V0QXJyYXkoc2hpcHMpO1xuICAgIHJlc2V0QXJyYXkoYXR0YWNrcyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2tzLFxuICAgIHBsYWNlLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0U2hpcHMsXG4gICAgZmxlZXRDb29yZGluYXRlcyxcbiAgICBnZXRTaGlwc1JlbWFpbmluZyxcbiAgICBpc0ZsZWV0U3VuayxcbiAgICByZXNldCxcbiAgfTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9jcmVhdGVHYW1lYm9hcmRcIjtcbmltcG9ydCB7IGNvbXB1dGVyQXR0YWNrIH0gZnJvbSBcIi4uL21vZHVsZXMvY29tcHV0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXJOYW1lLCBpc0NvbXAgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBuYW1lID0gcGxheWVyTmFtZTtcbiAgY29uc3QgY29tcHV0ZXIgPSBpc0NvbXA7XG4gIGNvbnN0IGJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGlzVHVybiA9IGZhbHNlO1xuICBsZXQgd2lucyA9IDA7XG5cbiAgY29uc3QgbWFrZUF0dGFjayA9IChlbmVteUJvYXJkLCBjb29yZGluYXRlcyA9IG51bGwpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gY29vcmRpbmF0ZXM7XG5cbiAgICBpZiAoY29tcHV0ZXIpIHtcbiAgICAgIHRhcmdldCA9IGNvbXB1dGVyQXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH07XG5cbiAgY29uc3Qgd29uID0gKCkgPT4ge1xuICAgIHdpbnMgKz0gMTtcbiAgfTtcblxuICBjb25zdCBnZXRXaW5zID0gKCkgPT4ge1xuICAgIHJldHVybiB3aW5zO1xuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBjb21wdXRlciwgaXNUdXJuLCBtYWtlQXR0YWNrLCBnZXROYW1lLCB3b24sIGdldFdpbnMgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlQXJyYXkpID0+IHtcbiAgY29uc3QgY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlQXJyYXk7XG4gIGNvbnN0IGxlbmd0aCA9IGNvb3JkaW5hdGVBcnJheS5sZW5ndGg7XG4gIGxldCBkYW1hZ2UgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBkYW1hZ2UgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgaWYgKGxlbmd0aCA9PT0gZGFtYWdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXREYW1hZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRhbWFnZTtcbiAgfTtcblxuICByZXR1cm4geyBjb29yZGluYXRlcywgaGl0LCBpc1N1bmssIGdldERhbWFnZSB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBjaGVja1dpbiA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChzZWNvbmRQbGF5ZXIuYm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgIGZpcnN0UGxheWVyLndvbigpO1xuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKGZpcnN0UGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICBzZWNvbmRQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuIDI7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlclBsYWNlbWVudCA9IChwbGF5ZXIsIHNpemVBcnIpID0+IHtcbiAgY29uc3QgbnVtYmVyT2ZTaGlwcyA9IHNpemVBcnIubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZTaGlwczsgaSArPSAxKSB7XG4gICAgbGV0IGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMocGxheWVyLCBzaXplQXJyWzBdKTtcbiAgICBjb25zdCBjdXJyZW50RmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgIGxldCBmbGVldEFycjtcblxuICAgIGlmIChjdXJyZW50RmxlZXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICBmbGVldEFyciA9IGN1cnJlbnRGbGVldC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgIH1cblxuICAgIHdoaWxlIChjaGVja0Nvb3JkaW5hdGVzKGNvb3JkcywgZmxlZXRBcnIpKSB7XG4gICAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllciwgc2l6ZUFyclswXSk7XG4gICAgfVxuXG4gICAgcGxheWVyLmJvYXJkLnBsYWNlKGNvb3Jkcyk7XG4gICAgc2l6ZUFyci5zaGlmdCgpO1xuICB9XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBwbGF5ZXIpO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDb29yZGluYXRlcyA9IChwbGF5ZXIsIHNpemUpID0+IHtcbiAgY29uc3QgYXhpcyA9IGdlbmVyYXRlQXhpcygpO1xuICBjb25zdCBzdGFydCA9IGdlbmVyYXRlU3RhcnQoKTtcbiAgY29uc3QgeCA9IHN0YXJ0WzBdO1xuICBjb25zdCB5ID0gc3RhcnRbMV07XG4gIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgLy8gaW5jcmVtZW50IGxldHRlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0geC5jaGFyQ29kZUF0KDApO1xuICAgICAgY29uc3QgY2VsbFggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgKyBpKSArIHk7XG4gICAgICBjb29yZEFyci5wdXNoKGNlbGxYKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAvLyBpbmNyZW1lbnQgbnVtYmVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxZID0geCArICh5ICsgaSk7XG4gICAgICBjb29yZEFyci5wdXNoKGNlbGxZKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29vcmRBcnI7XG59O1xuXG4vLyByZXR1cm4gdHJ1ZSBpZiBjb29yZGluYXRlcyBhcmUgaW52YWxpZFxuY29uc3QgY2hlY2tDb29yZGluYXRlcyA9IChjb29yZGluYXRlcywgZmxlZXQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChmbGVldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKGZsZWV0LmluY2x1ZGVzKGNvb3JkaW5hdGVzW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgW2xldHRlciwgLi4ucmVzdF0gPSBjb29yZGluYXRlc1swXTtcbiAgY29uc3QgeCA9IGxldHRlcjtcbiAgY29uc3QgeSA9IHBhcnNlSW50KHJlc3Quam9pbihcIlwiKSk7XG5cbiAgaWYgKHguY2hhckNvZGVBdCgwKSArIChjb29yZGluYXRlcy5sZW5ndGggLSAxKSA+IDc0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoeSArIChjb29yZGluYXRlcy5sZW5ndGggLSAxKSA+IDEwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmNvbnN0IGdlbmVyYXRlQXhpcyA9ICgpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgbGV0IGF4aXM7XG5cbiAgaWYgKG51bWJlciAlIDIgPT09IDApIHtcbiAgICBheGlzID0gXCJ4XCI7XG4gIH0gZWxzZSBpZiAobnVtYmVyICUgMiAhPT0gMCkge1xuICAgIGF4aXMgPSBcInlcIjtcbiAgfVxuXG4gIHJldHVybiBheGlzO1xufTtcblxuY29uc3QgZ2VuZXJhdGVTdGFydCA9ICgpID0+IHtcbiAgY29uc3QgZ2VuZXJhdGVDaGFyQ29kZSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc0IC0gNjUgKyAxKSkgKyA2NTtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG5cbiAgcmV0dXJuIFtsZXR0ZXIsIG51bWJlcl07XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tGb3JDb21wdXRlciA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5jb21wdXRlciB8fCBzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjb21wdXRlckF0dGFjayA9IChlbmVteUJvYXJkLCBnZW4gPSAxKSA9PiB7XG4gIGNvbnN0IGhpdHMgPSBbXTtcbiAgY29uc3Qgc2hpcHMgPSBlbmVteUJvYXJkLmdldFNoaXBzKCk7XG4gIGxldCB0YXJnZXQ7XG5cbiAgLy8gY2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgdGFyZ2V0cyBhZGphY2VudCB0byBjdXJyZW50IGhpdHNcbiAgY29uc3QgdGFyZ2V0QWRqYWNlbnQgPSAoKSA9PiB7XG4gICAgLy8gcG9wdWxhdGVzIGhpdHMgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZW15Qm9hcmQuYXR0YWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgYXRrID0gZW5lbXlCb2FyZC5hdHRhY2tzW2ldO1xuICAgICAgY29uc3QgZmxlZXRBcnIgPSBlbmVteUJvYXJkXG4gICAgICAgIC5mbGVldENvb3JkaW5hdGVzKClcbiAgICAgICAgLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG5cbiAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhhdGspICYmICFoaXRzLmluY2x1ZGVzKGF0aykpIHtcbiAgICAgICAgaGl0cy5wdXNoKGF0ayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGhpdHMgdGhhdCBhcmUgb24gc3VuayBzaGlwc1xuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyhoaXRzW2ldKSkge1xuICAgICAgICAgICAgbGlzdC5wdXNoKGhpdHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5jb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gaGl0cy5pbmRleE9mKGxpc3RbMF0pO1xuICAgICAgICAgIGhpdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHJldHVybnMgdmFsaWQgdGFyZ2V0IGFkamFjZW50IHRvIHRoZSBpbnB1dCBjb29yZGluYXRlXG4gICAgY29uc3QgZ2V0QWRqYWNlbnQgPSAoaW5wdXRDb29yZCkgPT4ge1xuICAgICAgY29uc3QgW2EsIC4uLnJlc3RdID0gaW5wdXRDb29yZDtcbiAgICAgIGNvbnN0IGNoYXIgPSBhO1xuICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgIGlmIChjb2RlICsgMSA8PSA3NCkge1xuICAgICAgICBjb25zdCBjb29yZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIDEpICsgbnVtO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY29kZSAtIDEgPj0gNjUpIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgLSAxKSArIG51bTtcblxuICAgICAgICBpZiAoIWVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG51bSArIDEgPD0gMTApIHtcbiAgICAgICAgY29uc3QgY29vcmQgPSBjaGFyICsgKG51bSArIDEpO1xuXG4gICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgIHJldHVybiBjb29yZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobnVtIC0gMSA+PSAxKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkID0gY2hhciArIChudW0gLSAxKTtcblxuICAgICAgICBpZiAoIWVuZW15Qm9hcmQuYXR0YWNrcy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBhZGphY2VudCA9IGdldEFkamFjZW50KGhpdHNbaV0pO1xuXG4gICAgICBpZiAoYWRqYWNlbnQpIHtcbiAgICAgICAgdGFyZ2V0ID0gYWRqYWNlbnQ7XG4gICAgICAgIHJldHVybiBhZGphY2VudDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdGFyZ2V0QWRqYWNlbnQoKTtcblxuICBpZiAoaGl0cy5sZW5ndGggIT09IDApIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLy8gaWYgdGhlcmUgYXJlIG5vIGFkamFjZW50IHRhcmdldHMgdGhpcyBnZW5lcmF0ZXMgYSBuZXcgdGFyZ2V0XG4gIGNvbnN0IGdlbmVyYXRlQXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc0IC0gNjUgKyAxKSkgKyA2NTtcbiAgICB9O1xuXG4gICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG5cbiAgICAvLyByZW1ha2VzIGF0dGFjayBpZiB0YXJnZXQgaGFzIGFscmVhZHkgYmVlbiBoaXRcbiAgICBpZiAoZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIGRvIHtcbiAgICAgICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgICBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgICB0YXJnZXQgPSBsZXR0ZXIgKyBudW1iZXI7XG4gICAgICB9IHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgfVxuICB9O1xuXG4gIGdlbmVyYXRlQXR0YWNrKCk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tIFwiLi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7XG4gIGdyaWRFdmVudHMsXG4gIHJlbmRlckdyaWQsXG4gIHBsYWNlbWVudFBoYXNlLFxufSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGNyZWF0ZVBsYWNlbWVudFRleHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcbmltcG9ydCB7IGNoYW5nZVR1cm4sIGZpcnN0VHVybiwgY29tcFR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5cbmV4cG9ydCBsZXQgcGxheWVyT25lLCBwbGF5ZXJUd287XG5cbmV4cG9ydCBjb25zdCBnYW1lU2V0dXAgPSAobmFtZU9uZSwgbmFtZVR3bykgPT4ge1xuICBpZiAoIXBsYXllck9uZSB8fCAhcGxheWVyVHdvKSB7XG4gICAgbGV0IHggPSBmYWxzZTtcblxuICAgIGlmIChuYW1lVHdvID09PSBcImNvbXB1dGVyXCIpIHtcbiAgICAgIHggPSB0cnVlO1xuICAgIH1cblxuICAgIHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihuYW1lT25lKTtcbiAgICBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIobmFtZVR3bywgeCk7XG4gICAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJPbmUsIDEpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyVHdvLCAyKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIGNyZWF0ZVBsYWNlbWVudFRleHQocGxheWVyT25lKTtcbiAgcGxhY2VtZW50UGhhc2UocGxheWVyT25lLCAxKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnYW1lU3RhcnQgPSAoKSA9PiB7XG4gIGdyaWRFdmVudHMoKTtcblxuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIHBsYXllck9uZSk7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgcGxheWVyVHdvKTtcblxuICBpZiAocGxheWVyT25lLmdldFdpbnMoKSA9PT0gMCAmJiBwbGF5ZXJUd28uZ2V0V2lucygpID09PSAwKSB7XG4gICAgZmlyc3RUdXJuKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgfVxuXG4gIHVwZGF0ZURpc3BsYXlzKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgaGlnaGxpZ2h0KHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuICBpZiAocGxheWVyVHdvLmNvbXB1dGVyICYmIHBsYXllclR3by5pc1R1cm4pIHtcbiAgICBjb21wVHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnYW1lUmVzdGFydCA9ICh3aW5uZXIpID0+IHtcbiAgaWYgKHdpbm5lciA9PT0gMSAmJiBwbGF5ZXJPbmUuaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH0gZWxzZSBpZiAod2lubmVyID09PSAyICYmIHBsYXllclR3by5pc1R1cm4pIHtcbiAgICBjaGFuZ2VUdXJuKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgfVxuXG4gIHBsYXllck9uZS5ib2FyZC5yZXNldCgpO1xuICBwbGF5ZXJUd28uYm9hcmQucmVzZXQoKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllclR3byk7XG4gIHVwZGF0ZURpc3BsYXlzKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgZ2FtZVNldHVwKCk7XG59O1xuIiwiLy8gaW5wdXQgY2VsbCBkYXRhIGF0dHJpYnV0ZS9vdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVsxXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsIDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgY29kZVZhbHVlIC0gMSk7XG5cbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGggLSAyXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aCAtIDIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgY29uc3QgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG5cbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkLCByZXNldEdyaWRFdmVudHMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGNoZWNrV2luIH0gZnJvbSBcIi4vY2hlY2tXaW5cIjtcbmltcG9ydCB7IGNoZWNrRm9yQ29tcHV0ZXIgfSBmcm9tIFwiLi9jb21wdXRlclwiO1xuaW1wb3J0IHsgc2hvd1NjcmVlbiB9IGZyb20gXCIuLi9ET00vaW50ZXJhY3Rpb24vd2luU2NyZWVuXCI7XG5cbi8vIHJhbmRvbWx5IGNob29zZXMgYSBwbGF5ZXIgdG8gZ28gZmlyc3RcbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuXG4gIGlmIChudW1iZXIgJSAyID09PSAwKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChudW1iZXIgJSAyICE9PSAwKSB7XG4gICAgc2Vjb25kUGxheWVyLmlzVHVybiA9IHRydWU7XG4gIH1cbn07XG5cbi8vIGNoYW5nZXMgY3VycmVudCBwbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICBmaXJzdFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSBmYWxzZTtcbiAgfVxufTtcblxuLy8gbGV0cyB0aGUgY3VycmVudCBwbGF5ZXIgbWFrZSBhbiBhdHRhY2ssIHRoZW4gY2hlY2tzIGZvciBhIHdpbm5lclxuZXhwb3J0IGNvbnN0IHR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgdGFyZ2V0KSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5pc1R1cm4pIHtcbiAgICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCwgdGFyZ2V0KTtcblxuICAgICAgaWYgKGNoZWNrV2luKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID09PSAxKSB7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgMSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGlmIChmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vjb25kUGxheWVyLm1ha2VBdHRhY2soZmlyc3RQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gMikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIDIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB0dXJuUmVndWxhcihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcblxuICBpZiAoY2hlY2tGb3JDb21wdXRlcihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSkge1xuICAgIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY29tcFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCk7XG5cbiAgICBpZiAoY2hlY2tXaW4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT09IDIpIHtcbiAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgMik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICAgIHR1cm5SZWd1bGFyKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IHR1cm5SZWd1bGFyID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgaGlnaGxpZ2h0KGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHR1cm5Xb24gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWdyaWRcIik7XG4gIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG4gIHJlc2V0R3JpZEV2ZW50cyhncmlkMSk7XG4gIHJlc2V0R3JpZEV2ZW50cyhncmlkMik7XG4gIHNob3dTY3JlZW4od2lubmVyKTtcbn07XG5cbmNvbnN0IGxvZyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGxldCB4ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpICs9IDEpIHtcbiAgICBpZiAoeCA9PT0gMCkge1xuICAgICAgY29uc3QgZmxlZXQgPSBmaXJzdFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciAxXCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJzdFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZmxlZXRbaV0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHNSZW1haW5pbmcoKSk7XG4gICAgICB4ICs9IDE7XG4gICAgfSBlbHNlIGlmICh4ID09PSAxKSB7XG4gICAgICBjb25zdCBmbGVldCA9IHNlY29uZFBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gICAgICBjb25zb2xlLmxvZyhcInBsYXllciAyXCIpO1xuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBpIDwgc2Vjb25kUGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGg7XG4gICAgICAgIGkgKz0gMVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGZsZWV0W2ldKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHNlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpKTtcbiAgICB9XG4gIH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkXCI7XG5pbXBvcnQgeyBtZW51RXZlbnRzIH0gZnJvbSBcIi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcblxuY29uc3QgZGlzcGxheXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXlcIik7XG5kaXNwbGF5cy5mb3JFYWNoKCh4KSA9PiB7XG4gIHguc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufSk7XG5cbmNvbnN0IHdpblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luLXNjcmVlblwiKTtcbndpblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbmNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtdWx0aXBsYXllci1tZW51XCIpO1xubXVsdGlwbGF5ZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuY29uc3QgcGxheWVyT25lR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1ncmlkXCIpO1xuY29uc3QgcGxheWVyVHdvR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1ncmlkXCIpO1xuXG5jcmVhdGVHcmlkKHBsYXllck9uZUdyaWQsIDEpO1xuY3JlYXRlR3JpZChwbGF5ZXJUd29HcmlkLCAyKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==