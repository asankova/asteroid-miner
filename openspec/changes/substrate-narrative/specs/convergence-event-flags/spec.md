## ADDED Requirements

### Requirement: Five Convergence Flags
The system SHALL maintain five convergence flags (cf_1 through cf_5) set by resonance band transitions: cf_1 at Latent band, cf_2 at Active band, cf_3 at Resonant band, cf_4 at Convergent band, cf_5 when rf_12 is set (final revelation flag). Each convergence flag, when set, unlocks a specific deep event chain in the stellaris-event-system.

#### Scenario: cf_3 unlock
- **WHEN** substrate resonance reaches Resonant band (100.0)
- **THEN** cf_3 is set and the event chain associated with cf_3 becomes eligible to fire

### Requirement: Convergence Flag Persistence
All convergence flags SHALL be persisted in the NSM state blob in the save file.

#### Scenario: Convergence flag persistence
- **WHEN** cf_2 is set and game is saved then loaded
- **THEN** cf_2 remains set after load
