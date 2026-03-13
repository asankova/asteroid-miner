## ADDED Requirements

### Requirement: Flag-Based Discovery Prerequisite
Research nodes with unlock_type=DISCOVERY SHALL become available only when their trigger_flag is set to true in the global flag registry. Once available, the node still requires RP to complete.

#### Scenario: Discovery flag gate
- **WHEN** XENOMINERALOGY_UNLOCK_TRIGGER flag is set to true
- **THEN** the Xenomineralogy T1 research node changes status from LOCKED to AVAILABLE

### Requirement: Flag Registry Persistence
All discovery flags SHALL be persisted as part of the game save state. Flags set before save SHALL remain set after load.

#### Scenario: Flag persistence
- **WHEN** XENOMINERALOGY_UNLOCK_TRIGGER is set and game is saved then loaded
- **THEN** the flag is still true after load and Xenomineralogy T1 remains AVAILABLE
