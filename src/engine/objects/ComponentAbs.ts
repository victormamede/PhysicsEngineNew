import Component from './Components'
import GameObject from './GameObject'
import Drawer from '../Drawer'
import { UnSubscribeFunction } from '../UnSubscribeFunction'

export default abstract class ComponentAbs implements Component {
  enabled: boolean = true
  private _gameObject?: GameObject
  private removeFromGameObject: UnSubscribeFunction = () => {}

  protected get gameObject(): GameObject {
    if (this._gameObject == null) {
      throw new Error('GameObject not attached')
    }

    return this._gameObject
  }

  start(gameObject: GameObject): void {
    this._gameObject = gameObject

    this.onStart()
  }

  setRemoveFunction(func: UnSubscribeFunction) {
    this.removeFromGameObject = func
  }

  destroy(): void {
    this.onDestroy()
    this.removeFromGameObject()
  }

  abstract onStart(): void
  abstract update(deltaTime: number): void
  abstract draw(drawer: Drawer, deltaTime: number): void
  abstract onDestroy(): void
}
