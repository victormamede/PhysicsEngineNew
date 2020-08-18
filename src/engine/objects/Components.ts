import GameObject from './GameObject'
import Drawer from '../Drawer'
import { UnSubscribeFunction } from '../UnSubscribeFunction'

export default interface Component {
  enabled: boolean

  start(gameObject: GameObject): void
  setRemoveFunction(func: UnSubscribeFunction): void
  onStart(): void
  update(deltaTime: number): void
  draw(drawer: Drawer, deltaTime: number): void
  destroy(): void
  onDestroy(): void
}
