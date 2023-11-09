let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let moveCount = 0;

function makeMove(index) {
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    document.querySelector(`.cell:nth-child(${index + 1})`).textContent = currentPlayer;
    moveCount++;

    const cellClickSound = document.getElementById('cellClickSound');
    cellClickSound.play();

    if (checkWin()) {
      document.getElementById('winner').textContent = `Player ${currentPlayer} winner!`;
      document.getElementById('moves').textContent = `Total moves: ${moveCount}`;
      gameActive = false;
      const winSound = document.getElementById('winSound');
      winSound.play();
    } else if (checkDraw()) {
      document.getElementById('winner').textContent = 'Draw!';
      document.getElementById('moves').textContent = `Total moves: ${moveCount}`;
      gameActive = false;
      currentPlayer = 'Draw';
      const drawSound = document.getElementById('drawSound');
      drawSound.play();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    saveGameResult(currentPlayer, moveCount);
  }
}

function saveGameResult(winner, moves) {  
  let gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];  
  gameResults.unshift({ winner, moves });
  
  if (gameResults.length > 10) {
    gameResults.pop();
  }
  
  localStorage.setItem('gameResults', JSON.stringify(gameResults));
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return gameBoard.every((cell) => cell !== '');
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('winner').textContent = '';
  document.getElementById('moves').textContent = '';
  document.querySelectorAll('.cell').forEach((cell) => (cell.textContent = ''));

  displayGameResults();
}

function displayGameResults() {  
  const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
  const leaderboardTbody = document.getElementById('leaderboard');
  
  leaderboardTbody.innerHTML = '';
  
  gameResults.forEach((result, index) => {
    const row = document.createElement('tr');
    const winnerCell = document.createElement('td');
    const movesCell = document.createElement('td');

    winnerCell.textContent = `Player ${result.winner}`;
    movesCell.textContent = `Moves: ${result.moves}`;

    row.appendChild(winnerCell);
    row.appendChild(movesCell);

    leaderboardTbody.appendChild(row);
  });
}

displayGameResults();
