class AI {
  constructor() {}

  move(board) {
    const emptySpaces = []

    board.forEach((tile, y) => {
      tile.forEach((item, i) => {
        if (item === 0) {
          emptySpaces.push({ x: i, y: y })
        }
      })
    })

    const randomNumber = Math.floor(Math.random() * emptySpaces.length)

    return emptySpaces.length > 0 ? emptySpaces[randomNumber] : false
  }
}
