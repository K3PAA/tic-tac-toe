class Game {
  constructor({ tileSize, boardWidth, boardHeight }) {
    this.boardWidth = boardWidth
    this.boardHeight = boardHeight

    this.tileSize = tileSize
    this.boardSize = {
      width: this.tileSize * this.boardWidth,
      height: this.tileSize * this.boardHeight,
    }

    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')

    this.canvas.width = this.boardSize.width
    this.canvas.height = this.boardSize.height

    this.ai = new AI()
    this.player = new Player({
      canvas: this.canvas,
      boardWidth: this.boardWidth,
      boardHeight: this.boardHeight,
      onMove: this.onPlayerMove.bind(this),
    })

    this.board = []
    this.createTiles()
  }

  resetGame() {
    this.board = []
    this.boardSize.width = this.tileSize * this.boardWidth
    this.boardSize.height = this.tileSize * this.boardHeight

    this.player.boardHeight = this.boardHeight
    this.player.boardWidth = this.boardWidth

    this.canvas.width = this.boardSize.width
    this.canvas.height = this.boardSize.height

    this.createTiles()
  }

  createTiles() {
    for (let i = 0; i < this.boardHeight; i++) {
      let newBoardRow = []
      for (let j = 0; j < this.boardWidth; j++) {
        newBoardRow.push(
          new Tile({
            position: { x: j, y: i },
            context: this.context,
            value: 0,
          })
        )
      }

      this.board.push(newBoardRow)
    }
  }

  createBoard() {
    this.context.fillStyle = 'orange'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    for (let i = this.tileSize; i < this.boardSize.width; i += this.tileSize) {
      this.context.moveTo(i, 0)
      this.context.lineTo(i, this.boardSize.height)
    }

    for (let i = this.tileSize; i < this.boardSize.height; i += this.tileSize) {
      this.context.moveTo(0, i)
      this.context.lineTo(this.boardSize.width, i)
    }

    this.context.strokeStyle = 'red'
    this.context.lineWidth = 3
    this.context.stroke()
  }

  onPlayerMove(tile) {
    if (this.board[tile.y][tile.x].value === 0) {
      this.board[tile.y][tile.x].value = 1
      const aiTile = this.ai.move(this.board)
      if (aiTile) {
        this.board[aiTile.y][aiTile.x].value = 2
      }
    }
  }
}
