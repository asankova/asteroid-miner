## ADDED Requirements

### Requirement: Autonomous Survey and Target Selection
At Tier 4, the expansion planner SHALL autonomously dispatch Scout robots to survey unsurveyed asteroids, evaluate survey results against resource thresholds, and propose new mining targets without player input.

#### Scenario: Autonomous survey dispatch
- **WHEN** automation tier is T4 and unsurveyed asteroids exist within range
- **THEN** the expansion planner dispatches available Scout robots to survey without player action

### Requirement: Expansion Proposal Notification
When the expansion planner identifies a high-value target, it SHALL notify the player via the event notification feed with a summary of expected yield before committing resources.

#### Scenario: Expansion proposal
- **WHEN** expansion planner identifies an M-type asteroid with high iron concentration
- **THEN** a notification appears: "Expansion Planner: Proposed new mining target at [coords] — high iron yield"
