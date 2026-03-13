## ADDED Requirements

### Requirement: Full Event History
The event log SHALL store every event that has fired in the current playthrough, in chronological order, including the player's chosen response. Log entries SHALL be persisted in save state.

#### Scenario: Log completeness
- **WHEN** 47 events have fired in the current playthrough
- **THEN** the event log contains 47 entries with timestamps and player choices

### Requirement: Scrollable Log UI
The event log panel SHALL be a scrollable list with entries showing: timestamp, category icon, event title, and the choice the player made. Clicking an entry SHALL expand the full event text and choice made.

#### Scenario: Log entry expansion
- **WHEN** player clicks a log entry
- **THEN** the full event prose and chosen response are displayed in an expanded view
