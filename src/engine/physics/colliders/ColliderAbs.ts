import ComponentAbs from '../../objects/ComponentAbs'
import Collider from './Collider'
import { Collision } from '../Collision'
import ColliderObserver from './ColliderObserver'
import { UnSubscribeFunction } from '../../UnSubscribeFunction'
import Drawer from '../../Drawer'
import Vector2 from '../../../math/Vector'

export default abstract class ColliderAbs extends ComponentAbs
  implements Collider {
  private currentColliders: Collider[] = []
  private collidedThisFrame: Collider[] = []
  private observerManager = new ColliderObserverManager()
  private unSubscribe: UnSubscribeFunction = () => {}

  public get isColliding() {
    return this.currentColliders.length > 0
  }

  public onCollision(collision: Collision): void {
    if (!this.currentColliders.includes(collision.otherCollider)) {
      this.currentColliders.push(collision.otherCollider)
      this.observerManager.onCollisionStart(collision)
    }

    this.collidedThisFrame.push(collision.otherCollider)
    this.observerManager.onCollisionStay(collision)
  }

  public update() {
    this.currentColliders.forEach((collider) => {
      if (!this.collidedThisFrame.includes(collider)) {
        this.observerManager.onCollisionExit(collider)

        const index = this.currentColliders.indexOf(collider)
        this.currentColliders.splice(index, 1)
      }
    })

    this.collidedThisFrame = []
  }

  public onStart() {
    if (this.gameObject.scene == null) {
      throw new Error('No scene')
    }

    this.gameObject.scene.subscribeCollider(this)
  }
  public draw() {}

  public observe(observer: ColliderObserver): UnSubscribeFunction {
    return this.observerManager.addObserver(observer)
  }

  public subscribed(unSubscribe: UnSubscribeFunction) {
    this.unSubscribe = unSubscribe
  }

  public onDestroy() {
    this.unSubscribe()
  }

  public debugDraw(drawer: Drawer, deltaTime: number): void {
    if (this.isColliding) {
      drawer.setStrokeStyle([255, 0, 0])
    } else {
      drawer.setStrokeStyle([0, 255, 0])
    }

    drawer.drawShape(this.getPoints())
  }
  public abstract getAxes(): Vector2[]
  public abstract getPoints(): Vector2[]
}

class ColliderObserverManager {
  private observers: ColliderObserver[] = []

  private forEachObserver(func: (observer: ColliderObserver) => void) {
    this.observers.forEach((observer) => {
      if (observer.enabled) {
        func(observer)
      }
    })
  }

  public addObserver(observer: ColliderObserver): UnSubscribeFunction {
    const unSubscribe = () => {
      if (this.observers.includes(observer) && observer != null) {
        const observerIndex = this.observers.indexOf(observer)
        this.observers.splice(observerIndex, 1)
      }
    }

    this.observers.push(observer)
    return unSubscribe
  }

  public onCollisionStart(collision: Collision): void {
    this.forEachObserver((observer) => observer.onCollisionStart(collision))
  }
  public onCollisionStay(collision: Collision): void {
    this.forEachObserver((observer) => observer.onCollisionStay(collision))
  }
  public onCollisionExit(otherCollider: Collider): void {
    this.forEachObserver((collider) => collider.onCollisionExit(otherCollider))
  }
}
