## Why

Raw ore is worthless until refined. A multi-stage processing chain — smelter, refinery, fabricator — turns asteroid extraction into usable materials and components. This is the "factory" layer that makes the game feel like Factorio in space: designing efficient pipelines is a core gameplay loop, and bottlenecks create interesting problems to solve.

## What Changes

- Define 3 material tiers: **Raw ore** (extracted directly), **Refined materials** (processed in smelters: iron bar, nickel alloy, carbon fiber, silica glass, cryo-ice, rare-earth concentrate), **Advanced components** (fabricated: hull plate, circuit board, drive cell, coolant pack, memory crystal)
- Implement processing structures: **Ore Smelter** (raw→refined, medium throughput), **Refinery** (refined→advanced, slow but high value), **Cryogenic Processor** (ice→coolant/propellant), **Molecular Assembler** (advanced components, requires power + multiple inputs)
- Add pipeline logistics: internal conveyor belts within structures + external haul routes for Hauler robots
- Implement throughput simulation: each structure has input/output buffer sizes, processing rate, and power consumption; buffers block when full
- Add recycler: convert low-grade output or damaged components back into refined materials at 60% efficiency
- Track material flow metrics: production rates per material, bottleneck detection, efficiency scores

## Capabilities

### New Capabilities
- `material-tier`: Data model for raw/refined/advanced materials with recipes and conversion ratios
- `processing-structure`: Smelter/refinery/fabricator entities with buffer, rate, and power modeling
- `pipeline-logistics`: Internal belt system and hauler-route handoff between processing structures
- `throughput-simulation`: Per-tick buffer drain/fill with backpressure propagation
- `flow-metrics`: Real-time production rate tracking and bottleneck identification

### Modified Capabilities

## Impact

- Creates the full economic loop: asteroid → ore → refined → advanced → structures/robots
- Throughput simulation must run efficiently for 20+ concurrent structures
- Processing structure placement and pipeline design is a major gameplay surface
- Advanced components are gated materials for tech-tree unlocks and automation tier upgrades
