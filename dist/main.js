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

const renderGrid = (cells, player) => {
  if (player.board.fleetCoordinates().length === 0) {
    resetGrid(cells);
    return;
  };

  const fleet = player.board.fleetCoordinates();
  const fleetArr = fleet.reduce((acc, val) => acc.concat(val));

  cells.forEach((cell) => {
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
    };

    if (player.computer) {
      return;
    };

    if (
      (0,_modules_computer__WEBPACK_IMPORTED_MODULE_3__.checkForComputer)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerOne, _modules_gameStart__WEBPACK_IMPORTED_MODULE_1__.playerTwo) ||
      (player.board.attacks.length === 0 &&
        player.board.fleetCoordinates().length < 5)
    ) {
      if (fleetArr.includes(coord)) {
        cell.textContent = "○";
      };
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
        renderGrid(cells, player);

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

const donePlacement = () => {
  const grid = document.querySelector(".grid-1");
  const gridClone = grid.cloneNode(true);
  grid.replaceWith(gridClone);
  hide(placement);

  if (_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo.computer) {
    (0,_modules_computer__WEBPACK_IMPORTED_MODULE_2__.computerPlacement)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo, [5, 4, 3, 3, 2]);
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(document.querySelectorAll(".grid-cell-2"), _modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo);
  } else {
    (0,_grid__WEBPACK_IMPORTED_MODULE_1__.placementPhase)(_modules_gameStart__WEBPACK_IMPORTED_MODULE_0__.playerTwo, 2);
  }
};

const start = () => {
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

  startBtn.addEventListener("click", () => {
    start();
  });

  startBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      start();
    };
  });

  playerOneNameEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      start();
    };
  });

  doneBtn.addEventListener("click", () => {
    donePlacement();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDTDs7QUFFcEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0VBQVU7QUFDVixzRUFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vY29tcG9uZW50cy9jcmVhdGVQbGF5ZXJEaXNwbGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvRE9NL2ludGVyYWN0aW9uL2dyaWQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9oaWdobGlnaHQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0RPTS9pbnRlcmFjdGlvbi9tZW51LmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9ET00vaW50ZXJhY3Rpb24vcGxheWVyRGlzcGxheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVHYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NoZWNrV2luLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NvbXB1dGVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVSZXNldC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lU3RhcnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy90dXJuLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY3JlYXRlR3JpZCA9IChncmlkLCBncmlkTnVtKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTE7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJvdyA9IGk7XG4gICAgY29uc3QgZ3JpZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZ3JpZFJvdy5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1yb3dcIik7XG4gICAgZ3JpZFJvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZ3JpZC1yb3ctJHtpfWApO1xuICAgIGdyaWRSb3cuc2V0QXR0cmlidXRlKFwiZGF0YS1yb3ctbnVtYmVyXCIsIGAke2l9YCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDExOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKGBncmlkLWNlbGwtJHtncmlkTnVtfWApO1xuICAgICAgZ3JpZENlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIiwgYCR7aX0tJHtyb3d9YCk7XG4gICAgICBncmlkQ2VsbC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgZ3JpZFJvdy5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG4gICAgfVxuXG4gICAgZ3JpZC5hcHBlbmRDaGlsZChncmlkUm93KTtcbiAgfVxuXG4gIGNvbnN0IGxhYmVsUm93cyA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlTGlzdCA9IFtdO1xuICAgIGNvbnN0IHJvd3MgPSBncmlkLmNoaWxkTm9kZXM7XG5cbiAgICByb3dzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIG5vZGVMaXN0LnB1c2goZS5maXJzdENoaWxkKTtcbiAgICB9KTtcblxuICAgIGxldCBpID0gMTtcbiAgICBub2RlTGlzdC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBlLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICAgICAgaWYgKGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIikgPT09IFwiMC0wXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZS50ZXh0Q29udGVudCA9IGAke2l9YDtcbiAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBsYWJlbENvbHVtbnMgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZUxpc3QgPSBncmlkLmZpcnN0Q2hpbGQuY2hpbGROb2RlcztcbiAgICBsZXQgaSA9IDA7XG4gICAgbm9kZUxpc3QuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbiAgICAgIGNvbnN0IGNlbGxDb29yZGluYXRlID0gZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKTtcbiAgICAgIGlmIChjZWxsQ29vcmRpbmF0ZSA9PT0gXCIwLTBcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NSArIGkpfWA7XG4gICAgICBpICs9IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgbGFiZWxSb3dzKCk7XG4gIGxhYmVsQ29sdW1ucygpO1xufTtcbiIsImNvbnN0IHBsYXllck9uZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLW9uZS1kaXNwbGF5Jyk7XG5jb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28tZGlzcGxheScpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyRGlzcGxheSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnZGlzcGxheS1jb250Jyk7XG5cbiAgY29uc3QgcGxheWVyTnVtRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gIHBsYXllck51bURpc3BsYXkudGV4dENvbnRlbnQgPSBgUExBWUVSICR7cGxheWVyTnVtfWA7XG5cbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gIG5hbWUudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIuZ2V0TmFtZSgpfWA7XG5cbiAgY29uc3QgdHVybiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgdHVybi5zZXRBdHRyaWJ1dGUoJ2lkJywgYHR1cm4tJHtwbGF5ZXJOdW19YCk7XG5cbiAgaWYgKHBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ0FUVEFDS0lORy4uLic7XG4gIH0gZWxzZSBpZiAoIXBsYXllci5pc1R1cm4pIHtcbiAgICB0dXJuLnRleHRDb250ZW50ID0gJ1dBSVRJTkcuLi4nO1xuICB9O1xuXG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBzaGlwcy5zZXRBdHRyaWJ1dGUoJ2lkJywgYHNoaXBzLSR7cGxheWVyTnVtfWApO1xuICBzaGlwcy50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3BsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG5cbiAgY29uc3Qgd2lucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgd2lucy5zZXRBdHRyaWJ1dGUoJ2lkJywgYHdpbnMtJHtwbGF5ZXJOdW19YCk7XG4gIHdpbnMudGV4dENvbnRlbnQgPSBgV2luczogJHtwbGF5ZXIuZ2V0V2lucygpfWA7XG5cbiAgZGlzcGxheS5hcHBlbmQocGxheWVyTnVtRGlzcGxheSwgbmFtZSwgdHVybiwgc2hpcHMsIHdpbnMpO1xuXG4gIGlmIChwbGF5ZXJOdW0gPT09IDEpIHtcbiAgICBwbGF5ZXJPbmVEaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJOdW0gPT09IDIpIHtcbiAgICBwbGF5ZXJUd29EaXNwbGF5LmFwcGVuZChkaXNwbGF5KTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgeyBwYXJzZUNlbGxDb29yZGluYXRlIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvcGFyc2VDZWxsQ29vcmRpbmF0ZVwiO1xuaW1wb3J0IHsgcGxheWVyT25lLCBwbGF5ZXJUd28gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHR1cm4gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy90dXJuXCI7XG5pbXBvcnQgeyBjaGVja0ZvckNvbXB1dGVyIH0gZnJvbSBcIi4uLy4uL21vZHVsZXMvY29tcHV0ZXJcIjtcblxuY29uc3QgZ2V0R3JpZENvb3JkaW5hdGUgPSAoY2VsbCkgPT4ge1xuICBjb25zdCBjb29yZCA9IHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKSk7XG4gIHJldHVybiBjb29yZDtcbn07XG5cbi8vIHN0b3BzIHBsYXllcnMgZnJvbSBpbnRlcmFjdGluZyB3aXRoIGdyaWRzIHdoZW4gdGhleSBzaG91bGRuJ3QgYmVcbmNvbnN0IGdyaWRMb2dpYyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCBjZWxsKSA9PiB7XG4gIGxldCB4O1xuXG4gIC8vIHN0b3BzIGZ1bmN0aW9uIGlmIGl0cyBjb21wdXRlcnMgdHVyblxuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuICYmIGZpcnN0UGxheWVyLmNvbXB1dGVyKSB7XG4gICAgeCA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybiAmJiBzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcblxuICAvLyBzdG9wcyBwbGF5ZXIgZnJvbSBpbnRlcmFjdGluZyB3aXRoIHRoZWlyIG93biBncmlkXG4gIGlmIChwbGF5ZXJPbmUuaXNUdXJuICYmIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3JpZC1jZWxsLTFcIikpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwbGF5ZXJUd28uaXNUdXJuICYmIGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3JpZC1jZWxsLTJcIikpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geDtcbn07XG5cbi8vIENoZWNrcyBpZiB0aGUgY2VsbCBpcyBhIGxhYmVsXG5jb25zdCBjaGVja1RpZXIgPSAoY2VsbCkgPT4ge1xuICBjb25zdCBjZWxsSUQgPSBjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuICBjb25zdCBjb29yZGluYXRlID0gcGFyc2VDZWxsQ29vcmRpbmF0ZShjZWxsSUQpO1xuXG4gIGlmIChcbiAgICBjb29yZGluYXRlWzBdID09PSBcIkBcIiB8fFxuICAgIChjb29yZGluYXRlLmxlbmd0aCA9PT0gMiAmJiBjb29yZGluYXRlWzFdID09PSBcIjBcIilcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ3JpZEV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcblxuICBjZWxscy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihub2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICAvLyBhZGQgdHVybiBsaXN0ZW5lclxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCBjb29yZCA9IGdldEdyaWRDb29yZGluYXRlKGNlbGwpO1xuXG4gICAgICBpZiAoZ3JpZExvZ2ljKHBsYXllck9uZSwgcGxheWVyVHdvLCBjZWxsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICB0dXJuKHBsYXllck9uZSwgcGxheWVyVHdvLCBjb29yZCk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgaG92ZXIgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGhvdmVyIGNlbGwgdmlzdWFsXG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgY2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGFuZCByZW1vdmUgY2xpY2sgY2VsbCB2aXN1YWxcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcblxuICAgICAgaWYgKGdyaWRMb2dpYyhwbGF5ZXJPbmUsIHBsYXllclR3bywgY2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfTtcblxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcblxuICAgICAgY2VsbC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1tb3VzZWRvd25cIik7XG4gICAgICB9O1xuXG4gICAgICBjZWxsLm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1jZWxsLW1vdXNlZG93blwiKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckdyaWQgPSAoY2VsbHMsIHBsYXllcikgPT4ge1xuICBpZiAocGxheWVyLmJvYXJkLmZsZWV0Q29vcmRpbmF0ZXMoKS5sZW5ndGggPT09IDApIHtcbiAgICByZXNldEdyaWQoY2VsbHMpO1xuICAgIHJldHVybjtcbiAgfTtcblxuICBjb25zdCBmbGVldCA9IHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCk7XG4gIGNvbnN0IGZsZWV0QXJyID0gZmxlZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjLmNvbmNhdCh2YWwpKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKFxuICAgICAgY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiKVxuICAgICk7XG5cbiAgICBpZiAoZmxlZXRBcnIuaW5jbHVkZXMoY29vcmQpICYmIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4pePXCI7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICFmbGVldEFyci5pbmNsdWRlcyhjb29yZCkgJiZcbiAgICAgIHBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKVxuICAgICkge1xuICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiL1wiO1xuICAgIH07XG5cbiAgICBpZiAocGxheWVyLmNvbXB1dGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfTtcblxuICAgIGlmIChcbiAgICAgIGNoZWNrRm9yQ29tcHV0ZXIocGxheWVyT25lLCBwbGF5ZXJUd28pIHx8XG4gICAgICAocGxheWVyLmJvYXJkLmF0dGFja3MubGVuZ3RoID09PSAwICYmXG4gICAgICAgIHBsYXllci5ib2FyZC5mbGVldENvb3JkaW5hdGVzKCkubGVuZ3RoIDwgNSlcbiAgICApIHtcbiAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwi4peLXCI7XG4gICAgICB9O1xuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3QgcmVzZXRHcmlkID0gKGNlbGxzKSA9PiB7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAoY2hlY2tUaWVyKGNlbGwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICBjZWxsLnRleHRDb250ZW50ID0gbnVsbDtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHBsYWNlbWVudCBwaGFzZS5cbmV4cG9ydCBjb25zdCBwbGFjZW1lbnRQaGFzZSA9IChwbGF5ZXIsIHBsYXllck51bSkgPT4ge1xuICBjb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudFwiKTtcbiAgY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG9uZS1idG5cIik7XG4gIHBsYWNlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICBkb25lQnRuLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmdyaWQtY2VsbC0ke3BsYXllck51bX1gKTtcbiAgY29uc3Qgc2l6ZUFyciA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgbGV0IGF4aXMgPSBcInlcIjtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKGNoZWNrVGllcihjZWxsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgaWYgKHNpemVBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgdGFyZ2V0Q2VsbENvb3JkaW5hdGUgPSB0YXJnZXRDZWxsLmdldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLWNlbGwtY29vcmRpbmF0ZVwiXG4gICAgICApO1xuICAgICAgbGV0IGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICB0YXJnZXRDZWxsQ29vcmRpbmF0ZSxcbiAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgYXhpcyxcbiAgICAgICAgcGxheWVyTnVtXG4gICAgICApO1xuXG4gICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICBpZiAoIWhvdmVyQ2VsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRhcmdldENlbGwub25tb3VzZWxlYXZlID0gKGUpID0+IHtcbiAgICAgICAgY2VsbHMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICAgIGMuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBjaGFuZ2UgYXhpc1xuICAgICAgZG9jdW1lbnQub25jb250ZXh0bWVudSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBob3ZlckNlbGxzLmZvckVhY2goKGhvdmVyQ2VsbCkgPT4ge1xuICAgICAgICAgIGlmIChob3ZlckNlbGwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBob3ZlckNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtY2VsbC1ob3ZlclwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgICAgICAgYXhpcyA9IFwieFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICAgICAgYXhpcyA9IFwieVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaG92ZXJDZWxscyA9IGdldEhvdmVyQ2VsbHMoXG4gICAgICAgICAgdGFyZ2V0Q2VsbENvb3JkaW5hdGUsXG4gICAgICAgICAgc2l6ZUFyclswXSxcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBsYXllck51bVxuICAgICAgICApO1xuXG4gICAgICAgIGhvdmVyQ2VsbHMuZm9yRWFjaCgoaG92ZXJDZWxsKSA9PiB7XG4gICAgICAgICAgaWYgKGhvdmVyQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGhvdmVyQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsLWhvdmVyXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHBsYWNlIHNoaXBcbiAgICAgIHRhcmdldENlbGwub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmIChob3ZlckNlbGxzLmluY2x1ZGVzKG51bGwpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJPVVQgT0YgQk9VTkRTLlwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmxlZXRBcnIgPSBbXTtcblxuICAgICAgICBpZiAoIShwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICBmbGVldEFyciA9IHBsYXllci5ib2FyZFxuICAgICAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB2YWwpID0+IGFjYy5jb25jYXQodmFsKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdmVyQ2VsbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBjZWxsQ29vcmQgPSBob3ZlckNlbGxzW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtY2VsbC1jb29yZGluYXRlXCIpO1xuXG4gICAgICAgICAgaWYgKGZsZWV0QXJyLmluY2x1ZGVzKHBhcnNlQ2VsbENvb3JkaW5hdGUoY2VsbENvb3JkKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb29yZEFyciA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG92ZXJDZWxscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGhvdmVyQ2VsbHNbaV0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jZWxsLWNvb3JkaW5hdGVcIik7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBwYXJzZUNlbGxDb29yZGluYXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgY29vcmRBcnIucHVzaChjb29yZCk7XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2UoY29vcmRBcnIpO1xuICAgICAgICBzaXplQXJyLnNoaWZ0KCk7XG4gICAgICAgIGhvdmVyQ2VsbHMgPSBnZXRIb3ZlckNlbGxzKFxuICAgICAgICAgIHRhcmdldENlbGxDb29yZGluYXRlLFxuICAgICAgICAgIHNpemVBcnJbMF0sXG4gICAgICAgICAgYXhpcyxcbiAgICAgICAgICBwbGF5ZXJOdW1cbiAgICAgICAgKTtcbiAgICAgICAgLy8gcmVyZW5kZXIgaG92ZXJjZWxscyBmb3IgaG92ZXIgdmlzdWFsXG4gICAgICAgIHJlbmRlckdyaWQoY2VsbHMsIHBsYXllcik7XG5cbiAgICAgICAgaWYgKHNpemVBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZG9uZUJ0bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vIHJldHVybnMgbm9kZSBsaXN0XG5jb25zdCBnZXRIb3ZlckNlbGxzID0gKHN0YXJ0LCBzaXplLCBheGlzLCBwbGF5ZXJOdW0pID0+IHtcbiAgY29uc3QgaG92ZXJDZWxscyA9IFtdO1xuICBjb25zdCBzdGFydEFyciA9IHN0YXJ0LnNwbGl0KFwiXCIpO1xuICBsZXQgeCA9IGdldFgoc3RhcnRBcnIpO1xuICB4ID0gcGFyc2VJbnQoeCk7XG4gIGxldCB5ID0gZ2V0WShzdGFydEFycik7XG4gIHkgPSBwYXJzZUludCh5KTtcblxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2VsbFggPSB4ICsgaSArIFwiLVwiICsgeTtcbiAgICAgIGhvdmVyQ2VsbHMucHVzaChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLmdyaWQtJHtwbGF5ZXJOdW19IFtkYXRhLWNlbGwtY29vcmRpbmF0ZT1cIiR7Y2VsbFh9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChheGlzID09PSBcInlcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsWSA9IHggKyBcIi1cIiArICh5ICsgaSk7XG4gICAgICBob3ZlckNlbGxzLnB1c2goXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5ncmlkLSR7cGxheWVyTnVtfSBbZGF0YS1jZWxsLWNvb3JkaW5hdGU9XCIke2NlbGxZfVwiXWBcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG92ZXJDZWxscztcbn07XG5cbmNvbnN0IGdldFggPSAoYXJyKSA9PiB7XG4gIGxldCB4O1xuICBpZiAoIWlzTmFOKHBhcnNlSW50KGFyclsxXSkpKSB7XG4gICAgY29uc3QgdHdvRGlnaXQgPSBhcnIuc2xpY2UoMCwgMik7XG4gICAgeCA9IHR3b0RpZ2l0LmpvaW4oXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgeCA9IGFyclswXTtcbiAgfVxuICByZXR1cm4geDtcbn07XG5cbmNvbnN0IGdldFkgPSAoYXJyKSA9PiB7XG4gIGxldCB5O1xuICBpZiAoIWlzTmFOKHBhcnNlSW50KGFyclthcnIubGVuZ3RoIC0gMl0pKSkge1xuICAgIGNvbnN0IHR3b0RpZ2l0ID0gYXJyLnNsaWNlKGFyci5sZW5ndGggLSAyKTtcbiAgICB5ID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcbiAgfVxuICByZXR1cm4geTtcbn07XG4iLCJleHBvcnQgY29uc3QgaGlnaGxpZ2h0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3QgcGxheWVyT25lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLW9uZS1kaXNwbGF5XCIpO1xuICBjb25zdCBwbGF5ZXJUd29EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWRpc3BsYXlcIik7XG4gIGNvbnN0IGdyaWQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItb25lLWdyaWRcIik7XG4gIGNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItdHdvLWdyaWRcIik7XG5cbiAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIGdyaWQxLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgcGxheWVyVHdvRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gIGdyaWQyLmNsYXNzTGlzdC5yZW1vdmUoXCJ3YWl0aW5nLXBsYXllclwiKTtcblxuICBpZiAoXG4gICAgZmlyc3RQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDAgJiZcbiAgICBzZWNvbmRQbGF5ZXIuYm9hcmQuZ2V0U2hpcHMoKS5sZW5ndGggPT09IDBcbiAgKSB7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIGlmIChcbiAgICBmaXJzdFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMCAmJlxuICAgIHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgICBwbGF5ZXJUd29EaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgICB9IGVsc2UgaWYgKHNlY29uZFBsYXllci5pc1R1cm4pIHtcbiAgICAgIHBsYXllck9uZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH07XG5cbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIHBsYXllclR3b0Rpc3BsYXkuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICAgIGdyaWQyLmNsYXNzTGlzdC5hZGQoXCJ3YWl0aW5nLXBsYXllclwiKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgcGxheWVyT25lRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwid2FpdGluZy1wbGF5ZXJcIik7XG4gICAgZ3JpZDEuY2xhc3NMaXN0LmFkZChcIndhaXRpbmctcGxheWVyXCIpO1xuICB9O1xufTtcbiIsImltcG9ydCB7IHNldHVwLCBwbGF5ZXJUd28gfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9nYW1lU3RhcnRcIjtcbmltcG9ydCB7IHBsYWNlbWVudFBoYXNlLCByZW5kZXJHcmlkIH0gZnJvbSBcIi4vZ3JpZFwiO1xuaW1wb3J0IHsgY29tcHV0ZXJQbGFjZW1lbnQgfSBmcm9tIFwiLi4vLi4vbW9kdWxlcy9jb21wdXRlclwiO1xuXG5jb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXVsdGlwbGF5ZXJcIik7XG5jb25zdCBuYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZXNcIik7XG5jb25zdCBwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlbWVudFwiKTtcblxuY29uc3Qgc2luZ2xlUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaW5nbGUtcGxheWVyXCIpO1xuY29uc3QgdHdvUGxheWVyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0d28tcGxheWVyXCIpO1xuY29uc3QgcGxheWVyVHdvQ29udCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLXR3by1jb250XCIpO1xuXG5jb25zdCBwbGF5ZXJPbmVOYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtbmFtZVwiKTtcbmNvbnN0IHBsYXllclR3b05hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvLW5hbWUnKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydFwiKTtcbmNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvbmUtYnRuXCIpO1xuXG5sZXQgaXNNdWx0aXBsYXllciA9IGZhbHNlO1xuXG5jb25zdCBoaWRlID0gKGVsKSA9PiB7XG4gIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cbmNvbnN0IHNob3cgPSAoZWwpID0+IHtcbiAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59O1xuXG5jb25zdCBnZXROYW1lcyA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyT25lTmFtZSA9IHBsYXllck9uZU5hbWVFbC52YWx1ZTtcbiAgbGV0IHBsYXllclR3b05hbWUgPSBwbGF5ZXJUd29OYW1lRWwudmFsdWU7XG5cbiAgaWYoIWlzTXVsdGlwbGF5ZXIpe1xuICAgIHBsYXllclR3b05hbWUgPSAnY29tcHV0ZXInO1xuICB9O1xuXG4gIHJldHVybiBbcGxheWVyT25lTmFtZSwgcGxheWVyVHdvTmFtZV07XG59O1xuXG5jb25zdCBkb25lUGxhY2VtZW50ID0gKCkgPT4ge1xuICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ncmlkLTFcIik7XG4gIGNvbnN0IGdyaWRDbG9uZSA9IGdyaWQuY2xvbmVOb2RlKHRydWUpO1xuICBncmlkLnJlcGxhY2VXaXRoKGdyaWRDbG9uZSk7XG4gIGhpZGUocGxhY2VtZW50KTtcblxuICBpZiAocGxheWVyVHdvLmNvbXB1dGVyKSB7XG4gICAgY29tcHV0ZXJQbGFjZW1lbnQocGxheWVyVHdvLCBbNSwgNCwgMywgMywgMl0pO1xuICAgIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMlwiKSwgcGxheWVyVHdvKTtcbiAgfSBlbHNlIHtcbiAgICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJUd28sIDIpO1xuICB9XG59O1xuXG5jb25zdCBzdGFydCA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZXMgPSBnZXROYW1lcygpO1xuICBjb25zdCBuYW1lT25lID0gcGxheWVyTmFtZXNbMF07XG4gIGNvbnN0IG5hbWVUd28gPSBwbGF5ZXJOYW1lc1sxXTtcblxuICBpZiAobmFtZU9uZSA9PT0gXCJcIiB8fCBuYW1lVHdvID09PSBcIlwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaGlkZShuYW1lcyk7XG5cbiAgc2V0dXAobmFtZU9uZSwgbmFtZVR3byk7XG4gIHBsYXllck9uZU5hbWVFbC52YWx1ZSA9IFwiXCI7XG4gIHBsYXllclR3b05hbWVFbC52YWx1ZSA9ICcnO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXJNZW51ID0gKGUpID0+IHtcbiAgaGlkZShwbGF5ZXJUd29Db250KTtcblxuICBpZihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyk9PT0ndHdvLXBsYXllcicpe1xuICAgIHBsYXllclR3b0NvbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBpc011bHRpcGxheWVyID0gdHJ1ZTtcbiAgfTtcblxuICBoaWRlKG11bHRpcGxheWVyKTtcbiAgc2hvdyhuYW1lcyk7XG59O1xuXG4vLyBtZW51IGludGVyYWN0aW9uIGV2ZW50c1xuZXhwb3J0IGNvbnN0IG1lbnVFdmVudHMgPSAoKCkgPT4ge1xuICBzaW5nbGVQbGF5ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLG11bHRpcGxheWVyTWVudSk7XG4gIHR3b1BsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbXVsdGlwbGF5ZXJNZW51KTtcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHN0YXJ0KCk7XG4gIH0pO1xuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICBzdGFydCgpO1xuICAgIH07XG4gIH0pO1xuXG4gIHBsYXllck9uZU5hbWVFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9KTtcblxuICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9uZVBsYWNlbWVudCgpO1xuICB9KTtcbn0pKCk7XG4iLCJleHBvcnQgY29uc3QgdXBkYXRlRGlzcGxheXMgPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICB1cGRhdGVUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVTaGlwcyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgdXBkYXRlV2lucyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbn07XG5cbmNvbnN0IHVwZGF0ZVR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCB0dXJuMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0xXCIpO1xuICBjb25zdCB0dXJuMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHVybi0yXCIpO1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgdHVybjEudGV4dENvbnRlbnQgPSBcIkFUVEFDS0lORy4uLlwiO1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJXQUlUSU5HLi4uXCI7XG4gIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIHR1cm4yLnRleHRDb250ZW50ID0gXCJBVFRBQ0tJTkcuLi5cIjtcbiAgICB0dXJuMS50ZXh0Q29udGVudCA9IFwiV0FJVElORy4uLlwiO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVTaGlwcyA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGNvbnN0IHNoaXBzMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtMVwiKTtcbiAgY29uc3Qgc2hpcHMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy0yXCIpO1xuICBzaGlwczEudGV4dENvbnRlbnQgPSBgU2hpcHMgbGVmdDogJHtmaXJzdFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG4gIHNoaXBzMi50ZXh0Q29udGVudCA9IGBTaGlwcyBsZWZ0OiAke3NlY29uZFBsYXllci5ib2FyZC5nZXRTaGlwc1JlbWFpbmluZygpfWA7XG59O1xuXG5jb25zdCB1cGRhdGVXaW5zID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgY29uc3Qgd2luczEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMVwiKTtcbiAgY29uc3Qgd2luczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbnMtMlwiKTtcbiAgd2luczEudGV4dENvbnRlbnQgPSBgV2luczogJHtmaXJzdFBsYXllci5nZXRXaW5zKCl9YDtcbiAgd2luczIudGV4dENvbnRlbnQgPSBgV2luczogJHtzZWNvbmRQbGF5ZXIuZ2V0V2lucygpfWA7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL2NyZWF0ZVNoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IHBsYWNlID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXMpO1xuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgcmV0dXJuIG5ld1NoaXA7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh0YXJnZXQpID0+IHtcbiAgICBpZiAoYXR0YWNrcy5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcEluZGV4ID0gc2hpcHMuZmluZEluZGV4KChzaGlwKSA9PiB7XG4gICAgICByZXR1cm4gc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyh0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNoaXBJbmRleCA+IC0xKSB7XG4gICAgICBzaGlwc1tzaGlwSW5kZXhdLmhpdCgpO1xuICAgIH1cblxuICAgIGF0dGFja3MucHVzaCh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwcztcbiAgfTtcblxuICBjb25zdCBmbGVldENvb3JkaW5hdGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGFyci5wdXNoKHNoaXBzW2ldLmNvb3JkaW5hdGVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBzUmVtYWluaW5nID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgc2hpcHNTdW5rICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2hpcHMubGVuZ3RoIC0gc2hpcHNTdW5rO1xuICB9O1xuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4ge1xuICAgIGlmIChzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlc2V0QXJyYXkgPSAoYXJyKSA9PiB7XG4gICAgICBjb25zdCBzaXplID0gYXJyLmxlbmd0aDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXNldEFycmF5KHNoaXBzKTtcbiAgICByZXNldEFycmF5KGF0dGFja3MpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrcyxcbiAgICBwbGFjZSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzLFxuICAgIGZsZWV0Q29vcmRpbmF0ZXMsXG4gICAgZ2V0U2hpcHNSZW1haW5pbmcsXG4gICAgaXNGbGVldFN1bmssXG4gICAgcmVzZXQsXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vY3JlYXRlR2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyTmFtZSwgaXNDb21wID0gZmFsc2UpID0+IHtcbiAgY29uc3QgbmFtZSA9IHBsYXllck5hbWU7XG4gIGNvbnN0IGNvbXB1dGVyID0gaXNDb21wO1xuICBjb25zdCBib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBjb25zdCBpc1R1cm4gPSBmYWxzZTtcbiAgbGV0IHdpbnMgPSAwO1xuXG4gIGNvbnN0IG1ha2VBdHRhY2sgPSAoZW5lbXlCb2FyZCwgY29vcmRpbmF0ZXMgPSBudWxsKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGNvb3JkaW5hdGVzO1xuXG4gICAgaWYgKGNvbXB1dGVyKSB7XG4gICAgICB0YXJnZXQgPSBjb21wdXRlckF0dGFjayhlbmVteUJvYXJkKTtcbiAgICAgIGNvbnNvbGUubG9nKGBjb21wdXRlciBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSBhdHRhY2tzICR7dGFyZ2V0fWApO1xuICAgIH1cblxuICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXQpO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyQXR0YWNrID0gKGVuZW15Qm9hcmQsIGdlbiA9IDEpID0+IHtcbiAgICBjb25zdCBoaXRzID0gW107XG4gICAgY29uc3Qgc2hpcHMgPSBlbmVteUJvYXJkLmdldFNoaXBzKCk7XG4gICAgbGV0IHRhcmdldDtcblxuICAgIGNvbnN0IHRhcmdldEFkamFjZW50ID0gKCkgPT4ge1xuICAgICAgLy8gcG9wdWxhdGVzIGhpdHMgYXJyYXlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5lbXlCb2FyZC5hdHRhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGF0ayA9IGVuZW15Qm9hcmQuYXR0YWNrc1tpXTtcbiAgICAgICAgY29uc3QgZmxlZXRBcnIgPSBlbmVteUJvYXJkXG4gICAgICAgICAgLmZsZWV0Q29vcmRpbmF0ZXMoKVxuICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuXG4gICAgICAgIGlmIChmbGVldEFyci5pbmNsdWRlcyhhdGspICYmICFoaXRzLmluY2x1ZGVzKGF0aykpIHtcbiAgICAgICAgICBoaXRzLnB1c2goYXRrKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgaGl0cyB0aGF0IGFyZSBvbiBzdW5rIHNoaXBzXG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcy5pbmNsdWRlcyhoaXRzW2ldKSkge1xuICAgICAgICAgICAgICBsaXN0LnB1c2goaGl0c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmNvb3JkaW5hdGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGhpdHMuaW5kZXhPZihsaXN0WzBdKTtcbiAgICAgICAgICAgIGhpdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm5zIHZhbGlkIHRhcmdldCBhZGphY2VudCB0byB0aGUgaW5wdXQgY29vcmRpbmF0ZVxuICAgICAgY29uc3QgZ2V0QWRqYWNlbnQgPSAoaW5wdXRDb29yZCkgPT4ge1xuICAgICAgICBjb25zdCBbYSwgLi4ucmVzdF0gPSBpbnB1dENvb3JkO1xuICAgICAgICBjb25zdCBjaGFyID0gYTtcbiAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQocmVzdC5qb2luKFwiXCIpKTtcbiAgICAgICAgY29uc3QgY29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcblxuICAgICAgICBpZiAoY29kZSArIDEgPD0gNzQpIHtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSArIDEpICsgbnVtO1xuXG4gICAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgLSAxID49IDY1KSB7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgLSAxKSArIG51bTtcblxuICAgICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gKyAxIDw9IDEwKSB7XG4gICAgICAgICAgY29uc3QgY29vcmQgPSBjaGFyICsgKG51bSArIDEpO1xuXG4gICAgICAgICAgaWYgKCFlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG51bSAtIDEgPj0gMSkge1xuICAgICAgICAgIGNvbnN0IGNvb3JkID0gY2hhciArIChudW0gLSAxKTtcblxuICAgICAgICAgIGlmICghZW5lbXlCb2FyZC5hdHRhY2tzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGFkamFjZW50ID0gZ2V0QWRqYWNlbnQoaGl0c1tpXSk7XG5cbiAgICAgICAgaWYgKGFkamFjZW50KSB7XG4gICAgICAgICAgdGFyZ2V0ID0gYWRqYWNlbnQ7XG4gICAgICAgICAgcmV0dXJuIGFkamFjZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRhcmdldEFkamFjZW50KCk7XG4gICAgaWYgKGhpdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgYWRqYWNlbnQgdGFyZ2V0IGZvdW5kID0+ICR7dGFyZ2V0fWApO1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBjb25zdCBnZW5lcmF0ZUF0dGFjayA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlQ2hhckNvZGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzQgLSA2NSArIDEpKSArIDY1O1xuICAgICAgfTtcblxuICAgICAgbGV0IGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2VuZXJhdGVDaGFyQ29kZSgpKTtcbiAgICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuXG4gICAgICAvLyByZW1ha2VzIGF0dGFjayBpZiB0YXJnZXQgaGFzIGFscmVhZHkgYmVlbiBoaXRcbiAgICAgIGlmIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShnZW5lcmF0ZUNoYXJDb2RlKCkpO1xuICAgICAgICAgIG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG4gICAgICAgICAgdGFyZ2V0ID0gbGV0dGVyICsgbnVtYmVyO1xuICAgICAgICB9IHdoaWxlIChlbmVteUJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGdlbmVyYXRlQXR0YWNrKCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgIHJldHVybiBuYW1lO1xuICB9O1xuXG4gIGNvbnN0IHdvbiA9ICgpID0+IHtcbiAgICB3aW5zICs9IDE7XG4gIH07XG5cbiAgY29uc3QgZ2V0V2lucyA9ICgpID0+IHtcbiAgICByZXR1cm4gd2lucztcbiAgfTtcblxuICByZXR1cm4geyBib2FyZCwgY29tcHV0ZXIsIGlzVHVybiwgbWFrZUF0dGFjaywgZ2V0TmFtZSwgd29uLCBnZXRXaW5zIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZUFycmF5KSA9PiB7XG4gIGNvbnN0IGNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZUFycmF5O1xuICBjb25zdCBsZW5ndGggPSBjb29yZGluYXRlQXJyYXkubGVuZ3RoO1xuICBsZXQgZGFtYWdlID0gMDtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgZGFtYWdlICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGlmIChsZW5ndGggPT09IGRhbWFnZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0RGFtYWdlID0gKCkgPT4ge1xuICAgIHJldHVybiBkYW1hZ2U7XG4gIH07XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZXMsIGhpdCwgaXNTdW5rLCBnZXREYW1hZ2UgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgY2hlY2tXaW4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBpZiAoc2Vjb25kUGxheWVyLmJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncGxheWVyMSBXSU5TJyk7XG4gICAgZmlyc3RQbGF5ZXIud29uKCk7XG4gICAgcmV0dXJuIFwiZmlyc3RcIjtcbiAgfSBlbHNlIGlmIChmaXJzdFBsYXllci5ib2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3BsYXllcjIgV0lOUycpO1xuICAgIHNlY29uZFBsYXllci53b24oKTtcbiAgICByZXR1cm4gXCJzZWNvbmRcIjtcbiAgfVxufTtcbiIsImltcG9ydCB7IGdhbWVTdGFydCB9IGZyb20gXCIuL2dhbWVTdGFydFwiO1xuXG5leHBvcnQgY29uc3QgY29tcHV0ZXJQbGFjZW1lbnQgPSAocGxheWVyLCBzaXplQXJyKSA9PiB7XG4gIGNvbnN0IG51bWJlck9mU2hpcHMgPSBzaXplQXJyLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mU2hpcHM7IGkgKz0gMSkge1xuICAgIGxldCBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKHBsYXllciwgc2l6ZUFyclswXSk7XG5cbiAgICBjb25zdCBjdXJyZW50RmxlZXQgPSBwbGF5ZXIuYm9hcmQuZmxlZXRDb29yZGluYXRlcygpO1xuICAgIGxldCBmbGVldEFycjtcblxuICAgIGlmIChjdXJyZW50RmxlZXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICBmbGVldEFyciA9IGN1cnJlbnRGbGVldC5yZWR1Y2UoKGFjYywgdmFsKSA9PiBhY2MuY29uY2F0KHZhbCkpO1xuICAgIH1cblxuICAgIHdoaWxlIChjaGVja0Nvb3JkaW5hdGVzKGNvb3JkcywgZmxlZXRBcnIpKSB7XG4gICAgICAvLyBsZXQgb2xkID0gY29vcmRzO1xuICAgICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhwbGF5ZXIsIHNpemVBcnJbMF0pO1xuICAgICAgLy8gY29uc29sZS5sb2coYG9sZCBjb29yZHM6ICR7b2xkfXwgbmV3IGNvb3JkczogJHtjb29yZHN9YCk7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYGNvbXB1dGVyIHBsYWNlcyBzaGlwIGF0ICR7Y29vcmRzfWApO1xuICAgIHBsYXllci5ib2FyZC5wbGFjZShjb29yZHMpO1xuICAgIHNpemVBcnIuc2hpZnQoKTtcbiAgfVxuXG4gIGdhbWVTdGFydCgpO1xufTtcblxuY29uc3QgZ2VuZXJhdGVDb29yZGluYXRlcyA9IChwbGF5ZXIsIHNpemUpID0+IHtcbiAgY29uc3QgYXhpcyA9IGdlbmVyYXRlQXhpcygpO1xuICBjb25zdCBzdGFydCA9IGdlbmVyYXRlU3RhcnQoKTtcbiAgY29uc3QgeCA9IHN0YXJ0WzBdO1xuICBjb25zdCB5ID0gc3RhcnRbMV07XG4gIGNvbnN0IGNvb3JkQXJyID0gW107XG5cbiAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgLy8gaW5jcmVtZW50IGxldHRlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0geC5jaGFyQ29kZUF0KDApO1xuICAgICAgY29uc3QgY2VsbFggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUgKyBpKSArIHk7XG4gICAgICBjb29yZEFyci5wdXNoKGNlbGxYKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAvLyBpbmNyZW1lbnQgbnVtYmVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGxZID0geCArICh5ICsgaSk7XG4gICAgICBjb29yZEFyci5wdXNoKGNlbGxZKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29vcmRBcnI7XG59O1xuXG4vLyByZXR1cm4gdHJ1ZSBpZiBjb29yZGluYXRlcyBhcmUgaW52YWxpZFxuY29uc3QgY2hlY2tDb29yZGluYXRlcyA9IChjb29yZGluYXRlcywgZmxlZXQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZGluYXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChmbGVldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKGZsZWV0LmluY2x1ZGVzKGNvb3JkaW5hdGVzW2ldKSkge1xuICAgICAgY29uc29sZS5sb2coXCJzaGlwIGNvbmZsaWN0XCIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgW2xldHRlciwgLi4ucmVzdF0gPSBjb29yZGluYXRlc1swXTtcbiAgY29uc3QgeCA9IGxldHRlcjtcbiAgY29uc3QgeSA9IHBhcnNlSW50KHJlc3Quam9pbihcIlwiKSk7XG5cbiAgaWYgKHguY2hhckNvZGVBdCgwKSArIChjb29yZGluYXRlcy5sZW5ndGggLSAxKSA+IDc0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoeSArIChjb29yZGluYXRlcy5sZW5ndGggLSAxKSA+IDEwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmNvbnN0IGdlbmVyYXRlQXhpcyA9ICgpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgbGV0IGF4aXM7XG5cbiAgaWYgKG51bWJlciAlIDIgPT09IDApIHtcbiAgICBheGlzID0gXCJ4XCI7XG4gIH0gZWxzZSBpZiAobnVtYmVyICUgMiAhPT0gMCkge1xuICAgIGF4aXMgPSBcInlcIjtcbiAgfVxuXG4gIHJldHVybiBheGlzO1xufTtcblxuY29uc3QgZ2VuZXJhdGVTdGFydCA9ICgpID0+IHtcbiAgY29uc3QgZ2VuZXJhdGVDaGFyQ29kZSA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc0IC0gNjUgKyAxKSkgKyA2NTtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGdlbmVyYXRlQ2hhckNvZGUoKSk7XG4gIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwICsgMSk7XG5cbiAgcmV0dXJuIFtsZXR0ZXIsIG51bWJlcl07XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tGb3JDb21wdXRlciA9IChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PiB7XG4gIGlmIChmaXJzdFBsYXllci5jb21wdXRlciB8fCBzZWNvbmRQbGF5ZXIuY29tcHV0ZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyBjaGFuZ2VUdXJuIH0gZnJvbSBcIi4vdHVyblwiO1xuXG5leHBvcnQgY29uc3QgZ2FtZVJlc2V0ID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHdpbm5lcikgPT4ge1xuICBpZiAod2lubmVyID09PSBcImZpcnN0XCIgJiYgZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgfSBlbHNlIGlmICh3aW5uZXIgPT09IFwic2Vjb25kXCIgJiYgc2Vjb25kUGxheWVyLmlzVHVybikge1xuICAgIGNoYW5nZVR1cm4oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coJ0dBTUUgSEFTIEJFRU4gUkVTRVQuJyk7XG5cbiAgZmlyc3RQbGF5ZXIuYm9hcmQucmVzZXQoKTtcbiAgc2Vjb25kUGxheWVyLmJvYXJkLnJlc2V0KCk7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9jcmVhdGVQbGF5ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVBsYXllckRpc3BsYXkgfSBmcm9tIFwiLi4vRE9NL2NvbXBvbmVudHMvY3JlYXRlUGxheWVyRGlzcGxheXNcIjtcbmltcG9ydCB7XG4gIGdyaWRFdmVudHMsXG4gIHJlbmRlckdyaWQsXG4gIHBsYWNlbWVudFBoYXNlLFxufSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2dyaWRcIjtcbmltcG9ydCB7IGZpcnN0VHVybiwgY29tcFR1cm4gfSBmcm9tIFwiLi90dXJuXCI7XG5pbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuXG5leHBvcnQgbGV0IHBsYXllck9uZSwgcGxheWVyVHdvO1xuXG5leHBvcnQgY29uc3Qgc2V0dXAgPSAobmFtZU9uZSwgbmFtZVR3bykgPT4ge1xuICBpZiAoIXBsYXllck9uZSB8fCAhcGxheWVyVHdvKSB7XG4gICAgbGV0IHggPSBmYWxzZTtcblxuICAgIGlmIChuYW1lVHdvID09PSBcImNvbXB1dGVyXCIpIHtcbiAgICAgIHggPSB0cnVlO1xuICAgIH1cblxuICAgIHBsYXllck9uZSA9IGNyZWF0ZVBsYXllcihuYW1lT25lKTtcbiAgICBwbGF5ZXJUd28gPSBjcmVhdGVQbGF5ZXIobmFtZVR3bywgeCk7XG4gICAgY3JlYXRlUGxheWVyRGlzcGxheShwbGF5ZXJPbmUsIDEpO1xuICAgIGNyZWF0ZVBsYXllckRpc3BsYXkocGxheWVyVHdvLCAyKTtcbiAgfVxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICBwbGFjZW1lbnRQaGFzZShwbGF5ZXJPbmUsIDEpO1xufTtcblxuLy8gc2hvdWxkIGJlIGNhbGxlZCBhZnRlciBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG5leHBvcnQgY29uc3QgZ2FtZVN0YXJ0ID0gKCkgPT4ge1xuICBncmlkRXZlbnRzKCk7XG5cbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBwbGF5ZXJPbmUpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHBsYXllclR3byk7XG5cbiAgaWYgKHBsYXllck9uZS5nZXRXaW5zKCkgPT09IDAgJiYgcGxheWVyVHdvLmdldFdpbnMoKSA9PT0gMCkge1xuICAgIGZpcnN0VHVybihwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gIH1cblxuICBoaWdobGlnaHQocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG4gIGxldCBjb21wdXRlclBsYXllcjtcblxuICBpZiAocGxheWVyT25lLmNvbXB1dGVyKSB7XG4gICAgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIH0gZWxzZSBpZiAocGxheWVyVHdvLmNvbXB1dGVyKSB7XG4gICAgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIH1cblxuICBpZiAoY29tcHV0ZXJQbGF5ZXIuaXNUdXJuKSB7XG4gICAgY29tcFR1cm4ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuICB9XG59O1xuIiwiLy8gaW5wdXQgY2VsbCBlbGVtZW50IGRhdGEgYXR0cmlidXRlXG4vLyBvdXRwdXQgYXR0YWNrIGNvb3JkaW5hdGVzXG5leHBvcnQgY29uc3QgcGFyc2VDZWxsQ29vcmRpbmF0ZSA9IChhdHRyaWJ1dGUpID0+IHtcbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhcnIgPSBhdHRyaWJ1dGUuc3BsaXQoXCJcIik7XG5cbiAgY29uc3QgZ2V0TGV0dGVyID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IGxldHRlclZhbHVlO1xuXG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVsxXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKDAsIDIpO1xuICAgICAgbGV0dGVyVmFsdWUgPSB0d29EaWdpdC5qb2luKFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXR0ZXJWYWx1ZSA9IGFycmF5WzBdO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGVWYWx1ZSA9IHBhcnNlSW50KGxldHRlclZhbHVlKTtcbiAgICBjb25zdCBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1ICsgY29kZVZhbHVlIC0gMSk7XG5cbiAgICByZXR1cm4gbGV0dGVyO1xuICB9O1xuXG4gIGNvbnN0IGdldE51bWJlciA9IChhcnJheSkgPT4ge1xuICAgIGxldCBudW1iZXI7XG4gICAgaWYgKCFpc05hTihwYXJzZUludChhcnJheVthcnJheS5sZW5ndGggLSAyXSkpKSB7XG4gICAgICBjb25zdCB0d29EaWdpdCA9IGFycmF5LnNsaWNlKGFycmF5Lmxlbmd0aCAtIDIpO1xuICAgICAgbnVtYmVyID0gdHdvRGlnaXQuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbnVtYmVyID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bWJlcjtcbiAgfTtcblxuICBjb25zdCBsZXR0ZXIgPSBnZXRMZXR0ZXIoYXJyKTtcbiAgY29uc3QgbnVtYmVyID0gZ2V0TnVtYmVyKGFycik7XG5cbiAgcmV0dXJuIGxldHRlciArIG51bWJlcjtcbn07XG4iLCJpbXBvcnQgeyBoaWdobGlnaHQgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL2hpZ2hsaWdodFwiO1xuaW1wb3J0IHsgdXBkYXRlRGlzcGxheXMgfSBmcm9tIFwiLi4vRE9NL2ludGVyYWN0aW9uL3BsYXllckRpc3BsYXlzXCI7XG5pbXBvcnQgeyByZW5kZXJHcmlkIH0gZnJvbSBcIi4uL0RPTS9pbnRlcmFjdGlvbi9ncmlkXCI7XG5pbXBvcnQgeyBjaGVja1dpbiB9IGZyb20gXCIuL2NoZWNrV2luXCI7XG5pbXBvcnQgeyBnYW1lUmVzZXQgfSBmcm9tIFwiLi9nYW1lUmVzZXRcIjtcbmltcG9ydCB7IHNldHVwIH0gZnJvbSBcIi4vZ2FtZVN0YXJ0XCI7XG5cbi8vIHJhbmRvbWx5IGNob29zZXMgYSBwbGF5ZXIgdG8gZ28gZmlyc3RcbmV4cG9ydCBjb25zdCBmaXJzdFR1cm4gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcikgPT4ge1xuICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCArIDEpO1xuXG4gIGlmIChudW1iZXIgJSAyID09PSAwKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICAvLyBjb25zb2xlLmxvZyhgJHtmaXJzdFBsYXllci5nZXROYW1lKCl9IEdPRVMgRklSU1QuYCk7XG4gIH0gZWxzZSBpZiAobnVtYmVyICUgMiAhPT0gMCkge1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIC8vIGNvbnNvbGUubG9nKGAke3NlY29uZFBsYXllci5nZXROYW1lKCl9IEdPRVMgRklSU1QuYCk7XG4gIH1cbn07XG5cbi8vIGNoYW5nZXMgY3VycmVudCBwbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFuZ2VUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgaWYgKGZpcnN0UGxheWVyLmlzVHVybikge1xuICAgIGZpcnN0UGxheWVyLmlzVHVybiA9IGZhbHNlO1xuICAgIHNlY29uZFBsYXllci5pc1R1cm4gPSB0cnVlO1xuICAgIC8vIGNvbnNvbGUubG9nKGBJVCBJUyBOT1cgJHtzZWNvbmRQbGF5ZXIuZ2V0TmFtZSgpfXMgVFVSTi5gKTtcbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgZmlyc3RQbGF5ZXIuaXNUdXJuID0gdHJ1ZTtcbiAgICBzZWNvbmRQbGF5ZXIuaXNUdXJuID0gZmFsc2U7XG4gICAgLy8gY29uc29sZS5sb2coYElUIElTIE5PVyAke2ZpcnN0UGxheWVyLmdldE5hbWUoKX1zIFRVUk4uYCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0dXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIHRhcmdldCkgPT4ge1xuICBpZiAoZmlyc3RQbGF5ZXIuaXNUdXJuKSB7XG4gICAgaWYgKHNlY29uZFBsYXllci5ib2FyZC5hdHRhY2tzLmluY2x1ZGVzKHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3RQbGF5ZXIubWFrZUF0dGFjayhzZWNvbmRQbGF5ZXIuYm9hcmQsIHRhcmdldCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJmaXJzdFwiKSB7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJmaXJzdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChzZWNvbmRQbGF5ZXIuaXNUdXJuKSB7XG4gICAgaWYgKGZpcnN0UGxheWVyLmJvYXJkLmF0dGFja3MuaW5jbHVkZXModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCwgdGFyZ2V0KTtcblxuICAgICAgaWYgKGNoZWNrV2luKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID09PSBcInNlY29uZFwiKSB7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJzZWNvbmRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gIHJlbmRlckdyaWQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGwtMVwiKSwgZmlyc3RQbGF5ZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTJcIiksIHNlY29uZFBsYXllcik7XG4gIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuXG4gIGNvbXBUdXJuKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbXBUdXJuID0gKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGZpcnN0UGxheWVyLmNvbXB1dGVyKSB7XG4gICAgICBmaXJzdFBsYXllci5tYWtlQXR0YWNrKHNlY29uZFBsYXllci5ib2FyZCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJmaXJzdFwiKSB7XG4gICAgICAgIHR1cm5Xb24oZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgXCJmaXJzdFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2Vjb25kUGxheWVyLmNvbXB1dGVyKSB7XG4gICAgICBzZWNvbmRQbGF5ZXIubWFrZUF0dGFjayhmaXJzdFBsYXllci5ib2FyZCk7XG5cbiAgICAgIGlmIChjaGVja1dpbihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKSA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICB0dXJuV29uKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIsIFwic2Vjb25kXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlVHVybihmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgICBoaWdobGlnaHQoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0xXCIpLCBmaXJzdFBsYXllcik7XG4gICAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICAgIHVwZGF0ZURpc3BsYXlzKGZpcnN0UGxheWVyLCBzZWNvbmRQbGF5ZXIpO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IHR1cm5Xb24gPSAoZmlyc3RQbGF5ZXIsIHNlY29uZFBsYXllciwgd2lubmVyKSA9PiB7XG4gIGdhbWVSZXNldChmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyLCB3aW5uZXIpO1xuICByZW5kZXJHcmlkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsLTFcIiksIGZpcnN0UGxheWVyKTtcbiAgcmVuZGVyR3JpZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbC0yXCIpLCBzZWNvbmRQbGF5ZXIpO1xuICB1cGRhdGVEaXNwbGF5cyhmaXJzdFBsYXllciwgc2Vjb25kUGxheWVyKTtcbiAgc2V0dXAoKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tIFwiLi9ET00vY29tcG9uZW50cy9jcmVhdGVHcmlkXCI7XG5pbXBvcnQgeyBtZW51RXZlbnRzIH0gZnJvbSBcIi4vRE9NL2ludGVyYWN0aW9uL21lbnVcIjtcblxuY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVsdGlwbGF5ZXInKTtcbm11bHRpcGxheWVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbi8vIGNvbnN0IG5hbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lc1wiKTtcbi8vIG5hbWVzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbmNvbnN0IHBsYXllck9uZUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1vbmUtZ3JpZFwiKTtcbmNvbnN0IHBsYXllclR3b0dyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci10d28tZ3JpZFwiKTtcblxuY3JlYXRlR3JpZChwbGF5ZXJPbmVHcmlkLCAxKTtcbmNyZWF0ZUdyaWQocGxheWVyVHdvR3JpZCwgMik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=