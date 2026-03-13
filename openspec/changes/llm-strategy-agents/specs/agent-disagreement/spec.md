## ADDED Requirements

### Requirement: Cross-Tier Conflict Detection
The disagreement system SHALL detect when a higher-tier agent's proposal conflicts with a lower-tier agent's current active task or proposal. Conflict is defined as mutually exclusive resource claims (same robots, same asteroid target, or opposite expansion directions).

#### Scenario: Conflict detection
- **WHEN** Tier 2 proposes routing Haulers to Sector A while Tier 1 has them tasked to Sector B
- **THEN** a CONFLICT event is generated identifying the conflicting proposals

### Requirement: Player Choice on Conflict
When a conflict is detected, the event notification feed SHALL surface a choice card: "Agent disagreement: [Tier 1 proposal] vs [Tier 2 proposal]. Which do you approve?" The player selects one; the other is rejected.

#### Scenario: Conflict choice card
- **WHEN** a CONFLICT event is generated
- **THEN** a choice card appears in the event feed with descriptions of both conflicting proposals and an approve button for each
