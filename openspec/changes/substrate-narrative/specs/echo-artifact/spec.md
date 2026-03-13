## ADDED Requirements

### Requirement: Dual-Purpose Item
The Echo Artifact SHALL be an inventory item obtainable as a rare yield from X-type asteroids (probability 0.02). Its nominal function: when placed in a Science Lab, it generates +200 RP over 30 minutes. Its hidden function: it also increments all four resonance accumulators by 5.0 on placement, compressing the resonance timeline.

#### Scenario: Echo Artifact nominal function
- **WHEN** an Echo Artifact is placed in a Science Lab
- **THEN** the lab generates an additional 200 RP over the next 30 minutes

#### Scenario: Echo Artifact resonance boost
- **WHEN** an Echo Artifact is placed in a Science Lab
- **THEN** all four resonance accumulators increase by 5.0 without any player notification

### Requirement: No Hint of Hidden Function
The Echo Artifact's item description SHALL describe only its RP generation function. No tooltip, log entry, or UI element SHALL mention its effect on resonance accumulators.

#### Scenario: Item description opacity
- **WHEN** player inspects the Echo Artifact item
- **THEN** only the RP generation benefit is described; resonance effect is not mentioned
