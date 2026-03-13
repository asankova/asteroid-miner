import { Renderer } from './renderer/index.ts'
import { AsteroidField } from './world/index.ts'
import { SimulationManager } from './simulation/index.ts'
import { RobotType } from './types/index.ts'
import type { AsteroidData, RobotData } from './types/index.ts'

// ── Bootstrap ──────────────────────────────────────────────────────────────

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
const renderer = new Renderer(canvas)

// ── World generation ───────────────────────────────────────────────────────

const seed = Date.now() ^ (Math.random() * 0x100000000)
const field = new AsteroidField(seed)
field.generate(1500)

const asteroidData: AsteroidData[] = field.getVisibleData()
renderer.loadField(asteroidData)

// ── Simulation ─────────────────────────────────────────────────────────────

const sim = new SimulationManager()
// Pass full asteroid data (with resource concentration maps) so miners can calculate yields
sim.setAsteroids(field.asteroids)

// Spawn initial robot squad near field center
sim.spawnRobot(RobotType.SCOUT)
sim.spawnRobot(RobotType.MINER)
sim.spawnRobot(RobotType.MINER)
sim.spawnRobot(RobotType.HAULER)
sim.spawnRobot(RobotType.BUILDER)

// Give miners something to do: send them to the first few asteroids
const mineable = asteroidData.filter(a => a.type === 'M' || a.type === 'S').slice(0, 3)
const miners = Array.from(sim.robots.values()).filter(r => r.type === RobotType.MINER)
mineable.forEach((asteroid, i) => {
  if (miners[i]) sim.commandMine(miners[i].id, asteroid.id)
})

// ── Click interaction: right-click asteroid to send selected miner ─────────

let selectedRobotId: number | null = null

canvas.addEventListener('click', (e) => {
  const world = renderer.camera.screenToWorld(e.clientX * devicePixelRatio, e.clientY * devicePixelRatio)
  const viewport = renderer.camera.getViewport()
  const nearby = renderer.spatialHash.query(world.x - 500, world.y - 500, 1000, 1000)

  // Find closest asteroid to click
  let closest: AsteroidData | null = null
  let closestDist = Infinity
  for (const a of nearby) {
    const d = Math.hypot(a.x - world.x, a.y - world.y)
    if (d < a.radius + 200 && d < closestDist) {
      closest = a
      closestDist = d
    }
  }

  if (closest) {
    // Send the first available miner
    const miner = Array.from(sim.robots.values()).find(r => r.type === RobotType.MINER)
    if (miner) {
      sim.commandMine(miner.id, closest.id)
      console.log(`[CMD] Miner ${miner.id} → asteroid ${closest.id} (${closest.type}) at (${closest.x.toFixed(0)}, ${closest.y.toFixed(0)})`)
    }
  }

  void viewport; void selectedRobotId
})

// ── Telemetry log ──────────────────────────────────────────────────────────

const eventLog: string[] = []
const eventLogEl = document.getElementById('ui-overlay')

function updateEventLog(): void {
  if (!eventLogEl) return
  const recent = eventLog.slice(-5)
  eventLogEl.style.cssText = `
    position: fixed; bottom: 12px; left: 12px;
    font: 11px/1.7 monospace; color: #8fa; pointer-events: none;
    background: rgba(0,0,0,0.55); padding: 6px 10px; border-radius: 4px;
    max-width: 420px;
  `
  eventLogEl.textContent = recent.join('\n')
}

// ── Main game loop ─────────────────────────────────────────────────────────

let lastSimTime = performance.now()
let telemetryPoll = 0

function loop(now: number): void {
  // Simulation tick
  const dt = Math.min((now - lastSimTime) / 1000, 0.1) // cap at 100ms
  lastSimTime = now
  sim.tick(dt)

  // Drain telemetry at ~10Hz
  telemetryPoll += dt
  if (telemetryPoll >= 0.1) {
    telemetryPoll = 0
    const events = sim.drainTelemetry()
    for (const ev of events) {
      const robot = sim.robots.get(ev.robotId)
      const typeLabel = robot ? robot.type : '?'
      eventLog.push(`[${typeLabel}#${ev.robotId}] ${ev.type}${ev.data?.targetId ? ` → #${ev.data.targetId}` : ''}`)
    }
    if (events.length > 0) updateEventLog()
  }

  // Render
  const robotData: RobotData[] = sim.getRobotData()
  renderer.render({ asteroids: asteroidData, robots: robotData }, now)

  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

console.log(`[AsteroidMiner] Initialized — ${asteroidData.length} asteroids, ${sim.robots.size} robots, seed: ${seed}`)
