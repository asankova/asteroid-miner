## ADDED Requirements

### Requirement: Six Tier State Machine
The automation system SHALL maintain a global tier state (T0–T5). Tier transitions SHALL only increase (T0→T1, never T2→T1). Each tier SHALL have defined prerequisite conditions that must be satisfied before activation.

#### Scenario: Tier prerequisite gate
- **WHEN** player attempts to activate T2 without Fabricator robot type unlocked
- **THEN** activation is rejected with PREREQUISITE_NOT_MET error listing the unsatisfied conditions

### Requirement: Explicit Player Activation
Tier upgrades SHALL be explicitly initiated by player action (button press in UI). The game SHALL NOT automatically advance tiers. On activation, a confirmation dialog SHALL display what changes and what capabilities are handed to automation.

#### Scenario: Player tier activation
- **WHEN** player clicks "Activate Tier 2" and confirms
- **THEN** the global tier advances to T2 and production planner activates

### Requirement: T1 Rule Engine
At Tier 1, the system SHALL evaluate a player-editable list of if/then rules each simulation tick. Rules have the form: condition (threshold comparison on resource/robot counts) → action (enqueue task type to matching robots).

#### Scenario: T1 rule evaluation
- **WHEN** a T1 rule fires because ore_inventory > 100
- **THEN** a HAUL task is enqueued to the nearest available Hauler robot with AUTOMATION source
