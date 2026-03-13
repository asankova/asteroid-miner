import { BTNode, NodeResult } from './BehaviorTree.ts'
import type { BTContext } from './BehaviorTree.ts'
import { TaskType } from './TaskQueue.ts'
import type { TaskQueue } from './TaskQueue.ts'
import { TelemetryRingBuffer, TelemetryEventType } from './Telemetry.ts'
import { YieldCalculator } from '../mining/YieldCalculator.ts'
import type { YieldResult } from '../mining/YieldCalculator.ts'
import { StructuralIntegritySystem } from '../mining/StructuralIntegrity.ts'
import { MiningToolType, TOOL_PROFILES } from '../mining/MiningTool.ts'
import type { ToolProfile } from '../mining/MiningTool.ts'
import type { AsteroidFullData } from '../world/AsteroidField.ts'
import { ResourceType, RESOURCE_COUNT } from '../world/ResourceConcentrationMap.ts'
import { RobotState } from '../types/index.ts'

/** Minimal interface for the robot host — avoids circular dependency with RobotEntity */
export interface MiningHost {
  readonly id: number
  x: number
  y: number
  targetX: number
  targetY: number
  energy: number
  state: RobotState
  readonly taskQueue: TaskQueue
  readonly cargo: Map<number, number>
}

/**
 * MiningAction — composable BTNode that drives a full mining cycle:
 * move to asteroid → mine (with yield/SI calculation) → add cargo → emit telemetry.
 * Returns FAILURE if no active MINE task; RUNNING while in progress; SUCCESS on completion/depletion.
 */
export class MiningAction extends BTNode {
  private readonly yieldCalc = new YieldCalculator()
  private readonly integritySystem = new StructuralIntegritySystem()

  constructor(
    private readonly robot: MiningHost,
    private readonly telemetry: TelemetryRingBuffer,
    private readonly getAsteroid: (id: number) => AsteroidFullData | undefined,
    private readonly tool: ToolProfile = TOOL_PROFILES[MiningToolType.PERCUSSIVE_DRILL],
  ) { super() }

  tick(ctx: BTContext): NodeResult {
    const task = this.robot.taskQueue.current
    if (!task || task.type !== TaskType.MINE) return NodeResult.FAILURE

    const targetX = task.targetX ?? this.robot.x
    const targetY = task.targetY ?? this.robot.y

    // Move toward asteroid until within range
    if (Math.hypot(this.robot.x - targetX, this.robot.y - targetY) >= 80) {
      this.robot.targetX = targetX
      this.robot.targetY = targetY
      this.robot.state = RobotState.MOVING
      return NodeResult.RUNNING
    }

    this.robot.state = RobotState.MINING
    this.robot.energy = Math.max(0, this.robot.energy - ctx.deltaTime * (this.tool.energyCost / 10))

    const asteroid = task.targetId !== undefined ? this.getAsteroid(task.targetId) : undefined

    // Asteroid missing or already depleted
    if (!asteroid || asteroid.structuralIntegrity <= 0) {
      this.telemetry.append({
        type: TelemetryEventType.TASK_COMPLETED,
        robotId: this.robot.id,
        timestamp: performance.now(),
        data: { taskType: task.type, targetId: task.targetId, depleted: true },
      })
      this.clearBlackboard(ctx)
      this.robot.taskQueue.complete()
      this.robot.state = RobotState.IDLE
      return NodeResult.SUCCESS
    }

    // Start of a new mining cycle: compute yield and cache it
    if (!ctx.blackboard.has('mineStart')) {
      const resource = this.primaryResource(asteroid)
      const concentration = asteroid.resources.sample(resource, 0.5, 0.5)
      const result = this.yieldCalc.calculate({
        concentration,
        tool: this.tool,
        robotSkill: 1.0,
        structuralIntegrity: asteroid.structuralIntegrity,
        concurrentMiners: 1,
        asteroidType: asteroid.type,
      })
      ctx.blackboard.set('mineStart', performance.now())
      ctx.blackboard.set('minePending', result)
      ctx.blackboard.set('mineResource', resource)
      return NodeResult.RUNNING
    }

    // Wait for mining cycle to complete
    const mineStart = ctx.blackboard.get<number>('mineStart')!
    const pending = ctx.blackboard.get<YieldResult>('minePending')!
    if (performance.now() - mineStart < pending.duration * 1000) {
      return NodeResult.RUNNING
    }

    // Apply yield to cargo
    const resource = ctx.blackboard.get<number>('mineResource')!
    this.robot.cargo.set(resource, (this.robot.cargo.get(resource) ?? 0) + pending.yieldAmount * 100)

    // Apply structural damage
    const { newIntegrity, events } = this.integritySystem.applyDamage(
      asteroid.id, asteroid.structuralIntegrity, this.tool,
    )
    asteroid.structuralIntegrity = newIntegrity

    // Emit integrity events (cracks, fragmentation)
    for (const evt of events) {
      this.telemetry.append({
        type: TelemetryEventType.ANOMALY_DETECTED,
        robotId: this.robot.id,
        timestamp: performance.now(),
        data: { integrityEvent: evt.type, asteroidId: evt.asteroidId, newIntegrity: evt.newIntegrity },
      })
    }

    // Emit yield telemetry
    this.telemetry.append({
      type: TelemetryEventType.TASK_COMPLETED,
      robotId: this.robot.id,
      timestamp: performance.now(),
      data: {
        taskType: task.type,
        targetId: task.targetId,
        yieldAmount: pending.yieldAmount,
        oreGrade: pending.oreGrade,
        resourceType: resource,
        isRareYield: pending.isRareYield,
        rareMineral: pending.rareMineral ?? null,
        remainingIntegrity: newIntegrity,
      },
    })

    this.clearBlackboard(ctx)

    if (newIntegrity <= 0) {
      this.robot.taskQueue.complete()
      this.robot.state = RobotState.IDLE
      return NodeResult.SUCCESS
    }

    // Asteroid not depleted — loop for next cycle
    return NodeResult.RUNNING
  }

  private clearBlackboard(ctx: BTContext): void {
    ctx.blackboard.delete('mineStart')
    ctx.blackboard.delete('minePending')
    ctx.blackboard.delete('mineResource')
  }

  /** Returns the ResourceType with the highest concentration at the asteroid's center */
  private primaryResource(asteroid: AsteroidFullData): ResourceType {
    let best: ResourceType = ResourceType.IRON
    let bestVal = -1
    for (let r = 0; r < RESOURCE_COUNT; r++) {
      const val = asteroid.resources.sample(r as ResourceType, 0.5, 0.5)
      if (val > bestVal) { bestVal = val; best = r as ResourceType }
    }
    return best
  }
}
