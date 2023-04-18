import { playerOne, playerTwo, gameRestart } from "../../modules/gameFunctions";

const winScreen = document.getElementById("win-screen");
const winCont = document.getElementById("win-cont");

export const showScreen = (winner) => {
  let winnerName;

  if (winner === 1) {
    winnerName = playerOne.getName();
  } else if (winner === 2) {
    winnerName = playerTwo.getName();
  }

  winScreen.style.display = null;
  const winnerText = document.createElement("p");
  winnerText.textContent = `${winnerName} won!`;
  const okBtn = document.createElement("button");
  okBtn.textContent = "START NEW GAME";

  okBtn.onclick = () => {
    gameRestart();
    removeScreen();
  };

  winCont.append(winnerText, okBtn);
};

const removeScreen = () => {
  winCont.innerHTML = "";
  winScreen.style.display = "none";
};
