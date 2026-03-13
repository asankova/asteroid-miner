## Why

The game world is an asteroid belt with dramatically varied geology. Procedural generation must create a field that feels scientifically plausible (hard sci-fi aesthetic), gives the player meaningful strategic decisions about which asteroids to target, and is visually distinct at all zoom levels. Resource distribution should reward exploration and create emergent scarcity.

## What Changes

- Procedurally generate an asteroid field of 500–5000 asteroids on game start using a seeded PRNG
- Define 8 asteroid classifications by composition: carbonaceous (C-type), silicaceous (S-type), metallic (M-type), volatile-rich (V-type), ultra-dense (D-type), cracked hollow (H-type), ancient composite (A-type — rare), and anomalous (X-type — very rare, narrative-linked)
- Each asteroid carries a resource concentration map: 6 base resources (iron, nickel, silica, carbon, ice, rare-earths) with spatially-varied density fields per asteroid body
- Generate asteroid clusters and sparse zones via a layered noise function — the field has biomes (dense ore-rich core, volatile outer belt, ancient debris field)
- Assign physical properties: mass, rotation speed, surface texture seed, structural integrity (affects mining speed and fragmentation events)
- X-type asteroids are generated but their true properties are hidden until surveyed

## Capabilities

### New Capabilities
- `asteroid-generator`: Seeded procedural generation of asteroid field with type/composition/resource assignment
- `resource-concentration-map`: Per-asteroid 2D density map for each resource type, sampled during mining
- `field-biome-system`: Large-scale spatial zones controlling asteroid type distribution across the belt
- `asteroid-physics-properties`: Mass, rotation, structural integrity stats governing interaction behavior

### Modified Capabilities

## Impact

- Defines the game world data model; all other systems consume asteroid data
- Field generation must complete in <500ms on game start
- X-type asteroids are a contract with the narrative/ancient-race systems — they must be present and discoverable
- Resource distribution directly sets economic balance for mining and processing chain proposals
