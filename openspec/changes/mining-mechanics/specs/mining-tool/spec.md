## ADDED Requirements

### Requirement: Four Tool Types with Distinct Profiles
The system SHALL define four tool types: Percussive Drill, Thermal Lance, Explosive Charge, and Precision Laser. Each tool SHALL have distinct values for speed_modifier, energy_cost_per_task, integrity_damage_mean, integrity_damage_variance, precision_modifier, and asteroid_type_compatibility_weights.

#### Scenario: Thermal Lance on C-type
- **WHEN** a Thermal Lance is used on a C-type (carbonaceous) asteroid
- **THEN** its yield rate is multiplied by the C-type compatibility weight (>1.0 for Thermal Lance)

### Requirement: Equipment Slot Compatibility
Tools SHALL only be equippable in robot equipment slots of compatible type. Percussive Drill, Thermal Lance, and Precision Laser require CAN_MINE. Explosive Charge requires CAN_MINE and a minimum robot tier of Tier 2.

#### Scenario: Incompatible tool assignment
- **WHEN** an Explosive Charge is assigned to a Tier 1 Miner robot
- **THEN** the assignment is rejected with INCOMPATIBLE_TOOL error
