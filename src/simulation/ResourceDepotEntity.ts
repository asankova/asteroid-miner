import type { ResourceDepotData } from '../types/index.ts'

let _depotId = 1

/**
 * ResourceDepotEntity — a stationary structure where haulers deposit mined cargo.
 * Maintains a running ledger of all deposited resources.
 */
export class ResourceDepotEntity {
  readonly id: number
  readonly x: number
  readonly y: number
  private readonly _ledger: Map<number, number> = new Map()

  constructor(x: number, y: number) {
    this.id = _depotId++
    this.x = x
    this.y = y
  }

  /**
   * Deposit all resources from a robot's cargo into this depot's ledger.
   * Mutates `cargo` by clearing it after deposit.
   */
  deposit(cargo: Map<number, number>): void {
    for (const [resourceType, amount] of cargo) {
      this._ledger.set(resourceType, (this._ledger.get(resourceType) ?? 0) + amount)
    }
    cargo.clear()
  }

  get ledger(): ReadonlyMap<number, number> {
    return this._ledger
  }

  toData(): ResourceDepotData {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      ledger: this._ledger,
    }
  }
}
