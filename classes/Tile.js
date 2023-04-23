class Tile {
  constructor({ position, context, value }) {
    this.position = position
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
    this.context.fillStyle = 'orange'
    this.context.fillRect(x * 150 + 3, y * 150 + 3, 147, 147)
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

  draw() {
    if (this.value === 0) this.drawEmpty()
    else if (this.value === 1) this.drawCross()
    else if (this.value === 2) this.drawCircle()
    else console.log('wrong number in game grid')
  }
}
