import GameObjectImpl from '../engine/objects/GameObjectImpl'
import ShapeCollider from '../engine/physics/colliders/ShapeCollider'
import Scene from '../engine/Scene'
import Vector2 from '../math/Vector'
import ObjectController from './ObjectController'

export function createFirst(position: Vector2) {
  const obj = new GameObjectImpl()
  const collider = new ShapeCollider(new Vector2(), [
    new Vector2(),
    new Vector2(100, 75),
    new Vector2(40, 100),
    new Vector2(10, 100),
    new Vector2(-10, 80),
  ])
  const controller = new ObjectController(30)
  obj.transform.position = position.clone()
  obj.addComponent(collider)
  obj.addComponent(controller)

  collider.observe(controller)

  return obj
}

export function createSecond(position: Vector2) {
  const obj = new GameObjectImpl()
  const collider = new ShapeCollider(new Vector2(), [
    new Vector2(),
    new Vector2(150, 35),
    new Vector2(120, 75),
    new Vector2(10, 120),
    new Vector2(-10, 80),
  ])
  const controller = new ObjectController(20)
  obj.transform.position = position.clone()
  obj.addComponent(collider)
  obj.addComponent(controller)

  collider.observe(controller)

  return obj
}
