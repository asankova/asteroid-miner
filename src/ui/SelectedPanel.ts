import type { AsteroidData } from '../types/index.ts'
import type { HUDSnapshot, HUDRobotEntry } from './types.ts'

/**
 * SelectedPanel — shows details of the currently selected asteroid or robot.
 * Hidden when nothing is selected.
 */
export class SelectedPanel {
  private readonly el: HTMLElement

  constructor(container: HTMLElement) {
    this.el = document.createElement('div')
    this.el.className = 'hud-panel hud-selected'
    container.appendChild(this.el)
  }

  update(snapshot: HUDSnapshot): void {
    if (snapshot.selectedRobotId !== null) {
      const robot = snapshot.robots.find(r => r.id === snapshot.selectedRobotId)
      if (robot) { this.renderRobot(robot); return }
    }
    if (snapshot.selectedAsteroidId !== null) {
      const asteroid = snapshot.asteroids.find(a => a.id === snapshot.selectedAsteroidId)
      if (asteroid) { this.renderAsteroid(asteroid); return }
    }
    this.el.innerHTML = ''
    this.el.style.display = 'none'
  }

  private renderRobot(r: HUDRobotEntry): void {
    this.el.style.display = 'block'
    const cargoLines = r.cargoTotal > 0
      ? `<div class="hud-sel-row"><span class="hud-sel-k">Cargo</span><span class="hud-sel-v">${Math.floor(r.cargoTotal)}t</span></div>`
      : ''
    this.el.innerHTML =
      `<div class="hud-panel-title">ROBOT #${r.id}</div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">Type</span><span class="hud-sel-v">${r.type}</span></div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">State</span><span class="hud-sel-v">${r.state}</span></div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">Energy</span><span class="hud-sel-v">${Math.round(r.energy)}%</span></div>` +
      cargoLines
  }

  private renderAsteroid(a: AsteroidData): void {
    this.el.style.display = 'block'
    const si = Math.round(a.structuralIntegrity * 100)
    this.el.innerHTML =
      `<div class="hud-panel-title">ASTEROID #${a.id}</div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">Type</span><span class="hud-sel-v">${a.type}</span></div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">Biome</span><span class="hud-sel-v">${a.biome.replace('_', ' ')}</span></div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">Radius</span><span class="hud-sel-v">${Math.round(a.radius)}</span></div>` +
      `<div class="hud-sel-row"><span class="hud-sel-k">Integrity</span><span class="hud-sel-v">${si}%</span></div>`
  }
}
