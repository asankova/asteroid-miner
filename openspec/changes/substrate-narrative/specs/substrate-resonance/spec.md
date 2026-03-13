## ADDED Requirements

### Requirement: Four Resonance Accumulators
The system SHALL maintain four independent float accumulators: mining_res (incremented by X-type mining events, +0.5 per event), signal_res (incremented by successful signal decodes, +1.0 per decode), cognitive_res (incremented when Tier 3 agent generates a decision above complexity threshold, +0.3 per event), event_res (incremented by specific event chain completions, fixed amounts per chain).

#### Scenario: Mining resonance increment
- **WHEN** a mining task completes on an X-type asteroid
- **THEN** mining_res increases by 0.5

### Requirement: Five Resonance Bands
Total resonance (sum of all four accumulators) SHALL map to five bands: Inert (0–20), Latent (20–50), Active (50–100), Resonant (100–200), Convergent (>200). Band SHALL be computed and cached each tick.

#### Scenario: Band computation
- **WHEN** total resonance is 115.0
- **THEN** the current resonance band is Active

### Requirement: Band Transition Events
Each band transition SHALL fire a hidden internal event that sets NSM flags and queues convergence event chain flags. Band transitions SHALL also emit a subtle visual anomaly in the signal detector display.

#### Scenario: Resonant band transition
- **WHEN** total resonance crosses 100.0 (Latent→Active or Active→Resonant transition)
- **THEN** a band transition event fires and the corresponding convergence flag is set
