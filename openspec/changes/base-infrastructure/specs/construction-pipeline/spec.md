## ADDED Requirements

### Requirement: Three-Stage Construction
Structure construction SHALL proceed through three stages: Foundation (instantaneous, marks site), Assembly (Builder robot task consuming components and time), Activation (Builder connects power and registers structure). The structure is non-functional until Activation completes.

#### Scenario: Construction stage sequence
- **WHEN** player initiates construction of a Science Lab
- **THEN** Foundation is placed immediately, Assembly task is enqueued to Builder, Activation task follows Assembly

### Requirement: Construction Interruption and Resumption
In-progress Assembly and Activation stages SHALL be interruptible by cancelling the Builder's task. The structure SHALL remain in its current stage state until resumed. Components consumed in Assembly are not refunded on interruption.

#### Scenario: Construction interruption
- **WHEN** player cancels a Builder's Assembly task mid-progress
- **THEN** the structure remains in Foundation state and Assembly progress is preserved for resumption
