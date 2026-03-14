export enum StructureType {
  COMMAND_HUB = 'COMMAND_HUB',
  SOLAR_ARRAY = 'SOLAR_ARRAY',
  FUSION_REACTOR = 'FUSION_REACTOR',
  STORAGE_DEPOT = 'STORAGE_DEPOT',
  RELAY_BEACON = 'RELAY_BEACON',
  SCIENCE_LAB = 'SCIENCE_LAB',
  REPAIR_BAY = 'REPAIR_BAY',
  LAUNCH_RAIL = 'LAUNCH_RAIL',
}

export enum BuildState {
  SITE = 'SITE',         // foundation placed, awaiting assembly
  ASSEMBLING = 'ASSEMBLING',
  ACTIVATING = 'ACTIVATING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
}

export interface StructureProfile {
  type: StructureType
  displayName: string
  powerGeneration: number   // kW generated (0 for consumers)
  powerConsumption: number  // kW consumed
  powerPriority: 'CRITICAL' | 'PRODUCTION' | 'NON_ESSENTIAL'
  healthDecayPerHour: number // fraction [0..1]
  coverageRadius: number    // relay radius (0 for non-beacons)
  cpGeneration: number      // Compute Points/s (Science Labs + Relay T2+)
  tier: number              // current upgrade tier [1..3]
}

export const STRUCTURE_PROFILES: Record<StructureType, StructureProfile> = {
  [StructureType.COMMAND_HUB]: {
    type: StructureType.COMMAND_HUB, displayName: 'Command Hub',
    powerGeneration: 0, powerConsumption: 20, powerPriority: 'CRITICAL',
    healthDecayPerHour: 0.005, coverageRadius: 0, cpGeneration: 0, tier: 1,
  },
  [StructureType.SOLAR_ARRAY]: {
    type: StructureType.SOLAR_ARRAY, displayName: 'Solar Array',
    powerGeneration: 50, powerConsumption: 0, powerPriority: 'CRITICAL',
    healthDecayPerHour: 0.002, coverageRadius: 0, cpGeneration: 0, tier: 1,
  },
  [StructureType.FUSION_REACTOR]: {
    type: StructureType.FUSION_REACTOR, displayName: 'Fusion Reactor',
    powerGeneration: 200, powerConsumption: 5, powerPriority: 'CRITICAL',
    healthDecayPerHour: 0.008, coverageRadius: 0, cpGeneration: 0, tier: 1,
  },
  [StructureType.STORAGE_DEPOT]: {
    type: StructureType.STORAGE_DEPOT, displayName: 'Storage Depot',
    powerGeneration: 0, powerConsumption: 5, powerPriority: 'NON_ESSENTIAL',
    healthDecayPerHour: 0.001, coverageRadius: 0, cpGeneration: 0, tier: 1,
  },
  [StructureType.RELAY_BEACON]: {
    type: StructureType.RELAY_BEACON, displayName: 'Relay Beacon',
    powerGeneration: 0, powerConsumption: 10, powerPriority: 'PRODUCTION',
    healthDecayPerHour: 0.003, coverageRadius: 800, cpGeneration: 2, tier: 1,
  },
  [StructureType.SCIENCE_LAB]: {
    type: StructureType.SCIENCE_LAB, displayName: 'Science Lab',
    powerGeneration: 0, powerConsumption: 30, powerPriority: 'PRODUCTION',
    healthDecayPerHour: 0.004, coverageRadius: 0, cpGeneration: 10, tier: 1,
  },
  [StructureType.REPAIR_BAY]: {
    type: StructureType.REPAIR_BAY, displayName: 'Repair Bay',
    powerGeneration: 0, powerConsumption: 15, powerPriority: 'PRODUCTION',
    healthDecayPerHour: 0.003, coverageRadius: 0, cpGeneration: 0, tier: 1,
  },
  [StructureType.LAUNCH_RAIL]: {
    type: StructureType.LAUNCH_RAIL, displayName: 'Launch Rail',
    powerGeneration: 0, powerConsumption: 40, powerPriority: 'NON_ESSENTIAL',
    healthDecayPerHour: 0.006, coverageRadius: 0, cpGeneration: 0, tier: 1,
  },
}

let _structureId = 1

export class StructureEntity {
  readonly id: number
  readonly type: StructureType
  x: number
  y: number
  health = 1.0         // [0..1]
  buildState = BuildState.SITE
  tier = 1
  assemblyProgress = 0 // [0..1]
  lastRepairScan = 0   // timestamp

  constructor(type: StructureType, x: number, y: number) {
    this.id = _structureId++
    this.type = type
    this.x = x
    this.y = y
  }

  get profile(): StructureProfile {
    return STRUCTURE_PROFILES[this.type]
  }

  get isActive(): boolean {
    return this.buildState === BuildState.ACTIVE && this.health > 0
  }

  get efficiencyMultiplier(): number {
    if (!this.isActive) return 0
    if (this.health >= 0.5) return 1.0
    // Linear degradation below 50% health
    return this.health / 0.5
  }

  get effectivePowerGeneration(): number {
    return this.profile.powerGeneration * this.efficiencyMultiplier
  }

  get effectivePowerConsumption(): number {
    return this.isActive ? this.profile.powerConsumption : 0
  }

  // Called by builder robot to advance construction
  advanceConstruction(dt: number): boolean {
    if (this.buildState === BuildState.SITE) {
      this.buildState = BuildState.ASSEMBLING
      this.assemblyProgress = 0
    }
    if (this.buildState === BuildState.ASSEMBLING) {
      this.assemblyProgress += dt / 30 // 30s assembly time
      if (this.assemblyProgress >= 1) {
        this.buildState = BuildState.ACTIVATING
        return false
      }
      return false
    }
    if (this.buildState === BuildState.ACTIVATING) {
      this.buildState = BuildState.ACTIVE
      return true // construction complete
    }
    return false
  }

  applyHealthDecay(dtHours: number): void {
    const rate = this.profile.healthDecayPerHour
    this.health = Math.max(0, this.health - rate * dtHours)
    if (this.health <= 0 && this.buildState === BuildState.ACTIVE) {
      this.buildState = BuildState.FAILED
    }
  }

  repair(amount = 0.3): void {
    this.health = Math.min(1.0, this.health + amount)
    if (this.buildState === BuildState.FAILED && this.health > 0) {
      this.buildState = BuildState.ACTIVE
    }
  }

  toRenderData(): { id: number; type: StructureType; x: number; y: number; health: number; buildState: BuildState; tier: number } {
    return { id: this.id, type: this.type, x: this.x, y: this.y, health: this.health, buildState: this.buildState, tier: this.tier }
  }
}
