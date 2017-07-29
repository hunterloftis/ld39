class GameObject {
  constructor(clock) {
    const self = this
    clock.on('clock:tick', e => {
      self.tick(e.detail)
    })
    clock.on('clock:frame', e => {
      self.frame(e.detail)
    })
  }
  tick(ms) {}
  frame(ms) {}
}