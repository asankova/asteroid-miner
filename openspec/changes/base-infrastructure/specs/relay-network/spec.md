## ADDED Requirements

### Requirement: Coverage Radius per Beacon
Each Relay Beacon SHALL provide a circular coverage zone of radius R (default 800 world units, Tier 2: 1200, Tier 3: 1800). The coverage map SHALL be recomputed whenever a beacon is placed, destroyed, or upgraded.

#### Scenario: Coverage map update on placement
- **WHEN** a new Relay Beacon is placed
- **THEN** the coverage map is recomputed within one simulation tick

### Requirement: Coordination Bonus in Coverage
Robots within relay coverage SHALL receive a +20% behavior tree decision quality bonus (modeled as a +20% modifier on task completion speed). Robots outside coverage SHALL operate without this bonus.

#### Scenario: Out-of-coverage penalty
- **WHEN** a robot operates outside all relay beacon coverage zones
- **THEN** its task completion speed is 1.0x (no bonus, no penalty)
