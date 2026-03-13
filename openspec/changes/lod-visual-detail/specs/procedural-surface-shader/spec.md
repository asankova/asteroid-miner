## ADDED Requirements

### Requirement: Three Shader Layers
The surface shader SHALL apply three layers to each asteroid at LOD L3–L4: base rock layer (fractal noise, type-specific color palette), resource vein overlay (sinusoidal vein patterns colored by primary resource type), and weathering pass (edge darkening + crater noise). Layers SHALL be composited via alpha blending.

#### Scenario: Shader layer composition
- **WHEN** an asteroid is rendered at LOD L3
- **THEN** all three shader layers are active and composited in order: base, vein, weathering

### Requirement: Per-Asteroid Uniform Parameters
Each asteroid SHALL provide shader uniforms: surface_seed (uint32), vein_color (vec3, determined by primary resource type), weathering_level (0–1, from asteroid age), rock_palette_index (int, from asteroid type). Uniforms SHALL be uploaded lazily on first LOD L3 entry.

#### Scenario: Lazy uniform upload
- **WHEN** an asteroid enters LOD L3 for the first time
- **THEN** its surface shader uniforms are uploaded to the GPU within that frame

### Requirement: Specular Highlights from Star
The weathering pass SHALL include a specular highlight calculated from the current star illumination angle. Highlight intensity SHALL vary with surface_seed to create non-uniform reflectivity.

#### Scenario: Specular variation
- **WHEN** two adjacent asteroids with different surface_seeds are rendered
- **THEN** their specular highlight intensities differ, creating visual diversity
