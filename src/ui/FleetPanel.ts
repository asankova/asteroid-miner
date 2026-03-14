import { RobotState } from '../types/index.ts'
import type { HUDSnapshot, HUDRobotEntry } from './types.ts'

const STATE_LABEL: Record<RobotState, string> = {
  [RobotState.IDLE]:    'IDLE',
  [RobotState.MOVING]:  'MOV',
  [RobotState.MINING]:  'MINE',
  [RobotState.HAULING]: 'HAUL',
}

const STATE_COLOR: Record<RobotState, string> = {
  [RobotState.IDLE]:    '#607060',
  [RobotState.MOVING]:  '#80a0c0',
  [RobotState.MINING]:  '#e0a040',
  [RobotState.HAULING]: '#60c080',
}

/**
 * FleetPanel — shows each robot with type, state, energy bar, and cargo.
 */
export class FleetPanel {
  private readonly el: HTMLElement

  constructor(container: HTMLElement) {
    this.el = document.createElement('div')
    this.el.className = 'hud-panel hud-fleet'
    this.el.innerHTML = '<div class="hud-panel-title">FLEET</div><div class="hud-fleet-rows"></div>'
    container.appendChild(this.el)
  }

  update(snapshot: HUDSnapshot): void {
    const rows = this.el.querySelector('.hud-fleet-rows') as HTMLElement
    if (!rows) return

    rows.innerHTML = snapshot.robots.map(r => this.renderRobot(r)).join('')
  }

  private renderRobot(r: HUDRobotEntry): string {
    const stateLbl = STATE_LABEL[r.state] ?? r.state
    const stateColor = STATE_COLOR[r.state] ?? '#888'
    const energyPct = Math.round(r.energy)
    const energyColor = r.energy > 50 ? '#50c080' : r.energy > 20 ? '#e0a040' : '#e05040'
    return (
      `<div class="hud-robot-row">` +
      `<span class="hud-robot-id">#${r.id}</span>` +
      `<span class="hud-robot-type">${r.type}</span>` +
      `<span class="hud-robot-state" style="color:${stateColor}">${stateLbl}</span>` +
      `<span class="hud-robot-energy">` +
        `<span class="hud-energy-bar" style="width:${energyPct}%;background:${energyColor}"></span>` +
      `</span>` +
      `<span class="hud-robot-cargo">${r.cargoTotal > 0 ? `${Math.floor(r.cargoTotal)}t` : ''}</span>` +
      `</div>`
    )
  }
}
