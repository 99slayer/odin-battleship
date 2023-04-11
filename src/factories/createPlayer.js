import { createGameboard } from "./createGameboard";

export const createPlayer = (playerName, isComp = false) => {
  const name = playerName;
  const computer = isComp;
  const board = createGameboard();
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
