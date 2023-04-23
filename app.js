const resetButton = document.querySelector('.reset-btn')
const game = new Game({
  tileSize: 150,
  boardWidth: 5,
  boardHeight: 3,
})

resetButton.addEventListener('click', () => game.resetBoard())

game.createBoard()
