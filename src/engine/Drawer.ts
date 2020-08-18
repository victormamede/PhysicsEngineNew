import Vector2 from '../math/Vector'

export default class Drawer {
  private ctx: CanvasRenderingContext2D

  constructor(private canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    if (context == null) {
      throw new Error('Could not get canvas rendering context')
    }
    this.ctx = context
  }

  public setStrokeStyle(
    color: [number, number, number],
    alpha: number = 1,
    lineWidth: number = 1
  ) {
    this.ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
    this.ctx.lineWidth = lineWidth
  }
  public setFillColor(color: [number, number, number], alpha: number = 1) {
    this.ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
  }

  public drawLine(pointA: Vector2, pointB: Vector2) {
    this.ctx.beginPath()
    this.ctx.moveTo(pointA.x, pointA.y)
    this.ctx.lineTo(pointB.x, pointB.y)
    this.ctx.stroke()
  }

  public fillRect(position: Vector2, dimensions: Vector2) {
    this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y)
  }

  public drawShape(points: Vector2[]) {
    this.ctx.beginPath()
    this.ctx.moveTo(points[0].x, points[0].y)
    points.forEach((point) => {
      this.ctx.lineTo(point.x, point.y)
    })
    this.ctx.closePath()
    this.ctx.stroke()
  }
}
