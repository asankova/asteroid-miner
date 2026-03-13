## ADDED Requirements

### Requirement: Hauler Route Definition
The pipeline logistics system SHALL allow defining named hauler routes connecting a source structure's output buffer to a destination structure's input buffer. Each route SHALL specify a trigger threshold (route activates when source output buffer exceeds N stacks).

#### Scenario: Route activation
- **WHEN** a Smelter output buffer exceeds the route's trigger threshold
- **THEN** available Hauler robots self-assign a HAUL task for that route

### Requirement: Cycle Detection
The system SHALL reject the creation of hauler routes that would form a dependency cycle between structures.

#### Scenario: Circular route rejection
- **WHEN** a route is created that would complete a cycle between structures A→B→A
- **THEN** route creation fails with CIRCULAR_DEPENDENCY error

### Requirement: Route Capacity
Each hauler route SHALL track how many Hauler robots are currently serving it. The maximum concurrent haulers per route SHALL be configurable (default 3) to prevent over-allocation.

#### Scenario: Route hauler cap
- **WHEN** 3 haulers are already serving a route and a 4th attempts to self-assign
- **THEN** the 4th hauler is redirected to the next highest-priority unserved route
