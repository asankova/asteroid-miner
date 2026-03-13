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
