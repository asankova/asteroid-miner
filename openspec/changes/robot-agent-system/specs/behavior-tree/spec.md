## ADDED Requirements

### Requirement: Core Node Types
The behaviour tree engine SHALL implement Sequence, Selector, Decorator (Inverter, Repeater, Cooldown), and Leaf (Action, Condition) node types. All nodes SHALL return one of SUCCESS, FAILURE, or RUNNING.

#### Scenario: Sequence node short-circuit
- **WHEN** a Sequence node's first child returns FAILURE
- **THEN** the Sequence returns FAILURE immediately without evaluating remaining children

### Requirement: Per-Robot Tree Instance
Each robot SHALL have its own behaviour tree instance with independent blackboard state. Blackboard entries include: current_target, last_position, energy, inventory, nearby_entities.

#### Scenario: Independent blackboard
- **WHEN** two Miner robots run simultaneously
- **THEN** each robot's blackboard state is isolated and changes to one do not affect the other

### Requirement: Tick Rate Governed by LOD
The behaviour tree SHALL tick at a rate determined by the LOD simulation tier: full rate at high-fidelity, 1/4 rate at medium-fidelity, suppressed at low-fidelity. The LOD manager SHALL inject the tick-rate multiplier.

#### Scenario: Medium fidelity tick rate
- **WHEN** a robot is in the medium-fidelity LOD tier
- **THEN** its behaviour tree ticks once every 4 simulation steps instead of every step
