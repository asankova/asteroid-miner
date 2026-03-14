import type { Vec2, Rect } from '../types/index.ts'
import { FIELD_SIZE } from '../types/index.ts'

export class CameraController {
  // Camera state: world position at center of viewport
  x = FIELD_SIZE / 2
  y = FIELD_SIZE / 2
  zoom = 0.25 // pixels per world unit; start showing ~8000x4500 world units

  private canvas: HTMLCanvasElement
  private isDragging = false
  private lastMouse: Vec2 = { x: 0, y: 0 }
  private targetX = FIELD_SIZE / 2
  private targetY = FIELD_SIZE / 2
  private targetZoom = 0.25
  private animating = false
  private animStartTime = 0
  private animDuration = 400
  private animFrom = { x: 0, y: 0, zoom: 0.25 }

  // Inertia / momentum after drag release
  private velX = 0
  private velY = 0

  // Held keys for continuous movement
  private heldKeys = new Set<string>()

  // dt tracking inside update()
  private lastUpdateTime = 0

  // Mouse event timing for accurate inertia velocity
  private lastMouseTime = 0
  private lastMouseDx = 0
  private lastMouseDy = 0

  // Touch state
  private touches: Map<number, Vec2> = new Map()
  private lastPinchDist = 0

  readonly MIN_ZOOM = 0.02
  readonly MAX_ZOOM = 10.0

  onChange?: () => void

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.canvas.style.cursor = 'grab'
    this.bindEvents()
  }

  get viewMatrix(): Float32Array {
    const w = this.canvas.width
    const h = this.canvas.height
    // Maps world coords → clip space [-1, 1]
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
    this.velX = 0
    this.velY = 0
  }

  update(now: number): void {
    const dt = this.lastUpdateTime > 0 ? Math.min((now - this.lastUpdateTime) / 1000, 0.05) : 0.016
    this.lastUpdateTime = now

    if (this.animating) {
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
      return
    }

    // Continuous key movement (hold to move)
    if (this.heldKeys.size > 0) {
      const speed = 1800 // world units per second at zoom=1; adjusted by zoom
      const s = speed / this.zoom * dt
      if (this.heldKeys.has('w') || this.heldKeys.has('arrowup'))    this.y -= s
      if (this.heldKeys.has('s') || this.heldKeys.has('arrowdown'))  this.y += s
      if (this.heldKeys.has('a') || this.heldKeys.has('arrowleft'))  this.x -= s
      if (this.heldKeys.has('d') || this.heldKeys.has('arrowright')) this.x += s
      this.clamp()
      this.onChange?.()
    }

    // Inertia (momentum) after drag release
    if (!this.isDragging && (this.velX !== 0 || this.velY !== 0)) {
      this.x += this.velX * dt
      this.y += this.velY * dt
      // Decay: smooth glide, ~8% velocity remains after 1 second
      const decay = Math.pow(0.08, dt)
      this.velX *= decay
      this.velY *= decay
      if (Math.abs(this.velX) < 5 && Math.abs(this.velY) < 5) {
        this.velX = 0
        this.velY = 0
      }
      this.clamp()
      this.onChange?.()
    }
  }

  private clamp(): void {
    const hw = (this.canvas.width / 2) / this.zoom
    const hh = (this.canvas.height / 2) / this.zoom
    this.x = Math.max(hw, Math.min(FIELD_SIZE - hw, this.x))
    this.y = Math.max(hh, Math.min(FIELD_SIZE - hh, this.y))
    this.zoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, this.zoom))
  }

  private applyZoom(factor: number, screenX: number, screenY: number): void {
    const mouseWorld = this.screenToWorld(screenX, screenY)
    this.zoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, this.zoom * factor))
    // Adjust camera so the world point under cursor stays fixed
    const newMouseWorld = this.screenToWorld(screenX, screenY)
    this.x += mouseWorld.x - newMouseWorld.x
    this.y += mouseWorld.y - newMouseWorld.y
    this.clamp()
    this.onChange?.()
  }

  private bindEvents(): void {
    // ── Mouse drag with inertia ──────────────────────────────────────────────
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true
        this.lastMouse = { x: e.clientX, y: e.clientY }
        this.lastMouseTime = performance.now()
        this.lastMouseDx = 0
        this.lastMouseDy = 0
        this.animating = false
        this.velX = 0
        this.velY = 0
        this.canvas.style.cursor = 'grabbing'
      }
    })

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        // Use the tracked mouse delta/time for final velocity
        const now = performance.now()
        const dt = Math.max((now - this.lastMouseTime) / 1000, 0.001)
        if (dt < 0.1) {
          // Only apply inertia if mouse was moving recently
          this.velX = (-this.lastMouseDx / this.zoom / dt) * 0.7
          this.velY = (-this.lastMouseDy / this.zoom / dt) * 0.7
          // Cap velocity to prevent crazy flings
          const speed = Math.hypot(this.velX, this.velY)
          const maxSpeed = 8000 / this.zoom
          if (speed > maxSpeed) {
            this.velX = (this.velX / speed) * maxSpeed
            this.velY = (this.velY / speed) * maxSpeed
          }
        }
      }
      this.isDragging = false
      this.canvas.style.cursor = 'grab'
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return
      const now = performance.now()
      const screenDx = e.clientX - this.lastMouse.x
      const screenDy = e.clientY - this.lastMouse.y
      this.x -= screenDx / this.zoom
      this.y -= screenDy / this.zoom
      // Track raw screen deltas and time for release-velocity calculation
      this.lastMouseDx = screenDx
      this.lastMouseDy = screenDy
      this.lastMouseTime = now
      this.lastMouse = { x: e.clientX, y: e.clientY }
      this.clamp()
      this.onChange?.()
    })

    // ── Scroll wheel zoom ────────────────────────────────────────────────────
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault()
      const factor = e.deltaY > 0 ? 0.85 : 1 / 0.85
      this.applyZoom(factor, e.clientX, e.clientY)
    }, { passive: false })

    // ── Double-click to zoom in ──────────────────────────────────────────────
    this.canvas.addEventListener('dblclick', (e) => {
      e.preventDefault()
      const wx = this.screenToWorld(e.clientX * devicePixelRatio, e.clientY * devicePixelRatio).x
      const wy = this.screenToWorld(e.clientX * devicePixelRatio, e.clientY * devicePixelRatio).y
      this.animateTo(wx, wy, Math.min(this.zoom * 2.5, this.MAX_ZOOM))
    })

    // ── Keyboard: track held keys for continuous movement ────────────────────
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase()
      const movementKeys = new Set(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'])
      if (movementKeys.has(k)) {
        e.preventDefault()
        this.heldKeys.add(k)
        this.animating = false
        return
      }
      switch (e.key) {
        case '+': case '=': this.applyZoom(1.5, this.canvas.width / 2, this.canvas.height / 2); break
        case '-': this.applyZoom(1 / 1.5, this.canvas.width / 2, this.canvas.height / 2); break
        case 'Home':
          e.preventDefault()
          this.animateTo(FIELD_SIZE / 2, FIELD_SIZE / 2, 0.25)
          break
      }
    })

    window.addEventListener('keyup', (e) => {
      this.heldKeys.delete(e.key.toLowerCase())
    })

    // ── Touch: single-finger pan + two-finger pinch zoom ─────────────────────
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()
      for (const t of Array.from(e.changedTouches)) {
        this.touches.set(t.identifier, { x: t.clientX, y: t.clientY })
      }
      if (this.touches.size === 2) {
        const pts = Array.from(this.touches.values())
        this.lastPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
      }
      this.animating = false
      this.velX = 0
      this.velY = 0
    }, { passive: false })

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault()
      const prevTouches = new Map(this.touches)
      for (const t of Array.from(e.changedTouches)) {
        this.touches.set(t.identifier, { x: t.clientX, y: t.clientY })
      }
      if (this.touches.size === 1) {
        // Single-finger pan
        const [id] = this.touches.keys()
        const cur = this.touches.get(id)!
        const prev = prevTouches.get(id) ?? cur
        const dx = (cur.x - prev.x) / this.zoom
        const dy = (cur.y - prev.y) / this.zoom
        this.x -= dx
        this.y -= dy
        this.clamp()
        this.onChange?.()
      } else if (this.touches.size === 2) {
        // Two-finger pinch zoom
        const pts = Array.from(this.touches.values())
        const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y)
        if (this.lastPinchDist > 0) {
          const cx = (pts[0].x + pts[1].x) / 2
          const cy = (pts[0].y + pts[1].y) / 2
          this.applyZoom(dist / this.lastPinchDist, cx, cy)
        }
        this.lastPinchDist = dist
      }
    }, { passive: false })

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault()
      for (const t of Array.from(e.changedTouches)) {
        this.touches.delete(t.identifier)
      }
      this.lastPinchDist = 0
    }, { passive: false })
  }
}
