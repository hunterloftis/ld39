class Keyboard {
  constructor() {
    this.left = false
    this.right = false
    this.up = false
    document.addEventListener('keydown', this._onKey.bind(this, true), false)
    document.addEventListener('keyup', this._onKey.bind(this, false), false)
  }
  _onKey (val, e) {
    if (e.keyCode === 37) this.left = val
    else if (e.keyCode === 39) this.right = val
    else if (e.keyCode === 38) this.up = val
    else return
    e.preventDefault && e.preventDefault()
    e.stopPropagation && e.stopPropagation()
  }
}
