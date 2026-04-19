"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// Refactored the 'Check' logic into a function so we can call it
// from both the click listener and the keyboard listener.
const checkGuess = function () {
  const guess = Number(document.querySelector("#guess-input").value);
  const body = document.querySelector("body");
  const mysteryBox = document.querySelector(".mystery-box");

  // 1. No Input
  if (!guess) {
    displayMessage("⛔ No number!");

    // 2. Player Wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    mysteryBox.textContent = secretNumber;
    mysteryBox.classList.add("blink"); // Start blinking

    body.classList.remove("lose-state");
    body.classList.add("win-state");

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // 3. Guess is Wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
      body.classList.remove("win-state");
      body.classList.add("lose-state");
    }
  }
};

// Event Listener for Click
document.querySelector(".check-btn").addEventListener("click", checkGuess);

// Event Listener for 'Enter' Key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

// Reset Logic
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Start Guessing!");
  document.querySelector(".score").textContent = score;

  const mysteryBox = document.querySelector(".mystery-box");
  mysteryBox.textContent = "?";
  mysteryBox.classList.remove("blink"); // Stop blinking on reset

  document.querySelector("#guess-input").value = "";
  document.querySelector("body").classList.remove("win-state", "lose-state");
});
