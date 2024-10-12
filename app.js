let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let xScoreElement = document.querySelector("#x-score");
let oScoreElement = document.querySelector("#o-score");

let turnO = true;
let xScore = 0;
let oScore = 0;

// Select the audio elements
const moveSound = document.getElementById("moveSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

// Function to change background color based on the player's turn
const changeBackgroundColor = () => {
  if (turnO) {
    document.body.style.background = "linear-gradient(45deg, #9be7ff, #d0f7fa, #00a8ff)";
  } else {
    document.body.style.background = "linear-gradient(45deg, #ffb6c1, #ffa07a, #ff4500)";
  }
};

// Event listener for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turnO = true;
    }
    box.disabled = true;

    // Play move sound
    moveSound.play();

    // Change background color after each move
    changeBackgroundColor();

    checkWinner();
  });
});

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    msg.style.color = "black"; // Change text color to black
    msgContainer.classList.remove("hide");

    // Update score and play win sound
    if (winner === "X") {
        xScore++;
        xScoreElement.innerText = xScore;
        msg.classList.add("winner-x"); // Add X winner class
        msg.classList.remove("winner-o"); // Ensure O winner class is removed
    } else if (winner === "O") {
        oScore++;
        oScoreElement.innerText = oScore;
        msg.classList.add("winner-o"); // Add O winner class
        msg.classList.remove("winner-x"); // Ensure X winner class is removed
    }

    winSound.play();
};

// Function to display draw message
const showDraw = () => {
  msg.innerText = `It's a draw!`;
  msgContainer.classList.remove("hide");

  // Play draw sound
  drawSound.play();
};

// Function to check for a winner or draw
const checkWinner = () => {
  let isDraw = true;

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos1Val === pos3Val) {
      showWinner(pos1Val);
      disableAllBoxes();
      return;
    }
  }

  // Check if all boxes are filled
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false; // If any box is empty, it's not a draw
    }
  });

  // If all boxes are filled and no winner, it's a draw
  if (isDraw) {
    showDraw();
  }
};

// Function to disable all boxes after game ends
const disableAllBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Reset button functionality (reset both the game and score)
resetBtn.addEventListener("click", () => {
  resetGame();
  resetScores();
});

newGameBtn.addEventListener("click", resetGame);

// Function to reset only the game (for "New Game")
function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.classList.remove("x", "o"); // Reset class for colors
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  turnO = true;
  changeBackgroundColor(); // Reset background color to initial
}

// Function to reset the score (only for "Reset Game")
function resetScores() {
  xScore = 0;
  oScore = 0;
  xScoreElement.innerText = xScore;
  oScoreElement.innerText = oScore;
}
