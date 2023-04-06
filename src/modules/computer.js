import { gameStart } from "./gameStart";

export const computerPlacement = (player,sizeArr) => {
  let numberOfShips = sizeArr.length

  for(let i=0;i<numberOfShips;i+=1){
    let coords = generateCoordinates(player,sizeArr[0]);

    let currentFleet = player.board.fleetCoordinates();
    let fleetArr;

    if(currentFleet.length !== 0){
      fleetArr = currentFleet.reduce((acc,val)=>acc.concat(val));
    };

    while(checkCoordinates(coords,fleetArr)){
      let old = coords;
      coords = generateCoordinates(player,sizeArr[0]);
      console.log(`old coords: ${old}| new coords: ${coords}`);
    };

    console.log(`computer places ship at ${coords}`);
    player.board.place(coords);
    sizeArr.shift();
  };
  gameStart();
};

const generateCoordinates = (player,size) => {
  let axis = generateAxis();
  let start = generateStart();
  let x = start[0];
  let y = start [1];
  const coordArr = [];

  if(axis === 'x'){
    //increment letter
    for(let i=0;i<size;i+=1){
      let code = x.charCodeAt(0);
      let cellX = String.fromCharCode(code + i) + y;
      coordArr.push(cellX);
    };
  } else if (axis === 'y'){
    //increment number
    for(let i=0;i<size;i+=1){
      let cellY = x + (y + i);
      coordArr.push(cellY);
    };
  };

  return coordArr;
};

//return true if coordinates are invalid
const checkCoordinates = (coordinates,fleet) => {
  for(let i=0;i<coordinates.length;i+=1){
    if(fleet === undefined){
      break;
    }else if(fleet.includes(coordinates[i])){
      console.log('ship conflict');
      return true;
    };
  };

  let [letter,...rest] = coordinates[0];
  let x = letter;
  let y = parseInt(rest.join(''));

  if(x.charCodeAt(0)+(coordinates.length-1)>74){
    return true;
  }else if(y + (coordinates.length-1)>10){
    return true;
  };
};

const generateAxis = () => {
  let number = Math.floor((Math.random() * 10) + 1);
  let axis;

  if(number%2 === 0){
    axis = 'x';
  } else if (number%2 !== 0){
    axis = 'y';
  };

  return axis;
};

const generateStart = () => {
  const generateCharCode = () => {
    return Math.floor(Math.random() * (74 - 65 + 1) ) + 65;
  };

  let letter = String.fromCharCode(generateCharCode());
  let number = Math.floor(Math.random() * 10 + 1);
  // target = letter + number;

  return [letter,number];
};
