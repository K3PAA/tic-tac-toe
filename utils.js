const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const makeGrid = ({ tileSize, boardSize }) => {
  c.fillStyle = 'orange'
  c.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = tileSize; i < boardSize; i += tileSize) {
    c.moveTo(i, 0)
    c.lineTo(i, boardSize)
    c.moveTo(0, i)
    c.lineTo(boardSize, i)
    c.strokeStyle = 'red'
    c.lineWidth = 3
    c.stroke()
  }
}

const getTilesPos = ({ x, y }) => {
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

const drawCross = ({ tile }) => {
  const { x, y } = tile
  c.moveTo(x * 150 + 25, y * 150 + 25)
  c.lineTo(x * 150 + 125, y * 150 + 125)

  c.moveTo(x * 150 + 125, y * 150 + 25)
  c.lineTo(x * 150 + 25, y * 150 + 125)

  c.strokeStyle = 'red'

  c.stroke()
}

const drawCircle = ({ tile }) => {
  const { x, y } = tile

  c.beginPath()
  c.arc(x * 150 + 75, y * 150 + 75, 50, 0, 2 * Math.PI, false)

  c.stroke()
}

export { makeGrid, getTilesPos, drawCircle, drawCross }