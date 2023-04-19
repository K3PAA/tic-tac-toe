import { makeGrid, getTilesPos, drawCircle, drawCross } from './utils.js'

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

canvas.addEventListener('click', (e) => {
  const [mouseX, mouseY] = [e.offsetX, e.offsetY]
  const tile = getTilesPos({ x: mouseX, y: mouseY })
  const { x, y } = tile
  if (crossToMove && board[y][x] === '-') {
    drawCross({ tile })
    crossToMove = false

    board[y][x] = 'X'
  } else if (!crossToMove && board[y][x] === '-') {
    drawCircle({ tile })
    crossToMove = true

    board[y][x] = '0'
  } else {
    console.log('jerror')
  }
})
