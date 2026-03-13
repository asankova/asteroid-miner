## ADDED Requirements

### Requirement: Multi-Sector Resource Allocation
The coordinator agent SHALL manage resource allocation across multiple sectors, resolving conflicts when multiple production planners compete for the same robot types or material stocks.

#### Scenario: Conflict resolution
- **WHEN** two sectors both request all available Hauler robots
- **THEN** the coordinator allocates robots proportionally based on sector priority

### Requirement: Coordinator Decision Logging
All coordinator decisions SHALL be logged with rationale (inputs considered, output allocation, conflict resolution method). Logs SHALL be accessible in the agent reasoning panel.

#### Scenario: Decision log entry
- **WHEN** coordinator resolves a Hauler allocation conflict
- **THEN** a log entry is created showing the allocation decision and reasoning
