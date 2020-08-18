import Vector2 from './math/Vector'
import Scene from './engine/Scene'
import buildScene from './game/MainScene'

const canvas: HTMLCanvasElement = document.createElement('canvas')

const dimensions = new Vector2(window.innerWidth, window.innerHeight)
canvas.width = dimensions.x
canvas.height = (dimensions.y * 2) / 3

const scene = new Scene(canvas)
buildScene(scene)

export default canvas
