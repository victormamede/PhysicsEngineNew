import Scene from '../../Scene'
import Component from '../../objects/Components'
import { Collision } from '../Collision'
import ColliderObserver from './ColliderObserver'
import { UnSubscribeFunction } from '../../UnSubscribeFunction'
import Drawer from '../../Drawer'
import Vector2 from '../../../math/Vector'

export default interface Collider extends Component {
  subscribed(unSubscribe: UnSubscribeFunction): void
  debugDraw(drawer: Drawer, deltaTime: number): void
  onCollision(collision: Collision): void
  observe(observer: ColliderObserver): UnSubscribeFunction

  getAxes(): Vector2[]
  getPoints(): Vector2[]
}
