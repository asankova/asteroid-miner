## ADDED Requirements

### Requirement: Global Power Pool
The power grid SHALL maintain a global power pool computed as sum of all generator output minus sum of all consumer consumption per tick. The pool value SHALL be visible in the HUD as a generation/consumption ratio.

#### Scenario: Power balance display
- **WHEN** generators produce 500 MW and consumers draw 300 MW
- **THEN** the HUD shows "500 / 300 MW" and the pool is in surplus

### Requirement: Deficit Proportional Throttling
When power demand exceeds supply, structures SHALL be throttled proportionally within their priority class. Priority classes: Critical (Command Hub, Relay Beacon — never throttled), Production (Smelters, Refineries — throttled proportionally), Non-essential (Science Lab — throttled first).

#### Scenario: Production throttling
- **WHEN** power deficit is 30% of production-class demand
- **THEN** all production-class structures run at 70% processing rate

### Requirement: Pre-Deficit Warning
When projected demand exceeds supply by less than 20% safety margin, the power grid SHALL emit a POWER_WARNING event and display a warning in the HUD.

#### Scenario: Power warning
- **WHEN** adding a new structure would push demand within 10% of generation capacity
- **THEN** a POWER_WARNING event is emitted before placement is confirmed
