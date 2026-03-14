import { RobotType, RobotState, FIELD_SIZE } from '../types/index.ts'
import type { RobotData } from '../types/index.ts'
import {
  BTNode, Blackboard, NodeResult,
  Sequence, Selector, Action, Condition
} from './BehaviorTree.ts'
import type { BTContext } from './BehaviorTree.ts'
import { TaskQueue, TaskType, TaskSource } from './TaskQueue.ts'
import type { RobotTask } from './TaskQueue.ts'
import { TelemetryRingBuffer, TelemetryEventType } from './Telemetry.ts'
import { MiningAction } from './MiningAction.ts'
import { HaulAction } from './HaulAction.ts'
import type { AsteroidFullData } from '../world/AsteroidField.ts'
import type { ResourceDepotEntity } from './ResourceDepotEntity.ts'
import { MAX_CARGO } from '../types/index.ts'

const ROBOT_SPEED: Record<RobotType, number> = {
  [RobotType.SCOUT]:      400,
  [RobotType.MINER]:      200,
  [RobotType.HAULER]:     250,
  [RobotType.BUILDER]:    180,
  [RobotType.FABRICATOR]: 150,
  [RobotType.SENTINEL]:   350,
}

const ENERGY_MAX = 100

export class RobotEntity {
  readonly id: number
  readonly type: RobotType
  x: number
  y: number
  targetX: number
  targetY: number
  energy = ENERGY_MAX
  state = RobotState.IDLE
  /** Accumulated mined resources: Map<ResourceType (number enum), units> */
  readonly cargo: Map<number, number> = new Map()

  readonly taskQueue = new TaskQueue()
  readonly blackboard = new Blackboard()
  private bt: BTNode
  private telemetry: TelemetryRingBuffer
  private miningAction: MiningAction
  private haulAction: HaulAction

  constructor(
    id: number,
    type: RobotType,
    x: number,
    y: number,
    telemetry: TelemetryRingBuffer,
    getAsteroid: (id: number) => AsteroidFullData | undefined = () => undefined,
    getNearestDepot: () => ResourceDepotEntity | undefined = () => undefined,
  ) {
    this.id = id
    this.type = type
    this.x = x
    this.y = y
    this.targetX = x
    this.targetY = y
    this.telemetry = telemetry
    this.miningAction = new MiningAction(this, telemetry, getAsteroid)
    this.haulAction = new HaulAction(this, telemetry, getNearestDepot)
    this.bt = this.buildBT()
  }

  tick(deltaTime: number, lodMultiplier = 1.0): void {
    const ctx: BTContext = {
      robotId: this.id,
      blackboard: this.blackboard,
      deltaTime,
      lodMultiplier,
    }
    this.bt.tick(ctx)
    this.updateMovement(deltaTime)
  }

  private updateMovement(dt: number): void {
    const dx = this.targetX - this.x
    const dy = this.targetY - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const speed = ROBOT_SPEED[this.type]
    if (dist < 2) {
      this.x = this.targetX
      this.y = this.targetY
      if (this.state === RobotState.MOVING) this.state = RobotState.IDLE
    } else if (dist < speed * dt) {
      this.x = this.targetX
      this.y = this.targetY
    } else {
      this.x += (dx / dist) * speed * dt
      this.y += (dy / dist) * speed * dt
      this.state = RobotState.MOVING
    }
  }

  private buildBT(): BTNode {
    return new Selector([
      // Emergency recharge
      new Sequence([
        new Condition(() => this.energy < 20),
        new Action((ctx) => {
          if (this.taskQueue.current?.type !== TaskType.RECHARGE) {
            this.taskQueue.assign({
              type: TaskType.RECHARGE, priority: 0, source: TaskSource.SELF,
            })
          }
          return this.executeTask(this.taskQueue.next()!, ctx)
        }),
      ]),
      // Execute queued task
      new Action((ctx) => {
        const task = this.taskQueue.next()
        if (!task) return NodeResult.FAILURE
        return this.executeTask(task, ctx)
      }),
      // Idle wander
      new Action((ctx) => {
        if (this.state !== RobotState.IDLE) return NodeResult.RUNNING
        const lastWander = ctx.blackboard.get<number>('lastWander') ?? 0
        if (performance.now() - lastWander < 5000) return NodeResult.RUNNING
        ctx.blackboard.set('lastWander', performance.now())
        this.targetX = Math.max(0, Math.min(FIELD_SIZE, this.x + (Math.random() - 0.5) * 2000))
        this.targetY = Math.max(0, Math.min(FIELD_SIZE, this.y + (Math.random() - 0.5) * 2000))
        return NodeResult.SUCCESS
      }),
    ])
  }

  private executeTask(task: RobotTask, ctx: BTContext): NodeResult {
    switch (task.type) {
      case TaskType.MINE: {
        return this.miningAction.tick(ctx)
      }
      case TaskType.HAUL: {
        return this.haulAction.tick(ctx)
      }
      case TaskType.SURVEY: {
        if (task.targetX !== undefined) this.targetX = task.targetX
        if (task.targetY !== undefined) this.targetY = task.targetY
        const atTarget = Math.hypot(this.x - (task.targetX ?? this.x), this.y - (task.targetY ?? this.y)) < 120
        if (!atTarget) return NodeResult.RUNNING
        this.telemetry.append({
          type: TelemetryEventType.ANOMALY_DETECTED,
          robotId: this.id, timestamp: performance.now(),
          data: { targetId: task.targetId },
        })
        this.taskQueue.complete()
        this.state = RobotState.IDLE
        return NodeResult.SUCCESS
      }
      case TaskType.RECHARGE: {
        this.energy = Math.min(ENERGY_MAX, this.energy + ctx.deltaTime * 15)
        if (this.energy >= ENERGY_MAX) {
          this.taskQueue.complete()
          return NodeResult.SUCCESS
        }
        return NodeResult.RUNNING
      }
      default: {
        this.taskQueue.complete()
        return NodeResult.SUCCESS
      }
    }
  }

  toData(): RobotData {
    return {
      id: this.id, type: this.type,
      x: this.x, y: this.y,
      targetX: this.targetX, targetY: this.targetY,
      energy: this.energy, state: this.state,
    }
  }
}
