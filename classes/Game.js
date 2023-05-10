class Game {
  constructor({ tileSize, boardWidth, boardHeight, bestOf, timeForMove }) {
    this.boardWidth = boardWidth
    this.boardHeight = boardHeight

    this.totalRounds = bestOf
    this.currentRound = 0

    this.staticTimeForMove = timeForMove

    this.tileSize = tileSize

    this.boardSize = {
      width: this.tileSize * this.boardWidth,
      height: this.tileSize * this.boardHeight,
    }

    this.timeLeftForMoveDisplay = document.querySelector('.timeLeft')
    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')

    this.canvas.width = this.boardSize.width
    this.canvas.height = this.boardSize.height

    this.ai = new AI({
      timeForMove,
      isMoving: false,
    })
    this.player = new Player({
      canvas: this.canvas,
      boardWidth: this.boardWidth,
      boardHeight: this.boardHeight,
      timeForMove,
      tileSize: this.tileSize,
      onMove: this.onPlayerMove.bind(this),
      isMoving: true,
    })

    this.currentRound = 0

    this.board = []
    this.createTiles()
  }

  resetBoard() {
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
      if (this.checkForWin(1)) this.player.updateScore()
      this.player.isMoving = false
      this.ai.isMoving = true
      const aiTile = this.ai.move(this.board)
      if (aiTile) {
        this.board[aiTile.y][aiTile.x].value = 2
        this.ai.isMoving = false
        this.player.isMoving = true
        if (this.checkForWin(2)) this.ai.updateScore()
      }
    }
  }

  timeDown() {
    this.timeLeftForMoveDisplay.innerHTML = this.staticTimeForMove + 's'

    const timer = setInterval(() => {
      if (this.player.timeForMove >= 0 && this.player.isMoving) {
        this.player.timeForMove--
        this.timeLeftForMoveDisplay.innerHTML = this.timeForMove + 's'
      } else {
        this.timeLeftForMoveDisplay.innerHTML = '- - -'
        clearInterval(timer)
      }
    }, 1000)
  }

  checkForWin(val) {
    // prawo/ góra
    let colNum = Array.from({ length: this.boardWidth }, () => 0)

    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i]

      let rowNum = 0

      for (let y = 0; y < row.length; y++) {
        if (row[y].value === val) {
          rowNum++
          colNum[y]++
        } else {
          if (colNum[y] < 3) colNum[y] = 0
          if (rowNum < 3) rowNum = 0
        }
      }

      if (rowNum >= 3) {
        return true
      }
    }

    for (let j = 0; j < colNum.length; j++) {
      if (colNum[j] >= 3) {
        return true
      }
    }

    // skosy
    for (let j = 0; j < this.boardWidth - 2; j++) {
      for (let z = 0; z < this.boardHeight - 2; z++) {
        //  ile wystąpiło powtórzeń
        let crossDown = 0
        let crossUp = 0
        // sprawdzanie po koleji czy wystąpiło w tablicy
        for (let y = 0; y < 3; y++) {
          if (this.board[this.boardHeight - z - y - 1][y + j].value === val) {
            crossUp++
          } else {
            if (crossUp < 3) crossUp = 0
          }
          if (this.board[y + z][y + j].value === val) {
            crossDown++
          } else {
            if (crossDown < 3) crossDown = 0
          }
        }
        if (crossDown >= 3 || crossUp >= 3) {
          return true
        }
      }
    }
    return false
  }
}
