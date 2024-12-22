// Sentences to type
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing games are fun and challenging.",
  "Practice makes perfect when it comes to typing.",
  "Always aim for accuracy and speed."
];

const sentenceElement = document.getElementById("sentence");
const inputBox = document.getElementById("input-box");
const healthElement = document.getElementById("health");
const accuracyElement = document.getElementById("accuracy");
const timeElement = document.getElementById("time");
const restartButton = document.getElementById("restart-button");

// Game state
let currentSentence = "";
let health = 100;
let totalChars = 0;
let correctChars = 0;
let startTime = null;
let timer = null;

// Start a new round
function startGame() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceElement.textContent = currentSentence;
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();

  health = 100;
  totalChars = 0;
  correctChars = 0;
  startTime = Date.now();

  updateStats();
  clearInterval(timer);
  timer = setInterval(updateTime, 100);
  restartButton.style.display = "none";
}

// Update time
function updateTime() {
  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
  timeElement.textContent = elapsedTime;
}

// Update stats (health and accuracy)
function updateStats() {
  const accuracy = totalChars > 0 ? ((correctChars / totalChars) * 100).toFixed(1) : 100;
  healthElement.textContent = health;
  accuracyElement.textContent = `${accuracy}%`;

  if (health <= 0) {
    endGame(false);
  }
}

// End game
function endGame(won) {
  clearInterval(timer);
  inputBox.disabled = true;
  sentenceElement.textContent = won ? "You won! Great typing skills!" : "You lost! Better luck next time.";
  restartButton.style.display = "block";
}

// Handle input
inputBox.addEventListener("input", () => {
  const input = inputBox.value;
  totalChars = input.length;

  if (currentSentence.startsWith(input)) {
    correctChars = input.length;

    if (input === currentSentence) {
      endGame(true);
    }
  } else {
    health -= 1; // Reduce health for mistakes
  }

  updateStats();
});

// Restart game
restartButton.addEventListener("click", startGame);

// Initialize game
startGame();
