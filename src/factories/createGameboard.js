//gameboard should be 10x10 (A-J) and (1-10)

import { createShip } from "./createShip";

export const createGameboard = (playerName) =>{
  let boardOwner = playerName;
  const ships = [];
  const attacks = [];

  function OLDplace(axis,start,size){
    //X => horizontal + letters
    //Y => vertical + numbers
    if(!axis||!start||!size){
      console.log('parameter missing');
      return;
    };

    let startArr = start.split('');
    let x = startArr.slice(0,1);
    let y = startArr.slice(1).join('');

    //throws error if ships would be placed out of bounds
    //throws errors for now maybe change later**
    //THE COORDINATES CAN BE CHECKED BEFORE THEY ARE PASSED TO PLACE**
    if((x[0].charCodeAt(0)+size)>74){
      throw new Error('ship exceeds the x axis of the gameboard.');
    } else if ((parseInt(y)+size)>10){
      throw new Error('ship exceeds the y axis of the gameboard.');
    };

    //Check if placement coordinates conflict with any other ships

    function createCoordinates(shipAxis,shipSize){
      let coordinates = [];

      if(shipAxis === 'X'){
        //increment letters
        for(let i=0;i<shipSize;i+=1){
          let newX = String.fromCharCode(x[0].charCodeAt(0)+i);
          coordinates.push(`${newX + y}`);
        };
      } else if (shipAxis === 'Y'){
        //increment numbers
        for(let i=0;i<shipSize;i+=1){
          coordinates.push(`${x + (parseInt(y) + i)}`);
        };
      };

      return coordinates;
    };


    let ship = createShip(createCoordinates(axis,size));
    ships.push(ship);
  }; //OLD PLACE FUNCTION, STILL USEFUL CODE IN HERE FOR LATER**

  const place = (coordinates) => {
    let newShip = createShip(coordinates);
    ships.push(newShip);
    return newShip;
  }

  function fleetCoordinates(shipArr){
    const fleetCoordinateArr = [];

    shipArr.forEach((ship)=>{
      fleetCoordinateArr.push(ship.coordinates);
    })

    return fleetCoordinateArr;
  };

  const receiveAttack = (target) => {
    if(attacks.includes(target)){
      return null;
    };

    let shipIndex = ships.findIndex((ship)=>{ return ship.coordinates.includes(target)});

    if(shipIndex>-1){
      ships[shipIndex].hit();
    };

    attacks.push(target);
    //returns hit ship
    return ships[shipIndex];
  };

  function isFleetSunk(){

  };

  return { ships, attacks, place, receiveAttack };
};