## 1. Spatial Hash Grid

- [ ] 1.1 Implement SpatialHashGrid class with cell size 200, O(1) insert/remove/update
- [ ] 1.2 Implement radius query with cell bounding box scan and entity type filter
- [ ] 1.3 Register all entity types (robots, asteroids, structures) with grid on creation
- [ ] 1.4 Benchmark grid with 5000 entities + 100 radius queries per tick; target <1ms

## 2. LOD Simulation

- [ ] 2.1 Implement per-entity fidelity tier assignment from camera distance each tick
- [ ] 2.2 Implement BT tick scheduling: HIGH=every step, MEDIUM=1/4, LOW=suppressed
- [ ] 2.3 Implement LOW-fidelity aggregate state updater (simplified position/inventory model)
- [ ] 2.4 Implement fidelity tier transition state serialization/deserialization

## 3. Worker Thread Pool

- [ ] 3.1 Set up simulation-worker with robot BT tick loop, task queue, comms bus
- [ ] 3.2 Set up mining-worker with yield calc, structural integrity, rare yield
- [ ] 3.3 Set up metrics-worker with RP accumulation, flow metrics, growth tracking
- [ ] 3.4 Implement main ↔ worker message protocol (commands, bulk position transfer, telemetry drain)
- [ ] 3.5 Implement transferable Float32Array for bulk entity position updates

## 4. Compute Budget

- [ ] 4.1 Implement CP pool with generation from Science Labs and Relay Beacons
- [ ] 4.2 Implement player sector CP allocation via compute overlay UI binding
- [ ] 4.3 Implement CP deficit detection and automatic sector downgrade cascade
- [ ] 4.4 Implement 2× threat multiplier for Architect entities in LOW-fidelity sectors

## 5. Performance Overlay

- [ ] 5.1 Implement F3 toggle for overlay layer above canvas
- [ ] 5.2 Implement per-sector stats display (entity count, fidelity, CP, tick rate)
- [ ] 5.3 Implement 60-frame rolling frame time graph with simulation/render/UI breakdown
- [ ] 5.4 Wire overlay data to worker metric outputs via polling
