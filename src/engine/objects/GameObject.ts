import Drawer from '../Drawer'
import Component from './Components'
import Scene from '../Scene'
import Transform from './Transform'
import { UnSubscribeFunction } from '../UnSubscribeFunction'

export default interface GameObject {
  transform: Transform
  scene?: Scene

  update(deltaTime: number): void
  draw(drawer: Drawer, deltaTime: number): void
  addComponent<T extends Component>(component: T): void
  addToScene(scene: Scene, removeFromScene: UnSubscribeFunction): void
  onDestroy(): void
  destroy(): void
}
