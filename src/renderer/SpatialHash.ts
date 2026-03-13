export class SpatialHash<T extends { x: number; y: number }> {
  private cells = new Map<string, T[]>()
  private cellSize: number

  constructor(cellSize = 200) {
    this.cellSize = cellSize
  }

  private key(cx: number, cy: number): string {
    return `${cx},${cy}`
  }

  private cellOf(x: number, y: number): [number, number] {
    return [Math.floor(x / this.cellSize), Math.floor(y / this.cellSize)]
  }

  insert(item: T): void {
    const [cx, cy] = this.cellOf(item.x, item.y)
    const k = this.key(cx, cy)
    let cell = this.cells.get(k)
    if (!cell) { cell = []; this.cells.set(k, cell) }
    cell.push(item)
  }

  remove(item: T): void {
    const [cx, cy] = this.cellOf(item.x, item.y)
    const k = this.key(cx, cy)
    const cell = this.cells.get(k)
    if (!cell) return
    const idx = cell.indexOf(item)
    if (idx >= 0) cell.splice(idx, 1)
  }

  query(x: number, y: number, w: number, h: number): T[] {
    const results: T[] = []
    const x0 = Math.floor(x / this.cellSize)
    const y0 = Math.floor(y / this.cellSize)
    const x1 = Math.floor((x + w) / this.cellSize)
    const y1 = Math.floor((y + h) / this.cellSize)
    for (let cx = x0; cx <= x1; cx++) {
      for (let cy = y0; cy <= y1; cy++) {
        const cell = this.cells.get(this.key(cx, cy))
        if (cell) results.push(...cell)
      }
    }
    return results
  }

  clear(): void { this.cells.clear() }
}
