const gameBoard = (() => {
  let gameBoardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const getGameBoard = () => gameBoardArray;
  const setGameBoard = (symbol, yAxis, xAxis) => {
    gameBoardArray[yAxis][xAxis] = symbol;
  };
  const checkWinCondition = () => {
    if (gameBoardArray[0][0] !== "") {
      if (
        (gameBoardArray[0][0] === gameBoardArray[0][1] &&
          gameBoardArray[0][0] === gameBoardArray[0][2]) ||
        (gameBoardArray[0][0] === gameBoardArray[1][1] &&
          gameBoardArray[0][0] === gameBoardArray[2][2]) ||
        (gameBoardArray[0][0] === gameBoardArray[1][0] &&
          gameBoardArray[0][0] === gameBoardArray[2][0])
      ) {
        return gameBoardArray[0][0];
      }
    }

    if (gameBoardArray[1][1] !== "") {
      if (
        (gameBoardArray[1][1] === gameBoardArray[1][0] &&
          gameBoardArray[1][1] === gameBoardArray[1][2]) ||
        (gameBoardArray[1][1] === gameBoardArray[0][2] &&
          gameBoardArray[1][1] === gameBoardArray[2][0]) ||
        (gameBoardArray[1][1] === gameBoardArray[0][1] &&
          gameBoardArray[1][1] === gameBoardArray[2][1])
      ) {
        return gameBoardArray[1][1];
      }
    }

    if (gameBoardArray[2][2] !== "") {
      if (
        (gameBoardArray[2][2] === gameBoardArray[2][0] &&
          gameBoardArray[2][2] === gameBoardArray[2][1]) ||
        (gameBoardArray[2][2] === gameBoardArray[0][2] &&
          gameBoardArray[2][2] === gameBoardArray[1][2])
      ) {
        return gameBoardArray[2][2];
      }
    }

    return false;
  };

  return { getGameBoard, setGameBoard, checkWinCondition };
})();
