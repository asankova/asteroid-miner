## ADDED Requirements

### Requirement: Human vs Automated Action Ratio
The automation depth display SHALL compute the ratio of player-sourced to automation-sourced task completions over the last 60 seconds and display it as a percentage bar labeled "Human / Automated."

#### Scenario: Full automation display
- **WHEN** all tasks in the last 60 seconds were automation-sourced
- **THEN** the display shows 0% Human / 100% Automated

### Requirement: Tier Context Label
The display SHALL show the current automation tier label alongside the ratio metric (e.g., "Tier 3 — Distributed Intelligence").

#### Scenario: Tier label display
- **WHEN** global tier is T3
- **THEN** the display shows "Tier 3 — Distributed Intelligence" as the tier context label
