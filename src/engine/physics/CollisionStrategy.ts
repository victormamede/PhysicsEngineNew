import Collider from './colliders/Collider'
import Vector2 from '../../math/Vector'

export default interface CollisionStrategy {
  getCollisionVector(colliderA: Collider, colliderB: Collider): Vector2 | null
}
