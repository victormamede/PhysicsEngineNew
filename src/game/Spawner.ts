import Drawer from '../engine/Drawer'
import ComponentAbs from '../engine/objects/ComponentAbs'
import GameObject from '../engine/objects/GameObject'
import Vector2 from '../math/Vector'

export default class Spawner extends ComponentAbs {
  private counter = 0

  constructor(
    private rate: number,
    private factory: (position: Vector2) => GameObject
  ) {
    super()
  }

  update(deltaTime: number): void {
    this.counter += deltaTime

    if (this.counter < this.rate) {
      return
    }

    this.counter %= this.rate

    const spawned = this.factory(this.gameObject.transform.position)
    this.gameObject.scene.instantiate(spawned)
  }
  draw(drawer: Drawer, deltaTime: number): void {}
  onDestroy(): void {}
  onStart(): void {}
}
