## ADDED Requirements

### Requirement: Four Radial Biome Zones
The field biome system SHALL define four biome zones by radial distance from field center: Inner Ore Belt (0–30%), Middle Mixed Belt (30–60%), Outer Volatile Belt (60–85%), Ancient Debris Field (85–100%). Each zone SHALL have a distinct asteroid type probability table.

#### Scenario: Biome assignment by position
- **WHEN** an asteroid is placed at 90% of max field radius
- **THEN** it is assigned to Ancient Debris Field biome

### Requirement: Density Field via Layered Noise
Asteroid cluster density SHALL be determined by a two-layer simplex noise function: a low-frequency layer for large-scale density variation and a high-frequency layer for local cluster texture. Dense areas SHALL have significantly higher asteroid count than sparse areas.

#### Scenario: Cluster density variation
- **WHEN** field generation completes
- **THEN** the densest 10% of space contains at least 40% of all asteroids

### Requirement: Visual Biome Distinction
Each biome zone SHALL have a distinct ambient color tint applied to its asteroid sprites and background dust layer so zones are visually distinguishable at LOD L0.

#### Scenario: Biome visual identity
- **WHEN** camera is at L0 zoom level
- **THEN** the four biome zones are distinguishable by color tint
