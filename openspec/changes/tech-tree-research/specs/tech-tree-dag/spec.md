## ADDED Requirements

### Requirement: DAG Validation at Load
The tech tree DAG SHALL be validated at game startup. Validation SHALL detect: circular dependencies, missing prerequisite references, and duplicate node ids. Any validation error SHALL halt startup with a descriptive error message.

#### Scenario: Circular dependency detection
- **WHEN** a tech tree data file contains a cycle (node A requires B, B requires A)
- **THEN** startup halts with CIRCULAR_DEPENDENCY error identifying the nodes

### Requirement: Five Branch Classification
All nodes SHALL be assigned to one of five branches: Mining Engineering, Robotics, Materials Science, Systems Integration, Xenomineralogy. Branch assignment SHALL be used for visual clustering in the tech tree UI.

#### Scenario: Branch membership
- **WHEN** the tech tree is loaded
- **THEN** every node has exactly one branch assignment from the five defined branches

### Requirement: Unlock State Persistence
The unlock state of all nodes (LOCKED, AVAILABLE, IN_QUEUE, COMPLETED) SHALL be persisted as part of the game save state.

#### Scenario: Save/load unlock state
- **WHEN** game is saved with 15 nodes completed and reloaded
- **THEN** the same 15 nodes are in COMPLETED state after load
