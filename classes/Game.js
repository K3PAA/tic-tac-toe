class Game {
  constructor({ tileSize }) {
    this.tileSize = tileSize
    this.boardSize = this.tileSize * 3

    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')

    this.canvas.width = this.boardSize
    this.canvas.height = this.boardSize

    this.ai = new AI()
    this.player = new Player({
      canvas: this.canvas,
      onMove: this.onPlayerMove.bind(this),
    })

    this.board = [
      [
        new Tile({ position: { x: 0, y: 0 }, context: this.context, value: 0 }),
        new Tile({ position: { x: 1, y: 0 }, context: this.context, value: 0 }),
        new Tile({ position: { x: 2, y: 0 }, context: this.context, value: 0 }),
      ],
      [
        new Tile({ position: { x: 0, y: 1 }, context: this.context, value: 0 }),
        new Tile({ position: { x: 1, y: 1 }, context: this.context, value: 0 }),
        new Tile({ position: { x: 2, y: 1 }, context: this.context, value: 0 }),
      ],
      [
        new Tile({ position: { x: 0, y: 2 }, context: this.context, value: 0 }),
        new Tile({ position: { x: 1, y: 2 }, context: this.context, value: 0 }),
        new Tile({ position: { x: 2, y: 2 }, context: this.context, value: 0 }),
      ],
    ]
  }

  resetBoard() {
    this.board.forEach((row) => {
      row.forEach((tile) => tile.reset())
    })

    this.createBoard()
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
    console.log(this.board)
  }

  onPlayerMove(tile) {
    if (this.board[tile.y][tile.x].value === 0) {
      this.board[tile.y][tile.x].value = 1
      this.board[tile.y][tile.x].drawCross()
      const aiTile = this.ai.move(this.board)
      if (aiTile) {
        this.board[aiTile.y][aiTile.x].value = 2
        this.board[aiTile.y][aiTile.x].drawCircle()
      }
    }
  }
}
