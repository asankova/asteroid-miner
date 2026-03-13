## ADDED Requirements

### Requirement: Priority-Ordered Task Queue
Each robot SHALL maintain a task queue ordered by integer priority (0=emergency, 1=player-direct, 2=automation, 3=idle). The highest-priority ready task SHALL always be the active task.

#### Scenario: Priority preemption
- **WHEN** a priority-0 RECHARGE task is enqueued while a priority-2 MINE task is active
- **THEN** the MINE task is suspended and RECHARGE becomes the active task

### Requirement: Task Assignment Sources
Tasks SHALL be assignable by three sources: PLAYER (direct input), AUTOMATION (production planner or coordinator agent), SELF (robot's own behaviour tree). Source SHALL be recorded on each task for telemetry.

#### Scenario: Task source tracking
- **WHEN** a HAUL task is assigned by the production planner
- **THEN** the task's source field is set to AUTOMATION

### Requirement: Task Cancellation
Tasks in the queue SHALL be cancellable by the player or automation system at any time. Cancellation of the active task causes the robot to halt and await the next queued task.

#### Scenario: Active task cancellation
- **WHEN** the player cancels a robot's active MINE task
- **THEN** the robot halts mining and begins executing the next task in queue
