class View extends GameObject {
  constructor(clock, canvas, ship, galaxy, earth) {
    super(clock)
    this.canvas = canvas
    this.fit()
    this.ctx = canvas.getContext('2d')
    this.ship = ship
    this.galaxy = galaxy
    this.earth = earth
    this.dir = 0
    this.pos = ship.pos.clone()
    this.zoom = 1
    this._clear = 0.2
    window.addEventListener('resize', this.fit.bind(this))
  }
  fit () {
    this.width = this.canvas.width = document.body.clientWidth
    this.height = this.canvas.height = document.body.clientHeight
  }
  range () {
    return Math.max(this.width, this.height) * 0.5 / Math.sqrt(this.zoom)
  }
  frame (ms) {
    this.follow(ms)
    this.draw(ms)
  }
  follow (ms) {
    const dpos = this.ship.pos.minus(this.pos)
    const ddir = this.ship.dir - this.dir + Math.PI * 0.5
    const dist = dpos.scaled(1.5 * ms / 1000)
    const spin = ddir * 1 * ms / 1000
    const dzoom = (1 - Math.min(this.ship.speed() / 1000, 0.3)) - this.zoom
    const zoom = dzoom * ms / 1000
    this.pos = this.pos.plus(dist)
    this.dir += spin
    this.zoom += zoom
  }
  draw (ms) {
    const ctx = this.ctx
    const opacity = Math.min(ms / (1000 * this._clear), 1)
    const blank = `rgba(0, 0, 0, ${opacity})`
    
    ctx.fillStyle = blank
    ctx.fillRect(0, 0, this.width, this.height)
    ctx.save()
    ctx.translate(this.width * 0.5, this.height * 0.8)
    ctx.scale(this.zoom, this.zoom)
    ctx.rotate(-this.dir)
    ctx.translate(-this.pos.x, -this.pos.y)
    this.drawGalaxy()
    this.drawEarth()
    this.drawShip()
    ctx.restore()
  }
  drawGalaxy () {
    const ctx = this.ctx
    const max = this.range()
    this.galaxy.limit(this.pos, max, max * 2)
    ctx.save()
    ctx.fillStyle = '#fff'
    this.galaxy.stars.forEach(star => {
      ctx.rect(star.pos.x, star.pos.y, star.size, star.size)
    })
    ctx.fill()
    ctx.restore()
  }
  drawEarth () {
    const ctx = this.ctx
    ctx.save()
    ctx.translate(this.earth.pos.x, this.earth.pos.y)
    ctx.fillStyle = '#00f'
    ctx.beginPath()
    ctx.arc(0, 0, earth.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  drawShip () {
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