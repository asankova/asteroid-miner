export class PRNG {
  private state: number

  constructor(seed: number) {
    this.state = seed >>> 0
  }

  next(): number {
    this.state |= 0
    this.state = this.state + 0x6D2B79F5 | 0
    let z = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state)
    z = z + Math.imul(z ^ (z >>> 7), 61 | z) ^ z
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  nextFloat(min: number, max: number): number {
    return min + this.next() * (max - min)
  }

  // Pick from array with weights
  weightedPick<T>(items: T[], weights: number[]): T {
    const total = weights.reduce((s, w) => s + w, 0)
    let r = this.next() * total
    for (let i = 0; i < items.length; i++) {
      r -= weights[i]
      if (r <= 0) return items[i]
    }
    return items[items.length - 1]
  }
}
