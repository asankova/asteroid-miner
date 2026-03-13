## ADDED Requirements

### Requirement: Inter-Cluster Expansion Proposal
When local saturation exceeds 60%, the Tier 5 Architect agent SHALL generate a frontier expansion proposal targeting an adjacent asteroid cluster. The proposal SHALL require Launch Rail infrastructure and 1000 advanced components stockpile.

#### Scenario: Expansion proposal trigger
- **WHEN** global saturation exceeds 60% and a Tier 5 agent is active
- **THEN** a frontier expansion proposal is generated and displayed as a major event card

### Requirement: Expansion Probe Deployment
When the player acknowledges a frontier expansion proposal, a probe is launched via Launch Rail. The probe establishes a new Command Hub in the target cluster. A new sector is initialized with that cluster's asteroid field.

#### Scenario: Probe launch
- **WHEN** player acknowledges the expansion proposal
- **THEN** a probe is launched from the nearest Launch Rail and a new sector begins initializing
