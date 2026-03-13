## 1. Robot Entity Model

- [ ] 1.1 Define RobotType enum (Scout, Miner, Hauler, Builder, Fabricator, Sentinel) with capability flags
- [ ] 1.2 Implement robot entity data class with energy, inventory, equipment slots, position, state
- [ ] 1.3 Implement robot factory function per type with default stats and capability flags
- [ ] 1.4 Implement equipment slot system with compatibility validation

## 2. Behaviour Tree Engine

- [ ] 2.1 Implement base Node interface with tick() → NodeResult
- [ ] 2.2 Implement Sequence, Selector composite nodes with short-circuit evaluation
- [ ] 2.3 Implement Decorator nodes: Inverter, Repeater (N times), Cooldown (N ms)
- [ ] 2.4 Implement Blackboard class with typed entry access and per-robot isolation
- [ ] 2.5 Implement LOD tick-rate multiplier injection via BT context
- [ ] 2.6 Build default behaviour trees for each of the 6 robot types

## 3. Task Queue

- [ ] 3.1 Implement priority queue data structure with O(log n) insertion
- [ ] 3.2 Define task types: MINE, HAUL, BUILD, SURVEY, RECHARGE, PATROL, FABRICATE
- [ ] 3.3 Implement task assignment API with source tagging (PLAYER, AUTOMATION, SELF)
- [ ] 3.4 Implement active task preemption on higher-priority insertion
- [ ] 3.5 Implement task cancellation (queued and active)

## 4. Robot Comms Bus

- [ ] 4.1 Implement typed pub/sub channel registry within simulation worker
- [ ] 4.2 Implement range-filtered message delivery using spatial hash grid
- [ ] 4.3 Define message types: PICKUP_READY, THREAT_DETECTED, POSITION_UPDATE, HELP_REQUEST
- [ ] 4.4 Implement SharedArrayBuffer ring buffer for comms; postMessage fallback

## 5. Telemetry

- [ ] 5.1 Implement append-only telemetry ring buffer (pre-allocated, no GC pressure)
- [ ] 5.2 Implement structured event serialization for all 6 event types
- [ ] 5.3 Implement 10Hz polling drain API on main thread
- [ ] 5.4 Implement narrative filter stream (ANOMALY_DETECTED + X-type task events)

## 6. Worker Integration

- [ ] 6.1 Wrap robot simulation loop in Web Worker
- [ ] 6.2 Implement main-thread ↔ worker message protocol (task assign, state read, telemetry drain)
- [ ] 6.3 Write simulation step orchestration: BT tick all robots, drain comms, emit telemetry
- [ ] 6.4 Benchmark 200-robot full-fidelity tick: target <4ms per simulation step
