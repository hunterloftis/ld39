class Clock {
  constructor(tick) {
    this.tick = tick
    this.prev = 0
    this.accumulator = 0
    this.frame = this.frame.bind(this)   
    this._emitter = window 
  }
  start() {
    this.prev = performance.now()
    requestAnimationFrame(this.frame)
  }
  stop() {
    this.prev = 0
  }
  emit(name, val) {
    this._emitter.dispatchEvent(new CustomEvent(name, { detail: val }))
  }
  on(name, fn) {
    this._emitter.addEventListener(name, fn)
  }
  frame() {
    if (this.prev === 0) return
    const now = performance.now()
    const delta = Math.min(now - this.prev, 100)
    this.accumulator += delta
    while (this.accumulator >= this.tick) {
      this.emit('clock:tick', this.tick)
      this.accumulator -= this.tick
    }
    this.emit('clock:frame', delta)
    requestAnimationFrame(this.frame)
  }
}