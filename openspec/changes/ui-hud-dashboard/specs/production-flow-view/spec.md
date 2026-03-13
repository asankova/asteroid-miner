## ADDED Requirements

### Requirement: Force-Directed Structure Graph
The production flow view SHALL render all active processing structures as nodes in a force-directed graph. Edges SHALL represent hauler routes. Nodes SHALL display structure name, current throughput rate, and a color-coded status indicator (green=running, amber=bottleneck, red=halted).

#### Scenario: Bottleneck indicator
- **WHEN** a Smelter is flagged as INPUT_STARVED
- **THEN** its node in the production flow view displays an amber status indicator

### Requirement: Animated Throughput Edges
Edges between structure nodes SHALL animate small particle dots flowing from source to destination at a speed proportional to throughput rate. Higher throughput = faster, denser particle flow.

#### Scenario: Throughput animation
- **WHEN** a Smelter is producing at maximum rate
- **THEN** its output edge has the maximum particle dot density and speed
