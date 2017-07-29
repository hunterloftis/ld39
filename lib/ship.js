class Ship extends GameObject {
  constructor(x, y, clock, control) {
    super(clock)
    this.pos = new Vector2(x, y)
    this.prev = this.pos.clone()
    this.dir = Math.PI * -0.5
    this.size = 16
    this.control = control
    this._agility = 0.3 * Math.PI / 1000
    this._thrust = 1 / 1000
    this._drag = 0.005
  }
  speed () {
    return this.pos.minus(this.prev).length() / this.clock.tick * 1000
  }
  tick (ms) {
    const control = this.control
    const vel = this.pos.minus(this.prev)
    var next = this.pos.plus(vel.scaled(1 - this._drag))
    const agility = this._agility / (1 + this.speed() / 100)
    if (control.left) this.dir -= ms * agility
    if (control.right) this.dir += ms * agility
    if (control.up) {
      const p = this._thrust * ms
      const impulse = new Vector2(Math.cos(this.dir) * p, Math.sin(this.dir) * p)
      next = next.plus(impulse)
    }
    this.prev = this.pos
    this.pos = next
  }
}