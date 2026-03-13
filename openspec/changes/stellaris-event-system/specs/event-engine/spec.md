## ADDED Requirements

### Requirement: Condition Evaluation Loop
The event engine SHALL evaluate all unmet event conditions each game tick (at 1Hz). When a condition expression evaluates to true, the event SHALL be queued for display. Already-seen non-repeatable events SHALL be skipped.

#### Scenario: Condition evaluation
- **WHEN** automation_tier reaches 3 and an event has condition "automation_tier >= 3"
- **THEN** that event is queued for display at the next available fire slot

### Requirement: 120-Second Global Cooldown
The event engine SHALL enforce a minimum 120 seconds between event displays. Events that fire while cooldown is active SHALL be queued and displayed when cooldown expires.

#### Scenario: Cooldown enforcement
- **WHEN** an event fires and a second event triggers 30 seconds later
- **THEN** the second event queues and displays 90 seconds after the first event closes

### Requirement: One-Shot and Repeatable Event Types
Events SHALL be marked as one-shot (fires once per playthrough) or repeatable (fires each time conditions are met, subject to min_interval). The engine SHALL track seen one-shot events and skip them on subsequent condition matches.

#### Scenario: One-shot event skip
- **WHEN** a one-shot event has already been seen this playthrough
- **THEN** its condition is never re-evaluated
