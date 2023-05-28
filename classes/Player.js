class Player {
  constructor({
    canvas,
    onMove,
    tileSize,
    boardWidth,
    boardHeight,
    timeForMove,
    identyficator,
    isMoving,
  }) {
    this.canvas = canvas
    this.boardHeight = boardHeight
    this.boardWidth = boardWidth
    this.tileSize = tileSize
    this.onMove = onMove
    this.score = 0
    this.identyficator = identyficator
    this.timeForMove = timeForMove
    this.isMoving = isMoving
    this.scoreDisplay = document.querySelector('.player-score')
    this.canvas.addEventListener('click', (e) => this.onClick(e))
  }

  onClick(e) {
    const tile = this.getTilesPos({ x: e.offsetX, y: e.offsetY })
    this.onMove(tile)
  }

  displayScore() {
    this.scoreDisplay.innerHTML = this.score
  }

  updateScore() {
    this.score++
    this.displayScore()
  }

  getTilesPos({ x, y }) {
    let tiles = { x: 0, y: 0 }

    for (let i = this.boardWidth; i >= 0; i--) {
      if (i * this.tileSize < x) {
        tiles.x = i
        break
      }
    }

    for (let i = this.boardHeight; i >= 0; i--) {
      if (i * this.tileSize < y) {
        tiles.y = i
        break
      }
    }

    return { x: tiles.x, y: tiles.y }
  }
}
