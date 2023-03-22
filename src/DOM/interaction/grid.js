import { parseCellCoordinate } from "../../modules/parseCellCoordinate";

export const gridEvents = () => {
  const cells = document.querySelectorAll('.grid-cell');

  cells.forEach((node)=>{
    node.addEventListener('click',(e)=>{
      //if player turn take shot and visually represent result
      console.log(e.target);
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
