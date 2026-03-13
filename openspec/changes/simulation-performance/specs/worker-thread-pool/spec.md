## ADDED Requirements

### Requirement: Three Specialized Workers
The worker pool SHALL contain three Web Workers: simulation-worker (robot behavior trees, task queues, comms bus), mining-worker (yield calculations, structural integrity, rare yield rolls), metrics-worker (research RP accumulation, flow metrics, growth tracking). Each worker SHALL own its data domain exclusively.

#### Scenario: Worker domain isolation
- **WHEN** a mining yield calculation is requested
- **THEN** it is processed by mining-worker, not simulation-worker

### Requirement: Main Thread Non-Blocking
No simulation computation SHALL execute on the main thread. The main thread SHALL only handle rendering, input events, and UI updates. Worker results SHALL be delivered via postMessage.

#### Scenario: Main thread simulation isolation
- **WHEN** 200 robot behavior trees are evaluated in one simulation step
- **THEN** the main thread frame time is unaffected (evaluation runs in simulation-worker)

### Requirement: Transferable ArrayBuffer Bulk Transfer
When simulation-worker sends entity position updates to the main thread for rendering, it SHALL use a transferable Float32Array containing all entity positions. The transfer SHALL zero-copy the buffer.

#### Scenario: Zero-copy position transfer
- **WHEN** simulation-worker sends 200 robot positions to main thread
- **THEN** a single transferable Float32Array is sent (not 200 individual postMessage calls)
