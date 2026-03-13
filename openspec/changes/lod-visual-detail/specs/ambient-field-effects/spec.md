## ADDED Requirements

### Requirement: Static Ambient Mesh
Dust lanes, background particles, and ice plume sprites SHALL be rendered as a single static mesh generated once at world creation. The mesh SHALL be parameterized from the field's density noise map so dust lanes align with asteroid cluster positions.

#### Scenario: Dust lane alignment
- **WHEN** ambient mesh is generated
- **THEN** dust lane density is visually correlated with asteroid cluster density

### Requirement: UV Animation for Dust Motion
The ambient mesh SHALL use a time-uniform-driven UV scroll to animate dust motion without per-frame CPU updates. Scroll rate: 0.001 UV units per second (barely perceptible; creates subliminal sense of movement).

#### Scenario: Ambient animation CPU cost
- **WHEN** the ambient mesh is rendering
- **THEN** no CPU computation occurs for its animation; only a time uniform is updated once per frame

### Requirement: Debris Trail Sprites for Fragmented Asteroids
When an asteroid fragments, a debris trail particle spray SHALL be emitted from the fragment positions and fade over 30 seconds. Debris trail is purely decorative; it has no physics.

#### Scenario: Fragmentation debris trail
- **WHEN** an asteroid fragments into child asteroids
- **THEN** a debris trail particle effect spawns at the fragmentation position and fades over 30 seconds
