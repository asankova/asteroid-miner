## 1. Core Generator Infrastructure

- [ ] 1.1 Implement seeded PRNG wrapper (mulberry32 or similar) for deterministic generation
- [ ] 1.2 Implement Bridson's Poisson disk sampling algorithm for position distribution
- [ ] 1.3 Implement two-layer simplex noise density field (low-freq + high-freq)
- [ ] 1.4 Define 4-biome radial zone classifier with boundary thresholds

## 2. Asteroid Type System

- [ ] 2.1 Define 8 asteroid type enums with display names and visual identifiers
- [ ] 2.2 Implement per-biome weighted type probability tables
- [ ] 2.3 Implement type assignment during generation based on biome and noise value
- [ ] 2.4 Implement X-type masking in player-facing query interface

## 3. Resource Concentration Maps

- [ ] 3.1 Implement 8×8 float32 concentration grid data structure per asteroid per resource
- [ ] 3.2 Implement resource map generation from type seed (gaussian blobs per resource type)
- [ ] 3.3 Implement bilinear interpolation sampler for mining position queries
- [ ] 3.4 Implement X-type map mask (zero on read until survey flag set)

## 4. Physical Properties

- [ ] 4.1 Implement property assignment tables (mass, rotation_speed, integrity ranges by type)
- [ ] 4.2 Implement structural_integrity mutation on mining events with crack/fragment thresholds
- [ ] 4.3 Implement fragment event → addAsteroid child spawning with proportional resource split
- [ ] 4.4 Wire rotation_speed as GPU attribute for shader-side rotation computation

## 5. Field Data Model

- [ ] 5.1 Design field data structure: asteroid array, spatial hash registration, biome metadata
- [ ] 5.2 Implement serialization/deserialization of full field state (save/load)
- [ ] 5.3 Implement addAsteroid runtime API for fragmentation events
- [ ] 5.4 Profile generation at count=5000; ensure <500ms completion
