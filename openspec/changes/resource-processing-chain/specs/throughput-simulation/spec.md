## ADDED Requirements

### Requirement: 1Hz Processing Tick
Each processing structure SHALL evaluate its buffers and execute one processing batch per second of game time. Processing tick SHALL run in the simulation worker thread.

#### Scenario: Processing tick timing
- **WHEN** one second of game time elapses
- **THEN** each active processing structure executes exactly one batch evaluation

### Requirement: Backpressure Propagation
When a structure's output buffer is full, the upstream hauler routes serving its output SHALL pause. When the buffer drains below 80% capacity, routes SHALL resume.

#### Scenario: Backpressure pause
- **WHEN** a Refinery output buffer is full
- **THEN** hauler routes delivering to downstream consumers pause until buffer drops below 80%
