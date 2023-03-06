//gameboard should be 10x10 (A-J) and (1-10), letters come first in coordinate pairs i.e. A1,B3,C9 etc

import { createShip } from "./createShip";

//need board for each player?
export const createGameboard = (playerName,) =>{
  let boardOwner = playerName;
  const ships = [];
  const attacks = []; //organize each new attack into array

  function place(axis,start,size){
    //X => horizontal + letters
    //Y => vertical + numbers
    if(!axis||!start||!size){
      console.log('parameter missing');
      return;
    };

    let coordinates = [];
    let startArr = start.split('');
    let x = startArr.slice(0,1);
    let y = startArr.slice(1).join('');

    //throws error if ships would be placed out of bounds
    if((x[0].charCodeAt(0)+size)>74){
      throw new Error('ship exceeds the x axis of the gameboard.');
    } else if ((parseInt(y)+size)>10){
      throw new Error('ship exceeds the y axis of the gameboard.');
    };

    if(axis === 'X'){
      //increment letters
      for(let i=0;i<size;i+=1){
        let newX = String.fromCharCode(x[0].charCodeAt(0)+i);
        coordinates.push(`${newX + y}`);
      };
    } else if (axis === 'Y'){
      //increment numbers
      for(let i=0;i<size;i+=1){
        coordinates.push(`${x + (parseInt(y) + i)}`);
      };
    };

    let ship = createShip(coordinates);
    ships.push(ship);
  };

  function recieveAttack(target){
    //letter and number seperated

    //if hit check if ship sunk
    //if ship sunk tally it somewhere
  };

  function isFleetSunk(){

  };

  return { ships, place, };
};