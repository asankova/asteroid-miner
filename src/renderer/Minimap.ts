import type { AsteroidData, RobotData } from '../types/index.ts'
import { AsteroidType, RobotType, FIELD_SIZE } from '../types/index.ts'
import type { CameraController } from './CameraController.ts'

const MAP_SIZE = 180   // pixels (CSS)
const PADDING = 12     // from bottom-right

// Colors matching the world shader
const ASTEROID_COLORS: Record<AsteroidType, string> = {
  [AsteroidType.C]: '#3a3632',
  [AsteroidType.S]: '#806040',
  [AsteroidType.M]: '#a6b8cc',
  [AsteroidType.V]: '#4a855a',
  [AsteroidType.D]: '#994040',
  [AsteroidType.H]: '#80b0eb',
  [AsteroidType.A]: '#cc8425',
  [AsteroidType.X]: '#6630a0',
  [AsteroidType.UNKNOWN]: '#6630a0',
}

const ROBOT_COLORS: Record<RobotType, string> = {
  [RobotType.SCOUT]:      '#30e8ff',
  [RobotType.MINER]:      '#ff8c1a',
  [RobotType.HAULER]:     '#ffe633',
  [RobotType.BUILDER]:    '#33ff5a',
  [RobotType.FABRICATOR]: '#cc44ff',
  [RobotType.SENTINEL]:   '#ff3333',
}

export class Minimap {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private camera: CameraController
  // Pre-built asteroid image for fast redraws
  private asteroidCache: ImageData | null = null
  private asteroidsDirty = true

  constructor(camera: CameraController) {
    this.camera = camera

    this.canvas = document.createElement('canvas')
    const dpr = devicePixelRatio
    this.canvas.width  = MAP_SIZE * dpr
    this.canvas.height = MAP_SIZE * dpr
    Object.assign(this.canvas.style, {
      position:     'fixed',
      bottom:       `${PADDING}px`,
      right:        `${PADDING}px`,
      width:        `${MAP_SIZE}px`,
      height:       `${MAP_SIZE}px`,
      border:       '1px solid rgba(100,160,255,0.35)',
      borderRadius: '4px',
      background:   'rgba(0,0,4,0.75)',
      cursor:       'crosshair',
      zIndex:       '15',
    })
    document.body.appendChild(this.canvas)

    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Minimap 2D context unavailable')
    this.ctx = ctx
    this.ctx.scale(dpr, dpr)

    // Click minimap to jump camera there
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect()
      const fx = (e.clientX - rect.left) / MAP_SIZE  // 0..1
      const fy = (e.clientY - rect.top)  / MAP_SIZE
      const wx = fx * FIELD_SIZE
      const wy = fy * FIELD_SIZE
      this.camera.animateTo(wx, wy)
    })
  }

  /** Call once after asteroids are loaded to pre-render the static map. */
  buildAsteroidCache(asteroids: AsteroidData[]): void {
    const tmp = document.createElement('canvas')
    const dpr = devicePixelRatio
    tmp.width  = MAP_SIZE * dpr
    tmp.height = MAP_SIZE * dpr
    const ctx = tmp.getContext('2d')!
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE)
    for (const a of asteroids) {
      const mx = (a.x / FIELD_SIZE) * MAP_SIZE
      const my = (a.y / FIELD_SIZE) * MAP_SIZE
      const mr = Math.max(0.5, (a.radius / FIELD_SIZE) * MAP_SIZE * 1.2)
      ctx.fillStyle = ASTEROID_COLORS[a.visualType] ?? '#555'
      ctx.beginPath()
      ctx.arc(mx, my, mr, 0, Math.PI * 2)
      ctx.fill()
    }
    this.asteroidCache = ctx.getImageData(0, 0, tmp.width, tmp.height)
    this.asteroidsDirty = false
  }

  render(robots: RobotData[]): void {
    const ctx = this.ctx
    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE)

    // Draw cached asteroid layer
    if (this.asteroidCache) {
      // Use a temp canvas to composite at native resolution
      ctx.save()
      ctx.scale(1 / devicePixelRatio, 1 / devicePixelRatio)
      const tmp = document.createElement('canvas')
      tmp.width  = this.asteroidCache.width
      tmp.height = this.asteroidCache.height
      const tc = tmp.getContext('2d')!
      tc.putImageData(this.asteroidCache, 0, 0)
      ctx.drawImage(tmp, 0, 0, MAP_SIZE, MAP_SIZE)
      ctx.restore()
    }

    // Draw robots as bright colored dots
    for (const r of robots) {
      const mx = (r.x / FIELD_SIZE) * MAP_SIZE
      const my = (r.y / FIELD_SIZE) * MAP_SIZE
      const color = ROBOT_COLORS[r.type] ?? '#fff'
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 4
      ctx.beginPath()
      ctx.arc(mx, my, 2.5, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.shadowBlur = 0

    // Draw camera viewport rectangle
    const cam = this.camera
    const vp = cam.getViewport()
    const vx = (vp.x / FIELD_SIZE) * MAP_SIZE
    const vy = (vp.y / FIELD_SIZE) * MAP_SIZE
    const vw = (vp.w / FIELD_SIZE) * MAP_SIZE
    const vh = (vp.h / FIELD_SIZE) * MAP_SIZE

    ctx.strokeStyle = 'rgba(100,220,255,0.7)'
    ctx.lineWidth = 1
    ctx.strokeRect(
      Math.max(0, vx),
      Math.max(0, vy),
      Math.min(MAP_SIZE - Math.max(0, vx), vw),
      Math.min(MAP_SIZE - Math.max(0, vy), vh),
    )

    // Label
    ctx.fillStyle = 'rgba(140,180,255,0.6)'
    ctx.font = '9px monospace'
    ctx.fillText('MAP', 4, 11)
  }
}
