//rotation
function areArraysEqual(array1, array2) {
  if (array1.length === array2.length) {
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isBestMoveMatchingCurrentBoardState() {
  //checks if there is a best move matching any rotated board state
  const currentBoardState = getBoardState(),
    rotatedBoardStates = getRotatedBoardStates(currentBoardState);

  for (let i = 0; i < rotatedBoardStates.length; i++) {
    let currentRotatedBoardState = rotatedBoardStates[i];

    for (let m = 0; m < gameData.bestMoves.length; m++) {
      let currentBestMove = gameData.bestMoves[m];

      if (areArraysEqual(currentRotatedBoardState[0], currentBestMove[0])) {
        let bestMoveList = currentBestMove[1],
          randomBestMove = shuffleArray(bestMoveList),
          unrotatedBestMove = findUnrotatedIndex(i, randomBestMove[0]);

        return [true, unrotatedBestMove];
      }
    }
  }
  return [false];
}

function isInArray(thingToCheck, arrayItMightBeIn) {
  for (var i = 0; i < arrayItMightBeIn.length; i++) {
    if (thingToCheck === arrayItMightBeIn[i]) {
      return true;
    }
  }
  return false;
}

function indexToBoardState(index) {
  //return a board state with "M" at index
  let boardState = [];

  for (var i = 0; i < 9; i++) {
    if (i === index) {
      boardState.push("M");
    } else {
      boardState.push("");
    }
  }
  return boardState;
}

function findUnrotatedIndex(rotationIndex, mapIndex) {
  //needs to rotate map index backwards rotation number of steps

  //returns an index for the map translated by the rotationIndex
  const mapIndexBoardState = indexToBoardState(mapIndex),
    rotatedMapIndexStates = getUnrotatedBoardStates(mapIndexBoardState),
    currentMapIndexState = rotatedMapIndexStates[rotationIndex][0];

  for (var i = 0; i < currentMapIndexState.length; i++) {
    if (currentMapIndexState[i] === "M") {
      return i;
    }
  }
  console.log(
    "Find Rotated Index Error, Rotation Index: ",
    rotationIndex,
    "- Map Index: ",
    mapIndex
  );
}

function getUnrotatedBoardStates(currentBoardState) {
  //returns an array of all unrotated and mirrored board states
  let unRotatedStates = [];

  const rotatedOnce = rotateBoardClockwiseOnce(currentBoardState),
    rotatedTwice = rotateBoardClockwiseOnce(rotatedOnce),
    rotatedThrice = rotateBoardClockwiseOnce(rotatedTwice),
    mirroredSideways = mirrorSidewayBoardStateOnce(currentBoardState),
    mirroredSidewaysRotatedOnce = rotateBoardClockwiseOnce(mirroredSideways),
    mirroredSidewaysRotatedTwice = rotateBoardClockwiseOnce(
      mirroredSidewaysRotatedOnce
    ),
    mirroredSidewaysRotatedThrice = rotateBoardClockwiseOnce(
      mirroredSidewaysRotatedTwice
    ),
    mirroredUp = mirrorUpBoardStateOnce(currentBoardState),
    mirroredUpRotatedOnce = rotateBoardClockwiseOnce(mirroredUp),
    mirroredUpRotatedTwice = rotateBoardClockwiseOnce(mirroredUpRotatedOnce),
    mirroredUpRotatedThrice = rotateBoardClockwiseOnce(mirroredUpRotatedTwice),
    mirroredBoth = mirrorUpBoardStateOnce(mirroredUp),
    mirroredBothRotatedOnce = mirrorUpBoardStateOnce(mirroredBoth),
    mirroredBothRotatedTwice = mirrorUpBoardStateOnce(mirroredBothRotatedOnce),
    mirroredBothRotatedThrice = mirrorUpBoardStateOnce(
      mirroredBothRotatedTwice
    );

  //include 4 rotations
  unRotatedStates.push([currentBoardState, 0, "Current Board State"]);
  unRotatedStates.push([rotatedThrice, 1, "Unrotated Once"]);
  unRotatedStates.push([rotatedTwice, 2, "Unrotated Twice"]);
  unRotatedStates.push([rotatedOnce, 3, "Unrotated Thrice"]);

  //include extra sideways mirror rotations
  unRotatedStates.push([mirroredSideways, 4, "Mirrored Sideways"]);
  unRotatedStates.push([
    mirroredSidewaysRotatedThrice,
    5,
    "Mirrored Sideways Unrotated Once",
  ]);
  unRotatedStates.push([
    mirroredSidewaysRotatedTwice,
    6,
    "Mirrored Sideways Unrotated Twice",
  ]);
  unRotatedStates.push([
    mirroredSidewaysRotatedOnce,
    7,
    "Mirrored Sideways Unrotated Thrice",
  ]);

  //include extra up mirror rotations
  unRotatedStates.push([mirroredUp, 8, "Mirrored Up"]);
  unRotatedStates.push([
    mirroredUpRotatedThrice,
    9,
    "Mirrored Up Unrotated Once",
  ]);
  unRotatedStates.push([
    mirroredUpRotatedTwice,
    10,
    "Mirrored Up Unrotated Once",
  ]);
  unRotatedStates.push([
    mirroredUpRotatedOnce,
    11,
    "Mirrored Up Unrotated Once",
  ]);

  //include extra up and sideways mirror rotations
  unRotatedStates.push([mirroredBoth, 12, "Mirrored Both"]);
  unRotatedStates.push([
    mirroredBothRotatedThrice,
    13,
    "Mirrored Both Unrotated Once",
  ]);
  unRotatedStates.push([
    mirroredBothRotatedTwice,
    14,
    "Mirrored Both Unrotated Twice",
  ]);
  unRotatedStates.push([
    mirroredBothRotatedOnce,
    15,
    "Mirrored Both Unrotated Thrice",
  ]);
  return unRotatedStates;
}

function getRotatedBoardStates(currentBoardState) {
  //returns an array of all rotated and mirrored board states
  let rotatedStates = [];

  const rotatedOnce = rotateBoardClockwiseOnce(currentBoardState),
    rotatedTwice = rotateBoardClockwiseOnce(rotatedOnce),
    rotatedThrice = rotateBoardClockwiseOnce(rotatedTwice),
    mirroredSideways = mirrorSidewayBoardStateOnce(currentBoardState),
    mirroredSidewaysRotatedOnce = rotateBoardClockwiseOnce(mirroredSideways),
    mirroredSidewaysRotatedTwice = rotateBoardClockwiseOnce(
      mirroredSidewaysRotatedOnce
    ),
    mirroredSidewaysRotatedThrice = rotateBoardClockwiseOnce(
      mirroredSidewaysRotatedTwice
    ),
    mirroredUp = mirrorUpBoardStateOnce(currentBoardState),
    mirroredUpRotatedOnce = rotateBoardClockwiseOnce(mirroredUp),
    mirroredUpRotatedTwice = rotateBoardClockwiseOnce(mirroredUpRotatedOnce),
    mirroredUpRotatedThrice = rotateBoardClockwiseOnce(mirroredUpRotatedTwice),
    mirroredBoth = mirrorUpBoardStateOnce(mirroredUp),
    mirroredBothRotatedOnce = mirrorUpBoardStateOnce(mirroredBoth),
    mirroredBothRotatedTwice = mirrorUpBoardStateOnce(mirroredBothRotatedOnce),
    mirroredBothRotatedThrice = mirrorUpBoardStateOnce(
      mirroredBothRotatedTwice
    );

  //include 4 rotations
  rotatedStates.push([currentBoardState, 0, "Current Board State"]);
  rotatedStates.push([rotatedOnce, 1, "Rotated Once"]);
  rotatedStates.push([rotatedTwice, 2, "Rotated Twice"]);
  rotatedStates.push([rotatedThrice, 3, "Rotated Thrice"]);

  //include extra sideways mirror rotations
  rotatedStates.push([mirroredSideways, 4, "Mirrored Sideways"]);
  rotatedStates.push([
    mirroredSidewaysRotatedOnce,
    5,
    "Mirrored Sideways Rotated Once",
  ]);
  rotatedStates.push([
    mirroredSidewaysRotatedTwice,
    6,
    "Mirrored Sideways Rotated Twice",
  ]);
  rotatedStates.push([
    mirroredSidewaysRotatedThrice,
    7,
    "Mirrored Sideways Rotated Thrice",
  ]);

  //include extra up mirror rotations
  rotatedStates.push([mirroredUp, 8, "Mirrored Up"]);
  rotatedStates.push([mirroredUpRotatedOnce, 9, "Mirrored Up Rotated Once"]);
  rotatedStates.push([mirroredUpRotatedTwice, 10, "Mirrored Up Rotated Once"]);
  rotatedStates.push([mirroredUpRotatedThrice, 11, "Mirrored Up Rotated Once"]);

  //include extra up and sideways mirror rotations
  rotatedStates.push([mirroredBoth, 12, "Mirrored Both"]);
  rotatedStates.push([
    mirroredBothRotatedOnce,
    13,
    "Mirrored Both Rotated Once",
  ]);
  rotatedStates.push([
    mirroredBothRotatedTwice,
    14,
    "Mirrored Both Rotated Twice",
  ]);
  rotatedStates.push([
    mirroredBothRotatedThrice,
    15,
    "Mirrored Both Rotated Thrice",
  ]);
  return rotatedStates;
}

function rotateBoardClockwiseOnce(currentBoardState) {
  //returns one clockwise rotation
  let rotatedBoard = [];

  rotatedBoard.push(currentBoardState[6]);
  rotatedBoard.push(currentBoardState[3]);
  rotatedBoard.push(currentBoardState[0]);
  rotatedBoard.push(currentBoardState[7]);
  rotatedBoard.push(currentBoardState[4]);
  rotatedBoard.push(currentBoardState[1]);
  rotatedBoard.push(currentBoardState[8]);
  rotatedBoard.push(currentBoardState[5]);
  rotatedBoard.push(currentBoardState[2]);
  return rotatedBoard;
}

function mirrorSidewayBoardStateOnce(currentBoardState) {
  //returns one mirrored rotation
  let rotatedBoard = [];

  rotatedBoard.push(currentBoardState[2]);
  rotatedBoard.push(currentBoardState[1]);
  rotatedBoard.push(currentBoardState[0]);
  rotatedBoard.push(currentBoardState[5]);
  rotatedBoard.push(currentBoardState[4]);
  rotatedBoard.push(currentBoardState[3]);
  rotatedBoard.push(currentBoardState[8]);
  rotatedBoard.push(currentBoardState[7]);
  rotatedBoard.push(currentBoardState[6]);

  return rotatedBoard;
}

function mirrorUpBoardStateOnce(currentBoardState) {
  //returns one top to bottom mirror rotation
  let rotatedBoard = [];

  rotatedBoard.push(currentBoardState[6]);
  rotatedBoard.push(currentBoardState[7]);
  rotatedBoard.push(currentBoardState[8]);
  rotatedBoard.push(currentBoardState[3]);
  rotatedBoard.push(currentBoardState[4]);
  rotatedBoard.push(currentBoardState[5]);
  rotatedBoard.push(currentBoardState[0]);
  rotatedBoard.push(currentBoardState[1]);
  rotatedBoard.push(currentBoardState[2]);

  return rotatedBoard;
}
