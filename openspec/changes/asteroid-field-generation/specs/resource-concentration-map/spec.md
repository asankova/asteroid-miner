## ADDED Requirements

### Requirement: Per-Resource 8×8 Concentration Grid
Each asteroid SHALL maintain a 6-channel 8×8 float32 grid representing concentration (0.0–1.0) for each resource type: iron, nickel, silica, carbon, ice, rare-earths. The grid SHALL be generated from the asteroid's type and seed.

#### Scenario: Grid dimensions
- **WHEN** an asteroid is generated
- **THEN** its concentration map has exactly 6 channels each with 64 float32 values

### Requirement: Bilinear Sampling for Mining
When a mining tool drills at a specific position on an asteroid, the concentration value SHALL be computed via bilinear interpolation of the 8×8 grid at the normalized drill position.

#### Scenario: Concentration sampling
- **WHEN** a mining tool drills at position (0.5, 0.5) on an asteroid
- **THEN** the returned concentration is the bilinearly interpolated value at grid center

### Requirement: X-type Map Masking
X-type asteroids SHALL have their concentration map zeroed in player-facing state until precision laser survey completes. The underlying generated map SHALL be preserved.

#### Scenario: Pre-survey X-type
- **WHEN** player queries an unsurveyed X-type asteroid's resource map
- **THEN** all concentration values are returned as 0.0

#### Scenario: Post-survey X-type
- **WHEN** player queries an X-type asteroid after precision laser survey
- **THEN** the true concentration values are returned
