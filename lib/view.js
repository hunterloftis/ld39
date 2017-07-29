class View extends GameObject {
  constructor(clock, canvas, ship) {
    super(clock)
    this.width = canvas.width = document.body.clientWidth
    this.height = canvas.height = document.body.clientHeight
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.ship = ship
  }
  frame (ms) {
    const ctx = this.ctx
    ctx.fillStyle='rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, 0, this.width, this.height)
    ctx.save()
    ctx.translate(this.width * 0.5, this.height * 0.5)
    this.drawShip()
    ctx.restore()
  }
  drawShip() {
    const ctx = this.ctx
    const ship = this.ship
    
    ctx.save()
      ctx.fillStyle = '#fff'
      ctx.translate(ship.pos.x, ship.pos.y)
      ctx.beginPath()
      ctx.arc(0, 0, ship.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.rotate(ship.dir)
      drawWing()
      ctx.scale(1, -1)
      drawWing()
    ctx.restore()

    function drawWing() {
      ctx.beginPath()
      ctx.moveTo(ship.size * 2.5, ship.size * 0.9)
      ctx.lineTo(0, ship.size * 2)
      ctx.lineTo(ship.size * -1.75, ship.size * 0.9)
      ctx.closePath()
      ctx.fill()
    }
  }
}