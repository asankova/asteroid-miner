## ADDED Requirements

### Requirement: Pan via Drag
The camera controller SHALL pan the viewport when the user clicks and drags on the canvas. Pan speed SHALL be 1:1 with pointer movement in world space.

#### Scenario: Mouse drag pan
- **WHEN** user holds left mouse button and moves mouse
- **THEN** the viewport translates by the same world-space delta as the pointer movement

### Requirement: Zoom via Scroll Wheel
The camera controller SHALL zoom the viewport in and out using the scroll wheel, centered on the pointer position. Zoom SHALL be clamped to the valid LOD range.

#### Scenario: Scroll zoom
- **WHEN** user scrolls the mouse wheel
- **THEN** the viewport zooms toward the pointer position and LOD level updates accordingly

### Requirement: Minimap Click Navigation
The camera controller SHALL accept click events from the minimap component and translate the camera to the clicked world position with a 300ms smooth animation.

#### Scenario: Minimap navigation
- **WHEN** user clicks a position on the minimap
- **THEN** the camera smoothly animates to center that world position within 300ms

### Requirement: Keyboard Pan
The camera controller SHALL pan the viewport using WASD or arrow keys at a configurable units-per-second rate.

#### Scenario: Keyboard pan
- **WHEN** user holds W/A/S/D or arrow keys
- **THEN** the viewport pans in the corresponding direction at the configured speed
