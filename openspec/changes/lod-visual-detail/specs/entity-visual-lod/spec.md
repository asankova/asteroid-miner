## ADDED Requirements

### Requirement: Three Visual Representations Per Entity Type
Each entity type SHALL have three visual representations: LOD-Low (colored point sprite, 2px), LOD-Mid (simplified sprite, 8×8px), LOD-High (detail sprite with equipment visible, 32×32px). The active representation SHALL be determined by the current LOD level.

#### Scenario: LOD-Low robot rendering
- **WHEN** camera is at LOD level L0 or L1
- **THEN** all robots are rendered as 2px colored point sprites

### Requirement: Cross-Fade Between Representations
Transitions between LOD visual representations SHALL use a 150ms alpha cross-fade. Both representations SHALL render simultaneously during the transition with complementary alpha.

#### Scenario: LOD visual cross-fade
- **WHEN** camera zoom transitions a robot from LOD-Mid to LOD-High representation
- **THEN** both sprites render for 150ms with alpha blending from 0→1 and 1→0
