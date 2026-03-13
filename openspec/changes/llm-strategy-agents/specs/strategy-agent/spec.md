## ADDED Requirements

### Requirement: Three Tier Definitions
The strategy agent system SHALL define three agent tiers: Tier 1 (Scout Mind, context 50 events, short-horizon decisions, unlocked at Automation T3), Tier 2 (Field Director, context 500 events, multi-sector management, unlocked at T4), Tier 3 (The Architect, context 5000 events, civilization-level strategy, unlocked at T5).

#### Scenario: Tier 1 unlock gate
- **WHEN** automation tier reaches T3 and Systems Integration research is complete
- **THEN** the Scout Mind agent becomes activatable

### Requirement: Agent Decisions as Proposals
All agent decisions SHALL be expressed as task proposals submitted to a proposal queue. Proposals are visible in the agent reasoning panel. The player SHALL be able to approve, modify, or reject proposals at Tier 1–4. At Tier 5, proposals are auto-approved.

#### Scenario: T4 proposal override
- **WHEN** the Field Director proposes a hauler route reassignment at T4
- **THEN** the player can reject the proposal and the reassignment does not occur

### Requirement: Compute Budget Consumption
Tier 1 agents SHALL consume 5 CP/s, Tier 2 SHALL consume 10 CP/s, Tier 3 SHALL consume 50 CP/s from the Compute Budget. If CP drops to zero, the affected agent pauses reasoning until CP recovers.

#### Scenario: Agent pause on CP exhaustion
- **WHEN** CP pool reaches zero and a Tier 2 agent is active
- **THEN** the Tier 2 agent pauses reasoning and its context window UI shows "Insufficient Compute"
