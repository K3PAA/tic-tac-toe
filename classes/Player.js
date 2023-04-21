class Player {
  constructor({ canvas, onMove }) {
    this.canvas = canvas
    this.onMove = onMove

    this.canvas.addEventListener('click', (e) => this.onClick(e))
  }

  onClick(e) {
    const tile = this.getTilesPos({ x: e.offsetX, y: e.offsetY })
    this.onMove(tile)
  }

  getTilesPos({ x, y }) {
    let tiles = { x: 0, y: 0 }

    if (x < 150) {
      tiles.x = 0
    } else if (x < 300) {
      tiles.x = 1
    } else {
      tiles.x = 2
    }

    if (y < 150) {
      tiles.y = 0
    } else if (y < 300) {
      tiles.y = 1
    } else {
      tiles.y = 2
    }

    return { x: tiles.x, y: tiles.y }
  }
}
