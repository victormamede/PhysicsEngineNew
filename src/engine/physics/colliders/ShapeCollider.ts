import ColliderAbs from './ColliderAbs'
import Drawer from '../../Drawer'
import Vector2 from '../../../math/Vector'

export default class ShapeCollider extends ColliderAbs {
  constructor(private center: Vector2, private points: Vector2[]) {
    super()
  }

  public getAxes(): Vector2[] {
    let axes: Vector2[] = []
    let points = this.getPoints()

    for (let i = 0; i < points.length; i++) {
      const direction = points[(i + 1) % points.length].subtracted(points[i])

      axes.push(direction.rotated(Math.PI / 2).normalized())
    }

    return axes
  }
  public getPoints(): Vector2[] {
    return this.points.map((point) =>
      point
        .subtracted(this.center)
        .rotated(this.gameObject.transform.rotation)
        .added(this.center)
        .added(this.gameObject.transform.position)
    )
  }
}
