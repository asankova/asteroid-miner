## ADDED Requirements

### Requirement: Concentric Ring Pulse Effect
Each X-type asteroid with awakening stage ≥ 1 SHALL emit a concentric ring pulse effect: animated rings expanding outward from the asteroid center. Ring visual parameters: expansion speed 200 world units per second, fade distance 1000 world units, ring count scales with awakening stage (1 ring at stage 1, 3 rings at stage 4).

#### Scenario: Stage 1 ring count
- **WHEN** awakening is at stage 1 and an X-type asteroid has a Signal Detector nearby
- **THEN** one concentric ring pulse emanates from the asteroid

#### Scenario: Stage 4 ring count
- **WHEN** awakening is at stage 4
- **THEN** three concentric ring pulses emanate from each active X-type asteroid

### Requirement: Ring Frequency Scales with Disturbance
Ring pulse frequency (pulses per minute) for each asteroid SHALL scale with that asteroid's individual disturbance contribution. Higher-disturbance asteroids pulse faster. Frequency range: 2–12 pulses per minute.

#### Scenario: High-disturbance ring frequency
- **WHEN** an X-type asteroid has contributed 80% of the dormancy counter
- **THEN** it pulses at approximately 12 pulses per minute
