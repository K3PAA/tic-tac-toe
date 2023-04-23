const resetButton = document.querySelector('.reset-btn')
const game = new Game({
  tileSize: 150,
  boardWidth: 5,
  boardHeight: 3,
})

resetButton.addEventListener('click', () => game.resetBoard())

const gameAnimation = () => {
  requestAnimationFrame(gameAnimation)

  game.createBoard()

  game.board.forEach((row) => {
    row.forEach((element) => {
      element.draw()
    })
  })
}

gameAnimation()
