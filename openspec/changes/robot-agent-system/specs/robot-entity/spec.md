## ADDED Requirements

### Requirement: Six Robot Types with Capability Flags
The robot entity model SHALL define six types: Scout, Miner, Hauler, Builder, Fabricator, Sentinel. Each type SHALL have a capability flags field (CAN_SURVEY, CAN_MINE, CAN_HAUL, CAN_BUILD, CAN_FABRICATE, CAN_DEFEND) determining valid task assignments.

#### Scenario: Miner capability validation
- **WHEN** a MINE task is assigned to a Scout robot
- **THEN** the task queue rejects the assignment with CAPABILITY_MISMATCH error

### Requirement: Energy System
Each robot SHALL have an energy value (0–100). Energy is consumed per action at type-specific rates. When energy drops below 10, the robot SHALL suspend current task and navigate to the nearest Repair Bay to recharge. Recharge restores energy to 100.

#### Scenario: Low energy suspension
- **WHEN** robot energy drops below 10
- **THEN** robot suspends current task, enqueues RECHARGE task at priority 0, navigates to nearest Repair Bay

### Requirement: Two Equipment Slots
Each robot SHALL have two equipment slots. Each slot accepts items of compatible equipment type (determined by robot type). Equipped items modify yield rates, energy costs, or capability flags.

#### Scenario: Equipment slot assignment
- **WHEN** a Thermal Lance is equipped to a Miner robot's slot 1
- **THEN** the Miner's mining yield rate is modified by the Thermal Lance efficiency multiplier
