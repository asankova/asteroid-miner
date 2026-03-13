## ADDED Requirements

### Requirement: Health Degradation Over Time
Each structure SHALL lose health at its type-specific degradation rate per in-game hour. A Fusion Reactor degrades faster than a Storage Depot. Health is clamped to [0, 100].

#### Scenario: Degradation rate
- **WHEN** 1 in-game hour elapses
- **THEN** each structure's health decreases by its health_degradation_rate value

### Requirement: Efficiency Penalty Below 50% Health
When a structure's health drops below 50%, its processing throughput SHALL be penalized by (50 - health)% reduction. At 0% health, the structure SHALL stop functioning entirely and emit a STRUCTURE_FAILED event.

#### Scenario: Health efficiency penalty
- **WHEN** a Smelter's health is 30%
- **THEN** its throughput is reduced by 20% (50 - 30 = 20%)

### Requirement: Auto-Repair Task Generation
The Repair Bay SHALL scan all structures within its service range every 60 seconds and generate REPAIR tasks for structures below 70% health. Repair restores 30% health per task completion.

#### Scenario: Auto-repair dispatch
- **WHEN** a structure within Repair Bay range drops below 70% health
- **THEN** a REPAIR task is enqueued to an available Repair Bay robot within 60 seconds
