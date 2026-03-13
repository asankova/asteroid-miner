import type { ToolProfile } from './MiningTool.ts'

export interface IntegrityEvent {
  type: 'CRACK' | 'FRAGMENT'
  asteroidId: number
  newIntegrity: number
}

export class StructuralIntegritySystem {
  applyDamage(
    asteroidId: number,
    currentIntegrity: number,
    tool: ToolProfile
  ): { newIntegrity: number; events: IntegrityEvent[] } {
    // Box-Muller gaussian sample
    const u1 = Math.random() || 1e-10
    const u2 = Math.random()
    const gauss = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
    const damage = Math.max(0, tool.damageMean + gauss * tool.damageSd)

    const prev = currentIntegrity
    const newIntegrity = Math.max(0, prev - damage)
    const events: IntegrityEvent[] = []

    if (prev > 0.3 && newIntegrity <= 0.3) {
      events.push({ type: 'CRACK', asteroidId, newIntegrity })
    }
    if (prev > 0 && newIntegrity <= 0) {
      events.push({ type: 'FRAGMENT', asteroidId, newIntegrity: 0 })
    }

    return { newIntegrity, events }
  }
}
