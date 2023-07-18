const computer = document.querySelector(".ai-choice-box");
const friend = document.querySelector(".human-choice-box");
const start_container = document.querySelector(".start-container");
const play_container = document.querySelector(".play-container");
const svg_container = document.querySelector(".current-svg-container");
const h1_text = document.querySelector(".welcome-h1");
const heading_paragraph_box = document.querySelector(".heading-paragraph-box");
const board_html = document.querySelector(".board");

const player = new Object();
let OPPONENT;

computer.addEventListener("click", function () {
  OPPONENT = "computer";
  player.computer = "O";
  player.man = "X";
  player.friend = "X";

  init(player, OPPONENT);

  heading_paragraph_box.innerHTML = ` 
  <span class="heading-paragraph-txt">
    <p class="player-p">You are [ X ]</p>
    <strong>Tic Tac Toe</strong>
  </span>`;

  const heading_paragraph_strong = document.querySelector("strong");
  const player_p = document.querySelector(".player-p");
  player_p.style.textAlign = "center";
  start_container.classList.add("hidden");
  play_container.classList.remove("hidden");
  board_html.classList.remove("hidden");

  heading_paragraph_strong.textContent = "Good Luck Human..Ha..Ha..HAA";
  h1_text.textContent = "Human VS Ai".toLocaleUpperCase();
  svg_container.innerHTML = `
  <svg
          xmlns="http://www.w3.org/2000/svg"
          width="94"
          height="94"
          viewBox="0 0 24 24"
        >
          <path
            fill="#780000"
            d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1M7.5 18A2.5 2.5 0 0 1 5 15.5c0-.82.4-1.54 1-2l3.83 2.88C9.5 17.32 8.57 18 7.5 18m9 0c-1.07 0-2-.68-2.33-1.62L18 13.5c.6.46 1 1.18 1 2a2.5 2.5 0 0 1-2.5 2.5Z"
          />
        </svg>
  `;
});

friend.addEventListener("click", function () {
  OPPONENT = "friend";
  player.man = "X";
  player.computer = "O";
  player.friend = "O";

  init(player, OPPONENT);

  start_container.classList.add("hidden");
  play_container.classList.remove("hidden");
  board_html.classList.remove("hidden");
  h1_text.textContent = "Human VS Human".toLocaleUpperCase();
  heading_paragraph_box.innerHTML = ` 
  <span class="heading-paragraph-txt">
    <p class="player-p">Player-1: [ X ] Player-2: [ O ] </p>
    <strong>Tic Tac Toe</strong>
  </span>`;
  const player_p = document.querySelector(".player-p");
  player_p.style.textAlign = "center";
  const heading_paragraph_strong = document.querySelector("strong");
  heading_paragraph_strong.textContent =
    "Who has the highest IQ?".toLocaleUpperCase();

  svg_container.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="94"
            height="94"
            viewBox="0 0 64 64"
          >
            <path
              fill="currentColor"
              d="M62 26.407a8.058 8.058 0 0 0-3.859-6.877a8.404 8.404 0 0 0 .496-2.822c0-4.593-3.689-8.319-8.266-8.39A7.77 7.77 0 0 0 43.5 4.176c-1.49 0-2.879.427-4.063 1.155C37.818 3.321 35.092 2 32 2s-5.816 1.321-7.438 3.333a7.724 7.724 0 0 0-4.063-1.155a7.766 7.766 0 0 0-6.87 4.142c-4.576.07-8.266 3.796-8.266 8.39c0 .991.181 1.939.496 2.822a8.056 8.056 0 0 0-1.962 12.069a6.847 6.847 0 0 0-.77 3.153a6.883 6.883 0 0 0 3.676 6.09c-.03.26-.05.525-.05.795a6.882 6.882 0 0 0 5.45 6.732c2.268 7.354 6.977 9.434 14.021 12.54l.375.165c1.819.804 4.166.924 5.402.924c1.237 0 3.583-.12 5.401-.923l.376-.166c7.042-3.105 11.751-5.186 14.019-12.539a6.883 6.883 0 0 0 5.449-6.732c0-.27-.02-.535-.049-.795a6.884 6.884 0 0 0 3.676-6.09a6.844 6.844 0 0 0-.77-3.153A8.038 8.038 0 0 0 62 26.407M50.871 43.113c-.279 2.071-.672 3.788-1.174 5.266l-.008.001c-2.09 6.14-6.199 7.884-13.117 10.937c-1.129.499-2.85.748-4.571.748c-1.721 0-3.442-.249-4.571-.748c-6.913-3.05-11.02-4.801-13.11-10.925h-.011c-.505-1.48-.898-3.202-1.178-5.278c-3.369-.231-4.368-2.393-4.368-5.028c0-4.232 1.961-4.555 3.48-4.17c.138.884.324 1.713.583 2.184c.464.842 1.41 1.32 1.41 1.32s-.255-.914-.162-3.316c1.353-19.236 3.695-10.614 17.928-10.614c14.234 0 16.578-8.623 17.926 10.636c.092 2.391-.164 3.295-.164 3.295s.947-.479 1.41-1.32c.258-.471.447-1.3.584-2.184c1.52-.385 3.48-.063 3.48 4.17c0 2.634-.998 4.795-4.367 5.026"
            />
            <path
              fill="currentColor"
              d="M42.165 44.56c-1.138 0-2.786.326-4.478.721a6.21 6.21 0 0 0 .93-3.262c0-3.537-2.963-6.404-6.617-6.404s-6.617 2.867-6.617 6.404a6.21 6.21 0 0 0 .93 3.262c-1.691-.395-3.34-.721-4.478-.721h-.001c-1.117 0-1.824.338-2.101 1.006c-.441 1.068.591 2.219 1.658 3.204c.938.867 1.603 2.175 2.307 3.559c1.44 2.836 3.234 6.365 8.302 6.365c5.066 0 6.859-3.528 8.301-6.364c.704-1.385 1.369-2.691 2.309-3.56c1.067-.985 2.099-2.136 1.656-3.203c-.276-.67-.983-1.007-2.101-1.007m-.245 3.509c-3.191 2.945-3.238 9.656-9.92 9.656s-6.729-6.711-9.918-9.656c-2.086-1.925-1.704-2.543-.248-2.543c1.296.001 3.439.49 5.452.984c1.2 1.18 2.868 1.912 4.714 1.912s3.514-.732 4.715-1.913c2.012-.494 4.155-.983 5.45-.983c1.456 0 1.839.62-.245 2.543"
            />
            <path
              fill="CurrentColor"
              d="M40.258 47.228c-1.396 0-5.807 1.697-8.258 1.697s-6.861-1.697-8.258-1.697c-.616 0-.646.332.34 1.284c3.291 3.186 2.836 7.103 7.918 7.133c5.084-.03 4.627-3.947 7.92-7.133c.984-.953.955-1.284.338-1.284m-8.265 7.449c-1.187-.007-1.977-.254-2.599-.685c.475-.398 1.295-.849 2.605-.849c1.309 0 2.129.449 2.605.848c-.624.432-1.417.679-2.611.686m5.475-4.975c-.88.749-4.042 1.146-5.468 1.146s-4.587-.397-5.468-1.146c-.278-.236-.378-.633-.411-.985l.432.115c1.834.497 3.913 1.062 5.447 1.062c1.533 0 3.613-.564 5.449-1.062c.145-.04.285-.076.43-.115c-.033.353-.133.749-.411.985m-9.771-14.568c0-11.921-10-11.921-10 0c0 3.562 10 3.562 10 0m-8.345.051c0-9.537 8-9.537 8 0c0 2.849-8 2.849-8 0"
            />
            <ellipse
              cx="23.676"
              cy="33.449"
              fill="Red"
              rx="2.5"
              ry="3.386"
            />
            <path
              fill="currentColor"
              d="M36.301 35.134c0 3.563 10 3.563 10 0c0-11.921-10-11.921-10 0m.347.051c0-9.537 8-9.537 8 0c0 2.849-8 2.849-8 0"
            />
            <path
              fill="red"
              d="M40.291 30.063c-1.381 0-2.5 1.516-2.5 3.386c0 1.874 1.119 3.39 2.5 3.39s2.5-1.516 2.5-3.39c0-1.87-1.119-3.386-2.5-3.386"
            />
          </svg>`;
});
