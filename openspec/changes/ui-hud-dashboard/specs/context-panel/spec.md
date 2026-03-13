## ADDED Requirements

### Requirement: Universal Entity Detail
Clicking any robot, asteroid, or structure on the canvas SHALL open the context panel in the bottom-left HUD zone. The panel SHALL display all entity stats, current state, active task (for robots), and available player actions (for structures and robots).

#### Scenario: Robot context panel
- **WHEN** player clicks a Miner robot
- **THEN** the context panel shows: robot type, energy, equipped tools, current task, task queue length, and action buttons (Cancel Task, Assign Task, Upgrade)

### Requirement: Asteroid Context Panel
Clicking an asteroid SHALL display: asteroid type, known resources (if surveyed), structural integrity, disturbance flag (if X-type and active), and available actions (Survey, Assign Miners, Mark Priority).

#### Scenario: X-type asteroid context
- **WHEN** player clicks a Stage 2+ active X-type asteroid
- **THEN** the context panel shows a disturbance indicator alongside standard asteroid stats

### Requirement: Panel Persistence on Entity Selection Change
When a new entity is clicked while the context panel is open, the panel SHALL update in-place (no close/reopen animation) to show the new entity's data.

#### Scenario: Panel update on re-selection
- **WHEN** player clicks entity A then clicks entity B without closing the panel
- **THEN** the panel updates smoothly to entity B's data without closing
