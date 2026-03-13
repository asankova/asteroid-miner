export enum TelemetryEventType {
  TASK_STARTED = 'TASK_STARTED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  ENERGY_LOW = 'ENERGY_LOW',
  ANOMALY_DETECTED = 'ANOMALY_DETECTED',
  POSITION_UPDATE = 'POSITION_UPDATE',
  STATE_CHANGE = 'STATE_CHANGE',
}

export interface TelemetryEvent {
  type: TelemetryEventType
  robotId: number
  timestamp: number
  data?: Record<string, unknown>
}

const RING_SIZE = 4096

export class TelemetryRingBuffer {
  private buffer: TelemetryEvent[] = new Array(RING_SIZE)
  private writeHead = 0
  private readHead = 0

  append(event: TelemetryEvent): void {
    this.buffer[this.writeHead % RING_SIZE] = event
    this.writeHead++
    // If we overflow, advance read head
    if (this.writeHead - this.readHead > RING_SIZE) {
      this.readHead = this.writeHead - RING_SIZE
    }
  }

  drain(): TelemetryEvent[] {
    const events: TelemetryEvent[] = []
    while (this.readHead < this.writeHead) {
      events.push(this.buffer[this.readHead % RING_SIZE])
      this.readHead++
    }
    return events
  }

  get pendingCount(): number { return this.writeHead - this.readHead }
}
