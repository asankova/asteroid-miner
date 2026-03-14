import { Renderer, Minimap } from './renderer/index.ts'
import { AsteroidField } from './world/index.ts'
import { SimulationManager } from './simulation/index.ts'
import { FidelityManager } from './simulation/FidelityManager.ts'
import { ComputeBudget } from './simulation/ComputeBudget.ts'
import { InfrastructureManager, StructureType, BuildState } from './infrastructure/index.ts'
import { ProcessingManager, ProcessingStructureType, Material } from './processing/index.ts'
import { RobotType, FIELD_SIZE } from './types/index.ts'
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

// ── Minimap ─────────────────────────────────────────────────────────────────

const minimap = new Minimap(renderer.camera)
minimap.buildAsteroidCache(asteroidData)

// ── Simulation ─────────────────────────────────────────────────────────────

const sim = new SimulationManager()
sim.setAsteroids(field.asteroids)

// Place resource depot at field center
sim.placeDepot(FIELD_SIZE / 2, FIELD_SIZE / 2)

const fidelity = new FidelityManager()
const cpBudget = new ComputeBudget()

// Spawn initial robots
sim.spawnRobot(RobotType.SCOUT)
sim.spawnRobot(RobotType.MINER)
sim.spawnRobot(RobotType.MINER)
sim.spawnRobot(RobotType.HAULER)
sim.spawnRobot(RobotType.BUILDER)

// Send miners to nearby asteroids
const mineable = asteroidData.filter(a => a.type === 'M' || a.type === 'S').slice(0, 3)
const miners = Array.from(sim.robots.values()).filter(r => r.type === RobotType.MINER)
mineable.forEach((asteroid, i) => {
  if (miners[i]) sim.commandMine(miners[i].id, asteroid.id)
})

// ── Infrastructure ─────────────────────────────────────────────────────────

const infra = new InfrastructureManager()
const cx = FIELD_SIZE / 2

// Place starter structures around field center (instantly activated for v1)
const hub = infra.place(StructureType.COMMAND_HUB, cx, cx)
hub.buildState = BuildState.ACTIVE
const solar1 = infra.place(StructureType.SOLAR_ARRAY, cx + 300, cx)
solar1.buildState = BuildState.ACTIVE
const solar2 = infra.place(StructureType.SOLAR_ARRAY, cx - 300, cx)
solar2.buildState = BuildState.ACTIVE
const relay = infra.place(StructureType.RELAY_BEACON, cx, cx + 400)
relay.buildState = BuildState.ACTIVE

// ── Processing ─────────────────────────────────────────────────────────────

const processing = new ProcessingManager()
const smelter = processing.place(ProcessingStructureType.ORE_SMELTER, cx + 600, cx)

// Seed smelter with some starting ore
smelter.addToInput({ material: Material.IRON_ORE, quantity: 30 })
smelter.addToInput({ material: Material.NICKEL_ORE, quantity: 20 })

// ── Controls hint (fades after 8s) ─────────────────────────────────────────

const hintsEl = document.getElementById('controls-hint') as HTMLElement | null
if (hintsEl) {
  setTimeout(() => { hintsEl.style.opacity = '0' }, 8000)
}

// ── Click interaction ──────────────────────────────────────────────────────

canvas.addEventListener('click', (e) => {
  const world = renderer.camera.screenToWorld(
    e.clientX * devicePixelRatio,
    e.clientY * devicePixelRatio
  )
  const nearby = renderer.spatialHash.query(world.x - 500, world.y - 500, 1000, 1000)
  let closest: AsteroidData | null = null
  let closestDist = Infinity
  for (const a of nearby) {
    const d = Math.hypot(a.x - world.x, a.y - world.y)
    if (d < a.radius + 200 && d < closestDist) { closest = a; closestDist = d }
  }
  if (closest) {
    const miner = Array.from(sim.robots.values()).find(r => r.type === RobotType.MINER)
    if (miner) sim.commandMine(miner.id, closest.id)
  }
})

// ── HUD ────────────────────────────────────────────────────────────────────

const hudEl = document.getElementById('hud-mount')

function updateHUD(): void {
  if (!hudEl) return
  const power = infra.getPowerState()
  const inv = processing.inventory.getAll()
  const flow = processing.getFlowMetrics()
  const fidelityStats = fidelity.getStats()

  const powerColor = power.isDeficit ? '#f66' : power.isWarning ? '#fa0' : '#6f6'
  const topMaterials = Object.entries(inv).slice(0, 6)
    .map(([mat, qty]) => `${mat.replace(/_/g,' ')}: ${qty}`).join(' · ') || 'No materials yet'

  const smelterStatus = flow[0]
    ? `${flow[0].state} (idle: ${(flow[0].idleRatio * 100).toFixed(0)}%)`
    : '—'

  hudEl.innerHTML = `
    <div style="position:fixed;top:12px;left:12px;font:12px/1.8 monospace;color:#ccc;background:rgba(0,0,0,0.65);padding:8px 14px;border-radius:5px;pointer-events:none;z-index:10;min-width:260px">
      <div style="color:#8cf;font-size:11px;letter-spacing:1px;margin-bottom:4px">ASTEROID MINER</div>
      <div>&#x26A1; <span style="color:${powerColor}">${power.totalGeneration.toFixed(0)}kW gen / ${power.totalConsumption.toFixed(0)}kW use${power.isDeficit ? ' &#x26A0; DEFICIT' : ''}</span></div>
      <div>&#x1F916; Robots: ${sim.robots.size} (H:${fidelityStats.high} M:${fidelityStats.medium} L:${fidelityStats.low})</div>
      <div>&#x1F3ED; Smelter: ${smelterStatus}</div>
      <div style="color:#aaa;font-size:11px;margin-top:4px">${topMaterials}</div>
    </div>
  `
}

// ── Telemetry log ──────────────────────────────────────────────────────────

const eventLog: string[] = []
const eventLogEl = document.getElementById('ui-overlay')

function updateEventLog(): void {
  if (!eventLogEl) return
  eventLogEl.style.cssText = 'position:fixed;bottom:12px;left:12px;font:11px/1.7 monospace;color:#8fa;pointer-events:none;background:rgba(0,0,0,0.55);padding:6px 10px;border-radius:4px;max-width:480px;z-index:10'
  eventLogEl.textContent = eventLog.slice(-6).join('\n')
}

// ── Game loop ──────────────────────────────────────────────────────────────

let lastSimTime = performance.now()
let telemetryPoll = 0
let hudPoll = 0

function loop(now: number): void {
  const dt = Math.min((now - lastSimTime) / 1000, 0.1)
  lastSimTime = now

  // Update fidelity tiers based on camera
  const robotDataForFidelity = Array.from(sim.robots.values()).map(r => ({ id: r.id, x: r.x, y: r.y }))
  fidelity.update(robotDataForFidelity, renderer.camera.x, renderer.camera.y, renderer.camera.zoom)

  // Tick simulation with fidelity
  for (const robot of sim.robots.values()) {
    if (fidelity.shouldTick(robot.id)) {
      robot.tick(dt, fidelity.getLODMultiplier(robot.id))
    }
  }

  // Tick infrastructure and processing
  infra.tick(dt)
  processing.tick(dt)

  // Update CP budget from infrastructure
  const cpRate = infra.relay.getTotalCPGeneration(Array.from(infra.structures.values()))
  cpBudget.update(cpRate)
  cpBudget.tick(dt)

  // Drain infrastructure events
  for (const ev of infra.drainEvents()) {
    eventLog.push(`[INFRA] ${ev.type}${ev.structureType ? ` — ${ev.structureType}` : ''}`)
  }

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

  // Update HUD at ~4Hz
  hudPoll += dt
  if (hudPoll >= 0.25) {
    hudPoll = 0
    updateHUD()
  }

  // Render
  const robotData: RobotData[] = sim.getRobotData()
  renderer.render({ asteroids: asteroidData, robots: robotData }, now)
  minimap.render(robotData)

  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

console.log(`[AsteroidMiner] Sprint 2 — ${asteroidData.length} asteroids, ${sim.robots.size} robots, ${infra.structures.size} structures, seed: ${seed}`)
