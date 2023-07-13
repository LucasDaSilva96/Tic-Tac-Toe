const cells = document.querySelectorAll("[data-cell");
const board = document.querySelector(".container");

const PLAYER_X = [];
const PLAYER_O = [];

let IS_X_TURN = true;

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((el) => {
  el.addEventListener(
    "click",
    function () {
      if (IS_X_TURN) {
        PLAYER_X.push(Number(el.id));
        el.textContent = "X";
        console.log("X:", checkWinner(PLAYER_X));
        swapTurns();
      } else if (!IS_X_TURN) {
        PLAYER_O.push(Number(el.id));
        el.textContent = "O";
        console.log("O:", checkWinner(PLAYER_O));
        swapTurns();
      }
    },
    { once: true }
  );
});

function swapTurns() {
  if (IS_X_TURN === true) {
    return (IS_X_TURN = false);
  } else if (IS_X_TURN === false) {
    return (IS_X_TURN = true);
  }
}

function checkWinner(CurrentPlayer) {
  console.log(CurrentPlayer);
  let result = winning_combinations.some((combination) => {
    return combination.every((index) => {
      return CurrentPlayer.includes(index);
    });
  });

  return result;
}
