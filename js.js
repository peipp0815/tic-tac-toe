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
        console.log("1st");
        return true;
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
        console.log("2nd");
        return true;
      }
    }

    if (gameBoardArray[2][2] !== "") {
      if (
        (gameBoardArray[2][2] === gameBoardArray[2][0] &&
          gameBoardArray[2][2] === gameBoardArray[2][1]) ||
        (gameBoardArray[2][2] === gameBoardArray[0][2] &&
          gameBoardArray[2][2] === gameBoardArray[1][2])
      ) {
        console.log("3rd");
        return true;
      }
    }
    console.log("4th");
    return false;
  };

  return { getGameBoard, setGameBoard, checkWinCondition };
})();

function createPlayer(name, symbol) {
  const makeMove = (y, x) => gameBoard.setGameBoard(symbol, y, x);
  return { name, symbol, makeMove };
}

const player1 = createPlayer("One", "X");
const player2 = createPlayer("Two", "O");

const gameController = (() => {
  let player1Active = true;
  function switchActivePlayer() {
    player1Active = !player1Active;
  }
  function getActivePlayer() {
    if (player1Active) {
      return player1;
    } else {
      return player2;
    }
  }

  function playRound() {
    console.log(gameBoard.getGameBoard());
    const player = getActivePlayer();
    const y = prompt();
    const x = prompt();
    player.makeMove(y, x);
    console.log(gameBoard.getGameBoard());
    if (gameBoard.checkWinCondition()) {
      console.log(`${player.name} won!`);
    } else {
      switchActivePlayer();
    }
  }

  return { switchActivePlayer, getActivePlayer, playRound };
})();
