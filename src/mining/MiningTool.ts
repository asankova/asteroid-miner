export enum MiningToolType {
  PERCUSSIVE_DRILL = 'PERCUSSIVE_DRILL',
  THERMAL_LANCE = 'THERMAL_LANCE',
  EXPLOSIVE_CHARGE = 'EXPLOSIVE_CHARGE',
  PRECISION_LASER = 'PRECISION_LASER',
}

export interface ToolProfile {
  type: MiningToolType
  displayName: string
  speed: number         // task duration multiplier (higher = slower)
  efficiency: number    // yield multiplier [0..1]
  damageMean: number    // mean structural integrity damage per task
  damageSd: number      // gaussian std dev
  precision: number     // ore grade modifier [0..1]
  energyCost: number
  compatibleTypes: string[]
  canSurvey: boolean    // can reveal X-type asteroids
}

export const TOOL_PROFILES: Record<MiningToolType, ToolProfile> = {
  [MiningToolType.PERCUSSIVE_DRILL]: {
    type: MiningToolType.PERCUSSIVE_DRILL,
    displayName: 'Percussive Drill',
    speed: 1.0, efficiency: 0.70, damageMean: 0.08, damageSd: 0.03,
    precision: 0.4, energyCost: 5,
    compatibleTypes: ['C', 'S', 'D'], canSurvey: false,
  },
  [MiningToolType.THERMAL_LANCE]: {
    type: MiningToolType.THERMAL_LANCE,
    displayName: 'Thermal Lance',
    speed: 0.8, efficiency: 0.85, damageMean: 0.05, damageSd: 0.02,
    precision: 0.6, energyCost: 8,
    compatibleTypes: ['M', 'A', 'H'], canSurvey: false,
  },
  [MiningToolType.EXPLOSIVE_CHARGE]: {
    type: MiningToolType.EXPLOSIVE_CHARGE,
    displayName: 'Explosive Charge',
    speed: 0.3, efficiency: 0.50, damageMean: 0.35, damageSd: 0.15,
    precision: 0.1, energyCost: 15,
    compatibleTypes: ['V', 'C', 'S', 'D', 'M', 'H', 'A'], canSurvey: false,
  },
  [MiningToolType.PRECISION_LASER]: {
    type: MiningToolType.PRECISION_LASER,
    displayName: 'Precision Laser',
    speed: 2.0, efficiency: 0.95, damageMean: 0.02, damageSd: 0.005,
    precision: 1.0, energyCost: 12,
    compatibleTypes: ['X', 'M', 'V', 'A'], canSurvey: true,
  },
}
