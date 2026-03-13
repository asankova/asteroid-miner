## ADDED Requirements

### Requirement: Per-Sector Stats Display
The performance overlay SHALL display per-sector statistics: entity count, current simulation fidelity tier, CP allocation, tick rate (actual Hz), and active robot count. Overlay is toggled with F3.

#### Scenario: Overlay toggle
- **WHEN** player presses F3
- **THEN** the performance overlay appears showing per-sector simulation stats

### Requirement: Frame Time Graph
The overlay SHALL display a rolling 60-frame graph of main thread frame time, worker simulation step time, and render time in distinct colors.

#### Scenario: Frame time breakdown
- **WHEN** overlay is active
- **THEN** the frame time graph shows simulation step, render, and UI update contributions labeled separately
