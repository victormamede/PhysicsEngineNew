import Vector2 from '../../math/Vector'
import ComponentAbs from './ComponentAbs'

export default class Transform extends ComponentAbs {
  public position: Vector2
  public rotation: number
  public scale: Vector2

  constructor() {
    super()

    this.position = new Vector2()
    this.rotation = 0
    this.scale = new Vector2(1)
  }

  onStart() {}
  update() {}
  draw() {}
  onDestroy() {}
}
