## ADDED Requirements

### Requirement: Threshold-Triggered Cascade Events
Cascade events SHALL trigger at fixed robot count thresholds: first cascade at count=50, then at 100, 200, 500, 1000. Cascade events are not randomly timed; they occur predictably at growth milestones.

#### Scenario: First cascade trigger
- **WHEN** total robot count reaches 50 for the first time
- **THEN** the first cascade event fires regardless of game time elapsed

### Requirement: Cascade Effect Duration
Each cascade event SHALL reduce growth rate by 50% for a duration of 30–120 seconds (determined by cascade type). Cascade types: POWER_SURGE (30s), COORDINATION_STORM (60s), FABRICATION_HALT (120s). Each type has a distinct visual effect.

#### Scenario: Coordination storm duration
- **WHEN** a COORDINATION_STORM cascade event fires
- **THEN** growth rate is halved for exactly 60 seconds with a visible storm visual effect across the field
