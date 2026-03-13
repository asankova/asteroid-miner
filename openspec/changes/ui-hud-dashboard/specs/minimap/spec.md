## ADDED Requirements

### Requirement: 150×150px Field Overview
The minimap SHALL render a 150×150px 2D Canvas element showing: field boundary, asteroid positions as 1px dots (colored by type), robot positions as 2px colored dots (colored by type), structure positions as 3px icons. The minimap viewport is always the full field extent.

#### Scenario: Entity representation
- **WHEN** 500 asteroids and 50 robots are in the field
- **THEN** all are visible on the minimap as appropriately colored dots at their positions

### Requirement: Camera Viewport Indicator
The minimap SHALL show the current camera viewport as a white rectangle overlay proportional to the visible area of the full field.

#### Scenario: Viewport rectangle
- **WHEN** camera is zoomed into a small area
- **THEN** the viewport rectangle is small; when zoomed out, it covers most of the minimap

### Requirement: Click-to-Navigate
Clicking any position on the minimap SHALL command the camera controller to smoothly navigate to that world position (centered) in 300ms.

#### Scenario: Minimap click navigation
- **WHEN** player clicks the top-right corner of the minimap
- **THEN** camera smoothly navigates to the corresponding world position in 300ms
