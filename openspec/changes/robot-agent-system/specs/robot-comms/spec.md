## ADDED Requirements

### Requirement: Pub/Sub Event Bus
The robot comms system SHALL implement a pub/sub event bus allowing robots to publish typed messages (PICKUP_READY, THREAT_DETECTED, POSITION_UPDATE, HELP_REQUEST) to topic channels and subscribe to channels by topic.

#### Scenario: Hauler pickup coordination
- **WHEN** a Miner publishes PICKUP_READY with coordinates to the MINING_COMPLETE channel
- **THEN** subscribed Hauler robots receive the message and may enqueue a HAUL task

### Requirement: Broadcast Range
Messages SHALL have a range field (in world units). Only robots within range of the publisher SHALL receive the message. Range SHALL be computed using the spatial hash grid.

#### Scenario: Out-of-range message filtering
- **WHEN** a Sentinel broadcasts THREAT_DETECTED with range=500 world units
- **THEN** robots more than 500 world units away do not receive the message
