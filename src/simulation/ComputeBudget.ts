export class ComputeBudget {
  private pool = 0
  private maxPool = 500
  private generationRate = 0  // CP/s, updated from structures

  update(cpPerSecond: number): void {
    this.generationRate = cpPerSecond
  }

  tick(dt: number): void {
    this.pool = Math.min(this.maxPool, this.pool + this.generationRate * dt)
  }

  consume(amount: number): boolean {
    if (this.pool < amount) return false
    this.pool -= amount
    return true
  }

  get current(): number { return this.pool }
  get max(): number { return this.maxPool }
  get rate(): number { return this.generationRate }
  get ratio(): number { return this.pool / this.maxPool }
}
