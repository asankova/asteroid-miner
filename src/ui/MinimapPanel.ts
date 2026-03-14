import { FIELD_SIZE } from '../types/index.ts'
import type { HUDSnapshot } from './types.ts'

const MINIMAP_SIZE = 160 // px

/**
 * MinimapPanel — canvas-based minimap showing asteroid field and robot positions.
 * Renders into a bottom-right positioned panel.
 */
export class MinimapPanel {
  private readonly el: HTMLElement
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D

  constructor(container: HTMLElement) {
    this.el = document.createElement('div')
    this.el.className = 'hud-panel hud-minimap'

    const title = document.createElement('div')
    title.className = 'hud-panel-title'
    title.textContent = 'FIELD MAP'

    this.canvas = document.createElement('canvas')
    this.canvas.width = MINIMAP_SIZE
    this.canvas.height = MINIMAP_SIZE
    this.canvas.style.cssText = `display:block;width:${MINIMAP_SIZE}px;height:${MINIMAP_SIZE}px;`

    this.ctx = this.canvas.getContext('2d')!
    this.el.appendChild(title)
    this.el.appendChild(this.canvas)
    container.appendChild(this.el)
  }

  update(snapshot: HUDSnapshot): void {
    const c = this.ctx
    c.clearRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE)

    // Background
    c.fillStyle = 'rgba(0,8,20,0.9)'
    c.fillRect(0, 0, MINIMAP_SIZE, MINIMAP_SIZE)

    const scale = MINIMAP_SIZE / FIELD_SIZE

    // Draw asteroids as tiny dots colored by type
    for (const a of snapshot.asteroids) {
      const mx = a.x * scale
      const my = a.y * scale
      c.fillStyle = this.asteroidColor(a.type)
      const r = Math.max(0.5, a.radius * scale * 0.4)
      c.beginPath()
      c.arc(mx, my, r, 0, Math.PI * 2)
      c.fill()
    }

    // Draw robots as bright dots
    for (const robot of snapshot.robots) {
      const mx = robot.x * scale
      const my = robot.y * scale
      c.fillStyle = '#00ffaa'
      c.fillRect(mx - 1.5, my - 1.5, 3, 3)
    }

    // Border
    c.strokeStyle = '#204030'
    c.lineWidth = 1
    c.strokeRect(0.5, 0.5, MINIMAP_SIZE - 1, MINIMAP_SIZE - 1)
  }

  private asteroidColor(type: string): string {
    switch (type) {
      case 'M': return '#b0b0b0'
      case 'S': return '#a09060'
      case 'C': return '#606060'
      case 'V': return '#8080a0'
      case 'H': return '#6080c0'
      case 'X': return '#c060c0'
      case 'A': return '#a06040'
      default:  return '#505050'
    }
  }
}
