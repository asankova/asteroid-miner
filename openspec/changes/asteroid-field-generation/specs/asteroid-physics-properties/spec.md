## ADDED Requirements

### Requirement: Physical Property Assignment
Each asteroid SHALL be assigned mass (kg), rotation_speed (rad/s), surface_texture_seed (uint32), and structural_integrity (0.0–1.0) at generation time based on type and size.

#### Scenario: M-type asteroid properties
- **WHEN** an M-type asteroid is generated
- **THEN** it has higher mass and structural_integrity than a C-type asteroid of equivalent size

### Requirement: Rotation Animation
Each asteroid SHALL visually rotate at its assigned rotation_speed. Rotation SHALL be computed on the GPU via shader uniform; no CPU update per asteroid per frame.

#### Scenario: GPU rotation
- **WHEN** asteroids are rendered
- **THEN** rotation is computed in the vertex shader from time uniform and rotation_speed attribute

### Requirement: Structural Integrity Tracking
Structural integrity SHALL decrease as mining actions are applied. When integrity drops below 0.30, a crack event SHALL be emitted. When integrity reaches 0.0, a fragment event SHALL be emitted and the asteroid SHALL be replaced by 2–5 child asteroids.

#### Scenario: Crack threshold
- **WHEN** structural integrity drops below 0.30
- **THEN** a crack-event is emitted and visible crack texture overlay is applied to asteroid sprite

#### Scenario: Fragmentation
- **WHEN** structural integrity reaches 0.0
- **THEN** the asteroid entity is removed and 2–5 child asteroids are added via addAsteroid
