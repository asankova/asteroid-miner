## Why

Mining is the primary resource-generation loop. It needs to feel tactically interesting — not just "click asteroid, get ore" — by giving players meaningful choices about tools, approach, and timing. Different asteroid types require different tools; asteroid structural integrity means aggressive mining can cause fragmentation events with cascading consequences. Mining feeds the entire economy.

## What Changes

- Define 4 tool categories for mining: **Percussive drill** (slow, efficient on S/M-type), **Thermal lance** (fast, high-energy, good on C/V-type), **Explosive charge** (area effect, fragments asteroid, high yield + risk), **Precision laser** (slow but perfect for rare-earths and X-type survey)
- Implement yield calculation: base yield = resource_density × tool_efficiency × robot_skill_level × asteroid_structural_integrity modifier
- Add structural integrity mechanics: each mining action reduces integrity; below 30% triggers crack events; at 0% asteroid fragments into 2–5 smaller bodies (new entities in the field)
- Implement resource quality tiers: ore grade A–D, grade affects downstream processing efficiency
- Add mining time model: task duration is function of tool, asteroid hardness, and robot energy level
- Implement concurrent mining limits per asteroid (too many robots = diminishing returns + integrity risk)
- Add rare yield chance: low-probability anomalous mineral drops that unlock research nodes

## Capabilities

### New Capabilities
- `mining-tool`: Tool type definitions with efficiency curves, energy costs, and asteroid-type compatibility
- `yield-calculator`: Computes resource output from tool + asteroid + robot parameters
- `structural-integrity`: Tracks asteroid health, propagates crack/fragment events on threshold breach
- `ore-grade-system`: Quality tiers assigned to extracted ore, affecting downstream processing
- `rare-yield-event`: Low-probability special mineral drops that trigger research/narrative hooks

### Modified Capabilities
- `asteroid-physics-properties`: Gains fragmentation behavior and integrity tracking (from asteroid-field-generation)

## Impact

- Core economic input; must be balanced so early game feels resource-constrained and late game feels abundant
- Fragmentation events generate new asteroid entities — field generator must support dynamic entity addition
- Rare yield events are a key hook for tech-tree unlocks and ancient-race narrative triggers
- Tool selection creates strategic depth and is the first player-facing decision point in each mining operation
