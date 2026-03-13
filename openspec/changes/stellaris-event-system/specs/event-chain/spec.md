## ADDED Requirements

### Requirement: Chain Definition
An event chain SHALL be a sequence of events connected by CHAIN_ADVANCE consequences. Each step in the chain SHALL have its own conditions, prose, and choices. Chain progression SHALL be tracked per playthrough.

#### Scenario: Chain step advancement
- **WHEN** player selects a choice with consequence CHAIN_ADVANCE for chain "ARCHITECTS_FIRST_CONTACT" step 2
- **THEN** chain step counter advances to 2 and step 2's event becomes eligible to fire

### Requirement: Branching Chains
Chain steps MAY have branching: different choices advance to different next steps. The branch taken SHALL be recorded in the chain's state for later reference.

#### Scenario: Chain branch selection
- **WHEN** player selects choice A (which advances to step 3a) vs choice B (step 3b)
- **THEN** the chain follows the selected branch and subsequent events reflect the choice made

### Requirement: Chain State Persistence
Chain progression state (current step, branches taken, completion status) SHALL be persisted in save state.

#### Scenario: Chain state on load
- **WHEN** a game is saved at chain step 4 and reloaded
- **THEN** the chain resumes from step 4 with all prior branch choices preserved
