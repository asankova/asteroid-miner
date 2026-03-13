import { RobotType, FIELD_SIZE } from '../types/index.ts'
import type { RobotData } from '../types/index.ts'
import { RobotEntity } from './RobotEntity.ts'
import { TelemetryRingBuffer } from './Telemetry.ts'
import type { TelemetryEvent } from './Telemetry.ts'
import { TaskType, TaskSource } from './TaskQueue.ts'
import type { AsteroidFullData } from '../world/AsteroidField.ts'

export class SimulationManager {
  readonly robots: Map<number, RobotEntity> = new Map()
  readonly telemetry = new TelemetryRingBuffer()
  private nextRobotId = 1
  private asteroids: AsteroidFullData[] = []

  spawnRobot(type: RobotType, x?: number, y?: number): RobotEntity {
    const rx = x ?? FIELD_SIZE / 2 + (Math.random() - 0.5) * 1000
    const ry = y ?? FIELD_SIZE / 2 + (Math.random() - 0.5) * 1000
    const robot = new RobotEntity(
      this.nextRobotId++, type, rx, ry, this.telemetry,
      (id) => this.asteroids.find(a => a.id === id),
    )
    this.robots.set(robot.id, robot)
    return robot
  }

  setAsteroids(asteroids: AsteroidFullData[]): void {
    this.asteroids = asteroids
  }

  getAsteroid(id: number): AsteroidFullData | undefined {
    return this.asteroids.find(a => a.id === id)
  }

  commandMine(robotId: number, asteroidId: number): void {
    const robot = this.robots.get(robotId)
    const asteroid = this.asteroids.find(a => a.id === asteroidId)
    if (!robot || !asteroid) return
    robot.taskQueue.assign({
      type: TaskType.MINE,
      priority: 1,
      source: TaskSource.PLAYER,
      targetId: asteroidId,
      targetX: asteroid.x,
      targetY: asteroid.y,
    })
  }

  commandSurvey(robotId: number, asteroidId: number): void {
    const robot = this.robots.get(robotId)
    const asteroid = this.asteroids.find(a => a.id === asteroidId)
    if (!robot || !asteroid) return
    robot.taskQueue.assign({
      type: TaskType.SURVEY,
      priority: 1,
      source: TaskSource.PLAYER,
      targetId: asteroidId,
      targetX: asteroid.x,
      targetY: asteroid.y,
    })
  }

  tick(deltaTime: number): void {
    for (const robot of this.robots.values()) {
      robot.tick(deltaTime)
    }
  }

  getRobotData(): RobotData[] {
    return Array.from(this.robots.values()).map(r => r.toData())
  }

  drainTelemetry(): TelemetryEvent[] {
    return this.telemetry.drain()
  }
}
