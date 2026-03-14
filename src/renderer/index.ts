import { CameraController } from './CameraController.ts'
import { LODManager } from './LODManager.ts'
import { ParticleSystem } from './ParticleSystem.ts'
import { InstanceRenderer } from './InstanceRenderer.ts'
import { WorldRenderer } from './WorldRenderer.ts'
import { SpatialHash } from './SpatialHash.ts'
import type { AsteroidData, RobotData } from '../types/index.ts'
import { FIELD_SIZE } from '../types/index.ts'

export { CameraController, LODManager, SpatialHash }
export { Minimap } from './Minimap.ts'

export interface RendererState {
  asteroids: AsteroidData[]
  robots: RobotData[]
}

export class Renderer {
  readonly gl: WebGL2RenderingContext
  readonly camera: CameraController
  readonly lod: LODManager
  readonly spatialHash: SpatialHash<AsteroidData>

  private particles: ParticleSystem
  private instanceRenderer: InstanceRenderer
  private worldRenderer: WorldRenderer
  private lastTime = 0
  private frameCount = 0
  private fps = 0
  private fpsTimer = 0
  private debugEl: HTMLElement | null

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    })
    if (!gl) {
      const errEl = document.getElementById('webgl-error')
      if (errEl) errEl.style.display = 'flex'
      throw new Error('WebGL2 not supported')
    }
    this.gl = gl

    this.camera = new CameraController(canvas)
    this.lod = new LODManager()
    this.spatialHash = new SpatialHash<AsteroidData>(200)

    this.particles = new ParticleSystem(gl)
    this.instanceRenderer = new InstanceRenderer(gl)
    this.worldRenderer = new WorldRenderer(gl)

    this.debugEl = document.getElementById('debug-overlay')

    this.handleResize(canvas)
    window.addEventListener('resize', () => this.handleResize(canvas))

    // F3 toggles debug overlay
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F3') {
        e.preventDefault()
        if (this.debugEl) {
          this.debugEl.style.display = this.debugEl.style.display === 'none' ? '' : 'none'
        }
      }
    })
  }

  private handleResize(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth * devicePixelRatio
    canvas.height = window.innerHeight * devicePixelRatio
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    this.gl.viewport(0, 0, canvas.width, canvas.height)
  }

  loadField(asteroids: AsteroidData[]): void {
    this.spatialHash.clear()
    for (const a of asteroids) {
      this.spatialHash.insert(a)
    }
  }

  render(state: RendererState, now: number): void {
    const gl = this.gl
    const dt = this.lastTime ? (now - this.lastTime) / 1000 : 0.016
    this.lastTime = now

    this.lod.update(this.camera.zoom, now)
    this.camera.update(now)

    // FPS tracking
    this.frameCount++
    this.fpsTimer += dt
    if (this.fpsTimer >= 1) {
      this.fps = Math.round(this.frameCount / this.fpsTimer)
      this.frameCount = 0
      this.fpsTimer = 0
      this.updateDebug(state)
    }

    // Clear to deep space black
    gl.clearColor(0.01, 0.01, 0.03, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const vm = this.camera.viewMatrix
    const viewport = this.camera.getViewport()

    // Layer 1: World (asteroids as point sprites)
    this.worldRenderer.updateFromField(state.asteroids, this.spatialHash, viewport)
    this.worldRenderer.render(vm, this.lod.alpha)

    // Layer 2: Entities (robots, instanced)
    this.instanceRenderer.clear()
    for (const robot of state.robots) {
      this.instanceRenderer.addRobot(robot)
    }
    this.instanceRenderer.render(vm, this.lod.level, this.camera.zoom)

    // Layer 3: Decorative GPU particles
    this.particles.update(dt, FIELD_SIZE)
    this.particles.render(vm, this.lod.level)
  }

  private updateDebug(state: RendererState): void {
    if (!this.debugEl) return
    const wupp = (1 / this.camera.zoom).toFixed(0)
    this.debugEl.textContent =
      `FPS: ${this.fps}  |  LOD: L${this.lod.level}  |  zoom: ${this.camera.zoom.toFixed(4)}\n` +
      `wu/px: ${wupp}  |  asteroids: ${state.asteroids.length}  |  robots: ${state.robots.length}\n` +
      `cam: (${this.camera.x.toFixed(0)}, ${this.camera.y.toFixed(0)})  |  F3: toggle`
  }
}
