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

  function resetGameBoard() {
    gameBoardArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  return { getGameBoard, setGameBoard, checkWinCondition, resetGameBoard };
})();

const gameController = (() => {
  function createPlayer(name, symbol) {
    const makeMove = (y, x) => gameBoard.setGameBoard(symbol, y, x);
    return { name, symbol, makeMove };
  }

  const player1 = createPlayer("One", "X");
  const player2 = createPlayer("Two", "O");

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

  function playRound(y, x) {
    const player = getActivePlayer();
    player.makeMove(y, x);
    console.log(gameBoard.getGameBoard());
    if (gameBoard.checkWinCondition()) {
      document.getElementById("result").textContent = `${player.name} won!`;
      displayController.end();
    } else {
      switchActivePlayer();
    }
  }

  function resetGame() {
    gameBoard.resetGameBoard();
    player1Active = true;
    displayController.resetDisplay();
  }

  return { switchActivePlayer, getActivePlayer, playRound, resetGame };
})();

const displayController = (() => {
  const tttButtons = document.querySelectorAll(".ticTacToeBtn");

  function start() {
    tttButtons.forEach((button) => {
      button.addEventListener("click", helpPlay);
      function helpPlay() {
        play(button);
        button.disabled = true;
      }
      button.disabled = true;
    });
  }
  function play(button) {
    const player = gameController.getActivePlayer();
    button.textContent = player.symbol;
    gameController.playRound(
      Number(button.dataset.yaxis),
      Number(button.dataset.xaxis),
    );
  }
  function end() {
    tttButtons.forEach((button) => {
      button.disabled = true;
    });
    startGameBtn.style.display = "block";
  }
  function resetDisplay() {
    tttButtons.forEach((button) => {
      button.textContent = "";
      button.disabled = false;
    });
    document.getElementById("result").textContent = ``;
  }
  return { start, play, end, resetDisplay };
})();
displayController.start();
const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", () => {
  gameController.resetGame();
  startGameBtn.style.display = "none";
});
