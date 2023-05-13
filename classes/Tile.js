class Tile {
  constructor({ position, tileSize, context, value }) {
    this.position = position
    this.tileSize = tileSize
    this.value = value
    this.context = context
  }

  reset() {
    if (this.value === 0) return
    this.drawEmpty()
  }

  drawEmpty() {
    const { x, y } = this.position
    this.value = 0
    this.context.fillStyle = 'rgba(0,0,0,0)'
    this.context.fillRect(
      x * this.tileSize + 3,
      y * this.tileSize + 3,
      this.tileSize - 6,
      this.tileSize - 6,
    )
  }

  drawCross() {
    const { x, y } = this.position
    this.context.beginPath()

    this.context.moveTo(
      x * this.tileSize + this.tileSize * (1 / 6),
      y * this.tileSize + this.tileSize * (1 / 6),
    )
    this.context.lineTo(
      x * this.tileSize + this.tileSize * (5 / 6),
      y * this.tileSize + this.tileSize * (5 / 6),
    )

    this.context.moveTo(
      x * this.tileSize + this.tileSize * (5 / 6),
      y * this.tileSize + this.tileSize * (1 / 6),
    )
    this.context.lineTo(
      x * this.tileSize + this.tileSize * (1 / 6),
      y * this.tileSize + this.tileSize * (5 / 6),
    )

    this.context.strokeStyle = 'green'
    this.context.stroke()
    this.context.closePath()
  }

  drawCircle() {
    const { x, y } = this.position

    this.context.beginPath()

    this.context.arc(
      x * this.tileSize + this.tileSize / 2,
      y * this.tileSize + this.tileSize / 2,
      this.tileSize * (1 / 3),
      0,
      2 * Math.PI,
      false,
    )

    this.context.strokeStyle = 'red'
    this.context.stroke()
    this.context.closePath()
  }

  draw() {
    if (this.value === 0) this.drawEmpty()
    else if (this.value === 1) this.drawCross()
    else if (this.value === 2) this.drawCircle()
    else console.log('wrong number in game grid')
  }
}
