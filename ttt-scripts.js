//event listeners
document.getElementById("win-line-area").addEventListener("click", startGame);
document.getElementById("game-board").addEventListener("click", squareClick);

//game scripts
function shuffleArray(a) {
  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function startGame() {
  if (gameVars.gameOn === false) {
    gameVars.gameOn = true;
    updateMessageArea();
    clearBoard();
    makeInvisible("win-line-area");
    hideWinnerMarks();
    gameData.winConditions = shuffleArray(gameData.winConditions);
    if (gameVars.computerTurn) {
      placeComputerMove();
    }
  }
}

function updateMessageArea() {
  if (gameVars.computerTurn === false) {
    document.getElementById("message-area").innerHTML =
      "You are X, click to begin";
  } else {
    document.getElementById("message-area").innerHTML = "You are O";
  }
}

function clearBoard() {
  for (let i = 0; i < 9; i++) {
    let currentSq = "sq" + i;

    document.getElementById(currentSq).innerHTML = "";
  }
}

//square click
function squareClick(e) {
  const squareClicked = e.target.id;
  const computerThinkTime = Math.random() * 1000 * gameVars.difficulty;
  let isWinner;

  if (
    gameVars.gameOn === true &&
    document.getElementById(squareClicked).innerHTML === "" &&
    squareClicked !== "game-board" &&
    gameVars.awaitingClick === true
  ) {
    gameVars.awaitingClick = false;
    gameVars.currentMove++;
    document.getElementById(squareClicked).innerHTML = clickMark();
    isWinner = checkWinner(); //needs to show move before win notification
    if (isWinner[0] === true) {
      goToWin(isWinner[1]);
      logPlayerWin();
      resetGame(isWinner[1]);
    } else {
      if (gameVars.currentMove === 9) {
        catWins();
      } else {
        setTimeout(placeComputerMove, computerThinkTime);
      }
    }
  }
}

function clickMark() {
  if (gameVars.computerTurn === false) {
    return "X";
  }
  return "O";
}

function checkWinner() {
  const boardState = getBoardState();

  for (let i = 0; i < gameData.winConditions.length; i++) {
    let currentWinCon = gameData.winConditions[i];
    if (
      boardState[currentWinCon[0]] !== "" &&
      boardState[currentWinCon[0]] === boardState[currentWinCon[1]] &&
      boardState[currentWinCon[1]] === boardState[currentWinCon[2]]
    ) {
      makeVisible("win-line-area");
      makeVisible(currentWinCon[3]);
      return [true, boardState[currentWinCon[0]]];
    }
  }
  return [false];
}

function goToWin(winnerMark) {
  document.getElementById("message-area").innerHTML = winnerMark + " wins!";
  gameVars.gameOn = false;
}

function logPlayerWin() {
  gameVars.score.player++;
  document.getElementById("human-score").innerHTML = gameVars.score.player;
}

function makeInvisible(id) {
  document.getElementById(id).classList.add("visibility-hidden");
}

function makeVisible(id) {
  document.getElementById(id).classList.remove("visibility-hidden");
}

function resetGame(winningMark) {
  const wasComputerTurn = gameVars.computerTurn;

  gameVars.currentMove = 0;
  gameVars.gameOn = false;

  if (winningMark === "X" && wasComputerTurn) {
    //computer wins as x
    gameVars.awaitingClick = false;
    gameVars.computerTurn = true;
  } else if (winningMark === "O" && wasComputerTurn) {
    //player wins as o
    gameVars.awaitingClick = true;
    gameVars.computerTurn = false;
  } else if (winningMark === "X" && !wasComputerTurn) {
    //player wins as x
    gameVars.awaitingClick = true;
    gameVars.computerTurn = false;
  } else if (winningMark === "O" && !wasComputerTurn) {
    //computer wins as o
    gameVars.awaitingClick = false;
    gameVars.computerTurn = true;
  } else {
    console.log("Reset Game Error");
  }
}

function catWins() {
  const wasComputerTurn = gameVars.computerTurn;

  //cats game
  makeVisible("win-line-area");
  makeVisible("cats-game");
  document.getElementById("message-area").innerHTML = "Cats Game!";
  gameVars.gameOn = false;
  gameVars.currentMove = 0;

  if (wasComputerTurn) {
    //player switch to x
    gameVars.awaitingClick = true;
    gameVars.computerTurn = false;
  } else {
    //computer switch to x
    gameVars.awaitingClick = false;
    gameVars.computerTurn = true;
  }
}

function hideWinnerMarks() {
  makeInvisible("win-line-area");
  makeInvisible("horizontal-top");
  makeInvisible("horizontal-middle");
  makeInvisible("horizontal-bottom");
  makeInvisible("vertical-left");
  makeInvisible("vertical-center");
  makeInvisible("vertical-right");
  makeInvisible("diagonal-up");
  makeInvisible("diagonal-down");
  makeInvisible("cats-game");
}
