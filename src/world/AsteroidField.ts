import { FIELD_SIZE, AsteroidType, BiomeZone } from '../types/index.ts'
import type { AsteroidData } from '../types/index.ts'
import { PRNG } from './PRNG.ts'
import { poissonDisk } from './PoissonDisk.ts'
import { NoiseField } from './NoiseField.ts'
import { BiomeSystem } from './BiomeSystem.ts'
import { ResourceConcentrationMap } from './ResourceConcentrationMap.ts'

export interface AsteroidFullData extends AsteroidData {
  resources: ResourceConcentrationMap
  dormancyContribution: number // for ancient-race system (future use)
}

export class AsteroidField {
  readonly seed: number
  readonly asteroids: AsteroidFullData[] = []
  private nextId = 1

  constructor(seed: number) {
    this.seed = seed
  }

  generate(targetCount = 2000): void {
    const t0 = performance.now()
    const prng = new PRNG(this.seed)
    const noise = new NoiseField(prng, FIELD_SIZE)
    const biome = new BiomeSystem()

    // Generate positions using Poisson disk sampling
    const minDist = FIELD_SIZE / Math.sqrt(targetCount) * 0.8
    const positions = poissonDisk(FIELD_SIZE, FIELD_SIZE, minDist, targetCount, prng.next.bind(prng))

    for (const pos of positions) {
      const biomeZone = biome.getBiome(pos.x, pos.y)
      const density = noise.density(pos.x, pos.y)

      // Skip sparse areas randomly based on density
      if (prng.next() > density * 1.5 && biomeZone !== BiomeZone.ANCIENT_DEBRIS) continue

      const type = biome.pickType(biomeZone, noise, pos.x, pos.y, prng)
      const visualType = type === AsteroidType.X ? AsteroidType.UNKNOWN : type

      const asteroid: AsteroidFullData = {
        id: this.nextId++,
        x: pos.x,
        y: pos.y,
        radius: this.radiusForType(type, prng),
        type,
        visualType,
        rotation: prng.next() * Math.PI * 2,
        rotationSpeed: prng.nextFloat(-0.002, 0.002),
        structuralIntegrity: 1.0,
        biome: biomeZone,
        resources: new ResourceConcentrationMap(type, prng),
        dormancyContribution: 0,
      }
      this.asteroids.push(asteroid)
    }

    const elapsed = performance.now() - t0
    console.log(`[AsteroidField] Generated ${this.asteroids.length} asteroids in ${elapsed.toFixed(1)}ms (seed: ${this.seed})`)
  }

  // Add a child asteroid from fragmentation
  addAsteroid(parentId: number, position: { x: number; y: number }): AsteroidFullData | null {
    const parent = this.asteroids.find(a => a.id === parentId)
    if (!parent) return null
    const prng = new PRNG(parentId * 7919 + this.nextId)
    const child: AsteroidFullData = {
      id: this.nextId++,
      x: position.x,
      y: position.y,
      radius: parent.radius * prng.nextFloat(0.3, 0.6),
      type: parent.type,
      visualType: parent.visualType,
      rotation: prng.next() * Math.PI * 2,
      rotationSpeed: prng.nextFloat(-0.005, 0.005),
      structuralIntegrity: 0.8,
      biome: parent.biome,
      resources: new ResourceConcentrationMap(parent.type, prng),
      dormancyContribution: 0,
    }
    this.asteroids.push(child)
    return child
  }

  getVisibleData(): AsteroidData[] {
    return this.asteroids.map(a => ({
      id: a.id, x: a.x, y: a.y, radius: a.radius,
      type: a.type, visualType: a.visualType,
      rotation: a.rotation, rotationSpeed: a.rotationSpeed,
      structuralIntegrity: a.structuralIntegrity, biome: a.biome,
    }))
  }

  private radiusForType(type: AsteroidType, prng: PRNG): number {
    const ranges: Record<AsteroidType, [number, number]> = {
      [AsteroidType.C]:       [40, 200],
      [AsteroidType.S]:       [30, 160],
      [AsteroidType.M]:       [60, 250],
      [AsteroidType.V]:       [50, 180],
      [AsteroidType.D]:       [20, 120],
      [AsteroidType.H]:       [80, 300],
      [AsteroidType.A]:       [40, 160],
      [AsteroidType.X]:       [100, 400],
      [AsteroidType.UNKNOWN]: [100, 400],
    }
    const [min, max] = ranges[type]
    return prng.nextFloat(min, max)
  }
}
