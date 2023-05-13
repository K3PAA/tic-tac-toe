class Game {
  constructor({ tileSize, boardWidth, boardHeight, bestOf, timeForMove }) {
    this.boardWidth = boardWidth
    this.boardHeight = boardHeight

    this.totalRounds = bestOf
    this.roundActive = false
    this.currentRound = 0

    this.staticTimeForMove = timeForMove

    this.tileSize = tileSize

    this.boardSize = {
      width: this.tileSize * this.boardWidth,
      height: this.tileSize * this.boardHeight,
    }

    this.timeLeftForMoveDisplay = document.querySelector('.timeLeft')
    this.currentRoundDisplay = document.querySelector('.round-current')
    this.totalRoundDisplay = document.querySelector('.round-amount')
    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')

    this.canvas.width = this.boardSize.width
    this.canvas.height = this.boardSize.height

    this.animate = new Animate({
      context: this.context,
    })

    this.ai = new AI({
      timeForMove: this.staticTimeForMove,
      isMoving: false,
    })
    this.player = new Player({
      canvas: this.canvas,
      boardWidth: this.boardWidth,
      boardHeight: this.boardHeight,
      timeForMove: this.staticTimeForMove,
      tileSize: this.tileSize,
      onMove: this.onPlayerMove.bind(this),
      isMoving: true,
    })

    this.currentRound = 0
    this.timer = undefined

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
    this.totalRoundDisplay.innerHTML = this.totalRounds
    this.roundActive = true
    this.timeDown(this.player)
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
          }),
        )
      }

      this.board.push(newBoardRow)
    }
  }

  createBoard() {
    this.context.beginPath()

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
    this.context.closePath()
  }

  togglePlayer() {
    this.player.isMoving = !this.player.isMoving
    this.ai.isMoving = !this.ai.isMoving
    this.player.timeForMove = this.staticTimeForMove
    this.ai.timeForMove = this.staticTimeForMove
  }

  onPlayerMove(tile) {
    if (this.board[tile.y][tile.x].value === 0 && this.roundActive) {
      this.board[tile.y][tile.x].value = 1
      this.togglePlayer()
      this.clearTimeDown()
      this.timeDown(this.ai)
      let result = this.checkForWin()

      if (result) {
        // Player won
        this.consoleWinner(result)
      } else {
        const aiTile = this.ai.move(this.board)

        if (aiTile) {
          this.board[aiTile.y][aiTile.x].value = 2
          this.togglePlayer()
          this.clearTimeDown()
          this.timeDown(this.player)
          result = this.checkForWin()

          if (result) {
            // Bot won
            this.consoleWinner(result)
          }
        }
      }
    }
  }

  drawTiles() {
    this.board.forEach((row) => {
      row.forEach((element) => {
        element.draw()
      })
    })
  }

  consoleWinner({ player, lineType, lineName }) {
    // player - 1 lub 2
    // lineType - diagonal, top left <=> bottom right, top right <=> bottom left lub column
    // lineName - 0, 1, 2, ...
    console.log(`Player ${player} won in ${lineType} ${lineName}`)

    player === 1 ? this.player.updateScore() : this.ai.updateScore()

    this.currentRound++
    this.roundActive = false
    this.currentRoundDisplay.innerHTML = this.currentRound
    this.drawTiles()
    this.clearTimeDown()
    this.drawEndingLine({ lineType, lineName })
  }

  drawEndingLine({ lineType, lineName }) {
    switch (lineType) {
      case 'diagonal':
        switch (lineName) {
          case 'top left <=> bottom right':
            this.animate.lineAnimation({
              from: { x: 0, y: 0 },
              to: { x: this.canvas.width, y: this.canvas.height },
              type: 'top left <=> bottom right',
            })
            break

          case 'top right <=> bottom left':
            this.animate.lineAnimation({
              from: { x: 0, y: this.canvas.height },
              to: { x: this.canvas.width, y: 0 },
              type: 'top right <=> bottom left',
            })
            break
        }
        break

      case 'row':
        this.animate.lineAnimation({
          from: { x: 0, y: lineName * this.tileSize + 0.5 * this.tileSize },
          to: {
            x: this.canvas.width,
            y: lineName * this.tileSize + 0.5 * this.tileSize,
          },
        })
        break

      case 'column':
        this.animate.lineAnimation({
          from: { x: lineName * this.tileSize + 0.5 * this.tileSize, y: 0 },
          to: {
            x: lineName * this.tileSize + 0.5 * this.tileSize,
            y: this.canvas.height,
          },
        })
        break
    }
  }

  timeDown(x) {
    this.timeLeftForMoveDisplay.innerHTML = this.staticTimeForMove + 's'

    if (!this.timer)
      this.timer = setInterval(() => {
        if (x.timeForMove > 0 && x.isMoving) {
          x.timeForMove--
          this.timeLeftForMoveDisplay.innerHTML = x.timeForMove + 's'
        } else {
          this.timeLeftForMoveDisplay.innerHTML = '- - -'
          console.log('lost')
          clearInterval(this.timer)
          this.timer = undefined
        }
      }, 1000)
  }

  clearTimeDown() {
    clearInterval(this.timer)
    this.timer = undefined
  }

  checkForWin() {
    const checkLine = (result, tile) => {
      if (tile.value) {
        if (!result.type) {
          result.type = tile.value
          result.points = 1
        } else if (tile.value === result.type) result.points++
      }
      return result
    }

    // Check row by row
    const rowIndex = this.board.findIndex(
      (row) => row.reduce(checkLine, {}).points === row.length,
    )
    if (rowIndex > -1)
      return {
        player: this.board[rowIndex][0].value,
        lineType: 'row',
        lineName: rowIndex,
      }

    // Check column by column
    const transpondedBoard = this.board[0].map((col, i) =>
      this.board.map((row) => row[i]),
    )
    const columnIndex = transpondedBoard.findIndex(
      (column) => column.reduce(checkLine, {}).points === column.length,
    )
    if (columnIndex > -1)
      return {
        player: this.board[0][columnIndex].value,
        lineType: 'column',
        lineName: columnIndex,
      }

    // Check diagonals - assumes that boardWidth === boardHeight
    const diagonalIndex = [
      this.board.reduce((diagonal, row, i) => {
        diagonal.push(row[i])
        return diagonal
      }, []), // Diagonal top left <=> bottom right
      this.board.reduce((diagonal, row, i) => {
        diagonal.push(row[row.length - i - 1])
        return diagonal
      }, []), // Diagonal top right <=> bottom left
    ].findIndex(
      (diagonal) => diagonal.reduce(checkLine, {}).points === diagonal.length,
    )

    if (diagonalIndex > -1) {
      return {
        lineType: 'diagonal',
        player: this.board[0][diagonalIndex === 0 ? 0 : this.boardWidth - 1]
          .value,
        lineName:
          diagonalIndex === 0
            ? 'top left <=> bottom right'
            : 'top right <=> bottom left',
      }
    }
  }
}
