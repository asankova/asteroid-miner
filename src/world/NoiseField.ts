import { createNoise2D } from 'simplex-noise'
import type { PRNG } from './PRNG.ts'

export class NoiseField {
  private densityNoise: ReturnType<typeof createNoise2D>
  private typeNoise: ReturnType<typeof createNoise2D>
  private readonly FIELD_SIZE: number

  constructor(prng: PRNG, fieldSize: number) {
    this.FIELD_SIZE = fieldSize
    // Seed two independent noise functions by consuming PRNG to create seed values
    const s1 = prng.next()
    const s2 = prng.next()
    const seededRng1 = () => s1  // createNoise2D takes a rng function
    const seededRng2 = () => s2
    // Actually createNoise2D wants a random source for permutation table
    // We need to generate a shuffled permutation from our PRNG
    this.densityNoise = createNoise2D(prng.next.bind(prng))
    this.typeNoise = createNoise2D(prng.next.bind(prng))
    void seededRng1; void seededRng2
  }

  // Returns density at world position [0..1], high = cluster
  density(wx: number, wy: number): number {
    const nx = wx / this.FIELD_SIZE
    const ny = wy / this.FIELD_SIZE
    // Two octaves: large-scale clusters + finer variation
    const low = this.densityNoise(nx * 3, ny * 3)     // large clusters
    const high = this.densityNoise(nx * 12, ny * 12)  // finer detail
    const raw = low * 0.7 + high * 0.3
    return (raw + 1) / 2 // normalize to [0,1]
  }

  // Returns type bias [0..1] at position: 0 = metallic (inner), 1 = volatile (outer)
  typeBias(wx: number, wy: number): number {
    const nx = wx / this.FIELD_SIZE
    const ny = wy / this.FIELD_SIZE
    const n = this.typeNoise(nx * 5, ny * 5)
    return (n + 1) / 2
  }
}
