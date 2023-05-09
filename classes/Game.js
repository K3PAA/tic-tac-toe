class Game {
  constructor({ tileSize, boardWidth, boardHeight, bestOf, timeForMove }) {
    this.boardWidth = boardWidth
    this.boardHeight = boardHeight

    this.totalRounds = bestOf
    this.currentRound = 0
    this.timeForMove = timeForMove

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
      tileSize: this.tileSize,
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
            tileSize: this.tileSize,
            value: 0,
          })
        )
      }

      this.board.push(newBoardRow)
    }
  }

  createBoard() {
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

      let result = this.checkForWin();

      if (result) {
        // Player won
        this.consoleWinner(result);
      } else {
        const aiTile = this.ai.move(this.board)

        if (aiTile) {
          this.board[aiTile.y][aiTile.x].value = 2
          result = this.checkForWin()

          if (result) {
            // Bot won
            this.consoleWinner(result);
          }
        }
      }
    }
  }

  consoleWinner({ player, lineType, lineName }) {
    console.log(`Player ${player} won in ${lineType} ${lineName}`);
  }

  checkForWin() {
    const checkLine = (result, tile) => {
      if (tile.value) {
        if (!result.type) {
          result.type = tile.value;
          result.points = 1;
        } else if (tile.value === result.type) result.points++;
      }
      return result;
    };

    // Check row by row
    const rowIndex = this.board.findIndex(row => row.reduce(checkLine, {}).points === row.length);
    if (rowIndex > -1) return { player: this.board[rowIndex][0].value, lineType: 'row', lineName: rowIndex };

    // Check column by column
    const transpondedBoard = this.board[0].map((col, i) => this.board.map(row => row[i]));
    const columnIndex = transpondedBoard.findIndex(column => column.reduce(checkLine, {}).points === column.length);
    if (columnIndex > -1) return { player: this.board[0][columnIndex].value, lineType: 'column', lineName: columnIndex };

    // Check diagonals - assumes that boardWidth === boardHeight
    const diagonalIndex = [
      this.board.reduce((diagonal, row, i) => { diagonal.push(row[i]); return diagonal; }, []), // Diagonal top left <=> bottom right
      this.board.reduce((diagonal, row, i) => { diagonal.push(row[row.length - i - 1]); return diagonal; }, []) // Diagonal top right <=> bottom left
    ].findIndex(diagonal => diagonal.reduce(checkLine, {}).points === diagonal.length);

    if (diagonalIndex > -1) {
      return {
        lineType: 'diagonal',
        player: this.board[0][diagonalIndex === 0 ? 0 : this.boardWidth - 1].value,
        lineName: diagonalIndex === 0 ? 'top left <=> bottom right' : 'top right <=> bottom left'
      };
    }
  }
}
