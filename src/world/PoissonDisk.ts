export interface PoissonPoint { x: number; y: number }

export function poissonDisk(
  width: number,
  height: number,
  minDist: number,
  maxPoints: number,
  rng: () => number
): PoissonPoint[] {
  const cellSize = minDist / Math.SQRT2
  const gridW = Math.ceil(width / cellSize)
  const gridH = Math.ceil(height / cellSize)
  const grid: (PoissonPoint | null)[] = new Array(gridW * gridH).fill(null)
  const active: PoissonPoint[] = []
  const points: PoissonPoint[] = []

  const gridIdx = (x: number, y: number) => Math.floor(x / cellSize) + Math.floor(y / cellSize) * gridW

  const inBounds = (p: PoissonPoint) => p.x >= 0 && p.x < width && p.y >= 0 && p.y < height

  const tooClose = (p: PoissonPoint): boolean => {
    const cx = Math.floor(p.x / cellSize)
    const cy = Math.floor(p.y / cellSize)
    const r = 2
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const nx = cx + dx; const ny = cy + dy
        if (nx < 0 || nx >= gridW || ny < 0 || ny >= gridH) continue
        const neighbor = grid[nx + ny * gridW]
        if (!neighbor) continue
        const ddx = neighbor.x - p.x; const ddy = neighbor.y - p.y
        if (ddx * ddx + ddy * ddy < minDist * minDist) return true
      }
    }
    return false
  }

  // Start with a random point
  const start: PoissonPoint = { x: rng() * width, y: rng() * height }
  grid[gridIdx(start.x, start.y)] = start
  active.push(start)
  points.push(start)

  const K = 30 // candidates per active point
  while (active.length > 0 && points.length < maxPoints) {
    const idx = Math.floor(rng() * active.length)
    const base = active[idx]
    let found = false

    for (let k = 0; k < K; k++) {
      const angle = rng() * Math.PI * 2
      const dist = minDist * (1 + rng())
      const candidate: PoissonPoint = {
        x: base.x + Math.cos(angle) * dist,
        y: base.y + Math.sin(angle) * dist,
      }
      if (!inBounds(candidate) || tooClose(candidate)) continue
      grid[gridIdx(candidate.x, candidate.y)] = candidate
      active.push(candidate)
      points.push(candidate)
      found = true
      if (points.length >= maxPoints) break
    }

    if (!found) active.splice(idx, 1)
  }

  return points
}
