import { Collision } from '../Collision'
import Collider from './Collider'
import Component from '../../objects/Components'

export default interface ColliderObserver extends Component {
  onCollisionStart(collision: Collision): void
  onCollisionStay(collision: Collision): void
  onCollisionExit(collider: Collider): void
}
