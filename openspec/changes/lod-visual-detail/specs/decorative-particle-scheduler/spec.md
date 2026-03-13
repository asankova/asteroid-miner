## ADDED Requirements

### Requirement: Zoom-Level Category Injection
The scheduler SHALL inject particle categories based on current LOD level: dust-cloud category active at L0–L2, mineral-glint at L1–L3, rock-fragment at L2–L4, surface-texture at L3–L4. Category injection and removal SHALL occur within one frame of LOD level change.

#### Scenario: L0 active categories
- **WHEN** camera is at LOD level L0
- **THEN** only dust-cloud particles are active; mineral-glint, rock-fragment, and surface-texture are inactive

### Requirement: Zero CPU Cost
All decorative particle positions, velocities, and lifetimes SHALL be updated exclusively by GPU Transform Feedback shaders. The CPU SHALL only set initial seeding uniforms and trigger injection/removal on LOD transitions.

#### Scenario: CPU cost verification
- **WHEN** 100,000 decorative particles are active
- **THEN** the simulation worker thread CPU time for decorative particles is 0ms per frame

### Requirement: Scalable Particle Count
The scheduler SHALL initialize with a particle budget determined by detected GPU memory: 150,000 particles on ≥4GB VRAM, 50,000 on 2–4GB, 20,000 on <2GB.

#### Scenario: Budget scaling
- **WHEN** GPU has 2.5GB VRAM
- **THEN** the decorative particle budget is initialized to 50,000 slots
