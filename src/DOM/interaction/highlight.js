export const highlight = (firstPlayer, secondPlayer) => {
  const playerOneDisplay = document.getElementById('player-one-display');
  const playerTwoDisplay = document.getElementById('player-two-display');
  const grid1 = document.getElementById('player-one-grid');
  const grid2 = document.getElementById('player-two-grid');

  playerOneDisplay.classList.remove('waiting-player');
  grid1.classList.remove('waiting-player');
  playerTwoDisplay.classList.remove('waiting-player');
  grid2.classList.remove('waiting-player');

  if(firstPlayer.board.getShips().length === 0 && secondPlayer.board.getShips().length === 0){
    return;
  };

  if(firstPlayer.board.attacks.length === 0 &&secondPlayer.board.attacks.length === 0){
    if(firstPlayer.isTurn){
      playerTwoDisplay.classList.add('waiting-player');
      grid2.classList.add('waiting-player');
    } else if (secondPlayer.isTurn){
      playerOneDisplay.classList.add('waiting-player');
      grid1.classList.add('waiting-player');
    };
    return;
  };

  if(firstPlayer.isTurn){
    playerTwoDisplay.classList.add('waiting-player');
    grid2.classList.add('waiting-player');
  } else if (secondPlayer.isTurn){
    playerOneDisplay.classList.add('waiting-player');
    grid1.classList.add('waiting-player');
  };
};