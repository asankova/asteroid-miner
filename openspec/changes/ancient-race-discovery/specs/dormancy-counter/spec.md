## ADDED Requirements

### Requirement: Global Disturbance Accumulator
The dormancy counter SHALL maintain a global float value initialized to 0. Each mining task that extracts above 40% of an X-type asteroid's integrity triggers a disturbance increment of 1.0 + (extraction_rate × 2.0). The counter is never decremented.

#### Scenario: X-type mining disturbance
- **WHEN** a Miner extracts ore from an X-type asteroid with extraction_rate=0.6
- **THEN** the dormancy counter increases by 1.0 + (0.6 × 2.0) = 2.2

### Requirement: Secondary Disturbance Sources
The dormancy counter SHALL also increment from: Signal Detector active near X-type asteroids (+0.1/minute), Architect entity proximity to robot swarms (+0.5/minute per Architect), and specific event chain completions (fixed increments defined in event data).

#### Scenario: Signal detector disturbance
- **WHEN** a Signal Detector operates within 500 world units of an X-type asteroid
- **THEN** the dormancy counter increments by 0.1 per in-game minute
