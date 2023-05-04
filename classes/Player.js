class Player {
  constructor({ canvas, onMove, tileSize, boardWidth, boardHeight }) {
    this.canvas = canvas
    this.boardHeight = boardHeight
    this.boardWidth = boardWidth
    this.tileSize = tileSize
    this.onMove = onMove

    this.canvas.addEventListener('click', (e) => this.onClick(e))
  }

  onClick(e) {
    const tile = this.getTilesPos({ x: e.offsetX, y: e.offsetY })
    this.onMove(tile)
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
