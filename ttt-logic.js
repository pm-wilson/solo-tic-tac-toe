function placeComputerMove() {
  const mark = computerMark(),
    movesquare = computerMove();
  var computerWinCheck;

  //mark computer move
  document.getElementById(movesquare).innerHTML = mark;

  computerWinCheck = checkWinner();

  if (computerWinCheck[0]) {
    goToWin(computerWinCheck[1]);
    logComputerWin();
    resetGame(computerWinCheck[1]);
  } else {
    gameVars.currentMove++;
    gameVars.awaitingClick = true;
    if (gameVars.currentMove === 9) {
      catWins();
    }
  }
}

function computerMark() {
  if (gameVars.computerTurn === true) {
    return "X";
  }
  return "O";
}

function logComputerWin() {
  gameVars.score.computer++;
  document.getElementById("computer-score").innerHTML = gameVars.score.computer;
}

function getBoardState() {
  var boardState = [];

  for (let i = 0; i < 9; i++) {
    boardState.push(document.getElementById("sq" + i).innerHTML);
  }

  return boardState;
}

function computerBrain() {
  return Math.floor(Math.random() * 9);
}

function getRandomInArray(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomMove() {
  const board = getBoardState();
  let freeMoves = [],
    randomMove = 0;

  //load free moves
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      freeMoves.push(i);
    }
  }

  randomMove = getRandomInArray(freeMoves);
  return randomMove;
}

function checkObviousMove() {
  //returns true if there is an obvious move, 0 is replaced with move ex: [true, 0]
  //wincon check return not referencing actual board position
  const computerisX = gameVars.computerTurn;
  const board = getBoardState();

  for (let i = 0; i < gameData.winConditions.length; i++) {
    let currentWinCon = gameData.winConditions[i],
      check1 = board[currentWinCon[0]],
      check2 = board[currentWinCon[1]],
      check3 = board[currentWinCon[2]],
      winConCheck = check2of3andBlank([check1, check2, check3]);

    if (computerisX) {
      //computer is x check attack
      if (winConCheck[0] && winConCheck[1] === "X") {
        return [true, currentWinCon[winConCheck[2]]];
      }
    }
  }
  for (let i = 0; i < gameData.winConditions.length; i++) {
    let currentWinCon = gameData.winConditions[i],
      check1 = board[currentWinCon[0]],
      check2 = board[currentWinCon[1]],
      check3 = board[currentWinCon[2]],
      winConCheck = check2of3andBlank([check1, check2, check3]);

    if (computerisX) {
      //computer is x check block
      if (winConCheck[0] && winConCheck[1] === "O") {
        return [true, currentWinCon[winConCheck[2]]];
      }
    }
  }
  for (let i = 0; i < gameData.winConditions.length; i++) {
    let currentWinCon = gameData.winConditions[i],
      check1 = board[currentWinCon[0]],
      check2 = board[currentWinCon[1]],
      check3 = board[currentWinCon[2]],
      winConCheck = check2of3andBlank([check1, check2, check3]);

    if (computerisX === false) {
      //computer is o check attack
      if (winConCheck[0] && winConCheck[1] === "O") {
        return [true, currentWinCon[winConCheck[2]]];
      }
    }
  }
  for (let i = 0; i < gameData.winConditions.length; i++) {
    let currentWinCon = gameData.winConditions[i],
      check1 = board[currentWinCon[0]],
      check2 = board[currentWinCon[1]],
      check3 = board[currentWinCon[2]],
      winConCheck = check2of3andBlank([check1, check2, check3]);

    if (computerisX === false) {
      //computer is o check block
      if (winConCheck[0] && winConCheck[1] === "X") {
        return [true, currentWinCon[winConCheck[2]]];
      }
    }
  }
  return [false];
}

function check2of3andBlank(arrayOf3) {
  //returns if 2 are (x or 0) and one is blank, letter that has the pair, and blank index ex: [true, "X", 1]
  const val1 = arrayOf3[0],
    val2 = arrayOf3[1],
    val3 = arrayOf3[2];

  if (val1 === "") {
    if (val2 !== "" && val2 === val3) {
      return [true, val2, 0];
    }
  } else if (val2 === "") {
    if (val1 !== "" && val1 === val3) {
      return [true, val3, 1];
    }
  } else if (val3 === "") {
    if (val2 !== "" && val2 === val1) {
      return [true, val1, 2];
    }
  }
  return [false];
}

function computerMove() {
  let currentMove = "sq";
  const obviousMove = checkObviousMove(),
    bestMoveMatch = isBestMoveMatchingCurrentBoardState();

  if (obviousMove[0]) {
    currentMove += obviousMove[1];
  } else if (gameVars.difficulty > 0 && bestMoveMatch[0]) {
    currentMove += bestMoveMatch[1];
  } else {
    currentMove += getRandomMove();
  }
  if (document.getElementById(currentMove).innerHTML === "") {
    return currentMove;
  }
  console.log(currentMove, " is an Illegal move using random");
  return "sq" + getRandomMove();
}
