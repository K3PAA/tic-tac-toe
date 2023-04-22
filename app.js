const resetButton = document.querySelector('.reset-btn')
const game = new Game({
  tileSize: 150,
})

resetButton.addEventListener('click', () => game.resetBoard())

game.createBoard()
