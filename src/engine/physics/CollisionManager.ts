import Scene from './../Scene'
import Collider from './colliders/Collider'
import CollisionStrategy from './CollisionStrategy'
import { UnSubscribeFunction } from '../UnSubscribeFunction'
import Drawer from '../Drawer'

export default class CollisionManager {
  private colliders: Collider[] = []

  constructor(private scene: Scene, private strategy: CollisionStrategy) {}

  public subscribe(collider: Collider) {
    const unSubscribe: UnSubscribeFunction = () => {
      if (this.colliders.includes(collider) && collider != null) {
        const colliderIndex = this.colliders.indexOf(collider)
        this.colliders.splice(colliderIndex, 1)
      }
    }

    collider.subscribed(unSubscribe)
    this.colliders.push(collider)
  }

  public debugDraw(deltaTime: number) {
    this.forEachCollider((collider) =>
      collider.debugDraw(this.scene.drawer, deltaTime)
    )
  }
  public update(deltaTime: number) {
    this.forEachPairOfColliders((colliderA, colliderB) => {
      const collisionVector = this.strategy.getCollisionVector(
        colliderA,
        colliderB
      )

      if (collisionVector == null) {
        return
      }

      colliderA.onCollision({
        collider: colliderA,
        otherCollider: colliderB,
        collisionVector: collisionVector,
      })

      colliderB.onCollision({
        collider: colliderB,
        otherCollider: colliderA,
        collisionVector: collisionVector.multiplied(-1),
      })
    })
  }

  private forEachCollider(func: (collider: Collider) => void) {
    this.colliders.forEach((collider) => {
      if (collider.enabled) {
        func(collider)
      }
    })
  }

  private forEachPairOfColliders(
    func: (colliderA: Collider, colliderB: Collider) => void
  ) {
    for (let i = 0; i < this.colliders.length; i++) {
      for (let j = i + 1; j < this.colliders.length; j++) {
        const colliderA = this.colliders[i]
        const colliderB = this.colliders[j]

        if (colliderA.enabled && colliderB.enabled) {
          func(colliderA, colliderB)
        }
      }
    }
  }
}
