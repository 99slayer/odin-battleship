import { renderGrid } from "../DOM/interaction/grid";

export const computerPlacement = (player, sizeArr) => {
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

  renderGrid(document.querySelectorAll(".grid-cell-2"), player);
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

export const checkForComputer = (firstPlayer, secondPlayer) => {
  if (firstPlayer.computer || secondPlayer.computer) {
    return true;
  } else {
    return false;
  }
};

export const computerAttack = (enemyBoard, gen = 1) => {
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
