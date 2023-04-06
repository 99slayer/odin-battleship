export const highlight = (firstPlayer, secondPlayer) => {
  const playerOneDisplay = document.getElementById('player-one-display');
  const playerTwoDisplay = document.getElementById('player-two-display');
  const grid1 = document.getElementById('player-one-grid');
  const grid2 = document.getElementById('player-two-grid');

  //think it'll look better if i reverse who gets highlighted when attacking**
  if(firstPlayer.board.attacks.length === 0 &&secondPlayer.board.attacks.length === 0){
    if(firstPlayer.isTurn){
      playerOneDisplay.classList.add('current-player');
      grid1.classList.add('current-player');
    } else if (secondPlayer.isTurn){
      playerTwoDisplay.classList.add('current-player');
      grid2.classList.add('current-player');
    };
    return;
  };

  if(firstPlayer.isTurn){
    playerOneDisplay.classList.add('current-player');
    grid1.classList.add('current-player');
    playerTwoDisplay.classList.remove('current-player');
    grid2.classList.remove('current-player');
  } else if (secondPlayer.isTurn){
    playerTwoDisplay.classList.add('current-player');
    grid2.classList.add('current-player');
    playerOneDisplay.classList.remove('current-player');
    grid1.classList.remove('current-player');
  };
};