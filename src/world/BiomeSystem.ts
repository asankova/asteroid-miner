import { AsteroidType, BiomeZone, FIELD_SIZE } from '../types/index.ts'
import type { PRNG } from './PRNG.ts'
import type { NoiseField } from './NoiseField.ts'

// Biome radial boundaries (fraction of field half-diagonal)
const BIOME_BOUNDS = {
  [BiomeZone.INNER_ORE]:       { min: 0.00, max: 0.30 },
  [BiomeZone.MIDDLE_MIXED]:    { min: 0.30, max: 0.60 },
  [BiomeZone.OUTER_VOLATILE]:  { min: 0.60, max: 0.85 },
  [BiomeZone.ANCIENT_DEBRIS]:  { min: 0.85, max: 1.00 },
}

// Type probability weights per biome [C, S, M, V, D, H, A, X]
const BIOME_TYPE_WEIGHTS: Record<BiomeZone, number[]> = {
  [BiomeZone.INNER_ORE]:      [15, 25, 30, 5,  10, 5,  10, 0],
  [BiomeZone.MIDDLE_MIXED]:   [20, 20, 20, 15, 10, 5,  9,  1],
  [BiomeZone.OUTER_VOLATILE]: [25, 10, 10, 20, 15, 15, 4,  1],
  [BiomeZone.ANCIENT_DEBRIS]: [10, 5,  5,  10, 10, 20, 5,  35],
}

const TYPE_LIST = [
  AsteroidType.C, AsteroidType.S, AsteroidType.M, AsteroidType.V,
  AsteroidType.D, AsteroidType.H, AsteroidType.A, AsteroidType.X
]

export class BiomeSystem {
  private centerX = FIELD_SIZE / 2
  private centerY = FIELD_SIZE / 2
  private halfDiag = (FIELD_SIZE * Math.SQRT2) / 2

  getBiome(wx: number, wy: number): BiomeZone {
    const dx = wx - this.centerX
    const dy = wy - this.centerY
    const r = Math.sqrt(dx * dx + dy * dy) / this.halfDiag // normalized 0..1
    if (r < BIOME_BOUNDS[BiomeZone.INNER_ORE].max)      return BiomeZone.INNER_ORE
    if (r < BIOME_BOUNDS[BiomeZone.MIDDLE_MIXED].max)   return BiomeZone.MIDDLE_MIXED
    if (r < BIOME_BOUNDS[BiomeZone.OUTER_VOLATILE].max) return BiomeZone.OUTER_VOLATILE
    return BiomeZone.ANCIENT_DEBRIS
  }

  pickType(biome: BiomeZone, noise: NoiseField, wx: number, wy: number, prng: PRNG): AsteroidType {
    const weights = [...BIOME_TYPE_WEIGHTS[biome]]
    // Modulate M-type and C-type by noise type bias
    const bias = noise.typeBias(wx, wy)
    weights[2] *= (1 + bias)  // M boost with metallic bias
    weights[0] *= (1 + (1 - bias)) // C boost with volatile bias
    return prng.weightedPick(TYPE_LIST, weights)
  }
}
