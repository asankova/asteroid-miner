## ADDED Requirements

### Requirement: Seeded Deterministic Generation
The asteroid generator SHALL produce an identical field for any given integer seed. The same seed SHALL always produce the same asteroid positions, types, and resource maps.

#### Scenario: Deterministic replay
- **WHEN** the field is generated twice with the same seed
- **THEN** both generations produce byte-identical asteroid data

### Requirement: Configurable Field Size
The generator SHALL accept a count parameter between 500 and 5000 and distribute asteroids across the field accordingly. Generation SHALL complete in under 500ms for count=5000.

#### Scenario: Generation performance
- **WHEN** field is generated with count=5000
- **THEN** all asteroids are generated within 500ms on reference hardware

### Requirement: Type Assignment by Biome
Each asteroid's type SHALL be drawn from a weighted probability table determined by its biome zone. X-type asteroids SHALL only spawn in the Ancient Debris Field biome.

#### Scenario: X-type biome constraint
- **WHEN** field generation completes
- **THEN** no X-type asteroid has a position in the Inner, Middle, or Outer biome zones

### Requirement: Runtime Asteroid Addition
The generator SHALL expose an addAsteroid method that creates a new asteroid entity at a given position, derived from a parent asteroid's seed, to support fragmentation events.

#### Scenario: Fragmentation child creation
- **WHEN** addAsteroid is called with a parent asteroid ID and target position
- **THEN** a new asteroid entity is created with properties proportionally derived from the parent
