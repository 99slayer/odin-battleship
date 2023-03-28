import { parseCellCoordinate } from "../../modules/parseCellCoordinate";
import { playerOne, playerTwo } from "../../modules/gameStart";
import { turn } from "../../modules/turn";

const getGridCoordinate = (cell) => {
  let coord = parseCellCoordinate(cell.getAttribute('data-cell-coordinate'));
  return coord;
};

//ONLY CLICKING ON THE ENEMY GRID SHOULD BE ABLE TO ATTACK
//ONLY HOVERING ON THE ENEMY GRID SHOULD CHANGE CELL COLOR

export const gridEvents = () => {
  const cells = document.querySelectorAll('.grid-cell');
  
  //Checks if the cell is a column or row label
  const checkTier = (cell) =>{
    const cellID = cell.getAttribute('data-cell-coordinate');
    const coordinate = parseCellCoordinate(cellID);

    if(coordinate[0]==='@'||(coordinate.length===2&&coordinate[1]==='0')){
      return true;
    };
  };

  cells.forEach((node)=>{
    if(checkTier(node)){
      return;
    };

    node.addEventListener('click',(e)=>{
      //NEED TO MAKE IT SO YOU CANT ATTACK WHEN ITS NOT YOUR TURN
      //ALSO MAKE SURE YOU CANT ATTACK IF YOU DONT CLICK ON THE CORRECT GRID
      let cell = e.target;
      let coord = getGridCoordinate(cell);

      if(playerTwo.computer&&playerTwo.isTurn){
        return;
      };

      if(playerOne.isTurn&&cell.classList.contains('grid-cell-1')){
        return;
      } else if (playerTwo.isTurn&&cell.classList.contains('grid-cell-2')){
        return;
      };
      
      turn(playerOne,playerTwo,coord);
    });
  });

  cells.forEach((node)=>{
    if(checkTier(node)){
      return;
    };

    node.addEventListener('mouseover',(e)=>{
      let cell = e.target;

      //stops hover from working if its computers turn
      if(playerOne.isTurn&&playerOne.computer){
        return;
      } else if (playerTwo.isTurn&&playerTwo.computer){
        return;
      };

      if(playerOne.isTurn&&cell.classList.contains('grid-cell-1')){
        return;
      } else if (playerTwo.isTurn&&cell.classList.contains('grid-cell-2')){
        return;
      };

      cell.style.backgroundColor = 'rgb(167, 167, 167)';
    });

    node.addEventListener('mouseleave',(e)=>{
      let cell = e.target;
      cell.style.backgroundColor = null;
    });

    node.addEventListener('mousedown',(e)=>{
      if(playerOne.isTurn&&playerOne.computer){
        return;
      } else if (playerTwo.isTurn&&playerTwo.computer){
        return;
      };

      let cell = e.target;
      cell.style.backgroundColor = 'black';
    });

    node.addEventListener('mouseup',(e)=>{
      let cell = e.target;
    });
  });
};

//SHOULDN'T RENDER PLAYER TWO SHIPS IF PLAYING AGAINST COMPUTER
//IF TWO PLAYER SHOULDNT RENDER EITHER PLAYERS SHIPS
export const renderGrid = (cells,player) => {
  const fleet = player.board.fleetCoordinates();
  const arr = fleet.reduce((acc,val)=>acc.concat(val));

  cells.forEach((cell)=>{
    let coord = parseCellCoordinate(cell.getAttribute('data-cell-coordinate'));
    if (arr.includes(coord)&&player.board.attacks.includes(coord)) {
      cell.textContent = '●';
    } else if (!(arr.includes(coord))&&player.board.attacks.includes(coord)) {
      cell.textContent = '/';
    } else if (arr.includes(coord)){
      cell.textContent = '○';
    };
  });
};
