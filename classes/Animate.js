class Animate {
  constructor({ context, canvas }) {
    this.context = context
    this.canvas = canvas
    this.interval = undefined
  }

  drawRowLine({ i, from, to, partX }) {
    this.context.beginPath()
    this.context.moveTo(i * partX + 5, from.y)
    this.context.lineTo(i * partX + partX + 5, to.y)
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  drawColumnLine({ i, from, to, partY }) {
    this.context.beginPath()
    this.context.moveTo(from.x, i * partY + 5)
    this.context.lineTo(to.x, i * partY + partY + 5)
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  drawCrossTRBL({ i, from, to, partX, partY }) {
    this.context.beginPath()
    this.context.moveTo(from.x + partX * i + 4, from.y - partY * i - 4)
    this.context.lineTo(
      from.x + partX * i + partX + 4,
      from.y - i * partY - partY - 4
    )
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  drawCrossTLBR({ i, from, to, partX, partY }) {
    this.context.beginPath()
    this.context.moveTo(from.x + i * partX + 4, i * partY + 4)
    this.context.lineTo(i * partX + partX + 4, i * partY + partY + 4)
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  lineAnimation({ from, to, type = null }) {
    const partX = Math.abs(from.x - to.x) / 50
    const partY = Math.abs(from.y - to.y) / 50

    console.log(partX, partY)

    for (let i = 0; i < 50; i++) {
      this.interval = setTimeout(() => {
        if (partY && !partX) {
          this.drawColumnLine({ i, from, to, partY })
        } else if (partX && !partY) {
          this.drawRowLine({ i, from, to, partX })
        } else if (type === 'top right <=> bottom left') {
          this.drawCrossTRBL({ i, from, to, partX, partY })
        } else if (type === 'top left <=> bottom right') {
          this.drawCrossTLBR({ i, from, to, partX, partY })
        }
      }, i * 10)
    }

    clearTimeout(this.interval)
    this.interval = undefined
  }
}
