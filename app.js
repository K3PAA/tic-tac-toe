const grid = document.querySelector('#boardSizes')
const bestOf = document.querySelector('#bestOf')
const gameTime = document.querySelector('#gameTime')

const resetButton = document.querySelector('.reset-btn')
const playWithAI = document.querySelector('.ai-btn')

const game = new Game({
  bestOf: 3,
  timeToMove: 3,
  tileSize: 150,
  boardHeight: 3,
  boardWidth: 3,
})

resetButton.addEventListener('click', () => game.resetGame())

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

playWithAI.addEventListener('click', () => {
  let width, height

  switch (grid.value) {
    case '3x3':
      width = 3
      height = 3
      break
    case '4x4':
      width = 4
      height = 4
      break
    case '3x5':
      width = 5
      height = 3
      break
    case '3x6':
      width = 6
      height = 3
      break
  }

  game.boardHeight = height
  game.boardWidth = width
  game.timeToMove = gameTime.value
  game.bestOf = bestOf.value

  game.resetGame()
})
