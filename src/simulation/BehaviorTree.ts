export enum NodeResult { SUCCESS, FAILURE, RUNNING }

export interface BTContext {
  robotId: number
  blackboard: Blackboard
  deltaTime: number
  lodMultiplier: number // 1.0 = full tick, 0.1 = slow tick
}

export abstract class BTNode {
  abstract tick(ctx: BTContext): NodeResult
}

// Runs children in order; fails on first failure
export class Sequence extends BTNode {
  constructor(private children: BTNode[]) { super() }
  tick(ctx: BTContext): NodeResult {
    for (const child of this.children) {
      const r = child.tick(ctx)
      if (r !== NodeResult.SUCCESS) return r
    }
    return NodeResult.SUCCESS
  }
}

// Runs children until one succeeds
export class Selector extends BTNode {
  constructor(private children: BTNode[]) { super() }
  tick(ctx: BTContext): NodeResult {
    for (const child of this.children) {
      const r = child.tick(ctx)
      if (r !== NodeResult.FAILURE) return r
    }
    return NodeResult.FAILURE
  }
}

// Inverts result
export class Inverter extends BTNode {
  constructor(private child: BTNode) { super() }
  tick(ctx: BTContext): NodeResult {
    const r = this.child.tick(ctx)
    if (r === NodeResult.SUCCESS) return NodeResult.FAILURE
    if (r === NodeResult.FAILURE) return NodeResult.SUCCESS
    return NodeResult.RUNNING
  }
}

// Repeats child N times (or until failure)
export class Repeater extends BTNode {
  private count = 0
  constructor(private child: BTNode, private maxCount: number) { super() }
  tick(ctx: BTContext): NodeResult {
    if (this.count >= this.maxCount) { this.count = 0; return NodeResult.SUCCESS }
    const r = this.child.tick(ctx)
    if (r === NodeResult.FAILURE) { this.count = 0; return NodeResult.FAILURE }
    if (r === NodeResult.SUCCESS) this.count++
    return NodeResult.RUNNING
  }
}

// Only ticks child every `intervalMs`; returns RUNNING otherwise
export class Cooldown extends BTNode {
  private lastTick = 0
  constructor(private child: BTNode, private intervalMs: number) { super() }
  tick(ctx: BTContext): NodeResult {
    const now = performance.now()
    if (now - this.lastTick < this.intervalMs) return NodeResult.RUNNING
    this.lastTick = now
    return this.child.tick(ctx)
  }
}

// Condition node: evaluates a predicate
export class Condition extends BTNode {
  constructor(private predicate: (ctx: BTContext) => boolean) { super() }
  tick(ctx: BTContext): NodeResult {
    return this.predicate(ctx) ? NodeResult.SUCCESS : NodeResult.FAILURE
  }
}

// Action node: executes an action function
export class Action extends BTNode {
  constructor(private action: (ctx: BTContext) => NodeResult) { super() }
  tick(ctx: BTContext): NodeResult { return this.action(ctx) }
}

// Per-robot key-value store
export class Blackboard {
  private data = new Map<string, unknown>()
  get<T>(key: string): T | undefined { return this.data.get(key) as T | undefined }
  set<T>(key: string, value: T): void { this.data.set(key, value) }
  has(key: string): boolean { return this.data.has(key) }
  delete(key: string): boolean { return this.data.delete(key) }
}

// Re-export a BehaviorTree alias for named export in index
export { BTNode as BehaviorTree }
