class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  plus (v) {
    return new Vector2(this.x + v.x, this.y + v.y)
  }
  minus (v) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }
  scaled (n) {
    return new Vector2(this.x * n, this.y * n)
  }
  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  clone () {
    return new Vector2(this.x, this.y)
  }
}