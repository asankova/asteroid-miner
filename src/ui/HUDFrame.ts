import { ResourcePanel } from './ResourcePanel.ts'
import { FleetPanel } from './FleetPanel.ts'
import { SelectedPanel } from './SelectedPanel.ts'
import { MinimapPanel } from './MinimapPanel.ts'
import type { HUDSnapshot } from './types.ts'

const HUD_STYLES = `
.hud-root {
  position: fixed; inset: 0;
  pointer-events: none;
  z-index: 15;
  font: 11px/1.5 'Courier New', monospace;
  color: #a8c8a8;
  user-select: none;
}
.hud-panel {
  background: rgba(0,12,8,0.78);
  border: 1px solid #204030;
  border-radius: 3px;
  padding: 6px 8px;
  position: absolute;
}
.hud-panel-title {
  font-size: 9px;
  letter-spacing: 0.12em;
  color: #40806080;
  color: #408060;
  margin-bottom: 4px;
  text-transform: uppercase;
}
/* Resources — top left */
.hud-resources { top: 8px; left: 8px; min-width: 160px; }
.hud-resource-row {
  display: flex; align-items: center; gap: 5px;
  margin: 1px 0;
}
.hud-res-dot {
  width: 7px; height: 7px;
  border-radius: 50%; flex-shrink: 0;
}
.hud-res-label { flex: 1; }
.hud-res-amount { text-align: right; color: #e0e0c0; font-size: 10px; }
.hud-empty { color: #406040; font-size: 10px; }

/* Fleet — top right (left of debug overlay) */
.hud-fleet { top: 8px; right: 110px; min-width: 200px; }
.hud-robot-row {
  display: flex; align-items: center; gap: 4px;
  margin: 1px 0; font-size: 10px;
}
.hud-robot-id   { color: #607060; width: 22px; }
.hud-robot-type { flex: 1; }
.hud-robot-state { width: 32px; font-size: 9px; text-align: center; }
.hud-robot-energy {
  width: 44px; height: 5px;
  background: #1a2a1a;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.hud-energy-bar {
  position: absolute; top: 0; left: 0; height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}
.hud-robot-cargo { width: 30px; text-align: right; color: #60c080; font-size: 9px; }

/* Selected entity — mid left */
.hud-selected {
  top: 50%; transform: translateY(-50%);
  left: 8px; min-width: 150px;
  display: none;
}
.hud-sel-row {
  display: flex; justify-content: space-between; gap: 8px;
  margin: 2px 0; font-size: 10px;
}
.hud-sel-k { color: #607060; }
.hud-sel-v { color: #d0e8d0; }

/* Minimap — bottom right */
.hud-minimap { bottom: 8px; right: 8px; padding: 5px 6px; }

/* FPS — top right corner */
.hud-fps {
  top: 8px; right: 8px;
  font-size: 10px; color: #008040;
  background: rgba(0,10,5,0.7);
  border: 1px solid #103020;
  border-radius: 3px;
  padding: 3px 7px;
}
`

/**
 * HUDFrame — top-level HUD manager.
 * Creates all panels, injects CSS, exposes a single update() method.
 * Designed to update at ~4 Hz (call from game loop with rate-limiting).
 */
export class HUDFrame {
  private readonly root: HTMLElement
  private readonly fpsEl: HTMLElement
  private readonly resources: ResourcePanel
  private readonly fleet: FleetPanel
  private readonly selected: SelectedPanel
  private readonly minimap: MinimapPanel

  constructor(mountPoint: HTMLElement) {
    // Inject styles once
    if (!document.getElementById('hud-styles')) {
      const style = document.createElement('style')
      style.id = 'hud-styles'
      style.textContent = HUD_STYLES
      document.head.appendChild(style)
    }

    this.root = document.createElement('div')
    this.root.className = 'hud-root'
    mountPoint.appendChild(this.root)

    this.fpsEl = document.createElement('div')
    this.fpsEl.className = 'hud-panel hud-fps'
    this.root.appendChild(this.fpsEl)

    this.resources = new ResourcePanel(this.root)
    this.fleet = new FleetPanel(this.root)
    this.selected = new SelectedPanel(this.root)
    this.minimap = new MinimapPanel(this.root)
  }

  update(snapshot: HUDSnapshot): void {
    this.fpsEl.textContent = `${Math.round(snapshot.fps)} FPS`
    this.resources.update(snapshot)
    this.fleet.update(snapshot)
    this.selected.update(snapshot)
    this.minimap.update(snapshot)
  }
}
