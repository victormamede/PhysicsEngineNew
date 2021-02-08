import Scene from '../engine/Scene'
import GameObjectImpl from '../engine/objects/GameObjectImpl'
import RectangleCollider from '../engine/physics/colliders/RectangleCollider'
import Vector2 from '../math/Vector'
import { createFirst, createSecond } from './Objects'
import Spawner from './Spawner'

export default function BuildScene(scene: Scene) {
  const objA = new GameObjectImpl()
  const canvasSize = [scene.drawer.canvas.width, scene.drawer.canvas.height]
  const collider = new RectangleCollider({
    position: new Vector2(0, canvasSize[1] - 50),
    dimensions: new Vector2(canvasSize[0], 50),
  })
  objA.transform.position = new Vector2(0, 0)
  objA.addComponent(collider)

  scene.instantiate(objA)

  const factory = (position: Vector2) => {
    if (Math.random() > 0.5) {
      return createFirst(position)
    } else {
      return createSecond(position)
    }
  }
  const spawner = new GameObjectImpl()
  const spawnerComponent = new Spawner(1000, factory)
  spawner.addComponent(spawnerComponent)

  spawner.transform.position = new Vector2(canvasSize[0] / 2, 0)
  setTimeout(() => (spawnerComponent.enabled = false), 10000)
  scene.instantiate(spawner)

  scene.startLoop(0)
}
