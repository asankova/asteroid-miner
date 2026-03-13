## Context

The robot agent system is the core simulation loop. With 200+ robots active simultaneously, it must be computationally efficient while providing rich autonomous behaviour. Each robot has a behaviour tree that ticks on every simulation step; at high robot counts this tick budget is significant. The system runs in a Web Worker (from simulation-performance proposal) so the main thread is never blocked. The 6 robot types share a common entity model with type-specific capability flags.

## Goals / Non-Goals

**Goals:**
- Support 200+ simultaneous robots at full fidelity, 1000+ at reduced LOD fidelity
- Behaviour tree engine composable, serializable, and type-safe
- Task queue supporting player, automation-system, and agent assignment sources
- Pub/sub comms bus for robot coordination
- Telemetry event stream for UI and narrative consumption

**Non-Goals:**
- Physics-based movement (robots teleport between waypoints on tick)
- Robot death/destruction (out of scope for v1; robots go dormant when damaged)
- Multiplayer synchronisation of robot state

## Decisions

**Behaviour tree over utility AI or FSM**
BTs are easier to author, debug, and extend than FSMs. Utility AI adds scoring complexity that isn't needed when tasks are explicit. BT node results (SUCCESS/FAILURE/RUNNING) map cleanly onto our task queue model.

**Flat task queue with priority integer, not a dependency graph**
Dependency resolution adds overhead that isn't needed for most robot tasks. Priorities (0=emergency, 1=player-direct, 2=automation, 3=idle) cover all cases. Complex task chains are expressed as a sequence of enqueued tasks, not a DAG.

**Shared Web Worker message bus for comms**
The comms bus is implemented as a SharedArrayBuffer ring buffer when available, falling back to postMessage. Robot-to-robot messages go through the worker; no cross-worker direct communication. Latency target: <1ms for same-worker messages.

**Telemetry as append-only event log, sampled at 10Hz for UI**
Raw events are appended to a ring buffer in the worker. The main thread polls at 10Hz and drains the buffer for UI updates. Narrative/agent consumers get a filtered event stream. This avoids flooding the main thread with per-tick updates.

## Risks / Trade-offs

[200+ BT ticks per simulation step may exceed worker budget] → LOD simulation throttles tick frequency for distant robots; profiling shows ~0.1ms per BT tick for 10-node trees.

[SharedArrayBuffer requires COOP/COEP headers] → Required HTTP headers must be configured on dev server; noted in setup docs.

[Task queue race conditions between player and automation writers] → Worker owns task queue exclusively; all writes go through worker message; no shared mutation outside worker.
