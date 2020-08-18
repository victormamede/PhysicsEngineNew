import Drawer from './Drawer'
import GameObjectManager from './GameObjectManager'
import CollisionManager from './physics/CollisionManager'
import config from './Config'
import SATCollisionStrategy from './physics/SATStrategy'
import GameObject from './objects/GameObject'
import Collider from './physics/colliders/Collider'
import Vector2 from '../math/Vector'

export default class Scene {
  public drawer: Drawer

  private lastFrameTime: number = 0
  private gameObjectManager: GameObjectManager
  private collisionManager: CollisionManager

  private canvasDimensions: Vector2

  constructor(canvas: HTMLCanvasElement) {
    this.drawer = new Drawer(canvas)
    this.gameObjectManager = new GameObjectManager(this)
    this.collisionManager = new CollisionManager(
      this,
      new SATCollisionStrategy()
    )

    this.canvasDimensions = new Vector2(canvas.width, canvas.height)
    this.startLoop = this.startLoop.bind(this)
  }

  private draw(deltaTime: number) {
    this.drawer.setFillColor([0, 0, 0])
    this.drawer.fillRect(new Vector2(), this.canvasDimensions)

    this.gameObjectManager.draw(deltaTime)
    if (config.DEBUG) {
      this.collisionManager.debugDraw(deltaTime)
    }
  }
  private update(deltaTime: number) {
    this.gameObjectManager.update(deltaTime)
    this.collisionManager.update(deltaTime)
  }

  public startLoop(elapsedTime: number) {
    const deltaTime = elapsedTime - this.lastFrameTime

    this.update(deltaTime)
    this.draw(deltaTime)

    this.lastFrameTime = elapsedTime
    window.requestAnimationFrame(this.startLoop)
  }

  public instantiate(gameObject: GameObject) {
    this.gameObjectManager.instantiate(gameObject)
  }
  public subscribeCollider(collider: Collider) {
    this.collisionManager.subscribe(collider)
  }
}
