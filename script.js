let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msg = document.querySelector("#msg");
let game = boxes[0].parentElement;
let player = document.querySelectorAll(".player");
let drawCount = 0;
let playerO = player[0];
let playerX = player[1];
let playerOCountWin = 0;
let playerXCountWin = 0;
let playerOScore = document.querySelector("#player-o-score");
let playerXScore = document.querySelector("#player-x-score");

let turnO = true; //playerX, playerO
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msg.innerText = "Start game...";
  playerO.classList.add("active-player");
  playerX.classList.remove("active-player");
  drawCount = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.disabled) return; // Prevent multiple clicks on same box

    drawCount++;
    if (turnO) {
      box.style.color = "#008000";
      msg.innerHTML = "X <span>Turn</span>";
      box.innerText = "O";
      playerO.classList.remove("active-player");
      playerX.classList.add("active-player");
      turnO = false;
    } else {
      box.style.color = "#b0413e";
      msg.innerHTML = "O <span>Turn</span>";
      box.innerText = "X";
      playerX.classList.remove("active-player");
      playerO.classList.add("active-player");
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disabledBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
    game.classList.add("invisible");
  }
};

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    game.classList.remove("invisible");
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  if (winner === "O") {
    playerX.classList.remove("active-player");
    playerO.classList.add("active-player");
    playerOCountWin++;
    playerOScore.innerText = playerOCountWin;
  }
  if (winner === "X") {
    playerO.classList.remove("active-player");
    playerX.classList.add("active-player");
    playerXCountWin++;
    playerXScore.innerText = playerXCountWin;
  }

  disabledBoxes();
};

const showDraw = () => {
  msg.innerText = `Game Draw`;
  disabledBoxes();
  playerO.classList.remove("active-player");
  playerX.classList.remove("active-player");
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // console.log(pos1Val, pos2Val, pos3Val);
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  if (drawCount === 9) {
    showDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
