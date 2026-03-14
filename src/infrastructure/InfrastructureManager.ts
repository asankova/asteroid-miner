import { StructureEntity, StructureType, BuildState } from './StructureEntity.ts'
import { PowerGrid } from './PowerGrid.ts'
import { RelayNetwork } from './RelayNetwork.ts'
import type { PowerState } from './PowerGrid.ts'

export interface InfrastructureEvent {
  type: 'STRUCTURE_COMPLETE' | 'STRUCTURE_FAILED' | 'POWER_WARNING' | 'POWER_DEFICIT' | 'REPAIR_NEEDED'
  structureId?: number
  structureType?: StructureType
  timestamp: number
}

export class InfrastructureManager {
  readonly structures: Map<number, StructureEntity> = new Map()
  readonly power = new PowerGrid()
  readonly relay = new RelayNetwork()
  private events: InfrastructureEvent[] = []
  private repairScanInterval = 60 // seconds
  private lastRepairScan = 0
  private cpPool = 0

  place(type: StructureType, x: number, y: number): StructureEntity {
    const s = new StructureEntity(type, x, y)
    this.structures.set(s.id, s)
    this.power.register(s)
    this.relay.register(s)
    return s
  }

  // Call this from builder robot on construction task
  advanceConstruction(structureId: number, dt: number): void {
    const s = this.structures.get(structureId)
    if (!s) return
    const completed = s.advanceConstruction(dt)
    if (completed) {
      this.emitEvent({ type: 'STRUCTURE_COMPLETE', structureId: s.id, structureType: s.type, timestamp: performance.now() })
    }
  }

  tick(dt: number): void {
    const dtHours = dt / 3600

    // Health decay for active structures
    for (const s of this.structures.values()) {
      if (s.isActive) {
        const prevHealth = s.health
        s.applyHealthDecay(dtHours)
        if (prevHealth > 0 && s.health <= 0) {
          this.emitEvent({ type: 'STRUCTURE_FAILED', structureId: s.id, structureType: s.type, timestamp: performance.now() })
        }
        if (prevHealth > 0.1 && s.health <= 0.1) {
          this.emitEvent({ type: 'REPAIR_NEEDED', structureId: s.id, structureType: s.type, timestamp: performance.now() })
        }
      }
    }

    // Power tick
    const powerState = this.power.tick()
    if (powerState.isDeficit) {
      this.emitEvent({ type: 'POWER_DEFICIT', timestamp: performance.now() })
    } else if (powerState.isWarning) {
      this.emitEvent({ type: 'POWER_WARNING', timestamp: performance.now() })
    }

    // CP accumulation
    this.cpPool += this.relay.getTotalCPGeneration(Array.from(this.structures.values())) * dt
  }

  getPowerState(): PowerState {
    return this.power.getState()
  }

  drainEvents(): InfrastructureEvent[] {
    const ev = [...this.events]
    this.events = []
    return ev
  }

  private emitEvent(ev: InfrastructureEvent): void {
    this.events.push(ev)
  }

  getStructureRenderData() {
    return Array.from(this.structures.values()).map(s => s.toRenderData())
  }

  get computePoints(): number { return this.cpPool }
  consumeCP(amount: number): boolean {
    if (this.cpPool < amount) return false
    this.cpPool -= amount
    return true
  }
}
