const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const heading = document.querySelector("#heading")
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();
function initializeGame() {
   cell.forEach(cell => { cell.addEventListener("click", cellClicked)});
   restartBtn.addEventListener("click", restartGame);
   statusText.innerHTML = `${currentPlayer}'s turn`;
   running = true;
}

function cellClicked() {
   const cellIndex = this.getAttribute("cellIndex");

   if (options[cellIndex] != "" || !running) {
      return;
   }
   updateCell(this, cellIndex);
   checkWinner();
}

function updateCell(cell, index) {
   options[index] = currentPlayer;
   cell.innerHTML = currentPlayer;
}

function changePlayer() {
   currentPlayer = (currentPlayer === "X") ? "O" : "X"
   statusText.innerHTML = `${currentPlayer}'s turn`
}

function checkWinner() {
   let roundWon = false;

   for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];
      // Continue will skip this iteration until condition matches.
      // If not used, it will match all empty string in options on first initialization.
      if (cellA === "" || cellB === "" || cellC === "") {
         continue;
      }
      if (cellA === cellB && cellB === cellC) {
         roundWon = true;
         break;
      };
   };


   if (roundWon) {
      statusText.innerHTML = `${currentPlayer} Wins!`;
      heading.innerHTML = `${currentPlayer} Wins!`;
      running = false;
   }
   else if (!options.includes("")) {
      statusText.innerHTML = "Draw!";
      heading.innerHTML = "Draw!";
      running = false;
   } else {
      changePlayer();
   }
};

function restartGame() {
   options = ["", "", "", "", "", "", "", "", ""];
   cell.forEach(cell=>{
      cell.innerHTML = "";
   });
   running = true;
   heading.innerHTML = "Tic Tac Toe";
   initializeGame();
}