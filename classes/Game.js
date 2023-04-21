class Game {
  constructor({ tileSize }) {
    this.tileSize = tileSize
    this.boardSize = this.tileSize * 3

    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]

    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')

    // Nie wiem czy taki zapis jest odpowiedni czy powinno to być w createBoard
    this.canvas.width = this.boardSize
    this.canvas.height = this.boardSize

    this.ai = new AI()
    this.player = new Player({
      canvas: this.canvas,
      onMove: this.onPlayerMove.bind(this),
    })
  }

  createBoard() {
    this.context.fillStyle = 'orange'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = this.tileSize; i < this.boardSize; i += this.tileSize) {
      this.context.moveTo(i, 0)
      this.context.lineTo(i, this.boardSize)
      this.context.moveTo(0, i)
      this.context.lineTo(this.boardSize, i)
      this.context.strokeStyle = 'red'
      this.context.lineWidth = 3
      this.context.stroke()
    }
  }

  drawCross(tile) {
    const { x, y } = tile
    this.context.moveTo(x * 150 + 25, y * 150 + 25)
    this.context.lineTo(x * 150 + 125, y * 150 + 125)

    this.context.moveTo(x * 150 + 125, y * 150 + 25)
    this.context.lineTo(x * 150 + 25, y * 150 + 125)

    this.context.strokeStyle = 'red'

    this.context.stroke()
  }

  drawCircle(tile) {
    const { x, y } = tile

    this.context.beginPath()
    this.context.arc(x * 150 + 75, y * 150 + 75, 50, 0, 2 * Math.PI, false)

    this.context.stroke()
  }

  onPlayerMove(tile) {
    if (this.board[tile.y][tile.x] === 0) {
      this.board[tile.y][tile.x] = 1
      this.drawCross(tile)
      const aiTile = this.ai.move(this.board)
      if (aiTile) {
        this.board[aiTile.y][aiTile.x] = 2
        this.drawCircle(aiTile)
      }
    }
  }
}
