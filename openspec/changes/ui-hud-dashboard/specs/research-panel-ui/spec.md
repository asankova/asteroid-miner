## ADDED Requirements

### Requirement: Horizontal DAG Visualization
The research panel SHALL render the 60+ node tech tree as a horizontal DAG with branches displayed as horizontal swimlanes. Completed nodes SHALL be solid; available nodes hollow; locked nodes grayed out.

#### Scenario: Node visual states
- **WHEN** the research panel is open
- **THEN** completed nodes are solid, available nodes are hollow, locked nodes are gray

### Requirement: Active Research Progress Bar
The currently active research item SHALL be highlighted in the DAG with an animated progress fill bar. ETA SHALL be displayed as a tooltip on hover.

#### Scenario: Active research highlight
- **WHEN** a node is in active research
- **THEN** it displays a progress fill animation proportional to completion percentage

### Requirement: Branch Swimlane Labels
Each of the five research branches SHALL have a labeled swimlane header identifying the branch name. Xenomineralogy branch SHALL display as grayed-out until its discovery unlock condition is met.

#### Scenario: Xenomineralogy before unlock
- **WHEN** XENOMINERALOGY_UNLOCK_TRIGGER flag has not been set
- **THEN** the Xenomineralogy swimlane is displayed in a grayed-out locked state with no node details visible
