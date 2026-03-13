## ADDED Requirements

### Requirement: Three Fidelity Tiers
The LOD simulation system SHALL classify all entities into three fidelity tiers based on distance from the camera: HIGH (≤200m), MEDIUM (200–1000m), LOW (>1000m). Tier classification SHALL update each simulation tick.

#### Scenario: Tier assignment
- **WHEN** camera is at position (5000, 5000)
- **THEN** an entity at (5100, 5000) is classified HIGH, one at (5400, 5000) is MEDIUM, one at (6500, 5000) is LOW

### Requirement: Tick Rate by Tier
HIGH entities SHALL tick every simulation step. MEDIUM entities SHALL tick every 4th simulation step. LOW entities SHALL not run behavior trees; only aggregate state is updated every 2 seconds.

#### Scenario: MEDIUM tick throttle
- **WHEN** a robot is in MEDIUM fidelity tier
- **THEN** its behavior tree is evaluated once every 4 simulation steps, not every step

### Requirement: State Continuity on Tier Transition
When an entity transitions between fidelity tiers, its state SHALL be serialized from the departing tier context and deserialized in the arriving tier context with no data loss.

#### Scenario: Tier transition continuity
- **WHEN** a robot transitions from HIGH to MEDIUM fidelity
- **THEN** its blackboard state, current task, and energy level are preserved exactly
