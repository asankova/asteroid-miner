## Context

The game world is a single large asteroid belt (approx. 50,000 × 50,000 world units). It must be procedurally generated from a seed in <500ms at startup. The generation algorithm must produce a scientifically plausible distribution (clustered with sparse zones, type gradients from inner to outer belt), support dynamic modification (asteroid fragmentation, X-type reveal), and be fully deterministic from seed so games can be shared and replicated.

## Goals / Non-Goals

**Goals:**
- Generate 500–5000 asteroids from seed in <500ms
- Scientifically plausible type distribution: M/S-type inner belt, C/V-type outer belt
- Per-asteroid resource concentration map sampled efficiently during mining
- X-type asteroids always generated but properties hidden until surveyed
- Dynamic field: support adding child asteroids from fragmentation events

**Non-Goals:**
- Real-time asteroid movement/orbital mechanics (positions are static in v1)
- Procedural terrain within asteroids (handled by lod-visual-detail proposal)
- Network-synchronized field state across multiplayer

## Decisions

**Layered noise for spatial distribution**
Two passes of simplex noise: pass 1 generates density field (high = cluster, low = sparse), pass 2 generates type gradient (inner = metallic bias, outer = volatile bias). Asteroid positions are sampled from density field using Poisson disk sampling to prevent overlap. Alternative: pure random scatter — rejected because it creates uninteresting uniform distribution without the strategic cluster/sparse tension.

**Per-asteroid concentration map as 8×8 float grid**
Each resource type has an 8×8 float32 grid of concentration values (0–1). Mining samples the grid at the drill position, interpolated bilinearly. At 5000 asteroids × 6 resources × 64 values × 4 bytes = ~7MB total. Acceptable memory footprint. Alternative: procedural sampling per-query — avoids storage but is slower and harder to serialize.

**X-type properties stored but masked in game state**
X-type asteroids are fully generated at start (type, resource map, narrative flags) but their type is exposed as "Unknown" and resource map is zeroed in the player-facing state until precision laser survey completes. This allows deterministic narrative triggers without re-generation.

**Biome zones as 4 named radial bands**
Inner Ore Belt (0–30% radius), Middle Mixed Belt (30–60%), Outer Volatile Belt (60–85%), Ancient Debris Field (85–100%). X-type asteroids only spawn in Ancient Debris Field. Type probabilities are defined per biome as a weighted table. Simple and easy to balance.

## Risks / Trade-offs

[Poisson disk sampling at 5000 points in 50k×50k space may be slow] → Use a grid-accelerated Poisson sampler (Bridson's algorithm); O(n) guaranteed.

[8×8 concentration grid is low-resolution] → Sufficient for gameplay; players never need sub-meter precision. Can be upgraded to 16×16 post-v1.

[Fragmentation adds entities at runtime] → Field generator exposes `addAsteroid(seed, parentId, position)` for runtime additions; parent's concentration map is split proportionally.
