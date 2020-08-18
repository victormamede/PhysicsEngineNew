import CollisionStrategy from './CollisionStrategy'
import Collider from './colliders/Collider'
import Vector2 from '../../math/Vector'

export default class SATCollisionStrategy implements CollisionStrategy {
  private getIntersectionDirection(a: Line, b: Line) {
    if (a.max < b.min || a.min > b.max) {
      return null
    }

    const values = [b.min - a.max, b.max - a.min]

    return this.returnNearestFromZero(values)
  }

  private returnNearestFromZero(values: number[]) {
    let min = Infinity
    values.forEach((value) => {
      if (Math.abs(value) < Math.abs(min)) {
        min = value
      }
    })

    return min
  }

  private getAxesProjections(shapeA: Vector2[], axis: Vector2) {
    let min = Infinity
    let max = -Infinity

    shapeA.forEach((point) => {
      const projection = axis.dot(point)
      if (projection < min) {
        min = projection
      }
      if (projection > max) {
        max = projection
      }
    })

    return {
      min: min,
      max: max,
    }
  }

  public getCollisionVector(
    colliderA: Collider,
    colliderB: Collider
  ): Vector2 | null {
    const axes = []
    axes.push(...colliderA.getAxes())
    axes.push(...colliderB.getAxes())

    const points = [colliderA.getPoints(), colliderB.getPoints()]

    let minCollisionVector = {
      vector: new Vector2(),
      magnitude: Infinity,
    }

    for (let i = 0; i < axes.length; i++) {
      const axis = axes[i]

      const projections = [
        this.getAxesProjections(points[0], axis),
        this.getAxesProjections(points[1], axis),
      ]

      const intersection = this.getIntersectionDirection(
        projections[0],
        projections[1]
      )

      if (intersection == null) {
        return null
      }

      if (Math.abs(intersection) < Math.abs(minCollisionVector.magnitude)) {
        minCollisionVector = {
          vector: axis.multiplied(intersection),
          magnitude: intersection,
        }
      }
    }

    return minCollisionVector.vector
  }
}

type Line = {
  min: number
  max: number
}
