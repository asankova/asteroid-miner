import { ProcessingStructure } from './ProcessingStructure.ts'
import { ProcessingStructureType, getRecipesForStructure } from './Recipes.ts'
import { Inventory } from './Inventory.ts'
import { Material } from './Materials.ts'

export class ProcessingManager {
  readonly structures: Map<number, ProcessingStructure> = new Map()
  readonly inventory = new Inventory()

  place(type: ProcessingStructureType, x: number, y: number): ProcessingStructure {
    const s = new ProcessingStructure(type, x, y)
    this.structures.set(s.id, s)
    return s
  }

  // Called by miner robots to deposit ore
  depositOre(material: Material, quantity: number): void {
    this.inventory.add(material, quantity)
    // Auto-feed nearest compatible smelter
    for (const s of this.structures.values()) {
      const recipes = getRecipesForStructure(s.structureType)
      const recipesNeedingThis = recipes.filter(r => r.inputs.some(i => i.material === material))
      if (recipesNeedingThis.length > 0) {
        s.addToInput({ material, quantity })
        break
      }
    }
  }

  tick(dt: number): void {
    for (const s of this.structures.values()) {
      const recipes = getRecipesForStructure(s.structureType)
      s.tick(dt, recipes)
      // Drain completed outputs into inventory
      for (const stack of s.outputBuffer) {
        if (stack.quantity > 0) {
          this.inventory.add(stack.material, stack.quantity)
          stack.quantity = 0
        }
      }
      s.outputBuffer = s.outputBuffer.filter(b => b.quantity > 0)
    }
  }

  getFlowMetrics() {
    return Array.from(this.structures.values()).map(s => ({
      id: s.id,
      type: s.structureType,
      state: s.state,
      idleRatio: s.idleRatio,
      inputBufferSize: s.inputBuffer.reduce((sum, b) => sum + b.quantity, 0),
      outputBufferSize: s.outputBuffer.reduce((sum, b) => sum + b.quantity, 0),
      isBottlenecked: s.isBottlenecked,
    }))
  }
}
