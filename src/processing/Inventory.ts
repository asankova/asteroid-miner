import { Material } from './Materials.ts'

export class Inventory {
  private stocks = new Map<Material, number>()

  add(material: Material, quantity: number): void {
    this.stocks.set(material, (this.stocks.get(material) ?? 0) + quantity)
  }

  remove(material: Material, quantity: number): boolean {
    const current = this.stocks.get(material) ?? 0
    if (current < quantity) return false
    this.stocks.set(material, current - quantity)
    return true
  }

  get(material: Material): number {
    return this.stocks.get(material) ?? 0
  }

  has(material: Material, quantity: number): boolean {
    return this.get(material) >= quantity
  }

  getAll(): Record<string, number> {
    const result: Record<string, number> = {}
    for (const [mat, qty] of this.stocks) {
      if (qty > 0) result[mat] = qty
    }
    return result
  }
}
