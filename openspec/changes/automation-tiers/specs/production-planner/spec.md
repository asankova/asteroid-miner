## ADDED Requirements

### Requirement: Demand-Driven Task Assignment
The production planner SHALL accept a target output rate (material type + units/minute) and compute required robot assignments across the mining and processing chain. Assignments SHALL be submitted as AUTOMATION-sourced tasks to the task queue.

#### Scenario: Planner task submission
- **WHEN** planner is configured to produce 5 iron_bars/minute
- **THEN** it calculates required Miner and Hauler assignments and enqueues corresponding tasks

### Requirement: Plan Visualization
The production planner SHALL expose a summary of active assignments and target vs actual production rates for each configured output. This SHALL be consumed by the production flow view in the UI.

#### Scenario: Plan visualization data
- **WHEN** the production flow view queries the planner
- **THEN** it receives per-output target rate, actual rate, and robot count per role
