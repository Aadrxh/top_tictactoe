const game=Gameboard();
const cells=document.querySelectorAll('.cell');
const statusDiv=document.getElementById('status');  
const resetButton=document.getElementById('reset');

cells.forEach(cell=>{
    cell.addEventListener('click',()=>{
        const row=parseInt(cell.dataset.row);
        const col=parseInt(cell.dataset.col); 

        try{
            game.addToken(row, col);
            const token=game.getBoard()[row][col].getToken();
            cell.textContent=token;

            if (game.getWinner() !== null) {
                statusDiv.textContent = `Player ${game.getWinner()} wins!`;
                resetButton.style.display = 'block';
            } else if (game.isDraw()) {
                statusDiv.textContent = "It's a draw!";
                resetButton.style.display = 'block';
            } else {
                statusDiv.textContent = `Current Player: ${game.getCurrentPlayer()}`;
            }
        }catch (error) {
            console.warn(error);
            statusDiv.textContent = error.message;
        }
})}
)
statusDiv.textContent = `Current Player: ${game.getCurrentPlayer()}`;

resetButton.addEventListener('click', () => {
  location.reload(); // refresh page for now
});