import { BTNode, NodeResult } from './BehaviorTree.ts'
import type { BTContext } from './BehaviorTree.ts'
import { TaskType, TaskSource } from './TaskQueue.ts'
import type { TaskQueue } from './TaskQueue.ts'
import { TelemetryRingBuffer, TelemetryEventType } from './Telemetry.ts'
import { RobotState } from '../types/index.ts'
import type { ResourceDepotEntity } from './ResourceDepotEntity.ts'

/** Minimal robot interface needed by HaulAction — avoids circular dep with RobotEntity */
export interface HaulHost {
  readonly id: number
  x: number
  y: number
  targetX: number
  targetY: number
  state: RobotState
  readonly taskQueue: TaskQueue
  readonly cargo: Map<number, number>
}

/**
 * HaulAction — composable BTNode that drives a full haul cycle:
 * move to nearest depot → deposit cargo → emit telemetry → complete.
 * Returns FAILURE if no active HAUL task; RUNNING while in transit; SUCCESS on deposit.
 */
export class HaulAction extends BTNode {
  constructor(
    private readonly robot: HaulHost,
    private readonly telemetry: TelemetryRingBuffer,
    private readonly getNearestDepot: () => ResourceDepotEntity | undefined,
  ) { super() }

  tick(ctx: BTContext): NodeResult {
    const task = this.robot.taskQueue.current
    if (!task || task.type !== TaskType.HAUL) return NodeResult.FAILURE

    // Locate depot (cache id in blackboard to avoid re-querying each tick)
    let depotId = ctx.blackboard.get<number>('haulDepotId')
    let depot = depotId !== undefined
      ? (this.getNearestDepot() /* still use callback — it knows by id */ )
      : this.getNearestDepot()

    // If depot moved or was removed, re-resolve
    if (!depot) {
      this.robot.taskQueue.complete()
      this.robot.state = RobotState.IDLE
      return NodeResult.FAILURE
    }

    if (depotId === undefined) {
      ctx.blackboard.set('haulDepotId', depot.id)
      depotId = depot.id
    }

    // Move toward depot
    const dist = Math.hypot(this.robot.x - depot.x, this.robot.y - depot.y)
    if (dist >= 120) {
      this.robot.targetX = depot.x
      this.robot.targetY = depot.y
      this.robot.state = RobotState.HAULING
      return NodeResult.RUNNING
    }

    // At depot — deposit all cargo
    const totalBefore = [...this.robot.cargo.values()].reduce((s, v) => s + v, 0)
    depot.deposit(this.robot.cargo) // clears robot cargo

    this.telemetry.append({
      type: TelemetryEventType.TASK_COMPLETED,
      robotId: this.robot.id,
      timestamp: performance.now(),
      data: { taskType: TaskType.HAUL, depotId: depot.id, deposited: totalBefore },
    })

    ctx.blackboard.delete('haulDepotId')
    this.robot.taskQueue.complete()
    this.robot.state = RobotState.IDLE
    return NodeResult.SUCCESS
  }
}
