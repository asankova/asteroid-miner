## ADDED Requirements

### Requirement: Compute Points Resource
The Compute Budget system SHALL maintain a global Compute Points (CP) pool. CP is generated at 5 CP/s per active Science Lab and 2 CP/s per Tier 2+ Relay Beacon. CP is consumed continuously by sectors operating above LOW fidelity.

#### Scenario: CP generation
- **WHEN** 2 Science Labs and 3 Tier 2 Relay Beacons are active
- **THEN** the CP pool generates 16 CP/s (10 from Labs + 6 from Beacons)

### Requirement: Player CP Allocation
The player SHALL be able to allocate CP to specific sectors via the compute overlay UI. A sector at MEDIUM fidelity consumes 5 CP/s; at HIGH fidelity consumes 20 CP/s. If CP pool runs out, sectors drop to LOW fidelity.

#### Scenario: CP deficit downgrade
- **WHEN** total CP consumption exceeds CP generation for >5 seconds
- **THEN** sectors are downgraded from HIGH to MEDIUM to LOW in reverse-priority order until consumption is within budget

### Requirement: Ancient Race Danger in Low-Fidelity Sectors
The threat system SHALL apply a 2× reaction time multiplier to Architect entities operating in LOW-fidelity sectors, making them more dangerous when the player under-allocates compute to those sectors.

#### Scenario: Low-fidelity threat amplification
- **WHEN** an Architect entity is active in a LOW-fidelity sector
- **THEN** its interference events are resolved with 2× the normal effect magnitude
