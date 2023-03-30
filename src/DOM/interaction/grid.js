import { parseCellCoordinate } from "../../modules/parseCellCoordinate";
import { playerOne, playerTwo } from "../../modules/gameStart";
import { turn } from "../../modules/turn";

const getGridCoordinate = (cell) => {
  let coord = parseCellCoordinate(cell.getAttribute('data-cell-coordinate'));
  return coord;
};

//stops players from interacting with grids when they shouldn't be
const gridLogic = (firstPlayer, secondPlayer, cell) => {
  let x;

  //stops function if its computers turn
  if(firstPlayer.isTurn&&firstPlayer.computer){
    x = true;
  } else if (secondPlayer.isTurn&&secondPlayer.computer){
    x = true;
  };

  //stops player from interacting with their own grid
  if(playerOne.isTurn&&cell.classList.contains('grid-cell-1')){
    x = true;
  } else if (playerTwo.isTurn&&cell.classList.contains('grid-cell-2')){
    x = true;
  };

  return x;
};

//Checks if the cell is a label
const checkTier = (cell) =>{
  const cellID = cell.getAttribute('data-cell-coordinate');
  const coordinate = parseCellCoordinate(cellID);

  if(coordinate[0]==='@'||(coordinate.length===2&&coordinate[1]==='0')){
    return true;
  };
};

export const gridEvents = () => {
  const cells = document.querySelectorAll('.grid-cell');
  
  cells.forEach((node)=>{
    if(checkTier(node)){
      return;
    };

    //add turn listener
    node.addEventListener('click',(e)=>{
      let cell = e.target;
      let coord = getGridCoordinate(cell);

      if(gridLogic(playerOne,playerTwo,cell)){
        return;
      };

      turn(playerOne,playerTwo,coord);
      console.log(playerOne.board);
    });

    //add hover cell visual
    node.addEventListener('mouseover',(e)=>{
      let cell = e.target;

      if(gridLogic(playerOne, playerTwo, cell)){
        return;
      };

      cell.classList.add('grid-cell-hover');
    });

    //remove hover cell visual
    node.addEventListener('mouseleave',(e)=>{
      let cell = e.target;
      cell.classList.remove('grid-cell-hover');
    });

    //add and remove click cell visual
    node.addEventListener('mousedown',(e)=>{
      let cell = e.target;

      if(gridLogic(playerOne, playerTwo, cell)){
        return;
      };

      cell.classList.add('grid-cell-mousedown');

      cell.onmouseup = () =>{
        cell.classList.remove('grid-cell-mousedown');
      };

      cell.onmouseleave = () =>{
        cell.classList.remove('grid-cell-mousedown');
      };
    });
  });
};

//temporarily rendering everything for testing/debugging purposes
export const renderGrid = (cells,player) => {
  if(player.board.fleetCoordinates().length === 0){
    resetGrid(cells);
    return;
  };

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

const resetGrid = (cells) => {
  cells.forEach((cell)=>{
    if(checkTier(cell)){
      return;
    };

    cell.textContent = null;
  });
};
