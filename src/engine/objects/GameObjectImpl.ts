import GameObject from './GameObject'
import Drawer from '../Drawer'
import Component from './Components'
import Transform from './Transform'
import Scene from '../Scene'
import { UnSubscribeFunction } from '../UnSubscribeFunction'

export default class GameObjectImpl implements GameObject {
  public transform: Transform
  public scene?: Scene

  private components: Component[] = []
  private destroyFunc: () => void = () => {
    throw new Error('Destroy function not given')
  }

  constructor() {
    this.transform = new Transform()

    this.addComponent(this.transform)
  }

  private forEachComponent(func: (component: Component) => void) {
    this.components.forEach((component) => {
      if (component.enabled) {
        func(component)
      }
    })
  }

  public update(deltaTime: number): void {
    this.forEachComponent((component) => component.update(deltaTime))
  }

  public draw(drawer: Drawer, deltaTime: number): void {
    this.forEachComponent((component) => component.draw(drawer, deltaTime))
  }

  public onDestroy() {
    this.forEachComponent((component) => component.onDestroy())
  }

  public addComponent<T extends Component>(component: T): void {
    const removeFromGameObject = () => {
      if (this.components.includes(component) && component != null) {
        const componentIndex = this.components.indexOf(component)
        this.components.splice(componentIndex, 1)
      }
    }
    this.components.push(component)
    component.setRemoveFunction(removeFromGameObject)
  }

  public addToScene(scene: Scene, removeFromScene: () => void): void {
    this.scene = scene
    this.destroyFunc = removeFromScene
    this.components.forEach((component) => component.start(this))
  }

  public destroy(): void {
    this.forEachComponent((compoenent) => compoenent.destroy())
    this.onDestroy()
    this.destroyFunc()
  }
}
