export default class Vector2 {
  public x: number
  public y: number

  constructor(_x?: number, _y?: number) {
    if (_x === undefined) {
      this.x = 0
      this.y = 0
      return
    }

    if (_y === undefined) {
      this.x = _x
      this.y = _x
      return
    }

    this.x = _x
    this.y = _y
  }

  public added(b: Vector2) {
    return new Vector2(this.x + b.x, this.y + b.y)
  }
  public subtracted(b: Vector2) {
    return new Vector2(this.x - b.x, this.y - b.y)
  }
  public multiplied(n: number) {
    return new Vector2(this.x * n, this.y * n)
  }
  public divided(n: number) {
    return new Vector2(this.x / n, this.y / n)
  }
  public magnitudeSqr() {
    return this.x * this.x + this.y * this.y
  }
  public magnitude() {
    return Math.sqrt(this.magnitudeSqr())
  }
  public distance(b: Vector2) {
    return this.subtracted(b).magnitude()
  }
  public rotated(a: number) {
    const cos = Math.cos(a)
    const sin = Math.sin(a)

    return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
  }
  public dot(b: Vector2) {
    return this.x * b.x + this.y * b.y
  }
  public clone() {
    return new Vector2(this.x, this.y)
  }
  public normalized() {
    return this.divided(this.magnitude())
  }
}
