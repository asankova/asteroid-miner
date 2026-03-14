import type { HUDSnapshot } from './types.ts'

const RESOURCE_LABELS: Record<number, string> = {
  0: 'Iron',
  1: 'Nickel',
  2: 'Platinum',
  3: 'Water Ice',
  4: 'Silicates',
  5: 'Xenomineral',
}

const RESOURCE_COLORS: Record<number, string> = {
  0: '#b0b0b0', // iron — steel gray
  1: '#a0c8a0', // nickel — pale green
  2: '#ffe080', // platinum — gold
  3: '#80c8ff', // water ice — light blue
  4: '#c8a080', // silicates — sand
  5: '#c080ff', // xenomineral — purple
}

/**
 * ResourcePanel — shows total mined resources across all robot cargo.
 * Renders into a provided container element.
 */
export class ResourcePanel {
  private readonly el: HTMLElement

  constructor(container: HTMLElement) {
    this.el = document.createElement('div')
    this.el.className = 'hud-panel hud-resources'
    this.el.innerHTML = '<div class="hud-panel-title">RESOURCES</div><div class="hud-resource-rows"></div>'
    container.appendChild(this.el)
  }

  update(snapshot: HUDSnapshot): void {
    const rows = this.el.querySelector('.hud-resource-rows') as HTMLElement
    if (!rows) return

    const parts: string[] = []
    for (let r = 0; r < 6; r++) {
      const amount = snapshot.resources.get(r) ?? 0
      if (amount === 0) continue
      const label = RESOURCE_LABELS[r] ?? `R${r}`
      const color = RESOURCE_COLORS[r] ?? '#fff'
      parts.push(
        `<div class="hud-resource-row">` +
        `<span class="hud-res-dot" style="background:${color}"></span>` +
        `<span class="hud-res-label">${label}</span>` +
        `<span class="hud-res-amount">${Math.floor(amount).toLocaleString()}</span>` +
        `</div>`,
      )
    }
    rows.innerHTML = parts.length > 0 ? parts.join('') : '<div class="hud-empty">No resources mined</div>'
  }
}
