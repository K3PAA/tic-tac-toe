class Animate {
  constructor({ context }) {
    this.context = context
    this.interval = undefined
  }

  drawRowLine({ i, from, to, partX }) {
    this.context.beginPath()
    this.context.moveTo(i * partX, from.y)
    this.context.lineTo(i * partX + partX, to.y)
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  drawColumnLine({ i, from, to, partY }) {
    this.context.beginPath()
    this.context.moveTo(from.x, i * partY)
    this.context.lineTo(to.x, i * partY + partY)
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  drawCrossTRBL({ i, from, to, partX, partY }) {
    this.context.beginPath()
    this.context.moveTo(from.x + partX * i, from.y - partY * i)
    this.context.lineTo(from.x + partX * i + partX, from.y - i * partY - partY)
    this.context.strokeStyle = `hsl(${i * 2 + 200}, 50%, 50%)`
    this.context.lineWidth = 5
    this.context.stroke()
    this.context.closePath()
  }

  drawCrossTLBR({ i, from, to, partX, partY }) {
    this.context.beginPath()
    this.context.moveTo(from.x + i * partX, i * partY)
    this.context.lineTo(i * partX + partX, i * partY + partY)
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
          console.log('column')
          this.drawColumnLine({ i, from, to, partY })
        } else if (partX && !partY) {
          console.log('rowLine')
          this.drawRowLine({ i, from, to, partX })
        } else if (type === 'top right <=> bottom left') {
          this.drawCrossTRBL({ i, from, to, partX, partY })
        } else if (type === 'top left <=> bottom right') {
          this.drawCrossTLBR({ i, from, to, partX, partY })
        }
      }, i * 5)
    }

    clearTimeout(this.interval)
    this.interval = undefined
  }
}
