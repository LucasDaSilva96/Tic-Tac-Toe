const computer = document.querySelector(".ai-choice-box");
const friend = document.querySelector(".human-choice-box");
const start_container = document.querySelector(".start-container");
const play_container = document.querySelector(".play-container");

const player = new Object();
let OPPONENT;

computer.addEventListener("click", function () {
  OPPONENT = "computer";
  player.computer = "O";
  player.man = "X";
  player.friend = "X";

  init(player, OPPONENT);

  start_container.classList.add("hidden");
  play_container.classList.remove("hidden");
});

friend.addEventListener("click", function () {
  OPPONENT = "friend";
  player.man = "X";
  player.computer = "O";
  player.friend = "O";

  init(player, OPPONENT);

  start_container.classList.add("hidden");
  play_container.classList.remove("hidden");
});
