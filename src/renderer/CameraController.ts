import type { Vec2, Rect } from '../types/index.ts'
import { FIELD_SIZE } from '../types/index.ts'

export class CameraController {
  // Camera state: world position at center of viewport
  x = FIELD_SIZE / 2
  y = FIELD_SIZE / 2
  zoom = 0.02 // pixels per world unit; start zoomed out showing full field

  private canvas: HTMLCanvasElement
  private isDragging = false
  private lastMouse: Vec2 = { x: 0, y: 0 }
  private targetX = FIELD_SIZE / 2
  private targetY = FIELD_SIZE / 2
  private targetZoom = 0.02
  private animating = false
  private animStartTime = 0
  private animDuration = 300
  private animFrom = { x: 0, y: 0, zoom: 0.02 }

  readonly MIN_ZOOM = 0.005
  readonly MAX_ZOOM = 8.0

  onChange?: () => void

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.bindEvents()
  }

  get viewMatrix(): Float32Array {
    const w = this.canvas.width
    const h = this.canvas.height
    // Maps world coords → clip space [-1, 1]
    // scale: zoom * 2/w for x, zoom * 2/h for y (flip y)
    const sx = (this.zoom * 2) / w
    const sy = -(this.zoom * 2) / h
    const tx = -this.x * sx
    const ty = -this.y * sy
    // Column-major mat3
    return new Float32Array([
      sx, 0, 0,
      0, sy, 0,
      tx, ty, 1
    ])
  }

  get lodLevel(): number {
    // LOD based on zoom (world units per pixel = 1/zoom)
    const wupp = 1 / this.zoom
    if (wupp > 2000) return 0
    if (wupp > 500) return 1
    if (wupp > 100) return 2
    if (wupp > 20) return 3
    return 4
  }

  getViewport(): Rect {
    const w = this.canvas.width / this.zoom
    const h = this.canvas.height / this.zoom
    return { x: this.x - w / 2, y: this.y - h / 2, w, h }
  }

  screenToWorld(sx: number, sy: number): Vec2 {
    const w = this.canvas.width
    const h = this.canvas.height
    return {
      x: this.x + (sx - w / 2) / this.zoom,
      y: this.y + (sy - h / 2) / this.zoom,
    }
  }

  animateTo(wx: number, wy: number, zoom?: number): void {
    this.animFrom = { x: this.x, y: this.y, zoom: this.zoom }
    this.targetX = wx
    this.targetY = wy
    this.targetZoom = zoom ?? this.zoom
    this.animating = true
    this.animStartTime = performance.now()
  }

  update(now: number): void {
    if (!this.animating) return
    const t = Math.min((now - this.animStartTime) / this.animDuration, 1)
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    this.x = this.animFrom.x + (this.targetX - this.animFrom.x) * ease
    this.y = this.animFrom.y + (this.targetY - this.animFrom.y) * ease
    this.zoom = this.animFrom.zoom + (this.targetZoom - this.animFrom.zoom) * ease
    if (t >= 1) {
      this.x = this.targetX
      this.y = this.targetY
      this.zoom = this.targetZoom
      this.animating = false
    }
    this.onChange?.()
  }

  private clamp(): void {
    const hw = (this.canvas.width / 2) / this.zoom
    const hh = (this.canvas.height / 2) / this.zoom
    this.x = Math.max(hw, Math.min(FIELD_SIZE - hw, this.x))
    this.y = Math.max(hh, Math.min(FIELD_SIZE - hh, this.y))
    this.zoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, this.zoom))
  }

  private bindEvents(): void {
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true
        this.lastMouse = { x: e.clientX, y: e.clientY }
        this.animating = false
      }
    })

    window.addEventListener('mouseup', () => { this.isDragging = false })

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return
      const dx = (e.clientX - this.lastMouse.x) / this.zoom
      const dy = (e.clientY - this.lastMouse.y) / this.zoom
      this.x -= dx
      this.y -= dy
      this.lastMouse = { x: e.clientX, y: e.clientY }
      this.clamp()
      this.onChange?.()
    })

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault()
      const factor = e.deltaY > 0 ? 0.85 : 1 / 0.85
      // Zoom centered on pointer
      const mouseWorld = this.screenToWorld(e.clientX, e.clientY)
      this.zoom *= factor
      this.clamp()
      // Adjust camera to keep point under pointer
      const newMouseWorld = this.screenToWorld(e.clientX, e.clientY)
      this.x += mouseWorld.x - newMouseWorld.x
      this.y += mouseWorld.y - newMouseWorld.y
      this.clamp()
      this.onChange?.()
    }, { passive: false })

    window.addEventListener('keydown', (e) => {
      const speed = 500 / this.zoom
      switch (e.key) {
        case 'w': case 'ArrowUp':    this.y -= speed; this.clamp(); this.onChange?.(); break
        case 's': case 'ArrowDown':  this.y += speed; this.clamp(); this.onChange?.(); break
        case 'a': case 'ArrowLeft':  this.x -= speed; this.clamp(); this.onChange?.(); break
        case 'd': case 'ArrowRight': this.x += speed; this.clamp(); this.onChange?.(); break
        case '+': case '=': this.zoom *= 1.5; this.clamp(); this.onChange?.(); break
        case '-': this.zoom /= 1.5; this.clamp(); this.onChange?.(); break
      }
    })
  }
}
