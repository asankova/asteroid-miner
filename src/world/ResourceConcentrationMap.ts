import type { PRNG } from './PRNG.ts'

export enum ResourceType {
  IRON = 0, NICKEL = 1, PLATINUM = 2,
  WATER_ICE = 3, SILICATES = 4, XENOMINERAL = 5,
}

export const RESOURCE_COUNT = 6

// Resource abundance by asteroid type (simplified)
const TYPE_RESOURCE_BIAS: Record<string, number[]> = {
  C:       [0.3, 0.2, 0.1, 0.5, 0.6, 0.0],
  S:       [0.5, 0.4, 0.2, 0.1, 0.5, 0.0],
  M:       [0.8, 0.7, 0.4, 0.0, 0.2, 0.0],
  V:       [0.2, 0.3, 0.1, 0.6, 0.8, 0.0],
  D:       [0.3, 0.2, 0.3, 0.2, 0.4, 0.0],
  H:       [0.1, 0.1, 0.0, 0.9, 0.3, 0.0],
  A:       [0.4, 0.3, 0.5, 0.1, 0.3, 0.0],
  X:       [0.5, 0.4, 0.6, 0.3, 0.3, 0.9],
  UNKNOWN: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // masked until surveyed
}

export class ResourceConcentrationMap {
  // grids[resourceType] = Float32Array of 64 values (8x8)
  readonly grids: Float32Array[]
  private surveyed = false

  constructor(asteroidType: string, prng: PRNG) {
    this.grids = []
    const biases = TYPE_RESOURCE_BIAS[asteroidType] ?? TYPE_RESOURCE_BIAS['C']

    for (let r = 0; r < RESOURCE_COUNT; r++) {
      const grid = new Float32Array(64)
      const bias = biases[r]
      if (bias <= 0) {
        this.grids.push(grid) // zero grid
        continue
      }
      // Generate gaussian blob concentrations
      const blobCount = 1 + Math.floor(prng.next() * 3)
      for (let b = 0; b < blobCount; b++) {
        const bx = prng.nextFloat(1, 7)
        const by = prng.nextFloat(1, 7)
        const strength = prng.nextFloat(bias * 0.5, bias * 1.2)
        const sigma = prng.nextFloat(1.5, 3.5)
        for (let gy = 0; gy < 8; gy++) {
          for (let gx = 0; gx < 8; gx++) {
            const dx = gx - bx; const dy = gy - by
            grid[gy * 8 + gx] += strength * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
          }
        }
      }
      // Clamp to [0, 1]
      for (let i = 0; i < 64; i++) grid[i] = Math.min(1, grid[i])
      this.grids.push(grid)
    }
  }

  // Bilinear interpolation sample at normalized position [0..1]
  sample(resourceType: ResourceType, nx: number, ny: number): number {
    if (!this.surveyed && resourceType === ResourceType.XENOMINERAL) return 0
    const grid = this.grids[resourceType]
    if (!grid) return 0
    const gx = nx * 7; const gy = ny * 7
    const x0 = Math.floor(gx); const y0 = Math.floor(gy)
    const x1 = Math.min(x0 + 1, 7); const y1 = Math.min(y0 + 1, 7)
    const fx = gx - x0; const fy = gy - y0
    const v00 = grid[y0 * 8 + x0]; const v10 = grid[y0 * 8 + x1]
    const v01 = grid[y1 * 8 + x0]; const v11 = grid[y1 * 8 + x1]
    return v00 * (1 - fx) * (1 - fy) + v10 * fx * (1 - fy) +
           v01 * (1 - fx) * fy + v11 * fx * fy
  }

  setSurveyed(): void { this.surveyed = true }
}
