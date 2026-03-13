## Why

The core gameplay unit is the robot agent — autonomous entities the player deploys to perform tasks. The game needs a flexible agent framework that supports 6 distinct robot types with different capabilities, a behavior tree AI for autonomous operation, and a task queue system the player can oversee and override. This is the foundation for all automation tiers.

## What Changes

- Define 6 robot types: **Scout** (survey/map), **Miner** (extraction), **Hauler** (transport), **Builder** (structure construction), **Fabricator** (on-site manufacturing), **Sentinel** (defense/monitoring)
- Implement a behavior tree engine for each robot: nodes for sensing, decision-making, and action execution
- Implement a task queue per robot: tasks are assigned by player, automation systems, or strategy agents; robots execute the highest-priority ready task
- Add energy system: robots consume energy per action; deplete and return to charge station or go dormant
- Implement robot-to-robot communication: Haulers query Miners for pickup coordinates; Sentinels broadcast threat alerts
- Add robot upgrade slots: 2 equipment slots per robot for tools and modules, expanding capability
- Robots emit telemetry events (position, task status, anomaly flags) consumed by the UI and strategy agents

## Capabilities

### New Capabilities
- `robot-entity`: Core robot data model with type, stats, equipment slots, energy, and state machine
- `behavior-tree`: Composable BT engine with Sequence, Selector, Decorator, and Condition nodes
- `task-queue`: Priority-ordered task queue with assignment, cancellation, and dependency resolution
- `robot-comms`: Pub/sub event bus for robot-to-robot and robot-to-system communication
- `robot-telemetry`: Structured event stream from robots consumed by UI, agents, and narrative triggers

### Modified Capabilities

## Impact

- All gameplay action flows through this system; mining, hauling, building all need robot agents
- Behavior tree complexity is a primary driver of simulation CPU cost — design must account for 200+ simultaneous robots
- Telemetry events are the data source for the LLM strategy agent layer
- Robot types gate automation tiers: higher tiers require Fabricator and higher robot counts
