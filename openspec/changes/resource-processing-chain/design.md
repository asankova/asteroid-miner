## Context

The processing chain converts raw ore into refined materials and advanced components. It is the "factory" layer — the game's Factorio dimension. The chain must simulate throughput realistically: structures have buffers, processing rates, and power requirements. Backpressure propagates upstream when buffers fill. The chain runs in the simulation worker alongside robot agents. With 20+ structures active, per-tick simulation must be efficient.

## Goals / Non-Goals

**Goals:**
- Three-tier material system: raw ore → refined materials → advanced components
- Four structure types with buffer/rate/power simulation
- Pipeline logistics: internal belts and hauler-route handoffs
- Throughput backpressure propagation
- Real-time flow metrics and bottleneck detection

**Non-Goals:**
- Fluid simulation (ice/coolant are treated as discrete item stacks, not fluid volumes)
- Conveyor belt routing UI (pipelines auto-route in v1; visual routing in later proposal)
- Cross-field logistics networks (handled in base-infrastructure)

## Decisions

**Discrete item stacks, not continuous flow**
Materials are represented as integer unit stacks rather than continuous flow values. Each processing tick consumes N input units and produces M output units. This is simpler to reason about, serialize, and balance. Alternative: continuous flow rates — adds float precision issues and is harder to make feel "satisfying" with integer display.

**Buffer as a bounded FIFO queue**
Each structure has an input buffer (max 100 stacks) and output buffer (max 100 stacks). When input buffer is empty, structure idles. When output buffer is full, structure blocks. Haulers drain output buffers; input is fed by upstream output or robot haul deliveries.

**Processing tick rate: 1 Hz**
Structures evaluate their buffers and process one batch per second. This is coarse enough to be cheap computationally but fine enough that players can observe the chain working. Rate multipliers from upgrades and tech tree are applied as multipliers on batch size, not tick frequency.

**Hauler route as a named route object**
A hauler route connects an output buffer of structure A to an input buffer of structure B. Hauler robots serving a route self-assign HAUL tasks when output buffer crosses a threshold. Routes are created by the player or production planner and stored as persistent game state.

## Risks / Trade-offs

[20+ structures at 1Hz tick with backpressure propagation is O(n) per tick] → Trivially cheap; 20 structure ticks at 1Hz is negligible compared to robot BT evaluation.

[Balance between ore input and refined output ratios is hard to get right] → Define ratios in a data file; expose to balance testing without code changes.

[Hauler route deadlocks (circular dependencies)] → Detect cycles at route creation time; reject circular routes.
