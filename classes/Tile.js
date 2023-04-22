class Tile {
  constructor({ position, context, value }) {
    this.position = position
    this.value = value
    this.context = context
  }

  reset() {
    const { x, y } = this.position
    this.value = 0
    this.context.fillStyle = 'orange'
    this.context.fillRect(x * 150, y * 150, 150, 150)
  }

  drawCross() {
    const { x, y } = this.position
    this.context.moveTo(x * 150 + 25, y * 150 + 25)
    this.context.lineTo(x * 150 + 125, y * 150 + 125)

    this.context.moveTo(x * 150 + 125, y * 150 + 25)
    this.context.lineTo(x * 150 + 25, y * 150 + 125)

    this.context.strokeStyle = 'red'

    this.context.stroke()
  }

  drawCircle() {
    const { x, y } = this.position

    this.context.beginPath()
    this.context.arc(x * 150 + 75, y * 150 + 75, 50, 0, 2 * Math.PI, false)

    this.context.stroke()
  }
}
