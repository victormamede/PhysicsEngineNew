import Collider from './colliders/Collider'
import Vector2 from '../../math/Vector'

export type Collision = {
  collider: Collider
  otherCollider: Collider
  collisionVector: Vector2
}
