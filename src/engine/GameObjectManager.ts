import GameObject from './objects/GameObject'
import Scene from './Scene'
import { UnSubscribeFunction } from './UnSubscribeFunction'
import Drawer from './Drawer'
export default class GameObjectManager {
  private gameObjects: GameObject[] = []

  constructor(private scene: Scene) {}

  public instantiate(gameObject: GameObject) {
    const removeFromScene: UnSubscribeFunction = () => {
      if (this.gameObjects.includes(gameObject) && gameObject != null) {
        const gameObjectIndex = this.gameObjects.indexOf(gameObject)
        this.gameObjects.splice(gameObjectIndex, 1)
      }
    }

    gameObject.addToScene(this.scene, removeFromScene)
    this.gameObjects.push(gameObject)
  }

  public draw(deltaTime: number) {
    this.gameObjects.forEach((gameObject) =>
      gameObject.draw(this.scene.drawer, deltaTime)
    )
  }
  public update(deltaTime: number) {
    this.gameObjects.forEach((gameObject) => gameObject.update(deltaTime))
  }
}
