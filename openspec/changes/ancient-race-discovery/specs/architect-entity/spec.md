## ADDED Requirements

### Requirement: Lissajous Movement Pattern
Architect entities SHALL move using a Lissajous curve toward the centroid of the 3 highest-disturbance X-type asteroids. When within 1000 world units of the centroid, they SHALL enter an oscillation state following a parametric Lissajous path (a=2, b=3, δ=π/2) scaled to 400-unit amplitude.

#### Scenario: Approach movement
- **WHEN** an Architect entity is created at Stage 4
- **THEN** it moves toward the centroid of the top-3 disturbance X-type asteroids

#### Scenario: Oscillation state
- **WHEN** an Architect entity reaches within 1000 units of the centroid
- **THEN** it transitions to Lissajous oscillation with parametric coordinates

### Requirement: Interference Effects in Stage 4
Architect entities in Stage 4 SHALL emit an interference aura of 800 world-unit radius. Robots within the aura SHALL experience: 30% reduced task completion speed, 10% chance of task abandonment per task, and behavior tree reasoning quality reduction.

#### Scenario: Aura task speed reduction
- **WHEN** a robot is within 800 units of an Architect entity
- **THEN** its task completion speed is multiplied by 0.70
