## ADDED Requirements

### Requirement: Hidden State Object
The NSM SHALL maintain a hidden state object containing: 12 boolean revelation flags (rf_1 through rf_12), 4 float resonance accumulators (mining_res, signal_res, cognitive_res, event_res), and a convergence_index float. This state SHALL NOT be serialized to any player-facing display.

#### Scenario: NSM state isolation
- **WHEN** player opens any game UI panel
- **THEN** no NSM state values are displayed in any UI element

### Requirement: NSM State Persistence
The NSM state SHALL be persisted in the save file as an opaque JSON blob. It SHALL be restored exactly on game load.

#### Scenario: NSM persistence
- **WHEN** game is saved with rf_7=true and mining_res=23.4 and then loaded
- **THEN** rf_7 remains true and mining_res is 23.4 after load

### Requirement: Revelation Flag Setting
The NSM SHALL set revelation flags in response to specific game events: signal corpus reaching size thresholds, specific event chains completing, awakening stage transitions, and Tier 3 agent cognitive resonance exceeding thresholds. Flags are one-way (set never cleared).

#### Scenario: Flag set on corpus size
- **WHEN** signal corpus reaches 10 entries
- **THEN** revelation flag rf_3 is set to true
