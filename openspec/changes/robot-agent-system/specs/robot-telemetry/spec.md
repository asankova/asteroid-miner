## ADDED Requirements

### Requirement: Structured Telemetry Events
Each robot SHALL emit structured telemetry events on state changes: TASK_STARTED, TASK_COMPLETED, TASK_FAILED, POSITION_CHANGED, ENERGY_LOW, ANOMALY_DETECTED. Events SHALL include robot_id, type, timestamp, and a payload specific to the event type.

#### Scenario: Task completion event
- **WHEN** a Miner robot completes a MINE task
- **THEN** a TASK_COMPLETED event is appended to the telemetry ring buffer with robot_id, task_type, resource_yield, and timestamp

### Requirement: 10Hz UI Sampling
The main thread SHALL poll the telemetry ring buffer at 10Hz and drain events for UI display. The ring buffer SHALL not block the simulation worker during drain.

#### Scenario: Ring buffer drain
- **WHEN** the main thread polls at 10Hz
- **THEN** all events since last poll are drained from the ring buffer without blocking the simulation worker

### Requirement: Narrative Trigger Filtering
The event system SHALL provide a filtered event stream for narrative consumers (stellaris-event-system, substrate-narrative) that includes only ANOMALY_DETECTED and task events from X-type asteroid operations.

#### Scenario: Narrative filter
- **WHEN** a Miner detects an anomalous mineral on an X-type asteroid
- **THEN** an ANOMALY_DETECTED event is emitted and routed to the narrative event filter stream
