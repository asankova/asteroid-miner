import type { RobotType, RobotState, AsteroidData } from '../types/index.ts'

export interface HUDRobotEntry {
  id: number
  type: RobotType
  state: RobotState
  energy: number
  cargoTotal: number
  x: number
  y: number
}

export interface HUDSnapshot {
  /** Total mined resources across all robot cargo, keyed by ResourceType (0..5) */
  resources: Map<number, number>
  robots: HUDRobotEntry[]
  fps: number
  /** All asteroid positions for minimap rendering */
  asteroids: AsteroidData[]
  selectedAsteroidId: number | null
  selectedRobotId: number | null
}
