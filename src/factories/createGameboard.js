import { createShip } from "./createShip";

export const createGameboard = () =>{
  const ships = [];
  const attacks = [];
  
  const place = (coordinates) => {
    let newShip = createShip(coordinates);
    ships.push(newShip);
    return newShip;
  };

  const receiveAttack = (target) => {
    if(attacks.includes(target)){
      return;
    };

    let shipIndex = ships.findIndex((ship)=>{ return ship.coordinates.includes(target)});

    if(shipIndex>-1){
      ships[shipIndex].hit();
    };

    attacks.push(target);
  };
  
  const getShips = () => {
    return ships;
  };

  const fleetCoordinates = () =>{
    const arr = [];
    for(let i=0;i<ships.length;i+=1){
      arr.push(ships[i].coordinates);
    };

    return arr;
  };

  const getShipsRemaining = () => {
    let shipsSunk = 0;

    ships.forEach((ship)=>{
      if(ship.isSunk()){
        shipsSunk += 1;
      };
    });

    return ships.length - shipsSunk;
  };

  const isFleetSunk = () => {
    if(ships.every(ship => ship.isSunk())){
      return true;
    } else {
      return false;
    };
  };

  const reset = () => {
    const resetArray = (arr) => {
      const size = arr.length;
    
      for(let i=0;i<size;i+=1){
        arr.pop();
      };
    };

    resetArray(ships);
    resetArray(attacks);
  };

  return { attacks, place, receiveAttack, getShips, fleetCoordinates, getShipsRemaining, isFleetSunk, reset };
};