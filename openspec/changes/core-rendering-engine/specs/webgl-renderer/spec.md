## ADDED Requirements

### Requirement: WebGL2 Context Initialization
The renderer SHALL initialize a WebGL2 rendering context on a fullscreen canvas element. The renderer SHALL fail fast with a user-readable error if WebGL2 is unavailable.

#### Scenario: Successful initialization
- **WHEN** the game starts on a WebGL2-capable browser
- **THEN** a fullscreen canvas is created and a WebGL2 context is obtained with no errors

#### Scenario: WebGL2 unavailable
- **WHEN** the game starts on a browser without WebGL2 support
- **THEN** the renderer displays a clear error message and halts initialization

### Requirement: Four-Layer Render Pipeline
The renderer SHALL execute four render passes per frame in order: world layer, entity layer, decorative particle layer, and UI overlay. Each layer SHALL use its own shader program and framebuffer configuration.

#### Scenario: Frame render order
- **WHEN** a frame is requested via requestAnimationFrame
- **THEN** world, entity, decorative, and UI layers are drawn in that order with correct depth compositing

### Requirement: 60fps Performance Target
The renderer SHALL sustain 60fps with 10,000 simulated entities and 100,000 decorative particles on hardware equivalent to GTX 1060 class GPU.

#### Scenario: Performance under load
- **WHEN** 10,000 entities and 100,000 particles are active
- **THEN** frame time does not exceed 16.67ms on reference hardware
