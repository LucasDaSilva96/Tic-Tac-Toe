// This function initializes the game board and sets up event listeners for the canvas element
function init(player, OPPONENT) {
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");
  const COLUMN = 3;
  const ROW = 3;
  const xImage = new Image();
  xImage.src = "X.png";

  const oImage = new Image();
  oImage.src = "O.png";

  let board = [];

  const SPACE_SIZE = 150;
  // This function draws the initial game board on the canvas using the ctx.strokeRect() method.
  // It sets up a 3x3 grid and assigns unique IDs to each cell of the board.
  function drawBoard() {
    let id = 0;
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id;
        ctx.strokeStyle = "#000";
        ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);

        id++;
      }
    }
  }
  drawBoard();

  let gameData = new Array(9);
  let currentPlayer = player.man;

  let GAME_OVER = false;
  const win_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // The canvas element has a click event listener that handles the player's moves.
  // It calculates the cell position based on the mouse click coordinates and updates the game state accordingly
  canvas.addEventListener("click", function (event) {
    if (GAME_OVER) return;
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);

    let id = board[i][j];
    if (gameData[id]) return;
    gameData[id] = currentPlayer;

    drawOnBoard(currentPlayer, i, j);

    if (isWinner(gameData, currentPlayer)) {
      showGameOver(currentPlayer);
      GAME_OVER = true;
      return;
    }
    if (isTie(gameData)) {
      showGameOver("Tie");
      GAME_OVER = true;
      return;
    }
    // If the opponent is the computer (OPPONENT === "computer"), the code uses the minimax() function to
    // determine the best move for the computer player.
    // It recursively evaluates possible moves and assigns a score to each move.
    // The computer then selects the move with the highest score.
    if (OPPONENT === "computer") {
      let id = minimax(gameData, player.computer).id;

      let space = getIJ(id);

      gameData[id] = player.computer;

      drawOnBoard(player.computer, space.i, space.j);

      if (isWinner(gameData, player.computer)) {
        showGameOver(player.computer);
        GAME_OVER = true;
        return;
      }
      if (isTie(gameData)) {
        showGameOver("Tie");
        GAME_OVER = true;
        return;
      }
    } else if (currentPlayer === player.man && OPPONENT === "friend") {
      currentPlayer = player.friend;
    } else if (currentPlayer === player.friend && OPPONENT === "friend") {
      currentPlayer = player.man;
    }
  });

  function minimax(gameData, PLAYER) {
    // BASE
    if (isWinner(gameData, player.computer)) return { evaluation: +10 };
    if (isWinner(gameData, player.man)) return { evaluation: -10 };
    if (isTie(gameData)) return { evaluation: 0 };

    // LOOK FOR EMPTY SPACES
    let EMPTY_SPACES = getEmptySpaces(gameData);

    // SAVE ALL MOVES AND THEIR EVALUATIONS
    let moves = [];

    // LOOP OVER THE EMPTY SPACES TO EVALUATE THEM
    for (let i = 0; i < EMPTY_SPACES.length; i++) {
      // GET THE ID OF THE EMPTY SPACE
      let id = EMPTY_SPACES[i];

      // BACK UP THE SPACE
      let backup = gameData[id];

      // MAKE THE MOVE FOR THE PLAYER
      gameData[id] = PLAYER;

      // SAVE THE MOVE'S ID AND EVALUATION
      let move = {};
      move.id = id;
      // THE MOVE EVALUATION
      if (PLAYER == player.computer) {
        move.evaluation = minimax(gameData, player.man).evaluation;
      } else {
        move.evaluation = minimax(gameData, player.computer).evaluation;
      }

      // RESTORE SPACE
      gameData[id] = backup;

      // SAVE MOVE TO MOVES ARRAY
      moves.push(move);
    }

    // MINIMAX ALGORITHM
    let bestMove;

    if (PLAYER == player.computer) {
      // MAXIMIZER
      let bestEvaluation = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation > bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }
      }
    } else {
      // MINIMIZER
      let bestEvaluation = +Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation < bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }
      }
    }

    return bestMove;
  }
  // This function retrieves the row and column indices of a cell on the game board based on its ID.
  function getIJ(id) {
    console.log(id);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == id) {
          return { i: i, j: j };
        }
      }
    }
  }

  // This  function checks if a player has won the game by comparing the game board with the winning
  // combinations defined in the win_combos array
  function isWinner(gameData, player) {
    for (let i = 0; i < win_combos.length; i++) {
      let won = true;

      for (let j = 0; j < win_combos[i].length; j++) {
        let id = win_combos[i][j];
        won = gameData[id] === player && won;
      }

      if (won) {
        return true;
      }
    }
    return false;
  }

  // This function displays the game over message based on the winner or a tie
  function showGameOver(player) {
    const result_box = document.querySelector(".play-again-container");
    const result_txt = document.querySelector(".result-txt");
    const board_html = document.querySelector(".board");
    setTimeout(function () {
      board_html.classList.add("hidden");
      result_box.classList.remove("hidden");
    }, 400);

    if (player === "Tie") {
      result_txt.textContent = "NO WINNER...BORING..";
    } else if (player === "X") {
      result_txt.textContent = `The Winner: [X]`;
    } else if (player === "O") {
      result_txt.textContent = `The Winner: [O]`;
    }
  }

  // This is the play again logic, which resets the game and reloads the page
  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.addEventListener("click", function () {
    const result_box = document.querySelector(".play-again-container");
    result_box.classList.add("hidden");
    play_container.classList.add("hidden");
    start_container.classList.remove("hidden");
    location.reload();
  });

  // This function is responsible for drawing the player's move on the game board
  function drawOnBoard(player, i, j) {
    let img;
    let imageWidth;
    let imageHeight;
    let x_value;
    let y_value;
    if (player === "X") {
      img = xImage;
      // Align the image in the center of each space
      imageWidth = xImage.width;
      imageHeight = xImage.height;
      x_value = j * SPACE_SIZE + (SPACE_SIZE - imageWidth) / 2;
      y_value = i * SPACE_SIZE + (SPACE_SIZE - imageHeight) / 2;
    } else {
      img = oImage;
      // Align the image in the center of each space
      imageWidth = oImage.width;
      imageHeight = oImage.height;
      x_value = j * SPACE_SIZE + (SPACE_SIZE - imageWidth) / 2;
      y_value = i * SPACE_SIZE + (SPACE_SIZE - imageHeight) / 2;
    }

    ctx.drawImage(img, x_value, y_value, imageWidth, imageHeight);
  }
}
// This function checks if the game board is fully filled with moves and returns true if it is.
function isTie(gameData) {
  let isBoardFill = true;
  for (let i = 0; i < gameData.length; i++) {
    isBoardFill = gameData[i] && isBoardFill;
  }
  if (isBoardFill) {
    return true;
  }
  return false;
}

// GET EMPTY SPACES
function getEmptySpaces(gameData) {
  let EMPTY = [];

  for (let id = 0; id < gameData.length; id++) {
    if (!gameData[id]) EMPTY.push(id);
  }

  return EMPTY;
}
