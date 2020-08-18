import ColliderAbs from './ColliderAbs'
import { Rectangle } from '../../../math/Shapes/Shapes'
import Vector2 from '../../../math/Vector'
import Drawer from '../../Drawer'

export default class RectangleCollider extends ColliderAbs {
  constructor(private rectangle: Rectangle) {
    super()
  }

  public getPosition(): Vector2 {
    return this.gameObject.transform.position.added(this.rectangle.position)
  }

  public getDimensions(): Vector2 {
    return new Vector2(
      this.gameObject.transform.scale.x * this.rectangle.dimensions.x,
      this.gameObject.transform.scale.y * this.rectangle.dimensions.y
    )
  }

  public getAxes(): Vector2[] {
    const axes = [new Vector2(1, 0), new Vector2(0, 1)]
    const a = this.gameObject.transform.rotation

    return [axes[0].rotated(a), axes[1].rotated(a)]
  }

  public getPoints(): Vector2[] {
    const dimensions = this.getDimensions()
    const rotation = this.gameObject.transform.rotation

    const points = [
      this.rectangle.position
        .rotated(rotation)
        .added(this.gameObject.transform.position),
      this.rectangle.position
        .added(new Vector2(dimensions.x, 0))
        .rotated(rotation)
        .added(this.gameObject.transform.position),
      this.rectangle.position
        .added(dimensions)
        .rotated(rotation)
        .added(this.gameObject.transform.position),
      this.rectangle.position
        .added(new Vector2(0, dimensions.y))
        .rotated(rotation)
        .added(this.gameObject.transform.position),
    ]

    return points
  }
}
