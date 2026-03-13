## ADDED Requirements

### Requirement: Integrity Damage per Mining Task
Each completed mining task SHALL reduce the target asteroid's structural_integrity by a value sampled from a normal distribution with tool-specific mean and variance. Integrity SHALL be clamped to [0.0, 1.0].

#### Scenario: Percussive drill damage
- **WHEN** a Percussive Drill mining task completes
- **THEN** the asteroid's structural_integrity decreases by a value sampled from N(0.05, 0.01)

### Requirement: Crack Event at 30% Threshold
When structural_integrity drops below 0.30 for the first time, a crack event SHALL be emitted and a visual crack overlay SHALL be applied to the asteroid sprite.

#### Scenario: Crack event emission
- **WHEN** structural_integrity crosses below 0.30
- **THEN** exactly one CRACK_EVENT is emitted and crack visual overlay is applied

### Requirement: Fragmentation at Zero Integrity
When structural_integrity reaches 0.0, a FRAGMENT_EVENT SHALL be emitted, the asteroid entity SHALL be removed from the field, and 2–5 child asteroids SHALL be created via the asteroid generator's addAsteroid API.

#### Scenario: Fragmentation child count
- **WHEN** an asteroid fragments
- **THEN** between 2 and 5 child asteroids are created, determined by parent mass
