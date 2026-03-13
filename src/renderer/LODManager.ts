import { LODLevel } from '../types/index.ts'

export class LODManager {
  private currentLevel: LODLevel = LODLevel.L0
  private crossFadeAlpha = 1.0
  private crossFadeTarget = 1.0
  private crossFadeStartTime = 0
  private readonly CROSSFADE_DURATION = 200 // ms

  onLODChange?: (level: LODLevel) => void

  update(zoom: number, now: number): void {
    const newLevel = this.zoomToLOD(zoom)
    if (newLevel !== this.currentLevel) {
      this.currentLevel = newLevel
      this.crossFadeAlpha = 0.0
      this.crossFadeTarget = 1.0
      this.crossFadeStartTime = now
      this.onLODChange?.(newLevel)
    }
    // Animate cross-fade
    if (this.crossFadeAlpha < 1.0) {
      const t = Math.min((now - this.crossFadeStartTime) / this.CROSSFADE_DURATION, 1)
      this.crossFadeAlpha = t
    }
  }

  get level(): LODLevel { return this.currentLevel }
  get alpha(): number { return this.crossFadeAlpha }

  private zoomToLOD(zoom: number): LODLevel {
    const wupp = 1 / zoom // world units per pixel
    if (wupp > 2000) return LODLevel.L0
    if (wupp > 500)  return LODLevel.L1
    if (wupp > 100)  return LODLevel.L2
    if (wupp > 20)   return LODLevel.L3
    return LODLevel.L4
  }
}
