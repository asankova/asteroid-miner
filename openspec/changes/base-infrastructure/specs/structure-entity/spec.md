## ADDED Requirements

### Requirement: Eight Structure Types
The structure system SHALL define eight structure types: Command Hub, Solar Array, Fusion Reactor, Storage Depot, Relay Beacon, Science Lab, Repair Bay, Launch Rail. Each type SHALL have defined power_generation (or power_consumption), build_cost (advanced components), health_degradation_rate, and upgrade_tiers (1–3).

#### Scenario: Structure type enumeration
- **WHEN** the structure registry is queried
- **THEN** all eight structure types are available with valid default stats

### Requirement: Placement Validation
Structure placement SHALL validate: sufficient advanced components in storage, Builder robot available, no overlap with existing structures or asteroids, within relay coverage range (except first Command Hub).

#### Scenario: Insufficient components
- **WHEN** player attempts to place a Fusion Reactor without sufficient drive_cells in storage
- **THEN** placement is rejected with INSUFFICIENT_COMPONENTS error

### Requirement: Three Upgrade Tiers
Each structure SHALL support up to 3 upgrade tiers. Upgrade SHALL require components and Builder robot time. Upgrade increases throughput, efficiency, or range depending on structure type.

#### Scenario: Relay Beacon range upgrade
- **WHEN** a Relay Beacon is upgraded from Tier 1 to Tier 2
- **THEN** its coverage radius increases by 50% and the relay coverage map is recomputed
