## ADDED Requirements

### Requirement: Single Draw Call Per Entity Type
The instanced renderer SHALL render all visible instances of a given entity type in a single WebGL draw call using `drawArraysInstanced`. Instance data SHALL be submitted as a per-instance attribute buffer.

#### Scenario: Instanced draw call count
- **WHEN** 5,000 robots of type Miner are visible
- **THEN** exactly one draw call is issued for all 5,000 Miner instances

### Requirement: Instance Buffer Format
Each instance SHALL be represented by 8 float32 attributes: world_x, world_y, scale, rotation, sprite_index, color_r, color_g, alpha. The buffer SHALL be updated via `bufferSubData` on dirty instances only.

#### Scenario: Partial buffer update
- **WHEN** 50 out of 5,000 instances change position
- **THEN** only the 50 dirty instance slots are updated via bufferSubData, not the full buffer

### Requirement: Frustum Culling
The instanced renderer SHALL exclude entities outside the current camera frustum from the instance buffer. Culling SHALL use the spatial hash grid for O(1) viewport region queries.

#### Scenario: Off-screen culling
- **WHEN** an entity is outside the camera viewport
- **THEN** that entity's instance slot is not submitted in the draw call
