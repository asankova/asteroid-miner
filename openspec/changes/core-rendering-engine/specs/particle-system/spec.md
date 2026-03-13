## ADDED Requirements

### Requirement: GPU-Driven Particle Update
The particle system SHALL update particle positions, velocities, and lifetimes entirely on the GPU using Transform Feedback. No particle position data SHALL be read back to CPU each frame.

#### Scenario: Particle update loop
- **WHEN** a frame is rendered with active particles
- **THEN** particle positions are updated in the GPU Transform Feedback buffer without CPU intervention

### Requirement: Zoom-Level Particle Categories
The particle system SHALL support four particle categories with zoom-level visibility gates: dust-cloud (zoom 0–2), mineral-glint (zoom 1–3), rock-fragment (zoom 2–4), surface-texture (zoom 3–5). Each category SHALL have distinct shader parameters.

#### Scenario: Zoom category activation
- **WHEN** the camera zoom level enters a category's visibility range
- **THEN** that category's particles are injected into the GPU buffer and rendered

#### Scenario: Zoom category deactivation
- **WHEN** the camera zoom level exits a category's visibility range
- **THEN** that category's particles are removed from the render buffer within one frame

### Requirement: Particle Pool Management
The particle system SHALL maintain pre-allocated GPU buffers sized for maximum particle count. Particle slots SHALL be reused via a ring buffer; no dynamic GPU allocation SHALL occur after initialization.

#### Scenario: Particle pool exhaustion
- **WHEN** all particle slots are occupied and a new particle is requested
- **THEN** the oldest particle slot is overwritten without error or performance spike
