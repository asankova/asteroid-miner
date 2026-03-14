export enum FidelityTier {
  HIGH = 'HIGH',     // full BT tick every step — within ~200 world units of camera
  MEDIUM = 'MEDIUM', // tick every 4th step — 200–1000 units
  LOW = 'LOW',       // aggregate only — >1000 units
}

export class FidelityManager {
  private entityTiers = new Map<number, FidelityTier>()
  private stepCounter = 0

  update(entities: Array<{ id: number; x: number; y: number }>, cameraX: number, cameraY: number, zoom: number): void {
    // Camera zoom → approximate world units visible
    const viewRadius = (window.innerWidth / 2) / zoom

    for (const e of entities) {
      const dx = e.x - cameraX
      const dy = e.y - cameraY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const relDist = dist / viewRadius

      let tier: FidelityTier
      if (relDist < 0.3) tier = FidelityTier.HIGH
      else if (relDist < 1.5) tier = FidelityTier.MEDIUM
      else tier = FidelityTier.LOW

      this.entityTiers.set(e.id, tier)
    }
    this.stepCounter++
  }

  shouldTick(entityId: number): boolean {
    const tier = this.entityTiers.get(entityId) ?? FidelityTier.LOW
    switch (tier) {
      case FidelityTier.HIGH:   return true
      case FidelityTier.MEDIUM: return this.stepCounter % 4 === 0
      case FidelityTier.LOW:    return false
    }
  }

  getLODMultiplier(entityId: number): number {
    const tier = this.entityTiers.get(entityId) ?? FidelityTier.LOW
    switch (tier) {
      case FidelityTier.HIGH:   return 1.0
      case FidelityTier.MEDIUM: return 0.25
      case FidelityTier.LOW:    return 0.0
    }
  }

  getTier(entityId: number): FidelityTier {
    return this.entityTiers.get(entityId) ?? FidelityTier.LOW
  }

  getStats(): { high: number; medium: number; low: number } {
    let high = 0, medium = 0, low = 0
    for (const tier of this.entityTiers.values()) {
      if (tier === FidelityTier.HIGH) high++
      else if (tier === FidelityTier.MEDIUM) medium++
      else low++
    }
    return { high, medium, low }
  }
}
