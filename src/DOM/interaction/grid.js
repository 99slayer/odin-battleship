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

export const placementPhase = (player, playerNum) => {
  let cells = document.querySelectorAll(`.grid-cell-${playerNum}`);
  const sizeArr = [5,4,3,3,2];
  let axis = 'y';

  cells.forEach((cell)=>{
    if(checkTier(cell)){
      return;
    };

    cell.addEventListener('mouseover',(e)=>{
      if(sizeArr.length===0){
        return;
      };

      let targetCell = e.target;
      let targetCellCoordinate = targetCell.getAttribute('data-cell-coordinate');
      let hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);
      // ------------------------------------------------
      //should make each of these a function
      hoverCells.forEach((hoverCell)=>{
        if(!hoverCell){
          //alert user they are trying to place a ship out of bounds.
          return;
        };

        hoverCell.classList.add('grid-cell-hover');
      });

      targetCell.onmouseleave = (e) => {
        cells.forEach((c)=>{
          c.classList.remove('grid-cell-hover');
        });
      };
      // ------------------------------------------------
      
      //change axis
      document.oncontextmenu = (e) => {
        e.preventDefault();

        hoverCells.forEach((hoverCell)=>{
          if(hoverCell === null){
            return;
          };

          hoverCell.classList.remove('grid-cell-hover');
        });

        if(axis === 'y'){
          axis = 'x';
        } else if (axis === 'x'){
          axis = 'y';
        };

        hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);

        hoverCells.forEach((hoverCell)=>{
          if(hoverCell === null){
            return;
          };

          hoverCell.classList.add('grid-cell-hover');
        });
      };

      //place ship
      targetCell.onclick = (e) => {
        if(hoverCells.includes(null)){
          console.log('OUT OF BOUNDS.');
          return;
        };

        let fleetArr = [];

        if(!(player.board.fleetCoordinates().length === 0)){
          fleetArr = player.board.fleetCoordinates().reduce((acc,val)=> acc.concat(val));
        };

        for(let i=0;i<hoverCells.length;i+=1){
          let cellCoord = hoverCells[i].getAttribute('data-cell-coordinate');

          if(fleetArr.includes(parseCellCoordinate(cellCoord))){
            return;
          };
        };

        const coordArr = [];

        for(let i=0;i<hoverCells.length;i+=1){
          let attribute = hoverCells[i].getAttribute('data-cell-coordinate');
          let coord = parseCellCoordinate(attribute);
          coordArr.push(coord);
        };

        player.board.place(coordArr);
        sizeArr.shift();
        console.log(sizeArr);
        hoverCells = getHoverCells(targetCellCoordinate,sizeArr[0],axis,playerNum);
        //rerender hovercells for hover visual
        renderGrid(cells,player);

        if(sizeArr.length === 0){
          const doneBtn = document.getElementById('done-btn');
          doneBtn.style.display = 'block';
        };
      };
    });
  });
};

//returns node list
const getHoverCells = (start,size,axis,playerNum) => {
  const hoverCells = [];
  const startArr = start.split('');
  let x = getX(startArr);
  x = parseInt(x);
  let y = getY(startArr);
  y = parseInt(y);

  if(axis === 'x'){
    for(let i=0;i<size;i+=1){
      let cellX = (x + i) + '-' + y;
      hoverCells.push(document.querySelector(`.grid-${playerNum} [data-cell-coordinate="${cellX}"]`));
    };
  } else if (axis === 'y'){
    for(let i=0;i<size;i+=1){
      let cellY = x + '-' + (y + i);
      hoverCells.push(document.querySelector(`.grid-${playerNum} [data-cell-coordinate="${cellY}"]`));
    };
  };

  return hoverCells;
};

const getX = (arr) =>{
  let x;
  if(!(isNaN(parseInt(arr[1])))){
    let twoDigit = arr.slice(0,2);
    x = twoDigit.join('');
  } else {
    x = arr[0];
  };
  return x;
};

const getY = (arr) => {
  let y;
  if(!(isNaN(parseInt(arr[arr.length-2])))){
    let twoDigit = arr.slice(arr.length-2);
    y = twoDigit.join('');
  } else {
    y = arr[arr.length-1];
  };
  return y;
};

const nextPlacement = () => {

};
