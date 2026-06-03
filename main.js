const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart');
const cells = document.querySelectorAll('.cell');

restartButton.addEventListener('click', restartGame);
cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});

function cellClick(event) {
const clickedCell = event.target
const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
if (board[clickedCellIndex]!="" || !isGameActive) {
    return;
}

board[clickedCellIndex] = currentPlayer;
clickedCell.textContent = currentPlayer;
clickedCell.classList.add(currentPlayer);

checkWin();

if(!isGameActive){
    return;
}

if (currentPlayer == "X"){
    currentPlayer = "O"
}
else{
    currentPlayer = "X"
}

statusDisplay.textContent = "ходит " + currentPlayer;
}

function checkWin() {
    let roundWon = false;


    for (let i = 0; i < winningCombinations.length; i++) {
        const winCombination = winningCombinations[i]; 
        
        const a = board[winCombination[0]]
        const b = board[winCombination[1]]
        const c = board[winCombination[2]]

        if (a == "" || b == "" || c == ""){
            continue;
        }
        if (a == b && b == c){
            roundWon = true;
            break;
        }
    }

    if (roundWon == true){
        statusDisplay.textContent = "игрок " + currentPlayer + " победил";
        isGameActive = false;
        return;
    }
   
    if(!board.includes("")){
        statusDisplay.textContent = "ничья";
        isGameActive = false;
    }

}


function restartGame() {
    board.fill("");
    currentPlayer = "X"
    isGameActive = true;
    statusDisplay.textContent = "ходит Х";
cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O'); 
    });}
