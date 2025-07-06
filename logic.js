function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let currentPlayer = 'X';
  let playerWhoWon = null;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;
  const getCurrentPlayer = () => currentPlayer;
  const getWinner = () => playerWhoWon;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const checkWin = () => {
    for (let i = 0; i < rows; i++) {
      if (
        board[i][0].getToken() !== null &&
        board[i][0].getToken() === board[i][1].getToken() &&
        board[i][0].getToken() === board[i][2].getToken()
      ) {
        playerWhoWon = board[i][0].getToken();
        return true;
      }
    }

    for (let j = 0; j < columns; j++) {
      if (
        board[0][j].getToken() !== null &&
        board[0][j].getToken() === board[1][j].getToken() &&
        board[0][j].getToken() === board[2][j].getToken()
      ) {
        playerWhoWon = board[0][j].getToken();
        return true;
      }
    }

    if (
      board[0][0].getToken() !== null &&
      board[0][0].getToken() === board[1][1].getToken() &&
      board[0][0].getToken() === board[2][2].getToken()
    ) {
      playerWhoWon = board[0][0].getToken();
      return true;
    }

    if (
      board[0][2].getToken() !== null &&
      board[0][2].getToken() === board[1][1].getToken() &&
      board[0][2].getToken() === board[2][0].getToken()
    ) {
      playerWhoWon = board[0][2].getToken();
      return true;
    }

    return false;
  };

  const isDraw = () => {
    if (playerWhoWon !== null) return false;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (board[i][j].getToken() === null) {
          return false;
        }
      }
    }
    return true;
  };

  const addToken = (row, col) => {
    if (playerWhoWon !== null) throw new Error("Game already has a winner");
    if (row < 0 || row >= rows || col < 0 || col >= columns) throw new Error("Invalid position");
    if (board[row][col].getToken() !== null) throw new Error("Cell already occupied");

    board[row][col].setFlag(currentPlayer);

    if (!checkWin()) {
      if (!isDraw()) {
        switchPlayer();
      }
    }
  };

  return {
    getBoard,
    addToken,
    getCurrentPlayer,
    getWinner,
    isDraw
  };
}

function Cell() {
  let currentFlag = null;

  const setFlag = (playerFlag) => {
    currentFlag = playerFlag;
  };
  const getToken = () => currentFlag;

  return {
    setFlag,
    getToken
  };
}
