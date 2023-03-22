export const firstTurn = (firstPlayer, secondPlayer) => {
  let number = Math.floor((Math.random() * 10) + 1);

  if(number%2 === 0){
    firstPlayer.isTurn = true;
  } else if (number%2 !== 0){
    secondPlayer.isTurn = true;
  };
};