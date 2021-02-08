import Drawer from '../engine/Drawer'
import ComponentAbs from '../engine/objects/ComponentAbs'
import Collider from '../engine/physics/colliders/Collider'
import ColliderObserver from '../engine/physics/colliders/ColliderObserver'
import { Collision } from '../engine/physics/Collision'

export default class ObjectController
  extends ComponentAbs
  implements ColliderObserver {
  constructor(private speed: number) {
    super()
  }

  private rotationRate = 0
  onCollisionStay(collision: Collision): void {
    this.gameObject.transform.position = this.gameObject.transform.position.added(
      collision.collisionVector.multiplied(1)
    )
  }
  onStart(): void {
    this.rotationRate = Math.random() * 500 + 500
  }
  update(deltaTime: number): void {
    this.gameObject.transform.position.y += (deltaTime * this.speed) / 100
    // this.gameObject.transform.position.y += Math.sin(this.time)
    this.gameObject.transform.rotation += deltaTime / this.rotationRate
  }
  draw(drawer: Drawer, deltaTime: number): void {}
  onCollisionStart(collision: Collision): void {}
  onCollisionExit(collider: Collider): void {}
  onDestroy(): void {}
}
