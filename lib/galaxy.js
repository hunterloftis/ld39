class Galaxy {
  generate (count, pos, dist) {
    this.stars = new Array(count).fill(true).map(() => {
      return new Star(pos, dist)
    })
  }
  limit (pos, near, range) {
    this.stars.forEach(star => star.limit(pos, near, range))
  }
}

class Star {
  constructor (pos, range) {
    this.pos = Star.place(pos, 0, range)
    this.size = Math.random() * 3
  }
  limit (pos, near, range) {
    if (this.pos.minus(pos).length() > near + range) {
      this.pos = Star.place(pos, near, range)
    }
  }
  static place (pos, near, range) {
    const angle = Math.random() * Math.PI * 2
    const dist = near + Math.sqrt(Math.random()) * range
    const off = new Vector2(Math.cos(angle) * dist, Math.sin(angle) * dist)
    return pos.plus(off)
  }
}