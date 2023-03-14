import { createGameboard } from "./createGameboard";

export const createPlayer = (playerName,isComp = false) =>{
  const name = playerName;
  const board = createGameboard();
  let isTurn = false;
  let wins = 0;
  
  const makeAttack = (enemyBoard,coordinates = null) => {
    let target = coordinates;

    if(isComp){
      target = generateAttack(enemyBoard);
    };

    if(enemyBoard.attacks.includes(target)){
      console.log('square has already been hit.');
      return;
    };
    enemyBoard.receiveAttack(target);
  };

  //we'll place 5 ships by default.
  const placeFleet = () => {

  };
  
  const generateAttack = (enemyBoard,gen = 1) => {
    //could potentially make it 'smarter' later on aka, once it lands a hit, focus on that area until the ship is sunk.
    const generateCharCode = () => {
      return Math.floor(Math.random() * (74 - 65 + 1) ) + 65;
    };

    let letter = String.fromCharCode(generateCharCode());
    let number = Math.floor(Math.random() * 10 + 1);
    let target = letter + number;

    //checks if squares have already been hit
    if(enemyBoard.attacks.includes(target)){
      do{
        letter = String.fromCharCode(generateCharCode());
        number = Math.floor(Math.random() * 10 + 1);
        target = letter + number;
      }
      while (enemyBoard.attacks.includes(target));
    };

    return target;
  };

  const getName = () => {
    return name;
  };

  const getWins = () => {
    return wins;
  };

  return { board, makeAttack, getName, getWins };
};
