class AI {
  constructor({ timeForMove, isMoving, identyficator }) {
    this.score = 0
    this.timeForMove = timeForMove
    this.identyficator = identyficator
    this.scoreDisplay = document.querySelector('.enemy-score')
    this.isMoving = isMoving
  }

  move(board) {
    const emptySpaces = []

    board.forEach((tile, y) => {
      tile.forEach((item, i) => {
        if (item.value === 0) {
          emptySpaces.push({ x: i, y: y })
        }
      })
    })

    const randomNumber = Math.floor(Math.random() * emptySpaces.length)

    return emptySpaces.length > 0 ? emptySpaces[randomNumber] : false
  }

  displayScore() {
    this.scoreDisplay.innerHTML = this.score
  }
  updateScore() {
    this.score++
    this.displayScore()
  }
}
