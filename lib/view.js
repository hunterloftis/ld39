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
    ctx.clearRect(0, 0, this.width, this.height)
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
    ctx.translate(ship.x, ship.y)
    ctx.beginPath()
    ctx.arc(ship.pos.x, ship.pos.y, ship.size, 0, Math.PI * 2)
    ctx.fill()
    drawWing()
    ctx.scale(-1, 1)
    drawWing()
    ctx.restore()

    function drawWing() {
      ctx.beginPath()
      ctx.moveTo(ship.pos.x + ship.size * 0.9, ship.pos.y + ship.size * 1.75)
      ctx.lineTo(ship.pos.x + ship.size * 2, ship.pos.y)
      ctx.lineTo(ship.pos.x + ship.size * 0.9, ship.pos.y - ship.size * 2.5)
      ctx.closePath()
      ctx.fill()
    }
  }
}