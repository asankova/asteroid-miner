import type { StructureEntity } from './StructureEntity.ts'

export interface PowerState {
  totalGeneration: number
  totalConsumption: number
  deficit: number        // positive = shortage
  utilizationRatio: number  // consumption / generation
  isWarning: boolean     // < 20% safety margin
  isDeficit: boolean
}

export class PowerGrid {
  private structures: StructureEntity[] = []

  register(structure: StructureEntity): void {
    this.structures.push(structure)
  }

  unregister(id: number): void {
    this.structures = this.structures.filter(s => s.id !== id)
  }

  tick(): PowerState {
    let gen = 0
    let cons = 0

    for (const s of this.structures) {
      if (!s.isActive) continue
      gen += s.effectivePowerGeneration
      cons += s.effectivePowerConsumption
    }

    const deficit = Math.max(0, cons - gen)
    const utilizationRatio = gen > 0 ? cons / gen : (cons > 0 ? Infinity : 0)
    const isWarning = gen > 0 && utilizationRatio > 0.8
    const isDeficit = deficit > 0

    // Throttle non-essential structures on deficit
    if (isDeficit) {
      for (const s of this.structures) {
        if (s.profile.powerPriority === 'NON_ESSENTIAL' && s.isActive) {
          // Mark throttled (visual indicator, not full shutdown in v1)
        }
      }
    }

    return { totalGeneration: gen, totalConsumption: cons, deficit, utilizationRatio, isWarning, isDeficit }
  }

  getState(): PowerState {
    return this.tick()
  }
}
