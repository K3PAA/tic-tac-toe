import {
  makeGrid,
  getTilesPos,
  drawCircle,
  drawCross,
  enemyMove,
  chceckForWin,
} from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const tileSize = 150
const boardSize = tileSize * 3
canvas.width = boardSize
canvas.height = boardSize

let board = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-'],
]

let crossToMove = true

makeGrid({ tileSize, boardSize })

const move = async (tile) => {
  await movePlayer(tile)
  moveAI()
}

const movePlayer = (tile) => {
  const { x, y } = tile
  drawCross({ tile })
  board[y][x] = 'X'
  chceckForWin({ board })
}

const moveAI = () => {
  const eTile = enemyMove({ board })
  if (eTile) {
    const { ey, ex } = eTile
    board[ey][ex] = 'O'
    drawCircle({ tile: eTile })
    chceckForWin({ board })
  } else console.log('end')
}
canvas.addEventListener('click', (e) => {
  const [mouseX, mouseY] = [e.offsetX, e.offsetY]
  const tile = getTilesPos({ x: mouseX, y: mouseY })
  const { x, y } = tile

  if (crossToMove && board[y][x] === '-') {
    move(tile)
  }
})
