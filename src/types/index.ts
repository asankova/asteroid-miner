export interface Vec2 { x: number; y: number }
export interface Rect { x: number; y: number; w: number; h: number }

export const FIELD_SIZE = 50_000 // world units, field is [0..FIELD_SIZE] x [0..FIELD_SIZE]

export interface AsteroidData {
  id: number
  x: number
  y: number
  radius: number
  type: AsteroidType
  visualType: AsteroidType // same as type unless X-type (masked as UNKNOWN)
  rotation: number
  rotationSpeed: number
  structuralIntegrity: number
  biome: BiomeZone
}

export enum AsteroidType {
  C = 'C', S = 'S', M = 'M', V = 'V', D = 'D', H = 'H', A = 'A', X = 'X', UNKNOWN = 'UNKNOWN'
}

export enum BiomeZone {
  INNER_ORE = 'INNER_ORE',
  MIDDLE_MIXED = 'MIDDLE_MIXED',
  OUTER_VOLATILE = 'OUTER_VOLATILE',
  ANCIENT_DEBRIS = 'ANCIENT_DEBRIS',
}

export enum RobotType {
  SCOUT = 'SCOUT', MINER = 'MINER', HAULER = 'HAULER',
  BUILDER = 'BUILDER', FABRICATOR = 'FABRICATOR', SENTINEL = 'SENTINEL'
}

export interface RobotData {
  id: number
  type: RobotType
  x: number
  y: number
  targetX: number
  targetY: number
  energy: number
  state: RobotState
}

export enum RobotState {
  IDLE = 'IDLE', MOVING = 'MOVING', MINING = 'MINING', HAULING = 'HAULING'
}

export enum LODLevel {
  L0 = 0, // farthest — field overview
  L1 = 1,
  L2 = 2,
  L3 = 3,
  L4 = 4, // closest — equipment detail
}

// Re-export ResourceType so consumers can import from one place
export { ResourceType } from '../world/ResourceConcentrationMap.ts'

/** Maximum cargo units a robot can carry before auto-queueing a HAUL task */
export const MAX_CARGO = 500

/** Snapshot of a robot's cargo hold — keyed by ResourceType (number) → amount (units) */
export type CargoManifest = ReadonlyMap<number, number>

/** Data shape for a resource depot in the world */
export interface ResourceDepotData {
  id: number
  x: number
  y: number
  /** Total deposited resources since game start, keyed by ResourceType */
  ledger: ReadonlyMap<number, number>
}
