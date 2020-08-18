import Scene from '../engine/Scene'
import GameObjectImpl from '../engine/objects/GameObjectImpl'
import RectangleCollider from '../engine/physics/colliders/RectangleCollider'
import Vector2 from '../math/Vector'
import ComponentAbs from '../engine/objects/ComponentAbs'
import Drawer from '../engine/Drawer'
import GameObjectManager from '../engine/GameObjectManager'
import ColliderObserver from '../engine/physics/colliders/ColliderObserver'
import { Collision } from '../engine/physics/Collision'
import Collider from '../engine/physics/colliders/Collider'
import ShapeCollider from '../engine/physics/colliders/ShapeCollider'

export default function BuildScene(scene: Scene) {
  const objA = new GameObjectImpl()
  const collider = new RectangleCollider({
    position: new Vector2(0, -100),
    dimensions: new Vector2(50, 500),
  })
  objA.transform.position = new Vector2(500, 50)
  objA.addComponent(collider)

  scene.instantiate(objA)

  createPlayer(scene, new Vector2(0, 100))
  createPlayer(scene, new Vector2(50, 110))

  scene.startLoop(0)
}

function createPlayer(scene: Scene, position: Vector2) {
  const obj = new GameObjectImpl()
  const collider = new ShapeCollider(new Vector2(), [
    new Vector2(),
    new Vector2(100, 75),
    new Vector2(40, 100),
    new Vector2(10, 100),
    new Vector2(-10, 80),
  ])
  const controller = new Controller()
  obj.transform.position = position.clone()
  obj.addComponent(collider)
  obj.addComponent(controller)

  collider.observe(controller)

  scene.instantiate(obj)
}

class Controller extends ComponentAbs implements ColliderObserver {
  private time = 0
  private rotationRate = 0
  onCollisionStart(collision: Collision): void {
  }
  onCollisionStay(collision: Collision): void {
    this.gameObject.transform.position = this.gameObject.transform.position.added(
      collision.collisionVector.multiplied(1)
    )
  }
  onCollisionExit(collider: Collider): void {}
  onStart(): void {
    this.rotationRate = Math.random() * 500 + 500
  }
  update(deltaTime: number): void {

    this.time += deltaTime / 100

    this.gameObject.transform.position.x += deltaTime / 10
    // this.gameObject.transform.position.y += Math.sin(this.time)
    this.gameObject.transform.rotation += deltaTime / this.rotationRate
  }
  draw(drawer: Drawer, deltaTime: number): void {}
  onDestroy(): void {}
}
