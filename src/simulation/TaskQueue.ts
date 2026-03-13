export enum TaskType {
  MINE = 'MINE', HAUL = 'HAUL', BUILD = 'BUILD',
  SURVEY = 'SURVEY', RECHARGE = 'RECHARGE', PATROL = 'PATROL', FABRICATE = 'FABRICATE'
}

export enum TaskSource { PLAYER = 'PLAYER', AUTOMATION = 'AUTOMATION', SELF = 'SELF' }

export interface RobotTask {
  id: number
  type: TaskType
  priority: number // 0=emergency, 1=player-direct, 2=automation, 3=idle
  source: TaskSource
  targetId?: number       // asteroid or structure id
  targetX?: number
  targetY?: number
  payload?: Record<string, unknown>
}

let _taskId = 1

export class TaskQueue {
  private queue: RobotTask[] = []
  private activeTask: RobotTask | null = null

  assign(task: Omit<RobotTask, 'id'>): RobotTask {
    const t: RobotTask = { ...task, id: _taskId++ }
    // Preempt active task if higher priority
    if (this.activeTask && t.priority < this.activeTask.priority) {
      this.queue.unshift(this.activeTask) // re-queue current
      this.activeTask = t
      return t
    }
    // Binary insert by priority
    let lo = 0, hi = this.queue.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.queue[mid].priority <= t.priority) lo = mid + 1
      else hi = mid
    }
    this.queue.splice(lo, 0, t)
    return t
  }

  next(): RobotTask | null {
    if (this.activeTask) return this.activeTask
    if (this.queue.length === 0) return null
    this.activeTask = this.queue.shift()!
    return this.activeTask
  }

  complete(): void { this.activeTask = null }

  cancel(taskId: number): boolean {
    if (this.activeTask?.id === taskId) { this.activeTask = null; return true }
    const idx = this.queue.findIndex(t => t.id === taskId)
    if (idx >= 0) { this.queue.splice(idx, 1); return true }
    return false
  }

  get current(): RobotTask | null { return this.activeTask }
  get length(): number { return this.queue.length + (this.activeTask ? 1 : 0) }
}
