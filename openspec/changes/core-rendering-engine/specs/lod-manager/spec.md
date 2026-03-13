## ADDED Requirements

### Requirement: Five Zoom LOD Levels
The LOD manager SHALL classify the camera zoom state into five levels: L0 (field view), L1 (sector view), L2 (asteroid cluster), L3 (asteroid surface), L4 (equipment close-up). Each level SHALL have a defined zoom range in world units per viewport pixel.

#### Scenario: LOD level assignment
- **WHEN** the camera zoom value changes
- **THEN** the LOD manager assigns the correct level based on predefined zoom range thresholds

### Requirement: Cross-Fade on LOD Transition
The LOD manager SHALL trigger a cross-fade when the zoom level transitions between LOD levels. The cross-fade SHALL last 200ms and blend the outgoing and incoming detail levels via alpha interpolation.

#### Scenario: LOD cross-fade
- **WHEN** camera zoom crosses a LOD boundary
- **THEN** both LOD levels are rendered simultaneously with complementary alpha values for 200ms

### Requirement: Entity Detail Dispatch
The LOD manager SHALL notify all registered entities of their current LOD level each frame so entities can select the appropriate visual representation.

#### Scenario: Entity LOD notification
- **WHEN** the active LOD level is L0
- **THEN** all entities receive L0 detail level and render as colored point sprites
