import type { Recipe } from './Recipes.ts'
import { ProcessingStructureType } from './Recipes.ts'
import type { MaterialStack } from './Materials.ts'
import { Material } from './Materials.ts'

const BUFFER_MAX = 100

export enum ProcessingState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  BLOCKED = 'BLOCKED',      // output buffer full
  STARVED = 'STARVED',      // input buffer empty
  POWER_OFF = 'POWER_OFF',
}

let _processingId = 1

export class ProcessingStructure {
  readonly id: number
  readonly structureType: ProcessingStructureType
  x: number
  y: number

  inputBuffer: MaterialStack[] = []
  outputBuffer: MaterialStack[] = []
  activeRecipe: Recipe | null = null
  processingProgress = 0  // [0..1]
  state = ProcessingState.IDLE
  hasPower = true

  // Flow metrics
  private tickCount = 0
  private idleTickCount = 0
  private processedLastMinute = 0
  private rollingWindow: number[] = [] // outputs per second over last 60s

  constructor(type: ProcessingStructureType, x: number, y: number) {
    this.id = _processingId++
    this.structureType = type
    this.x = x
    this.y = y
  }

  addToInput(stack: MaterialStack): boolean {
    const total = this.inputBuffer.reduce((s, b) => s + b.quantity, 0)
    if (total >= BUFFER_MAX) return false
    const existing = this.inputBuffer.find(b => b.material === stack.material)
    if (existing) existing.quantity += stack.quantity
    else this.inputBuffer.push({ ...stack })
    return true
  }

  drainOutput(material: Material, quantity: number): number {
    const slot = this.outputBuffer.find(b => b.material === material)
    if (!slot) return 0
    const taken = Math.min(slot.quantity, quantity)
    slot.quantity -= taken
    this.outputBuffer = this.outputBuffer.filter(b => b.quantity > 0)
    return taken
  }

  tick(dt: number, recipes: Recipe[]): void {
    this.tickCount++

    if (!this.hasPower) {
      this.state = ProcessingState.POWER_OFF
      this.idleTickCount++
      return
    }

    // Find a recipe we can run if not already running
    if (!this.activeRecipe) {
      this.activeRecipe = this.findRunnable(recipes)
      if (!this.activeRecipe) {
        this.state = this.outputBuffer.length >= BUFFER_MAX ? ProcessingState.BLOCKED : ProcessingState.STARVED
        this.idleTickCount++
        return
      }
      this.processingProgress = 0
    }

    // Check output buffer space
    const outputFull = this.outputBuffer.reduce((s, b) => s + b.quantity, 0) >= BUFFER_MAX
    if (outputFull) {
      this.state = ProcessingState.BLOCKED
      this.idleTickCount++
      return
    }

    // Advance processing
    this.state = ProcessingState.PROCESSING
    this.processingProgress += dt / this.activeRecipe.processingTime

    if (this.processingProgress >= 1) {
      // Consume inputs
      for (const input of this.activeRecipe.inputs) {
        const slot = this.inputBuffer.find(b => b.material === input.material)
        if (slot) slot.quantity -= input.quantity
      }
      this.inputBuffer = this.inputBuffer.filter(b => b.quantity > 0)

      // Produce outputs
      for (const output of this.activeRecipe.outputs) {
        const existing = this.outputBuffer.find(b => b.material === output.material)
        if (existing) existing.quantity += output.quantity
        else this.outputBuffer.push({ material: output.material, quantity: output.quantity })
      }

      this.processingProgress = 0
      this.activeRecipe = null
      this.processedLastMinute++
    }
  }

  private findRunnable(recipes: Recipe[]): Recipe | null {
    for (const recipe of recipes) {
      let canRun = true
      for (const input of recipe.inputs) {
        const slot = this.inputBuffer.find(b => b.material === input.material)
        if (!slot || slot.quantity < input.quantity) { canRun = false; break }
      }
      if (canRun) return recipe
    }
    return null
  }

  get idleRatio(): number {
    return this.tickCount > 0 ? this.idleTickCount / this.tickCount : 1
  }

  get isBottlenecked(): boolean {
    return this.state === ProcessingState.BLOCKED || this.state === ProcessingState.STARVED
  }
}
