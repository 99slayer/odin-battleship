export const createGrid = (grid,gridNum) => {
  for(let i=0;i<11;i+=1){
    let row = i;
    let gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    gridRow.setAttribute('id',`grid-row-${i}`);
    gridRow.setAttribute('data-row-number',`${i}`);
    //PROBABLY DONT NEED ID AND DATA ATTRIBUTE, BUT I'LL COME BACK TO THIS.
    for(let i=0;i<11;i+=1){
      let currentRow = row
      let gridCell = document.createElement('div');
      gridCell.classList.add('grid-cell');
      gridCell.classList.add(`grid-cell-${gridNum}`);
      gridCell.setAttribute('id',`grid-cell-${i}-${row}`);
      gridCell.setAttribute('data-cell-coordinate',`${i}-${row}`);
      gridCell.style.border = '1px solid black';
      gridRow.appendChild(gridCell);
    };
    grid.appendChild(gridRow);
  };

  const labelRows = () => {
    const nodeList = [];
    let rows = grid.childNodes;

    rows.forEach((e)=>{
      nodeList.push(e.firstChild);
    });

    let i = 1;
    nodeList.forEach((e)=>{
      e.style.border = 'none';
      if(e.getAttribute('data-cell-coordinate') === '0-0'){
        return;
      };
      e.textContent = `${i}`;
      i += 1;
    });
  };

  const labelColumns = () => {
    const nodeList = grid.firstChild.childNodes;
    let i = 0
    nodeList.forEach((e)=>{
      e.style.border = 'none';
      const cellCoordinate = e.getAttribute('data-cell-coordinate');
      if(cellCoordinate === '0-0'){
        return;
      };
      e.textContent = `${String.fromCharCode(65 + i)}`;
      i += 1;
    });
  };

  labelRows();
  labelColumns();
};